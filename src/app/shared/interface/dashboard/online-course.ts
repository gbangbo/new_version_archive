import { SafeHtml } from "@angular/platform-browser";

export interface Course {
  title: string;
  total_course: number;
  icon: string;
  color?: string;
}

export interface TopMentors {
  id: number;
  mentor_name: SafeHtml;
  mentor_profile: string;
  expertise: string;
  courses: number;
  experience: string;
}

export interface CompletedCourses {
  id: number;
  student_name: SafeHtml;
  student_profile: string;
  course_name: string;
  completion_date: string;
  mentor_name: string;
}

export interface MyCourses {
  id: number;
  course_name: string;
  image_url: string;
  icon: string;
}

export interface UpcomingSchedule {
  id: number;
  course_name: string;
  user_profile: string;
  date: string;
  time: string;
  color: string;
}

export interface ActiveCourse {
  id: number;
  course_name: string;
  course_type: string;
  logo: string;
  chart_details: any;
}
