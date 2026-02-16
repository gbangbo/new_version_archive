import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

// import { BookmarkComponent } from './widgets/bookmark/bookmark.component';
import {CartComponent} from "./widgets/cart/cart.component";
import {LanguageComponent} from "./widgets/language/language.component";
import {LogoComponent} from "./widgets/logo/logo.component";
import {NoticeComponent} from "./widgets/notice/notice.component";
import {NotificationComponent} from "./widgets/notification/notification.component";
import {ModeComponent} from "./widgets/mode/mode.component";
import {ProfileComponent} from "./widgets/profile/profile.component";
import {SearchComponent} from "./widgets/search/search.component";
import {ToggleScreenComponent} from "./widgets/toggle-screen/toggle-screen.component";
// import { SvgIconComponent } from "../ui/svg-icon/svg-icon.component";
import {LayoutService} from '../../services/layout.service';
import {OutsideDirective} from '../../directives/outside.directive';
import {Authorization} from "../../../protect/authorization.service";

@Component({
    selector: 'app-header',
    imports: [CommonModule, OutsideDirective, SearchComponent,
        LogoComponent, LanguageComponent, ToggleScreenComponent,
        ModeComponent,
        NotificationComponent, ProfileComponent,
        NoticeComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent{
    users: any = {}
    logoIn1: string = 'assets/images/logo/logo.png';
    logoDark1: string = 'assets/images/logo/logo_dark.png';

    constructor(public layoutService: LayoutService, private autor: Authorization) {
        this.users = this.autor.getInfosUsers();
        //assets/images/logo/logo.png
        //assets/images/logo/logo_dark.png
    }

    toggleLanguage() {
        this.layoutService.isLanguage = !this.layoutService.isLanguage;
    }

    clickOutside() {
        this.layoutService.isLanguage = false;
    }

    openSearch() {
        this.layoutService.isSearchOpen = true;
    }

}
