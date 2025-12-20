import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select2Group, Select2Module } from 'ng-select2-component';

import { animationValues } from '../../../shared/data/animation';

@Component({
  selector: 'app-animate',
  imports: [CommonModule, Select2Module],
  templateUrl: './animate.component.html',
  styleUrl: './animate.component.scss'
})

export class AnimateComponent {

  public animationValues: Select2Group[] = animationValues;
  public animation = 'bounceIn';
  public animated: boolean = false;

  animate() {
    this.animated = true;

    setTimeout(() => {
      this.animated = false;
    }, 500);
  }
}
