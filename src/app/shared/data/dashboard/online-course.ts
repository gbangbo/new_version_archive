import { ActiveCourse, CompletedCourses, Course, MyCourses, TopMentors, UpcomingSchedule } from "../../interface/dashboard/online-course"
import { primaryColor } from "../common";

export const courses: Course[] = [
  {
    title: 'Completed Courses',
    total_course: 100,
    icon: 'course-1',
  },
  {
    title: 'In Progress Courses',
    total_course: 80,
    icon: 'course-2',
    color: 'warning'
  }
]

export const squaresColor = [
  { id: 1, color: 'warning' },
  { id: 1, color: 'primary' },
  { id: 2, color: 'warning1' },
  { id: 3, color: 'danger' },
  { id: 4, color: 'light' },
  { id: 5, color: 'warning' },
  { id: 6, color: 'success' },
  { id: 7, color: 'success' }
]

export const todayProgressChart: any = {
  series: [38, 60],
  chart: {
    width: 240,
    height: 360,
    type: "radialBar",
    offsetX: -28,
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 20,
          color: "var(--chart-text-color)",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 500,
        },
        value: {
          fontSize: "22px",
          offsetY: -16,
          fontFamily: "Rubik, sans-serif",
          fontWeight: 500,
        },
        total: {
          show: true,
          label: "Task Done!",
          fontSize: "12px",
          formatter: function () {
            return "89%";
          },
        },
      },
      hollow: {
        margin: 5,
        size: "70%",
        image: "assets/images/dashboard-3/round.png",
        imageWidth: 115,
        imageHeight: 115,
        imageClipped: false,
      },
      track: {
        background: "transparent",
      },
    },
  },
  colors: ["var(--theme-default)", "#FFA941"],
  labels: ["Progress", "Done"],
  stroke: {
    lineCap: "round",
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    offsetY: -15,
    fontSize: "14px",
    fontFamily: "Rubik, sans-serif",
    fontWeight: 500,
    labels: {
      colors: "var(--chart-text-color)",
    },
    markers: {
      width: 6,
      height: 6,
    },
  },
  responsive: [
    {
      breakpoint: 1830,
      options: {
        chart: {
          height: 330,
          offsetX: -40,
        },
      },
    },
    {
      breakpoint: 1750,
      options: {
        chart: {
          offsetX: -50,
        },
      },
    },
    {
      breakpoint: 1661,
      options: {
        chart: {
          offsetX: -10,
        },
      },
    },
    {
      breakpoint: 1530,
      options: {
        chart: {
          offsetX: -25,
        },
      },
    },
    {
      breakpoint: 1447,
      options: {
        chart: {
          height: 260,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          offsetX: 10,
          height: 285,
        },
      },
    },
    {
      breakpoint: 1300,
      options: {
        chart: {
          offsetX: -10,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          width: 255,
          height: 320,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          width: 245,
          height: 290,
        },
      },
    },
    {
      breakpoint: 614,
      options: {
        chart: {
          height: 270,
        },
      },
    },
    {
      breakpoint: 600,
      options: {
        chart: {
          width: 225,
        },
      },
    },
  ],
  title: 'Today Progress',
  description: 'Your Daily Goal Almost Done!'
}

