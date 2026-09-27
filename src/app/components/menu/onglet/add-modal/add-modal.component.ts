import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzSelectModule} from "ng-zorro-antd/select";

import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {SvgIconComponent} from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import {menuItems} from "../../../../shared/data/menu";
import {Menu} from "../../../../shared/interface/menu";
import {ICONES_SIDEBAR, ICONES_STROKE_SEULEMENT, iconeIncomplete} from "./icones-sidebar";

/** Un menu de l'arbre, mis à plat pour alimenter le choix du parent. */
interface OptionParent {
    uid: string;
    titre: string;
    niveau: number;
}

/** Un frère, pour le choix « placer après ». */
interface Frere {
    uid: string;
    titre: string;
    rang: number;
}

type TypeMenu = 'sub' | 'link';

/**
 * ══ MODAL DE CRÉATION / MODIFICATION D'UN MENU ══════════════════════════════
 *
 * Boîte centrée, dont la hauteur est bornée à la fenêtre : c'est le corps qui
 * défile, l'en-tête et le pied d'action restent visibles.
 *
 * Les trois champs qui étaient de la saisie libre deviennent des choix :
 *   - le type ('sub' ou 'link') pilote le reste du formulaire,
 *   - le chemin se prend dans les routes réellement déclarées,
 *   - l'icône se choisit à l'œil, dans le rendu qu'elle aura.
 */
