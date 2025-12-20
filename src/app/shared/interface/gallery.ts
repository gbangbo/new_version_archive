export interface ImagesDetails {
    hover_digits: number;
    hover_class: string;
    text?: boolean;
    images: Images[]
}

export interface Images {
    src_url: string;
    preview_url: string;
    title?: string;
    description?: string;
    buttons?: Buttons[]
}

export interface GalleryGridDetails {
    src_url: string;
}

export interface Buttons {
    title: string;
    color: string;
}

export interface GalleryGridDesc {
    src_url: string;
    title: string;
    text: string;
}

export interface GalleryPlaceholder {
    src_url: string;
    preview_url: string;
    title: string;
    description: string;
}

export interface MasonryImage {
    src_url: string;
    preview_url: string;
}

export interface MasonryImageDesc {
    src_url: string;
    preview_url: string;
}