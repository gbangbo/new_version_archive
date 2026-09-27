import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import Swal from 'sweetalert2';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {SvgIconComponent} from '../../../shared/components/ui/svg-icon/svg-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';

/**
 * Une action qu'un rôle peut se voir accorder sur une page : une colonne de
 * la matrice. Elles viennent de `auth/:types-objets`, l'écran « Menu > Actions »,
 * et non plus d'une liste écrite en dur.
 */
export interface ActionPermission {
    /** uid du type d'objet — c'est lui qui identifie la colonne. */
    cle: string;
    code: string;
    libelle: string;
    icone: string;
}

/**
 * Icône déduite du code de l'action (SAVE, DELETE, …) ou, à défaut, de son
 * libellé. Le back ne fournit pas d'icône ; plutôt que d'en imposer une seule
 * pour tout le monde, on reconnaît les verbes courants.
 */
const ICONES_ACTION: [RegExp, string][] = [
    [/consult|read|voir|lecture/i, 'fa-regular fa-eye'],
    [/cre|creat|ajout|add|save|enregis|nouveau/i, 'fa-solid fa-plus'],
    [/modif|updat|edit/i, 'fa-regular fa-pen-to-square'],
    [/suppr|delet|retir/i, 'fa-regular fa-trash-can'],
    [/export|telech|download/i, 'fa-solid fa-file-export'],
    [/import|upload/i, 'fa-solid fa-file-import'],
    [/imprim|print/i, 'fa-solid fa-print'],
    [/valid|approb|approuv/i, 'fa-regular fa-circle-check'],
    [/envoi|envoy|send|transmi/i, 'fa-regular fa-paper-plane'],
    [/partag|share/i, 'fa-solid fa-share-nodes'],
];

function iconePourAction(code: string, libelle: string): string {
    const texte = `${code || ''} ${libelle || ''}`;
    const trouve = ICONES_ACTION.find(([motif]) => motif.test(texte));
    return trouve ? trouve[1] : 'fa-regular fa-square-check';
}

interface Role {
    uid: string;
    libelle: string;
    code: string;
}

/**
 * Une ligne du tableau : un menu ou un sous-menu.
 *
 * `cibles` porte les pages réellement concernées — la ligne elle-même si elle
 * a une route, sinon toute sa descendance. C'est ce qui permet de traiter de
 * la même façon une ligne de page et une ligne de rubrique, dont la case vaut
 * « toutes les pages en dessous ».
 */
interface Ligne {
    uid: string;
    titre: string;
    icone: string;
    profondeur: number;
    estRubrique: boolean;
    cibles: string[];
}

/**
 * ══ RÔLES & PERMISSIONS ═════════════════════════════════════════════════════
 *
 * On choisit un rôle, puis on coche ce qu'il peut faire : les actions en
 * colonnes, les menus et sous-menus en lignes.
 *
 * Les lignes ne listent QUE les menus attribués au rôle, lus sur
 * auth/:rolemenu. L'enchaînement est donc : on donne d'abord des menus à un
 * rôle (écran « Rôles & menus »), puis on précise ici ce qu'il peut y faire.
 * Afficher toute l'arborescence n'aurait pas de sens — on accorderait des
 * droits sur des pages auxquelles le rôle n'a pas accès.
 *
 * La hiérarchie est conservée : un parent est gardé dès qu'un de ses
 * sous-menus est attribué, sinon les lignes flotteraient sans contexte. Une
 * rubrique dépliante n'a pas de route, sa case applique l'action à toutes les
 * pages qu'elle contient.
 */
@Component({
    selector: 'app-roles-permission',
    imports: [CommonModule, FormsModule, NzSelectModule, NzToolTipModule,
        CardComponent, FeatherIconComponent, SvgIconComponent],
    templateUrl: './roles-permission.component.html',
    styleUrl: './roles-permission.component.scss',
})
export class RolesPermissionComponent implements OnInit {

