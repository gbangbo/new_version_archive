import { Select2Data } from "ng-select2-component";
import { Tabs } from "../interface/common";
import { User, Users, Notification, Role, Module } from "../interface/user";

export const user: User = {
  name: 'Emay Walter',
  user_profile: 'assets/images/dashboard/profile.png',
  user_email: 'emaywalter@jourrapide.com',
  addresses: [
    {
      id: 1,
      address: '2211 Fruitville Rd, Sarasota, Florida, US',
      pin_code: '34237',
      contact: '+1 3215643789',
      tag: 'Home'
    },
    {
      id: 2,
      address: '1531 E 23rd St S, Independence, Mississippi, US',
      pin_code: '64055',
      contact: '+1 252450089',
      tag: 'Office'
    }
  ]
}

export const users: Users[] = [
  {
    id: 1,
    user_name: "reichel.douglas",
    name: "Reichel Douglas",
    user_profile: "assets/images/user/7.jpg",
    designation: "UX/UI Designer",
    bio: "I design intuitive and engaging user interfaces. My goal is to create seamless user experiences with a strong focus on usability.",
    email: "reichel.douglas@example.com",
    DOB: "20 September 1975",
    contact_number: "+4445556666",
    location: "Rome, Italy",
    post: 460,
    followers: 2000,
    following: 547,
    role: "Community Manager",
    status: "active",
    creation_date: "18 February 2020,11:00 PM"
  },
  {
    id: 2,
    user_name: "mark.jeco",
    name: "Mark Jecno",
    user_profile: "assets/images/avatar/3.jpg",
    designation: "Full Stack Developer",
    bio: "I develop both the front-end and back-end of web applications. My expertise lies in creating scalable, high-performance systems.",
    email: "mark.jeco@example.com",
    DOB: "10 November 1990",
    contact_number: "+9876543210",
    location: "San Francisco, CA",
    post: 875,
    followers: 12000,
    following: 1400,
    role: "Subscribers",
    status: "active",
    creation_date: "15 Feb 2023,03:15 PM"
  },
  {
    id: 3,
    user_name: "john.dev",
    name: "John Dev",
    user_profile: "assets/images/avatar/11.jpg",
    designation: "Digital Marketing Strategist",
    bio: "I craft digital marketing strategies to grow businesses online. My approach blends creativity and data-driven insights to achieve success.",
    email: "john.dev@example.com",
    DOB: "12 March 1988",
    contact_number: "+5551234567",
    location: "London, UK",
    post: 1274,
    followers: 15000,
    following: 1874,
    role: "Admin",
    status: "active",
    creation_date: "08 Nov 2021,09:00 AM"
  },
  {
    id: 4,
    user_name: "deo.johan",
    name: "Johan Deo",
    user_profile: "assets/images/avatar/16.jpg",
    designation: "Freelance Web Developer",
    bio: "I build responsive, user-friendly websites with modern technologies. I focus on providing fast and interactive user experiences.",
    email: "deo.johan@example.com",
    DOB: "25 May 1992",
    contact_number: "+1112223333",
    location: "Paris, France",
    post: 500,
    followers: 8000,
    following: 570,
    role: "Content Editors",
    status: "pending",
    creation_date: "04 July 2023,05:45 PM"
  },
  {
    id: 5,
    user_name: "brookly.simmons",
    name: "Brooklyn Simmons",
    user_profile: "assets/images/dashboard-5/profile.png",
    designation: "Data Scientist",
    bio: "I analyze and interpret complex data to help organizations make data-driven decisions. My goal is to unlock insights that drive growth.",
    email: "brookly.simmons@example.com",
    DOB: "02 January 2000",
    contact_number: "+1234567890",
    location: "New York, USA",
    post: 1908,
    followers: 34000,
    following: 897,
    role: "Consumer",
    status: "active",
    creation_date: "30 Jan 2024,07:28 AM"
  },
  {
    id: 6,
    user_name: "lisa.lillian",
    name: "Lisa Lillian",
    user_profile: "assets/images/avatar/4.jpg",
    designation: "Front-End Developer",
    bio: "I specialize in building beautiful, responsive user interfaces. My passion lies in making web applications accessible and engaging.",
    email: "lisa.lillian@example.com",
    DOB: "15 June 1985",
    contact_number: "+7778889999",
    location: "Tokyo, Japan",
    post: 350,
    followers: 3500,
    following: 822,
    role: "Registered Users",
    status: "pending",
    creation_date: "10 September 2024,08:15 AM"
  },
  {
    id: 7,
    user_name: "rose.olivia",
    name: "Rose Olivia",
    user_profile: "assets/images/user/1.jpg",
    designation: "Music App Developer",
    bio: "I develop music streaming applications, providing users with an easy and enjoyable way to discover new music. Technology meets creativity in my work.",
    email: "rose.olivia@example.com",
    DOB: "18 January 1998",
    contact_number: "+3334445555",
    location: "Berlin, Germany",
    post: 868,
    followers: 1000,
    following: 742,
    role: "Vendor",
    status: "active",
    creation_date: "25 June 2021,12:30 PM"
  },
  {
    id: 8,
    user_name: "karen.sarah",
    name: "Karen Sarah",
    user_profile: "assets/images/user/2.png",
    designation: "Instructional Designer",
    bio: "I design engaging learning experiences and educational content. My focus is on creating user-centered learning programs for the digital space.",
    email: "karen.sarah@example.com",
    DOB: "05 April 1970",
    contact_number: "+2221110000",
    location: "Madrid, Spain",
    post: 972,
    followers: 2500,
    following: 864,
    role: "Consumer",
    status: "active",
    creation_date: "30 August 2019,04:00 PM"
  }
]

