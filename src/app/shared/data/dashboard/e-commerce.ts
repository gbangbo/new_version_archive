import { Details } from '../../interface/dashboard/default';
import {
  BestSeller,
  Categories,
  RecentActivity,
  RecentOrders,
  RecentTransactions,
  StockReport,
  TopCategories,
  TopCustomers,
  TrendingProducts,
} from '../../interface/dashboard/e-commerce';

export const details: Details[] = [
  {
    title: 'New Orders',
    count: '2,435',
    margin: '50%',
    margin_type: 'profit',
    icon: 'new-order',
    color: 'primary',
  },
  {
    title: 'New Customers',
    count: '2,908',
    margin: '20%',
    margin_type: 'profit',
    icon: 'customers',
    color: 'warning',
  },
  {
    title: 'Average Sale',
    count: '$389k',
    margin: '10%',
    margin_type: 'loss',
    icon: 'sale',
    color: 'secondary',
  },
  {
    title: 'Gross Profit',
    count: '$3,908',
    margin: '80%',
    margin_type: 'profit',
    icon: 'profit',
    color: 'success',
  },
];

export const topCustomers: TopCustomers[] = [
  {
    id: 1,
    customer_name: 'Jane Cooper',
    customer_profile: 'assets/images/dashboard/user/1.jpg',
    customer_email: 'jane@gmail.com',
  },
  {
    id: 2,
    customer_name: 'Cameron Willia',
    customer_profile: 'assets/images/dashboard/user/2.jpg',
    customer_email: 'cameron@gmail.com',
  },
  {
    id: 3,
    customer_name: 'Floyd Miles',
    customer_profile: 'assets/images/dashboard/user/9.jpg',
    customer_email: 'floyd@gmail.com',
  },
  {
    id: 4,
    customer_name: 'Dianne Russell',
    customer_profile: 'assets/images/dashboard/user/5.jpg',
    customer_email: 'dianne@gmail.com',
  },
  {
    id: 5,
    customer_name: 'Guy Hawkins',
    customer_profile: 'assets/images/dashboard/user/3.jpg',
    customer_email: 'guy@gmail.com',
  },
];

export const monthOrderChart: any = {
  series: [
    {
      name: 'Sales',
      data: [23, 23, 20, 20, 32, 32, 40, 32, 32, 25, 30, 30],
    },
    {
      name: 'sales',
      data: [22, 22, 19, 19, 31, 31, 39, 31, 31, 24, 29, 29],
    },
    {
      name: 'sales',
      data: [21, 21, 18, 18, 30, 30, 38, 30, 30, 23, 28, 28],
    },
    {
      name: 'sales',
      data: [20, 20, 17, 17, 29, 29, 37, 29, 29, 22, 27, 27],
    },
    {
      name: 'sales',
      data: [19, 19, 16, 16, 28, 28, 36, 28, 28, 21, 26, 26],
    },
    {
      name: 'sales',
      data: [18, 18, 15, 15, 27, 27, 35, 27, 27, 20, 25, 25],
    },
    {
      name: 'sales',
      data: [17, 17, 14, 14, 26, 26, 34, 26, 26, 19, 24, 24],
    },
    {
      name: 'sales',
      data: [16, 16, 13, 13, 25, 25, 33, 25, 25, 18, 23, 23],
    },
    {
      name: 'sales',
      data: [16, 16, 13, 13, 25, 25, 33, 25, 25, 18, 23, 23],
    },
    {
      name: 'sales',
      data: [15, 15, 12, 12, 24, 24, 32, 24, 24, 17, 22, 22],
    },
    {
      name: 'sales',
      data: [14, 14, 11, 11, 23, 23, 31, 23, 23, 16, 21, 21],
    },
    {
      name: 'sales',
      data: [13, 13, 10, 10, 22, 22, 30, 22, 22, 15, 20, 20],
    },
  ],
  chart: {
    height: 235,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  colors: [
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
    '#7064F5',
  ],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 1,
      gradientToColors: [
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
        '#FF8BA7',
      ],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 0,
          color: '#e183b7',
          opacity: 1,
        },
        {
          offset: 20,
          color: '#ff8ba7',
          opacity: 1,
        },
        {
          offset: 30,
          color: '#b377d0',
          opacity: 1,
        },
        {
          offset: 65,
          color: '#7064f5',
          opacity: 1,
        },
        {
          offset: 70,
          color: '#b778cf',
          opacity: 1,
        },
        {
          offset: 80,
          color: '#eb86b2',
          opacity: 1,
        },
        {
          offset: 100,
          color: '#a873d7',
          opacity: 1,
        },
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  grid: {
    borderColor: '#e7e7e7',
    position: 'back',
    yaxis: {
      lines: {
        show: false,
      },
    },
    column: {
      colors: ['transparent', 'var(--light-background)'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [
      '01',
      '03',
      '05',
      '07',
      '09',
      '10',
      '11',
      '12',
      '15',
      '16',
      '18',
    ],
    tickAmount: 6,
    tickPlacement: 'on',
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    min: 5,
    max: 40,
    axisBorder: {
      show: true,
      color: 'var(--chart-border)',
      offsetX: 12,
      offsetY: 5,
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    shared: false,
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 210,
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 240,
        },
      },
    },
    {
      breakpoint: 628,
      options: {
        chart: {
          height: 210,
        },
      },
    },
  ],
  monthOrder: 12000,
  totalOrderGoal: 15080,
};

