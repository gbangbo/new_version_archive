import { SafeHtml } from "@angular/platform-browser";
import { Images } from "./default";

export interface TopCustomers {
  id: number;
  customer_name: string;
  customer_profile: string;
  customer_email: string;
}

export interface RecentTransactions {
  id: number,
  transaction_id: string;
  date: string;
  customer_name: string;
  product_name: string;
  quantity: number;
  payments: string;
  total: number
}

export interface BestSeller {
  id: number,
  seller_name: SafeHtml;
  seller_profile: string;
  company_name: string;
  category: string;
  earning: number;
}

export interface StockReport {
  id: number;
  product_name: SafeHtml;
  product_image: string;
  product_id: string;
  quantity: number;
  price: number;
  status: SafeHtml;
  color: string;
}

export interface Categories {
  id: number;
  title: string;
  image: string;
  value: string;
}

export interface RecentOrders {
  id: number;
  title: string;
  product_id: string;
  image: string;
  quantity: string;
  price: number;
  total_price: number;
  category: string;
}

export interface TopCategories {
  id: number;
  category_name: string;
  image: string;
  total_items: number;
}

export interface RecentActivity {
  id: number;
  title: string;
  description: string;
  date: string;
  color: string;
  images?: Images[];
}

export interface TrendingProducts {
  id: number;
  product_name: SafeHtml;
  product_image: string;
  category: string;
  sold_item: number;
}

export interface Slot {
  slot: string;
  time: string;
}