import {BehaviorSubject} from "rxjs";
import {Menu} from "../interface/menu";

export const menuItems: Menu[] =
    [
        {
            main_title: "applications"
        },
        {
            title: 'dashboards',
            id: 'dashboards',
            icon: 'home',
            type: 'sub',
            active: true,
            level: 1,
            badge: false,
            badge_value: "13",
            badge_color: 'primary',
            children: [
                {path: '/dashboard/nft', title: 'Accueil', type: 'link'},
                {path: '/dashboard/default', title: 'dashboards', type: 'link'}
            ],
        },
        {
            title: 'Documents',
            id: 'file',
            icon: 'document',
            type: 'sub',
            active: false,
            level: 1,
            children: [
                {
                    path: '/documents/creer-un-document',
                    title: 'Ajouter un document',
                    type: 'link',
                    id: 'general-widgets'
                },
                {
                    path: '/widgets/charts',
                    title: 'Mes documents',
                    type: 'link',
                    id: 'chart-widgets'
                },
                {
                    path: '/widgets/charts',
                    title: 'Documents envoyés',
                    type: 'link',
                    id: 'chart-widgets'
                },
                {
                    path: '/widgets/charts',
                    title: 'Documents validés',
                    type: 'link',
                    id: 'chart-widgets'
                },
                {
                    path: '/widgets/charts',
                    title: 'Autorisation',
                    type: 'link',
                    id: 'chart-widgets'
                }, {
                    path: '/widgets/charts',
                    title: 'Historique des autorisations',
                    type: 'link',
                    id: 'chart-widgets'
                },
            ],
        },

        {
            title: 'Importer',
            id: 'import',
            icon: 'import',
            type: 'sub',
            active: false,
            level: 1,
            children: [
                // {
                //     path: '/project/project-details',
                //     title: 'Import PDF',
                //     type: 'link',
                //     badge: false,
                //     badge_value: 'New',
                //     badge_color: 'success'
                // },
                {
                    path: '/project/project-list',
                    title: 'Import EXCEL PDF',
                    type: 'link'
                },
                {
                    path: '/project/create-project',
                    title: 'Import EXCEL PDF dossier',
                    type: 'link'
                },
                // {
                //     path: '/project/create-project',
                //     title: 'Import EXCEL village',
                //     type: 'link'
                // },
                // {
                //     path: '/project/create-project',
                //     title: 'Import EXCEL',
                //     type: 'link'
                // }
            ],
        },
        {
            title: 'Trouver un document',
            id: 'search',
            icon: 'search',
            type: 'link',
            path: 'recherche/trouver-un-document',
            bookmark: true,
            level: 1,
        },
        // {
        //     title: 'Dépôt d\'archives',
        //     icon: 'archive',
        //     id: 'archive',
        //     type: 'sub',
        //     active: false,
        //     level: 1,
        //     children: [
        //         {
        //             path: '/category',
        //             title: 'Bordereaux de versement',
        //             id: 'category',
        //             type: 'link',
        //         },
        //         {
        //             path: '/cart',
        //             title: 'Valider un borderaux',
        //             type: 'link',
        //             id: 'cart'
        //         },
        //         {
        //             path: '/wishlist',
        //             title: 'Archivage physique',
        //             type: 'link',
        //             id: 'wishlist'
        //         },
        //         {path: '/checkout', title: 'Bordereaux de destruction', type: 'link', id: 'checkout'},
        //         {
        //             path: '/review',
        //             title: 'Mes bordereaux',
        //             type: 'link',
        //             badge: false,
        //             badge_color: 'success',
        //             badge_value: "New",
        //             id: 'review'
        //         }
        //     ],
        // },
        // {
        //     title: 'Prêt de document',
        //     id: 'chat',
        //     icon: 'chat',
        //     type: 'sub',
        //     active: false,
        //     level: 1,
        //     children: [
        //         {path: '/chat/private-chat', title: 'Document Prêtés', type: 'link'}
        //     ],
        // },
        {
            title: 'Validation',
            id: 'mail-box',
            icon: 'validation',
            type: 'link',
            path: '/mail-box',
            badge: true,
            badge_color: 'success',
            badge_value: "0",
            level: 1,
        },
        {
            title: 'Imputation',
            id: 'mail-box',
            icon: 'editors',
            type: 'link',
            path: '/mail-box',
            badge: true,
            badge_color: 'success',
            badge_value: "0",
            level: 1,
        },
        // {
        //     title: 'Flash Info',
        //     id: 'faq',
        //     icon: 'faq',
        //     type: 'link',
        //     path: '/mail-box',
        //     badge: false,
        //     badge_color: 'danger',
        //     badge_value: "0",
        //     level: 1,
        // },
        {
            title: 'Changer de société',
            id: 'mail-box',
            icon: 'change',
            type: 'link',
            path: '/mail-box',
            badge: false,
            badge_color: 'danger',
            badge_value: "0",
            level: 1,
        },
        {
            title: 'Gestion des accès',
            id: 'users',
            icon: 'user',
            type: 'sub',
            active: false,
            level: 1,
            children: [
                {
                    path: '/user/add-user',
                    title: 'Agents',
                    type: 'link'
                },
                {
                    path: '/user/user-list',
                    title: 'Compte',
                    type: 'link',
                    badge: false,
                    badge_value: 'New',
                    badge_color: 'success'
                },
                {
                    path: '/user/user-cards',
                    title: 'Menu profil',
                    type: 'link'
                },
                {
                    path: '/user/roles-permission',
                    title: 'roles_and_permission',
                    type: 'link',
                    badge: false,
                    badge_value: 'New',
                    badge_color: 'success'
                },
                {
                    path: '/user/roles-permission',
                    title: 'Accès société',
                    type: 'link',
                    badge: false,
                    badge_value: 'New',
                    badge_color: 'success'
                },
                {
                    path: '/user/roles-permission',
                    title: 'Accès services',
                    type: 'link',
                    badge: false,
                    badge_value: 'New',
                    badge_color: 'success'
                },
            ],
        },
        {
            title: 'Entité',
            id: 'building',
            icon: 'building',
            type: 'sub',
            active: false,
            level: 1,
            badge: false,
            badge_value: "New",
            badge_color: "success",
            children: [
                {
                    path: '/entites/societe',
                    title: 'Société',
                    type: 'link'
                },
                {
                    path: '/entites/direction',
                    title: 'Direction',
                    type: 'link'
                },
                {
                    path: '/entites/departement',
                    title: 'Département',
                    type: 'link'
                },
                {
                    path: '/entites/services',
                    title: 'Services',
                    type: 'link'
                },
                {
                    path: '/entites/qualification',
                    title: 'Qualification',
                    type: 'link'
                }
            ],
        },
        {
            title: 'Configurations',
            id: 'cogs',
            icon: 'cogs',
            type: 'sub',
            active: false,
            level: 1,
            badge: false,
            badge_value: "New",
            badge_color: "success",
            children: [
                {
                    path: '/configuration/type-de-document',
                    title: 'Type de document',
                    type: 'link'
                },
                {
                    path: '/configuration/workflow',
                    title: 'Workflow',
                    type: 'link'
                },
                {
                    path: '/configuration/site-rayon-boite',
                    title: 'Site, Rayons & Boîte d\'archivage',
                    type: 'link'
                },
                {
                    path: '/configuration/consigne-priorite',
                    title: 'Consigne & Priorité',
                    type: 'link'
                },
                // {
                //     path: '/entites/qualification',
                //     title: 'Sous-prefecture',
                //     type: 'link'
                // }
            ],
        },
        // {
        //     title: 'Journal des opérations',
        //     id: 'journal',
        //     icon: 'journal',
        //     type: 'link',
        //     path: '/bookmark',
        //     level: 1,
        // },
        // {
        //     title: 'GeD',
        //     id: 'ged',
        //     icon: 'ged',
        //     type: 'sub',
        //     active: false,
        //     level: 1,
        //     badge: false,
        //     badge_value: "New",
        //     badge_color: "success",
        //     children: [
        //         {
        //             path: '/entites/societe',
        //             title: 'Suivi de document',
        //             type: 'link'
        //         },
        //         {
        //             path: '/entites/direction',
        //             title: 'Expression de besoin',
        //             type: 'link'
        //         },
        //         {
        //             path: '/entites/direction',
        //             title: 'Article',
        //             type: 'link'
        //         }
        //     ],
        // },
        {
            path: '/support-ticket',
            id: 'support-ticket',
            title: 'support_ticket',
            icon: 'support-tickets',
            active: false,
            level: 1,
            type: 'link',
        },
    ]

export const items = new BehaviorSubject<Menu[]>(menuItems);
