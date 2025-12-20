import { NewStudentEnroll, NoticeBoard, SchoolDetails, ShiningStar, TodayTask, TopStudent, UnPaidFees } from "../../interface/dashboard/school-management"

export const academicPerformance: any = {
    series: [
        {
          name: "High - 2024",
          data: [20, 65, 147, 70, 100, 55],
        },
    ],
    fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: "#54BA4A",
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
          colorStops: [],
        },
    },
    chart: {
        height: 230,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#54BA4A",
          top: 8,
          left: 0,
          blur: 2,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
    },
    colors: ["#54BA4A", "#54BA4A"],
    dataLabels: {
        enabled: true,
    },
    textAnchor: "middle",
    style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        borderRadius: 2,
        colors: undefined,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    tooltip: {
        x: {
          show: false,
        },
        z: {
          show: false,
        },
    },
    markers: {
        size: 1,
    },
    xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
    },
    yaxis: {
        min: 0,
        max: 160,
        tickAmount: 4,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
    },
    responsive: [
        {
          breakpoint: 1131,
          options: {
            chart: {
              height: 210,
            },
          },
        },
        {
          breakpoint: 1007,
          options: {
            chart: {
              height: 225,
            },
          },
        },
    ],
}

export const schoolPerformance: any = {
    series: [
        {
            name: "week",
            type: "area",
            data: [50, 90, 55, 65, 45, 60, 40, 78, 20, 20, 20],
        },
        {
            name: "performance",
            type: "line",
            data: [60, 95, 29, 44, 42, 95, 44, 30, 50, 25, 50],
        },
    ],
    chart: {
        height: 220,
        type: "line",
        stacked: false,
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 4,
            left: 0,
            blur: 2,
            color: "#7366FF",
            opacity: 0.02,
        },
    },
    stroke: {
        width: [3, 3],
        curve: "smooth",
    },
    grid: {
        show: true,
        borderColor: "var(--chart-border)",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
            lines: {
                show: true,
            },
        },
    },
    colors: ["#7366FF", "#54BA4A"],
    fill: {
        type: ["gradient", "solid"],
        gradient: {
            shade: "light",
            type: "vertical",
            opacityFrom: 0.6,
            opacityTo: 0,
            stops: [0, 100],
        },
    },
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9 ", "Week 10", "Week 11", "Week 12 "],
    markers: {
        discrete: [
            {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: "#7064F5",
                strokeColor: "var(--white)",
                size: 6,
                sizeOffset: 3,
            },
            {
                seriesIndex: 1,
                dataPointIndex: 5,
                fillColor: "#54BA4A",
                strokeColor: "var(--white)",
                size: 6,
            },
        ],
        hover: {
            size: 6,
            sizeOffset: 0,
        },
    },
    xaxis: {
        type: "category",
        tickAmount: 4,
        tickPlacement2: "between",
        tickPlacement: "on",
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            color: "var(--chart-border)",
        },
        axisTicks: {
            show: false,
        },
    },
    legend: {
        show: false,
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        tickPlacement: "between",
    },
    tooltip: {
        shared: false,
        intersect: false,
    },
    responsive: [
        {
            breakpoint: 1200,
            options: {
                chart: {
                    height: 250,
                },
            },
        },
        {
            breakpoint: 1201,
            options: {
                chart: {
                    height: 260,
                },
            },
        },
    ],
}

export const schoolDetails: SchoolDetails[] = [
    {
        title: 'Teachers',
        class: 'warning',
        count: '1,098',
        icon: 'down',
        percentage: '-3.7%',
        alt: 'Total Teachers',
        image: 'assets/images/dashboard-7/icon-2.svg',
    },
    {
        title: 'Students',
        class: 'primary',
        count: '890',
        icon: 'up',
        percentage: '+6.7%',
        alt: 'Total Students',
        image: 'assets/images/dashboard-7/icon1.svg',
    },
    {
        title: 'Parents',
        class: 'success',
        count: '1,018',
        icon: 'up',
        percentage: '+2.0%',
        alt: 'Total Parents',
        image: 'assets/images/dashboard-7/icon-3.svg',
    },
]

