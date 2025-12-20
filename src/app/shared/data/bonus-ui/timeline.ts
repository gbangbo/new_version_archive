import { AnimatedTimeline } from "../../interface/bonus-ui/bonus-ui";
import { HorizontalTimeline } from "../../interface/bonus-ui/bonus-ui";

export const animatedTimeline: AnimatedTimeline[] = [
    {
        year: 2024,
        events: [
            {
                id: 1,
                title: "Project Cuba",
                description: "The goal of this January initiative was to enhance the online theme experience for customers."
            },
            {
                id: 2,
                title: "Development",
                description: "Marked the beginning of the development phase."
            },
            {
                id: 3,
                title: "Launch Theme",
                description: "Official launch and ongoing quality control checks."
            }
        ]
    },
    {
        year: 2023,
        events: [
            {
                id: 4,
                title: "Mofi Goal",
                description: "Project Mofi was introduced in May with the goal of improving tools for internal communication."
            },
            {
                id: 5,
                title: "Planning",
                description: "Creating a team and planning the project."
            },
            {
                id: 6,
                title: "Training",
                description: "Training sessions and rollout to all workers."
            }
        ]
    },
    {
        year: 2022,
        events: [
            {
                id: 7,
                title: "Goal",
                description: "The goal of Project Tivo, which was introduced in January, is to improve consumer interaction through a mobile app."
            },
            {
                id: 8,
                title: "Project Launch",
                description: "Market study and project launch in January."
            },
            {
                id: 9,
                title: "Official App",
                description: "Marketing campaign and official app launch."
            }
        ]
    },
    {
        year: 2021,
        events: [
            {
                id: 10,
                title: "Project Zeta",
                description: "Dedicated to improving cybersecurity, it was launched in August."
            },
            {
                id: 11,
                title: "Vulnerability Analysis",
                description: "Vulnerability analysis and security audit and the application of improved security protocols."
            },
            {
                id: 12,
                title: "Program",
                description: "Programmes for employees and ongoing observation."
            }
        ]
    }
];

export const basicTimeline = [
    {
        dot_class: 'primary',
        date: '2 Feb 2024',
        time: '7:00 AM',
        title: 'Conference with client',
        description: 'At noon today, there will be a meeting with a UK client.',
    },
    {
        dot_class: 'secondary',
        date: '22 March 2024',
        time: '3:45 PM',
        title: 'Discussion with marketing Team',
        description: 'discussion with the marketing staff on the success of the most recent project',
    },
    {
        dot_class: 'success',
        date: '16 May 2024',
        time: '1:22 AM',
        title: 'Invest in a new hosting plan',
        description: 'today at 2 pm AM, purchase a new hosting package as agreed upon with the management team.',
    },
    {
        dot_class: 'warning',
        date: '23 Nov 2024',
        time: '6:56 AM',
        title: 'Discussion with designer team',
        description: 'discussion with the designer employee on the success of the most recent project.',
    },
    {
        dot_class: 'info',
        date: '12 Dec 2024',
        time: '12:05 AM',
        title: 'Discussion with new theme launch',
        description: 'discussion with the how many themes made in our portfolio.',
    },
    {
        dot_class: 'danger',
        date: '02 Jan 2024',
        time: '6:56 AM',
        title: 'Purchase new chairs for office ',
        description: 'online purchase new chairs for office',
    }
]

export const variationTimeline = [
    {
        class: 'primary',
        date: '8th March, 2024',
        time: '1 day ago',
        title: 'Updated Product',
        description: 'Key milestones throughout history...'
    },
    {
        class: 'warning',
        date: '5th Feb, 2024',
        time: 'Today',
        title: 'Added Bew Items',
        description: 'Timeline showcasing historical events...',
        details: [
            {
                image: 'assets/images/dashboard-2/product/1.png',
                alt: 'chair'
            },
            {
                image: 'assets/images/dashboard-2/product/2.png',
                alt: 'chair'
            },
            {
                image: 'assets/images/dashboard-2/product/3.png',
                alt: 'men t-shirt'
            },
        ]
    },
    {
        class: 'secondary',
        date: '20th Jan, 2024 ',
        time: '12:00 PM',
        title: 'Tello just like your product',
        description: 'Explore a chronological journey through...'
    },
]