export const monthlyProfitsChart: any = {
  labels: ["Shoes", "Grocery", "other"],
  series: [30, 55, 35],
  chart: {
    type: "donut",
    height: 275,
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
    fontSize: "14px",
    fontFamily: "Rubik, sans-serif",
    fontWeight: 500,
    labels: {
      colors: "var(--chart-text-color)",
    },
    markers: {
      width: 6,
      height: 6,
    },
    itemMargin: {
      horizontal: 7,
      vertical: 0,
    },
  },
  stroke: {
    width: 10,
    colors: ["var(--light2)"],
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "83%",
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
            label: "$ 34,098",
            formatter: () => "Total Profit",
          },
        },
      },
    },
  },
  states: {
    normal: {
      filter: {
        type: "none",
      },
    },
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: "none",
      },
    },
  },
  colors: ["#54BA4A", "var(--theme-default)", "#FFA941"],
  responsive: [
    {
      breakpoint: 1425,
      options: {
        chart: {
          height: 270,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 320,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
};

export const recentTransactions: RecentTransactions[] = [
  {
    id: 1,
    transaction_id: '#369451',
    date: '13 Aug 2024',
    customer_name: 'Jenny Wilson',
    product_name: 'Long Dress',
    quantity: 212,
    payments: 'Bank Transfer',
    total: 12.32,
  },
  {
    id: 2,
    transaction_id: '#541285',
    date: '20 Feb 2024',
    customer_name: 'Wade Warren',
    product_name: 'Samsung TV',
    quantity: 512,
    payments: 'PayPal',
    total: 52.0,
  },
  {
    id: 3,
    transaction_id: '#545710',
    date: '10 Sep 2024',
    customer_name: 'Cody Fisher',
    product_name: 'Comfort Sofa',
    quantity: 500,
    payments: 'Credit Card',
    total: 15.35,
  },
  {
    id: 4,
    transaction_id: '#558964',
    date: '02 Jun 2024',
    customer_name: 'Albert Flores',
    product_name: 'Spring Bed',
    quantity: 620,
    payments: 'Gpay',
    total: 82.0,
  },
  {
    id: 5,
    transaction_id: '#562100',
    date: '20 Sep 2024',
    customer_name: 'Cody Fisher',
    product_name: 'Comfort Sofa',
    quantity: 208,
    payments: 'Credit Card',
    total: 45.87,
  },
  {
    id: 6,
    transaction_id: '#968357',
    date: '16 Feb 2024',
    customer_name: 'Esther Howard',
    product_name: 'Samsung TV',
    quantity: 754,
    payments: 'PayPal',
    total: 44.0,
  },
];

export const websiteTrafficChart: any = {
  series: [
    {
      name: 'Active',
      data: [18, 10, 65, 18, 28, 10],
    },
    {
      name: 'Bounce',
      data: [25, 50, 30, 30, 25, 45],
    },
  ],
  chart: {
    type: 'bar',
    height: 270,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 6,
    colors: ['transparent'],
  },
  grid: {
    show: true,
    borderColor: 'var(--chart-border)',
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  colors: ['#FFA941', 'var(--theme-default)'],
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    tickAmount: 4,
    tickPlacement: 'between',
    labels: {
      style: {
        fontFamily: 'Rubik, sans-serif',
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
    max: 100,
    tickAmount: 5,
    tickPlacement: 'between',
    labels: {
      style: {
        fontFamily: 'Rubik, sans-serif',
      },
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Rubik, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    labels: {
      colors: 'var(--chart-text-color)',
    },
    markers: {
      size: 3,
      shape: 'circle',
      strokeWidth: 0,
    },
    itemMargin: {
      horizontal: 10,
    },
  },
  responsive: [
    {
      breakpoint: 1639,
      options: {
        chart: {
          height: 255,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 240,
        },
        xaxis: {
          tickAmount: 3,
          tickPlacement: 'between',
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '80%',
          },
        },
      },
    },
    {
      breakpoint: 1007,
      options: {
        chart: {
          height: 195,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '70%',
          },
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '30%',
          },
        },
        xaxis: {
          tickAmount: 6,
        },
      },
    },
    {
      breakpoint: 576,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '60%',
          },
        },
        grid: {
          padding: {
            right: 5,
          },
        },
      },
    },
  ],
};

