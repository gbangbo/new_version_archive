export interface TreeNode {
    name: string;
    name_categories: string;
    code_categories: string;
    key: string;
    disabled?: boolean;
    id: number;
    position: number;
    actif?: boolean;
    apiLevel?: number;
    children?: TreeNode[];

    [key: string]: any;       // ← évite les conflits de typage
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    name_categories: string;
    code_categories: string;
    id: number;
    actif: boolean;
    key: string;
    level: number;
    position: number;
    disabled: boolean;

    [key: string]: any;       // ← évite les conflits de typage
}