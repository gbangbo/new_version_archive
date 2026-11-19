MENUS = [
    {
        "pathtitle": "Accueil",
        "code_menu": "accueil",
        "url": "/accueil",
        "position": 1,
        "icon": "home",
        "rupture": "applications",
        "children": []
    },
    {
        "pathtitle": "Tableau de bord",
        "code_menu": "tableau_de_bord",
        "url": None,
        "position": 2,
        "icon": "widget",
        "rupture": "applications",
        "children": [
            {
                "pathtitle": "Statistiques",
                "code_menu": "statistique",
                "url": "/dashboard/statistique",
                "position": 1,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Documents",
        "code_menu": "documents",
        "url": None,
        "position": 3,
        "icon": "document",
        "rupture": "applications",
        "children": [
            {
                "pathtitle": "Ajouter un document",
                "code_menu": "creer_un_document",
                "url": "/documents/creer-un-document",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Scanner",
                "code_menu": "scan_document",
                "url": "/documents/scan-document",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Mes documents",
                "code_menu": "mes_documents",
                "url": "/documents/mes-documents",
                "position": 3,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Documents envoyés",
                "code_menu": "documents_envoyes",
                "url": "/documents/documents-envoyes",
                "position": 4,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Demandes d'autorisation",
                "code_menu": "demandes_autorisation",
                "url": "/documents/demandes-autorisation",
                "position": 5,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Importer",
        "code_menu": "importer",
        "url": None,
        "position": 4,
        "icon": "import",
        "rupture": "applications",
        "children": [
            {
                "pathtitle": "Excel : récupérer PDF",
                "code_menu": "recuperer_pdf",
                "url": "/importer/recuperer-pdf",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Excel : PDFs depuis dossiers",
                "code_menu": "pdf_depuis_dossier",
                "url": "/importer/pdf-depuis-dossier",
                "position": 2,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Rechercher un document",
        "code_menu": "trouver_un_document",
        "url": "/recherche/trouver-un-document",
        "position": 5,
        "icon": "search",
        "rupture": "applications",
        "children": []
    },
    {
        "pathtitle": "Journal des opérations",
        "code_menu": "journal",
        "url": "/journal",
        "position": 6,
        "icon": "reports",
        "rupture": "applications",
        "children": []
    },
    {
        "pathtitle": "Changer de société",
        "code_menu": "changer_societe",
        "url": "/changer-societe",
        "position": 7,
        "icon": "change",
        "rupture": "applications",
        "children": []
    },
    {
        "pathtitle": "Imputation",
        "code_menu": "imputation",
        "url": None,
        "position": 8,
        "icon": "button",
        "rupture": "GEC",
        "children": [
            {
                "pathtitle": "Imputer",
                "code_menu": "imputation",
                "url": "/gec/imputation",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Documents à imputer",
                "code_menu": "a_imputer",
                "url": "/gec/a-imputer",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Mes imputations",
                "code_menu": "mes_imputations",
                "url": "/gec/mes-imputations",
                "position": 3,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Entité",
        "code_menu": "entite",
        "url": None,
        "position": 9,
        "icon": "building",
        "rupture": "RH",
        "children": [
            {
                "pathtitle": "Société",
                "code_menu": "societe",
                "url": "/entites/societe",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Organigramme",
                "code_menu": "organigramme",
                "url": "/entites/organigramme",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Qualification",
                "code_menu": "qualification",
                "url": "/entites/qualification",
                "position": 3,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Gestion des accès",
        "code_menu": "gestion_des_acces",
        "url": None,
        "position": 10,
        "icon": "user",
        "rupture": "RH",
        "children": [
            {
                "pathtitle": "Fonction",
                "code_menu": "fonction",
                "url": "/user/fonction",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Personnel & Carrière",
                "code_menu": "carriere_personnele",
                "url": "/user/carriere-personnele",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Compte",
                "code_menu": "user_list",
                "url": "/user/user-list",
                "position": 3,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Nomination",
                "code_menu": "nomination",
                "url": "/user/nomination",
                "position": 4,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Rôle & menus",
                "code_menu": "role_menu",
                "url": "/user/role-menu",
                "position": 5,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Rôle & permissions",
                "code_menu": "role_permission",
                "url": "/user/role-permission",
                "position": 6,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Absences",
        "code_menu": "absences",
        "url": None,
        "position": 11,
        "icon": "editors",
        "rupture": "RH",
        "children": [
            {
                "pathtitle": "Type d'absence",
                "code_menu": "type_absence",
                "url": "/rh/type-absence",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Absence",
                "code_menu": "absence",
                "url": "/rh/absence",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Valider",
                "code_menu": "valider_absence",
                "url": "/rh/valider-absence",
                "position": 3,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Document du personnel",
        "code_menu": "document_du_personnel",
        "url": None,
        "position": 12,
        "icon": "folder",
        "rupture": "RH",
        "children": [
            {
                "pathtitle": "Ajouter un doc",
                "code_menu": "doc_personnel",
                "url": "/rh/doc-personnel",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Liste des docs",
                "code_menu": "doc_perso_liste",
                "url": "/rh/doc-perso-liste",
                "position": 2,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Flash Info",
        "code_menu": "flash_infos",
        "url": "/flash-infos",
        "position": 13,
        "icon": "faq",
        "rupture": "Actualité",
        "children": []
    },
    {
        "pathtitle": "Records Management",
        "code_menu": "records_management",
        "url": None,
        "position": 14,
        "icon": "cogs",
        "rupture": "Paramétrages",
        "children": [
            {
                "pathtitle": "Série",
                "code_menu": "categorie",
                "url": "/records-management/categorie",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Inventaire et calendrier de conservation",
                "code_menu": "type_de_document",
                "url": "/records-management/type-de-document",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Plan de classement",
                "code_menu": "plan_de_classement",
                "url": "/records-management/plan-de-classement",
                "position": 3,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Procédure de versement",
                "code_menu": "procedure_versement",
                "url": "/records-management/procedure-versement",
                "position": 4,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Procédure d'élimination",
                "code_menu": "procedure_elimination",
                "url": "/records-management/procedure-elimination",
                "position": 5,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Site, Rayons & Boîte",
                "code_menu": "site_rayon_boite",
                "url": "/records-management/site-rayon-boite",
                "position": 6,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Consigne & Priorité",
                "code_menu": "consigne_priorite",
                "url": "/records-management/consigne-priorite",
                "position": 7,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Interopérabilité",
        "code_menu": "interoperabilite",
        "url": None,
        "position": 15,
        "icon": "social",
        "rupture": "Paramétrages",
        "children": [
            {
                "pathtitle": "Communication via API",
                "code_menu": "com_via_api",
                "url": "/interoperabilite/com-via-api",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Exécution SQL",
                "code_menu": "execution_sql",
                "url": "/interoperabilite/execution-sql",
                "position": 2,
                "icon": "",
                "children": []
            }
        ]
    },
    {
        "pathtitle": "Menu",
        "code_menu": "menu",
        "url": None,
        "position": 16,
        "icon": "sample-page",
        "rupture": "Paramétrages",
        "children": [
            {
                "pathtitle": "Onglet",
                "code_menu": "onglet",
                "url": "/menu/onglet",
                "position": 1,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Actions",
                "code_menu": "type_objet",
                "url": "/menu/type-objet",
                "position": 2,
                "icon": "",
                "children": []
            },
            {
                "pathtitle": "Actions par menu",
                "code_menu": "actions_par_menu",
                "url": "/menu/actions-par-menu",
                "position": 3,
                "icon": "",
                "children": []
            }
        ]
    }
]
