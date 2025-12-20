import { Contact, RecentChats } from "../interface/chat";
import { Tabs } from "../interface/common";

export const chatTabs: Tabs[] = [
  {
    id: 1,
    title: 'Chats',
    value: 'chats'
  },
  {
    id: 2,
    title: 'Contacts',
    value: 'contact'
  }
]
export const recentChats: RecentChats[] = [
  {
    id: 1,
    user_name: 'Cameron',
    user_profile: 'assets/images/avatar/3.jpg',
    message_time: '2 min',
    last_message: 'Hey, How are you?',
    user_status: 'Online',
    unread_message: 15
  },
  {
    id: 2,
    user_name: 'Esther',
    user_profile: 'assets/images/dashboard-11/user/10.jpg',
    message_time: '7:30 PM',
    last_message: 'Thanks for reply',
    user_status: 'Online',
    chats: [
      { chat: 'Good morning. How may I help you with this? 😄', is_reply: false, time: '01:14 PM' },
      { chat: 'Could you perhaps clarify the most recent project deadline?', is_reply: true, time: '01:14 PM' },
      { chat: 'Yes, the deadline is scheduled for Friday of next week.', is_reply: true, time: '01:14 PM' },
      { chat: 'Is that timeline negotiable?', is_reply: false, time: '01:14 PM' },
      { chat: 'I\'ll talk to the team about it.', is_reply: true, time: '01:14 PM' },
      { chat: 'I appreciate your quick attention to this.', is_reply: false, time: '01:14 PM' },
      { chat: 'Regards. Do you have any further questions?', is_reply: true, time: '01:14 PM' }
    ]
  },
  {
    id: 3,
    user_name: 'Jane',
    user_profile: 'assets/images/avatar/7.jpg',
    message_time: '1:10 PM',
    last_message: 'Hey, What\'s up?',
    user_status: 'Online',
  },
  {
    id: 4,
    user_name: 'Ronald',
    user_profile: 'assets/images/avatar/16.jpg',
    message_time: '3:10 PM',
    last_message: 'I\'m ready',
    user_status: 'Online',
  },
  {
    id: 5,
    user_name: 'Darlene',
    user_profile: 'assets/images/avatar/4.jpg',
    message_time: '1:30 PM',
    last_message: 'Hey, How are you?',
    user_status: 'Offline',
    last_seen: '41 min ago',
  },
  {
    id: 6,
    user_name: 'Darrell',
    user_profile: 'assets/images/blog/comment.jpg',
    message_time: '2:10 PM',
    last_message: 'What\'s going on?',
    user_status: 'Offline',
    last_seen: '58 min ago',
  },
  {
    id: 7,
    user_name: 'Theresa',
    user_profile: 'assets/images/blog/4.jpg',
    message_time: '1:50 AM',
    last_message: 'What\'s up?',
    user_status: 'Online',
  },
  {
    id: 8,
    user_name: 'Floyd',
    user_profile: 'assets/images/blog/12.png',
    message_time: '5:14 PM',
    last_message: 'Are you sure?',
    user_status: 'Offline',
    last_seen: '56 min ago',
  },
  {
    id: 9,
    user_name: 'Annette',
    user_profile: 'assets/images/blog/9.jpg',
    message_time: '1:50 PM',
    last_message: 'Thanks',
    user_status: 'Offline',
    last_seen: '25 min ago',
  }
]

