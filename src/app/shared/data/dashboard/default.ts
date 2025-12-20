import { ActivityLogs, Details, ManageAppointments, RecentOrders, TopCustomers } from "../../interface/dashboard/default";
import { primaryColor } from "../common";

export const details: Details[] = [
  {
    title: "Revenue",
    count: "$45,195",
    margin: "50%",
    margin_type: "profit",
    icon: "c-revenue",
    color: "secondary",
  },
  {
    title: "Customers",
    count: "845+",
    margin: "40%",
    margin_type: "loss",
    icon: "c-customer",
    color: "success",
  },
  {
    title: "Profit",
    count: "80%",
    margin: "20%",
    margin_type: "loss",
    icon: "c-profit",
    color: "warning",
  },
  {
    title: "Invoices",
    count: "10,905",
    margin: "50%",
    margin_type: "profit",
    icon: "c-invoice",
    color: "primary",
    class: 'fill-primary'
  }
]

export const visitorChart: any = {
  series: [
    {
      name: "Growth",
      data: [9, 25, 18, 30, 9, 14, 26, 22, 28, 16, 9, 8, 16],
    },
  ],
  chart: {
    height: 160,
    type: "line",
    stacked: true,
    offsetY: -10,
    toolbar: {
      show: false,
    },
  },
  colors: [primaryColor],
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    lines: {
      show: true,
    },
    type: "category",
    categories: ["0", "", "10k", "", "20k", "", "30k", "", "40k", "", "50k", "", "60k"],
    labels: {
      style: {
        fontFamily: "Rubik, sans-serif",
        fontWeight: 500,
        colors: "#8D8D8D",
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  grid: {
    show: true,
    borderColor: "var(--chart-dashed-border)",
    strokeDashArray: 3,
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: [primaryColor],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
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
  yaxis: {
    labels: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 310,
          offsetY: 0,
        },
      },
    },
    {
      breakpoint: 1345,
      options: {
        chart: {
          height: 300,
          offsetY: 0,
        },
      },
    },
    {
      breakpoint: 1248,
      options: {
        chart: {
          height: 300,
          offsetY: 0,
        },
      },
    },

    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 130,
          offsetY: -20,
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
      breakpoint: 576,
      options: {
        chart: {
          height: 150,
          offsetY: -20,
        },
      },
    },
    {
      breakpoint: 389,
      options: {
        chart: {
          offsetY: 0,
        },
      },
    },
  ],
}

export const topCustomers: TopCustomers[] = [
  {
    id: 1,
    customer_name: 'Jane Cooper',
    customer_profile: 'assets/images/dashboard/user/2.jpg',
    customer_id: '#452140',
    purchase_items: 65,
    total_price: 970
  },
  {
    id: 2,
    customer_name: 'Wade Warren',
    customer_profile: 'assets/images/dashboard/user/3.jpg',
    customer_id: '#844967',
    purchase_items: 42,
    total_price: 300
  },
  {
    id: 3,
    customer_name: 'Guy Hawkins',
    customer_profile: 'assets/images/dashboard/user/4.jpg',
    customer_id: '#321489',
    purchase_items: 38,
    total_price: 900
  },
  {
    id: 4,
    customer_name: 'Jake Spy',
    customer_profile: 'assets/images/dashboard/user/5.jpg',
    customer_id: '#954687',
    purchase_items: 23,
    total_price: 300
  },
  {
    id: 5,
    customer_name: 'Devin Jake',
    customer_profile: 'assets/images/dashboard-9/user/1.png',
    customer_id: '#562778',
    purchase_items: 12,
    total_price: 500
  },
  {
    id: 6,
    customer_name: 'Jacob Jones',
    customer_profile: 'assets/images/dashboard-9/user/2.png',
    customer_id: '#589356',
    purchase_items: 10,
    total_price: 420
  },
  {
    id: 7,
    customer_name: 'Jams Bone',
    customer_profile: 'assets/images/dashboard-9/user/5.png',
    customer_id: '#589657',
    purchase_items: 10,
    total_price: 440
  },
  {
    id: 8,
    customer_name: 'Mili Pais',
    customer_profile: 'assets/images/dashboard-9/user/3.png',
    customer_id: '#589654',
    purchase_items: 12,
    total_price: 240
  }
]

