import { SafeHtml } from "@angular/platform-browser";

export interface Details {
    title: string;
    count: string;
    margin: string;
    margin_type: string;
    icon: string;
    color: string;
    class?: string;
}

export interface TopCustomers {
    id: number;
    customer_name: SafeHtml;
    customer_profile: string;
    customer_id: string;
    purchase_items: number;
    total_price: number;
}

export interface ActivityLogs {
    id: number;
    title: string;
    description: string;
    log_type: string;
    log_details: string;
    date: string;
    time: string;
    color: string;
    image?: boolean;
    images?: Images[];
}

export interface Images {
    image_url: string;
}

export interface RecentOrders {
    id: number;
    product_name: SafeHtml;
    product_image: string;
    product_id: string;
    customer_name: string;
    quantity: number,
    total_price: string;
    order_date: string;
    status: SafeHtml;
    status_color: string;
    category: string
}

export interface ManageAppointments {
  id: number;
  appointment_title: string;
  appointment_time: string;
  appointment_description?: string;
  schedule_time?: string;
  color: string;
}
