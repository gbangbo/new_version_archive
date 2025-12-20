import { Tabs } from "../interface/common";
import { RecentOrders, SalesOverviewCharts, SellerDetails, Store, StoreGeneralDetails, TopSellingProduct } from "../interface/store";
import { productDetails } from "./product";

export const StoreCategories = [
  {
    id: 1,
    name: 'Furniture'
  },
  {
    id: 2,
    name: 'Professional Services'
  },
  {
    id: 3,
    name: 'Security'
  },
  {
    id: 4,
    name: 'Travel'
  },
  {
    id: 5,
    name: 'Healthcare'
  }
]

export const stores: Store[] = [
  {
    id: 1,
    store_name: "Gadget Grove",
    store_logo: 'assets/images/product/seller/1.png',
    vendor_name: "Sabrina Whitney",
    total_order: 567,
    total_product: 45,
    total_earning: 233,
    store_category_id: 1
  },
  {
    id: 2,
    store_name: "Health Haven",
    store_logo: 'assets/images/product/seller/2.png',
    vendor_name: "Michael Stone",
    total_order: 322,
    total_product: 30,
    total_earning: 450,
    store_category_id: 5
  },
  {
    id: 3,
    store_name: "Secure Shield",
    store_logo: 'assets/images/product/seller/3.png',
    vendor_name: "Emma Grey",
    total_order: 278,
    total_product: 25,
    total_earning: 389,
    store_category_id: 3
  },
  {
    id: 4,
    store_name: "Travel Treasures",
    store_logo: 'assets/images/product/seller/4.png',
    vendor_name: "Liam Brooks",
    total_order: 150,
    total_product: 12,
    total_earning: 200,
    store_category_id: 4
  },
  {
    id: 5,
    store_name: "Furniture Fiesta",
    store_logo: 'assets/images/product/seller/5.png',
    vendor_name: "Sophia Lee",
    total_order: 600,
    total_product: 80,
    total_earning: 700,
    store_category_id: 1
  },
  {
    id: 6,
    store_name: "Service Spot",
    store_logo: 'assets/images/product/seller/6.png',
    vendor_name: "Ethan Miller",
    total_order: 90,
    total_product: 20,
    total_earning: 120,
    store_category_id: 2
  },
  {
    id: 7,
    store_name: "Healthy Habits",
    store_logo: 'assets/images/product/seller/7.png',
    vendor_name: "Olivia Brown",
    total_order: 350,
    total_product: 40,
    total_earning: 500,
    store_category_id: 5
  },
  {
    id: 8,
    store_name: "Guardian Goods",
    store_logo: 'assets/images/product/seller/8.png',
    vendor_name: "James Wilson",
    total_order: 400,
    total_product: 60,
    total_earning: 520,
    store_category_id: 3
  },
  {
    id: 9,
    store_name: "Adventure Awaits",
    store_logo: 'assets/images/product/seller/9.png',
    vendor_name: "Charlotte Taylor",
    total_order: 250,
    total_product: 35,
    total_earning: 330,
    store_category_id: 4
  },
  {
    id: 10,
    store_name: "Furniture World",
    store_logo: 'assets/images/product/seller/10.png',
    vendor_name: "Henry Moore",
    total_order: 720,
    total_product: 90,
    total_earning: 880,
    store_category_id: 1
  },
  {
    id: 11,
    store_name: "EcoFurnishings",
    store_logo: 'assets/images/product/seller/11.png',
    vendor_name: "Nathaniel Price",
    total_order: 275,
    total_product: 30,
    total_earning: 430,
    store_category_id: 1
  },
  {
    id: 12,
    store_name: "Travel Explorers",
    store_logo: 'assets/images/product/seller/12.png',
    vendor_name: "Amelia Scott",
    total_order: 600,
    total_product: 80,
    total_earning: 1000,
    store_category_id: 4
  },
  {
    id: 13,
    store_name: "SecurePro Systems",
    store_logo: 'assets/images/product/seller/13.png',
    vendor_name: "Ethan Walker",
    total_order: 200,
    total_product: 25,
    total_earning: 350,
    store_category_id: 3
  },
  {
    id: 14,
    store_name: "Health Haven",
    store_logo: 'assets/images/product/seller/14.png',
    vendor_name: "Isabella Martinez",
    total_order: 450,
    total_product: 40,
    total_earning: 770,
    store_category_id: 5
  },
  {
    id: 15,
    store_name: "Service Masters",
    store_logo: 'assets/images/product/seller/15.png',
    vendor_name: "William Harris",
    total_order: 380,
    total_product: 45,
    total_earning: 690,
    store_category_id: 2
  }
];

