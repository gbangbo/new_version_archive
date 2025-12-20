import { EmailSidebar, Emails } from "../interface/email"

export const emailSidebar: EmailSidebar[] = [
  {
    id: 1,
    title: 'Inbox',
    value: 'inbox',
    icon: 'inbox',
  },
  {
    id: 2,
    title: 'Sent',
    value: 'sent',
    icon: 'sent',
  },
  {
    id: 3,
    title: 'Starred',
    value: 'starred',
    icon: 'star',
  },
  {
    id: 4,
    title: 'Draft',
    value: 'draft',
    icon: 'draft',
  },
  {
    id: 5,
    title: 'Trash',
    value: 'trash',
    icon: 'trash',
  }
]

export const emailTags = [
  {
    id: 1,
    title: 'Work',
    value: 'work',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Private',
    value: 'private',
    color: 'warning'
  },
  {
    id: 3,
    title: 'Support',
    value: 'support',
    color: 'success'
  }
]

export const emailTypes = [
  {
    id: 1,
    title: 'Important',
    value: 'important',
    icon: 'mail'
  },
  {
    id: 2,
    title: 'Social',
    value: 'social',
    icon: 'goal'
  },
  {
    id: 3,
    title: 'Promotion',
    value: 'promotion',
    icon: 'tread'
  }
]

