import { CrmTodo, Deal, Lead, LeadSource } from "../../interface/dashboard/crm";
import { primaryColor } from "../common";

export const totalSalesChart: any = {
  title: 'Total Sales',
  date: 'Jan 1, 2024 - Mar 10, 2024',
  total_sale: '$ 870.45k',
  profit: '8.3',
  profit_type: 'profit',
  chart_details: {
    series: [
      {
        name: "Sales",
        data: [5, 8, 12, 18, 10, 2, 5, 18, 20, 16, 22, 15],
      },
    ],
    chart: {
      height: 90,
      type: "line",
      zoom: {
        enabled: false,
      },
      offsetY: -20,
      offsetX: -20,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 8,
        left: 0,
        blur: 3,
        color: "#54BA4A",
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      z: {
        show: false,
      },
    },
    colors: ["#54BA4A"],
    fill: {
      opacity: 1,
      type: "solid",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.95,
        opacityTo: 1,
        colorStops: [
          {
            offset: 0,
            color: "#54BA4A",
            opacity: 0.1,
          },
          {
            offset: 30,
            color: "#54BA4A",
            opacity: 0.8,
          },
          {
            offset: 80,
            color: "#54BA4A",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#54BA4A",
            opacity: 0.1,
          },
        ],
      },
    },
    markers: {
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 11,
          fillColor: "#65c15c",
          strokeColor: "var(--white)",
          size: 5,
          sizeOffset: 3,
        },
      ],
      hover: {
        size: 5,
        sizeOffset: 0,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1684,
        options: {
          chart: {
            width: 280,
          },
        },
      },
      {
        breakpoint: 1582,
        options: {
          chart: {
            width: 240,
          },
        },
      },
      {
        breakpoint: 1421,
        options: {
          chart: {
            width: 225,
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
      {
        breakpoint: 716,
        options: {
          chart: {
            height: 75,
          },
        },
      },
    ]
  }
}

export const salesChart: any = {
  title: 'Sales',
  chart_details: {
    series: [
      {
        name: "Call",
        data: [15, 52, 94, 5, 32, 85],
      },
      {
        name: "Lead Research",
        data: [65, 32, 55, 82, 5, 82],
      },
      {
        name: "Email",
        data: [20, 88, 22, 62, 85, 5],
      },
    ],
    chart: {
      height: 282,
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: undefined,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "solid",
      colors: ["var(--primary-70)", "var(--warning-70)", "var(--success-70)"],
      opacity: 0.1,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--theme-default)", "#ffb829", "#65c15c"],
      curve: "smooth",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        show: true,
        style: {
          colors: "rgba($badge-light-color,0.8)",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
      tickAmount: 5,
      tickPlacement: "between",
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: "rgba(82, 82, 108, 0.8)",
      },
      markers: {
        fillColors: ["var(--theme-default)", "#ffb829", "#65c15c"],
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: ["#e8e8e8"],
          strokeDashArray: 2,
        },
      },
    },
    responsive: [
      {
        breakpoint: 1538,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1520,
        options: {
          legend: {
            markers: {
              strokeWidth: 1,
            },
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 295,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            offsetY: -20,
          },
        },
      },
    ]
  }
}

export const revenueGrowthChart: any = {
  series: [
    {
      name: "Sales",
      data: [5, 20, 3, 18, 15],
    },
    {
      name: "Revenue",
      data: [5, 13, 3, 14, 15],
    },
  ],
  chart: {
    height: 120,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
    curve: "smooth",
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
  grid: {
    show: true,
    borderColor: "var(--chart-border)",
    strokeDashArray: 6,
    position: "back",
  },
  colors: ["#80be70", "#c8e7e5"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#7366FF"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    min: 0,
    max: 20,
    tickAmount: 2,
    labels: {
      formatter: function (value: string) {
        return value + "k";
      },
      style: {
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,
        colors: "#52526C",
        fontSize: 12,
      },
    },
  },
  responsive: [
    {
      breakpoint: 577,
      options: {
        chart: {
          height: 140,
        },
      },
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 120,
        },
      },
    },
  ]
}

