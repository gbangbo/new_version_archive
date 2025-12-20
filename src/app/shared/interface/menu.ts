export interface Menu {
    main_title?: string;
    title?: string;
    icon?: string;
    path?: string;
    type?: string;
    active?: boolean;
    badge?: boolean;
    badge_value?: string;
    badge_color?: string;
    level?: number;
    bookmark?: boolean;
    children?: Menu[];
    pined?: boolean;
    id?: string;
}
