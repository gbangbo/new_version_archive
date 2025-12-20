import { LastMonthDetails } from "../../interface/widgets/general"
import { primaryColor, secondaryColor } from "../common"

export const sessionByDeviceChart: any = {
  title: 'Session by Device',
  series: [100, 30, 40],
  labels: ["Desktop", "Mobile", "Tablet"],
  chart: {
    height: 265,
    type: "donut",
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "75%",
        labels: {
          show: true,
          name: {
            offsetY: 4,
          },
          total: {
            show: true,
            fontSize: "20px",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 500,
            label: "9,540",
            formatter: () => "Total",
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#7366FF", "#65c15c", "#ffb829"],
  fill: {
    type: "solid",
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 0,
  },
  responsive: [
    {
      breakpoint: 1753,
      options: {
        chart: {
          width: "100%",
          height: 250,
        },
      },
    },
    {
      breakpoint: 1571,
      options: {
        chart: {
          width: "100%",
          height: 220,
        },
      },
    },
    {
      breakpoint: 1440,
      options: {
        chart: {
          width: "100%",
          height: 190,
        },
      },
    },
    {
      breakpoint: 1290,
      options: {
        chart: {
          height: 160,
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
  chart_details: [
    {
      title: 'Desktop',
      value: 5250,
      progress: 80,
      color: 'primary'
    },
    {
      title: 'Mobile',
      value: 260,
      progress: 35,
      color: 'success'
    },
    {
      title: 'Tablet',
      value: 2158,
      progress: 50,
      color: 'warning'
    }
  ]
}

export const lastMonthDetails: LastMonthDetails[] = [
  {
    id: 1,
    title: 'New Users',
    value: 7000000,
    icon: 'crm-user',
    color: 'primary',
    progress: 58,
    profit: '4.3',
    profit_type: 'loss'
  },
  {
    id: 2,
    title: 'New Leads',
    value: 1398700,
    icon: 'crm-lead',
    color: 'success',
    progress: 58,
    profit: '7.9',
    profit_type: 'profit'
  },
  {
    id: 3,
    title: 'Annual Deals',
    value: 760000,
    icon: 'crm-deal',
    color: 'warning',
    progress: 58,
    profit: '6.7',
    profit_type: 'profit'
  }
]

export const totalUsersChart: any = {
  title: 'Total Users',
  value: '8630k',
  icon: "analytics-user",
  color: 'primary',
  increase_user: '50%',
  series: [
    {
      name: "Month",
      data: [4, 3, 3, 3, 4, 3, 3, 4, 5, 3.5, 2.5, 2.5],
    },
  ],
  chart: {
    height: 125,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "around",
      borderRadiusWhenStacked: "last",
      columnWidth: "30%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
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
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  colors: ["var(--theme-default)", "rgba(115, 102, 255, 0.13)", "rgba(115, 102, 255, 0.33)", "rgba(115, 102, 255, 0.62)", "rgba(115, 102, 255, 0.09)"],
  responsive: [
    {
      breakpoint: 576,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "8px",
          },
        },
      },
    },
  ]
}

export const pageViewsChart: any = {
  title: 'Page Views',
  value: '54390k',
  icon: "analytics-view",
  color: 'secondary',
  page_view: '-20%',
  series: [
    {
      name: "Month",
      data: [0, 20, 20, 15, 15, 10, 10, 5, 5, 10, 10, 20, 20, 15, 15, 20, 20],
    },
  ],
  chart: {
    type: "area",
    height: 148,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    type: "category",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
    labels: {
      show: false,
    },
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
    show: false,
    padding: {
      left: -60,
    },
  },
  yaxis: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    hover: {
      sizeOffset: 4,
    },
  },
  colors: [secondaryColor],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.1,
      inverseColors: true,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
}

export const allVisitsChart: any = {
  title: 'All Visits',
  total_visitors: '3.2%',
  last_week_visitors: '+6.7%',
  series: [
    {
      name: "Visits",
      data: [11, 23, 7, 18, 10, 11, 9, 20, 13, 25, 6, 30],
    },
  ],
  chart: {
    height: 222,
    type: "line",
    stacked: true,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 12,
      color: primaryColor,
      opacity: 0.5,
    },
  },
  colors: [primaryColor],
  stroke: {
    width: 2.5,
    curve: "smooth",
  },
  xaxis: {
    lines: {
      show: true,
    },
    type: "category",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "#52526C",
        fontWeight: 400,
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 25,
    tickAmount: 5,
    labels: {
      formatter: function (val: string) {
        return val + "k";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "#52526C",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "var(--chart-border)",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    type: ["gradient", "solid"],
    gradient: {
      shade: "dark",
      gradientToColors: [primaryColor],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 0.9,
      opacityTo: 1,
      colorStops: [
        {
          offset: 0,
          color: "#48A3D7",
          opacity: 1,
        },
        {
          offset: 100,
          color: primaryColor,
          opacity: 1,
        },
      ],
    },
  },
  annotations: {
    xaxis: [
      {
        x: 340,
        strokeDashArray: 2,
        borderWidth: 1,
        borderColor: primaryColor,
      },
    ],
    points: [
      {
        x: 340,
        y: 20.5,
        marker: {
          size: 8,
          fillColor: primaryColor,
          strokeColor: "#ffffff",
          strokeWidth: 4,
          radius: 5,
        },
        label: {
          borderWidth: 1,
          offsetY: 0,
          text: "4.6%",
          style: {
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "Rubik, sans-serif",
          },
        },
      },
    ],
  },
  responsive: [
    {
      breakpoint: 1846,
      options: {
        chart: {
          height: 245,
          offsetY: 0,
        },
      },
    },
    {
      breakpoint: 1530,
      options: {
        annotations: {
          xaxis: [
            {
              x: 100,
              strokeDashArray: 2,
              borderWidth: 1,
              borderColor: primaryColor,
            },
          ],
          points: [
            {
              x: 100,
              y: 20.5,
              marker: {
                size: 8,
                fillColor: primaryColor,
                strokeColor: "#ffffff",
                strokeWidth: 4,
                radius: 5,
              },
              label: {
                borderWidth: 1,
                offsetY: 0,
                text: "2.6%",
                style: {
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Rubik, sans-serif",
                },
              },
            },
          ],
        },
      },
    },
    {
      breakpoint: 1456,
      options: {
        chart: {
          height: 220,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 232,
        },
      },
    },
    {
      breakpoint: 1325,
      options: {
        xaxis: {
          tickAmount: 6,
          tickPlacement: "between",
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 290,
        },
        xaxis: {
          tickAmount: 8,
          tickPlacement: "between",
        },
      },
    },
    {
      breakpoint: 792,
      options: {
        chart: {
          offsetY: 0,
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 222,
        },
      },
    },
  ],
}