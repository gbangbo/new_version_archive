import { AllProjects, ExpensesChart, PriorityTask, ProjectDetails, RecentActivity, TeamPerformance, TodayTask, UpcomingDeadline } from "../../interface/dashboard/projects";
import { primaryColor, successColor } from "../common";

export const projectDetails: ProjectDetails[] = [
    {
        title: 'Pending',
        count: 204,
        text_class: 'success',
        icon: 'up',
        percentage: '+9.4%',
        class: 'warning',
        image: 'pending-project',
    },
    {
        title: 'Complete',
        count: 106,
        text_class: 'danger',
        icon: 'down',
        percentage: '-1.4%',
        class: 'secondary',
        image: 'complete-project',
    },
    {
        title: 'Total',
        count: 310,
        text_class: 'success',
        icon: 'up',
        percentage: '+9.4%',
        class: 'primary',
        image: 'total-project',
    },
]

export const priorityTask: PriorityTask[] = [
    {
        id: 1,
        title: 'Review And Edit Project Documentation',
        class: 'danger',
        status: 'High Priority',
        project: 'https://admin.pixelstrap.net/yuri/template/landing-page.html',
        project_status: 'On',
        project_name: 'Yuri',
        complete_status: '50%',
        customer: [
            {
                image: 'assets/images/dashboard-12/user/11.png',
                name: 'Daxton Creed'
            },
            {
                image: 'assets/images/dashboard-12/user/12.png',
                name: 'Sarah Wilson'
            },
            {
                image: 'assets/images/dashboard-11/user/1.jpg',
                name: 'Marigold Luna'
            },
            {
                image: 'assets/images/dashboard-12/user/13.png',
                name: 'Charles Rodriguez'
            }
        ],
        progress_class: 'primary',
        progress: '50%',
        date: 'Jan 08th, 2024'
    },
    {
        id: 2,
        title: 'Create Landing Banner & Preview Banner',
        class: 'warning',
        status: 'Med Priority',
        project: 'https://themes.pixelstrap.com/fastkart/',
        project_status: 'On',
        project_name: 'Fastkart',
        complete_status: '40% ',
        customer: [
            {
                image: 'assets/images/dashboard-12/user/14.png',
                name: 'Caryl Kauth'
            },
            {
                image: 'assets/images/dashboard-11/user/1.jpg',
                name: 'Thomas Jones'
            },
            {
                image: 'assets/images/dashboard-11/user/9.jpg',
                name: 'Gray Curran'
            }
        ],
        progress_class: 'success',
        progress: '40%',
        date: 'Apr 15th, 2024'
    },
    {
        id: 3,
        title: 'Create Social & POS Dashboard',
        class: 'danger',
        status: 'High Priority',
        project: 'https://admin.pixelstrap.net/riho/template/landing-page.html',
        project_status: 'On',
        project_name: 'Riho',
        complete_status: '70% ',
        customer: [
            {
                image: 'assets/images/dashboard/user/12.jpg',
                name: 'Caleb Rivera'
            },
            {
                image: 'assets/images/dashboard/user/2.jpg',
                name: 'Jenny Wilson'
            },
            {
                image: 'assets/images/dashboard-12/user/2.png',
                name: 'Wes Humphrey'
            }
        ],
        progress_class: 'secondary',
        progress: '70%',
        date: 'Feb 02th, 2024'
    },
    {
        id: 4,
        title: 'Create Dashboard & Mail Box Pages',
        class: 'warning',
        status: 'Med Priority',
        project: 'https://admin.pixelstrap.net/mofi/template/landing-page.html',
        project_status: 'On',
        project_name: 'Mofi',
        complete_status: '45% ',
        customer: [
            {
                image: 'assets/images/avatar/16.jpg',
                name: 'Joseph Garcia'
            },
            {
                image: 'assets/images/avatar/3.jpg',
                name: 'Elizabeth Davis'
            },
            {
                image: 'assets/images/dashboard-11/user/4.jpg',
                name: 'Karen Moore'
            },
            {
                image: 'assets/images/dashboard-12/user/1.png',
                name: 'Robert Williams'
            }
        ],
        progress_class: 'warning',
        progress: '45%',
        date: 'Nov 18th, 2024 '
    }
]