export const salesStatisticalChart: any = {
  series: [
    {
      name: "Earning",
      data: [300, 150, 250, 270, 400, 420, 600, 420, 400, 700, 600, 200],
    },
    {
      name: "Expense",
      data: [300, 750, 700, 840, 850, 999, 900, 999, 850, 470, 400, 500],
    },
  ],
  chart: {
    type: "bar",
    height: 312,
    stacked: true,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 8,
      left: 0,
      blur: 8,
      color: "#7064F5",
      opacity: 0.1,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20%",
      borderRadius: 0,
    },
  },
  grid: {
    borderColor: "var(--chart-border)",
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
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  colors: [primaryColor, "#AAAFCB"],
  yaxis: {
    tickAmount: 8,
    labels: {
      formatter: function (value: string) {
        return value + "k";
      },
      show: true,
      style: {
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,
        colors: "#52526C",
        fontSize: 12,
      },
    },
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
      breakpoint: 1400,
      options: {
        chart: {
          height: 310,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 280,
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
        yaxis: {
          labels: {
            show: false,
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
  ],
}

export const monthlyTargetChart: any = {
  series: [92.77],
  chart: {
    type: "radialBar",
    height: 320,
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "65%",
      },
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#d7e2e9",
        strokeWidth: "97%",
        margin: 5,
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: "#999",
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: -10,
        },
        value: {
          show: true,
          offsetY: -50,
          fontSize: "18px",
          fontWeight: "600",
          color: "#2F2F3B",
        },
        total: {
          show: true,
          label: "+60%",
          color: primaryColor,
          fontSize: "14px",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 400,
          formatter: function () {
            return "89%";
          },
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [100],
      colorStops: [
        {
          offset: 0,
          color: primaryColor,
          opacity: 1,
        },
      ],
    },
  },
  labels: ["Average Results"],
  responsive: [
    {
      breakpoint: 1591,
      options: {
        chart: {
          height: 270,
        },
      },
    },
    {
      breakpoint: 1426,
      options: {
        chart: {
          height: 240,
        },
      },
    },
    {
      breakpoint: 1331,
      options: {
        chart: {
          height: 210,
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                fontSize: "16px",
              },
              total: {
                fontSize: "13px",
              },
            },
          },
        },
      },
    },
    {
      breakpoint: 1233,
      options: {
        chart: {
          height: 200,
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
  description: "Revenue Surges! Today's earnings soar to $3653, marking an impressive uptick from last month. Keep the momentum going!",
  targetDetails: [
    {
      title: "Revenue",
      value: "$20k",
      icon: "trending-up",
      badge_color: "success"
    },
    {
      title: "Target",
      value: "$16k",
      icon: "trending-down",
      badge_color: "danger"
    },
    {
      title: "Today",
      value: "$1.6k",
      icon: "trending-up",
      badge_color: "success"
    }
  ]
}

export const activityLogs: ActivityLogs[] = [
  {
    id: 1,
    title: "Brooklyn Simmons",
    description: "This smithe design looks great...",
    log_type: "Commented",
    log_details: "NFT App",
    date: "22 Feb 2025",
    time: "7:00 AM",
    color: "primary"
  },
  {
    id: 2,
    title: "Leslie Alexander",
    description: "Food Delivery App figma & Ai...",
    log_type: "Shared images",
    log_details: "Barkha",
    date: "15 Feb 2025",
    time: "5:12 AM",
    color: "secondary",
    image: true,
    images: [
      {
        image_url: "assets/images/dashboard/bg-1.png",
      },
      {
        image_url: "assets/images/dashboard/bg-2.png",
      },
      {
        image_url: "assets/images/dashboard/bg-3.png",
      }
    ]
  },
  {
    id: 3,
    title: "Kristin Watson",
    description: "Make sure your AI file is cloud storage...",
    log_type: "Add new screen",
    log_details: "Cuba Admin",
    date: "10 Jan 2025",
    time: "7:00 AM",
    color: "success"
  }
]

export const recentOrders: RecentOrders[] = [
  {
    id: 1,
    product_name: 'Bag',
    product_image: 'assets/images/dashboard-2/order/sub-product/16.png',
    product_id: '#452140',
    customer_name: 'Jenny Wilson',
    quantity: 2,
    total_price: '2,854',
    order_date: '16 Jan,2024',
    status: 'Delivered',
    status_color: 'success',
    category: 'bag'
  },
  {
    id: 2,
    product_name: 'Sofa',
    product_image: 'assets/images/dashboard-2/order/sub-product/25.png',
    product_id: '#844967',
    customer_name: 'Esther Howard',
    quantity: 1,
    total_price: '9,943',
    order_date: '21 Feb,2024',
    status: 'In Progress',
    status_color: 'warning',
    category: 'bag'
  },
  {
    id: 3,
    product_name: 'Lamp',
    product_image: 'assets/images/dashboard-2/order/sub-product/26.png',
    product_id: '#321489',
    customer_name: 'Brooklyn Simmons',
    quantity: 1,
    total_price: '8,195',
    order_date: '09 Mar,2024',
    status: 'Pending',
    status_color: 'info',
    category: 'bag'
  },
  {
    id: 4,
    product_name: 'Watch',
    product_image: 'assets/images/dashboard-2/order/sub-product/24.png',
    product_id: '#954687',
    customer_name: 'Dianne Russell',
    quantity: 3,
    total_price: '1,706',
    order_date: '14 Apr,2024',
    status: 'Canceled',
    status_color: 'danger',
    category: 'bag'
  },
  {
    id: 5,
    product_name: 'Football',
    product_image: 'assets/images/dashboard-2/order/sub-product/6.png',
    product_id: '#896748',
    customer_name: 'Darrell Steward',
    quantity: 2,
    total_price: '7,580',
    order_date: '14 Apr,2024',
    status: 'Canceled',
    status_color: 'danger',
    category: 'bag'
  },
  {
    id: 6,
    product_name: 'T-shirt',
    product_image: 'assets/images/dashboard-2/order/sub-product/10.png',
    product_id: '#321489',
    customer_name: 'Kristin Watson',
    quantity: 1,
    total_price: '8,195',
    order_date: '09 Mar,2024',
    status: 'Pending',
    status_color: 'info',
    category: 'bag'
  },
  {
    id: 7,
    product_name: 'Sleeper',
    product_image: 'assets/images/dashboard-2/order/sub-product/11.png',
    product_id: '#452140',
    customer_name: 'Courtney Henry',
    quantity: 2,
    total_price: '2,854',
    order_date: '16 Jan,2024',
    status: 'Delivered',
    status_color: 'success',
    category: 'bag'
  },
  {
    id: 8,
    product_name: 'Shoes',
    product_image: 'assets/images/dashboard-2/order/sub-product/14.png',
    product_id: '#844967',
    customer_name: 'Leslie Alexander',
    quantity: 1,
    total_price: '9,943',
    order_date: '21 Feb,2024',
    status: 'In Progress',
    status_color: 'warning',
    category: 'bag'
  }
]

export const salesReportChart: any = {
  series: [
    {
      name: "Refunds",
      type: "column",
      data: [25, 18, 15, 32, 16, 22, 18, 24, 15, 22, 19, 24],
    },
    {
      name: "Earnings",
      type: "line",
      data: [50, 66, 22, 40, 50, 79, 53, 66, 42, 19, 42, 63],
    },
    {
      name: "Orders",
      type: "line",
      data: [48, 33, 38, 32, 42, 33, 50, 22, 33, 48, 24, 35],
    },
  ],
  chart: {
    height: 315,
    type: "line",
    stacked: false,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: [2],
      top: 10,
      left: 0,
      blur: 4,
      color: primaryColor,
      opacity: 0.2,
    },
  },
  stroke: {
    width: [0, 2, 3],
    curve: "smooth",
    dashArray: [0, 8, 0],
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
    },
  },
  colors: ["var(--chart-progress-light)", "#ffb829", primaryColor],
  fill: {
    type: "solid",
    gradient: {
      shade: "dark",
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  grid: {
    borderColor: "var(--chart-border)",
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    show: false,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        fontFamily: "Rubik, sans-serif",
        colors: ["#52526c"],
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 80,
    tickAmount: 8,
  },
  responsive: [
    {
      breakpoint: 1870,
      options: {
        chart: {
          height: 320,
        },
      },
    },
    {
      breakpoint: 486,
      options: {
        xaxis: {
          tickAmount: 4,
        },
      },
    },
  ],
  chartMarker: [
    {
      title: 'Orders',
      color: 'primary'
    },
    {
      title: 'Earnings',
      color: 'warning'
    },
    {
      title: 'Refunds',
      color: 'secondary'
    }
  ]
}

export const manageAppointments: ManageAppointments[] = [
  {
    id: 1,
    appointment_title: 'Participating Meeting',
    appointment_time: '12:30',
    appointment_description: 'There are many variations of passages available',
    schedule_time: '2:00 PM - 4:30 PM',
    color: 'primary'
  },
  {
    id: 2,
    appointment_title: 'Customer Support issues',
    appointment_time: '11:30',
    color: 'warning'
  },
  {
    id: 3,
    appointment_title: 'Read the report',
    appointment_time: '10:25',
    color: 'dark'
  },
  {
    id: 4,
    appointment_title: 'Development issue #26',
    appointment_time: '09:00',
    color: 'success'
  }
]
