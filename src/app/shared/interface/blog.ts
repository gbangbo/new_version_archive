export interface Comments {
    image: string;
    name: string;
    designation: string;
    hits: number;
    comments: number;
    description: string;
    reply?: boolean;
}

export interface BlogDetails {
    id: number;
    image: string;
    date: string;
    year: string;
    comment?: number;
    hits: string;
    title: string;
    description?: string;
    created_by?: string;
}

export interface AddBlogCategory {
    value: string;
    label: string
}

export interface BlogType {
    id: string;
    title: string;
    checked?: boolean;
}