export interface TreeNode {
    name: string;
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
    id: number;
    actif: boolean;
    key: string;
    level: number;
    position: number;
    disabled: boolean;

    [key: string]: any;       // ← évite les conflits de typage
}