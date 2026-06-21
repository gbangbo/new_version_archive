export interface TreeNode {
    name: string;
    key: string;
    disabled?: boolean;
    // Champs API
    id: number;
    position: number;
    actif: boolean;
    apiLevel?: number;
    libelle_type_docs: string;
    type_document_id?: string;
    idtype_document?: string;
    code_categories?: string;
    code_type_docs: string;
    uid_type_docs: string;
    color?: string;
    auth?: string;
    children?: TreeNode[];
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    libelle_type_docs: string;
    type_document_id?: string;
    code_categories?: string;
    idtype_document?: string;
    code_type_docs: string;
    uid_type_docs: string;
    id: number;
    color?: string;
    auth?: string;
    actif: boolean;
    key: string;
    level: number;
    position: number;
    disabled: boolean;
}