import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import Swal from 'sweetalert2';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {SvgIconComponent} from '../../../shared/components/ui/svg-icon/svg-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';

interface Role {
    uid: string;
    libelle: string;
    code: string;
}

interface MenuNode {
    uid: string;
    titre: string;
    path: string;
    icone: string;
    actif: boolean;
    enfants: MenuNode[];
}

/**
 * ══ RÔLES & MENUS ═══════════════════════════════════════════════════════════
 *
 * Deux volets : les rôles à gauche, l'arbre des menus à droite. On choisit un
 * rôle, on coche ce qu'il a le droit de voir, on enregistre.
 *
 * Endpoints :
 *   GET  auth/:saveroles?idsociete=            → les rôles
 *   GET  auth/:menu?idsociete=                 → l'arbre des menus
 *   GET  auth/:rolemenu?idroles=&idsociete=    → les menus déjà attribués
 *   POST auth/:rolemenu                        → action 5 = mise à jour en masse
 *
 * L'enregistrement tient en un appel : `action: 5` avec la liste complète des
 * uid de menus retenus, que le back substitue à l'existant.
 */
@Component({
    selector: 'app-roles-menu',
    imports: [CommonModule, FormsModule, NzToolTipModule,
        CardComponent, FeatherIconComponent, SvgIconComponent],
    templateUrl: './roles-menu.component.html',
    styleUrl: './roles-menu.component.scss',
})
export class RolesMenuComponent implements OnInit {

    private users: any = {};

    isloadingRoles = false;
    isloadingMenus = false;
    isSaving = false;
    erreur = '';

    // ── Volet gauche ─────────────────────────────────────────
    roles: Role[] = [];
    rechercheRole = '';
    roleSelectionne: Role | null = null;

    // ── Volet droit ──────────────────────────────────────────
    arbre: MenuNode[] = [];
    rechercheMenu = '';
    /** uid des menus repliés. Tout est déplié au départ : on vient cocher. */
    private replies = new Set<string>();
    /** Repli du nœud racine, qui porte tout l'arbre. */
    racineRepliee = false;

