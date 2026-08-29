import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';
import {io, Socket} from 'socket.io-client';

import {environment} from '../../environments/environment';
import {Authorization} from '../protect/authorization.service';

/**
 * Signal reçu du parseur. Volontairement pauvre : il ne transporte JAMAIS de
 * contenu métier, seulement de quoi savoir qu'il faut aller regarder. Le
 * détail est ensuite récupéré par l'API chiffrée habituelle.
 */
export interface EvenementImputation {
    type: 'imputation:nouvelle' | 'imputation:transferee' | 'imputation:message'
        | 'imputation:lue' | 'imputation:traitee'
        | 'imputation:validee' | 'imputation:cloturee';
    /** uid de l'imputation concernée. */
    imputation: string;
    /** uid de l'auteur de l'action, quand le parseur a pu le déterminer. */
    de?: string;
}

/**
 * ══ NOTIFICATIONS TEMPS RÉEL ════════════════════════════════════════════════
 *
 * La connexion est établie au niveau de l'application, pas d'un écran : elle
 * survit à la navigation. Un utilisateur qui travaille ailleurs dans le
 * logiciel est donc prévenu qu'une imputation lui est adressée.
 *
 * Elle vise le parseur directement (port 3500), comme tous les appels API —
 * nginx ne relaie pas ce trafic, la WebSocket emprunte le même chemin.
 */
@Injectable({providedIn: 'root'})
export class ImputationTempsReelService {

    /** Flux des signaux reçus. */
    readonly evenements$ = new Subject<EvenementImputation>();

    /**
     * Émis après une reconnexion. Le client a pu manquer des événements
     * pendant la coupure : les écrans concernés doivent se resynchroniser
     * par un chargement complet.
     */
    readonly resynchroniser$ = new Subject<void>();

    /** Imputations reçues et pas encore consultées, pour le titre de l'onglet. */
    private nonVues = 0;
    private titreOrigine = '';

    private socket: Socket | null = null;

    /**
     * Conversation actuellement sous les yeux de l'utilisateur.
     *
     * Indispensable : un salon appartient à UNE socket. À la reconnexion, la
     * socket est neuve et n'appartient plus à aucun salon de conversation. Sans
     * cette mémoire, le fil cessait définitivement de se compléter après la
     * moindre coupure — sans le moindre signe visible, puisque l'utilisateur
     * pouvait toujours écrire et que ses propres messages, eux, partaient bien.
     */
    private conversationOuverte = '';

    constructor(private autor: Authorization, private zone: NgZone) {
    }

    /**
     * Ouvre la connexion si une session existe. Appelable plusieurs fois sans
     * risque : les appels suivants sont ignorés tant que la socket est vivante.
     */
    connecter(): void {
        if (this.socket) return;

        const users: any = this.autor.getInfosUsers();
        const token = users?.access_token;
        const uid = users?.uid;
        if (!token || !uid) return;

        this.titreOrigine = document.title;

        // socket.io déclenche ses rappels hors de la zone Angular : sans
        // `runOutsideAngular`, chaque battement de cœur relancerait une
        // détection de changement sur toute l'application.
        this.zone.runOutsideAngular(() => {
            this.socket = io(this.baseParseur(), {
                path: '/socket-awp',
                transports: ['websocket', 'polling'],
                auth: {token: `Bearer ${token}`, uid},
                reconnection: true,
                reconnectionDelay: 2000,
                reconnectionDelayMax: 15000,
            });

            this.socket.on('imputation', (evenement: EvenementImputation) => {
                this.zone.run(() => this.traiter(evenement));
            });

            // Première connexion et reconnexions passent par `connect`. On ne
            // resynchronise qu'à partir de la seconde, la première étant déjà
            // suivie du chargement normal de l'écran.
            let premiere = true;
            this.socket.on('connect', () => {
                // À refaire à CHAQUE connexion, y compris la première : l'écran
                // a pu ouvrir une conversation avant que la socket soit prête.
                if (this.conversationOuverte) {
                    this.socket?.emit('imputation:ouvrir', this.conversationOuverte);
                }

                if (premiere) {
                    premiere = false;
                    return;
                }
                this.zone.run(() => this.resynchroniser$.next());
            });

            // Un échec de connexion ne doit JAMAIS rester muet : sans trace,
            // le symptôme est incompréhensible — l'utilisateur écrit et est lu,
            // mais ne reçoit plus rien.
            this.socket.on('connect_error', (erreur: any) => {
                console.warn('[temps réel] connexion impossible :', erreur?.message
                    || erreur, "— les imputations n'arriveront pas en direct.");
            });
        });
    }

    deconnecter(): void {
        this.socket?.disconnect();
        this.socket = null;
        this.conversationOuverte = '';
        this.reinitialiserCompteur();
    }

    /** Signale la conversation consultée : le fil se complètera en direct. */
    ouvrirConversation(uidImputation: string): void {
        this.conversationOuverte = uidImputation || '';
        this.socket?.emit('imputation:ouvrir', uidImputation);
    }

    fermerConversation(uidImputation: string): void {
        if (this.conversationOuverte === uidImputation) this.conversationOuverte = '';
        this.socket?.emit('imputation:fermer', uidImputation);
    }

    /** Remet le titre de l'onglet à zéro (l'utilisateur a vu la liste). */
    reinitialiserCompteur(): void {
        this.nonVues = 0;
        if (this.titreOrigine) document.title = this.titreOrigine;
    }

    private traiter(evenement: EvenementImputation): void {
        // Seule une arrivée mérite de marquer le titre : un accusé de lecture
        // ou un changement de statut n'appelle aucune action.
        const arrivee = evenement.type === 'imputation:nouvelle'
            || evenement.type === 'imputation:transferee';

        if (arrivee) {
            this.nonVues++;
            if (this.titreOrigine) {
                document.title = `(${this.nonVues}) ${this.titreOrigine}`;
            }
        }

        this.evenements$.next(evenement);
    }

    /**
     * Racine du parseur, déduite de `api_url`
     * (« http://archivepro.ci:3500/parseur-awp/: » → « http://archivepro.ci:3500 »).
     * On la calcule plutôt que de l'ajouter à l'environnement : une seule
     * valeur à maintenir le jour où l'adresse change.
     */
    private baseParseur(): string {
        try {
            return new URL(environment.api_url).origin;
        } catch {
            return environment.api_url.split('/parseur-awp')[0];
        }
    }
}
