export interface TreeNode {
    name: string;
    key: string;
    disabled?: boolean;
    // Champs organigramme
    sigle?: string;
    libelle?: string;
    created_at?: string;
    datasociete?: any;
    // Communs
    id: number;
    position?: number;
    actif?: boolean;
    apiLevel?: number;
    color?: string;
    libcolor?: string;
    _color?: string;
    children?: TreeNode[];

    [key: string]: any;
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    // Champs organigramme
    sigle?: string;
    libelle?: string;
    created_at?: string;
    datasociete?: any;
    // Communs
    libcolor?: string;
    _color?: string;
    id: number;
    color?: string;
    auth?: string;
    actif: boolean;
    key: string;
    level: number;
    position?: number;
    disabled: boolean;

    [key: string]: any;
}