export const schoolFinance: any = {
    series: [
        {
            name: "Income",
            type: "line",
            data: [45, 47, 30, 45, 30, 60],
        },
        {
            name: "Expense",
            type: "line",
            data: [55, 65, 55, 80, 40, 65],
        },
        {
            name: "Revenue",
            type: "line",
            data: [50, 40, 70, 40, 100, 70],
        },
    ],
    chart: {
        height: 265,
        type: "line",
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 4,
            left: 0,
            blur: 2,
            colors: ["#7366FF", "#54BA4A", "#FFAA05"],
            opacity: 0.02,
        },
    },
    grid: {
        show: false,
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    colors: ["#7366FF", "#54BA4A", "#FFAA05"],
    stroke: {
        width: 3,
        curve: "smooth",
        opacity: 1,
    },
    markers: {
        discrete: [
            {
                seriesIndex: 1,
                dataPointIndex: 3,
                fillColor: "#54BA4A",
                strokeColor: "var(--white)",
                size: 6,
            },
        ],
    },
    tooltip: {
        shared: false,
        intersect: false,
        marker: {
            width: 5,
            height: 5,
        },
    },
    xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        tickAmount: 12,
        crosshairs: {
            show: false,
        },
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
        opacity: 1,
        type: "gradient",
        gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 1,
            opacityFrom: 0.95,
            opacityTo: 1,
            stops: [0, 90, 100],
        },
    },
    yaxis: {
        tickAmount: 5,
        labels: {
            show: false,
        },
    },
    legend: {
        show: false,
    },
    responsive: [
        {
            breakpoint: 1736,
            options: {
                chart: {
                    height: 230,
                    offsetX: 0,
                },
            },
        },
        {
            breakpoint: 1401,
            options: {
                chart: {
                    height: 250,
                    offsetX: 0,
                },
            },
        },
        {
            breakpoint: 1200,
            options: {
                chart: {
                    height: 250,
                },
            },
        },
        {
            breakpoint: 1150,
            options: {
                chart: {
                    height: 200,
                },
            },
        },
        {
            breakpoint: 1007,
            options: {
                chart: {
                    height: 230,
                },
            },
        },
        {
            breakpoint: 754,
            options: {
                chart: {
                    offsetY: -50,
                },
            },
        },
    ],
    details: [
        {
            title: 'Income',
            count: '57,143',
            class: 'primary'
        },
        {
            title: 'Expense',
            count: '39,023',
            class: 'warning'
        },
        {
            title: 'Revenue',
            count: '18,120',
            class: 'success'
        }
    ]
}

export const performanceOverview: any = {
    series: [55, 55, 58, 45],
    chart: {
        width: 270,
        type: "polarArea",
        height: 270,
    },
    labels: ["Science", "Maths", "Economics", "History"],
    fill: {
        opacity: 1,
        type: ["solid"],
        gradient: {
            shade: "light",
            type: "vertical",
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 100],
        },
        colors: ["#7366FF", "#FFAA05", "#54BA4A", "#FF3364"],
    },

    stroke: {
        width: 0,
    },
    yaxis: {
        show: false,
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,

        labels: {
            useSeriesColors: false,
        },
        markers: {
            fillColors: ["#7366FF", "#FFAA05", "#54BA4A", "#FF3364"],
            radius: 10,
            width: 14,
            height: 14,
            strokeWidth: 1,
            strokeColor: "#fff",
        },
        itemMargin: {
            horizontal: 12,
            vertical: 12,
        },
    },

    plotOptions: {
        polarArea: {
            rings: {
                strokeWidth: 0,
            },
            spokes: {
                strokeWidth: 0,
            },
        },
        pie: {
            offsetX: 0,
            offsetY: 0,
        },
    },
    theme: {
        monochrome: {
            enabled: true,
            shadeTo: "light",
            shadeIntensity: 0.6,
        },
    },

    responsive: [
        {
            breakpoint: 1870,
            options: {
                chart: {
                    height: 260,
                    offsetX: -15,
                },
            },
        },
        {
            breakpoint: 1626,
            options: {
                chart: {
                    height: 240,
                    offsetX: -15,
                },
            },
        },
        {
            breakpoint: 1500,
            options: {
                chart: {
                    height: 230,
                    offsetX: -15,
                    offsetY: 40,
                },
            },
        },
        {
            breakpoint: 1199,
            options: {
                chart: {
                    height: 230,
                    offsetX: -10,
                },
            },
        },
        {
            breakpoint: 1093,
            options: {
                chart: {
                    height: 220,
                    offsetX: -20,
                    offsetY: 50,
                },
            },
        },
        {
            breakpoint: 992,
            options: {
                chart: {
                    height: 220,
                    offsetX: -20,
                    offsetY: 30,
                },
            },
        },
        {
            breakpoint: 885,
            options: {
                chart: {
                    height: 220,
                    offsetX: -10,
                    offsetY: 20,
                },
            },
        },
        {
            breakpoint: 835,
            options: {
                chart: {
                    height: 220,
                    offsetX: -10,
                    offsetY: 20,
                },
            },
        },
    ],
    marks:[
        {
            image: 'assets/images/dashboard-7/attendance/1.png',
            alt: 'homework',
            title: 'Homework',
            text: 'Bring Something into the Classroom...',
            mark: 89,
            percentage: '+80%'
        },
        {
            image: 'assets/images/dashboard-7/attendance/2.png',
            alt: 'tests',
            title: 'Tests',
            text: 'These 5 study tips can help you take...',
            mark: 95,
            percentage: '+97%'
        },
        {
            image: 'assets/images/dashboard-7/attendance/3.png',
            alt: 'attendance',
            title: 'Attendance',
            text: 'Student absence reduces even best....',
            mark: 92,
            percentage: '+94%'
        }
    ]
}

