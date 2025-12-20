import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-error-403',
  imports: [SvgIconComponent],
  templateUrl: './error-403.component.html',
  styleUrl: './error-403.component.scss'
})

export class Error403Component {

  constructor(private location: Location) {}

  navigate() {
    this.location.back()
  }
  
}
