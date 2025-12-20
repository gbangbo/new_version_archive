import { AttendanceOverview, BirthdayUser, Days, EmployeeDetails, EmployeeList, InterviewSchedule, LeaveRequest, TodaySchedule } from "../../interface/dashboard/hr";
import { primaryColor, secondaryColor } from "../common";

export const employeeDetails: EmployeeDetails[] = [
  {
    id: 1,
    title: 'Total Employees',
    value: 356,
    icon: 'analytics-user',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Hired Candidates',
    value: 100,
    icon: 'hire-candidate',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Gross Salary',
    value: 562210,
    icon: 'gross-salary',
    color: 'warning'
  },
  {
    id: 4,
    title: 'New Employee',
    value: 70,
    icon: 'new-employee',
    color: 'success'
  }
]

export const applicationOverview: any = {
  chart: {
    series: [
      {
        type: "rangeArea",
        name: "Hired",

        data: [
          {
            x: "Jan",
            y: [5, 12],
          },
          {
            x: "Feb",
            y: [8, 13],
          },
          {
            x: "Mar",
            y: [6, 18],
          },
          {
            x: "Apr",
            y: [8, 16],
          },
          {
            x: "May",
            y: [16, 27],
          },
          {
            x: "Jun",
            y: [0, 11],
          },
          {
            x: "Jul",
            y: [11, 15],
          },
          {
            x: "Aug",
            y: [6, 10],
          },
        ],
      },

      {
        type: "rangeArea",
        name: "Applications",
        data: [
          {
            x: "Jan",
            y: [21, 24],
          },
          {
            x: "Feb",
            y: [30, 37],
          },
          {
            x: "Mar",
            y: [28, 35],
          },
          {
            x: "Apr",
            y: [24, 30],
          },
          {
            x: "May",
            y: [37, 43],
          },
          {
            x: "Jun",
            y: [39, 49],
          },
          {
            x: "Jul",
            y: [31, 33],
          },
          {
            x: "Aug",
            y: [13, 19],
          },
        ],
      },

      {
        type: "line",
        name: "Hired",
        data: [
          {
            x: "Jan",
            y: 8,
          },
          {
            x: "Feb",
            y: 11,
          },
          {
            x: "Mar",
            y: 12,
          },
          {
            x: "Apr",
            y: 13,
          },
          {
            x: "May",
            y: 20,
          },
          {
            x: "Jun",
            y: 5,
          },
          {
            x: "Jul",
            y: 13,
          },
          {
            x: "Aug",
            y: 8,
          },
          {
            x: "Sep",
            y: 12,
          },
          {
            x: "Oct",
            y: 14,
          },
        ],
      },
      {
        type: "line",
        name: "Applications",
        data: [
          {
            x: "Jan",
            y: 22,
          },
          {
            x: "Feb",
            y: 34,
          },
          {
            x: "Mar",
            y: 31,
          },
          {
            x: "Apr",
            y: 28,
          },
          {
            x: "May",
            y: 40,
          },
          {
            x: "Jun",
            y: 44,
          },
          {
            x: "Jul",
            y: 32,
          },
          {
            x: "Aug",
            y: 16,
          },
          {
            x: "Sep",
            y: 13,
          },
          {
            x: "Oct",
            y: 8,
          },
        ],
      },
    ],
    chart: {
      height: 170,
      type: "rangeArea",
      animations: {
        speed: 500,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#ffb829", primaryColor, "#ffb829", primaryColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 0.24, 1, 1],
    },
    forecastDataPoints: {
      count: 2,
    },
    stroke: {
      curve: "straight",
      width: [0, 0, 2, 2],
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#52526C",
          fontSize: "12px",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 400,
        },
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: "#52526C",
          fontSize: "12px",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 400,
        },
      },
    },
    legend: {
      show: false,
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    responsive: [
      {
        breakpoint: 1560,
        options: {
          xaxis: {
            tickAmount: 5,
            tickPlacement: "between",
          },
        },
      },
      {
        breakpoint: 793,
        options: {
          chart: {
            height: 185,
          },
        },
      },
    ]
  },
  chart_details: [
    { title: 'Application', color: 'primary' },
    { title: 'Hired', color: 'warning' }
  ]
}

