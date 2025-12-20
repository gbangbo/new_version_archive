import { SafeHtml } from '@angular/platform-browser';
import { Images } from './dashboard/default';

export interface ProjectDetails {
  project_summary: ProjectSummary;
  project_status: ProjectStatus[];
  finance: Finance;
  team: Team[];
  attachment: Attachment;
  activity: ProjectActivity[];
}

export interface ProjectSummary {
  summary: Summary;
  todo_list: TodoList[];
  pending_project: PendingProject[];
  task_overViewChart: any;
  recent_activity: RecentActivity;
  team_members: TeamMembers[];
  comments: Comments[];
}

export interface Summary {
  title: string;
  description: string;
  sort_description: string;
  creation_date: string;
  due_date: string;
  priority: string;
  status: string;
  resource: Resource;
  chart_details: any;
}

export interface Resource {
  title: string;
  file_size: string;
  file_type: string;
  file: string;
}

export interface TodoList {
  id: number;
  title: string;
  description: string;
}

export interface PendingProject {
  id: number;
  project_name: string;
  project_head_name: string;
  project_head_email: string;
  project_head_profile: string;
  priority: string;
  due_date: string;
  status: SafeHtml;
  color: string;
}

export interface RecentActivity {
  title: string;
  date: string;
  activities: Activities[];
}

export interface Activities {
  date: string;
  day: string;
  activity: Activity[];
}

export interface Activity {
  id: number;
  title: string;
  customer_name: string;
  time: string;
  created_time: string;
}

export interface TeamMembers {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface Comments {
  id: number;
  name: string;
  message: string;
  image: string;
  is_reply?: boolean;
}

export interface ProjectStatus {
  id: number;
  project_title: string;
  project_description: string;
  project_banner?: string;
  tag: string;
  tag_color: string;
  date: string;
  attachment: number;
  comments: number;
  progress: number;
  status: string;
  developer: Profile[];
}

export interface Profile {
  name: string;
  profile?: string;
}

export interface Finance {
  expenses: Expenses[];
  budget_details: BudgetDetails[];
  budget_distribution: any;
}

export interface Expenses {
  id: number;
  title: string;
  value: string;
  profit: string;
  profit_type: string;
  chart_details: any;
}

export interface BudgetDetails {
  id: number;
  type: string;
  total_budget: number;
  expenses: number;
  remaining: number;
}

export interface Team {
  id: number;
  developer_name: string;
  position: string;
  profile: string;
  total_task: number;
  completed_task: number;
  revenue: number;
  projects: number;
  features: number;
  color: string;
}

export interface Attachment {
  attachment_types: AttachmentTypes[];
  attachments: Attachments[];
}

export interface AttachmentTypes {
  id: number;
  title: string;
  icon: string;
  color: string;
}

export interface Attachments {
  id: number;
  file_name: string;
  upload_time: string;
  file_icon: string;
  total_file_size: number;
  upload_size: number;
}

export interface ProjectActivity {
  title: string;
  description?: string;
  time: string;
  added_by: AddedBy;
  color: string;
  attachments?: ActivityAttachment[];
  images?: Images[];
  members?: Profile[];
  templates?: ActivityTemplate[];
}

export interface AddedBy {
  name: string;
  profile: string;
}

export interface ActivityAttachment {
  file_name: string;
  file_icon: string;
  file_size: string;
}

export interface ActivityTemplate {
  id: number;
  project_name: string;
  task: string;
  assign_to: Profile[];
  status: string;
  color: string;
  due_date: string;
}

export interface Projects {
  id: number;
  project_name: string;
  project_description: string;
  project_banner: string;
  date: string;
  progress: number;
  status: string;
  budget: string;
  team_member: Profile[];
}