export const todayTask: TodayTask[] = [
    {
        id: 'checkbox-task-1',
        checked: true,
        title: 'Teacher Meeting & Campus Tour',
        class: 'Class Number 10',
        icon: 'primary',
        time: '11 : 00 AM',
        status: 'In Progress',
        status_class: 'button-primary',
    },
    {
        id: 'checkbox-task-2',
        checked: false,
        title: 'Exercise 1, 2 and Learn more Books',
        class: 'Class Number 11',
        icon: 'clock',
        time: '01 : 00 PM',
        status: 'Done',
        status_class: 'badge-light-success',
        tr_class: 'light-card'
    },
    {
        id: 'checkbox-task-3',
        checked: false,
        title: 'Guest Lecture and Parent Meeting',
        class: 'Class Number 8',
        icon: 'clock',
        time: '09 : 00 AM',
        status: 'Done',
        status_class: 'badge-light-success'
    },
    {
        id: 'checkbox-task-4',
        checked: false,
        title: 'Meetup meeting with new Client',
        class: 'Class Number 11',
        icon: 'primary',
        time: '02 : 00 PM',
        status: 'In Progress',
        status_class: 'button-primary',
        tr_class: 'light-card'
    },
]

export const noticeBoard: NoticeBoard[] = [
    {
        class: 'primary',
        date: '16 Feb, 2024',
        title: "We have over 25 years of experience. We've rented more than 250 properties and won awards.",
        time: 'Jennyfar Lopez / 5 min ago',
        badge: true,
    },
    {
        class: 'secondary',
        date: '17 Feb, 2024',
        title: "Drawing Competition, Story Telling Competition, Craft and Creativity & Dance Competition",
        time: 'Rubi Rao / 10 min ago',
    },
    {
        class: 'success',
        date: '18 Feb, 2024',
        title: "Announces a series of Parent Education Webinars for connected parents",
        time: 'Jenny Wilson / 1 hr ago',
    },
    {
        class: 'warning',
        date: '19 Feb, 2024',
        title: "Rakhi Making Competition  & Independence day and Investiture Ceremony",
        time: 'Cameron Williamson / 10 min ago',
    },
]

export const shiningStar: ShiningStar[] = [
    {
        class: 'light-card',
        image: 'assets/images/dashboard-7/attendance/student-leader/rank-1.svg',
        user_image: 'assets/images/dashboard-7/attendance/student-leader/user-1.jpg',
        name: 'Jacob',
        grade: '10',
        percentage: '98.75'
    },
    {
        class: 'light-card',
        image: 'assets/images/dashboard-7/attendance/student-leader/rank-2.svg',
        user_image: 'assets/images/dashboard-7/attendance/student-leader/user-2.jpg',
        name: 'Jenny',
        grade: '09',
        percentage: '92.60'
    },
    {
        class: 'light-card',
        image: 'assets/images/dashboard-7/attendance/student-leader/rank-3.svg',
        user_image: 'assets/images/dashboard-7/attendance/student-leader/user-3.jpg',
        name: 'Jacob',
        grade: '11',
        percentage: '88.90'
    },
    {
        number: '4',
        text: 'th',
        user_image: 'assets/images/dashboard-7/attendance/student-leader/user-4.jpg',
        name: 'Bob',
        grade: '12',
        percentage: '79.48'
    },
    {
        number: '5',
        text: 'th',
        user_image: 'assets/images/dashboard-7/attendance/student-leader/user-5.jpg',
        name: 'Ralph',
        grade: '08',
        percentage: '75.95'
    }
]