    /** uid des menus cochés pour le rôle courant. */
    coches = new Set<string>();
    /** L'état au chargement, pour ne poster que ce qui a changé. */
    private initial = new Set<string>();

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.chargerRoles();
        this.chargerMenus();
    }

    private get idsociete(): string {
        return this.users?.datasociete?.uid || this.users?.uidsociete || '';
    }

    private get token(): string {
        return this.users?.access_token || '';
    }

    // ── Chargement ───────────────────────────────────────────

    chargerRoles(): void {
        this.isloadingRoles = true;
        this.httService.getData(
            `${environment.api_url}auth/:saveroles?idsociete=${this.idsociete}&idrole=`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                this.isloadingRoles = false;
                if (res?.body?.status || res?.body?.success) {
                    this.roles = (res.body.data || []).map((e: any) => ({
                        uid: e?.uid || '',
                        libelle: e?.libelle_role || '',
                        code: e?.code_role || '',
                    }));
                }
            })
            .catch(() => {
                this.isloadingRoles = false;
                this.erreur = 'Chargement des rôles impossible.';
            });
    }

    chargerMenus(): void {
        this.isloadingMenus = true;
        this.httService.getData(
            `${environment.api_url}auth/:menu?idsociete=${this.idsociete}`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                this.isloadingMenus = false;
                if (res?.body?.status || res?.body?.success) {
                    this.arbre = this.mapper(res.body.data || []);
                }
            })
            .catch(() => {
                this.isloadingMenus = false;
                this.erreur = 'Chargement des menus impossible.';
            });
    }

    private mapper(data: any[]): MenuNode[] {
        return (data || [])
            .sort((a, b) => Number(a?.rang ?? 0) - Number(b?.rang ?? 0))
            .map(e => ({
                uid: e?.uid || '',
                titre: e?.title || '',
                path: e?.path || '',
                icone: e?.icon || '',
                actif: e?.actif !== false,
                enfants: e?.children?.length ? this.mapper(e.children) : [],
            }));
    }

    // ── Sélection d'un rôle ──────────────────────────────────

    choisirRole(role: Role): void {
        if (this.roleSelectionne?.uid === role.uid) return;

        if (this.modifie) {
            Swal.fire({
                title: 'Modifications non enregistrées',
                text: 'Changer de rôle abandonnera les cases que vous venez de cocher.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Changer quand même',
                cancelButtonText: 'Rester',
                confirmButtonColor: '#00366e',
                cancelButtonColor: '#94A3B8',
                reverseButtons: true,
            }).then(r => {
                if (r.isConfirmed) this.ouvrirRole(role);
            });
            return;
        }
        this.ouvrirRole(role);
    }

    private ouvrirRole(role: Role): void {
        this.roleSelectionne = role;
        this.coches.clear();
        this.initial.clear();
        this.chargerAttributions(role);
    }

    /**
     * Les menus déjà attribués au rôle, qui pré-cochent les cases.
     *
     * Forme de la réponse — une ligne par lien rôle↔menu :
     *   { dataroles: [ {uid, libelle_role, …} ],
     *     datamenu:  [ {uid, title, path, children: […]} ],
     *     datasociete: [ {…} ] }
     *
     * Les trois champs sont des TABLEAUX, y compris `datamenu` : c'est ce qui
     * faisait échouer le pré-cochage tant que je lisais `datamenu.uid`.
     */
    private chargerAttributions(role: Role): void {
        this.isloadingMenus = true;
        this.httService.getData(
            `${environment.api_url}auth/:rolemenu?idrole=${role.uid}&idsociete=${this.idsociete}`,
            false, this.token
        ).toPromise()
            .then((res: any) => {
                this.isloadingMenus = false;
                if (!(res?.body?.status || res?.body?.success)) return;
                this.retenirAttributions(res.body.data || [], role);
            })
            .catch(() => {
                this.isloadingMenus = false;
                this.erreur = "Chargement des menus du rôle impossible.";
            });
    }

    /**
     * On ne retient que les menus du rôle ouvert : la réponse observée mêle
     * les lignes de plusieurs rôles, on filtre donc sur `dataroles`.
     *
     * Et on ne prend que les entrées de premier rang de `datamenu`, sans
     * descendre dans leurs `children` : ceux-ci ne sont que la descendance du
     * menu telle que la porte le modèle, pas des droits accordés. Le back crée
     * bien une ligne distincte par sous-menu attribué — « Documents » et ses
     * cinq enfants apparaissent chacun sur sa propre ligne.
     */
    private retenirAttributions(lignes: any[], role: Role): void {
        (lignes || []).forEach((ligne: any) => {
            const concerne = (ligne?.dataroles || []).some((r: any) => r?.uid === role.uid);
            if (!concerne) return;

            (ligne?.datamenu || []).forEach((m: any) => {
                if (!m?.uid) return;
                this.coches.add(m.uid);
                this.initial.add(m.uid);
            });
        });
    }

    // ── Cases à cocher ───────────────────────────────────────

    estCoche(n: MenuNode): boolean {
        return this.coches.has(n.uid);
    }

    /**
     * Ce qu'une case coche réellement : le nœud et sa descendance, moins les
     * menus inactifs. Un menu désactivé n'apparaît dans aucune barre latérale,
     * l'attribuer à un rôle ne voudrait rien dire.
     */
    private cibles(n: MenuNode): MenuNode[] {
        return [n, ...this.descendants(n)].filter(d => d.actif);
    }

    /** Une ligne sans aucune cible active n'est pas cochable. */
    estCochable(n: MenuNode): boolean {
        return this.cibles(n).length > 0;
    }

    /** Un parent dont une partie seulement des enfants actifs est cochée. */
    estPartiel(n: MenuNode): boolean {
        if (!n.enfants.length) return false;
        const tous = this.descendants(n).filter(d => d.actif);
        const nb = tous.filter(d => this.coches.has(d.uid)).length;
        return nb > 0 && nb < tous.length;
    }

    /**
     * Cocher un parent coche sa descendance, et inversement : un menu sans
     * aucun de ses sous-menus n'ouvrirait rien dans la barre latérale.
     */
    basculer(n: MenuNode): void {
        const cibles = this.cibles(n);
        if (!cibles.length) return;

        const cible = !cibles.every(d => this.coches.has(d.uid));
        cibles.forEach(d => cible ? this.coches.add(d.uid) : this.coches.delete(d.uid));
        // Un enfant coché implique son parent, sinon l'entrée serait inatteignable.
        if (cible) this.cocherAscendants(n);
    }

    private cocherAscendants(cible: MenuNode): void {
        const remonter = (noeuds: MenuNode[], chemin: MenuNode[]): void => {
            noeuds.forEach(n => {
                if (n.uid === cible.uid) {
                    chemin.filter(p => p.actif).forEach(p => this.coches.add(p.uid));
                    return;
                }
                if (n.enfants.length) remonter(n.enfants, [...chemin, n]);
            });
        };
        remonter(this.arbre, []);
    }

    private descendants(n: MenuNode): MenuNode[] {
        const out: MenuNode[] = [];
        const parcourir = (liste: MenuNode[]) => liste.forEach(e => {
            out.push(e);
            if (e.enfants.length) parcourir(e.enfants);
        });
        parcourir(n.enfants);
        return out;
    }

    /** Tous les nœuds attribuables, c'est-à-dire actifs. */
    private tousLesNoeuds(): MenuNode[] {
        const out: MenuNode[] = [];
        const parcourir = (liste: MenuNode[]) => liste.forEach(e => {
            out.push(e);
            if (e.enfants.length) parcourir(e.enfants);
        });
        parcourir(this.arbre);
        return out.filter(n => n.actif);
    }

    toutCocher(): void {
        this.tousLesNoeuds().forEach(n => this.coches.add(n.uid));
    }

    toutDecocher(): void {
        this.coches.clear();
    }

    // ── Nœud racine ──────────────────────────────────────────
    // Une ligne qui chapeaute l'arbre : sa case coche ou décoche tout, son
    // chevron replie l'ensemble. Plus direct que deux liens « tout cocher ».

    get libelleRacine(): string {
        const societe = this.users?.datasociete?.raison_sociale
            || this.users?.datasociete?.libelle || '';
        return societe ? `${societe} | MENU` : 'MENU';
    }

    get racineCochee(): boolean {
        const actifs = this.tousLesNoeuds();
        return actifs.length > 0 && actifs.every(n => this.coches.has(n.uid));
    }

    get racinePartielle(): boolean {
        return this.coches.size > 0 && !this.racineCochee;
    }

    basculerRacine(): void {
        this.racineCochee ? this.toutDecocher() : this.toutCocher();
    }

    get nbCoches(): number {
        return this.coches.size;
    }

    get nbMenus(): number {
        return this.tousLesNoeuds().length;
    }

    /** Y a-t-il quelque chose à enregistrer ? */
    get modifie(): boolean {
        if (!this.roleSelectionne) return false;
        if (this.coches.size !== this.initial.size) return true;
        for (const uid of this.coches) {
            if (!this.initial.has(uid)) return true;
        }
        return false;
    }

    // ── Repli des branches ───────────────────────────────────

    estReplie(n: MenuNode): boolean {
        return this.replies.has(n.uid);
    }

    basculerRepli(n: MenuNode, event: Event): void {
        event.stopPropagation();
        this.replies.has(n.uid) ? this.replies.delete(n.uid) : this.replies.add(n.uid);
    }

    // ── Recherche ────────────────────────────────────────────

    get rolesFiltres(): Role[] {
        const q = this.rechercheRole.trim().toLowerCase();
        if (!q) return this.roles;
        return this.roles.filter(r =>
            `${r.libelle} ${r.code}`.toLowerCase().includes(q));
    }

    /** Filtre l'arbre en gardant les parents des correspondances. */
    get arbreFiltre(): MenuNode[] {
        const q = this.rechercheMenu.trim().toLowerCase();
        if (!q) return this.arbre;

        const filtrer = (noeuds: MenuNode[]): MenuNode[] => {
            const out: MenuNode[] = [];
            noeuds.forEach(n => {
                const enfants = filtrer(n.enfants);
                const correspond = `${n.titre} ${n.path}`.toLowerCase().includes(q);
                if (correspond || enfants.length) {
                    out.push({...n, enfants: enfants.length ? enfants : n.enfants});
                }
            });
            return out;
        };
        return filtrer(this.arbre);
    }

    // ── Enregistrement ───────────────────────────────────────

    /**
     * Un seul appel : `action: 5` (mise à jour en masse) remplace l'ensemble
     * des menus du rôle par la liste envoyée dans `datamenu`.
     *
     * Avant, il fallait enchaîner une création par case cochée et une
     * suppression par case décochée — avec le risque qu'une interruption
     * laisse les droits à moitié appliqués. Ce n'est plus le cas : c'est tout
     * ou rien, et il n'y a plus de différence à calculer pour enregistrer.
     *
     * Noter que le POST nomme ses paramètres `uid…` là où le GET utilise
     * `idroles` : ce sont bien deux conventions distinctes, pas une faute.
     */
    async enregistrer(): Promise<void> {
        if (!this.roleSelectionne || this.isSaving || !this.modifie) return;

        this.isSaving = true;
        const role = this.roleSelectionne;
        console.log("payload ==",{
            action: 5,
            datamenu: [...this.coches],
            uidroles: role.uid,
            uidsociete: this.idsociete,
        })
        try {
            const res: any = await this.httService.postData(
                `${environment.api_url}auth/:rolemenu`,
                {
                    action: 5,
                    datamenu: [...this.coches],
                    uidroles: role.uid,
                    uidsociete: this.idsociete,
                },
                this.token
            ).toPromise();

            this.isSaving = false;

            if (res?.body?.status || res?.body?.success) {
                Swal.fire({
                    title: 'Droits enregistrés',
                    html: `${this.coches.size} menu(s) attribué(s) à « ${role.libelle} ».`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Enregistrement impossible',
                    html: res?.body?.message || 'Le serveur a refusé la mise à jour.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err: any) {
            this.isSaving = false;
            Swal.fire({
                title: 'Enregistrement impossible',
                html: err?.error?.err?.message || 'Une erreur est survenue.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

        // On relit plutôt que de supposer : le serveur a le dernier mot.
        this.ouvrirRole(role);
    }

    annuler(): void {
        if (this.roleSelectionne) this.ouvrirRole(this.roleSelectionne);
    }
}
