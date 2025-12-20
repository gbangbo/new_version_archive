import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-error-404',
  imports: [SvgIconComponent],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss'
})

export class Error404Component {

  constructor(private location: Location) {}

  navigate() {
    this.location.back();
  }
  
}