export const learningOverviewChart: any = {
  series: [
    {
      name: "growth",
      type: "line",
      data: [25, 30, 43, 25, 38, 25, 33, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 30, 41, 25, 36, 25, 31, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 29, 37, 25, 34, 25, 29, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 28, 34, 25, 32, 25, 28, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 27, 30, 25, 28, 25, 27, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 26, 24, 25, 24, 25, 24, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 26, 20, 25, 21, 25, 23, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 24, 16, 25, 18, 25, 22, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 23, 12, 25, 15, 25, 21, 25],
    },
    {
      name: "growth",
      type: "line",
      data: [25, 23, 10, 25, 13, 25, 19, 25],
    },
    {
      name: "growth",
      type: "area",
      data: [25, 28, 37, 25, 33, 25, 27, 25],
    },
  ],
  chart: {
    height: 315,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: true,
    borderColor: "var(--chart-border)",
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  colors: ["var(--theme-default)", "#F47DEA", "#FFA941", "#FFC200", "#54BA4A", "#3DA831", "#57B9F6", "#FF3377", "#773ACE", "#945CFF", primaryColor],
  stroke: {
    width: 1.5,
    curve: "smooth",
  },
  markers: {
    discrete: [
      {
        seriesIndex: 0,
        dataPointIndex: 0,
        fillColor: "#7064F5",
        strokeColor: "var(--white)",
        size: 6,
      },
      {
        seriesIndex: 1,
        dataPointIndex: 5,
        fillColor: "#7064F5",
        strokeColor: "var(--white)",
        size: 6,
      },
      {
        seriesIndex: 2,
        dataPointIndex: 3,
        fillColor: "#7064F5",
        strokeColor: "var(--white)",
        size: 6,
      },
    ],
  },
  tooltip: {
    shared: false,
    intersect: false,
  },
  xaxis: {
    type: "category",
    categories: ["Sep 5", "Sep 8", "Sep 12", "Sep 16", "Sep 18", "Sep 17", "Sep 23", "Sep 26"],
    tickAmount: 12,
    labels: {
      style: {
        colors: "var(--chart-text-color)",
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  fill: {
    type: ["solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "solid", "gradient"],
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 80, 100],
    },
  },
  yaxis: {
    min: 0,
    max: 50,
    tickAmount: 5,
    labels: {
      style: {
        colors: "var(--chart-text-color)",
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,
      },
    },
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 1661,
      options: {
        chart: {
          height: 270,
        },
      },
    },
  ],
  title: 'Learning Overview',
  description: '(75% activity growth)'
}

export const activityHoursChart: any = {
  title: 'Activity Hours',
  series: [
    {
      name: "Activity",
      data: [2, 4, 2.5, 1.5, 5.5, 1.5, 4],
    },
  ],
  chart: {
    height: 310,
    type: "bar",
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 5,
      color: "#7064F5",
      opacity: 0.35,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: "30%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["S", "M", "T", "W", "T", "F", "S"],
    labels: {
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "var(--chart-text-color)",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: function (val: string) {
        return val + " " + "Hr";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "var(--chart-text-color)",
      },
    },
  },
  grid: {
    borderColor: "var(--chart-dashed-border)",
    strokeDashArray: 5,
  },
  colors: ["#7064F5", "#8D83FF"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      gradientToColors: ["#7064F5", "#8D83FF"],
      opacityFrom: 0.98,
      opacityTo: 0.85,
      stops: [0, 100],
    },
  },
  responsive: [
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
  chart_details: [
    {
      title: 'Time Spent',
      value: 30
    },
    {
      title: 'Course Subscribe',
      value: 45
    },
    {
      title: 'Exams Passed',
      value: 12
    }
  ]
}

export const upcomingCourses: any = {
  title: 'Upcoming Courses',
  series: [
    {
      data: [
        {
          x: "Development",
          y: [new Date("2022-01-20").getTime(), new Date("2022-03-8").getTime()],
          strokeColor: "var(--theme-default)",
          fillColor: "var(--white)",
        },
        {
          x: "Marketing",
          y: [new Date("2022-01-8").getTime(), new Date("2022-02-30").getTime()],
          strokeColor: "#54BA4A",
          fillColor: "var(--white)",
        },
        {
          x: "UI/UX Design",
          y: [new Date("2022-02-01").getTime(), new Date("2022-03-10").getTime()],
          strokeColor: "#FFAA05",
          fillColor: "var(--white)",
        },
        {
          x: "Data Mining",
          y: [new Date("2022-02-10").getTime(), new Date("2022-03-15").getTime()],
          strokeColor: "#FF3364",
          fillColor: "var(--white)",
        },
      ],
    },
  ],
  chart: {
    height: 305,
    type: "rangeBar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      barHeight: "50%",
      dataLabels: {
        hideOverflowingLabels: false,
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: any, opts: { w: { globals: { labels: { [x: string]: any; }; }; }; dataPointIndex: string | number; }) {
      var label = opts.w.globals.labels[opts.dataPointIndex];
      return label;
    },
    textAnchor: "middle",
    offsetX: 0,
    offsetY: 0,
    background: {
      enabled: true,
      foreColor: "var(--chart-text-color)",
      padding: 10,
      borderRadius: 12,
      borderWidth: 1,
      opacity: 0.9,
    },
  },
  xaxis: {
    type: "datetime",
    position: "top",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    row: {
      colors: ["var(--light-background)", "var(--white)"],
      opacity: 1,
    },
  },
  stroke: {
    width: 2,
  },
  states: {
    normal: {
      filter: {
        type: "none",
      },
    },
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: "none",
      },
    },
  },
  responsive: [
    {
      breakpoint: 1661,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 360,
        },
      },
    },
    {
      breakpoint: 575,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
}

