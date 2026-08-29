import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';
import {environment} from '../../../../../../environments/environment';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {couleurTypeFichier, libelleTypeFichier} from '../../imputation-api';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';

interface DocResult {
    uid: string;
    code_docs: string;
    lib_docs: string;
}

interface ImputeFile {
    uid: string;
    name: string;
    extension: string;
    checked: boolean;
}

/** api/:imputations-save — action : 1=création, 2=modification, 3=suppression. */
const ACTION_CREATION = 1;

/**
 * Attention aux noms : le POST attend `piece_docs` (UIDs des pièces du document
 * à joindre) alors que le GET renvoie la collection sous `pieces_jointes`.
 */

@Component({
    selector: 'app-compose-email-modal',
    imports: [CommonModule, FormsModule, NzSelectModule, NzDatePickerModule, FeatherIconComponent],
    templateUrl: './compose-email-modal.component.html',
    styleUrl: './compose-email-modal.component.scss'
})
export class ComposeEmailModalComponent implements OnInit {

    @Output() modalOpen = new EventEmitter<boolean>();
    @Output() created = new EventEmitter<void>();

    private users: any = null;

    // ── Recherche du document (par numéro) ────────────────────────────
    docNumero: string = '';
    searchingDoc: boolean = false;
    docResults: DocResult[] = [];
    docSearched: boolean = false;
    selectedDoc: DocResult | null = null;

    // ── Fichiers du document ──────────────────────────────────────────
    loadingFiles: boolean = false;
    files: ImputeFile[] = [];

    // ── Destinataires (personnels) ────────────────────────────────────
    // Le contrat attend `destinataires` : le 1er UID est le destinataire
    // principal, les suivants sont en copie. L'écran sépare donc les deux
    // rôles au lieu d'une liste indifférenciée.
    dataPersonnels: any[] = [];
    loadingPersonnels: boolean = false;
    selectedPrincipal: string = '';
    selectedCopies: string[] = [];

    /** Le destinataire principal ne doit pas être proposé aussi en copie. */
    get personnelsEnCopie(): any[] {
        return this.dataPersonnels.filter(p => p.value !== this.selectedPrincipal);
    }

    /** [principal, ...copies] — ordre significatif pour l'API. */
    get destinatairesOrdonnes(): string[] {
        const copies = this.selectedCopies.filter(uid => uid && uid !== this.selectedPrincipal);
        return [this.selectedPrincipal, ...copies];
    }

    // ── Priorité / consigne ───────────────────────────────────────────
    dataPriorites: any[] = [];
    selectedPriorite: string = '';
    dataConsignes: any[] = [];
    selectedConsigne: string = '';

    // ── Champs ────────────────────────────────────────────────────────
    descImpute: string = '';
    message: string = '';
    notifyEmail: boolean = true;
    estConfidentiel: boolean = false;
    dateEnd: Date | null = null;

    // ── État ──────────────────────────────────────────────────────────
    isSaving: boolean = false;
    errorTexte: string = '';

    disabledPastDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadPersonnels();
        this.loadPriorites();
        this.loadConsignes();
    }

    @HostListener('document:keydown.escape')
    handleEscKey(): void {
        this.closeModal();
    }

    closeModal(): void {
        if (this.isSaving) return;
        this.modalOpen.emit(false);
    }

    // ── Recherche document par numéro ─────────────────────────────────
    searchDocument(): void {
        const numero = this.docNumero.trim();
        if (!numero) return;
        const id = this.users?.datasociete?.uid || '';
        this.searchingDoc = true;
        this.docSearched = false;
        this.docResults = [];
        // Une nouvelle recherche annule la sélection précédente.
        this.selectedDoc = null;
        this.files = [];
        this.httService.getData(
            `${environment.api_url}api/:savedocuments?idsociete=${id}&code_docs=${encodeURIComponent(numero)}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.searchingDoc = false;
                this.docSearched = true;
                if (res.body.status || res.body.success) {
                    this.docResults = (res.body.data || []).map((e: any) => ({
                        uid: e.uid,
                        code_docs: e.code_docs || '',
                        lib_docs: e.lib_docs || e.lib_document || '',
                    }));
                    // Résultat unique : on le déroule directement, l'utilisateur
                    // cherche un numéro précis et n'a pas à cliquer de nouveau.
                    if (this.docResults.length === 1) {
                        this.basculerDocument(this.docResults[0]);
                    }
                }
            })
            .catch(() => {
                this.searchingDoc = false;
                this.docSearched = true;
            });
    }

    /**
     * Les résultats restent affichés en accordéon : ouvrir un document le
     * sélectionne et déroule ses pièces, le refermer le désélectionne. Un seul
     * document ouvert à la fois — on n'impute qu'un document.
     */
    estOuvert(doc: DocResult): boolean {
        return this.selectedDoc?.uid === doc.uid;
    }

    basculerDocument(doc: DocResult): void {
        if (this.estOuvert(doc)) {
            this.selectedDoc = null;
            this.files = [];
            return;
        }
        this.selectedDoc = doc;
        this.loadFiles(doc.uid);
    }

    private loadFiles(iddocuments: string): void {
        this.loadingFiles = true;
        this.files = [];
        this.httService.getData(
            `${environment.api_url}api/:consultation-pieces-documents?iduser=${this.users?.uid || ''}&iddocuments=${iddocuments}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingFiles = false;
                if (res.body.status || res.body.success) {
                    this.files = (res.body.data || []).map((d: any) => ({
                        uid: d.uid,
                        name: d.name_piece_docs || d.name_file_docs || d.name || '',
                        // `extension` n'est pas toujours renseignée. Le nom
                        // lisible n'en porte pas non plus : on la déduit alors
                        // du nom de fichier réel (empreinte) ou de l'URL.
                        extension: this.extensionPiece(d),
                        checked: false,
                    }));
                }
            })
            .catch(() => {
                this.loadingFiles = false;
            });
    }

    /** Première source qui porte réellement une extension exploitable. */
    private extensionPiece(d: any): string {
        const candidats = [
            d?.extension,
            d?.lib_piece_docs,
            d?.name_file_docs,
            (d?.url_file_piece || '').split('?')[0],
            d?.name_piece_docs,
        ];
        for (const c of candidats) {
            const valeur = String(c || '');
            if (valeur.includes('.')) {
                const ext = valeur.split('.').pop() || '';
                if (ext && ext.length <= 5) return ext.toLowerCase();
            } else if (valeur && candidats.indexOf(c) === 0) {
                // `extension` peut arriver sans point : « pdf »
                return valeur.toLowerCase();
            }
        }
        return '';
    }

    toggleFile(f: ImputeFile): void {
        f.checked = !f.checked;
    }

    get selectedFileUids(): string[] {
        return this.files.filter(f => f.checked).map(f => f.uid);
    }

    // ── Chargement personnels / priorités ─────────────────────────────
    private loadPersonnels(): void {
        const id = this.users?.datasociete?.uid || this.users?.uidsociete || '';
        this.loadingPersonnels = true;
        this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${id}&idpersonnel=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingPersonnels = false;
                console.log('liste-des-comptes ===', res.body);
                if (res.body.status || res.body.success) {
                    this.dataPersonnels = (res.body.data || [])
                        .map((e: any) => {
                            const p = e?.datapersonnel || e || {};
                            const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
                            const email = p?.emailAgent || p?.email || e?.email || e?.login || '';
                            return {
                                label: nom || email || '—',
                                value: e?.uid || e?.id,
                            };
                        })
                        .filter((x: any) => !!x.value);
                }
            })
            .catch(() => {
                this.loadingPersonnels = false;
            });
    }

    private loadPriorites(): void {
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:savepriorite?idsociete=${id}&idpriorites=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataPriorites = (res.body.data || []).map((e: any) => ({
                        label: e?.lib_priorite || e?.libelle || '',
                        value: e?.uid,
                    })).filter((p: any) => p.value && p.label);
                }
            })
            .catch(() => {
            });
    }

    private loadConsignes(): void {
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:saveconsigne?idsociete=${id}&idconsigne=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataConsignes = (res.body.data || []).map((e: any) => ({
                        label: e?.libconsigne || e?.desc_consigne || '',
                        value: e?.uid,
                    })).filter((c: any) => c.value && c.label);
                }
            })
            .catch(() => {
            });
    }

    // ── Enregistrement ────────────────────────────────────────────────
    submit(): void {
        this.errorTexte = '';
        if (!this.selectedDoc) {
            this.errorTexte = 'Veuillez rechercher et sélectionner un document.';
            return;
        }
        if (!this.selectedPrincipal) {
            this.errorTexte = 'Veuillez sélectionner le destinataire principal.';
            return;
        }
        // Le back refuse la création sans instruction : « Les champs document,
        // destinataire et instruction sont obligatoires pour créer. »
        if (!this.descImpute.trim()) {
            this.errorTexte = 'Veuillez saisir la description / consigne de l\'imputation.';
            return;
        }

        // Contrat api/:imputations-save — action 1 = création.
        // Les optionnels vides (uid, parent, statut) ne sont pas envoyés : le
        // back valide la présence des champs, une chaîne vide peut le faire
        // échouer alors que le champ absent est simplement ignoré.
        const base: any = {
            action: ACTION_CREATION,
            document: this.selectedDoc.uid,
            instruction: this.descImpute.trim(),
            est_confidentiel: this.estConfidentiel,
            active: true,
        };
        if (this.message.trim()) {
            base.commentaire = this.message.trim();
        }
        if (this.dateEnd) {
            base.date_limite = moment(this.dateEnd).format('YYYY-MM-DD HH:mm:ss');
        }

        if (this.selectedPriorite) base.priorite = this.selectedPriorite;
        if (this.selectedConsigne) base.consigne = this.selectedConsigne;
        if (this.selectedFileUids.length) base.piece_docs = this.selectedFileUids;

        // `destinataires` porte la liste ordonnée (1er = principal, suivants en
        // copie). On renseigne aussi `destinataire` avec le principal : il reste
        // au contrat et le back le contrôle à la création.
        const destinataires = this.destinatairesOrdonnes;
        base.destinataire = destinataires[0];
        if (destinataires.length > 1) {
            base.destinataires = destinataires;
        }

        const token = this.users?.access_token || '';
        const url = `${environment.api_url}api/:imputations-save`;
        this.isSaving = true;

        this.httService.postData(url, base, token).toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res?.body?.status || res?.body?.success) {
                    const copies = destinataires.length - 1;
                    this.toast.success(
                        copies > 0
                            ? `Imputation créée (${copies} personne${copies > 1 ? 's' : ''} en copie).`
                            : 'Imputation créée avec succès.',
                        'Succès'
                    );
                    this.created.emit();
                    this.modalOpen.emit(false);
                } else {
                    this.errorTexte = res?.body?.message || "Échec de la création de l'imputation.";
                }
            })
            .catch((err: any) => {
                this.isSaving = false;
                this.errorTexte = err?.error?.err?.message || err?.error?.message
                    || 'Une erreur est survenue.';
            });
    }

    /** Apparence de la pièce, identique au volet de lecture. */
    couleurFichier(f: ImputeFile): string {
        return couleurTypeFichier(f.extension);
    }

    libelleFichier(f: ImputeFile): string {
        return libelleTypeFichier(f.extension);
    }

    tailleTexteIcone(f: ImputeFile): number {
        return this.libelleFichier(f).length >= 4 ? 7 : 9;
    }

    get toutesPiecesChoisies(): boolean {
        return this.files.length > 0 && this.files.every(f => f.checked);
    }

    basculerToutesLesPieces(): void {
        const tout = !this.toutesPiecesChoisies;
        this.files.forEach(f => f.checked = tout);
    }
}
