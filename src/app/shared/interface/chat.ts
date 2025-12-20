export interface RecentChats {
  id: number;
  user_name?: string;
  user_profile?: string;
  message_time: string;
  last_message: string;
  user_status?: string;
  unread_message?: number;
  last_seen?: string;
  chats?: Chat[];
  group_name?: string;
  group_members?: GroupMembers[];
  total_members?: number;
  group_profile?: string;
}

export interface Chat {
  chat: string;
  is_reply: boolean;
  time: string;
  user_name?: string;
}

export interface Contact {
  id: number;
  user_name: string;
  user_profile?: string;
  contact_number: string;
}

export interface GroupChat {
  id: number;
  group_name: string;
  group_members: GroupMembers[];
  total_members: number;
  message_time: string;
  last_message: string;
  chats?: Chat[];
}

export interface GroupMembers {
  user_name: string;
  user_profile: string;
}
