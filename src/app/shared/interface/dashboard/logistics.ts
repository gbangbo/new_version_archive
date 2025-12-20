import { SafeHtml } from "@angular/platform-browser";

export interface Overview {
    id: number;
    title: string;
    value: string;
    icon: string;
    color: string;
    profit: number;
    profit_type: string;
    class?: string;
    chart_id?: string;
    chart_details?: any;
    progress_bar_details?: any;
}

export interface ShipmentTracking {
    id: number;
    shipment: SafeHtml;
    carrier: string;
    origin: string;
    destination: string;
    current_location: string;
    eta: string;
    class: string;
    status: string;
}

export interface ShipmentDetails {
    class: string;
    title: string;
    text?: string;
}

export interface VehiclesOverview {
    id: number;
    vehicle_id: SafeHtml;
    status: string;
    driver_name: string;
    next_due: string;
    total_distance: number;
    location: string;
    image: string;
}