import { articlesAndVideos, BrowserArticle, featuredTutorial, KnowledgeBase } from "../interface/knowledge-base";

export const knowledgeBase: KnowledgeBase[] = [
    {
        title: 'Articles',
        description: "The usefulness and usability of a website, not its aesthetic design, define its success or failure. User-centric design has become the norm for effective and financially motivated web design since the visitor to the website is the only one who clicks the mouse and thus determines everything. After all, a feature might as well not exist if people can't utilise it.",
        icon: 'book-open',
    },
    {
        title: 'Knowledgebase',
        description: "A knowledge base acts as a central repository for knowledge, data, and information pertaining to a certain subject or thing. Its main goal is to make it easier for consumers to obtain information quickly and conveniently so they can solve problems, find solutions, and make wise decisions.",
        icon: 'aperture'
    },
    {
        title: 'Support',
        description: "Email, chat, forums, and a social media interface (and monitoring) are all part of real-time online assistance, which helps in reacting to public complaints and comments. Taking care of returns or repairs may fall under this.",
        icon: 'file-text'
    }
]

export const browseArticles: BrowserArticle[] = [
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 40,
        title: 'Quick Questions are Answered',
        title_icon: 'archive',
        details: [
            {
                list_text: 'Dream big, work hard, achieve more.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: "Stars require darkness to shine.",
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'The key to happiness lies within, not in goods.',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'New',
            },
            {
                list_text: 'Seek advancement rather than perfection.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 90,
        title: 'Integrating WordPress with Your Website',
        title_icon: 'archive',
        details: [
            {
                list_text: 'Plugins and tools for wordPress integration',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Review',
            },
            {
                list_text: "advantages of using WordPress as my website's CMS",
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Desktop publishing software like Jully ',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Articles',
            },
            {
                list_text: 'Making this the first true generator on the Internet.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 50,
        title: 'WordPress Site Maintenance',
        title_icon: 'archive',
        details: [
            {
                list_text: 'WordPress Site Upkeep: Important best practices',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Regular Updates: WordPress security and stability',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Closed',
            },
            {
                list_text: "Backup Fundamentals: Protecting your website text",
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'The essential maintenance for a thriving website',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 90,
        title: 'Meta Tags in WordPress',
        title_icon: 'archive',
        details: [
            {
                list_text: 'The Article WordPress: A recipe for success',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Popular',
            },
            {
                list_text: 'Security Scan: Protecting against vulnerabilities.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'SEO and Site Speed: Improving user experience',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Broken Links: Fixing for improved navigation',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 50,
        title: 'WordPress in Your Language',
        title_icon: 'archive',
        details: [
            {
                list_text: 'Discover WordPress Themes: Improve website design',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Making the Best Decision: WordPress vs. Other CMS',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Using Widgets to Your Advantage: Creating a custom website',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Making this the first generator on the internet',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Closed',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 26,
        title: 'Know Your Sources',
        title_icon: 'archive',
        details: [
            {
                list_text: 'First, get the issue resolved. Write the code after that.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'It has a more-or-less normal distribution of letters',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'The writing of programmes must be simple',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Article',
            },
            {
                list_text: 'Coding involves logic and creativity to merely writing code',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 10,
        title: 'Validating a Website',
        title_icon: 'archive',
        details: [
            {
                list_text: 'Build your website to make users happy',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Review',
            },
            {
                list_text: 'Your website is your front door online',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Make sure your website is easy to use and simple',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Closed',
            },
            {
                list_text: 'Update, innovate, and enhance your website ',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-6 md:col-span-12 xl-4 xl-50',
        see_more: 21,
        title: 'Quick Questions are answered',
        title_icon: 'archive',
        details: [
            {
                list_text: 'Coding: turning caffeine into lines of brilliance.',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Code is the poetry of logical expression.',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Popular',
            },
            {
                list_text: 'Coding is the art of engineering',
                text_icon: 'file-text',
                tag: true,
                tag_title: 'Review',
            },
            {
                list_text: 'Every screen size is accommodated with a responsive',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
        ]
    },
    {
        col_class: 'col-span-4 xl:col-span-12 xl-4 xl-100',
        see_more: 34,
        title: 'Integrating WordPress with Your Website',
        title_icon: 'archive',
        details: [
            {
                list_text: 'The core of your online presence is your website',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Your website is a 24/7 marketing tool',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: 'Build a website that turns users into buyers',
                text_icon: 'file-text',
                tag: false,
                tag_title: '',
            },
            {
                list_text: "User experience determines a website's success",
                text_icon: 'file-text',
                tag: true,
                tag_title: 'On hold',
            },
        ]
    },
]

export const featuredTutorialDetails: featuredTutorial[] = [
    {
        id: 1,
        rating: 5,
        image: 'assets/images/faq/1.jpg',
        title: 'Web Designer',
        description: "Web designing course belongs to the field of computer science and IT. It enables students to learn.",
        date: 'Dec 29, 2025',
    },
    {
        id: 2,
        rating: 4,
        image: 'assets/images/faq/2.jpg',
        title: 'Web Development',
        description: "This course is designed to start you on a path toward future studies in web development and design.",
        date: 'Dec 20, 2025',
    },
    {
        id: 3,
        rating: 5,
        image: 'assets/images/faq/3.jpg',
        title: 'UI Design',
        description: "User interface design (UI) is the design for machines and software, such as mobile devices, computers.",
        date: 'Feb 11, 2025',
    },
    {
        id: 4,
        rating: 4.5,
        image: 'assets/images/faq/4.jpg',
        title: 'UX Design',
        description: "Web designing course belongs to the field of computer science and IT. It enables students to learn.",
        date: 'Jan 02, 2025',
    }
]

export const articlesAndVideosDetails: articlesAndVideos[] = [
    {
        row: 1,
        class: 'xl:col-span-6 md:col-span-12',
        details: [
            {
                id: 1,
                title: 'Product Manager',
                description: 'A product manager is a specialist in charge of managing the growth, direction.',
                icon: 'codepen',
            },
            {
                id: 2,
                title: 'E-commerce',
                description: 'Discover the flourishing e-commerce industry and how digital technology has transformed it.',
                icon: 'codepen'

            },
            {
                id: 3,
                title: ' Web Development',
                description: 'To display HTML and CSS components on different web browsers, such as Chrome, Safari. ',
                icon: 'codepen'
            }
        ]
    },
    {
        row: 2,
        class: 'xl:col-span-6 md:col-span-12',
        details: [
            {
                id: 4,
                title: 'UX Designer',
                description: 'Seniority does have a significant role in how much influence a UI specialist. ',
                icon: 'file-text'
            },
            {
                id: 5,
                title: 'SDLC Cycle',
                description: 'the intricacies of the Software Development Life Cycle a systematic approach to software development',
                icon: 'file-text'

            },
            {
                id: 6,
                title: 'Using Video',
                description: 'Information architecture is a discipline that, among other things, arranges, and structures',
                icon: 'file-text'
            }
        ]
    },
    {
        row: 3,
        class: 'xl:col-span-12',
        details: [
            {
                id: 7,
                title: 'Information Gathering',
                description: 'Explore the critical role of information gathering in effective problem-solving processes.',
                icon: 'youtube'
            },
            {
                id: 8,
                title: 'Effective Communication',
                description: "It's crucial to communicate! This blog explores the key components of good communication.",
                icon: 'youtube'
            },
            {
                id: 9,
                title: 'Travel Adventures',
                description: 'The spirit is enriched by travel! This site takes you on an exhilarating tour of stunning.',
                icon: 'youtube'
            }
        ]
    }
]