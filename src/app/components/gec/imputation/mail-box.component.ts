import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {MailDetailsComponent} from "./widgets/mail-details/mail-details.component";
import {MailHeaderComponent} from "./widgets/mail-header/mail-header.component";
import {SidebarComponent} from "./widgets/sidebar/sidebar.component";
import {TransfertModalComponent} from "./widgets/transfert-modal/transfert-modal.component";
import {emailSidebar} from '../../../shared/data/email';
import {OPTIONS_POPUP, echapper} from './imputation-popup';
import {Emails} from '../../../shared/interface/email';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {EvenementImputation, ImputationTempsReelService} from '../../../core/imputation-temps-reel.service';
import {environment} from '../../../../environments/environment';
import {
    ACTION_SUPPRESSION,
    Imputation,
    IMPUTATION_LIRE_URL,
    IMPUTATION_MESSAGE_URL,
    IMPUTATION_CLOTURE_URL,
    IMPUTATION_TRAITEMENT_URL,
    IMPUTATION_URL,
    IMPUTATION_VALIDATION_URL,
    construireAnnuaire,
    couleurAvatar,
    estCloturee,
    estValidee,
    lecturePour,
    listeImputationsUrl,
    mapImputation,
    niveauPriorite,
} from './imputation-api';

/** Nombre d'imputations par page, comme dans une messagerie. */
const TAILLE_PAGE = 50;

/**
 * Réglages communs des popups du module. `buttonsStyling: false` est
 * indispensable : sans lui, SweetAlert applique ses propres styles de boutons
 * et la couleur du thème écrase celle de la charte. La mise en forme vient
 * donc des classes `imp-swal-*`, définies globalement dans styles.scss —
 * SweetAlert monte son contenu dans <body>, hors de portée des styles
 * encapsulés du composant.
 */

/**
 * Vue d'une imputation au format attendu par le template de la boîte mail.
 * On conserve le contrat `Emails` du template pour ne rien changer au design ;
 * `imputation` garde la donnée métier derrière, pour les actions serveur.
 */
interface ImputationVue extends Emails {
    imputation: Imputation;
    /** Pastilles de la ligne : priorité, statut, consigne, copies… */
    badges: { label: string; classe: string }[];
    /** Trombone de la ligne, comme dans une messagerie. */
    aPiecesJointes: boolean;
    /**
     * Réponses arrivées dans le fil depuis que l'utilisateur regarde la liste.
     * Distinct de `is_read` : une imputation ENVOYÉE n'est jamais « non lue »,
     * mais on peut très bien y avoir reçu une réponse.
     */
    nouveauxMessages: number;
    /** Auteur de la dernière réponse reçue, pour l'infobulle du marqueur. */
    dernierRepondant: string;
}

@Component({
    selector: 'app-mail-box',
    imports: [CommonModule, SidebarComponent, MailHeaderComponent, SvgIconComponent,
        FeatherIconComponent, MailDetailsComponent, TransfertModalComponent],
    templateUrl: './mail-box.component.html',
    styleUrl: './mail-box.component.scss'
})

export class MailBoxComponent implements OnInit, OnDestroy {

    private users: any = {};

    public emails: ImputationVue[] = [];
    public emailSidebar = emailSidebar;
    public emailType: string;
    public currentTab: string;
    public isOpenMail: boolean = false;
    public currentMailDetails!: ImputationVue;

    public isLoading: boolean = false;
    public envoiReponse: boolean = false;
    /** Terme de recherche courant, appliqué au dossier consulté. */
    public recherche: string = '';

    get monUid(): string {
        return this.users?.uid || '';
    }

