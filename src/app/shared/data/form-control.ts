import { Select2Data } from "ng-select2-component"
import {
    BasicCheckbox, BorderCheckbox, BorderRadio, CheckBox, DefaultCheckbox, DefaultRadio, DefaultStyle, DefaultSwitch, FilledCheckbox,
    FilledRadio, IconsCheckbox, IconsRadio, ImageCheckbox, ImageRadio, InlineCheckbox, InlineRadio, InlineStyle, InlineSwitch, OfferStyleBorder,
    OutlineCheckbox, PaymentDetails, RadioToggle, SimpleRadio, SocialMedia, SolidBorderStyle, ThemeSales, VariationRadio,
    VerticalStyle, WithoutBorderStyle
} from "../interface/form-controls"

export const selectTheme: Select2Data = [
    {
        label: 'Mofi',
        value: 'Mofi'
    },
    {
        label: 'Tivo',
        value: 'Tivo'
    },
    {
        label: 'Wingo',
        value: 'Wingo'
    },
]

export const selectState: Select2Data = [
    {
        label: 'U.K',
        value: 'U.K'
    },
    {
        label: 'India',
        value: 'India'
    },
    {
        label: 'Thailand',
        value: 'Thailand'
    },
    {
        label: 'Newyork',
        value: 'Newyork'
    },
]

export const selectSizing: Select2Data = [
    {
        label: "What's Your Hobbies",
        value: "What's Your Hobbies"
    },
    {
        label: 'Kho-kho',
        value: 'Kho-kho'
    },
    {
        label: 'Reading Books',
        value: 'Reading Books'
    },
    {
        label: 'Creativity',
        value: 'Creativity'
    },
]

export const selectNumber: Select2Data = [
    {
        label: "I",
        value: "I"
    },
    {
        label: "II",
        value: "II"
    },
    {
        label: "III",
        value: "III"
    },
    {
        label: "IV",
        value: "IV"
    },
    {
        label: "V",
        value: "V"
    },
]


export const selectPainting: Select2Data = [
    {
        label: "Landscape ",
        value: "Landscape "
    },
    {
        label: "Portrait ",
        value: "Portrait "
    },
    {
        label: "Oil Painting ",
        value: "Oil Painting "
    },
    {
        label: "Abstract art ",
        value: "Abstract art "
    },
    {
        label: "Acrylic ",
        value: "Acrylic "
    },
]

export const selectMenu: Select2Data = [
    {
        label: "One ",
        value: "One "
    },
    {
        label: "Two ",
        value: "Two "
    },
    {
        label: "Three ",
        value: "Three "
    },
]

export const themeSelection: Select2Data = [
    {
        label: "Tivo ",
        value: "Tivo "
    },
    {
        label: "Mofi ",
        value: "Mofi "
    },
    {
        label: "Roxo ",
        value: "Roxo "
    },
    {
        label: "Oslo ",
        value: "Oslo "
    },
    {
        label: "Voxo ",
        value: "Voxo "
    },
    {
        label: "Sheltos ",
        value: "Sheltos "
    },
    {
        label: "Petkart ",
        value: "Petkart "
    },
    {
        label: "Zeta ",
        value: "Zeta "
    },
]

export const selectColor: Select2Data = [
    {
        label: "Red ",
        value: "Red "
    },
    {
        label: "Yellow ",
        value: "Yellow "
    },
    {
        label: "Orange ",
        value: "Orange "
    },
    {
        label: "White ",
        value: "White "
    },
    {
        label: "Black ",
        value: "Black "
    },
    {
        label: "Gray ",
        value: "Gray "
    },
    {
        label: "Brown ",
        value: "Brown "
    },
    {
        label: "Purple ",
        value: "Purple "
    },
]

export const selectChocolates: Select2Data = [
    {
        label: 'Dark Chocolates',
        value: 'Dark Chocolates'
    },
    {
        label: 'Dairy Milk',
        value: 'Dairy Milk'
    },
    {
        label: 'Kitkat',
        value: 'Kitkat'
    },
]

