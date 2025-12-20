import { SafeHtml } from "@angular/platform-browser";

export interface ProjectDetails {
    title: string;
    count: number;
    text_class: string;
    icon: string;
    percentage: string;
    class: string;
    image: string;
}

export interface PriorityTask {
    id: number;
    title: string;
    class: string;
    status: string;
    project: string;
    project_status: string;
    project_name: string;
    complete_status: string;
    customer: Customer[];
    progress_class: string;
    progress: string;
    date: string;
}

export interface Customer {
    image: string;
    name: string;
}

export interface TodayTask {
    id: string;
    task: string;
    icon: string;
    class?: string;
}

export interface AllProjects {
    id: number;
    project_id: SafeHtml;
    name: string;
    image: string;
    project_name: string;
    start_date: string;
    end_date: string;
    priority: string;
    status: string;
    class: string;
}

export interface TeamPerformance {
    id: number;
    name: SafeHtml;
    assigned: number;
    completed: number;
    rate: string;
}

export interface ExpensesChart {
    id: number;
    title: string;
    count: string;
    class: string;
    icon: string;
    percentage: string;
    chart_id: string;
    chart_details: any;
}

export interface UpcomingDeadline {
    id: number;
    employee: SafeHtml;
    task: string;
    deadline: string;
}

export interface RecentActivity {
    id: number;
    description: SafeHtml;
    project: string;
    performed_by: string;
    date: string;
}