    /** Signaux reçus pendant que l'utilisateur lit : appliqués sur demande. */
    nouvellesEnAttente = 0;
    private readonly detruit$ = new Subject<void>();

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
        private tempsReel: ImputationTempsReelService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.charger();
        this.ecouterTempsReel();
        // L'utilisateur est sur la liste : le titre de l'onglet n'a plus à
        // porter de compteur.
        this.tempsReel.reinitialiserCompteur();
    }

    ngOnDestroy(): void {
        this.detruit$.next();
        this.detruit$.complete();
    }

    // ── Temps réel ────────────────────────────────────────────────────
    /**
     * Règle de conduite : ne JAMAIS réécrire la liste sous les doigts de
     * l'utilisateur. Une arrivée alimente un bandeau discret qu'il déclenche
     * quand il veut ; seul ce qui concerne la conversation ouverte, ou les
     * indicateurs, se met à jour tout seul.
     */
    private ecouterTempsReel(): void {
        this.tempsReel.connecter();

        this.tempsReel.evenements$
            .pipe(takeUntil(this.detruit$))
            .subscribe(evenement => this.surEvenement(evenement));

        // Après une coupure, des signaux ont pu se perdre : on repart d'un
        // état sûr plutôt que de rester sur des données incomplètes.
        this.tempsReel.resynchroniser$
            .pipe(takeUntil(this.detruit$))
            .subscribe(() => this.charger());
    }

    private surEvenement(evenement: EvenementImputation): void {
        const ouverte = this.currentMailDetails?.imputation?.uid;

        switch (evenement.type) {
            case 'imputation:nouvelle':
            case 'imputation:transferee':
                // On compte, on n'affiche pas : le bandeau laisse la main.
                this.nouvellesEnAttente++;
                break;

            case 'imputation:message':
                if (this.vientDEtreRafraichie(evenement.imputation)) break;

                // Conversation ouverte : le fil se complète, mail-details se
                // charge de le signaler à l'écran.
                if (evenement.imputation === ouverte) {
                    if (!this.envoiReponse) this.rafraichirImputation(evenement.imputation);
                    break;
                }

                // Sinon la réponse serait passée inaperçue : sans marqueur, il
                // fallait ouvrir chaque imputation pour découvrir qu'on avait
                // reçu quelque chose.
                this.signalerNouveauMessage(evenement.imputation);
                break;

            case 'imputation:lue':
            case 'imputation:traitee':
            case 'imputation:validee':
            case 'imputation:cloturee':
                // Ces événements ne concernent que la conversation ouverte.
                // Recharger pendant la rédaction d'une réponse ferait perdre
                // le texte en cours : on s'abstient.
                if (evenement.imputation !== ouverte || this.envoiReponse) break;

                // Le parseur diffuse maintenant vers les salons PERSONNELS de
                // tous les participants — l'auteur du message compris, faute de
                // savoir qui il est (la charge utile d'un message ne porte pas
                // d'expéditeur). Sans ce garde-fou, chaque envoi déclenchait
                // deux chargements : celui qui suit la réponse du serveur, puis
                // celui du signal revenu par la socket.
                if (this.vientDEtreRafraichie(evenement.imputation)) break;

                this.rafraichirImputation(evenement.imputation);
                break;
        }
    }

    /**
     * Recharge UNE SEULE imputation et la remplace sur place.
     *
     * Un message reçu dans une conversation ne justifie pas de recharger les
     * trois dossiers : c'était 4 requêtes et la reconstruction de toute la
     * liste pour une ligne qui change. Ici : 1 requête, 1 ligne remplacée.
     * Le GET accepte un `uid`, on s'en sert.
     *
     * Repli sur un chargement complet si l'imputation n'est pas retrouvée —
     * elle a pu changer de dossier, et là seule la liste fait foi.
     */
    private rafraichirImputation(uid: string, apres?: () => void): void {
        if (!uid) return;
        const token = this.users?.access_token || '';
        this.rafraichissements.set(uid, Date.now());

        this.chargerAnnuaire(token)
            .then(annuaire => this.appeler(listeImputationsUrl({uid}), token, annuaire))
            .then(resultats => {
                const fraiche = resultats.find(i => i.uid === uid);
                const rang = this.emails.findIndex(e => e.imputation.uid === uid);

                if (!fraiche || rang < 0) {
                    this.charger(apres);
                    return;
                }

                const ancienne = this.emails[rang];
                const remplacee = this.versVue(fraiche, ancienne.id, {
                    is_send: ancienne.is_send,
                    is_trash: ancienne.is_trash,
                });
                // L'étoile n'existe pas côté API : on préserve le marquage local.
                remplacee.is_favorite = ancienne.is_favorite;
                // Marqueur local lui aussi : il ne doit pas disparaître parce
                // que la ligne a été rechargée.
                remplacee.nouveauxMessages = ancienne.nouveauxMessages;
                remplacee.dernierRepondant = ancienne.dernierRepondant;
                this.emails[rang] = remplacee;

                // Le volet de lecture doit pointer sur la nouvelle référence,
                // sinon il continue d'afficher l'ancien fil.
                if (this.currentMailDetails?.imputation?.uid === uid) {
                    this.currentMailDetails = remplacee;
                }

                this.getTotalEmails();
                if (apres) apres();
            })
            .catch(() => {
                // Un échec ne doit pas laisser l'écran dans un état douteux.
                this.charger(apres);
            });
    }

    /** Le bandeau a été cliqué : on intègre les arrivées. */
    afficherNouvelles(): void {
        this.nouvellesEnAttente = 0;
        this.tempsReel.reinitialiserCompteur();
        this.charger();
    }

    // ── Chargement ────────────────────────────────────────────────────
    /** Les trois vues sont chargées d'un coup : le changement d'onglet reste
     *  instantané et les compteurs de la sidebar sont justes dès l'affichage. */
    charger(apres?: () => void): void {
        const moi = this.users?.uid || '';
        if (!moi) return;

        this.isLoading = true;
        const token = this.users?.access_token || '';

        // L'annuaire est chargé d'abord : l'API d'imputation ne renvoie que
        // l'e-mail des personnes, le nom vient de la liste des comptes.
        this.chargerAnnuaire(token)
            .then(annuaire => Promise.all([
                this.appeler(listeImputationsUrl({destinataire: moi, active: true}), token, annuaire),
                this.appeler(listeImputationsUrl({expediteur: moi, active: true}), token, annuaire),
                this.appeler(listeImputationsUrl({expediteur: moi, active: false}), token, annuaire),
            ]))
            .then(([recues, envoyees, corbeille]) => {
                this.emails = [
                    ...recues.map((i, n) => this.versVue(i, n, {is_send: false, is_trash: false})),
                    ...envoyees.map((i, n) => this.versVue(i, 1000 + n, {is_send: true, is_trash: false})),
                    ...corbeille.map((i, n) => this.versVue(i, 2000 + n, {is_send: true, is_trash: true})),
                ];
                this.isLoading = false;
                this.getTotalEmails();
                if (apres) apres();
            })
            .catch(() => {
                this.isLoading = false;
            });
    }

    /**
     * uid → nom, mis en cache pour la session. La liste des comptes ne bouge
     * pratiquement jamais : la redemander à chaque rafraîchissement ajoutait
     * un appel inutile, et c'est le plus lourd des quatre.
     */
    private annuaireCache: Map<string, string> | null = null;

    /** Dernier rafraîchissement de chaque imputation, pour ne pas le refaire. */
    private rafraichissements = new Map<string, number>();

    /**
     * Vrai si l'imputation vient d'être rechargée. Deux secondes suffisent :
     * c'est l'écart entre la réponse du serveur et le signal de la socket, pas
     * un délai perceptible par l'utilisateur.
     */
    private vientDEtreRafraichie(uid: string): boolean {
        const quand = this.rafraichissements.get(uid);
        return !!quand && Date.now() - quand < 2000;
    }

    /** uid → nom. En cas d'échec on continue : l'e-mail servira de repli. */
    private chargerAnnuaire(token: string): Promise<Map<string, string>> {
        if (this.annuaireCache) return Promise.resolve(this.annuaireCache);
        const idsociete = this.users?.datasociete?.uid || '';
        return this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=`,
            false, token
        ).toPromise()
            .then((res: any) => {
                if (!(res?.body?.status || res?.body?.success)) return new Map<string, string>();
                this.annuaireCache = construireAnnuaire(res.body.data || []);
                return this.annuaireCache;
            })
            .catch(() => new Map<string, string>());
    }

    private appeler(url: string, token: string, annuaire: Map<string, string>): Promise<Imputation[]> {
        return this.httService.getData(url, false, token).toPromise()
            .then((res: any) => {
                if (!(res?.body?.status || res?.body?.success)) return [];
                console.log("res.body.data ===", res.body.data)
                return (res.body.data || []).map((e: any) => mapImputation(e, annuaire));
            });
    }

    /** Imputation → ligne de la boîte mail (le template ne connaît que ce format). */
    private versVue(imputation: Imputation, id: number, etat: { is_send: boolean; is_trash: boolean }): ImputationVue {
        const correspondant = etat.is_send ? imputation.destinataire : imputation.expediteur;
        const pieces = imputation.piecesJointes.length;

        return {
            id,
            user_name: correspondant.nom,
            email: correspondant.email,
            // Seule l'instruction est affichée : le libellé du document, long et
            // identique d'une ligne à l'autre, se consulte dans le détail.
            email_title: imputation.instruction || 'Imputation',
            description: '',
            aPiecesJointes: pieces > 0,
            // Reporté depuis la ligne précédente par `rafraichirImputation`.
            nouveauxMessages: 0,
            dernierRepondant: '',
            badges: this.construireBadges(imputation),
            tag: '',
            time: imputation.date,
            is_favorite: false,
            is_draft: false,
            // Lecture du point de vue de l'utilisateur connecté : le suivi
            // d'une personne en copie est distinct de celui du destinataire.
            is_read: lecturePour(imputation, this.monUid).estLue,
            is_send: etat.is_send,
            is_trash: etat.is_trash,
            // Les types du bandeau (Important/Social/Promotion) n'ont pas d'équivalent
            // dans l'API : on ne filtre pas dessus (voir getFilteredEmails).
            email_type: '',
            imputation,
        };
    }

    /** Pastilles d'une ligne, dans l'ordre d'importance pour l'utilisateur. */
    private construireBadges(i: Imputation): { label: string; classe: string }[] {
        const badges: { label: string; classe: string }[] = [];

        if (i.prioriteLibelle) {
            badges.push({label: i.prioriteLibelle, classe: this.couleurPriorite(i.prioriteLibelle)});
        }
        if (i.estConfidentiel) {
            badges.push({label: 'Confidentiel', classe: 'badge-light-danger'});
        }
        if (i.statutLibelle) {
            badges.push({label: i.statutLibelle, classe: this.couleurStatut(i.statut)});
        }
        if (i.consigneLibelle) {
            badges.push({label: i.consigneLibelle, classe: 'badge-light-light'});
        }
        if (i.cc.length) {
            badges.push({
                label: `+${i.cc.length} en copie`,
                classe: 'badge-light-light',
            });
        }
        // L'échéance n'est signalée que si elle approche ou est dépassée.
        if (i.dateLimite && !i.dateTraitement && !i.dateCloture) {
            const jours = this.joursRestants(i.raw?.date_limite);
            if (jours !== null && jours < 0) {
                badges.push({label: 'En retard', classe: 'badge-light-danger'});
            } else if (jours !== null && jours <= 2) {
                badges.push({label: `Échéance J-${jours}`, classe: 'badge-light-warning'});
            }
        }

        return badges;
    }

    private joursRestants(dateLimite: any): number | null {
        if (!dateLimite) return null;
        const t = new Date(String(dateLimite).replace(' ', 'T')).getTime();
        if (isNaN(t)) return null;
        return Math.ceil((t - Date.now()) / 86400000);
    }

    /** Illustration et texte du dossier vide, propres à chaque onglet. */
    get etatVide(): { illustration: string; titre: string; detail: string } {
        // Une recherche sans résultat n'est pas un dossier vide : le dire
        // évite de faire croire que le dossier ne contient rien.
        if (this.recherche.trim()) {
            return {
                illustration: 'recherche',
                titre: 'Aucun résultat',
                detail: `Aucune imputation de ce dossier ne correspond à « ${this.recherche.trim()} ».`,
            };
        }

        switch (this.currentTab) {
            case 'sent':
                return {
                    illustration: 'envoyees',
                    titre: "Aucune imputation envoyée",
                    detail: "Les imputations que vous adressez apparaîtront ici.",
                };
            case 'trash':
                return {
                    illustration: 'corbeille',
                    titre: "La corbeille est vide",
                    detail: "Les imputations supprimées y sont conservées.",
                };
            case 'starred':
                return {
                    illustration: 'favoris',
                    titre: "Aucun favori",
                    detail: "Marquez une imputation d'une étoile pour la retrouver ici.",
                };
            case 'draft':
                return {
                    illustration: 'brouillons',
                    titre: "Aucun brouillon",
                    detail: "Les imputations non envoyées apparaîtront ici.",
                };
            default:
                return {
                    illustration: 'recues',
                    titre: "Aucune imputation reçue",
                    detail: "Les imputations qui vous sont adressées apparaîtront ici.",
                };
        }
    }

    /** Couleur de la pastille de priorité, cohérente avec le marqueur. */
    private couleurPriorite(libelle: string): string {
        switch (niveauPriorite(libelle)) {
            case 'haute':
                return 'badge-light-danger';
            case 'basse':
                return 'badge-light-success';
            default:
                return 'badge-light-warning';
        }
    }

    /**
     * Marqueur d'urgence en tête de ligne, à la manière d'Outlook : « ! » rouge
     * pour une priorité haute, flèche bleue vers le bas pour une priorité
     * basse, rien pour une priorité normale — un marqueur permanent sur toutes
     * les lignes ne signalerait plus rien.
     */
    marqueurPriorite(email: ImputationVue): { classe: string; couleur: string; titre: string } | null {
        const libelle = email.imputation.prioriteLibelle;
        if (!libelle) return null;

        const niveau = niveauPriorite(libelle);
        if (niveau === 'haute') {
            return {classe: 'fa-solid fa-exclamation', couleur: '#d32f2f', titre: `Priorité : ${libelle}`};
        }
        if (niveau === 'basse') {
            return {classe: 'fa-solid fa-arrow-down', couleur: '#1976d2', titre: `Priorité : ${libelle}`};
        }
        return null;
    }

    private couleurStatut(statut: string): string {
        const v = (statut || '').toUpperCase();
        if (v.startsWith('TRAITE') || v.startsWith('CLOTURE')) return 'badge-light-success';
        if (v.startsWith('REJETE') || v.startsWith('ANNULE')) return 'badge-light-danger';
        if (v === 'EN_COURS' || v === 'LU') return 'badge-light-primary';
        return 'badge-light-warning';
    }

    // ── Filtres du template (signatures inchangées) ───────────────────
    handleEmailType(value: string) {
        this.emailType = value;
    }

    handleCurrentTab(value: string) {
        this.currentTab = value;
        this.isOpenMail = false;
    }

    getTotalEmails() {
        this.emailSidebar.forEach((item) => {
            if (item.value == 'inbox') {
                // Convention messagerie : le badge compte les non-lues, pas le total.
                item.tag = this.emails.filter(email => this.estNonLue(email)).length;
            } else if (item.value == 'sent') {
                item.tag = this.emails.filter(email => email.is_send && !email.is_trash).length;
            } else if (item.value == 'starred') {
                item.tag = this.emails.filter(email => email.is_favorite && !email.is_trash).length;
            } else if (item.value == 'draft') {
                item.tag = this.emails.filter(email => email.is_draft && !email.is_trash).length;
            } else if (item.value == 'trash') {
                item.tag = this.emails.filter(email => email.is_trash).length;
            }
        })
    }

    /**
     * Filtrage par dossier. La condition sur `email_type` du template d'origine a
     * été retirée : elle portait sur des catégories de démo (Important, Social,
     * Promotion) qui n'existent pas dans l'API — sans quoi la liste resterait vide.
     */
    // ── Pagination ────────────────────────────────────────────────────
    /** Chaque dossier garde sa propre page : passer de Reçues à Envoyées ne
     *  fait pas perdre l'endroit où l'on était. */
    private pages: Record<string, number> = {};

    get page(): number {
        return this.pages[this.currentTab] || 1;
    }

    /** Liste du dossier après recherche, avant découpage en pages. */
    private get listeComplete(): ImputationVue[] {
        return this.filtrerParRecherche(this.dossierCourant());
    }

    get total(): number {
        return this.listeComplete.length;
    }

    get debut(): number {
        return this.total ? (this.page - 1) * TAILLE_PAGE + 1 : 0;
    }

    get fin(): number {
        return Math.min(this.page * TAILLE_PAGE, this.total);
    }

    pagePrecedente(): void {
        if (this.page > 1) {
            this.pages[this.currentTab] = this.page - 1;
            this.isOpenMail = false;
        }
    }

    pageSuivante(): void {
        if (this.fin < this.total) {
            this.pages[this.currentTab] = this.page + 1;
            this.isOpenMail = false;
        }
    }

    getFilteredEmails(): ImputationVue[] {
        const liste = this.listeComplete;

        // La page courante peut devenir hors bornes après une suppression ou
        // une recherche : on se recale sur la dernière page existante.
        const dernierePage = Math.max(1, Math.ceil(liste.length / TAILLE_PAGE));
        if (this.page > dernierePage) {
            this.pages[this.currentTab] = dernierePage;
        }

        const depart = (this.page - 1) * TAILLE_PAGE;
        return liste.slice(depart, depart + TAILLE_PAGE);
    }

    private dossierCourant(): ImputationVue[] {
        if (this.currentTab == 'sent') {
            return this.emails.filter(email => email.is_send && !email.is_trash);
        } else if (this.currentTab == 'starred') {
            return this.emails.filter(email => email.is_favorite && !email.is_trash);
        } else if (this.currentTab == 'draft') {
            return this.emails.filter(email => email.is_draft && !email.is_trash);
        } else if (this.currentTab == 'trash') {
            return this.emails.filter(email => email.is_trash);
        }
        return this.emails.filter(email => !email.is_trash && !email.is_send);
    }

    /**
     * La recherche porte sur le dossier consulté, pas sur l'ensemble : depuis
     * « Reçues » elle ne remonte que des imputations reçues, et ainsi de suite.
     */
    private filtrerParRecherche(liste: ImputationVue[]): ImputationVue[] {
        const terme = this.recherche.trim().toLowerCase();
        if (!terme) return liste;

        return liste.filter(email => {
            const i = email.imputation;
            return [
                i.instruction, i.messageInitial, i.documentLabel,
                i.expediteur.nom, i.expediteur.email,
                i.destinataire.nom, i.destinataire.email,
                i.prioriteLibelle, i.consigneLibelle, i.statutLibelle,
            ].some(valeur => (valeur || '').toLowerCase().includes(terme));
        });
    }

    handleRecherche(valeur: string): void {
        this.recherche = valeur;
        // Les résultats forment une nouvelle liste : on repart de sa page 1.
        this.pages[this.currentTab] = 1;
        // Le volet de lecture pourrait porter une imputation exclue du filtre.
        this.isOpenMail = false;
    }

    /** Couleurs d'avatar du correspondant de la ligne. */
    avatar(email: ImputationVue): { fond: string; trait: string } {
        const correspondant = email.is_send
            ? email.imputation.destinataire
            : email.imputation.expediteur;
        return couleurAvatar(correspondant?.uid || correspondant?.email || email.user_name);
    }

    getUserText(userName: string): string {
        let names = (userName || '').split(' ').filter(n => n);
        return names.map(name => name[0]).join('').slice(0, 2).toUpperCase() || '?';
    }

    getTextColor(name: string) {
        let firstLetter = (name || '?')[0];

        if (firstLetter >= 'A' && firstLetter <= 'M') {
            return 'primary'
        } else {
            return 'success'
        }
    }

    /** Marquage local : l'API n'expose aucun champ « favori ». */
    addToFavorite(email: Emails) {
        email.is_favorite = !email.is_favorite;
        this.getTotalEmails()
    }

    /** Délègue à l'utilitaire partagé (voir imputation-popup.ts). */
    private echapper(texte: string): string {
        return echapper(texte);
    }

    // ── Transfert et traitement ──────────────────────────────────────
    transfertOuvert = false;
    imputationATransferer: Imputation | null = null;

    /**
     * Ces actions n'ont de sens que sur une imputation qu'on a reçue : on ne
     * transfère pas ce qu'on a soi-même adressé, et on ne déclare pas traité
     * ce qui est à la corbeille.
     */
    /**
     * Transfert et traitement : au destinataire, tant que le dossier vit.
     * Une imputation clôturée est FIGÉE — plus aucune de ces actions n'a de
     * sens, et le back les refuserait de toute façon.
     */
    actionsPossibles(email: ImputationVue): boolean {
        return !!email && !email.is_send && !email.is_trash && !this.estCloturee(email);
    }

    /** Vrai quand le dossier est clos : tout le module s'y réfère. */
    estCloturee(email: ImputationVue): boolean {
        return estCloturee(email?.imputation);
    }

    /** La suppression n'est proposée QUE depuis la corbeille (demande client). */
    actionsCorbeille(email: ImputationVue): boolean {
        return !!email && !!email.is_trash;
    }

    ouvrirTransfert(email: ImputationVue): void {
        this.imputationATransferer = email.imputation;
        this.transfertOuvert = true;
    }

    /**
     * Suivi d'une imputation : traitement, validation, clôture.
     *
     * Les trois endpoints partagent le même contrat — { imputation,
     * commentaire? } — et la même mécanique : popup de confirmation, commentaire
     * facultatif, rechargement de la SEULE ligne concernée. Une méthode unique
     * plutôt que trois blocs jumeaux : le module a déjà souffert de styles et de
     * gabarits dupliqués qu'il fallait corriger deux fois.
     */
    private async actionDeSuivi(email: ImputationVue, action: {
        url: string;
        titre: string;
        icone: string;
        classeIcone: string;
        bouton: string;
        invite: string;
        succes: string;
        avertissement?: string;
    }): Promise<void> {
        const i = email.imputation;
        const origine = email.is_send
            ? `Envoyée à ${this.echapper(i.destinataire.nom)}`
            : `Reçue de ${this.echapper(i.expediteur.nom)}`;

        const reponse = await Swal.fire({
            ...OPTIONS_POPUP,
            html: `
                <div class="imp-swal-tete">
                    <span class="imp-swal-ico ${action.classeIcone}"><i class="${action.icone}"></i></span>
                    <div class="imp-swal-titres">
                        <span class="imp-swal-titre">${action.titre}</span>
                        <span class="imp-swal-sous">${this.echapper(i.instruction)}</span>
                    </div>
                </div>
                <div class="imp-swal-contenu">
                    <div class="imp-swal-rappel">
                        <span><i class="fa-regular fa-file-lines"></i> ${this.echapper(i.documentLabel)}</span>
                        <span><i class="fa-regular fa-user"></i> ${origine}</span>
                    </div>
                    <label class="imp-swal-label" for="imp-swal-commentaire">
                        Commentaire <em>facultatif</em>
                    </label>
                    <textarea id="imp-swal-commentaire" class="imp-swal-textarea" rows="3"
                              placeholder="${action.invite}"></textarea>
                    ${action.avertissement
                        ? `<p class="imp-swal-avertissement">${action.avertissement}</p>`
                        : ''}
                </div>`,
            confirmButtonText: `<i class="${action.icone}"></i> ${action.bouton}`,
            didOpen: () => document.getElementById('imp-swal-commentaire')?.focus(),
            preConfirm: () =>
                (document.getElementById('imp-swal-commentaire') as HTMLTextAreaElement)?.value || '',
        });

        if (!reponse.isConfirmed) return;

        const commentaire = (reponse.value || '').trim();
        const payload: any = {imputation: i.uid, notify: true};
        if (commentaire) {
            payload.commentaire = commentaire;
        }

        this.httService.postData(action.url, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success(res?.body?.message || action.succes, 'Succès');
                    // Le statut change, le dossier non : pas de rechargement global.
                    this.rafraichirImputation(i.uid);
                } else {
                    this.toast.error(res?.body?.message || 'Opération impossible.', 'Erreur');
                }
            })
            .catch((err: any) => {
                this.toast.error(
                    err?.error?.err?.message || err?.error?.message || 'Opération impossible.',
                    'Erreur'
                );
            });
    }

    /** POST api/:imputations/traitement — le destinataire a fait le travail. */
    marquerTraitee(email: ImputationVue): void {
        this.actionDeSuivi(email, {
            url: IMPUTATION_TRAITEMENT_URL,
            titre: 'Marquer comme traitée',
            icone: 'fa-solid fa-check',
            classeIcone: 'imp-swal-ico-ok',
            bouton: 'Marquer traitée',
            invite: 'Précisions sur le traitement effectué…',
            succes: 'Imputation marquée comme traitée.',
        });
    }

    /** POST api/:imputations/validation — l'émetteur approuve le traitement. */
    valider(email: ImputationVue): void {
        this.actionDeSuivi(email, {
            url: IMPUTATION_VALIDATION_URL,
            titre: "Valider l'imputation",
            icone: 'fa-solid fa-thumbs-up',
            classeIcone: 'imp-swal-ico-ok',
            bouton: 'Valider',
            invite: 'Ce que vous approuvez, ou ce qui reste à revoir…',
            succes: 'Imputation validée.',
        });
    }

    /** POST api/:imputations/cloture — fin du dossier. */
    cloturer(email: ImputationVue): void {
        this.actionDeSuivi(email, {
            url: IMPUTATION_CLOTURE_URL,
            titre: "Clôturer l'imputation",
            icone: 'fa-solid fa-flag-checkered',
            classeIcone: 'imp-swal-ico-alerte',
            bouton: 'Clôturer',
            invite: 'Conclusion du dossier…',
            succes: 'Imputation clôturée.',
            avertissement: 'La clôture met fin au dossier. Prévenez le destinataire'
                + " s'il lui reste quelque chose à verser au fil.",
        });
    }

    /** Validation et clôture reviennent à l'ÉMETTEUR (voir le récapitulatif). */
    actionsEmetteur(email: ImputationVue): boolean {
        return !!email && email.is_send && !email.is_trash && !this.estCloturee(email);
    }

    estValidee(email: ImputationVue): boolean {
        return estValidee(email.imputation);
    }

    /**
     * SANS POINT D'ENTRÉE DANS L'INTERFACE — retiré sur demande, avec l'icône
     * de suppression du volet de lecture (18/08/2026). Plus rien n'appelle
     * `supprimerCourante` ni `deleteMail` : la corbeille ne peut donc plus se
     * remplir depuis l'écran, et une imputation qui s'y trouve déjà ne peut plus
     * être supprimée définitivement.
     *
     * Le code est conservé intact — l'appel serveur fonctionne — pour qu'un
     * simple bouton suffise à le rebrancher le jour où on le voudra.
     */
    supprimerCourante(): void {
        if (this.currentMailDetails) {
            this.deleteMail(this.currentMailDetails);
        }
    }

    /** Suppression réelle côté serveur (action 3). */
    async deleteMail(email: ImputationVue): Promise<void> {
        const definitive = email.is_trash;
        const i = email.imputation;
        const confirmation = await Swal.fire({
            ...OPTIONS_POPUP,
            html: `
                <div class="imp-swal-tete imp-swal-tete-danger">
                    <span class="imp-swal-ico imp-swal-ico-danger"><i class="fa-solid fa-trash-can"></i></span>
                    <div class="imp-swal-titres">
                        <span class="imp-swal-titre">${definitive ? 'Supprimer définitivement ?' : 'Supprimer cette imputation ?'}</span>
                        <span class="imp-swal-sous">${this.echapper(i.instruction)}</span>
                    </div>
                </div>
                <div class="imp-swal-contenu">
                    <div class="imp-swal-rappel">
                        <span><i class="fa-regular fa-file-lines"></i> ${this.echapper(i.documentLabel)}</span>
                    </div>
                    <p class="imp-swal-avertissement">
                        ${definitive
                            ? "Cette imputation et sa conversation seront définitivement perdues."
                            : "L'imputation sera placée dans la corbeille."}
                    </p>
                </div>`,
            confirmButtonText: '<i class="fa-solid fa-trash-can"></i> Supprimer',
            customClass: {...OPTIONS_POPUP.customClass, confirmButton: 'imp-swal-btn imp-swal-btn-danger'},
        });

        if (!confirmation.isConfirmed) return;

        this.httService.postData(
            IMPUTATION_URL,
            {action: ACTION_SUPPRESSION, uid: email.imputation.uid},
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success(res?.body?.message || 'Imputation supprimée.', 'Succès');
                    this.isOpenMail = false;
                    this.charger();
                } else {
                    this.toast.error(res?.body?.message || 'Suppression impossible.', 'Erreur');
                }
            })
            .catch((err: any) => {
                this.toast.error(
                    err?.error?.err?.message || err?.error?.message || 'Suppression impossible.',
                    'Erreur'
                );
            });
    }

    /**
     * Ajout d'un message à la conversation de l'imputation ouverte.
     * L'endpoint accepte de vrais fichiers : l'envoi passe donc en multipart
     * dès qu'une pièce est jointe, en JSON sinon.
     */
    repondre(reponse: { texte: string; fichiers: File[] }): void {
        const courante = this.currentMailDetails?.imputation;
        if (!courante || !reponse.texte) return;
        // Dernier verrou avant l'appel : une imputation close n'accepte plus
        // rien, et le back refuserait de toute façon.
        if (estCloturee(courante)) {
            this.avis('Cette imputation est clôturée : aucun message ne peut y être ajouté.', true);
            return;
        }

        const token = this.users?.access_token || '';
        this.envoiReponse = true;

        const envoi = reponse.fichiers.length
            ? this.httService.postDataMultipart(
                IMPUTATION_MESSAGE_URL,
                this.versFormData(courante.uid, reponse),
                token)
            : this.httService.postData(
                IMPUTATION_MESSAGE_URL,
                {imputation: courante.uid, contenu: reponse.texte},
                token);
        envoi.toPromise()
            .then((res: any) => {
                this.envoiReponse = false;
                if (res?.body?.status || res?.body?.success) {
                    this.avis(res?.body?.message || 'Message envoyé');
                    // Seule cette conversation a changé : on ne recharge qu'elle.
                    this.rafraichirImputation(courante.uid);
                } else {
                    this.avis(res?.body?.message || "Échec de l'envoi.", true);
                }
            })
            .catch((err: any) => {
                this.envoiReponse = false;
                this.avis(
                    err?.error?.err?.message || err?.error?.message || "Échec de l'envoi.",
                    true
                );
            });
    }

    /**
     * Confirmation pendant une conversation.
     *
     * Le toast par défaut s'affiche en haut à droite, par-dessus l'en-tête, et
     * occupe assez de place pour couper la lecture du fil. Ici : un bandeau bas
     * de page, sans titre ni bouton de fermeture, qui disparaît seul — la
     * confirmation se remarque sans interrompre l'échange en cours.
     */
    private avis(message: string, erreur = false): void {
        const options = {
            // `ngx-toastr` est la classe de mise en page du paquet : la
            // remplacer entièrement casserait le positionnement.
            toastClass: `ngx-toastr imp-toast${erreur ? ' imp-toast-erreur' : ''}`,
            positionClass: 'toast-bottom-center',
            timeOut: erreur ? 5000 : 2600,
            closeButton: false,
            progressBar: false,
            titleClass: 'toast-title',
        };

        if (erreur) {
            this.toast.error(message, '', options);
        } else {
            this.toast.success(message, '', options);
        }
    }

    private versFormData(uidImputation: string, reponse: { texte: string; fichiers: File[] }): FormData {
        const form = new FormData();
        form.append('imputation', uidImputation);
        form.append('contenu', reponse.texte);
        reponse.fichiers.forEach(f => form.append('fichiers', f, f.name));
        return form;
    }

    /** Une imputation reçue et jamais ouverte s'affiche en évidence. */
    estNonLue(email: ImputationVue): boolean {
        return !email.is_send && !email.is_trash && !email.is_read;
    }

    /**
     * Marque une ligne de la liste comme porteuse d'une nouvelle réponse.
     *
     * On recharge la ligne pour que l'aperçu et l'horodatage soient justes,
     * puis on ne pose le marqueur que si le dernier message n'est pas le nôtre :
     * se signaler à soi-même ses propres envois n'aurait aucun sens.
     *
     * Si l'imputation n'est pas dans la liste chargée (autre dossier, autre
     * page), on ne fait rien : la recharger entraînerait un rechargement
     * complet, précisément ce qu'on veut éviter.
     */
    private signalerNouveauMessage(uid: string): void {
        if (this.emails.findIndex(e => e.imputation.uid === uid) < 0) return;

        this.rafraichirImputation(uid, () => {
            const vue = this.emails.find(e => e.imputation.uid === uid);
            if (!vue) return;

            const messages = vue.imputation.messages || [];
            const dernier = messages[messages.length - 1];
            if (!dernier || dernier.auteur?.uid === this.monUid) return;

            vue.nouveauxMessages = (vue.nouveauxMessages || 0) + 1;
            vue.dernierRepondant = dernier.auteur?.nom || '';
        });
    }

    /** Infobulle du marqueur : qui a répondu, et combien de fois. */
    infobulleReponse(email: ImputationVue): string {
        const nombre = email.nouveauxMessages;
        const quoi = nombre > 1 ? `${nombre} nouvelles réponses` : 'Nouvelle réponse';
        return email.dernierRepondant
            ? `${quoi} — dernière de ${email.dernierRepondant}`
            : quoi;
    }

    openEmail(email: ImputationVue) {
        this.isOpenMail = true;
        // L'utilisateur va lire le fil : le marqueur a fait son office.
        email.nouveauxMessages = 0;
        email.dernierRepondant = '';
        this.currentMailDetails = email;
        // Le parseur n'enverra les messages du fil qu'aux personnes qui le
        // regardent réellement.
        this.tempsReel.ouvrirConversation(email.imputation.uid);

        if (this.estNonLue(email)) {
            this.marquerCommeLue(email);
        }
    }

    /**
     * Accusé de lecture. L'affichage est mis à jour immédiatement : l'utilisateur
     * vient d'ouvrir l'imputation, la garder en gras serait faux. En cas d'échec
     * serveur on revient en arrière, le prochain chargement fera foi.
     */
    private marquerCommeLue(email: ImputationVue): void {
        email.is_read = true;
        this.getTotalEmails();

        this.httService.postData(
            IMPUTATION_LIRE_URL,
            {imputation: email.imputation.uid},
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (!(res?.body?.status || res?.body?.success)) {
                    email.is_read = false;
                    this.getTotalEmails();
                }
            })
            .catch(() => {
                email.is_read = false;
                this.getTotalEmails();
            });
    }

    handleMailDetails(value: boolean) {
        this.isOpenMail = value;
        if (!value && this.currentMailDetails) {
            this.tempsReel.fermerConversation(this.currentMailDetails.imputation.uid);
        }
    }

}
