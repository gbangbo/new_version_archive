import {
  ActiveTable, AnatomyTable, BasicTable, BreakpointTable, Caption, CustomTable, DashedBorderTable, HoverAbleTable, InverseTable,
  InverseTableBackground, ResponsiveTable, SizingTable, StripedColumn, StripedRow, Student, TableBorder, TableFoot, TableGroupDivider,
  TableHeadOption, TableWithoutBorder, VerticalAlignment
} from "../interface/tailwind-table";

export const basicTable: BasicTable[] = [
  {
    id: 1,
    first_name: "Ram Jacob",
    last_name: "Wolfe",
    user_name: "RamJacob@twitter",
    designation: "Developer",
    company: "Apple Inc.",
    language: "Php",
    country: "IND",
    class: 'danger',
    tr_class: 'secondary',
    image_url: "assets/images/user/1.jpg",
  },
  {
    id: 2,
    first_name: "John Deo",
    last_name: "Gummer",
    user_name: "JohnDeo@twitter",
    designation: "Designer",
    company: "Hewlett packard",
    language: "Html",
    country: "US",
    class: 'primary',
    tr_class: 'success',
    image_url: "assets/images/user/2.jpg",
  },
  {
    id: 3,
    first_name: "Elana John",
    last_name: "Cazale",
    user_name: "ElanaJohn@twitter",
    designation: "Designer",
    company: "Microsoft",
    language: "Pug",
    country: "UK",
    class: 'danger',
    tr_class: 'info',
    image_url: "assets/images/user/3.jpg",
  },
  {
    id: 4,
    first_name: "Meryl Streep",
    last_name: "Roberts",
    user_name: "MerylStreep@twitter",
    designation: "Developer",
    company: "Tata Ltd.",
    language: "React",
    country: "IDN",
    class: 'success',
    tr_class: 'warning',
    image_url: "assets/images/user/7.jpg",
  },
  {
    id: 5,
    first_name: "Emma Stone",
    last_name: "Stone",
    user_name: "EmmaStone@twitter",
    designation: "Developer",
    company: "Wipro Ltd.",
    language: "Vue",
    country: "IRN",
    class: 'primary',
    tr_class: 'danger',
    image_url: "assets/images/user/2.png",
  },
  {
    id: 6,
    first_name: "Eliana Jons",
    last_name: "Jons",
    user_name: "ElianaJons@twitter",
    designation: "Developer",
    company: "Info Ltd.",
    language: "Vue",
    country: "IRN",
    class: 'success',
    tr_class: 'light',
    image_url: "assets/images/user/3.png",
  },
];

export const student: Student[] = [
  {
    id: "Default",
    roll_number: "01",
    student_name: "Watson Freeman",
    standard: "10",
    grade: "A",
    percentage: "89.5%",
  },
  {
    id: "Primary",
    roll_number: "02",
    student_name: "Miley Morgan",
    standard: "06",
    grade: "B",
    class: 'table-primary',
    percentage: "65.6%",
  },
  {
    id: "Secondary",
    roll_number: "03",
    student_name: "Charli Olsen",
    standard: "02",
    grade: "C",
    class: 'table-secondary',
    percentage: "45.2%",
  },
  {
    id: "Success",
    roll_number: "04",
    student_name: "Levi Berger",
    standard: "11",
    grade: "A",
    class: 'table-success',
    percentage: "78.3%",
  },
  {
    id: "Danger",
    roll_number: "05",
    student_name: "Ayaan Rich",
    standard: "08",
    grade: "B",
    class: 'table-danger',
    percentage: "67.9%",
  },
  {
    id: "Warning",
    roll_number: "06",
    student_name: "Mae Flores",
    standard: "12",
    grade: "A",
    class: 'table-warning',
    percentage: "99.4%",
  },
  {
    id: "Info",
    roll_number: "07",
    student_name: "Angel Terrell",
    standard: "10",
    grade: "B",
    class: 'table-info',
    percentage: "70.3%",
  },
  {
    id: "Light",
    roll_number: "08",
    student_name: "Logan Luna",
    standard: "11",
    grade: "A",
    class: 'table-light',
    percentage: "92.5%",
  },
  {
    id: "Dark",
    roll_number: "09",
    student_name: "Sage Cuevas",
    standard: "04",
    grade: "A",
    class: 'table-dark',
    percentage: "97.6%",
  },
];