export const topMentors: TopMentors[] = [
  {
    id: 1,
    mentor_name: 'Kathrin Ney',
    mentor_profile: 'assets/images/dashboard/user/6.jpg',
    expertise: 'Data Science',
    courses: 110,
    experience: '12 Year'
  },
  {
    id: 2,
    mentor_name: 'Mili Pais',
    mentor_profile: 'assets/images/dashboard/user/3.jpg',
    expertise: 'UI/UX Designer',
    courses: 210,
    experience: '06 Year'
  },
  {
    id: 3,
    mentor_name: 'Robert Fox',
    mentor_profile: 'assets/images/dashboard/user/4.jpg',
    expertise: 'English Literature',
    courses: 920,
    experience: '15 Year'
  },
  {
    id: 4,
    mentor_name: 'Caleb Riv',
    mentor_profile: 'assets/images/dashboard/user/2.jpg',
    expertise: 'Web Designer',
    courses: 110,
    experience: '12 Year'
  },
  {
    id: 5,
    mentor_name: 'Caryl Kauth',
    mentor_profile: 'assets/images/dashboard/user/1.jpg',
    expertise: 'JS Developer',
    courses: 120,
    experience: '10 Year'
  },
  {
    id: 6,
    mentor_name: 'Eriko Fonsa',
    mentor_profile: 'assets/images/dashboard/user/5.jpg',
    expertise: 'Painter',
    courses: 360,
    experience: '06 Year'
  },
  {
    id: 7,
    mentor_name: 'Olivia Gor',
    mentor_profile: 'assets/images/dashboard/user/13.jpg',
    expertise: 'Mathematics',
    courses: 221,
    experience: '08 Year'
  },
  {
    id: 8,
    mentor_name: 'Emily Park',
    mentor_profile: 'assets/images/dashboard/user/10.jpg',
    expertise: 'Painter',
    courses: 859,
    experience: '03 Year'
  }
]

export const completedCourses: CompletedCourses[] = [
  {
    id: 1,
    student_name: 'Cody Fisher',
    student_profile: 'assets/images/dashboard/user/7.jpg',
    course_name: 'Python',
    completion_date: 'Oct 25, 2024',
    mentor_name: 'Wade Warren'
  },
  {
    id: 2,
    student_name: 'Alexis Taylor',
    student_profile: 'assets/images/dashboard/user/12.jpg',
    course_name: 'Analysis',
    completion_date: 'May 20, 2024',
    mentor_name: 'Dylan Sullivan'
  },
  {
    id: 3,
    student_name: 'Jenny Wilson',
    student_profile: 'assets/images/user/10.jpg',
    course_name: 'Development',
    completion_date: 'Apr 28, 2024',
    mentor_name: 'Guy Hawkins'
  },
  {
    id: 4,
    student_name: 'Lily Ramirez',
    student_profile: 'assets/images/dashboard/user/2.jpg',
    course_name: 'Marketing',
    completion_date: 'Mar 13, 2024',
    mentor_name: 'Ethan Brooks'
  },
  {
    id: 5,
    student_name: 'Andrew Price',
    student_profile: 'assets/images/dashboard/user/11.jpg',
    course_name: 'Developer',
    completion_date: 'Feb 12, 2024',
    mentor_name: 'Nathan Cooper'
  },
  {
    id: 6,
    student_name: 'Luke Mitchell',
    student_profile: 'assets/images/user/6.jpg',
    course_name: 'Mathematics',
    completion_date: 'Apr 12, 2024',
    mentor_name: 'Owen Davis'
  },
  {
    id: 7,
    student_name: 'Caleb Rivera',
    student_profile: 'assets/images/user/3.png',
    course_name: 'Architect',
    completion_date: 'May 09, 2024',
    mentor_name: 'Zoey Jenkins'
  },
  {
    id: 8,
    student_name: 'Chloe Wilson',
    student_profile: 'assets/images/user/14.png',
    course_name: 'Writer',
    completion_date: 'May 04, 2024',
    mentor_name: 'Alexis Taylor'
  }
]

