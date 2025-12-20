import { ChartType } from "chart.js";
import { primaryColor, secondaryColor } from "../common";

// Bar Chart
export const barChart = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  responsive: false,
  datasets: [{
    label: "My First dataset",
    borderColor: primaryColor,
    backgroundColor: 'rgba(115, 102 ,255, 0.6)',
    borderWidth: 2,
    data: [35, 59, 80, 81, 56, 55, 40]
  },
  {
    label: "My Second dataset",
    borderColor: secondaryColor,
    backgroundColor: 'rgb(131,131,131,0.6)',
    borderWidth: 2,
    data: [28, 48, 40, 19, 86, 27, 90]
  }],
  barOptions: [
    {
      scaleBeginAtZero: true,
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,0.1)",
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      barShowStroke: true,
      barStrokeWidth: 2,
      barValueSpacing: 5,
      barDatasetSpacing: 1,
    }
  ]
}

// Line Graph Data

export var lineGraphLabels: string[] = ["January", "February", "March", "April", "May", "June", "July"];
export var lineGraphType: ChartType = 'line';
export var lineGraphLegend = false;
export var lineGraphData: any[] = [
  {
    label: "My First dataset",
    fill: true,
    backgroundColor: "rgba(115, 102 ,255, 0.3)",
    borderColor: primaryColor,
    pointColor: primaryColor,
    borderWidth: 2,
    pointBorderColor: "#fff",
    pointHighlight: "#fff",
    pointHighlightStroke: "#000",
    data: [10, 59, 80, 81, 56, 55, 40]
  }, {
    label: "My Second dataset",
    fill: true,
    backgroundColor: "rgb(131,131,131,0.6)",
    borderColor: secondaryColor,
    pointColor: secondaryColor,
    pointStrokeColor: "#fff",
    borderWidth: 2,
    pointHighlightFill: "#000",
    pointHighlightStroke: secondaryColor,
    data: [28, 48, 40, 19, 86, 27, 90]
  }
];
export var lineGraphOptions: any = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}


// radar graph //

export var radarGraphOptions: any = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.2)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 3,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};
export var radarGraphLabels: string[] = ["Ford", "Chevy", "Toyota", "Honda", "Mazda"];
export var radarGraphType: ChartType = 'radar';
export var radarGraphLegend = false;
export var radarGraphData: any[] = [
  {
    label: "My First dataset",
    backgroundColor: "rgba(0, 102, 102, 0.2)",
    borderColor: primaryColor,
    pointBackgroundColor: primaryColor,
    pointBorderColor: primaryColor,
    pointHoverBackgroundColor: primaryColor,
    pointHoverBorderColor: "rgba(0, 102, 102, 0.2)",
    data: [12, 3, 5, 18, 7]
  },
];

//line chart //
export var lineChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
export var lineChartLabels: string[] = ["", "10", "20", "30", "40", "50", "60", "70", "80"];
export var lineChartType: ChartType | any = 'line';
export var lineChartLegend = false;
export var lineChartData: any[] = [
  {
    backgroundColor: "rgba(81, 187, 37, 0.2)",
    fill: true,
    pointBackgroundColor: "#51bb25",
    borderColor: "#51bb25",
    pointColor: "#51bb25",
    data: [10, 20, 40, 30, 0, 20, 10, 30, 10],
    borderWidth: 2
  }, {
    backgroundColor: "rgba(254, 106, 73, 0.3)",
    fill: true,
    borderColor: secondaryColor,
    pointBackgroundColor: secondaryColor,
    pointColor: secondaryColor,
    data: [20, 40, 10, 20, 40, 30, 40, 10, 20],
    borderWidth: 2
  }, {
    backgroundColor: "rgba(0, 102, 102, 0.2)",
    fill: true,
    borderColor: primaryColor,
    pointBackgroundColor: primaryColor,
    pointColor: primaryColor,
    data: [60, 10, 40, 30, 80, 30, 20, 90, 0],
    borderWidth: 2
  }
];


// doughnutchart //

export var doughnutChartLegend = false;
export var doughnutChartLabels: string[] = ['Primary', 'Secondary', 'Success'];
export var doughnutChartData: any[] = [
  {
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      primaryColor,
      secondaryColor,
      "#51bb25"
    ]
  }
];
export var doughnutChartColors: any[] = [{ backgroundColor: [primaryColor, secondaryColor, "#51bb25"] }];
export var doughnutChartType: ChartType = 'doughnut';
export var doughnutChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};

// polar chart //

export var polarChartLabels: string[] = ["Yellow", "Sky", "Black", "Grey", "Dark Grey"];
export var polarChartType: ChartType = 'polarArea';
export var polarChartLegend = false;
export var polarChartOptions: any = {
  scaleShowLabelBackdrop: true,
  scaleBackdropColor: "rgba(255,255,255,0.75)",
  scaleBeginAtZero: true,
  scaleBackdropPaddingY: 2,
  scaleBackdropPaddingX: 2,
  scaleShowLine: true,
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2,
  animationSteps: 100,
  animationEasing: "easeOutBounce",
  animateRotate: true,
  animateScale: false,
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};
export var polarChartColors: any[] = [{ backgroundColor: [primaryColor, secondaryColor] }];
export var polarChartData: any[] = [{
  data: [300, 50, 100, 40, 120],
  backgroundColor: [
    primaryColor,
    "#f8d62b",
    "#51bb25",
    "#a927f9",
    secondaryColor
  ],
  borderColor: "#fff"
}
];