import { CompanyDetails, jobFilterCompany } from "../../interface/jobs"

export const companiesSidebar: jobFilterCompany[] = [
    {
        id: 1,
        title: 'Industry',
        details: [
            {
                id: 1,
                title: 'Media & Entertainment',
                check_id: 'chk-ani',
                badge: true,
                badge_text: '04'
            },
            {
                id: 2,
                title: 'Chemical Industry',
                check_id: 'chk-ani',
                badge: true,
                badge_text: '01'
            },
            {
                id: 3,
                title: 'Civil Industry',
                check_id: 'chk-ani2',
                badge: true,
                badge_text: '01'
            },
            {
                id: 4,
                title: 'IT Consulting & Services',
                check_id: 'chk-ani3',
                badge: true,
                badge_text: '35'
            },
            {
                id: 5,
                title: 'Healthcare Technology',
                check_id: 'chk-ani4',
                badge: true,
                badge_text: '10'
            },
            {
                id: 6,
                title: 'Manufacturing Industry',
                check_id: 'chk-ani5',
                badge: true,
                badge_text: '25'
            }
        ]
    },
    {
        id: 2,
        title: 'Company List',
        details: [
            {
                id: 6,
                title: 'Wonder Finds',
                check_id: 'chk-ani6',
                badge: false,
            },
            {
                id: 7,
                title: 'Kilback',
                check_id: 'chk-ani7',
                badge: false,
            },
            {
                id: 8,
                title: 'Gadget Grove',
                check_id: 'chk-ani8',
                badge: false,
            },
            {
                id: 9,
                title: 'Liehook',
                check_id: 'chk-ani9',
                badge: false,
            },
            {
                id: 10,
                title: 'Appzea',
                check_id: 'chk-ani10',
                badge: false,
            },
            {
                id: 11,
                title: 'Cliinch',
                check_id: 'chk-ani11',
                badge: false,
            }
        ]
    },
    {
        id: 3,
        title: 'Rating',
        details: [
            {
                id: 12,
                title: '5',
                check_id: 'chk-ani12',
                rate_number: 5,
                rating: true,
                badge: true,
                badge_text: '5 Star'
            },
            {
                id: 13,
                title: '4',
                check_id: 'chk-ani13',
                rate_number: 4,
                rating: true,
                badge: true,
                badge_text: '4 Star'
            },
            {
                id: 14,
                title: '3',
                check_id: 'chk-ani14',
                rate_number: 3,
                rating: true,
                badge: true,
                badge_text: '3 Star'
            },
            {
                id: 15,
                title: '2',
                check_id: 'chk-ani15',
                rate_number: 2,
                rating: true,
                badge: true,
                badge_text: '2 Star'
            },
            {
                id: 16,
                title: '1',
                check_id: 'chk-ani16',
                rate_number: 1,
                rating: true,
                badge: true,
                badge_text: '1 Star'
            }
        ]
    },
    {
        id: 4,
        title: 'Employee Range',
        details: [
            {
                id: 17,
                title: '0-50 Employees',
                check_id: 'chk-ani17',
                badge: false,
            },
            {
                id: 18,
                title: '51-200 Employees',
                check_id: 'chk-ani18',
                badge: false,
            },
            {
                id: 19,
                title: '201-500 Employees',
                check_id: 'chk-ani19',
                badge: false,
            },
            {
                id: 20,
                title: '501-1000 Employees',
                check_id: 'chk-ani20',
                badge: false,
            },
            {
                id: 21,
                title: '1000-5000 Employees',
                check_id: 'chk-ani21',
                badge: false,
            },
            {
                id: 22,
                title: '5001-10000 Employees',
                check_id: 'chk-ani22',
                badge: false,
            }
        ]
    },
]

export const companyDetails: CompanyDetails[] = [
    {
        id: 1,
        icon: 'logo-8',
        name: 'Appzea',
        rating: 4,
        reviews: '45.6K+',
        category: 'E-commerce',
        description: 'Empowering businesses through innovative data analytics',
        jobs_posted: '03'
    },
    {
        id: 2,
        icon: 'logo-4',
        name: 'Liourt',
        rating: 5,
        reviews: '500+',
        category: 'Development',
        description: 'Wide range of technology-driven solutions for different sectors',
        jobs_posted: '10'
    },
    {
        id: 3,
        icon: 'logo-15',
        name: 'Doloh',
        rating: 4,
        reviews: '1000+',
        category: 'Medical',
        description: 'Focused on innovation, quality, and delivering values',
        jobs_posted: '08'
    },
    {
        id: 4,
        icon: 'logo-5',
        name: 'Cliinch',
        rating: 3,
        reviews: '50.4K+',
        category: 'Management',
        description: 'Providing outstanding tech services and solutions',
        jobs_posted: '02'
    },
    {
        id: 5,
        icon: 'logo-12',
        name: 'Holoxo',
        rating: 3,
        reviews: '14.1K+',
        category: 'E-commerce',
        description: 'Offering cutting-edge tech services and softwares',
        jobs_posted: '05',
    },
    {
        id: 6,
        icon: 'logo-7',
        name: 'Liify',
        rating: 5,
        reviews: '200+',
        category: 'Management',
        description: 'Worldwide services for digital transformation',
        jobs_posted: '09',
    },
    {
        id: 7,
        icon: 'logo-10',
        name: 'Jews',
        rating: 4,
        reviews: '1.5K+',
        category: 'Medical',
        description: 'Digital solutions for a range of global businesses',
        jobs_posted: '14',
    },
    {
        id: 8,
        icon: 'logo-9',
        name: 'Appish',
        rating: 3,
        reviews: '3.5K+',
        category: 'Development',
        description: 'High-end software and technology services',
        jobs_posted: '04',
    },
    {
        id: 9,
        icon: 'logo-6',
        name: 'Liehook',
        rating: 5,
        reviews: '45.5K+',
        category: 'Development',
        description: 'Software and digital solutions for a range of global businesses',
        jobs_posted: '01',
    },
    {
        id: 10,
        icon: 'logo-2',
        name: 'Wonder Finds',
        rating: 3,
        reviews: '4.2K+',
        category: 'Management',
        description: 'Cutting-edge technological services on a global scale',
        jobs_posted: '08',
    },
    {
        id: 11,
        icon: 'logo-1',
        name: 'Gadget Grove',
        rating: 4,
        reviews: '200+',
        category: 'E-commerce',
        description: 'Leading provider of digital services and software',
        jobs_posted: '06',
    },
    {
        id: 12,
        icon: 'logo-3',
        name: 'Kilback',
        rating: 3,
        reviews: '32.5K+',
        category: 'Medical',
        description: 'Cutting-edge solutions to international markets',
        jobs_posted: '03',
    },
]