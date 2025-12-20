import { SafeHtml } from "@angular/platform-browser";

export interface SocialMediaDetails {
  id: number;
  platform_name: string;
  platform_logo: string;
  title: string;
  value: number;
  rate: string;
  type: string;
  chart_details: any;
}

export interface Campaigns {
  id: number;
  platform_name: string;
  platform_logo: string;
  campaign: string;
  geo: string;
  profitability: SafeHtml;
  impressions: string;
  status: SafeHtml;
  icon?:string;
}

export interface SocialAnalyticsChart {
  id: number;
  title: string;
  value: number;
  analytics_value: string;
  analytics_type: string;
  chart_details: any;
}

export interface SocialAnalyticsTabs {
  id: number;
  title: string;
  value: string;
  icon: string;
  bg_color: string;
  icon_color: string;
  class?: string;
}

export interface SocialAnalytics {
  marker: SocialAnalyticsMarkers[],
  charts: SocialAnalyticsChartDetails[];
}

export interface SocialAnalyticsMarkers {
  title: string;
  color: string;
}
export interface SocialAnalyticsChartDetails {
  value: string;
  chart_details: any;
}

export interface TopPerformers {
  country_name: string;
  country_flag: string;
  total_followers: number;
}