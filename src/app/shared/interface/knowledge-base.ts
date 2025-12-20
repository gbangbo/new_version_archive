export interface KnowledgeBase {
    title: string;
    description: string;
    icon: string;
}

export interface BrowserArticle {
    col_class: string;
    see_more: number;
    title: string;
    title_icon: string;
    details: Details[];
}
export interface Details {
    list_text: string;
    text_icon: string;
    tag: boolean;
    tag_title: string;
}

export interface featuredTutorial {
    id: number;
    rating: number;
    image: string;
    title: string;
    description: string;
    date: string;
}

export interface articlesAndVideos {
    row: number;
    class?: string;
    details: ArticleDetails[];
}
export interface ArticleDetails {
    id: number;
    icon: string;
    title: string;
    description: string;
    class?: string;
}