import { SafeHtml } from "@angular/platform-browser";

export interface Products {
  product: Product[]
}

export interface Product {
  id: number;
  image: string;
  product_name: SafeHtml;
  sort_description: string;
  description: string;
  discount_price: number;
  price: any;
  discount?: number;
  tag?: string;
  stock: string;
  review: number;
  category: string;
  rating: any;
  colors: string[];
  size: string[];
  tags: string[];
  sku: string;
  qty: any;
}
