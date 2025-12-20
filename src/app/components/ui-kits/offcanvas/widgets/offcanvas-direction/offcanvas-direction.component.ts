import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-offcanvas-direction',
  imports: [CardComponent, UserFormComponent, ProjectFormComponent],
  templateUrl: './offcanvas-direction.component.html',
  styleUrl: './offcanvas-direction.component.scss'
})

export class OffcanvasDirectionComponent {

  public title: string = '';
  public positionClass: string;

  public topCanvasVisible: boolean = false;
  public rightCanvasVisible: boolean = false;
  public bottomCanvasVisible: boolean = false;
  public leftCanvasVisible: boolean = false;

  showOffcanvas(value: string) {
    if(value == 'top') {
      this.topCanvasVisible = true;
      this.title = 'Offcanvas Top';
      this.positionClass = 'offcanvas-top';
    } else if(value == 'right') {
      this.rightCanvasVisible = true;
      this.title = 'Offcanvas Right';
      this.positionClass = 'offcanvas-end';
    } else if(value == 'bottom') {
      this.bottomCanvasVisible = true;
      this.title = 'Offcanvas Bottom';
      this.positionClass = 'offcanvas-bottom';
    } else if(value == 'left') {
      this.leftCanvasVisible = true;
      this.title = 'Offcanvas Left';
      this.positionClass = 'offcanvas-start';
    }
    document.body.style.overflow = 'hidden';
  }
  
  handleOffcanvas(value: boolean) {
    if(this.topCanvasVisible)  {
      this.topCanvasVisible = value;
    } else if(this.rightCanvasVisible)  {
      this.rightCanvasVisible = value;
    } else if(this.bottomCanvasVisible)  {
      this.bottomCanvasVisible = value;
    } else if(this.leftCanvasVisible)  {
      this.leftCanvasVisible = value;
    }
    document.body.style.overflow = '';
  }
  
}