export const storeGeneralDetails: StoreGeneralDetails[] = [
  {
    title: 'Total Revenue',
    value: '$5678000',
    icon: 'c-revenue',
    color: 'secondary'
  },
  {
    title: 'Total Orders',
    value: 890,
    icon: 'new-order',
    color: 'primary'
  },
  {
    title: 'Total Stores',
    value: 285,
    icon: 'stroke-board',
    color: 'warning',
    type: 'stroke'
  },
  {
    title: 'Total Users',
    value: 2000,
    icon: 'analytics-user',
    color: 'success'
  }
]

export const salesOverviewCharts: SalesOverviewCharts[] = [
  {
    id: 1,
    title: 'Earnings',
    value: 'earning',
    icon: 'fill-earning',
    color: 'warning',
    chart_details: {
      series: [
        {
          name: "Earnings",
          data: [600, 679, 850, 760, 870, 740, 910, 1025, 970, 800, 1040, 1199],
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: "#ffb829",
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
          colorStops: [],
        },
      },
      chart: {
        height: 230,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#ffb829",
          top: 8,
          left: 0,
          blur: 2,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#ffb829"],
      dataLabels: {
        enabled: true,
        formatter: function (val: string) {
          return "$" + val;
        },
      },
      textAnchor: "middle",
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        fontWeight: "bold",
        borderRadius: 2,
        colors: undefined,
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },
      tooltip: {
        x: {
          show: false,
        },
        z: {
          show: false,
        },
        y: {
          formatter: function (val: string) {
            return "$" + val;
          },
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        min: 500,
        max: 1200,
        tickAmount: 4,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            xaxis: {
              type: "category",
              tickAmount: 6,
              tickPlacement: "on",
            },
          },
        },
      ]
    }
  },
  {
    id: 2,
    title: 'Orders',
    value: 'orders',
    icon: 'fill-orders',
    color: 'success',
    chart_details: {
      series: [
        {
          name: "Orders",
          data: [30, 50, 105, 80, 120, 40, 90, 150, 60, 160, 170, 140],
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: "#65c15c",
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
          colorStops: [],
        },
      },
      chart: {
        height: 230,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#65c15c",
          top: 8,
          left: 0,
          blur: 2,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#65c15c"],
      dataLabels: {
        enabled: true,
      },
      textAnchor: "middle",
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        borderRadius: 2,
        colors: undefined,
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },
      tooltip: {
        x: {
          show: false,
        },
        z: {
          show: false,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 200,
        tickAmount: 4,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            xaxis: {
              type: "category",
              tickAmount: 6,
              tickPlacement: "on",
            },
          },
        },
      ]
    }
  },
  {
    id: 3,
    title: 'Products',
    value: 'products',
    icon: 'fill-product',
    color: 'primary',
    chart_details: {
      series: [
        {
          name: "Products",
          data: [130, 160, 140, 100, 140, 130, 189, 120, 156, 106, 112, 175],
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: "#7366FF",
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
          colorStops: [],
        },
      },
      chart: {
        height: 230,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#7366FF",
          top: 8,
          left: 0,
          blur: 2,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#7366FF"],
      dataLabels: {
        enabled: true,
      },
      textAnchor: "middle",
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        borderRadius: 2,
        colors: undefined,
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },
      tooltip: {
        x: {
          show: false,
        },
        z: {
          show: false,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 200,
        tickAmount: 4,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            xaxis: {
              type: "category",
              tickAmount: 6,
              tickPlacement: "on",
            },
          },
        },
      ]
    }
  }
]