export const employeeList: EmployeeList[] = [
  {
    id: 1,
    name: "Wade Warren",
    employee_id: "#45812",
    email: "wade.warr@co.in",
    joining_date: "20 Jun,2024",
    role: "Web Designer",
    image: "assets/images/dashboard-11/user/12.jpg"
  },
  {
    id: 2,
    name: "Michael Mit",
    employee_id: "#58698",
    email: "michael.mit@co.in",
    joining_date: "10 Dec,2024",
    role: "UI Designer",
    image: "assets/images/dashboard/user/6.jpg"
  },
  {
    id: 3,
    name: "Jenny Wilson",
    employee_id: "#320148",
    email: "jenny.wilson@co.in",
    joining_date: "13 May,2024",
    role: "Researcher",
    image: "assets/images/dashboard-11/user/8.jpg"
  },
  {
    id: 4,
    name: "Guy Hawkins",
    employee_id: "#874264",
    email: "guy.hawkins@co.in",
    joining_date: "17 Oct,2024",
    role: "App Developer",
    image: "assets/images/dashboard-11/user/3.jpg"
  },
  {
    id: 5,
    name: "Esther Howard",
    employee_id: "#200148",
    email: "esther.howard@co.in",
    joining_date: "22 Jan,2024",
    role: "Graphic Designer",
    image: "assets/images/dashboard-9/user/2.png"
  },
  {
    id: 6,
    name: "Jacob Jones",
    employee_id: "#985367",
    email: "jacob.jones@co.in",
    joining_date: "20 Apr,2024",
    role: "App Developer",
    image: "assets/images/dashboard-9/user/5.png"
  },
  {
    id: 7,
    name: "Arlene McCoy",
    employee_id: "#45812",
    email: "arlene.mccoy@co.in",
    joining_date: "02 Mar,2024",
    role: "Web Designer",
    image: "assets/images/dashboard-9/user/3.png"
  },
  {
    id: 8,
    name: "Robert Fox",
    employee_id: "#589654",
    email: "robert.fox@co.in",
    joining_date: "12 Feb,2024",
    role: "JS Developer",
    image: "assets/images/dashboard-9/user/1.png"
  }
]

export const attendanceOverview: AttendanceOverview[] = [
  {
    id: 1,
    employee_name: "David Jones",
    designation: "Web Designer",
    check_in_time: "9:26 AM",
    status: "On Time",
    class: "success"
  },
  {
    id: 2,
    employee_name: "Joseph Miller",
    designation: "UI-UX Designer",
    check_in_time: "10:48 AM",
    status: "Late",
    class: "danger"
  },
  {
    id: 3,
    employee_name: "Daniel Moore",
    designation: "Python Developer",
    check_in_time: "9:30 AM",
    status: "On Time",
    class: "success"
  },
  {
    id: 4,
    employee_name: "Ava Garcia",
    designation: "JS Developer",
    check_in_time: "10:04 AM",
    status: "On Time",
    class: "success"
  },
  {
    id: 5,
    employee_name: "Amelia Lee",
    designation: "Next Developer",
    check_in_time: "11:48 AM",
    status: "Late",
    class: "danger"
  },
  {
    id: 6,
    employee_name: "Harper Scott",
    designation: "Marketing",
    check_in_time: "04:45 AM",
    status: "On Time",
    class: "success"
  },
  {
    id: 7,
    employee_name: "Jack Smith",
    designation: "ML Developer",
    check_in_time: "02:20 AM",
    status: "Late",
    class: "danger"
  },
  {
    id: 8,
    employee_name: "Cole Brown",
    designation: "AI Developer",
    check_in_time: "03:45 AM",
    status: "On Time",
    class: "success"
  }
]

