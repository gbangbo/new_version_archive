import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-offcanvas-variation',
  imports: [CardComponent, ProjectFormComponent],
  templateUrl: './offcanvas-variation.component.html',
  styleUrl: './offcanvas-variation.component.scss'
})

export class OffcanvasVariationComponent {

  public title: string = '';
  public scrollingCanvasVisible: boolean = false;
  public backdropScrollingVisible: boolean = false;
  public staticCanvasVisible: boolean = false;

  openScrolling() {
    this.title = 'Offcanvas Body Scrolling';
    this.scrollingCanvasVisible = true;
    this.toggleBodyScrolling(true);
  }

  openBackdropScrolling() {
    this.title = 'Backdrop with Scrolling';
    this.backdropScrollingVisible = true;
    this.toggleBodyScrolling(true);
  }

  openStatic() {
    this.title = 'Static Offcanvas';
    this.staticCanvasVisible = true;
    this.toggleBodyScrolling(false);
  }
  
  handleOffcanvas(value: boolean) {
    if(this.scrollingCanvasVisible) {
      this.scrollingCanvasVisible = value
    } else if(this.backdropScrollingVisible) {
      this.backdropScrollingVisible = value
    } else if(this.staticCanvasVisible) {
      this.staticCanvasVisible = value
    }
  }

  toggleBodyScrolling(value: boolean) {
    document.body.style.overflow = value ? '' : 'hidden';
  }
  
}
