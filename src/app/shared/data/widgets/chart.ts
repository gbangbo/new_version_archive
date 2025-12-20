import { primaryColor, secondaryColor } from "../common";

function commonLineChart(data: { categories: string[], colors: string, series: number[] }) {
  return {
    chart: {
      toolbar: {
        show: false,
      },
      height: 200,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      show: false,
      type: "datetime",
      categories: data.categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        left: -10,
        top: -25,
        right: -60,
        bottom: -40,
      },
    },
    fill: {
      opacity: 0.2,
    },
    colors: [data.colors],
    series: [
      {
        data: data.series,
      },
    ],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 100,
          },
        },
      },
    ]
  }
}

export const commonLineCharts: any = [
  {
    id: 1,
    title: 'Total Sale',
    value: '$3654.00',
    description: 'Compare to last month',
    increase_value: '+65%',
    chart_details: commonLineChart({
      categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
      colors: primaryColor,
      series: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0]
    })
  },
  {
    id: 2,
    title: 'Total Project',
    value: '12569',
    description: 'Compare to last week',
    increase_value: '+65%',
    chart_details: commonLineChart({
      categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
      colors: secondaryColor,
      series: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0]
    })
  },
  {
    id: 3,
    title: 'Total Product',
    value: '93M',
    description: 'Compare to last year',
    increase_value: '+65%',
    chart_details: commonLineChart({
      categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
      colors: '#65c15c',
      series: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0]
    })
  }
]

export const monthlyHistoryChart: any = {
  series: [
    {
      name: "Profit",
      data: [100, 50, 25, 50, 30, 50, 70],
    },
    {
      name: "Revenue",
      data: [70, 20, 55, 45, 35, 110, 85],
    },
    {
      name: "Cash Flow",
      data: [85, 55, 100, 35, 90, 60, 80],
    },
  ],
  chart: {
    type: "bar",
    height: 380,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "30%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["transparent"],
    curve: "smooth",
    lineCap: "butt",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    floating: false,
    axisTicks: {
      show: false,
    },
    axisBorder: {
      color: "#C4C4C4",
    },
  },
  yaxis: {
    title: {
      text: "Dollars in thounand",
      style: {
        fontSize: "14px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
  },
  colors: [secondaryColor, "#65c15c", primaryColor],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.1,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return "$ " + val + " thousands";
      },
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
}

export const skillStatusChart: any = {
  chart: {
    type: "radialBar",
    height: 375,
    offsetY: -30,
    offsetX: 20,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: false,
      hollow: {
        margin: 10,
        size: "30%",
        background: "transparent",
      },
      track: {
        show: true,
        background: "#f2f2f2",
        strokeWidth: "10%",
        opacity: 1,
        margin: 3,
      },
    },
  },
  series: [90, 63, 50],
  labels: ["Skill 01", "Skill 02", "Skill 03"],
  legend: {
    show: true,
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    labels: {
      colors: "#2C323F",
    },
    markers: {
      width: 86,
      height: 18,
      radius: 3,
    },
  },
  colors: [secondaryColor, primaryColor, "#65c15c"],
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
    {
      breakpoint: 420,
      options: {
        chart: {
          offsetY: -20,
          offsetX: 0,
          height: 300,
        },
        legend: {
          show: false,
        },
      },
    },
  ]
}

function commonOrderStatusProgress(data: { colors: string, series: number, categories: string }) {
  return {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: [data.colors],
          backgroundBarOpacity: 0.2,
        },
      },
    },
    colors: [data.colors],
    stroke: {
      width: 0,
    },
    fill: {
      colors: [data.colors],
      type: "gradient",
      gradient: {
        gradientToColors: [data.colors],
      },
      opacity: 1,
    },
    series: [
      {
        name: data.categories,
        data: [data.series],
      },
    ],
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: data.categories,
      style: {
        fontSize: "18px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: data.series + '%',
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: [data.categories],
    },
    yaxis: {
      max: 100,
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ]
  }
}

export const orderStatusChart: any = [
  {
    chart_details: commonOrderStatusProgress({
      colors: primaryColor,
      series: 44,
      categories: "Packed"
    })
  },
  {
    chart_details: commonOrderStatusProgress({
      colors: secondaryColor,
      series: 40,
      categories: "Dispatched"
    })
  },
  {
    chart_details: commonOrderStatusProgress({
      colors: '#a927f9',
      series: 50,
      categories: "Reach Station"
    })
  },
  {
    chart_details: commonOrderStatusProgress({
      colors: "#ffb829",
      series: 60,
      categories: "Out for delivery"
    })
  },
  {
    chart_details: commonOrderStatusProgress({
      colors: "#65c15c",
      series: 74,
      categories: "Delivered"
    })
  }
]