export const birthdayUsers: BirthdayUser[] = [
  {
    id: 1,
    name: "Isabella Martinez",
    role: "UI Designer",
    image: "assets/images/dashboard-12/user/10.png",
  },
  {
    id: 2,
    name: "Liam Taylor",
    role: "JS Developer",
    image: "assets/images/dashboard-12/user/2.png",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Tester",
    image: "assets/images/dashboard-12/user/5.png",
  }
];

export const recruitmentAnalysis: any = {
  series: [
    {
      name: "Designer",
      data: [3, 5, 7, 4, 6, 3, 4, 8, 7, 9, 12],
    },
    {
      name: "Developers",
      data: [5, 2, 8, 6, 7, 7, 8, 6, 8, 10, 9],
    },
    {
      name: "Managers",
      data: [4, 3, 3, 6, 7, 10, 13, 10, 12, 16, 17],
    },
    {
      name: "Sales & marketing",
      data: [2, 6, 2, 8, 7, 10, 10, 14, 13, 14, 19],
    },
  ],
  chart: {
    type: "bar",
    height: 290,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: [primaryColor, secondaryColor, "#ffb829", "#65c15c"],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 2,
      columnWidth: "30%",
      dataLabels: {
        total: {
          show: false,
        },
      },
    },
  },
  xaxis: {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"],
    labels: {
      show: true,
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "#52526C",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 60,
    tickAmount: 6,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: function (val: string) {
        return val + " " + "%";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "#52526C",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  responsive: [
    {
      breakpoint: 1852,
      options: {
        chart: {
          height: 345,
        },
      },
    },
    {
      breakpoint: 1706,
      options: {
        chart: {
          height: 360,
        },
      },
    },
    {
      breakpoint: 1641,
      options: {
        chart: {
          height: 250,
        },
      },
    },
    {
      breakpoint: 1550,
      options: {
        xaxis: {
          tickAmount: 6,
          tickPlacement: "between",
        },
      },
    },
    {
      breakpoint: 1491,
      options: {
        chart: {
          height: 390,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 252,
        },
      },
    },
    {
      breakpoint: 646,
      options: {
        chart: {
          height: 215,
        },
      },
    },
  ],
  details: [
    {
      name: 'Designers',
      class: 'primary'
    },
    {
      name: 'Developers',
      class: 'secondary'
    },
    {
      name: 'Managers',
      class: 'warning'
    },
    {
      name: 'Sales & Marketing',
      class: 'success'
    }
  ]
}

export const interviewSchedule: InterviewSchedule[] = [
  {
    name: "Lucas E.",
    role: "UI Designer",
    image: "assets/images/dashboard-11/user/1.jpg",
    date: "10 Feb, 2024"
  },
  {
    name: "Leslie A.",
    role: "Web Designer",
    image: "assets/images/dashboard-11/user/2.jpg",
    date: "17 Oct, 2024"
  },
  {
    name: "Savannah N.",
    role: "Js Developer",
    image: "assets/images/dashboard-11/user/4.jpg",
    date: "21 Sep, 2024"
  },
  {
    name: "Darlene R.",
    role: "App Developer",
    image: "assets/images/dashboard-11/user/7.jpg",
    date: "22 May, 2024"
  },
  {
    name: "Marvin M.",
    role: "Marketing",
    image: "assets/images/dashboard-11/user/10.jpg",
    date: "18 Sep, 2024"
  }
]

export const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    name: "Alison Carol",
    reason: "Family Function",
    leave_period: "24 Jul to 26 Jul 2024",
    image: "assets/images/dashboard/user/6.jpg"
  },
  {
    id: 2,
    name: "Miranda Bailey",
    reason: "Personal Leave",
    leave_period: "10 May to 12 May 2024",
    image: "assets/images/dashboard-11/user/3.jpg"
  },
  {
    id: 3,
    name: "Kathryn Roe",
    reason: "Sick Leave",
    leave_period: "01 Oct to 10 Oct 2024",
    image: "assets/images/dashboard/user/10.jpg"
  },
  {
    id: 4,
    name: "Andrew Baker",
    reason: "Personal Leave",
    leave_period: "15 Nov to 20 Nov 2024",
    image: "assets/images/dashboard/user/9.jpg"
  },
  {
    id: 5,
    name: "Bob James",
    reason: "Sick Leave",
    leave_period: "14 Feb to 16 Feb 2024",
    image: "assets/images/dashboard-11/user/9.jpg"
  },
  {
    id: 6,
    name: "Thomas Tim",
    reason: "Out of Town",
    leave_period: "03 Mar to 10 Mar 2024",
    image: "assets/images/dashboard-11/user/12.jpg"
  },
  {
    id: 7,
    name: "Muriel Bing",
    reason: "Out of Town",
    leave_period: "09 Feb to 16 Feb 2024",
    image: "assets/images/dashboard-11/user/5.jpg"
  },
  {
    id: 8,
    name: "Russell Rose",
    reason: "Sick Leave",
    leave_period: "01 Nov to 05 Nov 2024",
    image: "assets/images/dashboard-11/user/11.jpg"
  }
];

