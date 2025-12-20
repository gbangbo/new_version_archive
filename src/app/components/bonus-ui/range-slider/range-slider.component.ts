import { Component } from '@angular/core';

import { DefaultRangeSliderComponent } from "./widgets/default-range-slider/default-range-slider.component";
import { MinMaxValueComponent } from "./widgets/min-max-value/min-max-value.component";
import { NegativeValueComponent } from "./widgets/negative-value/negative-value.component";
import { StepsRangeSliderComponent } from "./widgets/steps-range-slider/steps-range-slider.component";
import { CustomValueComponent } from "./widgets/custom-value/custom-value.component";
import { PrettifyNumberComponent } from "./widgets/prettify-number/prettify-number.component";
import { DisabledSliderComponent } from "./widgets/disabled-slider/disabled-slider.component";
import { CoreUiComponent } from "./widgets/core-ui/core-ui.component";

@Component({
  selector: 'app-range-slider',
  imports: [DefaultRangeSliderComponent, MinMaxValueComponent, NegativeValueComponent,
            StepsRangeSliderComponent, CustomValueComponent, PrettifyNumberComponent,
            DisabledSliderComponent, CoreUiComponent],
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.scss'
})

export class RangeSliderComponent {

}
