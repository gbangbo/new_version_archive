import { CustomerOrderReport, ProductReports, SalesReport, SalesReturnReport } from "../interface/reports";

export const productReports: ProductReports[] = [
    {
        id: 1,
        product_name: 'Apple Desktop 2024',
        product_image: 'assets/images/dashboard-8/product-categories/laptop.png',
        sku: '02145YK796',
        product_sold: 34,
        price: 56000.00,
        rating: 4,
        date: '2025-1-22',
    },
    {
        id: 2,
        product_name: 'Apple iPhone 14 pro',
        product_image: 'assets/images/dashboard-8/shop-categories/phone.png',
        sku: '56379FG3AW',
        product_sold: 10,
        price: 120000.00,
        rating: 5,
        date: '2023-11-21',
    },
    {
        id: 3,
        product_name: 'Arm Chair',
        product_image: 'assets/images/email-template/3.png',
        sku: '5633GD3K54',
        product_sold: 14,
        price: 1000.00,
        rating: 5,
        date: '2023-11-15',
    },
    {
        id: 4,
        product_name: 'Bajaj Grinder Jar',
        product_image: 'assets/images/product/accessories/01.png',
        sku: '56379FG3AW',
        product_sold: 14,
        price: 19000.00,
        rating: 4,
        date: '2023-10-25',
    },
    {
        id: 5,
        product_name: 'Comfortable Chair',
        product_image: 'assets/images/dashboard-2/order/sub-product/25.png',
        sku: '568GH3LLQ2',
        product_sold: 120,
        price: 78000.00,
        rating: 5,
        date: '2025-1-22',
    },
    {
        id: 6,
        product_name: 'Comfortable Sofa',
        product_image: 'assets/images/dashboard-2/order/sub-product/15.png',
        sku: '456DF78DFO',
        product_sold: 25,
        price: 99000.00,
        rating: 3,
        date: '2023-11-10',
    },
    {
        id: 7,
        product_name: 'DVD',
        product_image: 'assets/images/dashboard-8/product-categories/dvd.png',
        sku: 'HG5667DFQ1',
        product_sold: 155,
        price: 5600.00,
        rating: 5,
        date: '2025-1-22',
    },
    {
        id: 8,
        product_name: 'Golden Headphone',
        product_image: 'assets/images/product/accessories/02.png',
        sku: '33KR568981',
        product_sold: 45,
        price: 18000.00,
        rating: 5,
        date: '2023-11-01',
    },
    {
        id: 9,
        product_name: 'Green Wireless Mouse',
        product_image: 'assets/images/dashboard-8/shop-categories/mouse.png',
        sku: 'AD6789HEYO',
        product_sold: 95,
        price: 15000.00,
        rating: 4,
        date: '2023-11-18',
    },
    {
        id: 10,
        product_name: 'Headphones',
        product_image: 'assets/images/dashboard-8/product-categories/headphone.png',
        sku: '33KR568981',
        product_sold: 78,
        price: 10000.00,
        rating: 3,
        date: '2023-11-10',
    },
    {
        id: 11,
        product_name: 'Leather Handbag',
        product_image: 'assets/images/dashboard-2/order/sub-product/16.png',
        sku: '456DF7BDER',
        product_sold: 100,
        price: 1100.00,
        rating: 4,
        date: '2025-1-22'
    },
    {
        id: 12,
        product_name: 'M185 Mouse',
        product_image: 'assets/images/dashboard-8/product-categories/mouse.png',
        sku: '02145YK796',
        product_sold: 13,
        price: 56000.00,
        rating: 3,
        date: '2023-11-21'
    },
    {
        id: 13,
        product_name: 'MacBook Air 13.3-inch',
        product_image: 'assets/images/dashboard-8/product-categories/ipad.png',
        sku: '56YKB8PPQ8',
        product_sold: 140,
        price: 45000.00,
        rating: 5,
        date: '2023-11-15'
    },
    {
        id: 14,
        product_name: 'Projector',
        product_image: 'assets/images/product/accessories/08.png',
        sku: 'AD6789HEYO',
        product_sold: 16,
        price: 15000.00,
        rating: 4,
        date: '2023-10-25'
    },
    {
        id: 15,
        product_name: 'Smart Camera',
        product_image: 'assets/images/dashboard-8/shop-categories/camera.png',
        sku: '02145YK796',
        product_sold: 14,
        price: 56000.00,
        rating: 5,
        date: '2025-1-22'
    },
    {
        id: 16,
        product_name: 'Sport Watch',
        product_image: 'assets/images/dashboard-8/shop-categories/watch.png',
        sku: '56F7X54F6',
        product_sold: 38,
        price: 25000.00,
        rating: 4,
        date: '2025-1-22'
    },
    {
        id: 17,
        product_name: 'Wallet',
        product_image: 'assets/images/product/accessories/05.png',
        sku: '56379FG3AW',
        product_sold: 28,
        price: 19000.00,
        rating: 3,
        date: '2023-11-21'
    },
    {
        id: 18,
        product_name: 'Wireless Ear Buds',
        product_image: 'assets/images/dashboard-8/product-categories/wireless-headphone.png',
        sku: 'AD6789HEYO',
        product_sold: 14,
        price: 15000.00,
        rating: 5,
        date: '2023-11-15'
    },
    {
        id: 19,
        product_name: 'Wood Chair',
        product_image: 'assets/images/email-template/3.png',
        sku: '33KR568981',
        product_sold: 100,
        price: 5500.00,
        rating: 4,
        date: '2023-10-25'
    },
    {
        id: 20,
        product_name: 'Wool Washing Machine',
        product_image: 'assets/images/product/accessories/07.png',
        sku: '33KR568981',
        product_sold: 150,
        price: 59000.00,
        rating: 5,
        date: '2025-1-22'
    }
]

