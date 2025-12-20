export interface EmailSidebar {
  id: number;
  title: string;
  value: string;
  icon: string;
  tag?: number;
}

export interface Emails {
  id: number;
  user_name: string;
  user_profile?: string;
  email_title: string;
  description: string;
  tag?: string;
  time: string;
  date?: string;
  is_favorite: boolean;
  is_draft: boolean;
  is_trash: boolean;
  is_read: boolean;
  is_send: boolean;
  email_type: string;
  email: string;
}
