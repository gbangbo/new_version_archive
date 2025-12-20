export interface ProductReports {
    id: number
    product_name: string;
    product_image: string;
    sku: string;
    product_sold: number;
    price: number;
    rating: any;
    date: string;
}

export interface SalesReport {
    id: number;
    order_month: string;
    total_sales: number;
    average_order_value: number;
    total_orders: number;
    growth: string;
    date: string;
}

export interface SalesReturnReport {
    id: number;
    month: string;
    total_item: number;
    order: number;
    return: number;
    reason: string;
    total_replace: number;
    total_return: number;
    date: string;
}
  
export interface CustomerOrderReport {
    id: number;
    customer_name: string;
    customer_profile: string;
    customer_email: string;
    customer_group: any;
    orders: number;
    items: number;
    total: number;
    date: string;
}
export interface CustomerGroup {
    name: string;
    profile?: string;
}