import { Component } from '@angular/core';

import { SvgIconComponent } from "../../../ui/svg-icon/svg-icon.component";
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-mode',
  imports: [SvgIconComponent],
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.scss'
})

export class ModeComponent {

  public dark: boolean;
  public layoutVersion = localStorage.getItem('layout_version');

  constructor(private layout: LayoutService){
    
    this.dark = this.layout.config.settings.layout_version == 'dark-only' ? true : false;
    
    if(this.layoutVersion != null){
      this.layout.config.settings.layout_version = this.layoutVersion;
      document.body.className = this.layout.config.settings.layout_version;
    }
  }

  toggleMode(){
    this.dark =! this.dark;
    if(this.dark){
      document.body.classList.add('dark-only');
      this.layout.config.settings.layout_version = 'dark-only';
    }else{
      document.body.classList.remove('dark-only');
      this.layout.config.settings.layout_version = 'light-only';
    }
    localStorage.setItem('layout_version',this.layout.config.settings.layout_version);
  }
  
}
