import { Tabs } from "../../interface/common";

export const defaultList = ['Logo design', 'Web development', 'E-commerce', 'SEO'];

export const activeLists = [
    {
        item: 'UI Kits',
        active: true
    },
    {
        item: 'Wow Animations',
        active: false
    },
    {
        item: 'Apex Charts',
        active: false
    },
    {
        item: 'Starter Kits',
        active: false
    }
]

export const flushList = [
    {
        item: 'Charts',
        icon: 'chart-histogram-alt'
    },
    {
        item: 'Alerts',
        icon: 'warning'
    },
    {
        item: 'Cart',
        icon: 'cart'
    },
    {
        item: 'Checkout',
        icon: 'checked'
    }
]

export const contextualClassList = [
    { color_class: 'primary' },
    { color_class: 'secondary' },
    { color_class: 'success' },
    { color_class: 'danger' },
    { color_class: 'warning' },
    { color_class: 'info' },
    { color_class: 'white' },
    { color_class: 'dark' },
]

export const horizontalList = [
    {
        border_color: 'primary',
        class: 'sm',
        details: [
            {
                item: 'Product',
                border: true,
            },
            {
                item: 'Product details',
            },
            {
                item: 'Pricing',
            },
            {
                item: 'Payment details',
            },
            {
                item: 'Checkout',
            },
            {
                item: 'Mega options',
            }
        ]
    },
    {
        border_color: 'secondary',
        class: 'md',
        details: [
            {
                item: 'Basic table',
                border: true,
            },
            {
                item: 'Sizing table',
            },
            {
                item: 'Border table',
            },
            {
                item: 'Basic inputs',
            },
            {
                item: 'Form validations',
            }
        ]
    },
    {
        border_color: 'warning',
        class: 'lg',
        details: [
            {
                item: 'Flat style',
                border: true
            },
            {
                item: 'Edge style',
                border: false
            },
            {
                item: 'Button group',
                border: false
            },
            {
                item: 'Rating',
                border: false
            },
            {
                item: 'Crypto',
                border: false
            }
        ]
    },
    {
        border_color: 'success',
        class: 'xl',
        details: [
            {
                item: 'Blog',
                border: true,
            },
            {
                item: 'Blog details',
            },
            {
                item: 'Blog single',
            },
            {
                item: 'Order history',
            }
        ]
    },
    {
        border_color: 'info',
        class: 'xxl',
        details: [
            {
                item: 'Gallery grid',
                border: true,
            },
            {
                item: 'Gallery desc',
            },
            {
                item: 'Masonry Desc',
            }
        ]
    }
]

export const customContent = [
    {
        img: 'assets/images/user/1.jpg',
        name: 'Molly Boake',
        email: 'MollyBoake@rhyta.com',
        time: '5 days ago',
        description: 'Next step is to choose a tone of voice for your content type. From casual to convincing, pick one from 20+ tones in the dropdown.Why did we say “snag eyeballs” instead of “get attention?” Why do we say “brick-and-mortar words” instead of “concrete words?” Because, in your email subject lines, it’s better to use words that people can picture.',
        followers: '20K',
        active: true
    },
    {
        img: 'assets/images/user/3.png',
        name: 'Gabrielle Fahey',
        email: 'GabrielleFahey@dayrep.com',
        time: '10 days ago',
        description: "Your aim with this blog is to advertise yourself and your services in blog design. That means it's vital to create content about just that: blog design. Anything else on your page may act as a distraction to your potential customers, and you don't want that!",
        followers: '100',
    },
    {
        img: 'assets/images/user/2.jpg',
        name: 'Lucinda Moseley',
        email: 'LucindaMoseley@teleworm.us',
        time: '3 days ago',
        description: 'People who are looking to hire a web designer may not know what to look out for. This will give you a chance to prove your trustworthiness by providing potential customers with advice and will let you sell your services by highlighting their best qualities.',
        followers: '23M',
    }
]

export const checkboxList = [
    {
        id: 'firstCheckbox',
        title: 'Auto start',
        class: 'primary',
        checked: true,
    },
    {
        id: 'secondCheckbox',
        title: 'Auto update',
        class: 'secondary',
        checked: false,
    },
    {
        id: 'thirdCheckbox',
        title: "Don't check auth key",
        class: 'success',
        checked: false,
    },
    {
        id: 'fourCheckbox',
        title: 'Success all',
        class: 'warning',
        checked: false,
    },
]

