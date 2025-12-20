import { SafeHtml } from "@angular/platform-browser";

export interface Country {
    id: number;
	country_name: SafeHtml;
	flag: string;
	area: number;
	population: number;
}