export const categorySimple: Select2Data = [
    {
        value: 'Category 1',
        label: 'Category 1',
        data: [
            { value: 'Choice 1', label: 'Choice 1' },
            { value: 'Choice 2', label: 'Choice 2' },
            { value: 'Choice 3', label: 'Choice 3' },
            { value: 'Choice 4', label: 'Choice 4' }
        ]
    },
    {
        value: 'Category 2',
        label: 'Category 2',
        data: [
            { value: 'Choice 5', label: 'Choice 5' },
            { value: 'Choice 6', label: 'Choice 6' },
            { value: 'Choice 7', label: 'Choice 7' },
            { value: 'Choice 8', label: 'Choice 8' }
        ]
    },
    {
        value: 'Category 3',
        label: 'Category 3',
        data: [
            { value: 'Choice 9', label: 'Choice 9' },
            { value: 'Choice 10', label: 'Choice 10' },
            { value: 'Choice 11', label: 'Choice 11' },
            { value: 'Choice 12', label: 'Choice 12' }
        ]
    },
];


export const defaultCheckbox: DefaultCheckbox[] = [
    {
        id: 1,
        title: 'Default Checks',
        details: [
            {
                text: 'Default checkbox',
                id: 'flexCheckDefault',
                value: false,
                disable: false
            },
            {
                text: 'Checked checkbox',
                id: 'flexCheckDefault2',
                value: true,
                disable: false
            },
        ]
    },
    {
        id: 2,
        title: 'Disabled Checks',
        details: [
            {
                text: 'Disabled checkbox',
                id: 'flexCheckDefault3',
                value: false,
                disable: true
            },
            {
                text: 'Disabled checked checkbox',
                id: 'flexCheckDefault4',
                value: true,
                disable: true
            },
        ]
    },
    {
        id: 3,
        title: 'Right Checks',
        details: [
            {
                text: 'Reverse checkbox',
                id: 'flexCheckDefault5',
                value: false,
                disable: false
            },
            {
                text: 'Disabled reverse checkbox',
                id: 'flexCheckDefault6',
                value: true,
                disable: true
            },
        ]
    }
]

export const borderCheckbox: BorderCheckbox[] = [
    {
        class: 'primary',
        for: 'checkbox-primary-1',
        text: 'Primary - checkbox-primary',
        value: true
    },
    {
        class: 'secondary',
        for: 'checkbox-secondary-1',
        text: 'Secondary - checkbox-secondary',
        value: false

    },
    {
        class: 'success',
        for: 'checkbox-success-1',
        text: 'Success - checkbox-success',
        value: false

    }
]

export const iconsCheckbox: IconsCheckbox[] = [
    {
        text: 'Sliders',
        for: 'checkbox-1',
        icon: 'fa-solid fa-sliders',
        value: false
    },
    {
        text: 'User',
        for: 'checkbox-2',
        icon: 'fa-solid fa-user',
        value: true
    },
    {
        text: 'Tags',
        for: 'checkbox-3',
        icon: 'fa-solid fa-tag',
        value: false
    },
    {
        text: 'Android',
        for: 'checkbox-4',
        icon: 'fa-brands fa-android',
        value: false
    },
    {
        text: 'Hidden',
        for: 'checkbox-5',
        icon: 'fa-regular fa-eye-slash',
        value: false
    },
    {
        text: 'Folder',
        for: 'checkbox-6',
        icon: 'fa-regular fa-folder-open',
        value: false
    },
    {
        text: 'Send',
        for: 'checkbox-7',
        icon: 'fa-solid fa-paper-plane',
        value: false
    },
    {
        text: 'Upload',
        for: 'checkbox-8',
        icon: 'fa-solid fa-cloud-arrow-up',
        value: false
    },
]

