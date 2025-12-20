import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-initial-offcanvas',
  imports: [OutsideDirective, CardComponent, FeatherIconComponent],
  templateUrl: './initial-offcanvas.component.html',
  styleUrl: './initial-offcanvas.component.scss',
})
export class InitialOffcanvasComponent {
  
  public showOffcanvas: boolean = false;

  open() {
    this.showOffcanvas = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.showOffcanvas = false;
    document.body.style.overflow = '';
  }
  
}
