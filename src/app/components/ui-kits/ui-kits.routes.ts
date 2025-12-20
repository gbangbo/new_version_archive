import { Routes } from "@angular/router";

import { TypographyComponent } from "./typography/typography.component";
import { AvatarsComponent } from "./avatars/avatars.component";
import { DividerComponent } from "./divider/divider.component";
import { HelperClassesComponent } from "./helper-classes/helper-classes.component";
import { GridComponent } from "./grid/grid.component";
import { TagPillsComponent } from "./tag-pills/tag-pills.component";
import { ProgressComponent } from "./progress/progress.component";
import { ModalComponent } from "./modal/modal.component";
import { AlertComponent } from "./alert/alert.component";
import { PopoverComponent } from "./popover/popover.component";
import { PlaceholdersComponent } from "./placeholders/placeholders.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { TabsComponent } from "./tabs/tabs.component";
import { OffcanvasComponent } from "./offcanvas/offcanvas.component";
import { NavigateLinksComponent } from "./navigate-links/navigate-links.component";
import { ListsComponent } from "./lists/lists.component";

export const uiKits: Routes = [
    {
        path: 'typography',
        component: TypographyComponent,
        data: {
            title: 'Typography',
            breadcrumb: 'Typography'
        }
    },
    {
        path: 'avatars',
        component: AvatarsComponent,
        data: {
            title: 'Avatars',
            breadcrumb: 'Avatars'
        }
    },
    {
        path: 'divider',
        component: DividerComponent,
        data: {
            title: 'Divider',
            breadcrumb: 'Divider'
        }
    },
    {
        path: 'helper-classes',
        component: HelperClassesComponent,
        data: {
            title: 'Helper Classes',
            breadcrumb: 'Helper Classes'
        }
    },
    {
        path: 'grid',
        component: GridComponent,
        data: {
            title: 'Grid',
            breadcrumb: 'Grid'
        }
    },
    {
        path: 'tag-pills',
        component: TagPillsComponent,
        data: {
            title: 'Tag & Pills',
            breadcrumb: 'Tag & Pills'
        }
    },
    {
        path: 'progress',
        component: ProgressComponent,
        data: {
            title: 'Progress',
            breadcrumb: 'Progress'
        }
    },
    {
        path: 'modal',
        component: ModalComponent,
        data: {
            title: 'Modal',
            breadcrumb: 'Modal'
        }
    },
    {
        path: 'alert',
        component: AlertComponent,
        data: {
            title: 'Alert',
            breadcrumb: 'Alert'
        }
    },
    {
        path: 'popover',
        component: PopoverComponent,
        data: {
            title: 'Popover',
            breadcrumb: 'Popover'
        }
    },
    {
        path: 'placeholders',
        component: PlaceholdersComponent,
        data: {
            title: 'Placeholders',
            breadcrumb: 'Placeholders'
        }
    },
    {
        path: 'tooltip',
        component: TooltipComponent,
        data: {
            title: 'Tooltip',
            breadcrumb: 'Tooltip'
        }
    },
    {
        path: 'dropdown',
        component: DropdownComponent,
        data: {
            title: 'Dropdowns',
            breadcrumb: 'Dropdowns'
        }
    },
    {
        path: 'accordion',
        component: AccordionComponent,
        data: {
            title: 'Accordion',
            breadcrumb: 'Accordion'
        }
    },
    {
        path: 'tabs',
        component: TabsComponent,
        data: {
            title: 'Tabs',
            breadcrumb: 'Tabs'
        }
    },
    {
        path: 'offcanvas',
        component: OffcanvasComponent,
        data: {
            title: 'Offcanvas',
            breadcrumb: 'Offcanvas'
        }
    },
    {
        path: 'navigate-links',
        component: NavigateLinksComponent,
        data: {
            title: 'Navigate Links',
            breadcrumb: 'Navigate Links'
        }
    },
    {
        path: 'lists',
        component: ListsComponent,
        data: {
            title: 'Lists',
            breadcrumb: 'Lists'
        }
    }
]