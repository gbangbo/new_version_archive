import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from "../../../ui/feather-icon/feather-icon.component";
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-header-logo',
  imports: [RouterModule, FeatherIconComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {

  @Input() icon: string;
  @Input() type: string;

  constructor(public layoutService: LayoutService) {}

  toggleSidebar() {
    this.layoutService.closeSidebar = !this.layoutService.closeSidebar;
  }
}
