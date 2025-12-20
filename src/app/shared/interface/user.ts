import { SafeHtml } from "@angular/platform-browser";

export interface User {
  name: string;
  user_profile: string;
  user_email: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  address: string;
  pin_code: string;
  contact: string;
  tag?: string;
}

export interface Users {
  id: number;
  user_name: string;
  name: SafeHtml;
  user_profile: string;
  designation: string;
  bio: string;
  email: string;
  DOB: string;
  contact_number: string;
  location: string;
  post: number;
  followers: number;
  following: number;
  role: string;
  status: string;
  creation_date: string;
}

export interface Notification {
  id: number;
  user_profile: string;
  title: string;
  description: string;
  time?: string;
  date: string;
}

export interface Role {
  id: number;
  role: string;
  creation_date: string;
  last_update_date: string;
  status: string;
}

export interface Module {
  id: number;
  name: string;
  is_checked: boolean;
  module_permission: Permission[];
}

export interface Permission {
  id: number;
  is_checked: boolean;
  permission_id: number;
  name: string;
}