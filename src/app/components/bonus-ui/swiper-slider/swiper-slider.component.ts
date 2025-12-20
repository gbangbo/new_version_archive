import { Component } from '@angular/core';

import { VerticalSliderComponent } from "./widgets/vertical-slider/vertical-slider.component";
import { NestedSwiperComponent } from "./widgets/nested-swiper/nested-swiper.component";
import { MouseWheelVariantComponent } from "./widgets/mouse-wheel-variant/mouse-wheel-variant.component";
import { AutoPlayVariantComponent } from "./widgets/auto-play-variant/auto-play-variant.component";
import { EffectCoverflowComponent } from "./widgets/effect-coverflow/effect-coverflow.component";

@Component({
  selector: 'app-swiper-slider',
  imports: [VerticalSliderComponent, NestedSwiperComponent, MouseWheelVariantComponent, 
            AutoPlayVariantComponent, EffectCoverflowComponent],
  templateUrl: './swiper-slider.component.html',
  styleUrl: './swiper-slider.component.scss'
})

export class SwiperSliderComponent {

}
