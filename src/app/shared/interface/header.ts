export interface Language {
    id: number;
    name: string;
    code: string;
    icon: string;
    country_code?: string;
    active?: boolean;
}

export interface Notification {
    id: number;
    message: string;
    border_color: string;
}