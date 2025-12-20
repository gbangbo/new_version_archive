import { SafeHtml } from "@angular/platform-browser";

export interface API {
    id: number;
    api_name: string;
    api_key: SafeHtml;
    status: string;
}