export const topSellingProducts: TopSellingProduct[] = [
  {
    id: 1,
    product_name: 'Apple desktop 2024',
    product_image: 'assets/images/dashboard-8/product-categories/laptop.png', // Replace with actual image URL
    category: 'Laptops',
    price: 587.25,
    orders: 35,
    stock: 50,
    total_amount: 29362.5,
  },
  {
    id: 2,
    product_name: 'Arm Chair',
    product_image: 'assets/images/email-template/3.png',
    category: 'Furniture',
    price: 1000.00,
    orders: 25,
    stock: 125,
    total_amount: 25000.00,
  },
  {
    id: 3,
    product_name: 'Bajaj Grinder Jar',
    product_image: 'assets/images/product/accessories/01.png',
    category: 'Electric',
    price: 194.48,
    orders: 99,
    stock: 400,
    total_amount: 19253.52,
  },
  {
    id: 4,
    product_name: 'Beauty Blender',
    product_image: 'assets/images/product/accessories/03.png',
    category: 'Make-up',
    price: 999.00,
    orders: 10,
    stock: 25,
    total_amount: 4995.00,
  },
  {
    id: 5,
    product_name: 'DVD',
    product_image: 'assets/images/dashboard-8/product-categories/dvd.png',
    category: 'Electric',
    price: 485.45,
    orders: 1,
    stock: 100,
    total_amount: 485.45,
  },
  {
    id: 6,
    product_name: 'Golden Headphone',
    product_image: 'assets/images/product/accessories/02.png',
    category: 'Electric',
    price: 577.69,
    orders: 20,
    stock: 140,
    total_amount: 15553.80,
  },
  {
    id: 7,
    product_name: 'M185 compact wireless mouse',
    product_image: 'assets/images/dashboard-8/product-categories/mouse.png',
    category: 'Electric',
    price: 22.00,
    orders: 2,
    stock: 100,
    total_amount: 44.00,
  },
  {
    id: 8,
    product_name: 'Projector',
    product_image: 'assets/images/product/accessories/08.png',
    category: 'Electric',
    price: 597.05,
    orders: 1,
    stock: 50,
    total_amount: 597.05,
  },
  {
    id: 9,
    product_name: 'Smart watch',
    product_image: 'assets/images/dashboard-8/product-categories/watch.png',
    category: 'Electric',
    price: 478.48,
    orders: 1,
    stock: 120,
    total_amount: 476.48,
  },
  {
    id: 10,
    product_name: 'Speakers',
    product_image: 'assets/images/dashboard-8/product-categories/speaker.png',
    category: 'Electric',
    price: 245.45,
    orders: 1,
    stock: 50,
    total_amount: 245.45,
  },
  {
    id: 11,
    product_name: 'Study lamp',
    product_image: 'assets/images/product/accessories/06.png',
    category: 'Electric',
    price: 100.10,
    orders: 1,
    stock: 10,
    total_amount: 100.10,
  },
  {
    id: 12,
    product_name: 'Wool washing machine',
    product_image: 'assets/images/product/accessories/07.png',
    category: 'Electric',
    price: 554.99,
    orders: 2,
    stock: 28,
    total_amount: 1109.98,
  }
]