export const liveProductChart: any = {
  chart: {
    height: 320,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 0,
  },
  series: [
    {
      name: "TEAM A",
      data: [50, 120, 90, 100, 70, 95, 40, 55, 30, 0],
    },
    {
      name: "TEAM B",
      data: [35, 60, 40, 90, 70, 110, 90, 120, 60, 0],
    },
  ],
  fill: {
    colors: [primaryColor, secondaryColor],
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 0.9,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: 0,
      right: -120,
      bottom: 10,
    },
  },
  colors: [primaryColor, secondaryColor],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  markers: {
    size: 0,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      color: "rgba(196,196,196, 0.3)",
    },
  },
  yaxis: [
    {
      title: {
        text: "Dollars in thounand",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y: number) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
      },
    },
  }
}

export const turnOverChart: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 300,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: -20,
      right: -55,
      bottom: 0,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [primaryColor],
  series: [
    {
      data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  }
}

export const cryptoCurrencyPriceChart: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 400,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    tickAmount: 10,
    tickPlacement: "between",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: -20,
      right: -16,
      bottom: 0,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [primaryColor],
  series: [
    {
      data: [20, 120, 15, 100, 120, 60, 150, 70, 100, 80, 105, 20, 70, 60, 10, 12, 10, 130, 60, 80, 40, 140, 110, 150, 30, 75, 20, 45, 15, 130, 10, 30, 15, 110, 65, 130, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
        xaxis: {
          tickAmount: 5,
          tickPlacement: "between",
        },
      },
    },
  ]
}

