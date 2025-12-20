import { SafeHtml } from "@angular/platform-browser";

export interface EmployeeDetails {
    id: number;
    title: string;
    value: number;
    icon: string;
    color: string;
}

export interface EmployeeList {
    id: number;
    name: SafeHtml;
    employee_id: string;
    email: string;
    joining_date: string;
    role: string;
    image: string;
}

export interface AttendanceOverview {
    id: number;
    employee_name: SafeHtml;
    designation: string;
    check_in_time: string;
    status: string;
    class: string;
}

export interface BirthdayUser {
    id: number;
    name: string;
    role: string;
    image: string;
}

export interface InterviewSchedule {
    name: string;
    role: string;
    image: string;
    date: string;
}

export interface LeaveRequest {
    id: number;
    name: string;
    reason: string;
    leave_period: string;
    image: string;
    action?: string;
}
export interface Days {
    id: number;
    day: string;
    date: string;
    value: string;
}

export interface TodaySchedule {
    title: string;
    participants: Participant[];
    schedule_name: string;
    time: string;
    color_class: string;
    value: string;
}

export interface Participant {
    image: string;
    alt: string;
}