export const radioList = [
    {
        id: 'firstRadio',
        class: 'danger',
        title: 'Meditations',
        checked: true
    },
    {
        id: 'secondRadio',
        class: 'primary',
        title: 'Read a book',
        checked: false
    },
    {
        id: 'thirdRadio',
        class: 'success',
        title: 'Learn to code',
        checked: false
    },
    {
        id: 'fourRadio',
        class: 'info',
        title: 'Drink more water',
        checked: false
    },
]

export const numberList = [
    {
        class: 'primary',
        title: 'Known for practical solutions'
    },
    {
        class: 'danger',
        title: 'Solve your problem'
    },
    {
        class: 'success',
        title: 'Certified Professionals'
    },
    {
        class: 'warning',
        title: 'Growth-Driven '
    }
]

export const numberBadgeList = [
    {
        name: "Stella Nowland",
        tag_text: "Freelance",
        tag_color: "warning"
    },
    {
        name: "Lola Stanford",
        tag_text: "Issue",
        tag_color: "danger"
    },
    {
        name: "Caitlin Coungeau",
        tag_text: "Social",
        tag_color: "primary"
    },
    {
        name: "Graciela W. McClaran",
        tag_text: "Issue",
        tag_color: "danger"
    }
]

export const disabledLists = [
    {
        class: 'list-hover-primary active rounded-t-md block',
        img: 'assets/images/dashboard-11/user/1.jpg',
        name: 'Teresa J. Mosteller'
    },
    {
        class: 'list-hover-primary block',
        img: 'assets/images/dashboard-11/user/2.jpg',
        name: 'Gloria D. Acheson'
    },
    {
        class: 'disabled block',
        img: 'assets/images/dashboard-11/user/3.jpg',
        name: 'Sharon C. Obrien'
    },
    {
        class: 'disabled rounded-b-md block',
        img: 'assets/images/dashboard-11/user/7.jpg',
        name: 'Bryan A. Owens'
    },
]

export const scrollableList = [
    {
        img: 'assets/images/dashboard-11/user/12.jpg',
        name: 'Molly Boake',
        email: 'MollyBoake@rhyta.com',
        time: '5 days ago',
        active: true
    },
    {
        img: 'assets/images/dashboard-11/user/11.jpg',
        name: 'Gabrielle Fahey',
        email: 'GabrielleFahey@dayrep.com',
        time: '10 days ago',
    },
    {
        img: 'assets/images/dashboard-11/user/10.jpg',
        name: 'Lucinda Moseley',
        email: 'LucindaMoseley@teleworm.us',
        time: '3 days ago',
    },
    {
        img: 'assets/images/dashboard-11/user/9.jpg',
        name: 'Francis K. Henriques',
        email: 'FrancisKHenriques@teleworm.us',
        time: '2 days ago',
    },
    {
        img: 'assets/images/dashboard-11/user/8.jpg',
        name: 'Jose A. Seay',
        email: 'JoseASeay@rhyta.com',
        time: '15 days ago',
    },
    {
        img: 'assets/images/dashboard-11/user/4.jpg',
        name: 'Phil F. Cunningham',
        email: 'PhilFCunningham@dayrep.com',
        time: '6 days ago',
    },
    {
        img: 'assets/images/dashboard-9/user/5.png',
        name: 'Richard E. Johnson',
        email: 'RichardEJohnson@teleworm.us',
        time: '20 days ago',
    },
    {
        img: 'assets/images/dashboard-9/user/1.png',
        name: 'Lawrence L. Nash',
        email: 'LawrenceLNash@jourrapide.com',
        time: '8 days ago',
    }
]

export const jsBehaviorTabs: Tabs[] = [
  {
    id: 1,
    title: 'Home',
    value: 'home'
  },
  {
    id: 2,
    title: 'Profile',
    value: 'profile'
  },
  {
    id: 3,
    title: 'Contact Us',
    value: 'contact_us'
  },
  {
    id: 4,
    title: 'Setting',
    value: 'setting'
  }
]