export const taskStatistics: any = {
    labels: ["In process", "Pending", "Completed"],
    series: [20, 25, 50],
    chart: {
        type: "donut",
        height: 340,
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150,
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: "bottom",
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
    stroke: {
        width: 0,
        colors: ["var(--light2)"],
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: "72%",
                labels: {
                    show: true,
                    name: {
                        offsetY: 0,
                    },
                    total: {
                        show: true,
                        fontSize: "20px",
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: 600,
                        label: "385",
                        formatter: () => "Total Task",
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
    colors: ["#ffb829", "#65c15c", "var(--theme-default)"],
}

export const todayTask: TodayTask[] = [
    {
        id: '01',
        task: "Finalize project proposal",
        icon: "stroke-task-arrow",
    },
    {
        id: '02',
        task: "Create project timeline",
        icon: "fill-task-arrow",
        class: 'fill-primary'
    },
    {
        id: '03',
        task: "Develop initial prototype",
        icon: "fill-task-arrow",
        class: 'fill-primary'
    },
    {
        id: '04',
        task: "Set up project meeting",
        icon: "stroke-task-arrow",
    },
    {
        id: '05',
        task: "Conduct user research",
        icon: "stroke-task-arrow",
    },
    {
        id: '06',
        task: "Review and edit project",
        icon: "stroke-task-arrow",
    }
]

export const allProjects: AllProjects[] = [
    {
        id: 1,
        project_id: "#8543",
        name: "Wade",
        image: "assets/images/dashboard-12/user/1.png",
        project_name: "Project Alpha",
        start_date: "20 Jun,2024",
        end_date: "25 Jun 2024",
        priority: "High",
        status: "In Progress",
        class: 'warning'
    },
    {
        id: 2,
        project_id: "#9542",
        name: "Otis",
        image: "assets/images/dashboard-12/user/2.png",
        project_name: "Project Beta",
        start_date: "12 Jul 2024",
        end_date: "19 Jul 2024",
        priority: "Medium",
        status: "Not Started",
        class: 'danger'
    },
    {
        id: 3,
        project_id: "#3159",
        name: "Jenny",
        image: "assets/images/dashboard-12/user/3.png",
        project_name: "Project Gamma",
        start_date: "16 Aug 2024",
        end_date: "18 Aug 2024",
        priority: "High",
        status: "In Progress",
        class: 'warning'
    },
    {
        id: 4,
        project_id: "#3159",
        name: "Guy",
        image: "assets/images/dashboard-12/user/4.png",
        project_name: "Project Delta",
        start_date: "01 Sep 2024",
        end_date: "23 Sep 2024",
        priority: "Low",
        status: "Completed",
        class: 'success'
    },
    {
        id: 5,
        project_id: "#3159",
        name: "Jacob",
        image: "assets/images/dashboard-12/user/5.png",
        project_name: "Project Theta",
        start_date: "11 Aug 2024",
        end_date: "16 Aug 2024",
        priority: "Medium",
        status: "In Progress",
        class: 'warning'
    },
    {
        id: 6,
        project_id: "#5897",
        name: "Zayne",
        image: "assets/images/dashboard-11/user/2.jpg",
        project_name: "Project Gamma",
        start_date: "01 Nov 2024",
        end_date: "10 Nov 2024",
        priority: "Medium",
        status: "In Progress",
        class: 'warning'
    },
    {
        id: 7,
        project_id: "#4545",
        name: "Nova",
        image: "assets/images/dashboard-11/user/8.jpg",
        project_name: "Project Beta",
        start_date: "12 Feb 2024",
        end_date: "14 Feb 2024",
        priority: "Low",
        status: "Completed",
        class: 'success'
    },
    {
        id: 8,
        project_id: "#1224",
        name: "Mario",
        image: "assets/images/dashboard-11/user/10.jpg",
        project_name: "Project Delta",
        start_date: "19 Apr 2024",
        end_date: "22 Apr 2024",
        priority: "Medium",
        status: "Completed",
        class: 'success'
    },
    {
        id: 9,
        project_id: "#5004",
        name: "Cecilia",
        image: "assets/images/dashboard/user/1.jpg",
        project_name: "Project Gamma",
        start_date: "05 Mar 2024",
        end_date: "08 Mar 2024",
        priority: "Low",
        status: "In Progress",
        class: 'warning'
    },
    {
        id: 10,
        project_id: "#5004",
        name: "Aaley",
        image: "assets/images/dashboard/user/11.jpg",
        project_name: "Project Alpha",
        start_date: "08 Aug 2024",
        end_date: "25 Aug 2024",
        priority: "Low",
        status: "Not Started",
        class: 'danger'
    }
]

export const estimatedActualChart: any = {
    series: [
        {
            name: "Hour By Project",
            data: [25, 60, 70, -35, -105, -130, -130, -115, -95, -60, 15, 45, 105, 60, 35, 70, 105, 120, 140, 150, -20, -66, -95, -95, -60, -55, 15, 48, 105, 60, 25, 75],
        },
    ],
    chart: {
        type: "bar",
        height: 385,
        offsetX: 0,
        offsetY: 20,
        toolbar: {
            show: false,
        },
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 500,
            animateGradually: {
                enabled: true,
                delay: 150,
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350,
            },
        },
    },
    plotOptions: {
        bar: {
            colors: {
                ranges: [
                    {
                        from: -150,
                        to: 0,
                        color: successColor,
                    },
                    {
                        from: 0,
                        to: 150,
                        color: primaryColor,
                    },
                ],
            },
            columnWidth: "80%",
            borderRadius: 0,
        },
    },

    colors: [primaryColor],
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        title: {
            show: false,
        },

        labels: {
            formatter: function (y: number) {
                return y.toFixed(0) + "h";
            },
        },
    },

    grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: "rgba(82, 82, 108, 0.1)",
        position: "back",
    },
    xaxis: {
        categories: ["Project_1", "", "", "", "", "Project_2", "", "", "", "", "Project_3", "", "", "", "", "Project_4", "", "", "", "", "Project_5", "", "", "", "", "Project_6", "", "", "", "", "Project_7"],
        labels: {
            rotate: -45,
            rotateAlways: false,
        },
        axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1400,
            options: {
                chart: {
                    height: 292,
                },
            },
        },
        {
            breakpoint: 911,
            options: {
                chart: {
                    height: 275,
                },
            },
        },
    ],
}