export const groupChats: RecentChats[] = [
  {
    id: 1,
    group_name: 'Meeting Department',
    group_profile: 'assets/images/avatar/7.jpg',
    group_members: [
      { user_name: 'Cameron', user_profile: 'assets/images/avatar/3.jpg' },
      { user_name: 'Esther', user_profile: 'assets/images/dashboard-11/user/10.jpg' },
      { user_name: 'Jane', user_profile: 'assets/images/avatar/7.jpg' },
      { user_name: 'Ronald', user_profile: 'assets/images/avatar/16.jpg' },
      { user_name: 'Darlene', user_profile: 'assets/images/avatar/4.jpg' },
      { user_name: 'Darrell', user_profile: 'assets/images/blog/comment.jpg' }
    ],
    total_members: 35,
    message_time: '2 min',
    last_message: 'Hey, How are you?',
    chats: [
      { chat: 'Good morning. How may I help you with this? 😄', is_reply: false, time: '01:14 PM', user_name: 'Cameron', },
      { chat: 'Could you perhaps clarify the most recent project deadline?', is_reply: true, time: '01:14 PM' },
      { chat: 'Yes, the deadline is scheduled for Friday of next week.', is_reply: true, time: '01:14 PM' },
      { chat: 'Is that timeline negotiable?', is_reply: false, time: '01:14 PM', user_name: 'Ronald', },
      { chat: 'I\'ll talk to the team about it.', is_reply: false, time: '01:14 PM', user_name: 'Jane', },
      { chat: 'I appreciate your quick attention to this.', is_reply: true, time: '01:14 PM' },
      { chat: 'Regards. Do you have any further questions?', is_reply: false, time: '01:14 PM', user_name: 'Darlene', }
    ]
  },
  {
    id: 2,
    group_name: 'Projects',
    group_profile: 'assets/images/blog/comment.jpg',
    group_members: [
      { user_name: 'Theresa', user_profile: 'assets/images/blog/4.jpg' },
      { user_name: 'Floyd', user_profile: 'assets/images/blog/12.png' },
      { user_name: 'Annette', user_profile: 'assets/images/blog/9.jpg' },
      { user_name: 'Darrell', user_profile: 'assets/images/blog/comment.jpg' },
      { user_name: 'Cameron', user_profile: 'assets/images/avatar/3.jpg' },
      { user_name: 'Darlene', user_profile: 'assets/images/avatar/4.jpg' },
    ],
    total_members: 40,
    message_time: '1:10 PM',
    last_message: 'Hey, What\'s up?'
  },
]

export const contacts: Contact[] = [
  {
    id: 1,
    user_name: 'Andres Williamson',
    user_profile: 'assets/images/avatar/3.jpg',
    contact_number: '191-900-5689',
  },
  {
    id: 2,
    user_name: 'Britlin Weed',
    user_profile: 'assets/images/blog/comment.jpg',
    contact_number: '698-781-5581',
  },
  {
    id: 3,
    user_name: 'Brendra Dixit',
    contact_number: '589-789-2563',
  },
  {
    id: 4,
    user_name: 'Cody Fisher',
    user_profile: 'assets/images/blog/14.png',
    contact_number: '983-333-4545',
  },
  {
    id: 5,
    user_name: 'Clifford Evans',
    contact_number: '321-456-7878',
  },
  {
    id: 6,
    user_name: 'Cameron Williamson',
    contact_number: '369-852-7417',
  },
  {
    id: 7,
    user_name: 'Darlene Robertson',
    user_profile: 'assets/images/blog/12.png',
    contact_number: '231-279-1001',
  },
  {
    id: 8,
    user_name: 'Dianne Russell',
    user_profile: 'assets/images/user/3.png',
    contact_number: '569-789-1002',
  },
  {
    id: 9,
    user_name: 'Darrell Steward',
    user_profile: 'assets/images/user/6.jpg',
    contact_number: '200-300-1030',
  },
  {
    id: 10,
    user_name: 'Emily Collins',
    user_profile: 'assets/images/user/1.jpg',
    contact_number: '100-555-7032',
  },
  {
    id: 11,
    user_name: 'Fiona Cooper',
    user_profile: 'assets/images/user/2.jpg',
    contact_number: '362-778-1919',
  },
  {
    id: 12,
    user_name: 'Freya Grayson',
    contact_number: '589-789-2563',
  },
  {
    id: 13,
    user_name: 'Gabriel Evans',
    contact_number: '963-147-5024',
  },
  {
    id: 14,
    user_name: '',
    contact_number: '963-147-5024',
  }
]

export const randomChats = ["Hi, how are you?", "Ohh... I can't understand what you trying to say. Sorry!", "I like to play games... But I don't know how to play!", "Sorry if my answers are not relevant. :))", "I feel sleepy! :("]
