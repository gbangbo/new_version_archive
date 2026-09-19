import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule, NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import * as XLSX from 'xlsx';
import moment from 'moment';

import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {
    ComposeEmailModalComponent, DocResult,
} from '../imputation/widgets/compose-email-modal/compose-email-modal.component';
import {
    DocumentRow,
    lignesDeReponse,
    mapperDocument,
    reponseOk,
    totalDeReponse,
    urlListeDocuments,
} from '../documents-imputation-api';

/**
 * ══ DOCUMENTS À IMPUTER ═════════════════════════════════════════════════════
 *
 * La liste de travail de l'utilisateur : les documents qui attendent d'être
 * adressés à quelqu'un. On en désigne un, on l'impute, et il sort de la liste —
 * la sortie étant décidée par le back, l'écran recharge après un envoi réussi.
 *
 * Source : api/:recherche-documents-non-imputes avec is_imputed=false.
 * La pagination est faite par le serveur : le tableau ne détient jamais qu'une
 * page, et c'est `total` qui alimente le pied de pagination.
 */
@Component({
    selector: 'app-a-imputer',
    imports: [CommonModule, FormsModule, NzTableModule, NzTooltipDirective,
        CardComponent, FeatherIconComponent, ComposeEmailModalComponent],
    templateUrl: './a-imputer.component.html',
    styleUrl: './a-imputer.component.scss',
})
export class AImputerComponent implements OnInit {

    private users: any = {};
    isloading = false;
    isExporting = false;
    erreur = '';

    searchValue = '';
    private rechercheTimer: any = null;

    // ── Données de la page courante ──────────────────────────
    rows: DocumentRow[] = [];

    // ── Pagination serveur ───────────────────────────────────
    pageIndex = 1;
    pageSize = 10;
    total = 0;

    /** Document en cours d'imputation ; ouvre le modal quand il est renseigné. */
    docAImputer: DocResult | null = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
    ) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.charger();
    }

    // ── Chargement ───────────────────────────────────────────

    private url(page: number, pageSize: number): string {
        return urlListeDocuments({
            page,
            pageSize,
            idsociete: this.users?.datasociete?.uid || '',
            isImputed: false,
            search: this.searchValue,
        });
    }

    charger(): void {
        this.isloading = true;
        this.erreur = '';

        this.httService.getData(this.url(this.pageIndex, this.pageSize), false,
            this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                const body = res?.body;
                if (reponseOk(body)) {
                    this.rows = lignesDeReponse(body).map(e => this.mapper(e));
                    this.total = totalDeReponse(body, this.rows.length);
                } else {
                    this.rows = [];
                    this.total = 0;
                    this.erreur = body?.message || 'Chargement des documents impossible.';
                }
            })
            .catch(() => {
                this.isloading = false;
                this.rows = [];
                this.total = 0;
                this.erreur = 'Chargement des documents impossible.';
            });
    }

    private mapper(e: any): DocumentRow {
        return mapperDocument(e, d => moment(d).format('DD/MM/YYYY'));
    }

    /**
     * Changement de page ou de taille de page : nz-table émet cet évènement au
     * premier rendu aussi, d'où le garde-fou qui évite un second appel inutile.
     */
    onQueryParams(params: NzTableQueryParams): void {
        const {pageIndex, pageSize} = params;
        if (pageIndex === this.pageIndex && pageSize === this.pageSize) return;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.charger();
    }

    // ── Recherche ────────────────────────────────────────────

    /**
     * La recherche est déléguée au serveur : filtrer localement ne porterait
     * que sur les lignes affichées, ce qui donnerait des résultats faux. On
     * repart de la page 1 et on temporise pour ne pas appeler à chaque frappe.
     */
    onSearch(): void {
        clearTimeout(this.rechercheTimer);
        this.rechercheTimer = setTimeout(() => {
            this.pageIndex = 1;
            this.charger();
        }, 400);
    }

    effacerRecherche(): void {
        this.searchValue = '';
        this.onSearch();
    }

    // ── Imputation ───────────────────────────────────────────
    imputer(row: DocumentRow): void {
        this.docAImputer = {uid: row.uid, code_docs: row.code_docs, lib_docs: row.lib_docs};
    }

    fermerModal(): void {
        this.docAImputer = null;
    }

    /**
     * Le document quitte la liste parce que le back ne le renvoie plus — d'où
     * un rechargement plutôt qu'un retrait local, qui donnerait un écran en
     * désaccord avec le serveur si l'envoi n'avait pas abouti.
     *
     * Si c'était le dernier de la page, cette page n'existe plus : on recule
     * d'un cran pour ne pas afficher un tableau vide.
     */
    onImpute(): void {
        this.docAImputer = null;
        if (this.rows.length === 1 && this.pageIndex > 1) {
            this.pageIndex--;
        }
        this.charger();
    }

    // ── Export ───────────────────────────────────────────────

    /**
     * L'export porte sur la liste entière, pas sur la page affichée : on
     * redemande tout au serveur en une fois. Sans ça, le fichier ne
     * contiendrait que les lignes sous les yeux de l'utilisateur.
     */
    exportToExcel(): void {
        if (this.isExporting) return;
        this.isExporting = true;

        this.httService.getData(this.url(1, Math.max(this.total, this.pageSize, 1)), false,
            this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isExporting = false;
                const body = res?.body;
                const donnees = reponseOk(body)
                    ? lignesDeReponse(body).map(e => this.mapper(e))
                    : this.rows;
                this.ecrireClasseur(donnees);
            })
            .catch(() => {
                this.isExporting = false;
                // Au pire, on exporte ce qui est déjà à l'écran.
                this.ecrireClasseur(this.rows);
            });
    }

    private ecrireClasseur(donnees: DocumentRow[]): void {
        const rows = donnees.map(row => ({
            'Numéro doc.': row.code_docs,
            'Objet': row.lib_docs,
            'Type doc.': row.libelle_type_docs,
            'Date': row.date_docs,
            'Service': row.libelle_service,
            'Auteur': row.auteur,
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Documents à imputer');

        ws['!cols'] = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2,
        }));

        XLSX.writeFile(wb, `documents_a_imputer_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    }
}