export const filledCheckbox: FilledCheckbox[] = [
    {
        class: 'solid-warning',
        text: 'Warning-checkbox-solid-warning',
        value: true,
        id: 'solid4'
    },
    {
        class: 'solid-danger',
        text: 'Danger- checkbox-solid-danger',
        value: true,
        id: 'solid5'

    },
    {
        class: 'solid-info',
        text: 'Info - checkbox-solid-info',
        value: true,
        id: 'solid6'
    }
]

export const defaultRadio: DefaultRadio[] = [
    {
        id: 1,
        title: 'Custom Radios',
        details: [
            {
                for: 'flexRadioDefault11',
                text: 'Default radio',
                name: 'flexRadioDefault',
                value: false,
                disable: false
            },
            {
                for: 'flexRadioDefault12',
                text: 'Default checked radio',
                name: 'flexRadioDefault',
                value: true,
                disable: false
            },
        ]
    },
    {
        id: 2,
        title: 'Disabled Radios',
        details: [
            {
                for: 'flexRadioDisabled13',
                text: 'Disabled radio',
                value: false,
                name: 'flexRadioDisabled',
                disable: true
            },
            {
                for: 'flexRadioCheckedDisabled14',
                text: 'Disabled checked radio',
                name: 'flexRadioDisabled',
                value: false,
                disable: true
            },
        ]
    },
]

export const imageCheckbox: ImageCheckbox[] = [
    {
        id: 1,
        title: 'Custom',
        img: 'assets/images/switch/1.jpg',
        check: false,
        disabled: false
    },
    {
        id: 2,
        title: 'Checked Image',
        img: 'assets/images/switch/2.jpg',
        check: true,
        disabled: false
    },
    {
        id: 3,
        title: 'Disable Image',
        img: 'assets/images/switch/3.jpg',
        check: false,
        disabled: true
    },
    {
        id: 4,
        title: 'Disable Checked Image',
        img: 'assets/images/switch/4.jpg',
        check: true,
        disabled: true
    },
]

export const imageRadio: ImageRadio[] = [
    {
        id: 1,
        title: 'Custom',
        img: 'assets/images/switch/5.jpg',
        check: false,
        disabled: false
    },
    {
        id: 2,
        title: 'Checked Image',
        img: 'assets/images/switch/6.jpg',
        check: false,
        disabled: false
    },
    {
        id: 3,
        title: 'Disable Image',
        img: 'assets/images/switch/7.jpg',
        check: false,
        disabled: true
    },
    {
        id: 4,
        title: 'Disable Checked Image',
        img: 'assets/images/switch/8.jpg',
        check: true,
        disabled: true
    },
]

export const borderedRadio: BorderRadio[] = [
    {
        text: 'Koho Theme',
        check: true,
        class: 'secondary',
        id: 'radio22'
    },
    {
        text: 'Roxo Theme',
        check: false,
        class: 'success',
        id: 'radio55'

    },
    {
        text: 'Voxo Theme',
        check: false,
        class: 'danger',
        id: 'radio33'

    },
    {
        text: 'Zeta Theme',
        check: false,
        class: 'info',
        id: 'radio66'

    },
]

export const iconsRadio: IconsRadio[] = [
    {
        text: 'Sliders',
        icon: 'sliders',
        check: false,
        id: 'radio-icon'
    },
    {
        text: 'Hidden',
        icon: 'eye-slash',
        check: true,
        id: 'radio-icon4'
    },
    {
        text: 'Folder',
        icon: 'folder-open',
        check: false,
        id: 'radio-icon5'

    },
    {
        text: 'Send',
        icon: 'paper-plane',
        check: false,
        id: 'radio-icon7'

    },
    {
        text: 'Users',
        icon: 'user',
        check: false,
        id: 'radio-icon8'

    },
    {
        text: 'Trash',
        icon: 'trash fa-solid',
        check: false,
        id: 'radio-icon9'

    },
    {
        text: 'github',
        icon: 'github fa-brands',
        check: false,
        id: 'radio-icon10'

    },
    {
        text: 'Play',
        icon: 'play-circle',
        check: false,
        id: 'radio-icon10'

    },
]

