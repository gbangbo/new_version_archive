import { articlesAndVideos, featuredTutorial, KnowledgeBase } from "../interface/knowledge-base"
import { FaqQuestionAnswer, Navigation } from "../interface/faq"

export const faqQuestionAnswer: FaqQuestionAnswer[] = [
    {
        details: [
            {
                id: 1,
                title: 'Integrating wordPress with your website?',
                description: 'A excellent method to add dynamic content, make site management simple, and access the extensive ecosystem of WordPress plugins and themes is by integrating WordPress with your website.',
            },
            {
                id: 2,
                title: 'WordPress site maintenance ?',
                description: 'Background photos give a website an aesthetically pleasing and engaging backdrop. There are several applications for these photos.',
            },
            {
                id: 3,
                title: 'Meta tags in wordPress ?',
                description: 'The World Wide online Consortium (W3C), a global organisation, supports online development. The public, organisation members, a full-time staff, and invited international experts work together to develop Web Standards..',
            },
            {
                id: 4,
                title: 'WordPress in your language ?',
                description: "Cascading Style Sheets, or CSS, is a language for creating style sheets. In essence, it regulates and supervises how information should be presented in speech, writing, visual media, and other forms of media. You may modify the text's colour, font, spacing between paragraphs, size, and order with CSS.",
            },
        ]
    },
    {
        header_title: 'Intellectual Property',
        details: [
            {
                id: 5,
                title: 'How to ticket work as web designer?',
                description: 'Create an account on the chosen ticketing platform and set up your workspace. Customize it according to your projects and team, if applicable. Set permissions and access levels for team members and clients, if necessary.',
            },
            {
                id: 6,
                title: ' What are wordPress plugins?',
                description: 'Individual pieces of software called WordPress plugins let you extend the functionality of your website. You may install each of these pieces of software on your WordPress website.',
            },
            {
                id: 7,
                title: 'How many tables are there by default in wordPress?',
                description: 'Tables are the equivalent of shelves in WordPress databases. WordPress websites come with 12 tables by default. Each table can only contain specific types of data.',
            },
        ]
    },
    {
        header_title: 'Selling And Buying',
        details: [
            {
                id: 8,
                title: 'What exactly does a talented UX designer do?',
                description: 'While there is no right or incorrect response, a professional designer should be well-versed in UX and be able to provide a complete end-to-end UX design process.',
            },
            {
                id: 9,
                title: "Can you explain why widgets don't appear in the sidebar?",
                description: "Users must first make sure that the themes they are using support the widget before adding it. It's conceivable that the issue is brought on by a lack of functionality.",
            },
            {
                id: 10,
                title: 'Sell me on the benefits of UX design investment?',
                description: 'In addition to improving user experience, UX-driven product design is a wise commercial decision.',
            },
            {
                id: 11,
                title: 'What is source code?',
                description: 'The core of a computer programme is called the source code, which is produced by a programmer and frequently takes the form of functions, descriptions, definitions, calls, procedures, and other operational declarations.',
            },
        ]
    },
    {
        header_title: 'User Accounts',
        details: [
            {
                id: 12,
                title: 'Integrating wordPress with your website ?',
                description: 'The string may be turned into a character array, which you can iterate through from beginning to finish. The characters can be added to a string builder to create the reversed string.',
            },
            {
                id: 13,
                title: 'WordPress site maintenance ?',
                description: 'This particular activity, which is the question, may demonstrate your proficiency with using Java code to carry out a task.',
            },
            {
                id: 14,
                title: 'WordPress in your language ?',
                description: 'Another unique Java coding activity that the interviewer could use to gauge your Java expertise.',
            },
            {
                id: 15,
                title: 'Validating a website ?',
                description: "The planning, structuring, and labelling of content in a thorough, logical, and long-lasting manner is referred to as information architecture (IA). It allows for the obvious and intelligible organising and classification of material, enabling visitors to quickly discover what they're looking for.",
            },
            {
                id: 16,
                title: 'Meta tags in wordPress ?',
                description: 'A declaration of the document type, known as DOCTYPE, is required at the start of every HTML or XHTML document; this declaration is frequently the first line of code.',
            }
        ]
    },
]

export const navigation: Navigation[] = [
    {
        icon: 'edit',
        title: 'Tutorials',
    },
    {
        icon: 'globe',
        title: 'Help center',
    },
    {
        icon: 'book-open',
        title: 'Knowledgebase',
    },
    {
        icon: 'file-text',
        title: 'Articles',
        badge: true,
        badge_text: 42,
    },
    {
        icon: 'youtube',
        title: 'Video Tutorials',
        badge: true,
        badge_text: 648,
    },
    {
        icon: 'message-circle',
        title: 'Ask our community',
    },
    {
        icon: 'mail',
        title: 'Contact us',
    },
    {
        section: true,
    },
    {
        icon: 'message-circle',
        title: 'Ask our community',
    },
    {
        icon: 'mail',
        title: 'Contact us',
    }
]

