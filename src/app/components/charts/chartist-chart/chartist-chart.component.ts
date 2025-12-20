import { Component } from '@angular/core';

import { AdvancedSmilAnimationsComponent } from "./advanced-smil-animations/advanced-smil-animations.component";
import { SvgPathAnimationComponent } from "./svg-path-animation/svg-path-animation.component";
import { DonutSvgAnimateComponent } from "./donut-svg-animate/donut-svg-animate.component";
import { BiPolarLineComponent } from "./bi-polar-line/bi-polar-line.component";
import { LineChartAreaComponent } from "./line-chart-area/line-chart-area.component";
import { BiPolarBarChartComponent } from "./bi-polar-bar-chart/bi-polar-bar-chart.component";
import { StackedBarChartComponent } from "./stacked-bar-chart/stacked-bar-chart.component";
import { HorizontalBarChartComponent } from "./horizontal-bar-chart/horizontal-bar-chart.component";
import { ExtremeResponsiveComponent } from "./extreme-responsive/extreme-responsive.component";
import { SimpleLineChartComponent } from "./simple-line-chart/simple-line-chart.component";
import { HolesDataComponent } from "./holes-data/holes-data.component";
import { FilledHolesDataComponent } from "./filled-holes-data/filled-holes-data.component";

@Component({
  selector: 'app-chartist-chart',
  imports: [AdvancedSmilAnimationsComponent, SvgPathAnimationComponent, DonutSvgAnimateComponent,
            BiPolarLineComponent, LineChartAreaComponent, BiPolarBarChartComponent,
            StackedBarChartComponent, HorizontalBarChartComponent, ExtremeResponsiveComponent,
            SimpleLineChartComponent, HolesDataComponent, FilledHolesDataComponent],
  templateUrl: './chartist-chart.component.html',
  styleUrl: './chartist-chart.component.scss'
})

export class ChartistChartComponent {

}
