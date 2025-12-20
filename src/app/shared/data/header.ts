import {Language, Notification} from "../interface/header";

export const language: Language[] = [
    {
        id: 1,
        name: 'Français',
        code: 'fr',
        icon: 'fr',
        country_code: "FR",
        active: true
    },
    {
        id: 2,
        name: 'English',
        code: 'en',
        icon: 'us',
        country_code: "US",
    }
]

export const notification: Notification[] = [
    {
        id: 1,
        message: 'Delivery processing',
        border_color: 'primary'
    },
    {
        id: 2,
        message: 'Order Complete',
        border_color: 'success'
    },
    {
        id: 3,
        message: 'Tickets Generated',
        border_color: 'secondary'
    },
    {
        id: 4,
        message: 'Delivery Complete',
        border_color: 'warning'
    }
]

export const profile = [
    {
        id: 1,
        title: 'Profil',
        icon: 'user',
        path: 'user/user-profile/1'
    },

    // {
    //     id: 3,
    //     title: 'Taskboard',
    //     icon: 'file-text',
    //     path: '/task'
    // },
    // {
    //     id: 4,
    //     title: 'Settings',
    //     icon: 'settings',
    //     path: '/settings'
    // }
]