export const categories: Categories[] = [
  {
    id: 1,
    title: 'Furniture',
    image: 'assets/images/dashboard-2/order/1.png',
    value: 'furniture',
  },
  {
    id: 2,
    title: 'Sports',
    image: 'assets/images/dashboard-2/order/2.png',
    value: 'sports',
  },
  {
    id: 3,
    title: 'Electronics',
    image: 'assets/images/dashboard-2/order/3.png',
    value: 'electronics',
  },
  {
    id: 4,
    title: 'Jewelry',
    image: 'assets/images/dashboard-2/order/4.png',
    value: 'jewelry',
  },
  {
    id: 5,
    title: 'Clothing',
    image: 'assets/images/dashboard-2/order/5.png',
    value: 'clothing',
  },
  {
    id: 6,
    title: 'Shoes',
    image: 'assets/images/dashboard-2/order/7.png',
    value: 'shoes',
  },
];

export const recentOrders: RecentOrders[] = [
  {
    id: 1,
    title: 'Office chair',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/4.png',
    quantity: 'X1',
    price: 56,
    total_price: 100,
    category: 'furniture',
  },
  {
    id: 2,
    title: 'Wooden table',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/3.png',
    quantity: 'X2',
    price: 156,
    total_price: 870,
    category: 'furniture',
  },
  {
    id: 3,
    title: 'Rugby ball',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/5.png',
    quantity: 'X1',
    price: 56,
    total_price: 390,
    category: 'sports',
  },
  {
    id: 4,
    title: 'Soccer ball',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/6.png',
    quantity: 'X2',
    price: 100,
    total_price: 870,
    category: 'sports',
  },
  {
    id: 5,
    title: 'Office clock',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/1.png',
    quantity: 'X1',
    price: 56,
    total_price: 100,
    category: 'electronics',
  },
  {
    id: 6,
    title: 'Coffee maker',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/2.png',
    quantity: 'X2',
    price: 156,
    total_price: 100,
    category: 'electronics',
  },
  {
    id: 7,
    title: 'Thyst earring',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/7.png',
    quantity: 'X1',
    price: 48,
    total_price: 50,
    category: 'jewelry',
  },
  {
    id: 8,
    title: 'Necklace',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/8.png',
    quantity: 'X2',
    price: 73,
    total_price: 75,
    category: 'jewelry',
  },
  {
    id: 9,
    title: 'Woman short',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/9.png',
    quantity: 'X1',
    price: 20,
    total_price: 25,
    category: 'clothing',
  },
  {
    id: 10,
    title: 'Summer t-shirt',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/10.png',
    quantity: 'X2',
    price: 70,
    total_price: 88,
    category: 'clothing',
  },
  {
    id: 11,
    title: 'Leather sandals',
    product_id: 'CFDE-2163',
    image: 'assets/images/dashboard-2/order/sub-product/11.png',
    quantity: 'X1',
    price: 20,
    total_price: 25,
    category: 'shoes',
  },
  {
    id: 12,
    title: 'Blue sneakers',
    product_id: 'CFDE-2780',
    image: 'assets/images/dashboard-2/order/sub-product/12.png',
    quantity: 'X2',
    price: 70,
    total_price: 88,
    category: 'shoes',
  },
];

