import { Component } from '@angular/core';

import { BasicAreaChartComponent } from "./basic-area-chart/basic-area-chart.component";
import { AreaSpalineChartComponent } from "./area-spaline-chart/area-spaline-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { ColumnChartComponent } from "./column-chart/column-chart.component";
import { BubbleChartComponent } from "./bubble-chart/bubble-chart.component";
import { SteplineChartComponent } from "./stepline-chart/stepline-chart.component";
import { ColumnAnnotationChartComponent } from "./column-annotation-chart/column-annotation-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { DonutChartComponent } from "./donut-chart/donut-chart.component";
import { MixedChartComponent } from "./mixed-chart/mixed-chart.component";
import { CandlestickChartComponent } from "./candlestick-chart/candlestick-chart.component";
import { RadarChartComponent } from "./radar-chart/radar-chart.component";
import { RadialBarChartComponent } from "./radial-bar-chart/radial-bar-chart.component";

@Component({
  selector: 'app-apex-chart',
  imports: [BasicAreaChartComponent, AreaSpalineChartComponent, BarChartComponent,
            ColumnChartComponent, BubbleChartComponent, SteplineChartComponent,
            ColumnAnnotationChartComponent, PieChartComponent, DonutChartComponent,
            MixedChartComponent, CandlestickChartComponent, RadarChartComponent, 
            RadialBarChartComponent],
  templateUrl: './apex-chart.component.html',
  styleUrl: './apex-chart.component.scss'
})

export class ApexChartComponent {

}