export const filledRadio: FilledRadio[] = [
    {
        class: 'primary',
        text: 'Product',
        check: true,
        id: 'radio111'
    },
    {
        class: 'warning',
        text: 'Order history',
        check: false,
        id: 'radio333'
    },
    {
        class: 'danger',
        text: 'Invoice',
        check: false,
        id: 'radio444'
    },
    {
        class: 'info',
        text: 'Wishlist',
        check: false,
        id: 'radio666'
    },
]

export const defaultSwitch: DefaultSwitch[] = [
    {
        id: 1,
        title: 'Custom Switches',
        class: 'col-span-4 xl:col-span-6 md:col-span-12',
        details: [
            {
                text: 'Default switch checkbox input',
                value: false,
                id: 'flexSwitchCheckDefault',
                disable: false
            },
            {
                text: 'Checked switch checkbox input',
                value: true,
                id: 'flexSwitchCheckChecked',
                disable: false
            },
        ]
    },
    {
        id: 2,
        title: 'Disabled Switchess',
        class: 'col-span-4 xl:col-span-6 md:col-span-12',
        details: [
            {
                text: 'Disabled switch checkbox input',
                value: false,
                id: 'flexSwitchCheckDisabled',
                disable: true
            },
            {
                text: 'Disabled checked switch checkbox',
                value: true,
                id: 'flexSwitchCheckDisabledChecked',
                disable: true
            },
        ]
    },
    {
        id: 3,
        title: 'Right Switches',
        class: 'col-span-4 xl:col-span-12',
        details: [
            {
                text: 'Reverse switch checkbox input',
                value: false,
                id: 'flexSwitchCheckReverse',
                disable: false
            },
            {
                text: 'Disabled switch checkbox input',
                value: false,
                id: 'flexSwitchCheckReverseDisabled',
                disable: true
            },
        ]
    }
]

export const inlineCheckbox: InlineCheckbox[] = [
    {
        id: 'inlineCheckbox1',
        value: 'option1',
        text: 'I',
        checked: true,
        disable: false,
    },
    {
        id: 'inlineCheckbox2',
        value: 'option2',
        text: 'II',
        checked: false,
        disable: false,
    },
    {
        id: 'inlineCheckbox3',
        value: 'option3',
        text: 'III',
        checked: false,
        disable: true,
    },
]

export const inlineRadio: InlineRadio[] = [
    {
        id: 'inlineRadio1',
        value: 'option1',
        text: '1',
        checked: true,
        disable: false,
    },
    {
        id: 'inlineRadio2',
        value: 'option2',
        text: '2',
        checked: false,
        disable: false,
    },
    {
        id: 'inlineRadio3',
        value: 'option3',
        text: '3 (disabled)',
        checked: false,
        disable: true,
    },
]

export const inlineSwitch: InlineSwitch[] = [
    {
        id: 'flexSwitchCheckDefault2',
        value: 'option1',
        checked: true,
        disable: false,
    },
    {
        id: 'flexSwitchCheckDefault3',
        value: 'option2',
        checked: false,
        disable: false,
    },
    {
        id: 'flexSwitchCheckDisabled3',
        value: 'option3',
        checked: false,
        disable: true,
    },
]

export const paymentDetails: PaymentDetails[] = [
    {
        text: 'Visa',
        value: false,
        class: 'primary'
    },
    {
        text: 'MasterCard',
        value: false,
        class: 'secondary'

    },
    {
        text: 'Paypal',
        value: true,
        class: 'tertiary'
    },
    {
        text: 'G-pay',
        value: false,
        class: 'success'
    },
    {
        text: 'Bitpay',
        value: false,
        class: 'info'
    },
]

export const socialMedia: SocialMedia[] = [
    {
        text: 'Instagram',
        value: false,
        class: 'primary'

    },
    {
        text: 'Facebook',
        value: false,
        class: 'secondary'
    },
    {
        text: 'Whatsapp',
        value: true,
        class: 'tertiary'

    },
    {
        text: 'Twitter',
        value: false,
        class: 'danger'
    },
]

