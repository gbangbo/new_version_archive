import { Routes } from "@angular/router";

import { ApexChartComponent } from "./apex-chart/apex-chart.component";
import { GoogleChartComponent } from "./google-chart/google-chart.component";
import { ChatjsChartComponent } from "./chatjs-chart/chatjs-chart.component";
import { ChartistChartComponent } from "./chartist-chart/chartist-chart.component";

export const charts: Routes = [
  {
    path: 'apex-chart',
    component: ApexChartComponent,
    data: {
      title: 'Apex Chart',
      breadcrumb: 'Apex Chart'
    }
  },
  {
    path: 'google-chart',
    component: GoogleChartComponent,
    data: {
      title: 'Google Chart',
      breadcrumb: 'Google Chart'
    }
  },
  {
    path: 'chatjs',
    component: ChatjsChartComponent,
    data: {
      title: 'Chatjs Chart',
      breadcrumb: 'Chatjs Chart'
    }
  },
  {
    path: 'chartist',
    component: ChartistChartComponent,
    data: {
      title: 'Chartist Chart',
      breadcrumb: 'Chartist Chart'
    }
  }
]