export const teamPerformance: TeamPerformance[] = [
    {
        id: 1,
        name: "Jagger Padilla",
        assigned: 50,
        completed: 45,
        rate: "90%",
    },
    {
        id: 2,
        name: "Lea Daniel",
        assigned: 40,
        completed: 38,
        rate: "95%",
    },
    {
        id: 3,
        name: "Collin Avalos",
        assigned: 65,
        completed: 60,
        rate: "91%",
    },
    {
        id: 4,
        name: "Kairi Wall",
        assigned: 45,
        completed: 26,
        rate: "70%",
    },
    {
        id: 5,
        name: "Ahmed Bryant",
        assigned: 29,
        completed: 22,
        rate: "86%",
    },
    {
        id: 6,
        name: "Laurel Floyd",
        assigned: 14,
        completed: 10,
        rate: "92%",
    },
    {
        id: 7,
        name: "Khari Wells",
        assigned: 45,
        completed: 25,
        rate: "88%",
    },
    {
        id: 8,
        name: "Evan Cobb",
        assigned: 50,
        completed: 30,
        rate: "94%",
    },
    {
        id: 9,
        name: "Royal Tran",
        assigned: 78,
        completed: 55,
        rate: "74%",
    },
    {
        id: 10,
        name: "Avery Bell",
        assigned: 15,
        completed: 8,
        rate: "65%",
    },
]

