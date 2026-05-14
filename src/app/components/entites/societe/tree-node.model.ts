export interface TreeNode {
    name: string;
    key: string;
    disabled?: boolean;
    code_societe: string;
    raison_sociale: string;
    email: string;
    logo: string | null;
    telephone: string;
    localisation: string;
    double_auth: boolean;
    id: number;
    position: number;
    actif?: boolean;
    apiLevel?: number;
    color?: string;
    auth?: string;
    libcolor?: string;
    _color?: string;
    children?: TreeNode[];

    [key: string]: any;       // ← évite les conflits de typage
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    raison_sociale: string;
    code_societe: string;
    telephone: string;
    localisation: string;
    email?: string;
    logo: string;
    double_auth: boolean;
    libcolor?: string;
    _color?: string;
    id: number;
    color?: string;
    auth?: string;
    actif: boolean;
    key: string;
    level: number;
    position: number;
    disabled: boolean;

    [key: string]: any;       // ← évite les conflits de typage
}