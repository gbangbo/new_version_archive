import { SafeHtml } from "@angular/platform-browser";

export interface AverageDayDetails {
  id: number;
  title: string;
  description: string;
  value: string;
  margin: string;
  margin_type: string;
  color: string;
  chart_details: any;
}

export interface Transactions {
  id: number;
  currency: string;
  date: string;
  profit_type: string;
  value: string;
  price: string;
  type: string;
}

export interface CurrencyChart {
  id: number;
  currency_name: string;
  currency_code: string;
  currency_symbol: string;
  price: number;
  profit: number;
  profit_type: string;
  color: string;
  chart_details: any
}

export interface MyCurrency {
  id: number;
  currency_name: SafeHtml;
  currency_symbol: string;
  price: string;
  day_change: string;
  total_balance: string;
  total_coin: string;
  profit_type: string;
  color: string;
  is_trade?: SafeHtml;
}

export interface Activities {
  id: number;
  user_name: string;
  user_profile: string;
  transaction_to: string;
  transaction_amount: string;
  transaction_date: string;
  profit_type: string;
}

export interface AverageSalePrice {
  id: number;
  currency_name: SafeHtml;
  currency_symbol: string;
  usd: string;
  eth: string;
  btc: string;
  price_change: string;
  bg_color: string;
}

export interface TopPerformers {
  id: number;
  currency_name: SafeHtml;
  currency_symbol: string;
  market_cap: SafeHtml;
  usd: string;
  btc: string;
  eth: string;
  change24h: string;
  bg_color: string;
}