export const inverseTable: InverseTable[] = [
  {
    id: 1,
    first_name: "Stephan",
    last_name: "Laiten",
    office: "Tokyo",
    position: "Accountant",
    salary: "$2100.00",
    join_date: "21/01/2024",
    age: 20,
  },
  {
    id: 2,
    first_name: "Fay",
    last_name: "Van Damme",
    office: "London",
    position: "CEO",
    salary: "$1420.00",
    join_date: "14/02/2021",
    age: 22,
  },
  {
    id: 3,
    first_name: "Brevin",
    last_name: "Oleveria",
    office: "New York",
    position: "Software Engineer",
    salary: "$1340.00",
    join_date: "04/06/2024",
    age: 18,
  },
  {
    id: 4,
    first_name: "Regina",
    last_name: "Ottandy",
    office: "France",
    position: "Pre-sale Support",
    salary: "$3400.00",
    join_date: "10/08/2024",
    age: 25,
  },
  {
    id: 5,
    first_name: "Vani",
    last_name: "Shah",
    office: "Los Angeles",
    position: "Senior Developer",
    salary: "$3500.00",
    join_date: "23/07/2024",
    age: 28,
  },
]

export const hoverAbleTable: HoverAbleTable[] = [
  {
    id: 1,
    status: "No Signal",
    class: 'success',
    signal_name: "Astrid: NE Shared managed",
    security: "Medium",
    stage: "Triaged",
    schedule: 0.33,
    team_lead: "Chase Nguyen",
  },
  {
    id: 2,
    status: "Offline",
    class: 'danger',
    signal_name: "Cosmo: prod shared ares",
    security: "Huge",
    stage: "Triaged",
    schedule: 0.39,
    team_lead: "Brie Furman",
  },
  {
    id: 3,
    status: "Online",
    class: 'primary',
    signal_name: "Phoenix: prod shared lyra-lists",
    security: "Minor",
    stage: "No Triaged",
    schedule: 3.12,
    team_lead: "Jeremy Lake",
  },
  {
    id: 4,
    status: "No Signal",
    class: 'success',
    signal_name: "Astrid: NE Shared managed",
    security: "Negligible",
    stage: "Triaged",
    schedule: 13.18,
    team_lead: "Angelica Howards",
  },
  {
    id: 5,
    status: "Online",
    class: 'danger',
    signal_name: "Astrid: NE Shared managed",
    security: "Medium",
    stage: "No Triaged",
    schedule: 5.33,
    team_lead: "Diane Okuma",
  },
];

export const inverseTableBackground: InverseTableBackground[] = [
  {
    id: 1,
    first_name: "Ram Jacob",
    last_name: "Wolfe",
    company: "Apple Inc.",
    credit_volume: "$3500.00",
    user_name: "RamJacob@twitter",
    role: "Developer",
    country: "IND",
  },
  {
    id: 2,
    first_name: "John Deo",
    last_name: "Gummer",
    company: "Hewlett packard",
    credit_volume: "$2400.00",
    user_name: "JohnDeo@twitter",
    role: "Designer",
    country: "US",
  },
  {
    id: 3,
    first_name: "Elana John",
    last_name: "Wolfe",
    company: "Microsoft",
    credit_volume: "$2560.00",
    user_name: "ElanaJohn@twitter",
    role: "Designer",
    country: "UK",
  },
  {
    id: 4,
    first_name: "Meryl Streep",
    last_name: "Roberts",
    company: "Tata Ltd.",
    credit_volume: "$1870.00",
    user_name: "MerylStreep@twitter",
    role: "Developer",
    country: "IND",
  },
  {
    id: 5,
    first_name: "Emma Stone",
    last_name: "Stone",
    company: "Wipro Ltd.",
    credit_volume: "$4580.00",
    user_name: "EmmaStone@twitter",
    role: "Developer",
    country: "IRN",
  },
  {
    id: 6,
    first_name: "Eliana Jons",
    last_name: "Jons",
    company: "Info Ltd.",
    credit_volume: "$4580.00",
    user_name: "ElianaJons@twitter",
    role: "Developer",
    country: "IRN",
  },
]