export const topCategories: TopCategories[] = [
  {
    id: 1,
    category_name: 'Food & Drinks',
    image: 'assets/images/dashboard-2/category/1.png',
    total_items: 12200,
  },
  {
    id: 2,
    category_name: 'Furniture',
    image: 'assets/images/dashboard-2/category/2.png',
    total_items: 7510,
  },
  {
    id: 3,
    category_name: 'Grocery',
    image: 'assets/images/dashboard-2/category/3.png',
    total_items: 15475,
  },
  {
    id: 4,
    category_name: 'Electronics',
    image: 'assets/images/dashboard-2/category/4.png',
    total_items: 27840,
  },
  {
    id: 5,
    category_name: 'Toys & Games',
    image: 'assets/images/dashboard-2/category/5.png',
    total_items: 8788,
  },
  {
    id: 6,
    category_name: 'Desktop',
    image: 'assets/images/dashboard-2/category/6.png',
    total_items: 10673,
  },
  {
    id: 7,
    category_name: 'Mobile & Accessories',
    image: 'assets/images/dashboard-2/category/7.png',
    total_items: 5129,
  },
];

export const recentActivity: RecentActivity[] = [
  {
    id: 1,
    title: 'Added New Items',
    description: 'Its arms extended outward to reveal a padded, angled arm',
    date: '8th March, 2024',
    images: [
      {
        image_url: 'assets/images/dashboard-2/product/1.png',
      },
      {
        image_url: 'assets/images/dashboard-2/product/2.png',
      },
      {
        image_url: 'assets/images/dashboard-2/product/3.png',
      },
    ],
    color: 'primary',
  },
  {
    id: 2,
    title: 'Ankita Comments this Products',
    description:
      'It looks amazing in my room, arrived swiftly, and was simple to build',
    date: '2nd Sep, Today',
    color: 'warning',
  },
  {
    id: 2,
    title: 'Jack Purchase',
    description:"It's the centre of attention in my room, and people always comment on it.",
    date: '3nd Sep, 2024',
    color: 'secondary',
  },
  {
    id: 4,
    title: 'Jerry Comments this Products',
    description: 'This couch was a recent buy, and I adore it!',
    date: '2nd Sep, Today',
    color: 'success',
  },
];

export const orderOverviewChart: any = {
  series: [
    {
      name: 'Earning',
      type: 'area',
      data: [44, 55, 35, 50, 67, 50, 55, 45, 32, 38, 45],
    },
    {
      name: 'Order',
      type: 'area',
      data: [35, 30, 23, 40, 50, 35, 40, 52, 67, 50, 55],
    },
    {
      name: 'Refunds',
      type: 'area',
      data: [25, 20, 15, 25, 32, 20, 30, 35, 23, 30, 20],
    },
  ],
  chart: {
    height: 340,
    type: 'line',
    stacked: false,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 2,
      left: 0,
      blur: 4,
      color: '#000',
      opacity: 0.08,
    },
  },
  stroke: {
    width: [2, 2, 2],
    curve: 'smooth',
  },
  grid: {
    show: true,
    borderColor: 'var(--chart-border)',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  colors: ['#7064F5', '#54BA4A', '#FF3364'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
  ],
  markers: {
    discrete: [
      {
        seriesIndex: 0,
        dataPointIndex: 2,
        fillColor: '#7064F5',
        strokeColor: 'var(--white)',
        size: 5,
        sizeOffset: 3,
      },
      {
        seriesIndex: 1,
        dataPointIndex: 2,
        fillColor: '#54BA4A',
        strokeColor: 'var(--white)',
        size: 5,
      },
      {
        seriesIndex: 2,
        dataPointIndex: 2,
        fillColor: '#FF3364',
        strokeColor: 'var(--white)',
        size: 5,
      },
      {
        seriesIndex: 0,
        dataPointIndex: 5,
        fillColor: '#7064F5',
        strokeColor: 'var(--white)',
        size: 5,
        sizeOffset: 3,
      },
      {
        seriesIndex: 1,
        dataPointIndex: 5,
        fillColor: '#54BA4A',
        strokeColor: 'var(--white)',
        size: 5,
      },
      {
        seriesIndex: 2,
        dataPointIndex: 5,
        fillColor: '#FF3364',
        strokeColor: 'var(--white)',
        size: 5,
      },
      {
        seriesIndex: 0,
        dataPointIndex: 9,
        fillColor: '#7064F5',
        strokeColor: 'var(--white)',
        size: 5,
        sizeOffset: 3,
      },
      {
        seriesIndex: 1,
        dataPointIndex: 9,
        fillColor: '#54BA4A',
        strokeColor: 'var(--white)',
        size: 5,
      },
      {
        seriesIndex: 2,
        dataPointIndex: 9,
        fillColor: '#FF3364',
        strokeColor: 'var(--white)',
        size: 5,
      },
    ],
    hover: {
      size: 5,
      sizeOffset: 0,
    },
  },
  xaxis: {
    type: 'category',
    tickAmount: 11,
    tickPlacement: 'on',
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      color: 'var(--chart-border)',
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    min: 0,
    max: 67,
    tickAmount: 6,
    tickPlacement: 'between',
  },
  tooltip: {
    shared: false,
    intersect: false,
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 325,
        },
      },
    },
    {
      breakpoint: 1317,
      options: {
        chart: {
          height: 295,
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
      breakpoint: 1142,
      options: {
        chart: {
          height: 260,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 292,
        },
        xaxis: {
          type: 'category',
          tickAmount: 5,
          tickPlacement: 'on',
        },
      },
    },
    {
      breakpoint: 851,
      options: {
        chart: {
          height: 260,
        },
      },
    },
    {
      breakpoint: 343,
      options: {
        xaxis: {
          type: 'category',
          tickAmount: 3,
          tickPlacement: 'on',
        },
      },
    },
  ],
};