export const basicCheckbox: BasicCheckbox[] = [
    {
        text: 'Blog',
        value: false,
        id: 'inline-1',

    },
    {
        text: 'Gallery',
        value: true,
        id: 'inline-2',
    },
    {
        text: 'Faq',
        value: false,
        id: 'inline-3',
    },
    {
        text: 'Email',
        value: false,
        id: 'inline-4',
    },
    {
        text: 'Icons',
        value: false,
        id: 'inline-5',
    },
]

export const simpleRadio: SimpleRadio[] = [
    {
        text: 'Maps',
        check: true,
        id: 'radioinline1'
    },
    {
        text: 'Tasks',
        check: false,
        id: 'radioinline2'
    },
    {
        text: 'To-do',
        check: false,
        id: 'radioinline3'
    },
    {
        text: 'Forms',
        check: false,
        id: 'radioinline4'
    },
    {
        text: 'Login',
        check: false,
        id: 'radioinline5'
    },
]

export const radioToggle: RadioToggle[] = [
    {
        id: 'option1',
        text: 'Checked',
        checked: true,
        disabled: false,
    },
    {
        id: 'option2',
        text: 'Radio',
        checked: false,
        disabled: false,
    },
    {
        id: 'option3',
        text: 'Disabled',
        checked: false,
        disabled: true,
    },

    {
        id: 'option4',
        text: 'Radio',
        checked: false,
        disabled: false,
    },
]

export const outlineCheckbox: OutlineCheckbox[] = [
    {
        id: 'btn-check-outlined',
        class: 'info',
        type: 'checkbox',
        text: 'Single Toggle',
        checked: false,
        disabled: false,
    },
    {
        id: 'btn-check-2-outlined',
        class: 'danger',
        type: 'checkbox',
        text: 'Checked',
        checked: true,
        disabled: false,
    },
    {
        id: 'success-outlined',
        class: 'success',
        type: 'radio',
        text: 'Checked Success Radio',
        checked: true,
        disabled: false,
    },
    {
        id: 'danger-outlined',
        class: 'dark',
        type: 'radio',
        text: 'Dark Radio',
        checked: false,
        disabled: false,
    }
]

export const variationRadio: VariationRadio[] = [
    {
        class: 'col-span-4 xl:col-span-6 md:col-span-12',
        sub_title: 'Select your payment method',
        details: [
            {
                id: 'ptm11',
                label: 'BOB',
                image: 'assets/images/ecommerce/card.png',
                name: 'radio1',
                check: false

            },
            {
                id: 'ptm22',
                label: 'MasterCard',
                image: 'assets/images/ecommerce/mastercard.png',
                name: 'radio1',
                check: true
            },
            {
                id: 'ptm33',
                label: 'Paypal',
                image: 'assets/images/ecommerce/paypal.png',
                name: 'radio1',
                check: false
            },
            {
                id: 'ptm44',
                label: 'VISA',
                image: 'assets/images/ecommerce/visa.png',
                name: 'radio1',
                check: false
            },
        ]
    },
    {
        class: 'col-span-4 xl:col-span-6 md:col-span-12',
        sub_title: 'What are the most important things to learn about web design?',
        details: [
            {
                label: 'A. HTML',
                id: 'ptm101',
                name: 'radio2',
                check: false
            },
            {
                label: 'B. CSS',
                id: 'ptm201',
                name: 'radio2',
                check: false
            },
            {
                label: 'C. Javascript',
                id: 'ptm301',
                name: 'radio2',
                check: true
            },
            {
                label: 'D. Above the all',
                id: 'ptm401',
                name: 'radio2',
                check: false
            },
        ]
    },
    {
        class: 'col-span-4 xl:col-span-12',
        sub_title: 'Radios With Creative Options & SVG Icons',
        details: [
            {
                label: 'The notification icon displayed new messages.',
                icon: 'notification',
                id: 'ptm100',
                name: 'radio3',
                check: false,
                class: 'danger'
            },
            {
                label: 'The download icon indicated completion.',
                icon: 'stroke-calendar',
                id: 'ptm200',
                name: 'radio3',
                check: false,
                class: 'success'

            },
            {
                label: 'The tag icon allowed easy categorization.',
                icon: 'tag',
                id: 'ptm300',
                name: 'radio3',
                check: true,
                class: 'dark'

            },
            {
                label: 'The email icon was inaccessibly located.',
                icon: 'stroke-email',
                id: 'ptm400',
                name: 'radio3',
                check: false,
                class: 'primary'
            },
        ]
    }
]