export const salesReport: SalesReport[] = [
    { 
        id: 1, 
        order_month: 'January', 
        total_sales: 20, 
        average_order_value: 10, 
        total_orders: 200, 
        growth: '60%', 
        date: '2024-01-05' 
    },
    { 
        id: 2, 
        order_month: 'February', 
        total_sales: 100, 
        average_order_value: 20, 
        total_orders: 300, 
        growth: '60%', 
        date: '2024-02-15' 
    },
    { 
        id: 3, 
        order_month: 'March', 
        total_sales: 40, 
        average_order_value: 200, 
        total_orders: 400, 
        growth: '50%', 
        date: '2024-03-12' 
    },
    { 
        id: 4, 
        order_month: 'April', 
        total_sales: 30, 
        average_order_value: 400, 
        total_orders: 800, 
        growth: '40%', 
        date: '2024-04-20' 
    },
    { 
        id: 5, 
        order_month: 'May', 
        total_sales: 100, 
        average_order_value: 50, 
        total_orders: 500, 
        growth: '80%', 
        date: '2024-05-10' 
    },
    { 
        id: 6, 
        order_month: 'June', 
        total_sales: 400, 
        average_order_value: 40, 
        total_orders: 800, 
        growth: '70%', 
        date: '2024-06-25' 
    },
    { 
        id: 7, 
        order_month: 'July', 
        total_sales: 250, 
        average_order_value: 45, 
        total_orders: 260, 
        growth: '50%', 
        date: '2024-07-05' 
    },
    { 
        id: 8, 
        order_month: 'August', 
        total_sales: 120, 
        average_order_value: 20, 
        total_orders: 460, 
        growth: '80%', 
        date: '2024-08-19' 
    },
    { 
        id: 9, 
        order_month: 'September', 
        total_sales: 190, 
        average_order_value: 60, 
        total_orders: 560, 
        growth: '95%', 
        date: '2024-09-15' 
    },
    { 
        id: 10, 
        order_month: 'October', 
        total_sales: 474, 
        average_order_value: 75, 
        total_orders: 800, 
        growth: '80%', 
        date: '2024-10-28' 
    },
    { 
        id: 11, 
        order_month: 'November', 
        total_sales: 120, 
        average_order_value: 45, 
        total_orders: 100, 
        growth: '75%', 
        date: '2024-11-11' 
    },
    { 
        id: 12, 
        order_month: 'December', 
        total_sales: 150, 
        average_order_value: 28, 
        total_orders: 200, 
        growth: '90%', 
        date: '2024-12-22' 
    },
]