@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, NzSelectModule,
        SvgIconComponent],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {

    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;
    /** L'arbre courant : sert au choix du parent, au placement et à l'aperçu. */
    @Input() arbre: any[] = [];

    public validationForm = new FormGroup({
        title: new FormControl('', Validators.required),
        path: new FormControl(''),
        icon: new FormControl(''),
        idmenu: new FormControl(''),
        icontype: new FormControl<TypeMenu>('link', Validators.required),
        iTrue: new FormControl(''),
        identity: new FormControl(''),
        rupture: new FormControl(''),
        rang: new FormControl(''),
        position: new FormControl(''),
        parent: new FormControl(''),
        actif: new FormControl(true),
    });

    /** uid du frère après lequel se placer ; vide = en première position. */
    apresUid: string = '';

    errorTexte: string = '';
    isloading: boolean = false;
    users: any = [];

    /** Panneau de sélection d'icône replié par défaut. */
    choixIconeOuvert = false;
    rechercheIcone = '';

    readonly icones = ICONES_SIDEBAR;
    readonly iconesIncompletes = ICONES_STROKE_SEULEMENT;
    readonly estIconeIncomplete = iconeIncomplete;

    /**
     * Les routes réellement déclarées dans l'application. Le menu écrit en dur
     * en est la source de vérité la plus fiable : le Router ne connaît pas les
     * enfants des modules chargés à la demande tant qu'on ne les a pas visités.
     */
    readonly routes: string[] = this.collecterRoutes(menuItems);

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    @HostListener('document:keydown.escape')
    handleEscKey() {
        this.closeModal();
    }

    ngOnChanges(changes: SimpleChanges) {
        const val = changes['dataLigne']?.currentValue;
        if (!val) return;

        this.validationForm.reset({icontype: 'link', actif: true});
        this.validationForm.patchValue(val);
        this.errorTexte = '';
        this.choixIconeOuvert = false;
        this.rechercheIcone = '';

        // En création, le type se déduit de l'intention : un menu racine est le
        // plus souvent une rubrique dépliante, un enfant un lien vers une page.
        if (!val.idmenu) {
            this.validationForm.patchValue({icontype: val.parent ? 'link' : 'sub'});
        }

        this.apresUid = this.dernierFrereUid();
    }

    // ── État du formulaire ───────────────────────────────────────────

    get estEdition(): boolean {
        return !!this.validationForm.value.idmenu;
    }

    get type(): TypeMenu {
        return (this.validationForm.value.icontype as TypeMenu) || 'link';
    }

    /** Une rubrique dépliante ne mène nulle part : elle ouvre ses enfants. */
    get estRubrique(): boolean {
        return this.type === 'sub';
    }

    /** Seul le premier niveau porte une icône dans la barre latérale. */
    get porteIcone(): boolean {
        return !this.validationForm.value.parent;
    }

    /**
     * La page est exigée dès qu'il y a un parent, quel que soit le type : un
     * sous-menu rattaché à un menu doit mener quelque part. Seule une rubrique
     * de premier niveau peut s'en passer — c'est elle qui ouvre ses enfants.
     */
    get pageObligatoire(): boolean {
        return !this.estRubrique || !!this.validationForm.value.parent;
    }

    get titrePanneau(): string {
        if (this.estEdition) {
            return `Modifier « ${this.validationForm.value.title || '…'} »`;
        }
        const parent = this.titreDe(this.validationForm.value.parent || '');
        return parent ? `Nouveau sous-menu de « ${parent} »` : 'Nouveau menu';
    }

    choisirType(t: TypeMenu): void {
        this.validationForm.patchValue({icontype: t});
        // Une rubrique de premier niveau n'a pas de route : on vide plutôt que
        // de poster un chemin fantôme que la barre latérale prendrait pour un
        // lien. Rattachée à un parent, elle en garde une (cf. pageObligatoire).
        if (t === 'sub' && !this.validationForm.value.parent) {
            this.validationForm.patchValue({path: ''});
        }
    }

    choisirIcone(nom: string): void {
        this.validationForm.patchValue({icon: nom});
        this.choixIconeOuvert = false;
    }

    get iconesFiltrees(): string[] {
        const q = this.rechercheIcone.trim().toLowerCase();
        const toutes = [...this.icones, ...this.iconesIncompletes];
        return q ? toutes.filter(i => i.includes(q)) : toutes;
    }

    // ── Routes ───────────────────────────────────────────────────────

    private collecterRoutes(noeuds: Menu[]): string[] {
        const vues = new Set<string>();
        const parcourir = (liste: Menu[]) => {
            (liste || []).forEach(n => {
                const p = this.normaliserRoute(n.path);
                if (p) vues.add(p);
                if (n.children?.length) parcourir(n.children);
            });
        };
        parcourir(noeuds);
        return [...vues].sort();
    }

    /**
     * menu.ts mélange les deux écritures : la plupart des entrées ont une barre
     * oblique initiale, mais « accueil » et « recherche/trouver-un-document »
     * n'en ont pas. Les écarter aurait rendu ces pages introuvables dans la
     * liste, alors qu'elles existent bel et bien.
     */
    private normaliserRoute(path?: string): string {
        const p = (path || '').trim();
        if (!p) return '';
        return p.startsWith('/') ? p : '/' + p;
    }

    /** Terme tapé dans la liste des pages ; sert aussi de route libre. */
    rechercheRoute = '';

    onRechercheRoute(v: string): void {
        this.rechercheRoute = v;
    }

    /**
     * La liste proposée. On filtre nous-mêmes (nzServerSearch) pour pouvoir
     * ajouter en tête la route tapée quand elle n'est pas déclarée : saisir un
     * chemin hors liste doit rester possible, l'écran se contente de le
     * signaler.
     */
    get routesProposees(): string[] {
        const q = this.rechercheRoute.trim();
        const base = q
            ? this.routes.filter(r => r.toLowerCase().includes(q.toLowerCase()))
            : this.routes;
        const libre = this.normaliserRoute(q);
        return libre && !this.routes.includes(libre) ? [libre, ...base] : base;
    }

    /** Un chemin saisi à la main hors de cette liste n'est pas interdit, juste signalé. */
    get routeConnue(): boolean {
        const p = this.normaliserRoute(this.validationForm.value.path || '');
        return !p || this.routes.includes(p);
    }

    // ── Arbre : parents, frères, aperçu ──────────────────────────────

    /** Les parents possibles, sans le menu édité ni sa descendance. */
    get optionsParent(): OptionParent[] {
        const exclu = this.validationForm.value.idmenu || '';
        const out: OptionParent[] = [];
        const parcourir = (noeuds: any[], niveau: number) => {
            (noeuds || []).forEach(n => {
                if (n.key === exclu) return;   // ni lui, ni ses enfants
                out.push({uid: n.key, titre: n.title, niveau});
                if (n.children?.length) parcourir(n.children, niveau + 1);
            });
        };
        parcourir(this.arbre, 1);
        return out;
    }

    /** Retrait visuel des niveaux dans la liste déroulante du parent. */
    indent(niveau: number): string {
        return '   '.repeat(Math.max(0, niveau - 1));
    }

    private noeud(uid: string, noeuds: any[] = this.arbre): any {
        for (const n of noeuds || []) {
            if (n.key === uid) return n;
            const trouve = n.children?.length ? this.noeud(uid, n.children) : null;
            if (trouve) return trouve;
        }
        return null;
    }

    private titreDe(uid: string): string {
        return this.noeud(uid)?.title || '';
    }

    /** Les futurs voisins : enfants du parent choisi, ou racines. */
    get freres(): Frere[] {
        const parent = this.validationForm.value.parent || '';
        const liste = parent ? (this.noeud(parent)?.children || []) : this.arbre;
        const moi = this.validationForm.value.idmenu || '';
        return (liste || [])
            .filter((n: any) => n.key !== moi)
            .map((n: any) => ({uid: n.key, titre: n.title, rang: Number(n.rang ?? 0)}))
            .sort((a: Frere, b: Frere) => a.rang - b.rang);
    }

    private dernierFrereUid(): string {
        const f = this.freres;
        return f.length ? f[f.length - 1].uid : '';
    }

    /** L'aperçu : les frères dans l'ordre, avec l'entrée en cours insérée. */
    get apercu(): { titre: string; icone: string; nouveau: boolean }[] {
        const entree = {
            titre: this.validationForm.value.title || 'Sans titre',
            icone: (this.porteIcone && this.validationForm.value.icon) || '',
            nouveau: true,
        };
        const voisins = this.freres.map(f => ({
            titre: f.titre,
            icone: this.porteIcone ? (this.noeud(f.uid)?.icon || '') : '',
            nouveau: false,
        }));
        const i = this.freres.findIndex(f => f.uid === this.apresUid);
        const pos = this.apresUid && i >= 0 ? i + 1 : 0;
        voisins.splice(pos, 0, entree);
        return voisins;
    }

    /**
     * Le rang envoyé découle du placement choisi. On ne renumérote pas les
     * frères : l'API n'accepte qu'un menu par appel, et une renumérotation
     * interrompue en cours laisserait l'ordre incohérent.
     */
    private rangCalcule(): number {
        if (!this.apresUid) {
            const premier = this.freres[0];
            return premier ? Math.max(1, premier.rang - 1) : 1;
        }
        const apres = this.freres.find(f => f.uid === this.apresUid);
        return apres ? apres.rang + 1 : this.freres.length + 1;
    }

    // ── Enregistrement ───────────────────────────────────────────────

    submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();

        // Le caractère obligatoire du chemin dépend du type ET du rattachement :
        // d'où une validation portée ici plutôt qu'un Validators.required figé
        // sur le contrôle.
        if (this.pageObligatoire && !(this.validationForm.value.path || '').trim()) {
            this.errorTexte = this.validationForm.value.parent
                ? 'Un sous-menu doit pointer vers une page.'
                : 'Un lien direct doit pointer vers une page.';
            return;
        }
        if (!this.validationForm.valid) return;

        this.isloading = true;
        const payload = {
            ...this.validationForm.value,
            action: this.validationForm.value.idmenu ? 2 : 1,
            idmenu: this.validationForm.value.idmenu || '',
            rang: this.rangCalcule(),
            position: this.validationForm.value.position || 0,
            identity: this.validationForm.value.identity || 0,
            itrue: this.validationForm.value.iTrue || 1,
            rupture: this.validationForm.value.rupture || 0,
            idsociete: this.users?.datasociete?.uid || this.users?.uidsociete,
        };

        this.httService.postData(`${environment.api_url}auth/:menu`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.closeModal(true);
                    Swal.fire({title: res?.body?.message, icon: 'success', confirmButtonText: 'OK'});
                } else {
                    this.errorTexte = res?.body?.message || 'Une erreur est survenue !';
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || 'Une erreur est survenue !';
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }
}