export const cryptoAnnotationChart: any = {
  series: [
    {
      data: [8107, 8300, 8260, 8400, 8350, 8500, 8350],
    },
  ],
  chart: {
    height: 400,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  annotations: {
    yaxis: [
      {
        y: 8200,
        y2: 8400,
        borderColor: "#ffb829",
        fillColor: "#ffb829",
        opacity: 0.1,
        label: {
          borderColor: "#ffb829",
          offsetX: -30,
          style: {
            fontSize: "10px",
            color: "#fff",
            background: "#ffb829",
          },
          text: "Y-axis range",
        },
      },
    ],
    xaxis: [
      {
        x: new Date("15 Nov 2017").getTime(),
        strokeDashArray: 0,
        borderColor: primaryColor,
        label: {
          borderColor: primaryColor,
          offsetY: 20,
          style: {
            color: "#fff",
            background: primaryColor,
          },
          text: "Anno Test",
        },
      },
      {
        x: new Date("17 Nov 2017").getTime(),
        x2: new Date("18 Nov 2017").getTime(),
        fillColor: "#65c15c",
        opacity: 0.1,
        label: {
          borderColor: "##65c15c",
          style: {
            fontSize: "10px",
            color: "#fff",
            background: "#65c15c",
          },
          offsetY: 20,
          text: "X-axis range",
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  grid: {
    padding: {
      right: 30,
      left: 20,
    },
  },
  title: {
    text: "Line with Annotations",
    align: "left",
    style: {
      fontSize: "18px",
      fontFamily: "Rubik, sans-serif",
      fontWeight: 500,
    },
  },
  colors: [secondaryColor],
  labels: ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017"],
  xaxis: {
    type: "datetime",
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ]
}

export const stockMarketChart: any = {
  series: [
    {
      name: "line",
      type: "line",
      data: [
        {
          x: new Date(1538778600000),
          y: 6550,
        },
        {
          x: new Date(1538782200000),
          y: 6560,
        },
        {
          x: new Date(1538814600000),
          y: 6640,
        },
        {
          x: new Date(1538884800000),
          y: 6560,
        },
      ],
    },
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: new Date(1538784000000),
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: new Date(1538785800000),
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: new Date(1538787600000),
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
        {
          x: new Date(1538789400000),
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: new Date(1538791200000),
          y: [6627, 6627.62, 6584.22, 6603.02],
        },
        {
          x: new Date(1538793000000),
          y: [6605, 6608.03, 6598.95, 6604.01],
        },
        {
          x: new Date(1538794800000),
          y: [6604.5, 6614.4, 6602.26, 6608.02],
        },
        {
          x: new Date(1538796600000),
          y: [6608.02, 6610.68, 6601.99, 6608.91],
        },
        {
          x: new Date(1538798400000),
          y: [6608.91, 6618.99, 6608.01, 6612],
        },
        {
          x: new Date(1538800200000),
          y: [6612, 6615.13, 6605.09, 6612],
        },
        {
          x: new Date(1538802000000),
          y: [6612, 6624.12, 6608.43, 6622.95],
        },
        {
          x: new Date(1538803800000),
          y: [6623.91, 6623.91, 6615, 6615.67],
        },
        {
          x: new Date(1538805600000),
          y: [6618.69, 6618.74, 6610, 6610.4],
        },
        {
          x: new Date(1538807400000),
          y: [6611, 6622.78, 6610.4, 6614.9],
        },
        {
          x: new Date(1538809200000),
          y: [6614.9, 6626.2, 6613.33, 6623.45],
        },
        {
          x: new Date(1538811000000),
          y: [6623.48, 6627, 6618.38, 6620.35],
        },
        {
          x: new Date(1538812800000),
          y: [6619.43, 6620.35, 6610.05, 6615.53],
        },
        {
          x: new Date(1538814600000),
          y: [6615.53, 6617.93, 6610, 6615.19],
        },
        {
          x: new Date(1538816400000),
          y: [6615.19, 6621.6, 6608.2, 6620],
        },
        {
          x: new Date(1538818200000),
          y: [6619.54, 6625.17, 6614.15, 6620],
        },
        {
          x: new Date(1538820000000),
          y: [6620.33, 6634.15, 6617.24, 6624.61],
        },
        {
          x: new Date(1538821800000),
          y: [6625.95, 6626, 6611.66, 6617.58],
        },
        {
          x: new Date(1538823600000),
          y: [6619, 6625.97, 6595.27, 6598.86],
        },
        {
          x: new Date(1538825400000),
          y: [6598.86, 6598.88, 6570, 6587.16],
        },
        {
          x: new Date(1538827200000),
          y: [6588.86, 6600, 6580, 6593.4],
        },
        {
          x: new Date(1538829000000),
          y: [6593.99, 6598.89, 6585, 6587.81],
        },
        {
          x: new Date(1538830800000),
          y: [6587.81, 6592.73, 6567.14, 6578],
        },
        {
          x: new Date(1538832600000),
          y: [6578.35, 6581.72, 6567.39, 6579],
        },
        {
          x: new Date(1538834400000),
          y: [6579.38, 6580.92, 6566.77, 6575.96],
        },
        {
          x: new Date(1538836200000),
          y: [6575.96, 6589, 6571.77, 6588.92],
        },
        {
          x: new Date(1538838000000),
          y: [6588.92, 6594, 6577.55, 6589.22],
        },
        {
          x: new Date(1538839800000),
          y: [6589.3, 6598.89, 6589.1, 6596.08],
        },
        {
          x: new Date(1538841600000),
          y: [6597.5, 6600, 6588.39, 6596.25],
        },
        {
          x: new Date(1538843400000),
          y: [6598.03, 6600, 6588.73, 6595.97],
        },
        {
          x: new Date(1538845200000),
          y: [6595.97, 6602.01, 6588.17, 6602],
        },
        {
          x: new Date(1538847000000),
          y: [6602, 6607, 6596.51, 6599.95],
        },
        {
          x: new Date(1538848800000),
          y: [6600.63, 6601.21, 6590.39, 6591.02],
        },
        {
          x: new Date(1538850600000),
          y: [6591.02, 6603.08, 6591, 6591],
        },
        {
          x: new Date(1538852400000),
          y: [6591, 6601.32, 6585, 6592],
        },
        {
          x: new Date(1538854200000),
          y: [6593.13, 6596.01, 6590, 6593.34],
        },
        {
          x: new Date(1538856000000),
          y: [6593.34, 6604.76, 6582.63, 6593.86],
        },
        {
          x: new Date(1538857800000),
          y: [6593.86, 6604.28, 6586.57, 6600.01],
        },
        {
          x: new Date(1538859600000),
          y: [6601.81, 6603.21, 6592.78, 6596.25],
        },
        {
          x: new Date(1538861400000),
          y: [6596.25, 6604.2, 6590, 6602.99],
        },
        {
          x: new Date(1538863200000),
          y: [6602.99, 6606, 6584.99, 6587.81],
        },
        {
          x: new Date(1538865000000),
          y: [6587.81, 6595, 6583.27, 6591.96],
        },
        {
          x: new Date(1538866800000),
          y: [6591.97, 6596.07, 6585, 6588.39],
        },
        {
          x: new Date(1538868600000),
          y: [6587.6, 6598.21, 6587.6, 6594.27],
        },
        {
          x: new Date(1538870400000),
          y: [6596.44, 6601, 6590, 6596.55],
        },
        {
          x: new Date(1538872200000),
          y: [6598.91, 6605, 6596.61, 6600.02],
        },
        {
          x: new Date(1538874000000),
          y: [6600.55, 6605, 6589.14, 6593.01],
        },
        {
          x: new Date(1538875800000),
          y: [6593.15, 6605, 6592, 6603.06],
        },
        {
          x: new Date(1538877600000),
          y: [6603.07, 6604.5, 6599.09, 6603.89],
        },
        {
          x: new Date(1538879400000),
          y: [6604.44, 6604.44, 6600, 6603.5],
        },
        {
          x: new Date(1538881200000),
          y: [6603.5, 6603.99, 6597.5, 6603.86],
        },
        {
          x: new Date(1538883000000),
          y: [6603.85, 6605, 6600, 6604.07],
        },
        {
          x: new Date(1538884800000),
          y: [6604.98, 6606, 6604.07, 6606],
        },
      ],
    },
  ],
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#FF474A",
        downward: "#6540D1",
      },
    },
  },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.2,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  chart: {
    height: 450,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: [1, 1],
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    strokeDashArray: 3,
    position: "back",
    row: {
      opacity: 0.5,
    },
    column: {
      opacity: 0.5,
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ]
}

var trigoStrength = 3;

function generateMinuteWiseTimeSeries(baseVal: number, count: number, yRange: { min: number; max: number; }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseVal;
    var y = (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);

    series.push([x, y]);
    baseVal += 300000;
    i++;
  }
  return series;
}