export const myCourses: MyCourses[] = [
  {
    id: 1,
    course_name: 'Management',
    image_url: 'assets/images/dashboard-3/course/1.svg',
    icon: 'assets/images/dashboard-3/course/back-arrow/1.png'
  },
  {
    id: 2,
    course_name: 'Web Development',
    image_url: 'assets/images/dashboard-3/course/2.svg',
    icon: 'assets/images/dashboard-3/course/back-arrow/2.png'
  },
  {
    id: 3,
    course_name: 'Business Analytics',
    image_url: 'assets/images/dashboard-3/course/3.svg',
    icon: 'assets/images/dashboard-3/course/back-arrow/1.png'
  },
  {
    id: 4,
    course_name: 'Marketing',
    image_url: 'assets/images/dashboard-3/course/4.svg',
    icon: 'assets/images/dashboard-3/course/back-arrow/3.png'
  }
]

export const upcomingSchedule: UpcomingSchedule[] = [
  {
    id: 1,
    course_name: 'Web Design',
    user_profile: 'assets/images/dashboard/user/4.jpg',
    date: 'March 3, 2024',
    time: '09.00 - 12.00 AM',
    color: 'primary'
  },
  {
    id: 12,
    course_name: 'UI/UX Design',
    user_profile: 'assets/images/dashboard/user/2.jpg',
    date: 'April 10, 2024',
    time: '11.00 - 1.00 PM',
    color: 'warning'
  }
]

function lessonCommonOption(data: { color: string[], lessonYSeries: number[] }) {
  return {
    series: data.lessonYSeries,
    chart: {
      type: "donut",
      height: 80,
    },
    colors: data.color,
    legend: {
      show: false,
    },
    stroke: {
      width: 1,
      colors: "var(--white)",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              fontSize: "11px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
              color: "var(--chart-text-color)",
              offsetY: -12,
              formatter: function (val: any) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: false,
              label: "Total",
              fontSize: "11px",
              fontFamily: "Rubik, sans-serif",
            },
          },
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
  };
}

export const activeCourse: ActiveCourse[] = [
  {
    id: 1,
    course_name: 'UI/UX',
    course_type: 'Web design',
    logo: 'assets/images/dashboard-3/lessons/1.png',
    chart_details: lessonCommonOption({
      color: ["var(--theme-default)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)"],
      lessonYSeries: [20, 5, 5, 5, 5, 5, 5]
    })
  },
  {
    id: 2,
    course_name: 'Vue 3',
    course_type: 'JS Framework',
    logo: 'assets/images/dashboard-3/lessons/2.png',
    chart_details: lessonCommonOption({
      color: ["var(--theme-default)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)"],
      lessonYSeries: [50, 10, 10, 10],
    })
  },
  {
    id: 3,
    course_name: 'Bootstrap 5',
    course_type: 'Framework',
    logo: 'assets/images/dashboard-3/lessons/3.png',
    chart_details: lessonCommonOption({
      color: ["var(--theme-default)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)", "var(--chart-progress-light)"],
      lessonYSeries: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
  }
]
