import { Select2Data } from "ng-select2-component";
import { Task } from "../interface/tasks";

export const tasks: Task[] = [
    {
        id: 1,
        task_name: "Client Information",
        task_details: "Update and confirm the client's contact details",
        due_date: "11 Aug, 2019",
        assign_to: [
            { name: 'Alexis Taylor', profile: 'assets/images/dashboard/user/10.jpg' },
            { name: 'Andrew Price', profile: 'assets/images/dashboard/user/11.jpg' }
        ],
        status: "On Hold",
        importance: "Low",
    },
    {
        id: 2,
        task_name: "Cloud Based Integration",
        task_details: "Connect services to cloud computing environments.",
        due_date: "05 Jun, 2023",
        assign_to: [
            { name: 'Jett Maverick' } 
        ],
        status: "Completed",
        importance: "Medium",
    },
    {
        id: 3,
        task_name: "Create Monthly Reports",
        task_details: "Compile and evaluate performance data on a monthly basis.",
        due_date: "25 Dec, 2021",
        assign_to: [
            { name: 'Jasper Nightingale', profile: 'assets/images/dashboard/user/4.jpg' },
            { name: 'Seraphina Evergreen' }
        ],
        status: "In Progress",
        importance: "High",
    },
    {
        id: 4,
        task_name: "Data Restore",
        task_details: "Plan and carry out data backup operations.",
        due_date: "14 Feb, 2022",
        assign_to: [
            { name: 'Thomas Jones' }
        ],
        status: "Pending",
        importance: "High",
    },
    {
        id: 5,
        task_name: "Data Transfer",
        task_details: "Securely transfer data across systems",
        due_date: "28 Mar, 2022",
        assign_to: [
            { name: 'Atlas Stone', profile: 'assets/images/user/12.png' },
            { name: 'Oceana Meridian', profile: 'assets/images/user/10.jpg' },
        ],
        status: "Completed",
        importance: "Medium",
    },
    {
        id: 6,
        task_name: "Disaster Recovery",
        task_details: "Create and evaluate backup strategies.",
        due_date: "20 Feb, 2018",
        assign_to: [
            { name: 'Xander Wilde' },
            { name: 'Charles Rodriguez', profile: 'assets/images/dashboard-11/user/5.jpg' }
        ],
        status: "Pending",
        importance: "High",
    },
    {
        id: 7,
        task_name: "Email Configuration",
        task_details: "Create and manage email accounts",
        due_date: "20 Apr, 2017",
        assign_to: [
            { name: 'Jenny Wilson', profile: 'assets/images/dashboard/user/2.jpg' },
            { name: 'Olivia Gor', profile: 'assets/images/dashboard/user/13.jpg' }
        ],
        status: "In Progress",
        importance: "Low",
    },
    {
        id: 8,
        task_name: "Handle Social Media",
        task_details: "Keep an eye on and update the company's social media accounts",
        due_date: "20 Nov, 2021",
        assign_to: [
            { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/7.jpg' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' },
            { name: 'Emily Park' }
        ],
        status: "Completed",
        importance: "Medium",
    },
    {
        id: 9,
        task_name: "Market Analysis",
        task_details: "Compile and evaluate market trends for the industry.",
        due_date: "09 Dec, 2018",
        assign_to: [
            { name: 'Levine Raven', profile: 'assets/images/dashboard-11/user/2.jpg' }
        ],
        status: "Completed",
        importance: "High",
    },
    {
        id: 10,
        task_name: "Monitor Inventory",
        task_details: "Track and reorder office supplies as needed",
        due_date: "18 Mar, 2022",
        assign_to: [
            { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/12.jpg' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-9/user/2.png' },
            { name: 'Dashiell Wolfe', profile: 'assets/images/dashboard-9/user/5.png' }
        ],
        status: "On Hold",
        importance: "Medium",
    },
    {
        id: 11,
        task_name: "Monitoring Performance",
        task_details: "Analyse and improve system performance measures.",
        due_date: "25 Apr, 2019",
        assign_to: [
            { name: 'Karen Jones' },
            { name: 'Elizabeth Williams', profile: 'assets/images/dashboard-9/user/3.png' },
        ],
        status: "On Hold",
        importance: "Low",
    },
    {
        id: 12,
        task_name: "Optimizing Performance",
        task_details: "Optimize system and application performance",
        due_date: "11 Sep, 2019",
        assign_to: [
            { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/10.jpg' },
        ],
        status: "Pending",
        importance: "Low",
    },
    {
        id: 13,
        task_name: "Payroll processing",
        task_details: "Pay employees appropriately after doing the calculations",
        due_date: "02 Feb, 2020",
        assign_to: [
            { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/3.jpg' },
        ],
        status: "Pending",
        importance: "High",
    },
    {
        id: 14,
        task_name: "Plan Office Events",
        task_details: "Organize company events and team-building activities",
        due_date: "22 Jan, 2024",
        assign_to: [
            { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/10.jpg' },
            { name: 'Gray Curran', profile: 'assets/images/dashboard-11/user/9.jpg' },
            { name: 'Yarrow Wix' } 
        ],
        status: "In Progress",
        importance: "Medium",
    },
    {
        id: 15,
        task_name: "Response to Incidents",
        task_details: "Respond to and fix situations involving IT security",
        due_date: "18 Feb, 2022",
        assign_to: [
            { name: 'Linda Brown' },
            { name: 'Jessica Anderson', profile: 'assets/images/dashboard-11/user/8.jpg' }
        ],
        status: "On Hold",
        importance: "Low",
    },
    {
        id: 16,
        task_name: "Security Evaluation",
        task_details: "Make sure your security audit is complete",
        due_date: "18 Apr, 2023",
        assign_to: [
            { name: 'Daxton Creed' }
        ],
        status: "On Hold",
        importance: "Medium",
    },
    {
        id: 17,
        task_name: "System Records",
        task_details: "System and procedure documentation is recommended",
        due_date: "29 Dec, 2022",
        assign_to: [
            { name: 'Zenith Nova' },
            { name: 'Sarah Hernandez', profile: 'assets/images/dashboard-11/user/6.jpg' }
        ],
        status: "In Progress",
        importance: "Low",
    },
    {
        id: 18,
        task_name: "Technical Assistance",
        task_details: "Assist with technical questions and problems.",
        due_date: "06 Nov, 2020",
        assign_to: [
            { name: 'Caleb Rivera', profile: 'assets/images/dashboard/user/12.jpg' }
        ],
        status: "Completed",
        importance: "Low",
    },
    {
        id: 19,
        task_name: "Upgrades to Hardware",
        task_details: "Set up and install fresh hardware parts.",
        due_date: "12 Feb, 2018",
        assign_to: [
            { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/2.jpg' },
            { name: 'Karen Moore' }
        ],
        status: "In Progress",
        importance: "Medium",
    },
    {
        id: 20,
        task_name: "Upkeep of Servers",
        task_details: "Carry out regular upgrades and server checks",
        due_date: "25 Oct, 2020",
        assign_to: [
            { name: 'Gray Curran', profile: 'assets/images/dashboard-11/user/9.jpg' },
            { name: 'Yarrow Wix' }
        ],
        status: "Pending",
        importance: "Low",
    }
]

export const taskStatus: Select2Data = [
    {
        value: 'Pending',
        label: 'Pending'
    },
    {
        value: 'In Progress',
        label: 'In Progress'
    },
    {
        value: 'On Hold',
        label: 'On Hold'
    },
    {
        value: 'Completed',
        label: 'Completed'
    }
]

export const taskImportance: Select2Data = [
    {
        value: 'Low',
        label: 'Low'
    },
    {
        value: 'Medium',
        label: 'Medium'
    },
    {
        value: 'High',
        label: 'High'
    }
]

export const teamMembers: Select2Data = [
    { value: 'Gabriela Wright', label: 'Gabriela Wright' },
    { value: 'Chase Russo', label: 'Chase Russo' },
    { value: 'Ryland House', label: 'Ryland House' },
    { value: 'Fabian Leonard', label: 'Fabian Leonard' },
    { value: 'Layne Hayden', label: 'Layne Hayden' },
    { value: 'Clare Truong', label: 'Clare Truong' },
    { value: 'Shiloh Turner', label: 'Shiloh Turner' },
    { value: 'Miller Dickerson', label: 'Miller Dickerson' },
    { value: 'Jaylee Rios', label: 'Jaylee Rios' },
    { value: 'Anna Sandoval', label: 'Anna Sandoval' },
    { value: 'Gracie Ryan', label: 'Gracie Ryan' },
    { value: 'Zayne Olson', label: 'Zayne Olson' }
]