export const expensesChart: ExpensesChart[] = [
    {
        id: 1,
        title: 'Monthly Expenses',
        count: '54,76,000',
        class: 'danger',
        icon: 'trending-down',
        percentage: '4%',
        chart_id: 'monthly-expense',
        chart_details: {
            series: [
                {
                    name: "Monthly Expense",
                    data: [0, 6, 30, 10, 20, 60, 30, 70, 70, 110, 70, 20, 70, 110, 50, 150, 50, 55, 0],
                },
            ],
            chart: {
                type: "area",
                height: 152,
                offsetY: -20,
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                show: true,
                curve: "smooth",
                lineCap: "butt",
                width: 2,
            },
            xaxis: {
                type: "category",
                labels: {
                    show: false,
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
            grid: {
                show: false,
            },
            yaxis: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: [primaryColor],
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 1,
                    inverseColors: true,
                    opacityFrom: 0.8,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
            responsive: [
                {
                    breakpoint: 1400,
                    options: {
                        chart: {
                            height: 120,
                        },
                    },
                },
                {
                    breakpoint: 1200,
                    options: {
                        chart: {
                            height: 105,
                        },
                    },
                },
                {
                    breakpoint: 992,
                    options: {
                        chart: {
                            height: 100,
                        },
                    },
                },
                {
                    breakpoint: 906,
                    options: {
                        chart: {
                            height: 120,
                        },
                    },
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 140,
                        },
                    },
                },
                {
                    breakpoint: 762,
                    options: {
                        chart: {
                            height: 160,
                        },
                    },
                },
            ],
        }
    },
    {
        id: 2,
        title: 'Yearly Expenses',
        count: '65,89,120',
        class: 'success',
        icon: 'trending-up',
        percentage: '8%',
        chart_id: 'yearly-expense',
        chart_details: {
            series: [
                {
                    name: "Yearly Expense",
                    data: [50, 20, 50, 40, 30, 60, 30, 25, 48],
                },
            ],
            chart: {
                type: "bar",
                height: 152,
                stacked: false,
                offsetY: -40,
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },

            grid: {
                show: false,
            },
            colors: ["rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "rgba(101, 193, 92, 0.3)", "#65c15c"],
            plotOptions: {
                bar: {
                    vertical: true,
                    distributed: true,
                    borderRadius: 0,
                    columnWidth: "80%",
                    backgroundBarColors: ["#65c15c"],
                    backgroundBarOpacity: 1,
                    dataLabels: {
                        total: {
                            show: false,
                        },
                    },
                },
            },
            xaxis: {
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                min: 0,
                max: 60,
                tickAmount: 6,
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
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
                    breakpoint: 1400,
                    options: {
                        chart: {
                            height: 120,
                        },
                    },
                },
                {
                    breakpoint: 1350,
                    options: {
                        chart: {
                            height: 122,
                        },
                    },
                },
                {
                    breakpoint: 1200,
                    options: {
                        chart: {
                            height: 110,
                        },
                    },
                },
                {
                    breakpoint: 1060,
                    options: {
                        chart: {
                            height: 115,
                        },
                    },
                },
                {
                    breakpoint: 992,
                    options: {
                        chart: {
                            height: 110,
                        },
                    },
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 130,
                        },
                    },
                },
            ],
        }
    }
]

export const upcomingDeadline: UpcomingDeadline[] = [
    {
        id: 1,
        employee: "Roma Chase",
        task: "Define project scope",
        deadline: "10 Jun 2024",
    },
    {
        id: 2,
        employee: "Krish Hart",
        task: "Gather requirements",
        deadline: "24 Jul 2024",
    },
    {
        id: 3,
        employee: "Alex Powell",
        task: "Develop project plan",
        deadline: "15 Aug 2024",
    },
    {
        id: 4,
        employee: "Carl Gates",
        task: "Design UI mockups",
        deadline: "29 Sep 2024",
    },
    {
        id: 5,
        employee: "Holly Fraz",
        task: "Conduct user testing",
        deadline: "31 Jun 2024",
    },
    {
        id: 6,
        employee: "Leonel Kirby",
        task: "Develop admin theme",
        deadline: "12 Feb 2024",
    },
    {
        id: 7,
        employee: "Mary Arroyo",
        task: "Develop JS theme",
        deadline: "27 Oct 2024",
    },
    {
        id: 8,
        employee: "Nia Duncan",
        task: "Testing yuri theme",
        deadline: "15 Sep 2024",
    },
    {
        id: 9,
        employee: "Lan Austin",
        task: "Testing riho theme",
        deadline: "10 Apr 2024",
    },
    {
        id: 10,
        employee: "Seven Cobb",
        task: "Webflow for yuri",
        deadline: "16 Jan 2024",
    }
]