export const defaultStyle: DefaultStyle[] = [
    {
        id: "radio14",
        name: "radio1",
        value: "option1",
        label: "COD",
        badge: "50 INR",
        description: "Estimated 2 Day Shipping ( Duties end tax may be due delivery )",
        badge_class: "badge-primary",
        radio_class: "radio-primary",
    },
    {
        id: "radio13",
        name: "radio1",
        value: "option1",
        label: "Fast",
        badge: "100 INR",
        description: "Estimated 1 Day Shipping ( Duties end tax may be due delivery )",
        badge_class: "badge-secondary",
        radio_class: "radio-secondary",
    },
]

export const withoutBorderStyle: WithoutBorderStyle[] = [
    {
        id: "checkbox11",
        type: "checkbox",
        checked: true,
        price: "$39",
        speed: "100 MBPS",
        badge_class: "badge-primary",
        description: "Plans for 2/4/6 months are offered to new clients.",
        checkbox_class: "checkbox-primary",
    },
    {
        id: "checkbox22",
        type: "checkbox",
        checked: false,
        price: "$50",
        speed: "Hired",
        badge_class: "badge-secondary",
        description: "Plans for 2 years projects offered to new clients.",
        checkbox_class: "checkbox-secondary",
    },
]

export const inlineStyle: InlineStyle[] = [
    {
        label: 'Estimated 14-20 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'COD',
        digit: '50 INR',
        class: 'primary',
        id: 'radio19',
    },
    {
        label: 'Estimated 1 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Fast',
        digit: '100 INR',
        class: 'secondary',
        id: 'radio20',
    },
    {
        label: 'Estimated 3 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Standard',
        digit: '80 INR',
        class: 'secondary',
        id: 'radio21',
    },
    {
        label: 'Estimated 15 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Local',
        digit: 'Free',
        class: 'primary',
        id: 'radio22',
    },
]

export const verticalStyle: VerticalStyle[] = [
    {
        title: 'Delivery Options',
        details: [
            {
                description: 'Estimated 10 to 15 Day Shipping ( Duties end tax may be due delivery )',
                title: 'COD',
                digit: '50 INR',
                class: 'primary',
                id: 'radio23',
                check: false,
                name: 'radio5',
                value: 'option1',
                badge_class: 'megaoption-space'
            },
            {
                description: 'Estimated 10 to 12 Day Shipping ( Duties end tax may be due delivery )',
                title: 'Fast',
                digit: '100 INR',
                class: 'secondary',
                id: 'radio24',
                check: false,
                name: 'radio5',
                value: 'option2',
                badge_class: 'megaoption-space'
            },
            {
                description: 'Estimated 3 to 5 Day Shipping ( Duties end tax may be due delivery )',
                title: 'STANDARD',
                digit: '80 INR',
                class: 'secondary',
                id: 'radio25',
                check: true,
                name: 'radio5',
                value: 'option3',
                badge_class: 'megaoption-space'

            },
            {
                description: 'Estimated 3 to 5 Day Shipping ( Duties end taxes may be due upon delivery )',
                title: 'Local',
                digit: 'Free',
                class: 'primary',
                id: 'radio5',
                check: false,
                name: 'radio5',
                value: 'option4',
                badge_class: 'megaoption-space'
            },
        ]
    },
    {
        title: 'Buying Options',
        details: [
            {
                label: '5 start rating',
                rating: 5,
                title: 'Pixelstrap',
                digit: '250 INR',
                class: 'primary',
                id: 'radio26',
                check: true,
                name: 'radio7',
                value: 'option5',
            },
            {
                label: '2 start rating',
                rating: 2,
                title: 'Multikart',
                digit: '150 INR',
                class: 'secondary',
                id: 'radio27',
                check: false,
                name: 'radio7',
                value: 'option6',
            },
        ]
    }
]

