export interface jobFilter {
    id: number;
    title: string;
    button: string;
    class?: string;
    search?: boolean;
    location?: boolean;
    card_body_class?: string;
    check?: boolean;
    details: filterDetails[];
}

export interface filterDetails {
    id: number;
    title: string;
    check_id: string;
    badge: boolean;
    badge_text?: number;
    country_code?: string;
}

export interface JobCard {
    id: number,
    rating: number,
    image: string,
    title?: string,
    sub_title: string,
    description?: string,
    tag?: boolean,
    tag_title?: string,
    ribbon?: boolean,
    ribbon_icon?: string,
    time?: string,
    class?: string;
}

export interface JobDetails {
    img: string;
    main_title: string;
    subtitle: string;
    rating: number;
    details: Details[];
}
export interface Details {
    title: string;
    li_class: boolean;
    detail: Detail[];
}
export interface Detail {
    description: string;
}

export interface Candidate {
    id: number;
    img: string;
    class: string;
    name: string;
    label: string;
    projects: string;
    designation: string;
    salary: string;
    experience: string;
    education: EducationDetails[] | any,
    skills: Skill[] | any
}

export interface EducationDetails {
    degree: string
}

export interface Skill {
    name: string;
    class: string;
}

export interface SelectCandidate {
    title: string;
    item: CandidateDetails[]
}
export interface CandidateDetails{
    value: string;
    label: string;
}

export interface jobFilterCompany {
    id: number;
    title: string;
    details: filterDetailsCompany[];
}

export interface filterDetailsCompany {
    id: number;
    title: string;
    check_id: string;
    rate_number?: number;
    rating?: boolean;
    badge: boolean;
    badge_text?: string;
}

export interface CompanyDetails{
    id: number;
    icon: string;
    name: string;
    rating: number;
    reviews: string;
    category: string;
    description: string;
    jobs_posted: string;
}

export interface Degree{
    value: string;
    label: string;
}

export interface Experience{
    value: string;
    label: string;
}

export interface Month{
    value: string;
    label: string;
}