export const recentOrders: RecentOrders[] = [
  {
    id: 1,
    order_number: "#100147",
    date: "25 Sep, 2024",
    amount: 78.56,
    payment: "Completed",
    customer_name: "Neil Wells",
    customer_profile: "assets/images/dashboard-9/user/4.png",
  },
  {
    id: 2,
    order_number: "#100148",
    date: "10 Apr, 2024",
    amount: 100.24,
    payment: "Completed",
    customer_name: "Elliana Beltran",
    customer_profile: "assets/images/dashboard/user/1.jpg",
  },
  {
    id: 3,
    order_number: "#100347",
    date: "09 Mar, 2024",
    amount: 147.59,
    payment: "Shipped",
    customer_name: "Eliezer Zuniga",
    customer_profile: "assets/images/dashboard/user/13.jpg",
  },
  {
    id: 4,
    order_number: "#100478",
    date: "02 Feb, 2024",
    amount: 478.21,
    payment: "Pending",
    customer_name: "Cecilia Hart",
    customer_profile: "assets/images/dashboard/user/11.jpg",
  },
  {
    id: 5,
    order_number: "#100589",
    date: "24 Jan, 2024",
    amount: 258.25,
    payment: "Completed",
    customer_name: "Lorenzo Wright",
    customer_profile: "assets/images/dashboard/user/12.jpg",
  },
  {
    id: 6,
    order_number: "#100589",
    date: "24 Jan, 2024",
    amount: 140.45,
    payment: "Shipped",
    customer_name: "Blake Hogan",
    customer_profile: "assets/images/dashboard/user/7.jpg",
  },
  {
    id: 7,
    order_number: "#100687",
    date: "03 Nov, 2024",
    amount: 78.41,
    payment: "Completed",
    customer_name: "Finn Tapia",
    customer_profile: "assets/images/dashboard/user/3.jpg",
  },
  {
    id: 8,
    order_number: "#100980",
    date: "10 Dec, 2024",
    amount: 147.45,
    payment: "Pending",
    customer_name: "Grady Ochoa",
    customer_profile: "assets/images/dashboard-9/user/1.png",
  },
  {
    id: 9,
    order_number: "#107748",
    date: "20 Oct, 2024",
    amount: 478.58,
    payment: "Shipped",
    customer_name: "Jesus Andrews",
    customer_profile: "assets/images/dashboard-9/user/2.png",
  },
  {
    id: 10,
    order_number: "#148007",
    date: "26 Feb, 2024",
    amount: 140.25,
    payment: "Pending",
    customer_name: "Malik Dorsey",
    customer_profile: "assets/images/dashboard/user/4.jpg",
  }
]

export const sellerDetails: SellerDetails = {
  details: {
    logo: 'logo-1',
    store_name: "Gadget Grove",
    vendor_name: "Sabrina Whitney",
    location: 'Germany',
    phone: '+49 30901820',
    email: 'Crewwilcox@gmail.com',
    url: 'https://www.pixelstrap.com'
  },
  rating: {
    total_rating: 58,
    rating: 4.5,
    rating_count: [25, 15, 10, 5, 3]
  },
  notifications: {
    notification_list: [
      {
        id: 1,
        title: 'Receive notification for new orders.',
        checked: true
      },
      {
        id: 2,
        title: 'Receive notification for returns.',
      },
      {
        id: 3,
        title: 'Receive notification for customer reviews.',
      },
      {
        id: 4,
        title: 'Receive notification for product reviews.',
      }
    ],
    notification_platform: [
      {
        id: 1,
        name: 'Whatsapp',
        logo: 'fa-brands fa-whatsapp'
      },
      {
        id: 2,
        name: 'SMS',
        logo: 'fa-regular fa-comments'
      },
      {
        id: 3,
        name: 'E-Mail',
        logo: 'fa-regular fa-envelope'
      }
    ]
  },
  policies: [
    {
      title: 'Return and Refund Policy',
      policy_text: `<p>Within <strong>30 days </strong>of delivery, most new, unopened items can be <em>returned </em>for a complete refund.  There could be some exclusions. <a href="javascript:void(0)">Read more</a></p>`
    },
    {
      title: 'Shipping Policy',
      policy_text: '<p>The destination and customs processing can affect how long an international delivery takes. <a href="javascript:void(0)">Read more</a></p>'
    },
    {
      title: 'Contact & Support',
      policy_text: '<p>Please feel free to use our secure message system to contact us with any queries or concerns. <a href="javascript:void(0)">Read more</a></p>'
    }
  ],
  review: productDetails.review.reviews
}

export const sellerDetailsAccordion: Tabs[] = [
  {
    id: 1,
    title: 'Seller Details',
    value: 'details'
  },
  {
    id: 2,
    title: 'Seller Ratings',
    value: 'rating'
  },
  {
    id: 3,
    title: 'Notifications',
    value: 'notification'
  },
  {
    id: 4,
    title: 'Policies',
    value: 'policy'
  },
  {
    id: 5,
    title: 'Product Rating & Reviews',
    value: 'review'
  }
]