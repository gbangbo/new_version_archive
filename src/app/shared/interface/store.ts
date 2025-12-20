import { SafeHtml } from "@angular/platform-browser";

export interface Store {
  id: number;
  store_name: string;
  store_logo: string;
  vendor_name: string;
  total_order: number;
  total_product: number;
  total_earning: number;
  store_category_id: number;
}

export interface StoreGeneralDetails {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  type?: string;
}

export interface SalesOverviewCharts {
  id: number;
  title: string;
  value: string;
  icon: string;
  color: string;
  chart_details: any;
}

export interface TopSellingProduct {
  id: number;
  product_name: string;
  product_image: string;
  category: string;
  price: string | number;
  orders: string | number;
  stock: string | number;
  total_amount: string | number;
}

export interface RecentOrders {
  id: number;
  order_number: string;
  date: string;
  amount: number | string;
  payment: string;
  customer_name: SafeHtml;
  customer_profile: string;
}

export interface SellerDetails {
  details: StoreDetail;
  rating: SellerRating;
  notifications: SellerNotification;
  policies: SellerPolicy[];
  review: SellerReview[];
}

export interface StoreDetail {
  logo: string;
  store_name: string;
  vendor_name: string;
  location: string;
  phone: string;
  email: string;
  url: string;
}

export interface SellerRating {
  total_rating: number;
  rating: number;
  rating_count: number[];
}

export interface SellerNotification {
  notification_list: {
    id: number;
    title: string;
    checked?: boolean;
  }[],
  notification_platform: {
    id: number;
    name: string;
    logo: string;
    checked?: boolean;
  }[]
}[]

export interface SellerPolicy {
  title: string;
  policy_text: string;
}

export interface SellerReview {
  name: string;
  image: string;
  product: string;
  rating: number;
  date: string;
  review_text: string;
}
