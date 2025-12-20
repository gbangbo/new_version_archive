export interface Friend {
    id: number;
    name: string;
    profile: string;
    email: string;
    status: string;
    is_follower: boolean;
    is_following: boolean;
    last_activity_time?: string;
    user_profile?: string;
}
export interface UserPost {
    id: number;
    user_name: string;
    user_profile: string;
    post_date: string;
    post_image: string;
    description: string;
    comment: number;
    share: number;
    comments: Comments[];
}
export interface Comments {
    id: number;
    user_name: string;
    user_profile: string;
    comment: string;
    time: string;
    is_reply?: boolean;
}
export interface Photos {
    id: number;
    user_name: string;
    description: string;
    src_url: string;
    preview_url: string;
    likes: string;
    comment: number;
}