export const financeChart: any = {
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Load Average",
      type: "column",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 10,
        max: 110,
      }),
    },
    {
      name: "Social Media",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ],
  title: {
    text: "Average",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  subtitle: {
    text: "17%",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "20px",
      fontWeight: 500,
    },
  },
  fill: {
    colors: [primaryColor],
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  yaxis: {
    decimalsInFloat: 1,
  },
  legend: {
    show: true,
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        subtitle: {
          style: {
            fontSize: "18px",
          },
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        subtitle: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ]
}

var iteration = 11;

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);
}

export const orderStatusChart2: any = {
  chart: {
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  fill: {
    opacity: 0.9,
  },
  colors: [primaryColor, secondaryColor],
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  series: [
    {
      name: "Running",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
    {
      name: "Waiting",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
  ],
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  yaxis: {
    decimalsInFloat: 1,
  },
  title: {
    text: "Processes",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "right",
    onItemClick: {
      toggleDataSeries: false,
    },
    position: "top",
    offsetY: -33,
    offsetX: 60,
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        title: {
          style: {
            fontSize: "18px",
          },
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ]
}

export const monthlySalesChart: any = {
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "Reflected",
      shadeIntensity: 0.1,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  colors: [primaryColor, secondaryColor],
  chart: {
    height: 300,
    type: "radar",
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1,
    },
  },
  series: [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: "Series 2",
      data: [20, 30, 40, 80, 20, 80],
    },
  ],
  title: {
    text: "Radar Chart - Multi Series",
  },
  stroke: {
    width: 0,
  },
  markers: {
    size: 0,
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
}

function generateData(baseVal: number, count: number, yRange: { max: number; min: number; }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y = Math.floor(Math.random() * (yRange.max - yRange.min + 1)) + yRange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseVal += 86400000;
    i++;
  }
  return series;
}

export const usersChart: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 320,
    type: "bubble",
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Bubble1",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble2",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble3",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble4",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.7,
      stops: [0, 100],
    },
  },
  colors: [primaryColor, secondaryColor, "#65c15c", "#544fff"],
  title: {
    text: "Simple Bubble Chart",
  },
  xaxis: {
    tickAmount: 12,
    type: "category",
  },
  yaxis: {
    max: 70,
  }
}