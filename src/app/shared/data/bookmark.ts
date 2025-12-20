import { Select2Data } from "ng-select2-component";
import { Bookmark } from "../interface/bookmark";
import { Tabs } from "../interface/common";

export const bookmarkFilter: Tabs[] = [
    {
        id: 1,
        title: 'Created by me',
        value: 'created_by_me'
    },
    {
        id: 2,
        title: 'Favorites',
        value: 'favorites'
    },
    {
        id: 3,
        title: 'Shared With Me',
        value: 'shared_with_me'
    },
    {
        id: 4,
        title: 'My Bookmark',
        value: 'my_bookmark'
    }
]

export const bookmarkTags: Select2Data = [
    {
        label: 'Notification',
        value: 'notification'
    },
    {
        label: 'Newsletter',
        value: 'newsletter'
    },
    {
        label: 'Business',
        value: 'business'
    },
    {
        label: 'Holidays',
        value: 'holidays'
    },
    {
        label: 'Important',
        value: 'important'
    },
    {
        label: 'Organization',
        value: 'organization'
    }
]

export const bookmarks: Bookmark[] = [
    {
        id: 1,
        title: 'Admin Template',
        description: 'is beautifully crafted, clean and modern designed admin theme with 6 different demos and light - dark versions.',
        collection: 'general',
        image: 'assets/images/lightgallery/01.jpg',
        url: 'http://admin.pixelstrap.com/ltr/landing-page.html',
        tag: 'business',
        is_favorite: false,
    },
    {
        id: 2,
        title: 'Universal Template',
        description: 'Universal is beautifully crafted, clean and modern designed admin theme',
        collection: 'general',
        image: 'assets/images/lightgallery/02.jpg',
        url: 'https://angular.pixelstrap.com/universal/landing',
        tag: 'organization',
        is_favorite: true,
    },
    {
        id: 3,
        title: 'Angular Theme',
        description: 'Cuba is beautifully crafted, clean and modern designed admin theme',
        collection: 'fs',
        image: 'assets/images/lightgallery/03.jpg',
        url: 'https://angular.pixelstrap.com/cuba/landing',
        tag: 'holidays',
        is_favorite: false,
    },
    {
        id: 4,
        title: 'Multikart Admin',
        description: 'Multikart admin is modern designed admin theme',
        collection: 'general',
        image: 'assets/images/lightgallery/04.jpg',
        url: 'http://themes.pixelstrap.com/multikart/back-end/index.html',
        tag: 'newsletter',
        is_favorite: true,
    },
    {
        id: 5,
        title: 'Ecommerce theme',
        description: 'Multikart HTML template is an apparently simple but highly functional tempalate designed for creating a flourisahing online business.',
        collection: 'general',
        image: 'assets/images/lightgallery/05.jpg',
        url: 'http://themes.pixelstrap.com/multikart',
        tag: 'business',
        is_favorite: false,
    },
    {
        id: 6,
        title: 'Tovo app landing page',
        description: 'Amazing landing page with easy customization',
        collection: 'fs',
        image: 'assets/images/lightgallery/06.jpg',
        url: 'http://vue.pixelstrap.com/tova/home-one',
        tag: 'important',
        is_favorite: true,
    }
]

export const bookmarkGroup: Select2Data = [
    {
        value: 'my_bookmarks',
        label: 'My Bookmarks'
    }
]

export const bookmarkCollection: Select2Data = [
    {
        value: 'general',
        label: 'General'
    },
    {
        value: 'fs',
        label: 'Fs'
    }
]