export const faqDetails: KnowledgeBase[] = [
    {
        title: 'Articles',
        description: "The usefulness and usability of a website, not its aesthetic design, define its success or failure. User-centric design has become the norm for effective and financially motivated web design since the visitor to the website is the only one who clicks the mouse and thus determines everything. After all, a feature might as well not exist if people can't utilise it.",
        icon: 'file-text',
    },
    {
        title: 'Knowledgebase',
        description: "A knowledge base acts as a central repository for knowledge, data, and information pertaining to a certain subject or thing. Its main goal is to make it easier for consumers to obtain information quickly and conveniently so they can solve problems, find solutions, and make wise decisions.",
        icon: 'book-open'
    },
    {
        title: 'Support',
        description: "Email, chat, forums, and a social media interface (and monitoring) are all part of real-time online assistance, which helps in reacting to public complaints and comments. Taking care of returns or repairs may fall under this.",
        icon: 'aperture'
    }
]

export const faqFeaturedTutorial: featuredTutorial[] = [
    {
        id: 1,
        rating: 5,
        image: 'assets/images/faq/1.jpg',
        title: 'Web Design',
        description: "Setting aside time once every three months to refresh your portfolio is a fantastic idea. Even if you are not submitting any new work,",
        date: 'Dec 15, 2025',
    },
    {
        id: 2,
        rating: 4,
        image: 'assets/images/faq/2.jpg',
        title: 'Web Development',
        description: "To display HTML and CSS components on different web browsers, such as Chrome, Safari, and previous versions of Opera, CSS3 uses the Webkit rendering engine. It offers the essential features for generating online content and guaranteeing consistency across many platforms.",
        date: 'Dec 15, 2025',
    },
    {
        id: 3,
        rating: 5,
        image: 'assets/images/faq/3.jpg',
        title: 'UI Design',
        description: "Seniority does have a significant role in how much influence a UI specialist has at this first stage of the design process. Senior UI designers may take the initiative in coming up with suggestions for which visual components will work best, whereas an entry-level UI designer is more likely to be focused on storyboards, sitemaps, and process flows and not have much influence on the site's appearance.",
        date: 'Dec 15, 2025',
    },
    {
        id: 4,
        rating: 4.5,
        image: 'assets/images/faq/4.jpg',
        title: 'UX Design',
        description: "Information architecture is a discipline that, among other things, organizes, arranges, and structures the content of a website or app. Information architects determine how to organize something's components in a way that makes sense.",
        date: 'Dec 15, 2025',
    }
]

export const faqArticlesAndVideos: articlesAndVideos[] = [
    {
        row: 1,
        class: 'xl:col-span-6 md:col-span-12',
        details: [
            {
                id: 1,
                title: 'How to Programming Consistency.',
                description: 'You must always maintain consistency as a web developer. Over time, consistency produces superior results.',
                icon: 'codepen',
            },
            {
                id: 2,
                title: 'Explaining Modern CSS To A Dinosaur',
                description: 'Peter Jang, the author of the very first essay on our list, has created another masterpiece, but this time, he has addressed CSS, another important aspect of web.',
                icon: 'codepen'

            },
            {
                id: 3,
                title: ' Make Fewer Designs to Become a Better Designer.',
                description: 'Designers can experience feelings of fraudulence or lack of originality. It seems like everyone else is working harder or just generally doing a better job than you are. ',
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
                title: 'What?! Why Should I Design Less?',
                description: 'You can view all of the stunning and remarkable things that other designers have produced by taking a peek around. You then examine your work. ',
                icon: 'file-text'
            },
            {
                id: 5,
                title: 'Use a GUI Framework as a Requirement',
                description: 'Do not, under any circumstances, code your website in simple HTML. Frameworks and widget libraries are widely available.',
                icon: 'file-text'

            },
            {
                id: 6,
                title: 'What?! Why Should I Design Less?',
                description: 'Information architecture is a discipline that, among other things, organises, arranges, and structures the content of a website or app. Information architects determine how to',
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
                title: 'Continuous Learning',
                description: 'To improve their craft and advance in the industry, web designers frequently attend courses, participate in design groups, and work on their own professional development.',
                icon: 'youtube',
                class: 'col-span-12'
            },
            {
                id: 8,
                title: 'Design Expertise',
                description: "For websites to be aesthetically pleasing, web designers must have excellent graphic design, typography, colour theory, and layout abilities",
                icon: 'youtube',
                class: 'col-span-12'
            },
            {
                id: 9,
                title: 'Use Vertical Input Forms that are Clearly Organized.',
                description: 'Use only one column in an input form if possible. A separate row should exist for each input field.',
                icon: 'youtube'
            }
        ]
    }
]