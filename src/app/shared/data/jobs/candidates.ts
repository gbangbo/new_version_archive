import { Candidate, SelectCandidate } from "../../interface/jobs";

export const candidateList: Candidate[] = [
    {
        id: 1,
        img: "assets/images/user/12.png",
        class: "success",
        name: "Alexia Tran",
        label: "California, US",
        projects: "04",
        designation: "Mobile App Developer",
        salary: "10000-40000",
        experience: "Fresher",
        education: [
            {
                degree: "Bachelor's Degree 2021-2024",
            },
            {
                degree: "High School 2008-2020"
            }
        ],
        skills: [
            {
                name: "Objective-C",
                class: "primary"
            },
            {
                name: "React Native",
                class: "warning"
            },
            {
                name: "Kotlin",
                class: "secondary"
            }
        ]
    },
    {
        id: 2,
        img: "assets/images/dashboard-11/user/1.jpg",
        class: "success",
        name: "Anderson Porter",
        label: "Wales, UK",
        projects: "03",
        designation: "Back-End Developer",
        salary: "40000-80000",
        experience: "1 Year",
        education: [
            {
                degree: "Bachelor's Degree 2015-2018",
            },
            {
                degree: "High School 2003-2014"
            }
        ],
        skills: [
            {
                name: "Node.js",
                class: "primary"
            },
            {
                name: "Express",
                class: "success"
            },
            {
                name: "MongoDB",
                class: "secondary"
            },
            {
                name: "SQL",
                class: "warning"
            },
            {
                name: "Rest APIs",
                class: "danger"
            }
        ]
    },
    {
        id: 3,
        img: "assets/images/user/10.jpg",
        class: "success",
        name: "Avayah Ashley",
        label: "Hesse, Germany",
        projects: "02",
        designation: "Database Administrator",
        salary: "10000-40000",
        experience: "2+ Year",
        education: [
            {
                degree: "Bachelor's  2022-2025",
            },
            { 
                degree: "High School 2009-2021"
            }
        ],
        skills: [
            {
                name: "MySQL",
                class: "primary"
            },
            {
                name: "PostgreSQL",
                class: "warning"
            },
            {
                name: "Oracle",
                class: "secondary"
            }
        ]
    },
    {
        id: 4,
        img: "assets/images/dashboard/user/9.jpg",
        class: "success",
        name: "Brynlee Everett",
        label: "Victoria, Australia",
        projects: "04",
        designation: "Web Designer",
        salary: "20000-30000",
        experience: "1 Year",
        education: [
            {
                degree: "Bachelor's Degree 2013-2015",
            },
            {
                degree: "High School 2001-2012"
            }
        ],
        skills: [
            {
                name: "HTML",
                class: "primary"
            },
            {
                name: "CSS",
                class: "success"
            },
            {
                name: "JS",
                class: "secondary"
            },
            {
                name: "Jquery",
                class: "warning"
            },
            {
                name: "Bootstrap 5",
                class: "danger"
            },
            {
                name: "Figma",
                class: "info"
            }
        ]
    },
    {
        id: 5,
        img: "assets/images/dashboard/user/7.jpg",
        class: "success",
        name: "Carolyn Doyle",
        label: "Alberta, Canada",
        projects: "06",
        designation: "Network Engineer",
        salary: "120000-340000",
        experience: "2+ Year",
        education: [
            {
                degree: "Master's Degree 2012-2015",
            },
            {
                degree: "Bachelor's Degree 2009-2011",
            },
            {
                degree: "High School 2002-2008"
            }
        ],
        skills: [
            {
                name: "CCNA",
                class: "primary"
            },
            {
                name: "Linux",
                class: "warning"
            },
            {
                name: "OSCP",
                class: "secondary"
            }
        ]
    },
    {
        id: 6,
        img: "assets/images/dashboard/user/3.jpg",
        class: "primary",
        name: "Derek Pollard",
        label: "Bahia, Brazil",
        projects: "02",
        designation: "Project Manager",
        salary: "2000-3000",
        experience: "Fresher",
        education: [
            {
                degree: "Bachelor's Degree 2017-2019",
            },
            {
                degree: "High School 2003-2016"
            }
        ],
        skills: [
            {
                name: "Project Planning",
                class: "primary"
            },
            {
                name: "Agile",
                class: "warning"
            },
            {
                name: "Risk Management",
                class: "secondary"
            },
            {
                name: "Stakeholder Management",
                class: "success"
            }
        ]
    },
    {
        id: 7,
        img: "assets/images/dashboard-9/user/2.png",
        class: "warning",
        name: "Elina Huang",
        label: "Eastern Cape, Africa",
        projects: "02",
        designation: "Blockchain Developer",
        salary: "10000-40000",
        experience: "2+ Year",
        education: [
            {
                degree: "Master's Degree 2026-2028",
            },
            {
                degree: "Bachelor's Degree 2023-2025",
            },
            {
                degree: "High School 2011-2022"
            }
        ],
        skills: [
            {
                name: "Solidity",
                class: "primary"
            },
            {
                name: "Ethereum",
                class: "warning"
            },
            {
                name: "Smart Contracts",
                class: "secondary"
            },
            {
                name: "Hyperledger",
                class: "success"
            },
            {
                name: "Cryptography",
                class: "danger"
            }
        ]
    },
    {
        id: 8,
        img: "assets/images/dashboard/user/13.jpg",
        class: "success",
        name: "Karter Oliver",
        label: "Florida, US",
        projects: "09",
        designation: "Full-Stack Developer",
        salary: "10000-40000",
        experience: "8+ Year",
        education: [
            {
                degree: "Bachelor's Degree 2014-2016",
            },
            {
                degree: "High School 2005-2013"
            }
        ],
        skills: [
            {
                name: "HTML",
                class: "primary"
            },
            {
                name: "CSS",
                class: "warning"
            },
            {
                name: "JavaScript",
                class: "secondary"
            },
            {
                name: "Node.js",
                class: "success"
            }
        ]
    },
    {
        id: 9,
        img: "assets/images/user/14.png",
        class: "primary",
        name: "Kingston Bravo",
        label: "Bahia, Brazil",
        projects: "05",
        designation: "Digital Marketing Specialist",
        salary: "Under 1000",
        experience: "1 Year",
        education: [
            {
                degree: "Bachelor's Degree 2020-2022",
            },
            {
                degree: "High School 2007-2019"
            }
        ],
        skills: [
            {
                name: "Content Marketing",
                class: "primary"
            },
            {
                name: "Social Media",
                class: "warning"
            },
            {
                name: "Google Analytics",
                class: "secondary"
            },
            {
                name: "SEO",
                class: "success"
            }
        ]
    },
    {
        id: 10,
        img: "assets/images/dashboard/user/10.jpg",
        class: "warning",
        name: "Kylan Avalos",
        label: "Manitoba, Canada",
        projects: "01",
        designation: "Software Engineer",
        salary: "10000-40000",
        experience: "Fresher",
        education: [
            {
                degree: "Bachelor's Degree 2021-2023",
            },
            {
                degree: "High School 2006-2020"
            }
        ],
        skills: [
            {
                name: "Python",
                class: "primary"
            },
            {
                name: "Agile Methodologies",
                class: "warning"
            },
            {
                name: "Git",
                class: "secondary"
            },
            {
                name: "Java",
                class: "success"
            }
        ]
    },
    {
        id: 11,
        img: 'assets/images/dashboard/user/5.jpg',
        class: 'primary',
        name: 'Lucy Brock',
        label: 'Queensland, Australia',
        projects: '05',
        designation: 'AI/ML Engineer',
        salary: '$10000-$40000',
        experience: 'Fresher',
        education: [
            {
                degree: "Bachelor's Degree 2018-2020",
            },
            {
                degree: "High School 2004-2017"
            }
        ],
        skills: [
            {
                name: 'Keras',
                class: 'primary'
            },
            {
                name: 'TensorFlow',
                class: 'warning'
            },
            {
                name: 'TensorFlow',
                class: 'secondary'
            }
        ]
    },
    {
        id: 12,
        img: 'assets/images/dashboard/user/6.jpg',
        class: 'secondary',
        name: 'Margo Harrell',
        label: 'Texas, US',
        projects: '03',
        designation: 'Software Engineer',
        salary: '$40000-$80000',
        experience: 'Fresher',
        education: [
            {
                degree: "Bachelor's Degree 2011-2013",
            },
            {
                degree: "High School 2009-2010"
            }
        ],
        skills: [
            {
                name: 'Java',
                class: 'primary'
            },
            {
                name: 'Kotlin',
                class: 'warning'
            },
            {
                name: '.NET',
                class: 'secondary'
            }
        ]
    },
    {
        id: 13,
        img: 'assets/images/user/6.jpg',
        class: 'success',
        name: 'Miles Ibarra',
        label: 'Zhejiang, China',
        projects: '01',
        designation: 'IT Support Specialist',
        salary: 'Under $1000',
        experience: '2+ Year',
        education: [
            {
                degree: "Bachelor's Degree 2012-2014",
            },
            {
                degree: "High School 2000-2011"
            }
        ],
        skills: [
            {
                name: 'Networking',
                class: 'primary'
            },
            {
                name: 'Customer Support',
                class: 'warning'
            },
            {
                name: 'Troubleshooting',
                class: 'secondary'
            }
        ]
    },
    {
        id: 14,
        img: 'assets/images/user/14.png',
        class: 'primary',
        name: 'Kingston Bravo',
        label: 'Bahia, Brazil',
        projects: '05',
        designation: 'Digital Marketing Specialist',
        salary: 'Under 1000',
        experience: '1 Year',
        education: [
            {
                degree: "Bachelor's Degree 2020-2022",
            },
            {
                degree: "High School 2007-2019"
            }
        ],
        skills: [
            {
                name: 'Content Marketing',
                class: 'primary'
            },
            {
                name: 'Social Media',
                class: 'warning'
            },
            {
                name: 'Google Analytics',
                class: 'secondary'
            },
            {
                name: 'SEO',
                class: 'success'
            }
        ]
    },
    {
        id: 15,
        img: 'assets/images/user/3.png',
        class: 'secondary',
        name: 'Nadia Choi',
        label: 'Manitoba, Canada',
        projects: '02',
        designation: 'Quality Assurance Tester',
        salary: '$120000-$340000',
        experience: '9+ Year',
        education: [
            {
                degree: "Bachelor's Degree 2006-2008",
            },
            {
                degree: "High School 1995-2005"
            }
        ],
        skills: [
            {
                name: 'Bug Tracking',
                class: 'primary'
            },
            {
                name: 'Text Cases',
                class: 'warning'
            },
            {
                name: 'Selenium',
                class: 'secondary'
            }
        ]
    },
    {
        id: 16,
        img: 'assets/images/dashboard-9/user/1.png',
        class: 'success',
        name: 'Rome Gordon',
        label: 'Wales, UK',
        projects: '03',
        designation: 'UX/UI Designer',
        salary: '$40000-$80000',
        experience: '1 Year',
        education: [
            {
                degree: "Bachelor's Degree 2022-2024",
            },
            {
                degree: "High School 2010-2021"
            }
        ],
        skills: [
            {
                name: 'Adobe XD',
                class: 'primary'
            },
            {
                name: "S",
                class: "warning"
            },
            {
                name: "Figma",
                class: "secondary"
            },
            {
                name: "Prototyping",
                class: "success"
            },
            {
                name: "User Researching",
                class: "danger"
            }
        ]
    },
    {
        id: 17,
        img: 'assets/images/dashboard-9/user/4.png',
        class: 'primary',
        name: 'Rosie Myers',
        label: 'Tokyo, Japan',
        projects: '01',
        designation: 'Network Engineer',
        salary: '$120000-$340000',
        experience: '5+ Year',
        education: [
            {
                degree: "Master's Degree 2024-2026",
            },
            {
                degree: "Bachelor's Degree 2021-2023",
            },
            {
                degree: "High School 2008-2020",
            },

        ],
        skills: [
            {
                name: "CISCO",
                class: "primary"
            },
            {
                name: "Switching",
                class: "warning"
            },
            {
                name: "Network Security",
                class: "secondary"
            }
        ]
    },
    {
        id: 18,
        img: 'assets/images/dashboard/user/7.jpg',
        class: 'secondary',
        name: 'Sydney McMillan',
        label: 'Mpumalanga, Africa',
        projects: '03',
        designation: 'Quality Assurance Tester',
        salary: '$10000-$40000',
        experience: '2+ Year',
        education: [
            {
                degree: "Bachelor's Degree 2018-2020",
            },
            {
                degree: "High School 2004-2017"
            }
        ],
        skills: [
            {
                name: "Bug Tracking",
                class: "primary"
            },
            {
                name: "That Ca",
                class: "warning"
            },
            {
                name: "JUnit",
                class: "secondary"
            },
            {
                name: "Selenium",
                class: "success"
            }
        ]
    },
    {
        id: 19,
        img: 'assets/images/dashboard-9/user/5.png',
        class: 'success',
        name: 'Warren Buck',
        label: 'Beijing, China',
        projects: '06',
        designation: 'DevOps Engineer',
        salary: '$120000-$340000',
        experience: '3+ Year',
        education: [
            {
                degree: "Bachelor's Degree 2009-2012",
            },
            {
                degree: "High School 1999-2008"
            }
        ],
        skills: [
            {
                name: "Docker",
                class: "primary"
            },
            {
                name: "Kubemates",
                class: "warning"
            },
            {
                name: "Jenkins",
                class: "secondary"
            },
            {
                name: "CI/CD",
                class: "danger"
            }
        ]
    },
    {
        id: 20,
        img: 'assets/images/dashboard/user/1.jpg',
        class: 'primary',
        name: 'Yasmin Collins',
        label: 'Illinois, US',
        projects: '12',
        designation: 'Game Developer',
        salary: '$10000-$40000',
        experience: '3+ Year',
        education: [
            {
                degree: "Bachelor's Degree 2013-2015",
            },
            {
                degree: "High School 2002-2012"
            }
        ],
        skills: [
            {
                name: "Game Design",
                class: "primary"
            },
            {
                name: "C",
                class: "warning"
            },
            {
                name: "CA",
                class: "secondary"
            },
            {
                name: "Unity",
                class: "success"
            }
        ]
    }
]