export const emails: Emails[] = [
  {
    id: 1,
    user_name: "Marvin McKinney",
    user_profile: "assets/images/dashboard-11/user/1.jpg",
    email_title: "Our meeting scheduled for tomorrow at 3 PM",
    description: "New Here's a list of all the topic challenges...",
    tag: "project.zip",
    time: "2:30 PM",
    date: "Monday 25 Jun", 
    is_favorite: true,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'important',
    email: "marvin.mckinney@example.com"
  },
  {
    id: 2,
    user_name: "Brooklyn Simmons",
    user_profile: "assets/images/dashboard-11/user/4.jpg",
    email_title: "Control over user email accounts",
    description: "Control and direction of all email operations in one place",
    tag: "account_details.txt",
    time: "7:50 AM",
    date: "Wednesday 04 Jul", 
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'important',
    email: "brooklyn.simmons@example.com"
  },
  {
    id: 3,
    user_name: "Esther Howard",
    email_title: "Confirm your booking id",
    description: "Confirmation and information about your most recent reservation",
    tag: "task.doc",
    time: "1:00 PM",
    date: "Tuesday 25 Jun", 
    is_favorite: true,
    is_draft: true,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'social',
    email: "esther.howard@example.com"
  },
  {
    id: 4,
    user_name: "Cameron Williamson",
    email_title: "Verification link",
    description: "To activate your account, confirm your email",
    time: "5 Day ago",
    date: "Thursday 06 Jun", 
    is_favorite: true,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'promotion',
    email: "cameron.williamson@example.com"
  },
  {
    id: 5,
    user_name: "Ellison Dalton",
    user_profile: "assets/images/dashboard-11/user/12.jpg",
    email_title: "Notice of scheduled maintenance",
    description: "From 2:00 AM to 4:00 AM on May 24, 2024. There will be a system outage during this period",
    tag: "Maintenance.Zip",
    time: "7 April",
    is_favorite: false,
    is_draft: true,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'social',
    email: "ellison.dalton@example.com"
  },
  {
    id: 6,
    user_name: "Tristan Richmond",
    user_profile: "assets/images/dashboard-11/user/9.jpg",
    email_title: "Welcome to our new office",
    description: "Experience the cosiness, creativity, and teamwork that await you in our brand-new workspace.",
    time: "1 April",
    is_favorite: true,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'important',
    email: "tristan.richmond@example.com"
  },
  {
    id: 7,
    user_name: "Kelvin Schneider",
    user_profile: "assets/images/dashboard-9/user/5.png",
    email_title: "Your Order #224820098 has been confirmed",
    description: "We are happy to notify you that your recent order (#224820098) has been verified!",
    time: "1:00 PM",
    date: "Saturday 22 Jun", 
    is_favorite: false,
    is_draft: true,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'important',
    email: "kelvin.schneider@example.com"
  },
  {
    id: 8,
    user_name: "Ronald Richards",
    user_profile: "assets/images/dashboard-9/user/3.png",
    email_title: "Security notification: strange activity found",
    description: "Reviewing your account activity and taking the necessary precautions to secure your data is urgently required",
    tag: "Update_version.rar",
    time: "7 April",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'social',
    email: "ronald.richards@example.com"
  },
  {
    id: 9,
    user_name: "William Turner",
    email_title: "OTP verification link",
    description: "For the security of your account, your one-time password (OTP) is crucial. To confirm and safeguard your information, click",
    time: "5 Day ago",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'social',
    email: "william.turner@example.com"
  },
  {
    id: 10,
    user_name: "Jacob Jones",
    user_profile: "assets/images/dashboard-9/user/1.png",
    email_title: "Reminder for IT training workshop",
    description: "You have a great opportunity to improve your IT abilities and keep current with emerging trends and technology by attending this workshop",
    time: "1 April",
    is_favorite: false,
    is_draft: true,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'promotion',
    email: "jacob.jones@example.com"
  },
  {
    id: 11,
    user_name: "Ralph Edwards",
    user_profile: "assets/images/dashboard-9/user/2.png",
    email_title: "Your Order #5848000047 has been confirmed",
    description: "Prepare to enjoy the products you have chosen without any hassles",
    time: "1:00 PM",
    date: "Monday 01 Jul", 
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'important',
    email: "ralph.edwards@example.com"
  },
  {
    id: 12,
    user_name: "Jacob Jones",
    user_profile: "assets/images/dashboard-9/user/4.png",
    email_title: "Reminder for IT training workshop",
    description: "You have a great opportunity to improve your IT abilities and keep current with emerging trends and technology by attending this workshop",
    time: "1 April",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'important',
    email: "jacob.jones@example.com"
  },
  {
    id: 13,
    user_name: "Ronald Richards",
    user_profile: "assets/images/dashboard-11/user/2.jpg",
    email_title: "Security notification: strange activity found",
    description: "Reviewing your account activity and taking the necessary precautions to secure your data is urgently required",
    tag: "Update_version.rar",
    time: "7 April",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'social',
    email: "ronald.richards@example.com"
  },
  {
    id: 14,
    user_name: "Lacey Travis",
    user_profile: "assets/images/dashboard-11/user/3.jpg",
    email_title: "Your Order #5848000047 has been confirmed",
    description: "Prepare to enjoy the products you have chosen without any hassles",
    time: "1:00 PM",
    date: "Tuesday 02 Jul", 
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: true,
    email_type: 'promotion',
    email: "lacey.travis@example.com"
  },
  {
    id: 15,
    user_name: "Darlene Robertson",
    user_profile: "assets/images/dashboard-11/user/8.jpg",
    email_title: "Promotion Mail",
    description: "Find special offers & Exclusive offers! for a short time only!",
    tag: "Import File..",
    time: "4 April",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'promotion',
    email: "darlene.robertson@example.com"
  },
  {
    id: 16,
    user_name: "Cameron Williamson",
    email_title: "Special Deal: Save 20% on Your Next Purchase!",
    description: "Use the coupon code SAVE20 at the register to get your savings.",
    time: "5 Day ago",
    is_favorite: true,
    is_draft: true,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'important',
    email: "cameron.williamson@example.com"
  },
  {
    id: 17,
    user_name: "Mccoy Ballard",
    user_profile: "assets/images/dashboard-11/user/11.jpg",
    email_title: "Security notification: strange activity found",
    description: "Reviewing your account activity and taking the necessary precautions to secure your data is urgently required",
    tag: "Update_version.rar",
    time: "7 April",
    is_favorite: false,
    is_draft: false,
    is_trash: false,
    is_read: false,
    is_send: false,
    email_type: 'social',
    email: "mccoy.ballard@example.com"
  }
]

