export interface ContactSidebarList {
    id: number;
    title: string;
    value?: string;
}

export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    profile: string;
    gender: string;
    DOB: string;
    personality: string;
    city: string;
    contact_number: string;
    email: string;
    website: string;
    interest: string;
    category: string;
    contact_type: string;
}