export const caption: Caption[] = [
  {
    id: 1,
    employee_name: "Elana Robbert",
    email: "ElanaRob@gmail.com",
    experience: "1 Year",
    sex: "Male",
    contact_number: "+91 9789887777",
    age: 28,
  },
  {
    id: 2,
    employee_name: "Stiphen Deo",
    email: "Stiphen@yahoo.com",
    experience: "6 Month",
    sex: "Female",
    contact_number: "+91 9874563210",
    age: 22,
  },
  {
    id: 3,
    employee_name: "Genelia Ottre",
    email: "Genelia@gmail.com",
    experience: "2 Days",
    sex: "Male",
    contact_number: "+91 8794562135",
    age: 24,
  },
]

export const tableHeadOption: TableHeadOption[] = [
  {
    id: 1,
    first_name: "Mark",
    last_name: "Otto",
    user_name: "@mdo",
  },
  {
    id: 2,
    first_name: "Jacob",
    last_name: "Thornton",
    user_name: "@fat",
  },
  {
    id: 3,
    first_name: "Larry",
    last_name: "the Bird",
    user_name: "@twitter",
  },
]

export const stripedRow: StripedRow[] = [
  {
    id: 1,
    dessert: "KitKat",
    calories: 518,
    fat: 26,
    price: 20,
  },
  {
    id: 2,
    dessert: "Donut",
    calories: 452,
    fat: 25,
    price: 80,
  },
  {
    id: 3,
    dessert: "Eclair",
    calories: 262,
    fat: 16,
    price: 10,
  },
]

export const stripedColumn: StripedColumn[] = [
  {
    id: 1,
    name: "Kara Mayer",
    age: 53,
    city: "New York",
    occupation: "Software Engineer",
  },
  {
    id: 2,
    name: "Jorge Molina",
    age: 22,
    city: "Chicago",
    occupation: "Teacher",
  },
  {
    id: 3,
    name: "Adele Gibbs",
    age: 28,
    city: "Miami",
    occupation: "Financial Advisor",
  },
]

export const activeTable: ActiveTable[] = [
  {
    product_id: "P001",
    product_name: "Laptop",
    category: "Computers",
    price: "$999",
  },
  {
    product_id: "P002",
    product_name: "Headphones",
    category: "Audio",
    price: "$600",
  },
  {
    product_id: "P003",
    product_name: "Electric Kettle",
    category: "Home",
    price: "$40",
  },
]

export const tableBorder: TableBorder[] = [
  {
    isbn: "978-1-891830-75-4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year_published: 1975,
  },
  {
    isbn: "978-0-06-112008-4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year_published: 1985,
  },
  {
    isbn: "978-0-452-28423-4",
    title: "1987",
    author: "George Orwell",
    year_published: 1947,
  },
  {
    isbn: "978-1-5011-8687-0",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    year_published: 2019,
  },
]

export const tableWithoutBorder: TableWithoutBorder[] = [
  {
    date: "21-07-2024",
    exercise_type: "Running",
    duration: 30,
    calories_burned: 300,
  },
  {
    date: "29-07-2024",
    exercise_type: "Cycling",
    duration: 45,
    calories_burned: 400,
  },
  {
    date: "11-08-2024",
    exercise_type: "Yoga",
    duration: 60,
    calories_burned: 200,
  },
  {
    date: "25-11-2024",
    exercise_type: "Weightlifting",
    duration: 40,
    calories_burned: 250,
  },
]

export const verticalAlignment: VerticalAlignment[] = [
  {
    heading1: 'This cell inherits <code>vertical-align: middle; </code>from the table',
    heading2: 'This cell inherits <code>vertical-align: middle; </code>from the table',
    heading3: 'This cell inherits <code>vertical-align: middle; </code>from the table',
    heading4: 'This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.',
  },
  {
    heading1: 'This cell inherits <code>vertical-align: bottom; </code>from the table row',
    heading2: 'This cell inherits <code>vertical-align: bottom; </code>from the table row',
    heading3: 'This cell inherits <code>vertical-align: bottom; </code>from the table row',
    heading4: 'This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.',
  },
  {
    heading1: 'This cell inherits <code>vertical-align: middle; </code>from the table',
    heading2: 'This cell inherits <code>vertical-align: middle; </code>from the table',
    heading3: 'This cell is aligned to the top.',
    heading4: 'This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.',
  },
]

