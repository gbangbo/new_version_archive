export interface DefaultCheckbox {
    id: number;
    title: string;
    details: Details[];
}

export interface Details {
    text: string;
    value: boolean;
    id: string;
    disable: boolean
}

export interface BorderCheckbox {
    class: string;
    for: string;
    text: string;
    value: boolean;
}

export interface IconsCheckbox {
    text: string;
    for: string;
    icon: string;
    value: boolean;
}

export interface FilledCheckbox {
    class: string;
    text: string;
    value: boolean;
    id: string;
}

export interface DefaultRadio {
    id: number;
    title: string;
    details: RadioDetails[];
}

export interface RadioDetails {
    for: string;
    text: string;
    name: string;
    value: boolean;
    disable: boolean;
}

export interface ImageCheckbox {
    id: number;
    title: string;
    img: string;
    check: boolean;
    disabled: boolean;
}

export interface ImageRadio {
    id: number;
    title: string;
    img: string;
    check: boolean;
    disabled: boolean;

}

export interface BorderRadio {
    text: string;
    check: boolean;
    class: string;
    id: string;
}

export interface IconsRadio {
    text: string;
    icon: string;
    check: boolean;
    id: string;
}

export interface FilledRadio {
    class: string;
    text: string;
    check: boolean;
    id: string;
}

export interface DefaultSwitch {
    id: number;
    title: string;
    class: string;
    details: SwitchDetails[];
}

export interface SwitchDetails {
    text: string;
    value: boolean;
    id:string;
    disable: boolean;
}

export interface InlineCheckbox {
    id: string;
    value: string;
    text: string;
    checked: boolean;
    disable: boolean;
}

export interface InlineRadio {
    id: string;
    value: string;
    text: string;
    checked: boolean;
    disable: boolean;
}

export interface InlineSwitch {
    id: string;
    value: string;
    checked: boolean;
    disable: boolean;
}

export interface PaymentDetails {
    text: string;
    value: boolean;
    class: string;
}

export interface SocialMedia {
    text: string;
    value: boolean;
    class: string;
}

export interface BasicCheckbox {
    text: string;
    value: boolean;
    id: string;
}

export interface SimpleRadio {
    text: string;
    check: boolean;
    id: string;
}

export interface RadioToggle {
    id: string;
    text: string;
    checked: boolean;
    disabled: boolean;
}

export interface OutlineCheckbox {
    id: string;
    class: string;
    type: string;
    text: string;
    checked: boolean;
    disabled: boolean;
}

export interface VariationRadio {
    class: string;
    sub_title: string;
    details: VariationRadioDetails[];
}

export interface VariationRadioDetails {
    id: string;
    label: string;
    image?: string;
    name: string;
    check: boolean;
    icon?: string;
    class?: string;
}

export interface DefaultStyle {
    id: string;
    name: string;
    value: string;
    label: string;
    badge: string;
    description: string;
    badge_class: string;
    radio_class: string;
}

export interface WithoutBorderStyle {
    id: string;
    type: string;
    checked: boolean;
    price: string;
    speed: string;
    badge_class: string;
    description: string;
    checkbox_class: string;
}

export interface InlineStyle {
    label: string;
    title: string;
    digit: string;
    class: string;
    id: string;
}

export interface VerticalStyle {
    title: string;
    details: VerticalStyleDetail[];
}

export interface VerticalStyleDetail {
    label?: string;
    title: string;
    digit: string;
    class?: string;
    div_class?:string;
    id: string;
    check: boolean;
    rating?: number;
    name: string;
    badge_class?: string;
    description?: string;
    value: string;
}

export interface SolidBorderStyle {
    id: string;
    name: string;
    value: string;
    image_src: string;
    image_alt: string;
    description: string;
}

export interface OfferStyleBorder {
    id: string;
    type: string;
    checked: boolean;
    image_src: string;
    image_alt: string;
    description: string;
}

export interface CheckBox {
    label: string;
    id: string;
    class: string;
    check: boolean;
}

export interface ThemeSales {
    list: string;
    sales: string;
    check: boolean;
}

export interface product {
    items: string;
    price: string;
    qty: string;
    total_price: string;
}