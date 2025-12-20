import { JobCard, JobDetails, jobFilter } from "../../interface/jobs"

export const sidebars: jobFilter[] = [
  {
    id: 1,
    title: 'Filter',
    button: 'Find jobs',
    class: "checkbox-animated",
    card_body_class: 'filter-cards-view',
    check: true,
    search: true,
    location: true,
    details: [
      {
        id: 1,
        title: 'Full-time',
        check_id: 'chk-ani1',
        badge: true,
        badge_text: 8688
      },
      {
        id: 2,
        title: 'Contract',
        check_id: 'chk-ani2',
        badge: true,
        badge_text: 503
      },
      {
        id: 3,
        title: 'Part-time',
        check_id: 'chk-ani3',
        badge: true,
        badge_text: 288
      },
      {
        id: 4,
        title: 'Internship',
        check_id: 'chk-ani4',
        badge: true,
        badge_text: 236
      },
      {
        id: 5,
        title: 'Temporary',
        check_id: 'chk-ani5',
        badge: true,
        badge_text: 146
      },
      {
        id: 6,
        title: 'Commission',
        check_id: 'chk-ani6',
        badge: true,
        badge_text: 25
      }
    ]
  },
  {
    id: 2,
    title: 'Location',
    button: 'All Locations',
    class: "location-checkbox",
    details: [
      {
        id: 6,
        title: 'New York',
        country_code: 'NY',
        check_id: 'chk-ani6',
        badge: true,
        badge_text: 399
      },
      {
        id: 7,
        title: 'San Francisco',
        check_id: 'chk-ani7',
        country_code: 'CA',
        badge: true,
        badge_text: 252
      },
      {
        id: 8,
        title: 'Washington',
        check_id: 'chk-ani8',
        country_code: 'DC',
        badge: true,
        badge_text: 226
      },
      {
        id: 9,
        title: 'Seattle',
        check_id: 'chk-ani9',
        country_code: 'WA',
        badge: true,
        badge_text: 242
      },
      {
        id: 10,
        title: 'Chicago',
        check_id: 'chk-ani10',
        country_code: 'IL',
        badge: true,
        badge_text: 187
      }
    ]
  },
  {
    id: 3,
    title: 'Job Title',
    check: true,
    button: 'All Job Title',
    details: [
      {
        id: 11,
        title: 'UI/Ux designer',
        check_id: 'chk-ani11',
        badge: true,
        badge_text: 25
      },
      {
        id: 12,
        title: 'Graphic designer',
        check_id: 'chk-ani12',
        badge: true,
        badge_text: 10
      },
      {
        id: 13,
        title: 'Front end designer',
        check_id: 'chk-ani13',
        badge: true,
        badge_text: 15
      },
      {
        id: 14,
        title: 'PHP developer',
        check_id: 'chk-ani14',
        badge: true,
        badge_text: 42
      },
      {
        id: 15,
        title: 'React Developer',
        check_id: 'chk-ani15',
        badge: true,
        badge_text: 5
      }
    ]
  },
  {
    id: 4,
    title: 'Industry',
    check: true,
    button: 'All Industries',
    details: [
      {
        id: 16,
        title: 'Computer Software',
        check_id: 'chk-ani16',
        badge: true,
        badge_text: 14
      },
      {
        id: 17,
        title: 'IT Engineer',
        check_id: 'chk-ani17',
        badge: true,
        badge_text: 10
      },
      {
        id: 18,
        title: 'Service industry',
        check_id: 'chk-ani18',
        badge: true,
        badge_text: 20
      },
      {
        id: 19,
        title: 'Accounting',
        check_id: 'chk-ani19',
        badge: true,
        badge_text: 34
      },
      {
        id: 20,
        title: 'Financial Services',
        check_id: 'chk-ani20',
        badge: true,
        badge_text: 5
      }
    ]
  },
  {
    id: 5,
    title: 'Specific Skills',
    button: 'All Skills',
    check: true,
    details: [
      {
        id: 21,
        title: 'HTML,scss & sass',
        check_id: 'chk-ani21',
        badge: false,
      },
      {
        id: 22,
        title: 'Javascript',
        check_id: 'chk-ani22',
        badge: false,
      },
      {
        id: 23,
        title: 'Node.js',
        check_id: 'chk-ani23',
        badge: false,
      },
      {
        id: 24,
        title: 'Gulp & Pug',
        check_id: 'chk-ani24',
        badge: false,
      },
      {
        id: 25,
        title: 'Angular.js',
        check_id: 'chk-ani25',
        badge: false,
      }
    ]
  }
]