export const salesReturnReport: SalesReturnReport[] = [
    { 
        id: 1, 
        month: 'April', 
        total_item: 17, 
        order: 300, 
        return: 8, 
        reason: 'Item Arrived Late', 
        total_replace: 1, 
        total_return: 250, 
        date: '2024-04-15' 
    },
    { 
        id: 2, 
        month: 'August', 
        total_item: 400, 
        order: 100, 
        return: 20, 
        reason: 'Item Arrived Late', 
        total_replace: 3, 
        total_return: 400, 
        date: '2024-08-12' 
    },
    { 
        id: 3, 
        month: 'December', 
        total_item: 15, 
        order: 18, 
        return: 5, 
        reason: 'Damaged Package', 
        total_replace: 8, 
        total_return: 250, 
        date: '2024-12-22' 
    },
    { 
        id: 4, 
        month: 'February', 
        total_item: 10, 
        order: 100, 
        return: 50, 
        reason: 'Defective Item', 
        total_replace: 7, 
        total_return: 480, 
        date: '2024-02-11' 
    },
    { 
        id: 5, 
        month: 'January', 
        total_item: 5, 
        order: 200, 
        return: 10, 
        reason: 'Damaged Package', 
        total_replace: 10, 
        total_return: 520, 
        date: '2024-01-22' 
    },
    { 
        id: 6, 
        month: 'July', 
        total_item: 28, 
        order: 45, 
        return: 2, 
        reason: 'Repeat Order', 
        total_replace: 3, 
        total_return: 400, 
        date: '2024-07-05' 
    },
    { 
        id: 7, 
        month: 'June', 
        total_item: 35, 
        order: 100, 
        return: 5, 
        reason: 'Received the wrong item', 
        total_replace: 3, 
        total_return: 900, 
        date: '2024-06-18' 
    },
    { 
        id: 8, 
        month: 'March', 
        total_item: 9, 
        order: 200, 
        return: 9, 
        reason: 'Received the wrong item', 
        total_replace: 25, 
        total_return: 800, 
        date: '2024-03-08' 
    },
    { 
        id: 9, 
        month: 'May', 
        total_item: 28, 
        order: 260, 
        return: 9, 
        reason: 'Damaged Package', 
        total_replace: 1, 
        total_return: 890, 
        date: '2024-05-25' 
    },
    { 
        id: 10, 
        month: 'November', 
        total_item: 28, 
        order: 25, 
        return: 9, 
        reason: 'Damaged Package', 
        total_replace: 1, 
        total_return: 705, 
        date: '2024-11-14' 
    },
    { 
        id: 11, 
        month: 'October', 
        total_item: 8, 
        order: 14, 
        return: 1, 
        reason: 'Received the wrong item', 
        total_replace: 2, 
        total_return: 450, 
        date: '2024-10-29' 
    },
    { 
        id: 12, 
        month: 'September', 
        total_item: 45, 
        order: 26, 
        return: 14, 
        reason: 'Damaged Package', 
        total_replace: 6, 
        total_return: 900, 
        date: '2024-09-07' 
    },
]

