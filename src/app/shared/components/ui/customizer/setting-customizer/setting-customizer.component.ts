import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-setting-customizer',
  imports: [CommonModule, FormsModule],
  templateUrl: './setting-customizer.component.html',
  styleUrl: './setting-customizer.component.scss'
})

export class SettingCustomizerComponent {

  @Output() settingOpen = new EventEmitter();

  public sidebarType = localStorage.getItem('sidebar_type');
  public icon: string = 'stroke';
  public primary: string = localStorage.getItem('--theme-default') || '#7366ff';
  public secondary: string = localStorage.getItem('--theme-secondary') || '#838383';
  public layoutVersion: string = localStorage.getItem('layout_version') || 'light-only';
  public layoutType: string = localStorage.getItem('layout_type') || 'ltr';

  constructor(public layoutService: LayoutService, private router: Router, private route: ActivatedRoute){
    if(this.sidebarType != null && this.layoutService.config.settings.layout === ''){
      this.layoutService.config.settings.sidebar_type = this.sidebarType;
    }

    if(this.layoutVersion != null) {
      layoutService.config.settings.layout_version = this.layoutVersion;
      this.handleLayout(this.layoutVersion)
    }

    if(this.layoutType != null) {
      layoutService.config.settings.layout_type = this.layoutType;
      this.handleLayoutType(this.layoutType);
    }

    layoutService.config.color.primary = this.primary || '#7366ff';
    layoutService.config.color.secondary = this.secondary || '#838383';

    document.documentElement.style.setProperty('--theme-default', this.primary);
    document.documentElement.style.setProperty('--theme-secondary', this.secondary);
  }

  closeCustomizer() {
    this.settingOpen.emit(false);
  }

  handleLayoutType(value: string) {
    this.layoutService.config.settings.layout_type = value;
    localStorage.setItem('layout_type', this.layoutService.config.settings.layout_type)

    if(value == 'ltr') {
      document.getElementsByTagName('html')[0].setAttribute('dir', value);
      document.body.className = 'ltr' + ' ' +  this.layoutService.config.settings.layout_version;
    }else if(value == 'rtl') {
      document.getElementsByTagName('html')[0].setAttribute('dir', value);
      document.body.className = 'rtl' + ' ' + this.layoutService.config.settings.layout_version;
    }else if(value == 'box') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      document.body.className = 'box-layout' + ' ' + this.layoutService.config.settings.layout_version;
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.body.className = '' + ' ' + this.layoutService.config.settings.layout_version;
    }
    this.settingOpen.emit(false);
  }

  handleSidebarType(value: string){
    if(value == 'horizontal'){
      if(window.innerWidth <= 992){
        this.layoutService.config.settings.sidebar_type = 'compact-wrapper';
        localStorage.setItem('sidebar_type','compact-wrapper')
      }else{
        this.layoutService.config.settings.sidebar_type = 'horizontal-wrapper ';
        localStorage.setItem('sidebar_type','horizontal-wrapper');
      }
    }else if(value == 'vertical'){
      this.layoutService.margin = 0;
      this.layoutService.config.settings.layout = 'dubai';
      localStorage.setItem('layout', 'dubai');
      this.layoutService.config.settings.sidebar_type = 'compact-wrapper';
      localStorage.setItem('sidebar_type','compact-wrapper')

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { layout: 'dubai' },
        queryParamsHandling: 'merge'
      })
    }
    window.location.reload();
  }

  changeIcon(value: string){
    this.icon = value;
    this.layoutService.config.settings.icon = value;
    if (value == "stroke-svg") {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", value);
    } else {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", value);
    }
  }

  applyColor() {
    document.documentElement.style.setProperty('--theme-default', this.primary);
    document.documentElement.style.setProperty('--theme-secondary', this.secondary);
    localStorage.setItem('--theme-default', this.primary);
    localStorage.setItem('--theme-secondary', this.secondary);
    this.layoutService.config.color.primary = this.primary;
    this.layoutService.config.color.secondary = this.secondary;

    window.location.reload();
  }

  handleColorLayout(layoutType: string, primaryColor: string, secondaryColor: string) {
    document.documentElement.style.setProperty('--theme-default', primaryColor);
    document.documentElement.style.setProperty('--theme-secondary', secondaryColor);
    localStorage.setItem('--theme-default', primaryColor);
    localStorage.setItem('--theme-secondary', secondaryColor);
    this.layoutService.config.color.primary = primaryColor;
    this.layoutService.config.color.secondary = secondaryColor;
    
    this.handleLayout(layoutType)
    window.location.reload();
  }

  handleLayout(value: string) {
    this.layoutService.config.settings.layout_version = value;
    localStorage.setItem('layout_version', this.layoutService.config.settings.layout_version)

    document.body.className = this.layoutService.config.settings.layout_version;
    this.settingOpen.emit(false);
  }
  
}