export const jobCards: JobCard[] = [
  {
    id: 1,
    rating: 5,
    image: 'assets/images/job-search/1.jpg',
    title: 'UI/UX IT Frontend Developer',
    sub_title: '(L6) Salt Lake City, UT',
    description: 'We are seeking a creative and skilled front-end engineer or designer with experience in accessibility to join our team. Three years of experience as a frontend engineer or in a related position is a minimum requirement for the ideal applicant. To build inclusive and user-friendly digital experiences, you will closely collaborate with other skilled team members.',
    tag_title: 'New',
    ribbon: false,
  },
  {
    id: 2,
    rating: 4,
    image: 'assets/images/job-search/2.jpg',
    title: 'React/React Native Developer',
    sub_title: 'San Diego, CA',
    description: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial, Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
    tag_title: 'New',
    ribbon: false,
  },
  {
    id: 3,
    rating: 3,
    image: 'assets/images/job-search/3.jpg',
    title: 'Senior UX designer',
    sub_title: 'Minneapolis, MN',
    description: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
    tag: false,
    ribbon: true,
    ribbon_icon: 'love',
    time: '2 days ago',
  },
  {
    id: 4,
    rating: 4,
    image: 'assets/images/job-search/4.jpg',
    title: 'Front end web developer',
    sub_title: 'Cisco Lelystad, Netherlands',
    description: 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
    tag: false,
    ribbon: false,
    time: '3 days ago',
  },
  {
    id: 5,
    rating: 3,
    image: 'assets/images/job-search/5.jpg',
    title: 'Graphic designer',
    sub_title: 'Infosys Lelystad, Netherlands',
    description: 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
    tag: false,
    ribbon: false,
    time: '3 days ago',
  },
  {
    id: 6,
    rating: 3,
    image: 'assets/images/job-search/6.jpg',
    title: 'Designer, CRM',
    sub_title: 'Citrix Lelystad, Netherlands',
    description: 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
    tag: false,
    ribbon: false,
    ribbon_icon: '',
    time: '3 days ago',
  },
  {
    id: 7,
    rating: 4,
    image: 'assets/images/job-search/2.jpg',
    title: 'React/React Native Developer',
    sub_title: 'San Diego, CA',
    description: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial, Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive',
    tag: false,
    ribbon: true,
    ribbon_icon: 'love',
    time: '5 days ago',
  },
  {
    id: 8,
    rating: 3,
    image: 'assets/images/job-search/3.jpg',
    title: 'Senior UX designer',
    sub_title: 'Minneapolis, MN',
    description: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
    tag: false,
    ribbon: false,
    ribbon_icon: '',
    time: '5 days ago',
  },

  {
    id: 9,
    rating: 3,
    image: 'assets/images/job-search/5.jpg',
    title: 'Graphic designer',
    sub_title: 'Infosys Lelystad, Netherlands',
    description: 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
    tag: false,
    ribbon: false,
    time: '3 days ago',
  },
  {
    id: 10,
    rating: 3,
    image: 'assets/images/job-search/6.jpg',
    title: 'Designer, CRM',
    sub_title: 'Citrix Lelystad, Netherlands',
    description: 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
    tag: false,
    ribbon: false,
    ribbon_icon: '',
    time: '3 days ago',
  },
  {
    id: 11,
    rating: 5,
    image: 'assets/images/job-search/1.jpg',
    title: 'UI/UX IT Frontend Developer',
    sub_title: '(L6) Salt Lake City, UT',
    description: 'We are seeking a creative and skilled front-end engineer or designer with experience in accessibility to join our team. Three years of experience as a frontend engineer or in a related position is a minimum requirement for the ideal applicant. To build inclusive and user-friendly digital experiences, you will closely collaborate with other skilled team members.',
    tag_title: 'New',
    ribbon: false,
  },
  {
    id: 12,
    rating: 3,
    image: 'assets/images/job-search/2.jpg',
    title: 'React/React Native Developer',
    sub_title: 'San Diego, CA',
    description: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial, Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
    tag_title: 'New',
    ribbon: false,
  },
  {
    id: 13,
    rating: 4,
    image: 'assets/images/job-search/4.jpg',
    title: 'Front end web developer',
    sub_title: 'Cisco Lelystad, Netherlands',
    description: 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
    tag: false,
    ribbon: false,
    time: '3 days ago',
  },
  {
    id: 14,
    rating: 3,
    image: 'assets/images/job-search/3.jpg',
    title: 'Senior UX designer',
    sub_title: 'Minneapolis, MN',
    description: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
    tag: false,
    ribbon: true,
    ribbon_icon: 'love',
    time: '2 days ago',
  },
]