export const projectAnalysis: any = {
    details: [
        {
            name: "Project",
            class: 'primary'
        },
        {
            name: "Task",
            class: 'warning'
        },
        {
            name: "Earnings",
            class: 'secondary'
        },
    ],
    series: [
        {
            name: "Earnings",
            type: "column",
            data: [25, 18, 15, 32, 16, 22, 18, 24, 15, 22, 19, 24],
        },
        {
            name: "Task",
            type: "line",
            data: [40, 10, 50, 10, 70, 10, 65, 10, 55, 10, 75, 20, 40],
        },
        {
            name: "Project",
            type: "line",
            data: [15, 41, 22, 30, 50, 15, 43, 23, 38, 20, 30, 10, 25],
        },
    ],
    chart: {
        height: 290,
        type: "line",
        stacked: false,
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: [2],
            top: 10,
            left: 0,
            blur: 4,
            color: "#7366FF",
            opacity: 0.2,
        },
    },
    stroke: {
        width: [0, 2, 3],
        curve: "smooth",
        dashArray: [0, 4, 0],
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
        },
    },
    colors: ["var(--chart-progress-light)", "#ffb829", "#7366FF"],
    fill: {
        type: "solid",
        gradient: {
            shade: "dark",
            type: "vertical",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
        },
    },
    grid: {
        borderColor: "var(--chart-border)",
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    legend: {
        show: false,
    },
    markers: {
        discrete: [
            {
                seriesIndex: 2,
                dataPointIndex: 0,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
                sizeOffset: 3,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 1,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 2,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 4,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 5,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 6,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 7,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 8,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 9,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 10,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 11,
                fillColor: "#7366FF",
                strokeColor: "var(--white)",
                size: 6,
            },
            {
                seriesIndex: 2,
                dataPointIndex: 12,
                fillColor: "#7366FF",
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
        categories: ["Jan", "Feb", "Mar", " Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tickPlacement: "on",
        labels: {
            style: {
                fontFamily: "Rubik, sans-serif",
                colors: ["#52526c"],
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
        title: {
            text: "Points",
        },
        min: 0,
        max: 100,
        tickAmount: 5,
        tickPlacement: "on"
    },
    responsive: [
        {
            breakpoint: 1870,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1400,
            options: {
                chart: {
                    height: 292,
                },
            },
        },
        {
            breakpoint: 486,
            options: {
                xaxis: {
                    tickAmount: 4,
                },
            },
        },
    ]
}

export const recentActivity: RecentActivity[] = [
    {
        id: 1,
        description: "Completed Project Definition",
        project: "Project Alpha",
        performed_by: "Eleanor Pena",
        date: "01 Jun 2024",
    },
    {
        id: 2,
        description: "Conducted user testing",
        project: "Project Beta",
        performed_by: "Arlene McCoy",
        date: "24 Jul 2024",
    },
    {
        id: 3,
        description: "Submitted initial design mockups",
        project: "Project Delta",
        performed_by: "Jerome Bell",
        date: "15 Aug 2024",
    },
    {
        id: 4,
        description: "Held kickoff meeting",
        project: "Project Delta",
        performed_by: "Theresa Webb",
        date: "29 Sep 2024",
    },
    {
        id: 5,
        description: "Collected client feedback",
        project: "Project Alpha",
        performed_by: "Darrell Steward",
        date: "31 Jun 2024",
    },
    {
        id: 6,
        description: "Login from IP 192.168.xx.xx",
        project: "Login",
        performed_by: "Rey Spears",
        date: "14 Feb 2024",
    },
    {
        id: 7,
        description: "Two-factor authentication",
        project: "Auth Setup",
        performed_by: "Zoya Little",
        date: "15 Sep 2024",
    },
    {
        id: 8,
        description: "Client meetings",
        project: "Manage API",
        performed_by: "Navy West",
        date: "28 Nov 2024",
    },
    {
        id: 9,
        description: "Clone react project",
        project: "State Manage",
        performed_by: "Levi Pope",
        date: "28 Feb 2024",
    },
    {
        id: 10,
        description: "Clone yuri project",
        project: "Admin Theme",
        performed_by: "Nyomi Gray",
        date: "19 Nov 2024",
    }
]