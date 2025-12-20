export interface AbsoluteCard {
  bg_color: string;
  heading: string;
  img: string;
  text: string;
}

export interface AnimatedTimeline {
  year: number;
  events: TimelineEvents[]
}

export interface TimelineEvents {
  id: number;
  title: string;
  description: string;
  focused?: boolean;
}
export interface HorizontalTimeline {
  id: number;
  ul_class: string;
  vertical_line: string;
  details: Details[];
}

export interface Details {
  div_class: string;
  color_class: string;
  date: string;
  title: string;
  description: string;
  class?: string;
}

export interface Images {
  image: string;
}

export interface NestedSwiper {
  image?: string;
  images?: Images[];
}

export interface DarkVariant {
  img: string;
  title: string;
  description: string;
}

export interface List {
  title: string;
  class?: string;
  card_class?: string;
  card_header_class?: string;
  card_body_class?: string;
  card_footer_class?: string;
  footer_class?: string;
  heading_class?: string;
  card_type: string;
  details: ListDetails[];
}

export interface ListDetails {
  name?: string;
  active?: boolean;
  icon?: string;
  title?: string;
  list?: boolean;
  description?: string;
  title_class?: string;
  description_class?: string;
}