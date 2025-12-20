export interface FaqQuestionAnswer {
    header_title?: string;
    details: Details[];
}

export interface Details {
    id: number;
    title: string;
    description: string
}

export interface Navigation {
    icon?: string;
    title?: string;
    badge?: boolean;
    badge_text?: number;
    section?: boolean;
}