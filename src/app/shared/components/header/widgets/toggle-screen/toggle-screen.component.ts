
import { Component, Inject, DOCUMENT } from '@angular/core';

import { SvgIconComponent } from '../../../ui/svg-icon/svg-icon.component';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-toggle-screen',
  imports: [SvgIconComponent],
  templateUrl: './toggle-screen.component.html',
  styleUrl: './toggle-screen.component.scss'
})

export class ToggleScreenComponent {

  public elem: any;
  public url: string;

  constructor(@Inject(DOCUMENT) private document: any, private layoutService: LayoutService) {
    this.elem = document.documentElement;
  }

  toggleScreen() {
    this.layoutService.fullScreen = !this.layoutService.fullScreen;
    if (this.layoutService.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
