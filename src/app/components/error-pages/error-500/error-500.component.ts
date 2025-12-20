import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from '../../../shared/components/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-error-500',
  imports: [SvgIconComponent],
  templateUrl: './error-500.component.html',
  styleUrl: './error-500.component.scss'
})

export class Error500Component {

  constructor(private location: Location) {}

  navigate() {
    this.location.back();
  }
  
}