    private users: any = {};

    isloading = false;
    isSaving = false;
    erreur = '';

    /** Les colonnes de la matrice, chargées depuis « Menu > Actions ». */
    actions: ActionPermission[] = [];

    roles: Role[] = [];
    roleUid = '';

    /** L'arbre complet, tel que renvoyé par auth/:menu. */
    private arbre: any[] = [];
    /** Les lignes affichées : l'arbre réduit aux menus du rôle choisi. */
    lignes: Ligne[] = [];
    recherche = '';

    /** uid des rubriques repliées. Tout est déplié au départ : on vient cocher. */
    private replies = new Set<string>();


    /**
     * Les actions réellement disponibles page par page, d'après
     * « Menu > Actions par menu » (`auth/:type-objets-menus`) :
     * uid du menu -> uid des actions qui lui sont associées et visibles.
     * Une case n'est cochable que si le couple existe ici.
     */
    private assocParMenu = new Map<string, Set<string>>();

    /** Permissions retenues, sous la forme `idmenu:action`. */
    private accordees = new Set<string>();
    /** La référence pour ne poster que la différence, et pour « Annuler ». */
    private initial = new Set<string>();

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.chargerRoles();
        this.chargerActions();
        this.chargerAssociations();
        this.chargerMenus();
    }

    private get idsociete(): string {
        return this.users?.datasociete?.uid || this.users?.uidsociete || '';
    }

    private get token(): string {
        return this.users?.access_token || '';
    }

    get role(): Role | undefined {
        return this.roles.find(r => r.uid === this.roleUid);
    }

    // ── Chargement ───────────────────────────────────────────

    chargerRoles(): void {
        this.httService.getData(
            `${environment.api_url}auth/:saveroles?idsociete=${this.idsociete}&idrole=`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.roles = (res.body.data || []).map((e: any) => ({
                        uid: e?.uid || '',
                        libelle: e?.libelle_role || '',
                        code: e?.code_role || '',
                    }));
                }
            })
            .catch(() => this.erreur = 'Chargement des rôles impossible.');
    }

    /**
     * Les colonnes : les types d'objets de la société, tels que saisis dans
     * « Menu > Actions ». Sans eux la matrice n'a aucune colonne — c'est
     * volontaire, on ne réinvente pas une liste par défaut côté front.
     */
    chargerActions(): void {
        this.httService.getData(
            `${environment.api_url}auth/:types-objets?idsociete=${this.idsociete}&idtypeobjet=`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.actions = (res.body.data || [])
                        .map((e: any) => {
                            const code = e?.code_type_objet || '';
                            const libelle = e?.lib_type_objet || code;
                            return {
                                cle: e?.uid || e?.idtypeobjet || e?.id || '',
                                code,
                                libelle,
                                icone: iconePourAction(code, libelle),
                            };
                        })
                        .filter((a: ActionPermission) => a.cle);
                }
            })
            .catch(() => this.erreur = 'Chargement des actions impossible.');
    }

    /**
     * Les couples page ↔ action définis dans « Actions par menu ». Sans couple,
     * la case reste vide : accorder « Supprimer » sur une page où le bouton
     * n'existe pas n'aurait aucun effet.
     */
    chargerAssociations(): void {
        this.httService.getData(
            `${environment.api_url}auth/:type-objets-menus?idsociete=${this.idsociete}&idmenu=&idtypeobjet=`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                if (!(res?.body?.status || res?.body?.success)) return;

                const map = new Map<string, Set<string>>();
                (res.body.data || []).forEach((e: any) => {
                    const idmenu = e?.uidmenu || e?.idmenu || e?.menu?.uid || '';
                    const idaction = e?.uidtypeobjet || e?.idtypeobjet
                        || e?.typeobjet?.uid || e?.type_objet?.uid || '';
                    const visible = e?.visible ?? e?.actif ?? true;
                    if (!idmenu || !idaction || !visible) return;
                    if (!map.has(idmenu)) map.set(idmenu, new Set<string>());
                    map.get(idmenu)!.add(idaction);
                });
                this.assocParMenu = map;
            })
            .catch(() => this.erreur = 'Chargement des actions par menu impossible.');
    }

    /**
     * L'info-bulle d'une cellule sans case. Le texte vit ici et non dans le
     * template : une apostrophe dans une expression Angular casse le parseur.
     */
    messageSansCible(l: Ligne, a: ActionPermission): string {
        return l.cibles.length
            ? `« ${a.libelle} » n'est pas associée à cette page (Menu › Actions par menu)`
            : 'Cette rubrique ne contient aucune page';
    }

    /** Cette action est-elle prévue sur cette page ? */
    actionDisponible(idmenu: string, action: string): boolean {
        return this.assocParMenu.get(idmenu)?.has(action) ?? false;
    }

    /**
     * Les pages d'une ligne réellement concernées par une action : ses cibles,
     * réduites à celles qui portent cette action. Pour une rubrique, cocher
     * n'agit donc que sur les pages où l'action existe.
     */
    ciblesPour(l: Ligne, action: string): string[] {
        return l.cibles.filter(uid => this.actionDisponible(uid, action));
    }

    chargerMenus(): void {
        this.isloading = true;
        this.httService.getData(
            `${environment.api_url}auth/:menu?idsociete=${this.idsociete}`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res?.body?.status || res?.body?.success) {
                    this.arbre = res.body.data || [];
                    if (this.roleUid) this.chargerMenusDuRole(this.roleUid);
                }
            })
            .catch(() => {
                this.isloading = false;
                this.erreur = 'Chargement des menus impossible.';
            });
    }

    /**
     * L'arbre mis à plat, réduit aux menus attribués au rôle.
     *
     * Un nœud est gardé s'il est lui-même attribué ou s'il porte un
     * descendant attribué : sans ça, un sous-menu accordé apparaîtrait sans
     * sa rubrique et on ne saurait plus d'où il vient.
     */
    private construireLignes(data: any[], attribues: Set<string>): Ligne[] {
        const out: Ligne[] = [];

        const retenu = (noeud: any): boolean =>
            attribues.has(noeud?.uid)
            || (noeud?.children || []).some((e: any) => retenu(e));

        const parcourir = (noeud: any, profondeur: number) => {
            const enfants = (noeud?.children || [])
                .filter((e: any) => e?.actif !== false && retenu(e))
                .sort((a: any, b: any) => Number(a?.rang ?? 0) - Number(b?.rang ?? 0));

            out.push({
                uid: noeud?.uid || '',
                titre: noeud?.title || '',
                icone: noeud?.icon || '',
                profondeur,
                estRubrique: enfants.length > 0,
                cibles: this.collecterCibles(noeud, attribues),
            });

            enfants.forEach((e: any) => parcourir(e, profondeur + 1));
        };

        (data || [])
            .filter(e => e?.actif !== false && retenu(e))
            .sort((a, b) => Number(a?.rang ?? 0) - Number(b?.rang ?? 0))
            .forEach(m => parcourir(m, 0));

        return out;
    }

    /**
     * Les pages sur lesquelles la case d'une ligne agit : celles qui portent
     * une route ET que le rôle possède. Accorder « Créer » sur une page à
     * laquelle il n'a pas accès n'aurait aucun effet.
     */
    private collecterCibles(noeud: any, attribues: Set<string>): string[] {
        const out: string[] = [];
        if ((noeud?.path || '').trim() && noeud?.uid && attribues.has(noeud.uid)) {
            out.push(noeud.uid);
        }
        (noeud?.children || [])
            .filter((e: any) => e?.actif !== false)
            .forEach((e: any) => out.push(...this.collecterCibles(e, attribues)));
        return out;
    }

    // ── Sélection du rôle ────────────────────────────────────

    changerRole(uid: string): void {
        if (uid === this.roleUid) return;

        if (this.modifie) {
            Swal.fire({
                title: 'Modifications non enregistrées',
                text: 'Changer de rôle abandonnera les permissions que vous venez de cocher.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Changer quand même',
                cancelButtonText: 'Rester',
                confirmButtonColor: '#00366e',
                cancelButtonColor: '#94A3B8',
                reverseButtons: true,
            }).then(r => {
                if (r.isConfirmed) this.ouvrirRole(uid);
            });
            return;
        }
        this.ouvrirRole(uid);
    }

    private ouvrirRole(uid: string): void {
        this.roleUid = uid;
        this.lignes = [];
        this.accordees.clear();
        this.initial.clear();
        this.replies.clear();
        if (uid) this.chargerMenusDuRole(uid);
    }

    /**
     * Les menus du rôle, via auth/:rolemenu — le même endpoint que l'écran
     * « Rôles & menus ». C'est lui qui détermine les lignes du tableau.
     *
     * Forme de la réponse : une ligne par lien rôle↔menu, avec `dataroles` et
     * `datamenu` en TABLEAUX. On filtre sur le rôle ouvert (la réponse mêle
     * plusieurs rôles) et on ne prend que les entrées de premier rang de
     * `datamenu` : leurs `children` sont la descendance du menu telle que la
     * porte le modèle, pas des droits accordés.
     */
    private chargerMenusDuRole(idroles: string): void {
        this.isloading = true;
        this.httService.getData(
            `${environment.api_url}auth/:rolemenu?idrole=${idroles}&idsociete=${this.idsociete}`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                const attribues = new Set<string>();

                if (res?.body?.status || res?.body?.success) {
                    (res.body.data || []).forEach((ligne: any) => {
                        const concerne = (ligne?.dataroles || [])
                            .some((r: any) => r?.uid === idroles);
                        if (!concerne) return;
                        (ligne?.datamenu || []).forEach((m: any) => {
                            if (m?.uid) attribues.add(m.uid);
                        });
                    });
                }

                this.lignes = this.construireLignes(this.arbre, attribues);
            })
            .catch(() => {
                this.isloading = false;
                this.erreur = "Chargement des menus du rôle impossible.";
            });
    }

    // ── Cases ────────────────────────────────────────────────

    private cle(idmenu: string, action: string): string {
        return `${idmenu}:${action}`;
    }

    /** Une ligne est cochée quand toutes ses pages concernées le sont. */
    estCochee(l: Ligne, action: string): boolean {
        const cibles = this.ciblesPour(l, action);
        return cibles.length > 0
            && cibles.every(uid => this.accordees.has(this.cle(uid, action)));
    }

    /** Une rubrique dont une partie seulement des pages a l'action. */
    estPartielle(l: Ligne, action: string): boolean {
        const cibles = this.ciblesPour(l, action);
        const n = cibles.filter(uid => this.accordees.has(this.cle(uid, action))).length;
        return n > 0 && n < cibles.length;
    }

    /**
     * Chaque action est indépendante : cocher « Supprimer » ne coche rien
     * d'autre. J'avais lié les actions à « Consulter » — toute action
     * suppose d'ouvrir la page — mais une case qui s'allume seule surprend
     * plus qu'elle n'aide, et empêche d'exprimer un cas volontairement
     * partiel. Si cette règle doit exister, sa place est côté serveur.
     */
    basculer(l: Ligne, action: string): void {
        const cibles = this.ciblesPour(l, action);
        if (!cibles.length) return;                 // action non prévue sur cette page
        const cible = !this.estCochee(l, action) || this.estPartielle(l, action);
        cibles.forEach(uid => cible
            ? this.accordees.add(this.cle(uid, action))
            : this.accordees.delete(this.cle(uid, action)));
    }

    // ── En-tête : toute une colonne d'action ─────────────────

    /** Les pages affichées sur lesquelles cette action est prévue. */
    private pagesPourAction(action: string): string[] {
        return this.pagesVisibles.filter(uid => this.actionDisponible(uid, action));
    }

    colonneCochee(action: string): boolean {
        const pages = this.pagesPourAction(action);
        return pages.length > 0 && pages.every(uid => this.accordees.has(this.cle(uid, action)));
    }

    colonnePartielle(action: string): boolean {
        const pages = this.pagesPourAction(action);
        const n = pages.filter(uid => this.accordees.has(this.cle(uid, action))).length;
        return n > 0 && n < pages.length;
    }

    basculerColonne(action: string): void {
        const cible = !this.colonneCochee(action);
        this.pagesPourAction(action).forEach(uid => cible
            ? this.accordees.add(this.cle(uid, action))
            : this.accordees.delete(this.cle(uid, action)));
    }

    /**
     * Les pages retenues par la recherche, sans doublon. On s'appuie sur
     * `lignesRecherchees` et non sur l'affichage : replier une rubrique la
     * masque, ça ne doit rien retirer ni fausser les compteurs.
     */
    private get pagesVisibles(): string[] {
        return [...new Set(this.lignesRecherchees.flatMap(l => l.cibles))];
    }

    /** Combien de pages ont cette action accordée, pour l'en-tête de colonne. */
    nbPourAction(action: string): number {
        return this.pagesPourAction(action)
            .filter(uid => this.accordees.has(this.cle(uid, action))).length;
    }

    /** Sur combien de pages cette action est-elle prévue — le dénominateur. */
    nbPagesPourAction(action: string): number {
        return this.pagesPourAction(action).length;
    }

    get nbPages(): number {
        return this.pagesVisibles.length;
    }

    // ── Repli des rubriques ──────────────────────────────────

    estReplie(l: Ligne): boolean {
        return this.replies.has(l.uid);
    }

    basculerRepli(l: Ligne, event: Event): void {
        event.stopPropagation();
        this.replies.has(l.uid) ? this.replies.delete(l.uid) : this.replies.add(l.uid);
    }

    toutReplier(): void {
        this.lignes.filter(l => l.estRubrique).forEach(l => this.replies.add(l.uid));
    }

    toutDeplier(): void {
        this.replies.clear();
    }

    get toutEstReplie(): boolean {
        const rubriques = this.lignes.filter(l => l.estRubrique);
        return rubriques.length > 0 && rubriques.every(l => this.replies.has(l.uid));
    }

    /**
     * Masque la descendance des rubriques repliées. La liste étant à plat, on
     * retient la profondeur du dernier parent replié et on saute tout ce qui
     * est en dessous, jusqu'à retrouver ce niveau.
     */
    private appliquerRepli(lignes: Ligne[]): Ligne[] {
        const out: Ligne[] = [];
        let masqueSous = -1;

        for (const l of lignes) {
            if (masqueSous >= 0 && l.profondeur > masqueSous) continue;
            masqueSous = -1;
            out.push(l);
            if (l.estRubrique && this.replies.has(l.uid)) masqueSous = l.profondeur;
        }
        return out;
    }

    // ── Recherche ────────────────────────────────────────────

    /**
     * On garde une rubrique dès qu'elle-même ou l'un de ses sous-menus
     * correspond : masquer le parent laisserait ses enfants sans contexte.
     */
    get lignesFiltrees(): Ligne[] {
        return this.appliquerRepli(this.lignesRecherchees);
    }

    private get lignesRecherchees(): Ligne[] {
        const q = this.recherche.trim().toLowerCase();
        if (!q) return this.lignes;

        const gardees = new Set<number>();
        this.lignes.forEach((l, i) => {
            if (!l.titre.toLowerCase().includes(q)) return;
            gardees.add(i);
            // On remonte jusqu'aux parents pour conserver la hiérarchie.
            for (let j = i - 1, p = l.profondeur; j >= 0 && p > 0; j--) {
                if (this.lignes[j].profondeur < p) {
                    gardees.add(j);
                    p = this.lignes[j].profondeur;
                }
            }
        });
        return this.lignes.filter((_, i) => gardees.has(i));
    }

    get nbAccordees(): number {
        return this.accordees.size;
    }

    /** Le total possible ne compte que les couples page ↔ action existants. */
    get nbPossibles(): number {
        return this.actions.reduce((n, a) => n + this.nbPagesPourAction(a.cle), 0);
    }

    get modifie(): boolean {
        if (!this.roleUid) return false;
        if (this.accordees.size !== this.initial.size) return true;
        for (const k of this.accordees) {
            if (!this.initial.has(k)) return true;
        }
        return false;
    }

    // ══ PERSISTANCE ═════════════════════════════════════════════════════════
    //
    // Il n'existe AUCUN endpoint de permissions. auth/:rolemenu dit quels
    // menus un rôle possède — c'est ce qui alimente les lignes — mais rien ne
    // sait encore stocker le détail « créer / modifier / supprimer… ».
    //
    // Conséquence assumée : les cases repartent vides à chaque ouverture d'un
    // rôle, faute de lecture possible. Rien n'est perdu, rien n'a jamais été
    // écrit.
    //
    // `enregistrer()` est la SEULE méthode à connaître le contrat supposé.
    // Le jour où l'endpoint est fixé, il n'y a qu'elle à reprendre :
    //   POST auth/:rolepermission
    //        → { action: 1|3, idroles, idmenu, permission, idsociete }
    //     (`action` numérique = le verbe CRUD du parseur, `permission` = la
    //      permission accordée ; les deux ne doivent pas être confondus.)

    private readonly URL_PERMISSIONS = `${environment.api_url}auth/:rolepermission`;

    /**
     * On ne poste que la différence : `action: 1` pour les permissions
     * nouvellement cochées, `action: 3` pour celles retirées. Les appels
     * s'enchaînent et le résultat est annoncé tel quel.
     */
    async enregistrer(): Promise<void> {
        if (!this.roleUid || this.isSaving || !this.modifie) return;

        const aAjouter = [...this.accordees].filter(k => !this.initial.has(k));
        const aRetirer = [...this.initial].filter(k => !this.accordees.has(k));

        this.isSaving = true;
        let ok = 0;
        let echecs = 0;

        const poster = async (k: string, verbe: 1 | 3) => {
            const [idmenu, idtypeobjet] = k.split(':');
            const action = this.actions.find(a => a.cle === idtypeobjet);
            try {
                const res: any = await this.httService.postData(this.URL_PERMISSIONS, {
                    action: verbe,
                    idroles: this.roleUid,
                    idmenu,
                    idtypeobjet,
                    permission: action?.code || idtypeobjet,
                    idsociete: this.idsociete,
                }, this.token).toPromise();
                (res?.body?.status || res?.body?.success) ? ok++ : echecs++;
            } catch {
                echecs++;
            }
        };

        for (const k of aAjouter) await poster(k, 1);
        for (const k of aRetirer) await poster(k, 3);

        this.isSaving = false;

        Swal.fire({
            title: echecs ? 'Enregistrement partiel' : 'Permissions enregistrées',
            html: echecs
                ? `${ok} permission(s) appliquée(s), ${echecs} en échec.`
                : `${ok} modification(s) pour « ${this.role?.libelle} ».`,
            icon: echecs ? 'warning' : 'success',
            confirmButtonText: 'OK',
        });

        // Faute de lecture possible, on prend l'état à l'écran comme nouvelle
        // référence plutôt que de tout vider : recharger effacerait sous les
        // yeux de l'utilisateur ce qu'il vient d'enregistrer.
        this.initial = new Set(this.accordees);
    }

    annuler(): void {
        this.accordees = new Set(this.initial);
    }
}
