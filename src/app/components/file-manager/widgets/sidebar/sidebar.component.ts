import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { fileTypes, pricingPlan } from '../../../../shared/data/fileManager';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, CardComponent, SvgIconComponent, FeatherIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  public fileTypes = fileTypes;
  public pricingPlan = pricingPlan;
  public sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen =! this.sidebarOpen;
  }
  
}
