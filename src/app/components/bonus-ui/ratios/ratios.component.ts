import { Component } from '@angular/core';

import { AspectRatiosComponent } from "./widgets/aspect-ratios/aspect-ratios.component";
import { CustomRatioComponent } from "./widgets/custom-ratio/custom-ratio.component";
import { DefaultRatioComponent } from "./widgets/default-ratio/default-ratio.component";

@Component({
  selector: 'app-ratios',
  imports: [AspectRatiosComponent, CustomRatioComponent, DefaultRatioComponent],
  templateUrl: './ratios.component.html',
  styleUrl: './ratios.component.scss'
})

export class RatiosComponent {

}