export const pipelineBreakdownChart: any = {
  chart: {
    series: [90, 50, 25],
    labels: ["Lead", "Proposal", "Negotiation"],
    chart: {
      width: 140,
      height: 158,
      type: "donut",
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              show: false,
            },
            total: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Rubik, sans-serif",
              formatter: () => "92%",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#7366FF", "#ffb829", "#65c15c"],
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
        breakpoint: 1700,
        options: {
          chart: {
            height: 155,
            offsetX: 10,
          },
        },
      },
      {
        breakpoint: 1618,
        options: {
          chart: {
            height: 150,
            offsetX: 10,
          },
        },
      },
      {
        breakpoint: 1537,
        options: {
          chart: {
            height: 170,
            offsetX: 0,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 158,
            offsetX: 0,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 140,
            offsetX: 0,
          },
        },
      },
      {
        breakpoint: 591,
        options: {
          chart: {
            height: 130,
            offsetX: -10,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ]
  },
  chart_details: [
    { value: 'Lead: $115k', color: 'primary' },
    { value: 'Proposal: $90k', color: 'warning' },
    { value: 'Negotiation: $47k', color: 'success' }
  ]
}

export const crmTodo: CrmTodo[] = [
  {
    id: 1,
    title: 'Monitor sales performance',
    added_by: 'alice'
  },
  {
    id: 2,
    title: 'Manage tasks and appointments',
    added_by: 'bob'
  },
  {
    id: 3,
    title: 'Important updates and deadlines',
    added_by: 'jake'
  },
  {
    id: 4,
    title: 'Analyze customer interactions',
    added_by: 'kevin'
  }
]

export const financeOverviewChart: any = {
  title: 'Finance Overview',
  revenue: '634k',
  expenses: '302k',
  series: [
    {
      name: "Expenses",
      data: [20, 45, 40, 50, 65, 18, 25, 60, 35, 25, 60, 30],
    },
    {
      name: "Revenue",
      data: [40, 82, 90, 40, 99, 55, 15, 35, 95, 20, 20, 30],
    },
  ],
  chart: {
    type: "bar",
    height: 230,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
      borderRadius: 0,
    },
  },
  grid: {
    show: false,
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    dashArray: 0,
    lineCap: "butt",
    colors: "#fff",
  },
  fill: {
    opacity: 1,
  },
  legend: {
    show: false,
  },

  colors: [primaryColor, "#AAAFCB"],
  yaxis: {
    min: 20,
    max: 100,
    tickAmount: 4,
    tickPlacement: "on",

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", " Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        fontFamily: "Rubik, sans-serif",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 235,
        },
      },
    },
    {
      breakpoint: 875,
      options: {
        xaxis: {
          tickAmount: 6,
          tickPlacement: "between",
        },
      },
    },
    {
      breakpoint: 767,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "15px",
          },
        },
      },
    },
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
    {
      breakpoint: 400,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "6px",
          },
        },
      },
    },
  ]
}

export const deals: Deal[] = [
  {
    id: 1,
    deal_id: 5001,
    deal_name: "Project",
    amount: "30,000",
    close_date: "13 Jan 2024"
  },
  {
    id: 2,
    deal_id: 6120,
    deal_name: "Product Launch",
    amount: "64,000",
    close_date: "25 Feb 2024"
  },
  {
    id: 3,
    deal_id: 8450,
    deal_name: "Service Contract",
    amount: "92,000",
    close_date: "10 Mar 2024"
  },
  {
    id: 4,
    deal_id: 9514,
    deal_name: "Star Software",
    amount: "37,000",
    close_date: "26 Apr 2024"
  },
  {
    id: 5,
    deal_id: 3512,
    deal_name: "New Partnership",
    amount: "88,000",
    close_date: "30 May 2024"
  },
  {
    id: 6,
    deal_id: 5896,
    deal_name: "Silver Star",
    amount: "25,000",
    close_date: "02 Feb 2024"
  },
  {
    id: 7,
    deal_id: 2548,
    deal_name: "Evergreen",
    amount: "48,254",
    close_date: "15 Jun 2024"
  },
  {
    id: 8,
    deal_id: 2485,
    deal_name: "Sun Farms",
    amount: "48,222",
    close_date: "19 Mar 2024"
  }
];


