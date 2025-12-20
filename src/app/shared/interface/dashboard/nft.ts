import { SafeHtml } from "@angular/platform-browser";

export interface TrendingCreator {
    id: number;
    title: string;
    image: string;
    items: string;
    price: number;
}

export interface Artwork {
    id: number;
    course_name: SafeHtml;
    course_profile: string;
    course_site: string;
    sale: SafeHtml;
    earnings: SafeHtml;
}

export interface TrendingBids {
    id: number;
    bead_name: string;
    bead_owner: string;
    owner_profile: string;
    banner: string;
    auction_date: string;
    current_bid: string;
    remaining_time?: string;
}

export interface TopNFT {
    id: number;
    collection_name: SafeHtml;
    profile: string;
    volume: string;
    profit: SafeHtml
    profit_type: string;
    items: string;
}

export interface ActivityPanel {
    id: number;
    title: string;
    name: string;
    value: string;
    profile: string;
    follow_button?: boolean;
    image?: string;
    time?: string;
}

export interface LiveAuction {
    id: number;
    name: string;
    owner_profile: string;
    banner: string;
    high_bid: number;
    total_currency: number;
    auction_date: string;
    remaining_time?: string;
}

export interface Creator {
    id: number;
    creator_name: SafeHtml;
    creator_profile: string;
    category: string;
    creations: number;
    followers: string;
}

export interface Collection {
    id: number;
    title: string;
    banner: string;
    created_by: string;
    profile: string;
    items: number;
    likes: string;
}

export interface ArtworkDetails {
    id: number;
    artwork_name: SafeHtml;
    artwork_profile: string;
    owner_name: string;
    total_sales: number;
    total_usd: string;
}