export const jobDetail: JobDetails[] = [
  {
    img: 'assets/images/job-search/1.jpg',
    main_title: 'Product Designer (UI/UX Designer)',
    subtitle: 'Endless - United States',
    rating: 5,
    details: [
      {
        title: 'Job Description',
        li_class: false,
        detail: [
          {
            description: "Endless is looking for a UI/UX Designer to join our team. The world is seeing an explosion in the amount and variety of location-baWe are looking for a versatile UX/UI Designer to join our growing design team. Our designers contribute to clients’ projects at all stages of development. We might start from scratch, conducting user and stakeholder interviews, making personas and journey maps, and continue on to iterating on designs and prototypes through delivering final assets for launch. We might come into the middle of an in-flight program-size project and conduct analysis and usability correction or feature enhancement. We might provide research and vision for handoff to an internal development team."
          }
        ]
      },
      {
        title: 'Qualifications',
        li_class: true,
        detail: [
          { description: "Have shipped multiple iOS, Android, and/or web products" },
          { description: "5+ years UI/UX experience" },
          { description: "Portfolio demonstrating mastery of native iOS, Android, and/or responsive web design principles" },
          { description: "Ability to autonomously pursue elegant solutions to open-ended problems" },
          { description: "Comfort with ambiguity" },
          { description: "Proven ability to create interactive prototypes" },
          { description: "Strong verbal communication skills with ability to clearly communicate complex ideas and champion a design vision across all levels of an organization" },
          { description: "Strong written communication skills with ability to make transparent design documentation and client-facing presentations" },
          { description: "Ability to create and maintain flow charts, wire frames, prototypes, and mockups." },
          { description: "Ability to effectively work on more than one project at a time" },
          { description: "Experience conducting user research and stakeholder interviews" },
          { description: "Solid grasp of standard design tools, ex: Sketch, Omnigraffle, the Adobe Suite, Zeplin, etc." },
          { description: "Bonus Considerations" },
        ]
      },
      {
        title: 'Agency experience',
        li_class: true,
        detail: [
          { description: "Experience working with Agile development teams" },
          { description: "Experience with RITE method usability testing" },
          { description: "Experience in visual and motion design; ability to translate UX design into high quality visuals" },
          { description: "Mastery of Sketch & InVision" },
          { description: "Knowledge of mobile or front-end web programming" },
        ]
      },
      {
        title: 'Perks',
        li_class: true,
        detail: [
          { description: "Competitive pay" },
          { description: "Competitive medical, dental, and vision insurance plans" },
          { description: "Company-provided 401(k) plan" },
          { description: "Paid vacation and sick time" },
          { description: "Free snacks and beverages" },
        ]
      }
    ]
  }
]