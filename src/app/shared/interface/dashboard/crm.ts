import { SafeHtml } from "@angular/platform-browser";

export interface CrmTodo {
    id: number;
    title: string;
    added_by: string;
}

export interface Deal {
    id: number;
    deal_id: number;
    deal_name: string;
    amount: string;
    close_date: string;
}
  
export interface Lead {
    id: number;
    lead_name: SafeHtml;
    lead_profile: string;
    date: string;
    email: string;
    assign_user_name: SafeHtml;
    assign_user_profile: string;
    status: SafeHtml;
}
  
export interface LeadSource {
    id: number;
    title: string;
    value: number;
}