export const filterCandidate: SelectCandidate[] =[
    {
        title: 'Location',
        item: [
            {
                value: 'australia',
                label: 'Australia'
            },
            {
                value: 'japan',
                label: 'Japan'
            },
            {
                value: 'brazil',
                label: 'Brazil'
            },
            {
                value: 'egypt',
                label: 'Egypt'
            },
            {
                value: 'india',
                label: 'India'
            },
            {
                value: 'norway',
                label: 'Norway'
            },
            {
                value: 'spain',
                label: 'Spain'
            },
        ]
    },
    {
        title: 'Skills',
        item: [
            {
                value: 'senior_data_scientist',
                label: 'Senior Data Scientist'
            },
            {
                value: 'web_designer',
                label: 'Web Designer'
            },
            {
                value: 'software_engineer',
                label: 'Software Engineer'
            },
            {
                value: 'wordpress_developer',
                label: 'Wordpress Developer'
            },
            {
                value: 'ui/ux_designer',
                label: 'UI/UX Designer'
            },
        ]
    },
    {
        title: 'Salary',
        item: [
            {
                value: 'Under $1000',
                label: 'Under $1000'
            },
            {
                value: '$2000-3000',
                label: '$2000-3000'
            },
            {
                value: '$4000-8000',
                label: '$4000-8000'
            },
            {
                value: '$10000-40000',
                label: '$10000-40000'
            },
            {
                value: '$120000-$340000',
                label: '$120000-$340000'
            },
        ]
    },
    {
        title: 'Experience',
        item: [
            {
                value: 'Fresher',
                label: 'Fresher'
            },
            {
                value: '1-2 Years',
                label: '1-2 Years'
            },
            {
                value: '3-5 Years',
                label: '3-5 Years'
            },
            {
                value: '6-10 Years',
                label: '6-10 Years'
            },
            {
                value: '16+ Years',
                label: '16+ Years'
            },
        ]
    },
]