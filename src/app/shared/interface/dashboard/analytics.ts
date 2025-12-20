import { SafeHtml } from "@angular/platform-browser";

export interface ReferralsVisit {
    social_network: SafeHtml;
    conversion_rate: SafeHtml;
    visits: string;
    icon_class?: string;
    icon: string;
    class: string;
}

export interface PageAnalytics {
    id: number;
    page_name: string;
    page_views: string;
    bounce_rate: string;
    click_rate: string;
    devices: string;
    page_icon: string;
    bounce_icon: string;
    click_icon: string;
    page_class: string;
    bounce_class: string;
    click_class: string;
}

export interface SessionByBrowser {
    browser: string;
    sessions: string;
    image: string;
}

export interface AnalyticsDetailsChart {
    id: number;
    title: string;
    value: string;
    analytics_value: string;
    txt_class: string;
    image_class: string;
    icon: string;
    image: string;
    chart_id?: string;
    card_body_class?: string;
    body_div_class: string;
    card_class?: string;
    chart_details?: any;
    progress?: boolean;
    user_progress?: boolean;
}