export const anatomyTable: AnatomyTable[] = [
  {
    version: '1.0.0',
    class: 'primary',
    release_date: '15-05-2024',
    new_features: 'Improved UI',
    bug_fixes: 'Resolved crash on startup',
  },
  {
    version: '1.1.0',
    class: 'secondary',
    release_date: '25-06-2024',
    new_features: 'Added user profiles',
    bug_fixes: 'Fixed login issues',
  },
  {
    version: '2.1.0',
    class: 'warning',
    release_date: '06-06-2024',
    new_features: 'Security features',
    bug_fixes: 'Corrected auth errors',
  },
  {
    version: '2.2.0',
    class: 'success',
    release_date: '08-07-2024',
    new_features: 'Multi-language support',
    bug_fixes: 'Fixed display bugs',
  },
  {
    version: '3.1.0',
    class: 'info',
    release_date: '12-08-2024',
    new_features: 'Added Sellers',
    bug_fixes: 'Fixed seller details',
  },
  {
    version: '3.2.0',
    class: 'primary',
    release_date: '27-09-2024',
    new_features: 'Added dashboards',
    bug_fixes: 'Fixed Timeline issue',
  },
  {
    version: '4.1.0',
    class: 'secondary',
    release_date: '28-12-2024',
    new_features: 'Gallery placeholders',
    bug_fixes: 'Fixed placeholder delay issue',
  },
]

export const tableFoot: TableFoot[] = [
  {
    product_id: 'P005',
    product_name: 'Headphones',
    category: 'Audio',
    price: '$120',
  },
  {
    product_id: 'P006',
    product_name: 'Blender',
    category: 'Kitchen',
    price: '$80',
  },
  {
    product_id: 'P007',
    product_name: 'Smartphone',
    category: 'Electronics',
    price: '$690',
  },
  {
    product_id: 'P008',
    product_name: 'Electric Kettle',
    category: 'Home',
    price: '$40',
  },
]

export const tableGroupDividers: TableGroupDivider[] = [
  {
    id: 1,
    first_name: 'Mark',
    last_name: 'Otto',
    handle: '@mdo',
  },
  {
    id: 2,
    first_name: 'Jacob',
    last_name: 'Thornton',
    handle: '@fat',
  },
  {
    id: 3,
    first_name: 'Larry the Bird',
    handle: '@twitter',
  },
  {
    id: 4,
    first_name: 'Larry',
    last_name: 'Olson',
    handle: '@instagram',
  },
  {
    id: 5,
    first_name: 'Franklin',
    handle: '@linkedin',
  },
]

export const breakpointTable: BreakpointTable[] = [
  {
    id: 1,
    name: 'Iphone X Grey',
    order_id: 'C12345',
    price: 12550,
    quantity: 1,
    total: '$12550',
  },
  {
    id: 2,
    name: 'Titan Watch',
    order_id: 'A14725',
    price: 120,
    quantity: 2,
    total: '$250',
  },
  {
    id: 3,
    name: 'Apple Airpods',
    order_id: 'B54213',
    price: 210,
    quantity: 1,
    total: '$210',
  },
]

export const responsiveTable: ResponsiveTable[] = [
  {
    id: 1,
    task: 'Web Development',
    email: 'Pixel@efo.com',
    phone: '+91 7874226671',
    assign: 'Mark Jecno',
    date: '12/07/2024',
    price: 2315.00,
    status: 'Pending',
    progress: '75%',
    class: 'danger'
  },
  {
    id: 2,
    task: 'Graphic Design',
    email: 'Strap@google.com',
    phone: '+91 8347855785',
    assign: 'Elana John',
    date: '23/08/2024',
    price: 4125.00,
    status: 'Pending',
    progress: '45%',
    class: 'danger'
  },
  {
    id: 3,
    task: 'WordPress',
    email: 'Pixelstrap@gmail.com',
    phone: '+91 635609347',
    assign: 'John Deo',
    date: '15/04/2024',
    price: 6123.00,
    status: 'Done',
    progress: '100%',
    class: 'success'
  },
]