export const orderOverviewBarChart: any = {
  series: [
    {
      name: 'Revenue',
      data: [
        30, 40, 18, 25, 18, 10, 20, 35, 22, 40, 30, 38, 20, 35, 11, 28, 40, 11,
        28, 40, 11, 28, 40, 11, 28, 40, 11,
      ],
    },
  ],
  chart: {
    type: 'bar',
    height: 180,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    },
  },
  colors: ['var(--light-bg)'],
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
  fill: {
    opacity: 0.7,
  },
  tooltip: {
    enabled: false,
  },
  states: {
    normal: {
      filter: {
        type: 'none',
      },
    },
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
      },
    },
  },
  chartLabelsDetails: [
    {
      id: 1,
      label: 'Refunds',
      color: 'secondary',
    },
    {
      id: 2,
      label: 'Earning',
      color: 'primary',
    },
    {
      id: 3,
      label: 'Order',
      color: 'success',
    },
  ],
  orderDetails: [
    {
      id: 1,
      title: 'Orders',
      value: '10,098',
      icon: 'orders',
    },
    {
      id: 2,
      title: 'Earning',
      value: '$12,678',
      icon: 'expense',
    },
    {
      id: 3,
      title: 'Refunds',
      value: '3,001',
      icon: 'doller-return',
    },
  ],
};

export const stockReport: StockReport[] = [
  {
    id: 1,
    product_name: 'Bags',
    product_image: 'assets/images/dashboard-2/order/sub-product/16.png',
    product_id: '#357896	',
    quantity: 45,
    price: 1256,
    status: 'In Stock',
    color: 'success',
  },
  {
    id: 2,
    product_name: 'Chair',
    product_image: 'assets/images/dashboard-2/order/sub-product/25.png',
    product_id: '#698789	',
    quantity: 10,
    price: 1200,
    status: 'In Stock',
    color: 'success',
  },
  {
    id: 3,
    product_name: 'Couch',
    product_image: 'assets/images/dashboard-2/order/sub-product/15.png',
    product_id: '#245987	',
    quantity: 95,
    price: 3061,
    status: 'In Stock',
    color: 'success',
  },
  {
    id: 4,
    product_name: 'Lamp',
    product_image: 'assets/images/dashboard-2/order/sub-product/15.png',
    product_id: '#120447	',
    quantity: 0,
    price: 1200,
    status: 'Out Of Stock',
    color: 'danger',
  },
  {
    id: 5,
    product_name: 'Shoes',
    product_image: 'assets/images/dashboard-2/order/sub-product/14.png',
    product_id: '#854129	',
    quantity: 0,
    price: 513,
    status: 'Out Of Stock',
    color: 'danger',
  },
  {
    id: 6,
    product_name: 'Watch',
    product_image: 'assets/images/dashboard-2/order/sub-product/24.png',
    product_id: '#589456	',
    quantity: 0,
    price: 120,
    status: 'Out Of Stock',
    color: 'danger',
  },
];

