import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CardComponent} from '../../../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {DocActionMenuComponent} from '../../../../../shared/components/ui/doc-action-menu/doc-action-menu.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {environment} from '../../../../../../environments/environment';
import {Router} from '@angular/router';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {cryptSession, decode64} from '../../../../../config/config';
import moment from 'moment';

export interface DocSimule {
    uid: string;
    numero: string;
    lib_document: string;
    categorie: string;
    categorie_color: string;
    date_document: string;
    service: string;
    auteur: string;
}

const MOIS_LABELS: Record<number, string> = {
    1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril',
    5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août',
    9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre',
};

const PAGE_SIZE = 4;

@Component({
    selector: 'app-mes-docs',
    imports: [CommonModule, FormsModule, CardComponent, NzIconModule,
        FeatherIconComponent, NzTagModule, NzSelectModule, NzTooltipDirective, DocActionMenuComponent],
    templateUrl: './mes-docs.component.html',
    styleUrl: './mes-docs.component.scss',
})
export class MesDocsComponent implements OnInit {

    isloading = true;

    // Filtre mois
    moisActif: number = new Date().getMonth() + 1;
    moisLabels = MOIS_LABELS;
    moisOptions: { label: string; value: number }[] = [];
    readonly anneeEnCours = new Date().getFullYear();

    // Filtre date personnalisé
    dateDebut: string = '';
    dateFin: string = '';
    modeIntervalle = false;

    // Recherche texte
    searchValue = '';

    // Pagination
    pageActuelle = 1;
    pageSize = PAGE_SIZE;
    pageSizeOptions = [4, 10, 20, 50];
    docsFiltered: DocSimule[] = [];
    docsPage: DocSimule[] = [];

    private docsRaw: DocSimule[] = [];
    private users: any = [];

    constructor(
        private router: Router,
        private autor: Authorization,
        private httService: HttpService,
    ) {
    }

    get titreSection(): string {
        if (this.modeIntervalle && this.dateDebut && this.dateFin) {
            return `Mes documents du ${this.formatDateAffichage(this.dateDebut)} au ${this.formatDateAffichage(this.dateFin)}`;
        }
        return `Mes documents de ${MOIS_LABELS[this.moisActif]} ${this.anneeEnCours}`;
    }

    get totalPages(): number {
        return Math.ceil(this.docsFiltered.length / this.pageSize) || 1;
    }

    get pages(): number[] {
        return Array.from({length: this.totalPages}, (_, i) => i + 1);
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        console.log("this.users ===", this.users)
        this.moisOptions = Object.entries(MOIS_LABELS).map(([k, v]) => ({
            label: v,
            value: Number(k),
        }));
        const {debut, fin} = this.getMonthRange(this.anneeEnCours, this.moisActif);
        this.dateDebut = debut;
        this.dateFin = fin;
        this.showDocuments();
    }

    // ── API ──────────────────────────────────────────────────────
    showDocuments(): void {
        const idsociete = this.users?.datasociete?.uid || '';
        const idservices = this.users?.dataservice?.uid || '';
        if (!idservices) return
        this.isloading = true;
        this.docsRaw = [];
        this.httService.getData(
            `${environment.api_url}api/:savedocuments?idsociete=${idsociete}&idservices=${idservices}&date_debut_sig=${this.dateDebut}&date_fin_sig=${this.dateFin}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body.data ====", res.body.data)
                if (res.body.status || res.body.success) {
                    this.docsRaw = (res.body.data || []).map((e: any) => ({
                        ...e,
                        uid: e.uid || String(e.id || ''),
                        numero: e.code_docs || '',
                        lib_document: e.lib_docs || '',
                        categorie: e?.datatype_document?.[0]?.libelle_type_docs || '',
                        categorie_color: '#7366ff',
                        date_document: e.date_docs ? moment(e.date_docs).format('DD/MM/YYYY') : '',
                        service: e?.datauser?.dataservice?.libelle || '',
                        auteur: e?.datauser?.datapersonnel ? `${e.datauser?.datapersonnel?.nom || ''} ${e.datauser?.datapersonnel?.prenom || ''}`.trim() : '',
                    }));
                }
                this.applyFiltre();
            })
            .catch(() => {
                this.isloading = false;
                this.applyFiltre();
            });
    }

    // ── Rechargement après suppression d'un document ──────────────
    onDocDeleted(): void {
        this.showDocuments();
    }

    // ── Filtres ──────────────────────────────────────────────────
    onMoisChange(mois: number): void {
        this.moisActif = mois;
        this.modeIntervalle = false;
        this.searchValue = '';
        this.pageActuelle = 1;
        const {debut, fin} = this.getMonthRange(this.anneeEnCours, mois);
        this.dateDebut = debut;
        this.dateFin = fin;
        this.showDocuments();
    }

    appliquerIntervalle(): void {
        if (!this.dateDebut || !this.dateFin) return;
        if (this.dateDebut > this.dateFin) return;
        this.modeIntervalle = true;
        this.pageActuelle = 1;
        this.searchValue = '';
        this.showDocuments();
    }

    reinitialiserIntervalle(): void {
        this.modeIntervalle = false;
        const {debut, fin} = this.getMonthRange(this.anneeEnCours, this.moisActif);
        this.dateDebut = debut;
        this.dateFin = fin;
        this.pageActuelle = 1;
        this.searchValue = '';
        this.showDocuments();
    }

    onSearch(value: string): void {
        this.searchValue = value;
        this.pageActuelle = 1;
        this.applyFiltre();
    }

    filterMois = (input: string, option: any): boolean =>
        option.nzLabel.toLowerCase().includes(input.toLowerCase());

    private applyFiltre(): void {
        let result = [...this.docsRaw];
        const q = this.searchValue.trim().toLowerCase();
        if (q) {
            result = result.filter(d =>
                d.lib_document.toLowerCase().includes(q) ||
                d.numero.toLowerCase().includes(q) ||
                d.categorie.toLowerCase().includes(q) ||
                d.service.toLowerCase().includes(q)
            );
        }
        this.docsFiltered = result;
        console.log("this.docsFiltered ====", this.docsFiltered)
        this.updatePage();
    }

    // ── Pagination ───────────────────────────────────────────────
    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.pageActuelle = page;
        this.updatePage();
    }

    onPageSizeChange(size: number): void {
        this.pageSize = Number(size);
        this.pageActuelle = 1;
        this.updatePage();
    }

    private updatePage(): void {
        const start = (this.pageActuelle - 1) * this.pageSize;
        this.docsPage = this.docsFiltered.slice(start, start + this.pageSize);
    }

    // ── Navigation document ──────────────────────────────────────
    getInitiale(categorie: string): string {
        return categorie.charAt(0).toUpperCase();
    }

    /* Clic sur un document → consultation (même comportement que l'action
       « Consulter » du menu : dépôt chiffré en session puis prévisualisation) */
    consulterDoc(doc: DocSimule): void {
        const mapSessionTemp = cryptSession(JSON.stringify(doc), decode64(environment.CONFIG.APP_PASS));
        localStorage.setItem('_eye_', mapSessionTemp);
        this.router.navigate(['/recherche/previsualisation']);
    }

    // ── Utilitaires ──────────────────────────────────────────────
    private getMonthRange(year: number, month: number): { debut: string; fin: string } {
        const debut = moment(`${year}-${String(month).padStart(2, '0')}-01`).format('YYYY-MM-DD');
        const fin = moment(debut).endOf('month').format('YYYY-MM-DD');
        return {debut, fin};
    }

    private formatDateAffichage(date: string): string {
        return moment(date).format('DD/MM/YYYY');
    }
}
