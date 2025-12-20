export interface CourseFilter {
    id: number;
    title: string;
    button?: string;
    class: string;
    search?: boolean;
    details: filterDetails[];
}

export interface filterDetails {
    id: number;
    title?: string;
    sub_title?: string;
    class: string;
    created_by?: string;
    badge?: boolean;
    date?: number;
    month?: string;
    rating?: boolean;
    rate?: number | any;
    item?: Item[];
}

export interface Item {
    id: number;
    title: string;
    check_id?: string;
    class?: string;
    badge: boolean;
    badge_text?: number;
    type?: string;
}

export interface Comments {
    image: string;
    name: string;
    designation: string;
    hits: number;
    comments: number;
    description: string;
    reply?: boolean;
}

export interface CourseList {
    id: number;
    image: string;
    date: string;
    year: string;
    title: string;
    created_by: string;
    hits: string;
    description?: string;
}