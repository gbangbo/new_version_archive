import {Routes} from "@angular/router";
import {configuration} from "../../components/configuration/configuration.routes";

export const content: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../components/dashboard/dashboard.routes').then(r => r.dashboard),
        data: {
            breadcrumb: "Dashboard"
        },
    },
    {
        path: 'project',
        loadChildren: () => import('../../components/projects/project.routes').then(r => r.project),
        data: {
            breadcrumb: "Projects"
        },
    },
    {
        path: 'product',
        loadChildren: () => import('../../components/e-commerce/product/product.routes').then(r => r.product),
        data: {
            breadcrumb: "Product"
        }
    },
    {
        path: 'category',
        loadChildren: () => import('../../components/e-commerce/category/category.routes').then(r => r.category)
    },
    {
        path: 'widgets',
        loadChildren: () => import('../../components/widgets/widgets.routes').then(r => r.widgets),
        data: {
            breadcrumb: "Widgets"
        },
    },
    {
        path: 'file-manager',
        loadChildren: () => import('../../components/file-manager/file-manager.routes').then(r => r.filManager)
    },
    {
        path: 'kanban',
        loadChildren: () => import('../../components/kanban/kanban.routes').then(r => r.kanban),
        data: {
            breadcrumb: "Kanban"
        }
    },
    {
        path: 'mail-box',
        loadChildren: () => import('../../components/mail-box/mail-box.routes').then(r => r.mail)
    },
    {
        path: 'chat',
        loadChildren: () => import('../../components/chat/chat.routes').then(r => r.chat),
        data: {
            breadcrumb: "Chat"
        },
    },
    {
        path: 'user',
        loadChildren: () => import('../../components/users/users.routes').then(r => r.users),
        data: {
            breadcrumb: "User"
        }
    },
    {
        path: 'seller',
        loadChildren: () => import('../../components/e-commerce/seller/seller.routes').then(r => r.seller),
        data: {
            breadcrumb: "Ecommerce"
        },
    },
    {
        path: 'order',
        loadChildren: () => import('../../components/e-commerce/orders/order.routes').then(r => r.order)
    },
    {
        path: 'cart',
        loadChildren: () => import('../../components/e-commerce/cart/cart.routes').then(r => r.cart)
    },
    {
        path: 'wishlist',
        loadChildren: () => import('../../components/e-commerce/wishlist/wishlist.routes').then(r => r.wishlist)
    },
    {
        path: 'checkout',
        loadChildren: () => import('../../components/e-commerce/checkout/checkout.routes').then(r => r.checkout)
    },
    {
        path: 'review',
        loadChildren: () => import('../../components/e-commerce/reviews/review.routes').then(r => r.review)
    },
    {
        path: 'settings',
        loadChildren: () => import('../../components/e-commerce/ecommerce-setting/ecommerce-setting.routes').then(r => r.setting)
    },
    {
        path: 'reports',
        loadChildren: () => import('../../components/reports/reports.routes').then(r => r.reports),
        data: {
            breadcrumb: "Reports"
        },
    },
    {
        path: 'bookmark',
        loadChildren: () => import('../../components/bookmark/bookmark.routes').then(r => r.bookmark)
    },
    {
        path: 'contacts',
        loadChildren: () => import('../../components/contacts/contacts.routes').then(r => r.contacts)
    },
    {
        path: 'task',
        loadChildren: () => import('../../components/task/task.routes').then(r => r.task)
    },
    {
        path: 'calendar',
        loadChildren: () => import('../../components/calendar/calendar.routes').then(r => r.calendar)
    },
    {
        path: 'social-app',
        loadChildren: () => import('../../components/social-app/social-app.routes').then(r => r.socialApp)
    },
    {
        path: 'to-do',
        loadChildren: () => import('../../components/to-do/to-do.routes').then(r => r.todo)
    },
    {
        path: 'search-result',
        loadChildren: () => import('../../components/search-result/search-result.routes').then(r => r.searchResult)
    },
    {
        path: 'ui-kits',
        loadChildren: () => import('../../components/ui-kits/ui-kits.routes').then(r => r.uiKits),
        data: {
            breadcrumb: 'Ui Kits'
        }
    },
    {
        path: 'bonus-ui',
        loadChildren: () => import('../../components/bonus-ui/bonus-ui.routes').then(r => r.bonusUi),
        data: {
            breadcrumb: 'Bonus Ui'
        }
    },
    {
        path: 'animation',
        loadChildren: () => import('../../components/animation/animation.routes').then(r => r.animation),
        data: {
            breadcrumb: 'Animation'
        }
    },
    {
        path: 'icon',
        loadChildren: () => import('../../components/icons/icons.routes').then(r => r.icons),
        data: {
            breadcrumb: 'Icons'
        }
    },
    {
        path: 'button',
        loadChildren: () => import('../../components/button/button.routes').then(r => r.button)
    },
    {
        path: 'charts',
        data: {
            breadcrumb: 'Charts'
        },
        loadChildren: () => import('../../components/charts/charts.routes').then(r => r.charts),
    },
    {
        path: 'forms/form-control',
        data: {
            breadcrumb: 'Form Controls'
        },
        loadChildren: () => import('../../components/forms/form-controls/form-controls.routes').then(r => r.formControls),
    },
    {
        path: 'forms/form-widgets',
        data: {
            breadcrumb: 'Form Widgets'
        },
        loadChildren: () => import('../../components/forms/form-widgets/form-widgets.routes').then(r => r.formWidgets),
    },
    {
        path: 'forms/form-layout',
        data: {
            breadcrumb: 'Form Layout'
        },
        loadChildren: () => import('../../components/forms/form-layout/form-layout.routes').then(r => r.formLayout),
    },
    {
        path: 'table/tailwind-tables',
        data: {
            breadcrumb: 'Tailwind Tables'
        },
        loadChildren: () => import('../../components/table/tailwind-tables/tailwind-tables.routes').then(r => r.tailwindTables),
    },
    {
        path: 'table/data-table',
        loadChildren: () => import('../../components/table/data-table/data-table-routes').then(r => r.dataTable)
    },
    {
        path: 'sample-page',
        loadChildren: () => import('../../components/sample-page/sample-page.routes').then(r => r.samplePage),
        data: {
            breadcrumb: 'Pages'
        }
    },
    {
        path: 'internationalization',
        loadChildren: () => import('../../components/internationalization/internationalization.routes').then(r => r.internationalization),
        data: {
            breadcrumb: 'Pages'
        }
    },
    {
        path: 'manage-api',
        loadChildren: () => import('../../components/manage-api/manage-api.routes').then(r => r.manageAPI),
        data: {
            breadcrumb: 'Pages'
        }
    },
    {
        path: 'sitemap',
        loadChildren: () => import('../../components/sitemap/sitemap.routes').then(r => r.siteMap),
        data: {
            breadcrumb: 'Pages'
        }
    },
    {
        path: 'pricing',
        data: {
            breadcrumb: 'Pages'
        },
        loadChildren: () => import('../../components/pricing/pricing.routes').then(r => r.pricing),
    },
    {
        path: 'faq',
        data: {
            breadcrumb: 'Pages'
        },
        loadChildren: () => import('../../components/faq/faq.routes').then(r => r.faq),
    },
    {
        path: 'subscribed-user',
        data: {
            breadcrumb: 'Pages'
        },
        loadChildren: () => import('../../components/subscribed-user/subscribed-user.routes').then(r => r.subscribedUser),
    },
    {
        path: 'gallery',
        data: {
            breadcrumb: 'Gallery'
        },
        loadChildren: () => import('../../components/gallery/gallery.routes').then(r => r.gallery),
    },
    {
        path: 'blog',
        data: {
            breadcrumb: 'Blog'
        },
        loadChildren: () => import('../../components/blog/blog.routes').then(r => r.blog),
    },
    {
        path: 'job-search',
        data: {
            breadcrumb: 'Jobs'
        },
        loadChildren: () => import('../../components/jobs/jobs.routes').then(r => r.jobSearch),
    },
    {
        path: 'courses',
        data: {
            breadcrumb: 'Course'
        },
        loadChildren: () => import('../../components/courses/courses.routes').then(r => r.courses),
    },
    {
        path: 'maps',
        data: {
            breadcrumb: 'Maps'
        },
        loadChildren: () => import('../../components/maps/maps.routes').then(r => r.maps),
    },
    {
        path: 'editors',
        data: {
            breadcrumb: 'Editors'
        },
        loadChildren: () => import('../../components/editors/editor.routes').then(r => r.editor),
    },
    {
        path: 'knowledgebase',
        loadChildren: () => import('../../components/knowledge-base/knowledgeBase.routes').then(r => r.knowledgeBase),
    },
    {
        path: 'support-ticket',
        loadChildren: () => import('../../components/support-ticket/support-ticket.routes').then(r => r.supportTicket),
    },
    {
        path: 'entites',
        loadChildren: () => import('../../components/entites/entites.routes').then(r => r.entites),
        data: {
            breadcrumb: "Entité"
        },
    }, {
        path: 'configuration',
        loadChildren: () => import('../../components/configuration/configuration.routes').then(r => r.configuration),
        data: {
            breadcrumb: "Configuration"
        },
    }, {
        path: 'documents',
        loadChildren: () => import('../../components/documents/documents.routes').then(r => r.documents),
        data: {
            breadcrumb: "Documents"
        },
    },
]