export const customerOrderReport: CustomerOrderReport[] = [
    {
        id: 1,
        customer_name: 'Braelynn Fowler',
        customer_profile: 'assets/images/dashboard/user/12.jpg',
        customer_email: 'braelynn@gmail.com',
        customer_group: [
          { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/3.jpg' },
          { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/7.jpg' },
          { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' },
          { name: 'Ford Stoll', profile: 'assets/images/dashboard-11/user/9.jpg' },
          { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/1.jpg' },
        ],
        orders: 478,
        items: 150,
        total: 9800,
        date: '2024-01-22',
    },
    {
        id: 2,
        customer_name: 'Celine Stokes',
        customer_profile: 'assets/images/user/3.png',
        customer_email: 'celine@gmail.com',
        customer_group: [
            { name: 'Alexis Taylor', profile: 'assets/images/dashboard/user/10.jpg' },
            { name: 'Andrew Price', profile: 'assets/images/dashboard/user/11.jpg' },
            { name: 'Emily Park' },
            { name: 'Caryl Kauth', profile: 'assets/images/dashboard/user/1.jpg' }
        ],
        orders: 400,
        items: 100,
        total: 2008,
        date: '2024-02-12',
    },
    {
        id: 3,
        customer_name: 'Cooper Hanna',
        customer_profile: 'assets/images/dashboard/user/7.jpg',
        customer_email: 'cooper@gmail.com',
        customer_group: [
            { name: 'Jasper Nightingale', profile: 'assets/images/dashboard/user/4.jpg' },
            { name: 'Calista Rivers', profile: 'assets/images/dashboard/user/3.jpg' },
            { name: 'Caspian Wilde', profile: 'assets/images/dashboard/user/5.jpg' },
            { name: 'Seraphina Evergreen' }
        ],
        orders: 250,
        items: 650,
        total: 1790,
        date: '2024-03-15',
    },
    {
        id: 4,
        customer_name: 'Corbin Lynn',
        customer_profile: 'assets/images/dashboard-11/user/11.jpg',
        customer_email: 'corbin@gmail.com',
        customer_group: [
            { name: 'Joseph Garcia', profile: 'assets/images/avatar/16.jpg' },
            { name: 'Elizabeth Davis', profile: 'assets/images/avatar/3.jpg' },
            { name: 'Karen Moore' },
            { name: 'Robert Williams' }
        ],
        orders: 500,
        items: 120,
        total: 9980,
        date: '2024-04-20',
    },
    {
        id: 5,
        customer_name: 'Eileen Portillo',
        customer_profile: 'assets/images/dashboard-11/user/4.jpg',
        customer_email: 'eileen@gmail.com',
        customer_group: [
            { name: 'Levine Raven', profile: 'assets/images/dashboard-11/user/2.jpg' },
            { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/12.jpg' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-9/user/2.png' },
            { name: 'Dashiell Wolfe', profile: 'assets/images/dashboard-9/user/5.png' },
        ],
        orders: 850,
        items: 450,
        total: 1500,
        date: '2024-05-10',
    },
    {
        id: 6,
        customer_name: 'Floyd Miles',
        customer_profile: 'assets/images/user/6.jpg',
        customer_email: 'floyd@gmail.com',
        customer_group: [
            { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/3.jpg' },
            { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/7.jpg' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' },
            { name: 'Ford Stoll', profile: 'assets/images/dashboard-11/user/9.jpg' },
            { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/1.jpg' }
        ],
        orders: 100,
        items: 180,
        total: 9500,
        date: '2024-06-05',
    },
    {
        id: 7,
        customer_name: 'Ila Malone',
        customer_profile: 'assets/images/dashboard-11/user/2.jpg',
        customer_email: 'ila@gmail.com',
        customer_group: [
            { name: 'Caleb Rivera', profile: 'assets/images/dashboard/user/12.jpg' },
            { name: 'Jenny Wilson', profile: 'assets/images/dashboard/user/2.jpg' },
            { name: 'Olivia Gor', profile: 'assets/images/dashboard/user/13.jpg' }
        ],
        orders: 125,
        items: 600,
        total: 5982,
        date: '2024-07-18',
    },
    {
        id: 8,
        customer_name: 'Jeffrey Daniel',
        customer_profile: 'assets/images/dashboard-11/user/8.jpg',
        customer_email: 'jeffrey@gmail.com',
        customer_group: [
            { name: 'Atlas Stone', profile: 'assets/images/user/12.png' },
            { name: 'Oceana Meridian', profile: 'assets/images/user/10.jpg' },
            { name: 'Jett Maverick' }
        ],
        orders: 130,
        items: 250,
        total: 1050,
        date: '2024-08-22',
    },
    {
        id: 9,
        customer_name: 'Mekhi Rubio',
        customer_profile: 'assets/images/dashboard/user/3.jpg',
        customer_email: 'mekhi@gmail.com',
        customer_group: [
            { name: 'Daxton Creed' }, 
            { name: 'Marigold Luna' }, 
            { name: 'Charles Rodriguez', profile: 'assets/images/user/14.png' }, 
            { name: 'Sarah Hernandez', profile: 'assets/images/user/3.png' }
        ],
        orders: 460,
        items: 850,
        total: 6600,
        date: '2024-09-09',
    },
    {
        id: 10,
        customer_name: 'Opal Vazquez',
        customer_profile: 'assets/images/dashboard/user/6.jpg',
        customer_email: 'opal@gmail.com',
        customer_group: [
            { name: 'Xander Wilde' }, 
            { name: 'Charles Rodriguez', profile: 'assets/images/dashboard-11/user/5.jpg' }, 
            { name: 'Zenith Nova' }, 
            { name: 'Sarah Hernandez', profile: 'assets/images/dashboard-11/user/6.jpg' }
        ],
        orders: 985,
        items: 120,
        total: 6600,
        date: '2024-10-12',
    },
    {
        id: 11,
        customer_name: "Peyton Hendrix",
        customer_profile: "assets/images/dashboard/user/13.jpg",
        customer_email: "peyton@gmail.com",
        customer_group: [
            { name: 'Joseph Garcia', profile: 'assets/images/avatar/16.jpg' },
            { name: 'Elizabeth Davis', profile: 'assets/images/avatar/3.jpg' },
            { name: 'Karen Moore' },
            { name: 'Robert Williams' }
        ],
        orders: 890,
        items: 250,
        total: 9990,
        date: "2024-01-23"
      },
      {
        id: 12,
        customer_name: "Poppy Mosley",
        customer_profile: "assets/images/dashboard-11/user/1.jpg",
        customer_email: "poppy@gmail.com",
        customer_group: [
            { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/2.jpg' },
            { name: 'Richard Taylor', profile: 'assets/images/dashboard-11/user/1.jpg' },
            { name: 'Linda Brown' }, 
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' }
        ],
        orders: 200,
        items: 880,
        total: 98572,
        date: "2024-01-23"
      },
      {
        id: 13,
        customer_name: "Queen Hart",
        customer_profile: "assets/images/dashboard/user/11.jpg",
        customer_email: "queen@gmail.com",
        customer_group: [
            { name: 'Daxton Creed' }, 
            { name: 'Marigold Luna' }, 
            { name: 'Charles Rodriguez', profile: 'assets/images/user/14.png' }, 
            { name: 'Sarah Hernandez', profile: 'assets/images/user/3.png' }
        ],
        orders: 587,
        items: 140,
        total: 8900,
        date: "2024-01-23"
      },
      {
        id: 14,
        customer_name: "Romeo Murray",
        customer_profile: "assets/images/dashboard-11/user/9.jpg",
        customer_email: "romeo@gmail.com",
        customer_group: [
            { name: 'Atlas Stone', profile: 'assets/images/user/12.png' },
            { name: 'Oceana Meridian', profile: 'assets/images/user/10.jpg' },
            { name: 'Jett Maverick' }
        ],
        orders: 225,
        items: 260,
        total: 3500,
        date: "2024-01-23"
      },
      {
        id: 15,
        customer_name: "Rosalyn Hammond",
        customer_profile: "assets/images/dashboard/user/1.jpg",
        customer_email: "rosalyn@gmail.com",
        customer_group: [
            { name: 'Caleb Rivera', profile: 'assets/images/dashboard/user/12.jpg' },
            { name: 'Jenny Wilson', profile: 'assets/images/dashboard/user/2.jpg' },
            { name: 'Dashiell Wolfe', profile: 'assets/images/dashboard-9/user/5.png' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-9/user/2.png' }
        ],
        orders: 104,
        items: 130,
        total: 8005,
        date: "2024-01-23"
      },
      {
        id: 16,
        customer_name: "Ruben Charles",
        customer_profile: "assets/images/dashboard-11/user/5.jpg",
        customer_email: "ruben@gmail.com",
        customer_group: [
            { name: 'Thomas Jones', profile: 'assets/images/dashboard-9/user/1.png' },
            { name: 'Karen Jones' },
            { name: 'Elizabeth Williams', profile: 'assets/images/dashboard-9/user/3.png' }
        ],
        orders: 470,
        items: 420,
        total: 6888,
        date: "2024-01-23"
      },
      {
        id: 17,
        customer_name: "Sullivan Thomas",
        customer_profile: "assets/images/dashboard-11/user/7.jpg",
        customer_email: "sullivan@gmail.com",
        customer_group: [
            { name: 'Kairos Frost' }, 
            { name: 'Oceana Meridian', profile: 'assets/images/user/2.jpg' }, 
            { name: 'Ember Wren' }
        ],
        orders: 550,
        items: 200,
        total: 9580,
        date: "2024-01-23"
      },
      {
        id: 18,
        customer_name: "Tristen Harrison",
        customer_profile: "assets/images/dashboard/user/10.jpg",
        customer_email: "tristen@gmail.com",
        customer_group: [
            { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/2.jpg' },
            { name: 'Linda Brown' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' },
            { name: 'Richard Taylor', profile: 'assets/images/dashboard-11/user/1.jpg' }
        ],
        orders: 105,
        items: 225,
        total: 9999,
        date: "2024-01-23"
      },
      {
        id: 19,
        customer_name: "Zev Livingston",
        customer_profile: "assets/images/dashboard/user/4.jpg",
        customer_email: "zev@gmail.com",
        customer_group: [
            { name: 'Joseph Garcia', profile: 'assets/images/avatar/16.jpg' },
            { name: 'Elizabeth Davis', profile: 'assets/images/avatar/3.jpg' },
            { name: 'Karen Moore' },
            { name: 'Robert Williams' }
        ],
        orders: 586,
        items: 140,
        total: 5780,
        date: "2024-01-23"
      },
      {
        id: 20,
        customer_name: "Zola Rodriguez",
        customer_profile: "assets/images/dashboard-11/user/10.jpg",
        customer_email: "zola@gmail.com",
        customer_group: [
            { name: 'Calista Rivers', profile: 'assets/images/dashboard/user/3.jpg' },
            { name: 'Jasper Nightingale', profile: 'assets/images/dashboard/user/4.jpg' },
            { name: 'Seraphina Evergreen' },
            { name: 'Caspian Wilde', profile: 'assets/images/dashboard/user/5.jpg' }
        ],
        orders: 305,
        items: 680,
        total: 4590,
        date: "2024-01-23"
      }
]