export const horizontalTimeline: HorizontalTimeline[] = [
    {
        id: 1,
        ul_class: 'timeline-border',
        vertical_line: "bottom",
        details: [
            {
                div_class: 'col-span-4 xxl:col-span-6 sm:col-span-12',
                color_class: 'secondary',
                date: '1 Jan',
                title: 'Conference',
                description: 'Conferences are intended to bring individuals with similar interests together to discuss problems.',
                class: 'read-more-btn'
            },
            {
                div_class: 'col-span-4 xxl:col-span-6 sm:col-span-12',
                color_class: 'primary',
                date: '4 Feb',
                title: 'Meet-up',
                description: 'You may connect with males from all around the world using the friend-forward.',
                class: 'read-more-btn'
            },
            {
                div_class: 'col-span-4 xxl:col-span-12 horizontal-timeline',
                color_class: 'secondary',
                date: '22 March',
                title: 'Meeting',
                description: 'If several languages coalesce the grammar of the resulting simple and regular social networking platform.',
                class: 'read-more-btn'
            }
        ]
    },
    {
        id: 2,
        ul_class: 'border-0',
        vertical_line: "top",
        details: [
            {
                div_class: 'col-span-4 xxl:col-span-6 sm:col-span-12',
                color_class: 'primary',
                date: '4 Jan',
                title: 'Conference',
                description: 'A gathering of two or more people to talk about issues of interest.',
            },
            {
                div_class: 'col-span-4 xxl:col-span-6 sm:col-span-12',
                color_class: 'secondary',
                date: '22 March',
                title: 'Meeting',
                description: 'If several languages coalesce the grammar of the resulting simple and regular social networking platform.',
            },
            {
                div_class: 'col-span-4 xxl:col-span-12 horizontal-timeline',
                color_class: 'primary',
                date: '7 Dec',
                title: 'Launch Theme',
                description: 'Responsive Website is the approach that suggests website design and development should respond.',
            }
        ]
    }
]

export const halfRoundedTimeline = [
    {
        type: 'left',
        date: '15 Dec',
        icon: 'solid fa-house',
        badge_class: 'danger',
        badge: 'app-ideas',
        title: 'Established new the app-ideas repository.',
        description: '  developers who are just beginning their learning process. those who often concentrate on developing programmes with a user interface.'
    },
    {
        type: 'right',
        date: '22 Oct',
        icon: 'solid fa-code-fork',
        badge_class: 'warning',
        badge: 'Blog',
        title: 'Implemented the program for weekly code challenges.',
        description: 'You can improve your understanding of programming and problem-solving techniques by taking on challenges.'
    },
    {
        type: 'left',
        date: '10 Jul',
        icon: 'brands fa-tencent-weibo',
        badge_class: 'primary',
        badge: 'Designer',
        title: 'Research about most recent design trends.',
        description: 'With our extensive analysis of the most recent design trends, discover the cutting edge of web aesthetics.'
    },
    {
        type: 'right',
        date: '18 May',
        icon: 'brands fa-modx',
        badge_class: 'success',
        badge: 'Latest',
        title: 'Freelance UX designer',
        description: 'Our professionals improve the usability and engagement of your website by creating user-friendly interfaces and user-centered designs, resulting in an unmatched online experience.'
    },
    {
        type: 'left',
        date: '10 Feb',
        icon: 'regular fa-file-audio',
        badge_class: 'primary',
        badge: 'Audio testing',
        title: 'Musical trends and predictability',
        description: "So, the next time you listen to music, you might or might not consider how it's actively altering your mood.",
        audio: true
    },
    {
        type: 'right',
        date: '01 Jan',
        icon: 'solid fa-user group',
        badge_class: 'success',
        badge: 'Meet-up',
        title: "Web-designer's meet-up",
        description: 'Find nearby web designers to network with! A Web Design Meetup is a place where you can discuss tools. '
    },
]

export const hoveringTimeline = [
    {
        event: 'January 2024- Annual Function',
        title: 'Location',
        text: 'Largo Febo,10225012-Calvisano BS',
        description: "What a dynamic performance by the eighth-grade students, Let's welcome the ninth-grade kid to the stage."
    },
    {
        event: 'March 2024 - Fresher Interview',
        title: 'Ofwrrior Company',
        text: "A fresher's interview is to be conducted",
        list: true
    },
    {
        event: 'December 2024 - Meetup',
        title: 'US Meeting',
        text: "2209 Leverton Cove RoadSpringfield, MA 01109",
        profile: [
            {
                image: 'assets/images/avatar/4.jpg',
                name: 'Lillian J. Goodfellow',
                contact_number: '239-664-7751'
            },
            {
                image: 'assets/images/avatar/7.jpg',
                name: 'Carolyn A. Sutton',
                contact_number: '218-793-6609'
            }
        ]
    },
]