export const horizontalStyle: VerticalStyle[] = [
    {
        title: 'Delivery Options',
        details: [
            {
                description: 'Estimated 5 Day Shipping ( Duties end tax may be due delivery )',
                title: 'COD',
                digit: '50 INR',
                class: 'primary',
                id: 'radio30',
                check: false,
                name: 'radio22',
                value: 'option30',
                badge_class: 'megaoption-space'
            },
            {
                description: 'Estimated 1 Day Shipping ( Duties end tax may be due delivery )',
                title: 'Fast',
                digit: '100 INR',
                class: 'secondary',
                div_class: 'col-start-4',
                id: 'radio31',
                check: true,
                name: 'radio22',
                value: 'option31',
                badge_class: 'megaoption-space'
            },
        ]
    },
    {
        title: 'Buying Options',
        details: [
            {
                label: '5 start rating',
                rating: 5,
                title: 'Pixelstrap',
                digit: '250 INR',
                class: 'primary',
                id: 'radio32',
                check: true,
                name: 'radio23',
                value: 'option32',
            },
            {
                label: '4 start rating',
                rating: 4,
                title: 'Tivo',
                digit: '150 INR',
                class: 'secondary',
                div_class: 'col-start-4',
                id: 'radio33',
                check: false,
                name: 'radio23',
                value: 'option33',
            },
        ]
    }
]

export const solidBorderStyle: SolidBorderStyle[] = [
    {
        id: "radio15",
        name: "radio1",
        value: "option1",
        image_src: "assets/images/blog/img.png",
        image_alt: "home",
        description: "We provide end to end digital solutions, right from designing your website/application development: Domain, Web Hosting, Email Hosting Registration.",
    },
    {
        id: "radio16",
        name: "radio1",
        value: "option1",
        image_src: "assets/images/blog/blog.jpg",
        image_alt: "home",
        description: "When someone visits your homepage, your design should inspire them to stay. Therefore, your value proposition should be established on the homepage for visitors.",
    },
]

export const offerStyleBorder: OfferStyleBorder[] = [
    {
        id: "checkbox50",
        type: "checkbox",
        checked: false,
        image_src: "assets/images/email-template/11.jpg",
        image_alt: "fruits",
        description: "Fruits are an essential part of a healthy diet, and offer many health benefits. They're packed with vitamins, minerals, and fiber, which can help improve digestion.",
    },
    {
        id: "checkbox101",
        type: "checkbox",
        checked: true,
        image_src: "assets/images/email-template/10.jpg",
        image_alt: "flowers",
        description: "Flowers have long been used to express feelings and sentiments, and each bloom has its own distinct significance. For instance, while daisies signify innocence and purity.",
    },
]

export const checkBox: CheckBox[] = [
    {
        label: 'Reading',
        id: 'check-a',
        class: 'success',
        check: false
    },
    {
        label: 'Watching TV',
        id: 'check-b',
        class: 'success',
        check: true
    },
    {
        label: 'Listening to music',
        id: 'check-c',
        class: 'danger',
        check: false
    },
    {
        label: 'Playing video games',
        id: 'check-d',
        class: 'danger',
        check: false
    },
    {
        label: 'Painting/Drawing',
        id: 'check-e',
        class: 'success',
        check: false
    },
]

export const themeSales: ThemeSales[] = [
    {
        list: 'Mofi',
        sales: '380 sales',
        check: false
    },
    {
        list: 'Edmin',
        sales: '1.8K Sales',
        check: false
    },
    {
        list: 'Multikart',
        sales: '3.4k Sales',
        check: false
    },
    {
        list: 'Viho',
        sales: '2k Sales',
        check: true
    }
]