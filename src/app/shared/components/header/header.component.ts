import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BookmarkComponent } from './widgets/bookmark/bookmark.component';
import { CartComponent } from "./widgets/cart/cart.component";
import { LanguageComponent } from "./widgets/language/language.component";
import { LogoComponent } from "./widgets/logo/logo.component";
import { NoticeComponent } from "./widgets/notice/notice.component";
import { NotificationComponent } from "./widgets/notification/notification.component";
import { ModeComponent } from "./widgets/mode/mode.component";
import { ProfileComponent } from "./widgets/profile/profile.component";
import { SearchComponent } from "./widgets/search/search.component";
import { ToggleScreenComponent } from "./widgets/toggle-screen/toggle-screen.component";
// import { SvgIconComponent } from "../ui/svg-icon/svg-icon.component";
import { LayoutService } from '../../services/layout.service';
import { OutsideDirective } from '../../directives/outside.directive';

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
export class HeaderComponent {

  constructor(public layoutService: LayoutService) { }

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