export const unPaidFees: UnPaidFees[] = [
    {
        id:1,
        image: 'assets/images/dashboard/user/10.jpg',
        name: 'Zoey Foster',
        student_id: '#35874',
        standard: '6th Class',
        section: 'A',
        fees: '$87',
        due_date: 'Jun 12, 2024'
    },
    {
        id:2,
        image: 'assets/images/dashboard/user/11.jpg',
        name: 'Grace Bennett',
        student_id: '#25896',
        standard: '6th Class',
        section: 'B',
        fees: '$36',
        due_date: 'May 08, 2024'
    },
    {
        id:3,
        image: 'assets/images/dashboard/user/12.jpg',
        name: 'Stella Morgan',
        student_id: '#52689',
        standard: '9th Class',
        section: 'C',
        fees: '$25',
        due_date: 'Apr 25, 2024'
    },
    {
        id:4,
        image: 'assets/images/dashboard/user/13.jpg',
        name: 'Aiden Carter',
        student_id: '#10241',
        standard: '5th Class',
        section: 'B',
        fees: '$25',
        due_date: 'Mar 14, 2024'
    },
    {
        id:5,
        image: 'assets/images/user/6.jpg',
        name: 'Levi Ramirez',
        student_id: '#20345',
        standard: '9th Class',
        section: 'A',
        fees: '$89',
        due_date: 'Jun 14, 2024'
    },
    {
        id:6,
        image: 'assets/images/user/3.jpg',
        name: 'Brooklyn Pli',
        student_id: '#24533',
        standard: '4th Class',
        section: 'A',
        fees: '$25',
        due_date: 'Jun 25, 2024'
    },
    {
        id:7,
        image: 'assets/images/user/10.jpg',
        name: 'Kennedy Carter',
        student_id: '#10002',
        standard: '9th Class',
        section: 'B',
        fees: '$48',
        due_date: 'Feb 02, 2024'
    },
    {
        id:8,
        image: 'assets/images/user/12.png',
        name: 'Jacob Miller',
        student_id: '#10542',
        standard: '2th Class',
        section: 'C',
        fees: '$98',
        due_date: 'Nov 08, 2024'
    },
]

export const topStudent:TopStudent[] = [
    {
        id:1,
        student_id: "#84552",
        name: "Wade Warren",
        marks: 355,
        percentage: "88.75%",
        year: 2023,
        standard: "6th Class",
        image: "assets/images/dashboard/user/1.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:2,
        student_id: "#67893",
        name: "Jenny Wilson",
        marks: 343,
        percentage: "85.45%",
        year: 2022,
        standard: "10th Class",
        image: "assets/images/dashboard/user/2.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:3,
        student_id: "#89901",
        name: "Guy Hawkins",
        marks: 362,
        percentage: "90.50%",
        year: 2021,
        standard: "8th Class",
        image: "assets/images/dashboard/user/4.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:4,
        student_id: "#96512",
        name: "Jacob Jones",
        marks: 384,
        percentage: "89.12%",
        year: 2020,
        standard: "9th Class",
        image: "assets/images/dashboard/user/5.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:5,
        student_id: "#35698",
        name: "Alexis Taylor",
        marks: 254,
        percentage: "68.12%",
        year: 2024,
        standard: "12th Class",
        image: "assets/images/dashboard/user/3.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:6,
        student_id: "#25478",
        name: "Eriko Fonsa",
        marks: 526,
        percentage: "78.12%",
        year: 2020,
        standard: "10th Class",
        image: "assets/images/dashboard/user/6.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:7,
        student_id: "#96356",
        name: "Luke Mitchell",
        marks: 214,
        percentage: "98.25%",
        year: 2019,
        standard: "6th Class",
        image: "assets/images/dashboard/user/7.jpg",
        profile_link: "user-profile.html"
      },
      {
        id:8,
        student_id: "#72471",
        name: "Caleb Rivera",
        marks: 369,
        percentage: "84.28%",
        year: 2018,
        standard: "9th Class",
        image: "assets/images/dashboard/user/8.jpg",
        profile_link: "user-profile.html"
      }
]

