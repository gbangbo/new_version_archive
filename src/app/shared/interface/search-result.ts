export interface Themes {
    id: number;
    theme_name: string;
    theme_url: string;
    description: string;
    rating: number;
    votes: number;
    type: string;
}

export interface Video {
    id: number;
    title: string;
    url: string;
    rating: number;
    votes: number;
    type: string;
}

export interface Audio {
    id: number;
    title: string;
    description: string;
    poster: string;
    album: string;
    artist: string;
    release_date: string;
    duration: string;
    is_favorite: boolean;
    is_play: boolean;
    is_top_rated: boolean;
    is_suggested: boolean;
}