import { SafeHtml } from "@angular/platform-browser";

export interface SchoolDetails {
    title: string;
    class: string;
    count: string;
    icon: string;
    alt: string;
    percentage: string;
    image: string;
}

export interface TodayTask {
    id: string;
    checked: boolean;
    title: string;
    class: string;
    icon: string;
    time: string;
    status: string;
    status_class: string;
    tr_class?: string;
}

export interface NoticeBoard {
    class: string;
    date: string;
    title: string;
    time: string;
    badge?: boolean;
}

export interface ShiningStar {
    class?: string;
    image?: string;
    number?: string;
    text?: string
    user_image: string;
    name: string;
    grade: string;
    percentage: string;
}

export interface UnPaidFees {
    id: number;
    image: string;
    name: SafeHtml;
    student_id: string;
    standard: string;
    section: string;
    fees: string;
    due_date: string;
}

export interface TopStudent {
    id: number;
    student_id: string;
    name: SafeHtml;
    marks: number;
    percentage: string;
    year: number;
    standard: string;
    image: string;
    profile_link: string;
}

export interface NewStudentEnroll {
    name: SafeHtml;
    id: string;
    standard: string;
    section: string;
    admission_date: string;
    profile_image: string;
    profile_link: string;
}