export const days: Days[] = [
  {
    id: 1,
    day: "Mon",
    date: "01",
    value: 'mon'
  },
  {
    id: 2,
    day: "Tue",
    date: "02",
    value: 'tue'
  },
  {
    id: 3,
    day: "Wed",
    date: "03",
    value: 'wed'
  },
  {
    id: 4,
    day: "Thu",
    date: "04",
    value: 'thu'
  },
  {
    id: 5,
    day: "Fri",
    date: "05",
    value: 'fri'
  },
  {
    id: 6,
    day: "Sat",
    date: "06",
    value: 'sat'
  },
  {
    id: 7,
    day: "Sun",
    date: "07",
    value: 'sun'
  }
]

export const todaySchedule: TodaySchedule[] = [
  {
    title: "Meeting With Candidate",
    participants: [
      { image: "assets/images/dashboard/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/6.jpg", alt: "user" },
      { image: "assets/images/user/3.png", alt: "user" },
      { image: "assets/images/dashboard/user/3.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "09.00 - 12.00 AM",
    color_class: "primary",
    value: 'mon'
  },
  {
    title: "Client Meeting with BDE",
    participants: [
      { image: "assets/images/dashboard-11/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/7.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "01.00 - 02.00 AM",
    color_class: "secondary",
    value: 'mon'

  },
  {
    title: "Interview With Candidate",
    participants: [
      { image: "assets/images/dashboard-11/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/2.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/5.jpg", alt: "user" }
    ],
    schedule_name: "Manager's Office",
    time: "02.00 - 02.30 AM",
    color_class: "warning",
    value: 'mon'
  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'mon'
  },
  {
    title: "Training Session",
    participants: [
      { image: "assets/images/dashboard/user/13.jpg", alt: "user" }
    ],
    schedule_name: "Training Room",
    time: "05.30 - 06.00 AM",
    color_class: "primary",
    value: 'mon'
  },
  {
    title: "Performance Review",
    participants: [
      { image: "assets/images/dashboard/user/11.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "08.30 - 09:00 PM",
    color_class: "info",
    value: 'mon'
  },
  {
    title: "Client Meeting with BDE",
    participants: [
      { image: "assets/images/dashboard-11/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/7.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "01.00 - 02.00 AM",
    color_class: "secondary",
    value: 'tue'

  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'tue'
  },
  {
    title: "Training Session",
    participants: [
      { image: "assets/images/dashboard/user/13.jpg", alt: "user" }
    ],
    schedule_name: "Training Room",
    time: "05.30 - 06.00 AM",
    color_class: "primary",
    value: 'tue'
  },
  {
    title: "Meeting With Candidate",
    participants: [
      { image: "assets/images/dashboard/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/6.jpg", alt: "user" },
      { image: "assets/images/user/3.png", alt: "user" },
      { image: "assets/images/dashboard/user/3.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "09.00 - 12.00 AM",
    color_class: "primary",
    value: 'wed'
  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'wed'
  },
  {
    title: "Interview With Candidate",
    participants: [
      { image: "assets/images/dashboard-11/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/2.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/5.jpg", alt: "user" }
    ],
    schedule_name: "Manager's Office",
    time: "02.00 - 02.30 AM",
    color_class: "warning",
    value: 'wed'
  },
  {
    title: "Meeting With Candidate",
    participants: [
      { image: "assets/images/dashboard/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/6.jpg", alt: "user" },
      { image: "assets/images/user/3.png", alt: "user" },
      { image: "assets/images/dashboard/user/3.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "09.00 - 12.00 AM",
    color_class: "primary",
    value: 'thu'
  },
  {
    title: "Client Meeting with BDE",
    participants: [
      { image: "assets/images/dashboard-11/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/7.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "01.00 - 02.00 AM",
    color_class: "secondary",
    value: 'thu'

  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'thu'
  },
  {
    title: "Interview With Candidate",
    participants: [
      { image: "assets/images/dashboard-11/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/2.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/5.jpg", alt: "user" }
    ],
    schedule_name: "Manager's Office",
    time: "02.00 - 02.30 AM",
    color_class: "warning",
    value: 'thu'
  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'fri'
  },
  {
    title: "Performance Review",
    participants: [
      { image: "assets/images/dashboard/user/11.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "08.30 - 09:00 PM",
    color_class: "info",
    value: 'fri'
  },
  {
    title: "Training Session",
    participants: [
      { image: "assets/images/dashboard/user/13.jpg", alt: "user" }
    ],
    schedule_name: "Training Room",
    time: "05.30 - 06.00 AM",
    color_class: "primary",
    value: 'sat'
  },
  {
    title: "Performance Review",
    participants: [
      { image: "assets/images/dashboard/user/11.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "08.30 - 09:00 PM",
    color_class: "info",
    value: 'sat'
  },
  {
    title: "Client Meeting with BDE",
    participants: [
      { image: "assets/images/dashboard-11/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard-11/user/7.jpg", alt: "user" }
    ],
    schedule_name: "HR Office",
    time: "01.00 - 02.00 AM",
    color_class: "secondary",
    value: 'sat'

  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'sat'
  },
  {
    title: "Training Session",
    participants: [
      { image: "assets/images/dashboard/user/13.jpg", alt: "user" }
    ],
    schedule_name: "Training Room",
    time: "05.30 - 06.00 AM",
    color_class: "primary",
    value: 'sat'
  },
  {
    title: "Meeting With Candidate",
    participants: [
      { image: "assets/images/dashboard/user/1.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/6.jpg", alt: "user" },
      { image: "assets/images/user/3.png", alt: "user" },
      { image: "assets/images/dashboard/user/3.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "09.00 - 12.00 AM",
    color_class: "primary",
    value: 'sat'
  },
  {
    title: "Training Session",
    participants: [
      { image: "assets/images/dashboard/user/13.jpg", alt: "user" }
    ],
    schedule_name: "Training Room",
    time: "05.30 - 06.00 AM",
    color_class: "primary",
    value: 'sun'
  },
  {
    title: "Employee Engagement",
    participants: [
      { image: "assets/images/dashboard/user/4.jpg", alt: "user" },
      { image: "assets/images/dashboard/user/2.jpg", alt: "user" }
    ],
    schedule_name: "Zoom Meeting",
    time: "03.00 - 04.15 AM",
    color_class: "success",
    value: 'sun'
  },
]