export const leads: Lead[] = [
  {
    id: 1,
    lead_name: "Eleanor",
    lead_profile: "assets/images/dashboard-9/user/1.png",
    date: "01/04/2024",
    email: "pena@evyh.com",
    assign_user_name: "Lina",
    assign_user_profile: "assets/images/user/common-user/1.png",
    status: "Accepted"
  },
  {
    id: 2,
    lead_name: "Arlene",
    lead_profile: "assets/images/dashboard-9/user/2.png",
    date: "21/03/2023",
    email: "mccoy@evyh.com",
    assign_user_name: "Jake",
    assign_user_profile: "assets/images/user/common-user/2.png",
    status: "Pending"
  },
  {
    id: 3,
    lead_name: "Cryon",
    lead_profile: "assets/images/dashboard-9/user/3.png",
    date: "18/02/2024",
    email: "murphy@evyh.com",
    assign_user_name: "Jenny",
    assign_user_profile: "assets/images/user/common-user/3.png",
    status: "Accepted"
  },
  {
    id: 4,
    lead_name: "Darrell",
    lead_profile: "assets/images/dashboard-9/user/4.png",
    date: "16/01/2023",
    email: "darrell@evyh.com",
    assign_user_name: "Robert",
    assign_user_profile: "assets/images/user/common-user/4.png",
    status: "Rejected"
  },
  {
    id: 5,
    lead_name: "Alexis",
    lead_profile: "assets/images/dashboard/user/12.jpg",
    date: "19/08/2024",
    email: "alexis@taylor.com",
    assign_user_name: "Eriko",
    assign_user_profile: "assets/images/user/common-user/5.png",
    status: "Accepted"
  },
  {
    id: 6,
    lead_name: "Andrew",
    lead_profile: "assets/images/dashboard/user/13.jpg",
    date: "24/02/2024",
    email: "andrew@price.com",
    assign_user_name: "Caleb",
    assign_user_profile: "assets/images/user/common-user/6.png",
    status: "Pending"
  },
  {
    id: 7,
    lead_name: "Olivia",
    lead_profile: "assets/images/dashboard/user/11.jpg",
    date: "05/07/2024",
    email: "olivia@gor.com",
    assign_user_name: "Cody",
    assign_user_profile: "assets/images/user/common-user/7.png",
    status: "Rejected"
  },
  {
    id: 8,
    lead_name: "Emily",
    lead_profile: "assets/images/dashboard/user/3.jpg",
    date: "07/06/2024",
    email: "emily@park.com",
    assign_user_name: "Jake",
    assign_user_profile: "assets/images/user/common-user/8.png",
    status: "Pending"
  }
];


function generateData(count: number, yRange: { min: any; max: any; }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yRange.max - yRange.min + 1)) + yRange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
}


export const salesWeekChart: any = {
  chart: {
    height: 325,
    type: "heatmap",
    toolbar: {
      show: false,
    },
    offsetY: -20,
  },
  colors: ["#F1F0FF", "#7366FF", "#AAA2FE", "#E6E7FD"],
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.9,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "1pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "2pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "3pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "4pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "5pm",
      data: generateData(7, {
        min: 0,
        max: 0,
      }),
    },
    {
      name: "6pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "7pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "8pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "9pm",
      data: generateData(7, {
        min: -30,
        max: 55,
      }),
    },
  ],
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    tickPlacement: "between",
    labels: {
      style: {
        fontFamily: "Rubik, sans-serif",
        colors: "#52526c",
        fontSize: 12,
      },
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
    labels: {
      style: {
        fontFamily: "Rubik, sans-serif",
        colors: "#52526c",
        fontSize: 12,
      },
    },
  },
  responsive: [
    {
      breakpoint: 1580,
      options: {
        chart: {
          height: 340,
        },
      },
    },
    {
      breakpoint: 1510,
      options: {
        xaxis: {
          tickAmount: 3,
          tickPlacement: "between",
        },
      },
    },
    {
      breakpoint: 1459,
      options: {
        chart: {
          height: 310,
        },
      },
    },
    {
      breakpoint: 1431,
      options: {
        chart: {
          height: 360,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 268,
        },
        xaxis: {
          tickAmount: 5,
          tickPlacement: "between",
        },
      },
    },
  ]
}

export const leadSource: LeadSource[] = [
  {
    id: 1,
    title: 'Campaign',
    value: 95,
  },
  {
    id: 2,
    title: 'Email',
    value: 84,
  },
  {
    id: 3,
    title: 'Referral',
    value: 70,
  }
]