export const studentChart: any ={
    series: [60, 40],
    labels: ["Boys", "Girls"],
    chart: {
      height: 338,
      type: "donut",
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              offsetY: 4,
            },
            value: {
              fontSize: "14px",
              offsetY: 10,
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
              color: "#52526C",
            },
            total: {
              show: true,
              fontSize: "20px",
              fontWeight: 500,
              fontFamily: "Rubik, sans-serif",
              label: "100",
              formatter: () => "Total",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#7366FF", "#ffb829"],
    fill: {
      type: "solid",
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Rubik, sans-serif",
      fontWeight: 500,
      labels: {
        colors: "var(--chart-text-color)",
      },
      formatter: function (seriesName: any, opts: { w: { globals: { series: { [x: string]: any } } }; seriesIndex: string | number }) {
        return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]];
      },
      markers: {
        width: 8,
        height: 8,
      },
    },
    stroke: {
      width: 0,
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 280,
          },
        },
      },
    ],
}

export const newStudentEnroll: NewStudentEnroll[] = [
    {
        name: "Wade Warren",
        id: "#698247",
        standard: "3th Class",
        section: "B",
        admission_date: "Jun 25, 2024",
        profile_image: "assets/images/dashboard-11/user/4.jpg",
        profile_link: "user-profile.html"
      },
      {
        name: "Jenny Wilson",
        id: "#358964",
        standard: "12th Class",
        section: "C",
        admission_date: "April 28, 2024",
        profile_image: "assets/images/dashboard-11/user/3.jpg",
        profile_link: "user-profile.html"
      },
      {
        name: "Guy Hawkins",
        id: "#986574",
        standard: "5th Class",
        section: "C",
        admission_date: "April 26, 2024",
        profile_image: "assets/images/dashboard-11/user/1.jpg",
        profile_link: "user-profile.html"
      },
      {
        name: "Jacob Jones",
        id: "#687256",
        standard: "6th Class",
        section: "B",
        admission_date: "March 13, 2024",
        profile_image: "assets/images/dashboard-9/user/5.png",
        profile_link: "user-profile.html"
      },
      {
        name: "Austin Taylor",
        id: "#235648",
        standard: "8th Class",
        section: "C",
        admission_date: "March 25, 2024",
        profile_image: "assets/images/dashboard-9/user/1.png",
        profile_link: "user-profile.html"
      },
      {
        name: "Stella Morgan",
        id: "#658965",
        standard: "3th Class",
        section: "A",
        admission_date: "March 02, 2024",
        profile_image: "assets/images/dashboard-9/user/2.png",
        profile_link: "user-profile.html"
      },
      {
        name: "Lily Turner",
        id: "#965824",
        standard: "10th Class",
        section: "A",
        admission_date: "March 15, 2024",
        profile_image: "assets/images/dashboard-9/user/3.png",
        profile_link: "user-profile.html"
      },
      {
        name: "Dylan Harris",
        id: "#356896",
        standard: "6th Class",
        section: "A",
        admission_date: "March 08, 2024",
        profile_image: "assets/images/dashboard-9/user/4.png",
        profile_link: "user-profile.html"
      }
]

export const attendance: any = {
    series: [
        {
          name: "Total Present",
          data: [43, 30, 20, 30, 20, 30, 41],
        },
        {
          name: "Total Absent",
          data: [15, 15, 50, 10, 60, 15, 15],
        },
      ],
      chart: {
        type: "bar",
        height: 340,
        toolbar: {
          show: false,
        },
      },
  
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "var(--chart-border)",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--chart-text-color)",
            fontSize: "12px",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 60,
        tickAmount: 6,
        tickPlacement: "between",
        labels: {
          style: {
            colors: "var(--chart-text-color)",
            fontSize: "12px",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
          },
        },
      },
      colors: ["var(--theme-default)", "#54BA4A"],
      fill: {
        opacity: 1,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 1661,
          options: {
            chart: {
              height: 325,
            },
          },
        },
        {
          breakpoint: 1531,
          options: {
            chart: {
              height: 380,
            },
          },
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 370,
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 320,
            },
          },
        },
        {
          breakpoint: 771,
          options: {
            chart: {
              height: 275,
            },
          },
        },
        {
          breakpoint: 590,
          options: {
            chart: {
              height: 215,
            },
          },
        },
      ],
}