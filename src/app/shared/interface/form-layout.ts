export interface NumberingWizardTabs {
    id: number;
    title: string;
    value: string;
    class: string;
}

export interface VerticalValidation {
    id: number;
    title: string;
    value: string;
    text: string;
    class: string;
}

export interface CartInfo {
    id: string;
    title: string;
    checked: boolean;
}

export interface NetBanking {
    row: number;
    details: DetailsNetBanking[];
}

export interface DetailsNetBanking {
    id: string;
    title: string;
    checked: boolean;
}

export interface ShippingForm {
    id: number;
    title: string;
    value: string;
    icon: string;
}

export interface ProductDetails {
    image: string;
    alt: string;
    title: string;
    quantity: string;
    price: number;
}

export interface ProductTotal {
    title: string;
    price: string;
}