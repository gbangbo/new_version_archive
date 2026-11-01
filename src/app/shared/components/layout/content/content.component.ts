import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../ui/breadcrumb/breadcrumb.component';
import { LayoutService } from '../../../services/layout.service';
import { CustomizerComponent } from "../../ui/customizer/customizer.component";

@Component({
  selector: 'app-content',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, BreadcrumbComponent, FooterComponent,CustomizerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})

export class ContentComponent {

  public layout: string;

  constructor(public layoutService: LayoutService, private route: ActivatedRoute, private router: Router) {
    this.layout = this.layoutService.config.settings.layout;
    
    this.route.queryParams.subscribe((params) => {
      this.layout = params['layout'];

      if(this.layout) {
        localStorage.setItem('layout', this.layout);
        this.layoutService.config.settings.layout = this.layout;
        this.layoutService.applyLayout(this.layout);
      }
    });

    this.appliquerEtatSidebar();

    if(window.innerWidth <= 992){
      this.layoutService.config.settings.sidebar_type = 'compact-wrapper';
    }else{
      if(this.layout) {
        this.layoutService.applyLayout(this.layout);
      } else {
        this.layoutService.config.settings.sidebar_type = this.layoutService.config.settings.sidebar_type;
      }
    }
  }

  /* État de la barre latérale : repliée sous 1200px, ou quand l'écran affiché
     l'impose (layoutService.replierForce). */
  private appliquerEtatSidebar(): void {
    this.layoutService.closeSidebar =
      window.innerWidth < 1200 || this.layoutService.replierForce;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.appliquerEtatSidebar();
    if(window.innerWidth <= 992){
      this.layoutService.config.settings.sidebar_type = 'compact-wrapper';
    }else{
      if(this.layout) {
        this.layoutService.applyLayout(this.layout);
      } else {
        this.layoutService.config.settings.sidebar_type = this.layoutService.config.settings.sidebar_type;
      }
    }
  }
}