export const bestSeller: BestSeller[] = [
  {
    id: 1,
    seller_name: 'Wade Warren',
    seller_profile: 'assets/images/dashboard/user/3.jpg',
    company_name: 'Nexus',
    category: 'Electronics',
    earning: 32547,
  },
  {
    id: 2,
    seller_name: 'Jenny Wilson',
    seller_profile: 'assets/images/user/10.jpg',
    company_name: 'Blaze',
    category: 'Clothing',
    earning: 84206,
  },
  {
    id: 3,
    seller_name: 'Guy Hawkins',
    seller_profile: 'assets/images/user/14.png',
    company_name: 'SkyEdge',
    category: 'Beauty',
    earning: 21059,
  },
  {
    id: 4,
    seller_name: 'Jacob Jones',
    seller_profile: 'assets/images/dashboard/user/6.jpg',
    company_name: 'Corp',
    category: 'Grocery',
    earning: 23180,
  },
  {
    id: 5,
    seller_name: 'Eleanor Pena',
    seller_profile: 'assets/images/user/3.jpg',
    company_name: 'Zenith',
    category: 'Sports',
    earning: 45278,
  },
  {
    id: 6,
    seller_name: 'Marvin Lisa',
    seller_profile: 'assets/images/user/6.jpg',
    company_name: 'Sparksy',
    category: 'Electronics',
    earning: 78541,
  },
  {
    id: 7,
    seller_name: 'Albert Flores',
    seller_profile: 'assets/images/user/12.png',
    company_name: 'Nexus',
    category: 'Sports',
    earning: 23416,
  },
  {
    id: 8,
    seller_name: 'Cody Fisher',
    seller_profile: 'assets/images/user/3.jpg',
    company_name: 'Spark',
    category: 'Clothing',
    earning: 84206,
  },
];

export const earnings = [
  {
    id: 1,
    title: 'PayPal',
    logo: 'earning1',
    value: 420,
    color: 'primary',
    earning_type: 'profit',
  },
  {
    id: 2,
    title: 'Credit Card',
    logo: 'earning2',
    value: 250,
    color: 'secondary',
    earning_type: 'loss',
  },
  {
    id: 3,
    title: 'Amazon Pay',
    logo: 'earning3',
    value: 603,
    color: 'success',
    earning_type: 'profit',
  },
  {
    id: 4,
    title: 'Cashback',
    logo: 'earning4',
    value: 603,
    color: 'info',
    earning_type: 'profit',
  },
  {
    id: 5,
    title: 'PayPal',
    logo: 'earning1',
    value: 250,
    color: 'warning',
    earning_type: 'loss',
  },
  {
    id: 6,
    title: 'Credit Card',
    logo: 'earning2',
    value: 485,
    color: 'danger',
    earning_type: 'profit',
  },
];

export const trendingProducts: TrendingProducts[] = [
  {
    id: 1,
    product_name: 'Air Max1',
    product_image: 'assets/images/dashboard-2/order/sub-product/19.png',
    category: 'Footwear',
    sold_item: 4540,
  },
  {
    id: 2,
    product_name: 'Airpods Pro',
    product_image: 'assets/images/dashboard-2/order/sub-product/27.png',
    category: 'Electronics',
    sold_item: 1256,
  },
  {
    id: 3,
    product_name: 'Camera Stand',
    product_image: 'assets/images/dashboard-2/order/sub-product/23.png',
    category: 'Accessories',
    sold_item: 1587,
  },
  {
    id: 4,
    product_name: 'E2 Watch',
    product_image: 'assets/images/dashboard-2/order/sub-product/18.png',
    category: 'Electronics',
    sold_item: 3851,
  },
  {
    id: 5,
    product_name: 'Indoor Plants',
    product_image: 'assets/images/dashboard-2/order/sub-product/21.png',
    category: 'Decors',
    sold_item: 4254,
  },
  {
    id: 6,
    product_name: 'iPhone 15P',
    product_image: 'assets/images/dashboard-2/order/sub-product/17.png',
    category: 'Electronics',
    sold_item: 1500,
  },
  {
    id: 7,
    product_name: 'Pink Coat',
    product_image: 'assets/images/dashboard-2/order/sub-product/20.png',
    category: 'Clothing',
    sold_item: 6780,
  },
  {
    id: 8,
    product_name: 'Sunglass',
    product_image: 'assets/images/dashboard-2/order/sub-product/22.png',
    category: 'Accessories',
    sold_item: 3452,
  },
];