export const userRecentActivity = [
  {
    id: 1,
    title: 'Freelance Project Discussion',
    description: `<span class="c-o-light">worked hard with the client to make sure the design reflects their objectives and brand identity.</span><span class="c-o-light">Optimised the website for quicker loads by implementing a responsive layout.</span>`,
    date: '12th Feb, 2024',
    time: 'Today',
  },
  {
    id: 2,
    title: 'Brand Collaboration',
    description: `<span class="c-o-light">improved the user experience by using a sleek, contemporary style that matches the brand's urban, smart look.</span><span class="c-o-light">Multimedia components, including infographic and films, were used to improve user interaction and communicate the campaign's impact.</span>`,
    date: '12th Feb, 2024',
    time: '02:00 PM',
    images: [
      { image: 'assets/images/dashboard-2/order/sub-product/4.png', title: 'chair' },
      { image: 'assets/images/dashboard-2/order/sub-product/8.png', title: 'neckless' },
      { image: 'assets/images/dashboard-2/order/sub-product/11.png', title: 'slipper' },
      { image: 'assets/images/dashboard-2/order/sub-product/7.png', title: 'earings' },
      { image: 'assets/images/dashboard-2/order/sub-product/3.png', title: 'men t-shirt' },
      { image: 'assets/images/dashboard-2/order/sub-product/9.png', title: 'men shorts' }
    ]
  },
  {
    id: 3,
    title: 'Review of Project and Milestones',
    description: `<span class="c-o-light">Having the objective of developing an aesthetically attractive and intuitive e-commerce platform for "Multikart and Fastkart."</span><span class="c-o-light">This entails being aware of the target market, the brand's goal, and the particular features that the website must have.</span>`,
    date: '08th Feb, 2024',
    time: '5 days ago',
  },
  {
    id: 4,
    title: 'Wireframing Designs',
    description: `<span class="c-o-light mb-1">Any type of group project could have a central idea. Transfer information using the theme so that members of your team can comprehend it.</span>`,
    date: '05th Feb, 2024',
    time: '8 days ago',
    total_member: 12,
    members: [
      { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/11.jpg' },
      { name: 'Richard Taylor', profile: 'assets/images/dashboard-11/user/9.jpg' },
      { name: 'Manuel Gilmore' },
      { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/3.jpg' },
    ]
  }
]

export const activityColors: string[] = ['primary', 'warning'];

export const userDetailsTab: Tabs[] = [
  {
    id: 1,
    title: 'Recent Activity',
    value: 'activity',
    icon: 'fa-solid fa-timeline'
  },
  {
    id: 2,
    title: 'Tasks',
    value: 'task',
    icon: 'fa-solid fa-list-check'
  },
  {
    id: 3,
    title: 'Notifications',
    value: 'notification',
    icon: 'fa-regular fa-bell'
  },
  {
    id: 4,
    title: 'Settings',
    value: 'setting',
    icon: 'fa-solid fa-gears'
  }
]

export const notifications: Notification[] = [
  {
    id: 1,
    user_profile: 'assets/images/dashboard-11/user/12.jpg',
    title: 'Weekly check-in session arranged',
    description: 'August 30, 2024 at 10:00 AM has been set aside for the weekly check-in meeting.',
    time: '2h ago',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  },
  {
    id: 2,
    user_profile: 'assets/images/dashboard-11/user/1.jpg',
    title: 'Finishing the wireframing phase',
    description: 'High-fidelity mockups will be created by the design team.',
    time: '5h ago',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  },
  {
    id: 3,
    user_profile: 'assets/images/dashboard-11/user/5.jpg',
    title: 'Customer input received',
    description: 'Before august 25, 2024, the design team will deliver updated mockups.',
    time: '10h ago',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  },
  {
    id: 4,
    user_profile: 'assets/images/dashboard-11/user/2.jpg',
    title: 'Scheduled usability testing',
    description: 'We will collect user input and fix any problems found during the testing process.',
    date: '21 Jan'
  },
  {
    id: 5,
    user_profile: 'assets/images/dashboard-11/user/4.jpg',
    title: 'Meeting for the final client review',
    description: 'Reviewing the finished website and making any final tweaks before its official debut is the aim of the meeting.',
    date: '21 Jan'
  },
  {
    id: 6,
    user_profile: 'assets/images/dashboard-11/user/7.jpg',
    title: 'Confirmed date of website launch',
    description: 'Plans are in place to guarantee a successful and seamless launch.Keep checking back for further information.',
    date: '18 Feb'
  }
]

export const languages: Select2Data = [
  {
    value: 'english',
    label: 'English'
  },
  {
    value: 'french',
    label: 'French'
  },
  {
    value: 'gujarati',
    label: 'Gujarati'
  },
  {
    value: 'hindi',
    label: 'Hindi'
  },
  {
    value: 'japanese',
    label: 'Japanese'
  },
  {
    value: 'marathi',
    label: 'Marathi'
  },
  {
    value: 'russian',
    label: 'Russian'
  }
]

export const roles: Role[] = [
  {
    id: 1,
    role: 'Admin',
    creation_date: '10 Feb 2023, 01:12 PM',
    last_update_date: '15 Feb 2024, 08:21 AM',
    status: 'pending',
  },
  {
    id: 2,
    role: 'Community Manager',
    creation_date: '05 Mar 2024, 04:30 PM',
    last_update_date: '20 Apr 2024, 11:20 AM',
    status: 'active',
  },
  {
    id: 3,
    role: 'Consumer',
    creation_date: '21 Aug 2024, 11:18 PM',
    last_update_date: '05 Sep 2024, 06:25 AM',
    status: 'pending',
  },
  {
    id: 4,
    role: 'Content Editors',
    creation_date: '16 Apr 2024, 09:18 PM',
    last_update_date: '17 May 2024, 08:00 AM',
    status: 'active',
  },
  {
    id: 5,
    role: 'Registered Users',
    creation_date: '25 Dec 2024, 07:12 AM',
    last_update_date: '28 Jan 2024, 11:20 AM',
    status: 'active',
  },
  {
    id: 6,
    role: 'Subscribers',
    creation_date: '14 May 2024, 05:25 AM',
    last_update_date: '22 Jun 2024, 10:12 AM',
    status: 'active',
  },
  {
    id: 7,
    role: 'Translator',
    creation_date: '29 Feb 2024, 08:30 AM',
    last_update_date: '02 Mar 2024, 10:30 PM',
    status: 'active',
  },
  {
    id: 8,
    role: 'Unverified Users',
    creation_date: '18 Dec 2023, 09:00 PM',
    last_update_date: '20 Jan 2024, 05:05 PM',
    status: 'active',
  },
  {
    id: 9,
    role: 'Vendor',
    creation_date: '13 Jan 2024, 06:45 AM',
    last_update_date: '15 Feb 2024, 04:20 AM',
    status: 'active',
  }
]

export const permissions: Module[] = [
  {
    id: 1,
    name: 'Users',
    is_checked: false,
    module_permission: [
      { id: 1, permission_id: 1, name: 'Reader', is_checked: false, },
      { id: 2, permission_id: 2, name: 'Creator', is_checked: false, },
      { id: 3, permission_id: 3, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 2,
    name: 'Products',
    is_checked: false,
    module_permission: [
      { id: 4, permission_id: 4, name: 'Reader', is_checked: false, },
      { id: 5, permission_id: 5, name: 'Creator', is_checked: false, },
      { id: 6, permission_id: 6, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 3,
    name: 'FAQs',
    is_checked: false,
    module_permission: [
      { id: 7, permission_id: 7, name: 'Reader', is_checked: false, },
      { id: 8, permission_id: 8, name: 'Creator', is_checked: false, },
      { id: 9, permission_id: 9, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 4,
    name: 'Category',
    is_checked: false,
    module_permission: [
      { id: 10, permission_id: 10, name: 'Reader', is_checked: false, },
      { id: 11, permission_id: 11, name: 'Creator', is_checked: false, },
      { id: 12, permission_id: 12, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 5,
    name: 'Orders',
    is_checked: false,
    module_permission: [
      { id: 13, permission_id: 13, name: 'Reader', is_checked: false, },
      { id: 14, permission_id: 14, name: 'Creator', is_checked: false, },
      { id: 15, permission_id: 15, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 6,
    name: 'Projects',
    is_checked: false,
    module_permission: [
      { id: 16, permission_id: 16, name: 'Reader', is_checked: false, },
      { id: 17, permission_id: 17, name: 'Creator', is_checked: false, },
      { id: 18, permission_id: 18, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 7,
    name: 'Seller',
    is_checked: false,
    module_permission: [
      { id: 19, permission_id: 19, name: 'Reader', is_checked: false, },
      { id: 20, permission_id: 20, name: 'Creator', is_checked: false, },
      { id: 21, permission_id: 21, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 8,
    name: 'To-Do',
    is_checked: false,
    module_permission: [
      { id: 22, permission_id: 22, name: 'Reader', is_checked: false, },
      { id: 23, permission_id: 23, name: 'Creator', is_checked: false, },
      { id: 24, permission_id: 24, name: 'Delete', is_checked: false, }
    ]
  },
  {
    id: 9,
    name: 'Blog',
    is_checked: false,
    module_permission: [
      { id: 25, permission_id: 25, name: 'Reader', is_checked: false, },
      { id: 26, permission_id: 26, name: 'Creator', is_checked: false, },
      { id: 27, permission_id: 27, name: 'Delete', is_checked: false, }
    ]
  }
]