export const sizingTable: SizingTable[] = [
  {
    id: 1,
    employee_name: 'Mark Jecno',
    date: '22/08/2024',
    status: 'On leave',
    hours: 0,
    performance: '29/30',
    class: 'danger'
  },
  {
    id: 2,
    employee_name: 'Elana Robbert',
    date: '21/08/2024',
    status: 'Present',
    hours: 10,
    performance: '30/30',
    class: 'success'
  },
  {
    id: 3,
    employee_name: 'John Deo',
    date: '18/08/2024',
    status: 'On leave',
    hours: 8,
    performance: '28/30',
    class: 'danger'
  },
]

export const customTable: CustomTable[] = [
  {
    id: 1,
    film_title: 'Frozen',
    released: 2013,
    studio: 'Disney',
    budget: '150,000,000',
    domestic_gross: '400,953,009',
  },
  {
    id: 2,
    film_title: 'Minions',
    released: 2015,
    studio: 'Universal',
    budget: '74,000,000',
    domestic_gross: '336,045,770',
  },
  {
    id: 3,
    film_title: 'Zootopia',
    released: 2016,
    studio: 'Disney',
    budget: '150,000,000',
    domestic_gross: '341,268,248',
  },
  {
    id: 4,
    film_title: 'Finding Dory',
    released: 2016,
    studio: 'Disney Pixar',
    budget: '175,000,000',
    domestic_gross: '486,295,561',
  },
  {
    id: 5,
    film_title: 'Toy Story 3',
    released: 2010,
    studio: 'Disney Pixar',
    budget: '200,000,000',
    domestic_gross: '415,004,880',
  },
]

export const dashedBorderTable: DashedBorderTable[] = [
  {
    id: 1,
    class_name: 'Crit Cardio',
    type: 'Gym',
    hours: '9:00 AM - 11:00 AM',
    trainer: 'Aaron Chapman',
    spots: 10,
  },
  {
    id: 2,
    class_name: 'Zumba Dance',
    type: 'Dance',
    hours: '8:00 AM - 9:00 AM',
    trainer: 'Donna Wilson',
    spots: 12,
  },
  {
    id: 3,
    class_name: 'Like a butterfly',
    type: 'Boxing',
    hours: '9:00 AM - 10:00 AM',
    trainer: 'Randy Porter',
    spots: 13,
  },
  {
    id: 4,
    class_name: 'Pilates Reformer',
    type: 'Gym',
    hours: '7:00 AM - 8:30 AM',
    trainer: 'Aaron Chapman',
    spots: 15,
  },
  {
    id: 5,
    class_name: 'Mind & Body',
    type: 'Yoga',
    hours: '8:00 AM - 9:00 AM',
    trainer: 'Adam Stewart',
    spots: 20,
  },
]

export interface NestingTable {
  date: string;
  student_name: string;
  status: string;
  class: string;
  notes: string;
  courses?: Courses[];
}

export interface Courses {
  course_name: string;
  instructor: string;
  day: string;
  time: string;
}

export const nestingTable = [
  {
    date: "05-09-2024",
    student_name: "Ryder Grant",
    status: "Present",
    class: 'success',
    notes: "On time",
    courses: [
      {
        course_name: "Data Structures",
        instructor: "Prof. A. Smith",
        day: "Monday",
        time: "10:00 AM",
      },
      {
        course_name: "Database Systems",
        instructor: "Prof. D. Johnson",
        day: "Friday",
        time: "09:00 AM",
      },
    ],
  },
  {
    date: "11-10-2024",
    student_name: "Collins Ellison",
    status: "Absent",
    class: 'danger',
    notes: "Sick leave",
  },
  {
    date: "25-11-2024",
    student_name: "Ocean Kelly",
    status: "Present",
    class: 'success',
    notes: "Late by 10 minutes",
  },
  {
    date: "18-12-2024",
    student_name: "Jayce Fisher",
    status: "Absent",
    class: 'danger',
    notes: "Family emergency",
  },
]