export const Products = [
  {
    name: 'Bajaj Grinder Jar',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 194.48,
    orders: 99,
    stock: 400,
    total_amount: 19253.52,
  },
  {
    name: 'Golden Headphone',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 777.69,
    orders: 20,
    stock: 140,
    total_amount: 15553.8,
  },
  {
    name: 'Study Lamp',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 100.1,
    orders: 1,
    stock: 10,
    total_amount: 100.1,
  },
  {
    name: 'Wool Washing Machine',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 554.99,
    orders: 2,
    stock: 28,
    total_amount: 1109.98,
  },
  {
    name: 'Projector',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 597.05,
    orders: 1,
    stock: 50,
    total_amount: 597.05,
  },
  {
    name: 'M185 Compact Wireless Mouse',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 22.0,
    orders: 2,
    stock: 100,
    total_amount: 44.0,
  },
  {
    name: 'DVD',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 485.45,
    orders: 1,
    stock: 100,
    total_amount: 485.45,
  },
  {
    name: 'Speakers',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 245.45,
    orders: 1,
    stock: 50,
    total_amount: 245.45,
  },
  {
    name: 'Smart Watch',
    image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 478.48,
    orders: 1,
    stock: 120,
    total_amount: 478.48,
  },
  {
    name: 'Arm Chair',
    image: 'assets/images/product/accessories/01.png',
    category: 'Furniture',
    price: 1000.0,
    orders: 25,
    stock: 125,
    total_amount: 25000.0,
  },
  {
    name: 'Apple Desktop 2024',
    image: 'assets/images/product/accessories/01.png',
    category: 'Laptops',
    price: 587.25,
    orders: 35,
    stock: 50,
    total_amount: 29362.5,
  },
  {
    name: 'Beauty Blender',
    image: 'assets/images/product/accessories/01.png',
    category: 'Make-up',
    price: 999.0,
    orders: 10,
    stock: 25,
    total_amount: 4995.0,
  },
];

export const RecentOrder = [
  {
    order_number: '#100147',
    date: '25 Sep, 2024',
    customer: 'Neil Wells',
    amount: 78.56,
    payment: 'Completed',
    action: 'View',
  },
  {
    order_number: '#100148',
    date: '10 Apr, 2024',
    customer: 'Elliana Beltran',
    amount: 100.24,
    payment: 'Completed',
    action: 'View',
  },
  {
    order_number: '#100347',
    date: '09 Mar, 2024',
    customer: 'Eliezer Zuniga',
    amount: 147.59,
    payment: 'Shipped',
    action: 'View',
  },
  {
    order_number: '#100478',
    date: '02 Feb, 2024',
    customer: 'Cecilia Hart',
    amount: 478.21,
    payment: 'Pending',
    action: 'View',
  },
  {
    order_number: '#100589',
    date: '24 Jan, 2024',
    customer: 'Lorenzo Wright',
    amount: 258.25,
    payment: 'Completed',
    action: 'View',
  },
  {
    order_number: '#100589',
    date: '24 Jan, 2024',
    customer: 'Blake Hogan',
    amount: 140.45,
    payment: 'Shipped',
    action: 'View',
  },
  {
    order_number: '#100687',
    date: '03 Nov, 2024',
    customer: 'Finn Tapia',
    amount: 78.41,
    payment: 'Completed',
    action: 'View',
  },
  {
    order_number: '#100980',
    date: '10 Dec, 2024',
    customer: 'Grady Ochoa',
    amount: 147.45,
    payment: 'Pending',
    action: 'View',
  },
  {
    order_number: '#107748',
    date: '20 Oct, 2024',
    customer: 'Jesus Andrews',
    amount: 478.58,
    payment: 'Shipped',
    action: 'View',
  },
  {
    order_number: '#148007',
    date: '26 Feb, 2024',
    customer: 'Malik Dorsey',
    amount: 140.25,
    payment: 'Pending',
    action: 'View',
  },
];
