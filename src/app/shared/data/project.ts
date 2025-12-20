import { Tabs } from '../interface/common';
import { ProjectDetails, Projects } from '../interface/project';
import { primaryColor } from './common';

export const projectDetailsTab: Tabs[] = [
  {
    id: 1,
    title: 'Summary',
    value: 'summary',
    icon: 'project-search',
  },
  {
    id: 2,
    title: 'Status',
    value: 'status',
    icon: 'project-target',
  },
  {
    id: 3,
    title: 'Finance',
    value: 'finance',
    icon: 'project-badget',
  },
  {
    id: 4,
    title: 'Team',
    value: 'team',
    icon: 'project-users',
  },
  {
    id: 5,
    title: 'Attachment',
    value: 'attachment',
    icon: 'stroke-files',
  },
  {
    id: 6,
    title: 'Activity',
    value: 'activity',
    icon: 'stroke-activity',
  },
];

export const projectDetailsHeader = {
  title: 'Dashboard',
  description: 'Create a brand logo design for a admin.',
  project_status: 'In Progress',
  created_date: '10 Jul, 2024',
  due_date: '10 Aug, 2024',
  all_task: 24,
  total_customer: 13,
  customers: [
    { image_url: 'assets/images/dashboard/user/10.jpg' },
    { image_url: 'assets/images/dashboard/user/11.jpg' },
    { name: 'Andrew' },
    { image_url: 'assets/images/dashboard/user/1.jpg' },
  ],
};

export const projectDetails: ProjectDetails = {
  project_summary: {
    summary: {
      title: 'Project Summary',
      description:
        "The proposal's project summary is among its most crucial sections. It is probably the first thing a reviewer will look at, so here is your best chance to catch their attention.",
      sort_description: 'Due date exceeded for 24 projects',
      creation_date: '14 March, 2024',
      due_date: '30 April, 2024',
      priority: 'High',
      status: 'In progress',
      resource: {
        title: 'Projects Webflow',
        file_size: '678 KB',
        file_type: 'PDF',
        file: '../files/text_file.pdf',
      },
      chart_details: {
        series: [70, 80, 92],
        chart: {
          height: 240,
          type: "radialBar",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined,
            },
            dataLabels: {
              name: {
                show: true,
                offsetY: -10,
              },
              value: {
                offsetY: -5,
                fontSize: "12px",
              },
              total: {
                show: true,
                fontSize: "11px",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 500,
                label: "80%",
                formatter: () => "Completed",
              },
            },
            barLabels: {
              enabled: true,
              useSeriesColors: false,
              margin: 8,
              fontSize: "12px",
              formatter: function (seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
              },
            },
          },
        },
        colors: ["#7366FF", "#54BA4A", "#ffb829"],
        labels: ["Pending", "In Progress", "Completed"],
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 1675,
            options: {
              chart: {
                offsetX: 10,
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    },
    todo_list: [
      {
        id: 1,
        title: 'Establish a project plan',
        description: 'Divide the project manageable phases',
      },
      {
        id: 2,
        title: 'Gathering Info',
        description: 'Establish a budget for project costs',
      },
      {
        id: 3,
        title: 'Track & keep an eye on progress',
        description: 'Development task',
      },
      {
        id: 4,
        title: 'Project Termination',
        description: 'Records and files for upcoming use',
      },
    ],
    pending_project: [
      {
        id: 1,
        project_name: 'Terraform',
        project_head_name: 'Eleanor Pena',
        project_head_email: 'Elea.pena@crzq7.edu',
        project_head_profile: 'assets/images/dashboard-9/user/1.png',
        priority: 'High',
        due_date: '15,May 2024',
        status: 'In Progress',
        color: 'success',
      },
      {
        id: 2,
        project_name: 'GearVibe',
        project_head_name: 'Mae Golden',
        project_head_email: 'mae.golden@crz3q.edu',
        project_head_profile: 'assets/images/dashboard-9/user/2.png',
        priority: 'Medium',
        due_date: '10,June 2024',
        status: 'Pending',
        color: 'warning',
      },
      {
        id: 3,
        project_name: 'CloudCraze',
        project_head_name: 'Emily Park',
        project_head_email: 'emily.park@crezq4.edu',
        project_head_profile: 'assets/images/dashboard-9/user/3.png',
        priority: 'Low',
        due_date: '16,May 2024',
        status: 'Pending',
        color: 'warning',
      },
      {
        id: 4,
        project_name: 'PrimePulse',
        project_head_name: 'Jacob Jones',
        project_head_email: 'jacob.jonesl@crzd3.edu',
        project_head_profile: 'assets/images/dashboard-9/user/4.png',
        priority: 'High',
        due_date: '02,Nov 2024',
        status: 'In Progress',
        color: 'success',
      },
      {
        id: 5,
        project_name: 'ShiftSwift',
        project_head_name: 'Robert Fox',
        project_head_email: 'robert.fox@crzs2.edu',
        project_head_profile: 'assets/images/dashboard-9/user/5.png',
        priority: 'Medium',
        due_date: '06,Dec 2024',
        status: 'In Progress',
        color: 'success',
      },
      {
        id: 6,
        project_name: 'Solar Sphere',
        project_head_name: 'Eriko Fonsa',
        project_head_email: 'eriko.fonsa@crzq8.edu',
        project_head_profile: 'assets/images/dashboard-11/user/1.jpg',
        priority: 'High',
        due_date: '17,Feb 2024',
        status: 'In Progress',
        color: 'success',
      },
      {
        id: 7,
        project_name: 'Grow Green',
        project_head_name: 'Cody Fisher',
        project_head_email: 'cody.fisher@crz3r.edu',
        project_head_profile: 'assets/images/dashboard-11/user/9.jpg',
        priority: 'Low',
        due_date: '06,Mar 2024',
        status: 'Pending',
        color: 'warning',
      },
      {
        id: 8,
        project_name: 'Green Horizon',
        project_head_name: 'Alexis Taylor',
        project_head_email: 'alexis.taylor@crzf8.edu',
        project_head_profile: 'assets/images/dashboard-11/user/11.jpg',
        priority: 'High',
        due_date: '03,Apr 2024',
        status: 'In Progress',
        color: 'success',
      },
    ],
    task_overViewChart: {
      title: 'Task Overview',
      sort_description: 'All 209 Task Completed',
      series: [
        {
          name: "Incomplete",
          data: [78, 55, 55, 22, 22, 37, 37, 51, 51, 32, 32, 18],
        },
        {
          name: "Completed",
          data: [3, 22, 42, 42, 33, 32, 18, 18, 48, 48, 70, 70],
        },
      ],
      chart: {
        type: "area",
        height: 363,
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 8,
          left: 0,
          blur: 6,
          color: ["#7366FF", "#54BA4A"],
          opacity: 0.4,
        },
      },
      stroke: {
        curve: "monotoneCubic",
        lineCap: "butt",
        width: 2,
      },
      xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
      grid: {
        show: true,
        borderColor: "rgba(230, 233, 235, 1)",
        strokeDashArray: 3,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 95,
        tickAmount: 6,
        labels: {
          style: {
            colors: "rgba(82, 82, 108, 0.8)",
            fontSize: "12px",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: [primaryColor, "#65c15c"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0,
          inverseColors: true,
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: "#7064F5",
            strokeColor: "var(--white)",
            size: 5,
            sizeOffset: 6,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 3,
            fillColor: "#54BA4A",
            strokeColor: "var(--white)",
            size: 5,
            sizeOffset: 6,
          },
        ],
        hover: {
          size: 6,
          sizeOffset: 0,
        },
      },

      responsive: [
        {
          breakpoint: 1875,
          options: {
            xaxis: {
              tickAmount: 6,
            },
          },
        },
        {
          breakpoint: 1661,
          options: {
            chart: {
              height: 345,
            },
          },
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 225,
            },
          },
        },
      ],
    },
    recent_activity: {
      title: 'Recent Activity',
      date: '23, April 2024',
      activities: [
        {
          date: '24',
          day: 'Su',
          activity: [
            {
              id: 1,
              title: 'Make a new landing page',
              customer_name: 'Cody Fisher',
              time: '02:00',
              created_time: '10 min ago',
            },
            {
              id: 2,
              title: 'Client visit',
              customer_name: 'Marvin Lie',
              time: '05:00',
              created_time: '12 min ago',
            },
            {
              id: 3,
              title: 'Email marketing automation',
              customer_name: 'Emily Park',
              time: '08:00',
              created_time: '18 min ago',
            },
          ],
        },
        {
          date: '25',
          day: 'Mo',
          activity: [
            {
              id: 1,
              title: 'Marketing and client meeting',
              customer_name: 'Caleb Riv',
              time: '08:00',
              created_time: '11 min ago',
            },
            {
              id: 2,
              title: 'Make a creating an account profile',
              customer_name: 'Nareha Ail',
              time: '10:00',
              created_time: '18 min ago',
            },
            {
              id: 3,
              title: 'Web development and ui/ ux design',
              customer_name: 'Sneha Shah',
              time: '13:00',
              created_time: '22 min ago',
            },
            {
              id: 4,
              title: 'Brand Logo design',
              customer_name: 'Manish Pie',
              time: '15:30',
              created_time: '28 min ago',
            },
          ],
        },
        {
          date: '26',
          day: 'Tu',
          activity: [
            {
              id: 1,
              title: 'Social media graphic design & ads',
              customer_name: 'Caryl Kauth',
              time: '02:45',
              created_time: '02 min ago',
            },
            {
              id: 2,
              title: 'Website usability testing',
              customer_name: 'Alexis Taylor',
              time: '07:30',
              created_time: '05 min ago',
            },
            {
              id: 3,
              title: 'SEO optimization',
              customer_name: 'Eriko Fonsa',
              time: '11:50',
              created_time: '08 min ago',
            },
          ],
        },
        {
          date: '27',
          day: 'We',
          activity: [
            {
              id: 1,
              title: 'Analyzing competitor strategies',
              customer_name: 'Jacob Jones',
              time: '01:20',
              created_time: '06 min ago',
            },
            {
              id: 2,
              title: 'Lead generation',
              customer_name: 'Lily Mccoy',
              time: '03:00',
              created_time: '12 min ago',
            },
            {
              id: 3,
              title: 'Prototypes for user feedback',
              customer_name: 'Robert Fox',
              time: '07:50',
              created_time: '18 min ago',
            },
            {
              id: 4,
              title: 'Brand promotion',
              customer_name: 'Fran Loain',
              time: '02:10',
              created_time: '20 min ago',
            },
          ],
        },
        {
          date: '28',
          day: 'Thu',
          activity: [
            {
              id: 1,
              title: 'Website chatbot setup',
              customer_name: 'Loie Fenter',
              time: '06:20',
              created_time: '01 min ago',
            },
            {
              id: 2,
              title: 'Video content creation',
              customer_name: 'Anna Catmire',
              time: '03:00',
              created_time: '15 min ago',
            },
          ],
        },
        {
          date: '29',
          day: 'Fri',
          activity: [
            {
              id: 1,
              title: 'Chatbot meeting',
              customer_name: 'Edwin Hogan',
              time: '17:30',
              created_time: '25 min ago',
            },
            {
              id: 2,
              title: 'Hosting online contests',
              customer_name: 'Ralph Water',
              time: '04:45',
              created_time: '35 min ago',
            },
            {
              id: 3,
              title: 'Quizzes for audience',
              customer_name: 'Aaron Hogan',
              time: '02:00',
              created_time: '45 min ago',
            },
          ],
        },
      ],
    },
    team_members: [
      {
        id: 1,
        name: 'Jane Cooper',
        email: 'jane.cooper@study.edu',
        image: 'assets/images/dashboard-11/user/7.jpg',
      },
      {
        id: 2,
        name: 'Robert Fox',
        email: 'robert.fox@study.edu',
        image: 'assets/images/dashboard-11/user/4.jpg',
      },
      {
        id: 3,
        name: 'Daisy Roy',
        email: 'daisy.roy@study.edu',
        image: 'assets/images/dashboard/user/2.jpg',
      },
      {
        id: 4,
        name: 'Ryan Gill',
        email: 'ryan.gill@study.edu',
        image: 'assets/images/dashboard-11/user/12.jpg',
      },
      {
        id: 5,
        name: 'Ace Marks',
        email: 'ace.mark@study.edu',
        image: 'assets/images/dashboard-11/user/1.jpg',
      },
    ],
    comments: [
      {
        id: 1,
        name: 'Caleb Rivera',
        message:
          'I am getting message from customers that when they place order always get error message',
        image: 'assets/images/dashboard/user/13.jpg',
      },
      {
        id: 2,
        name: 'Mili Pais',
        message: 'Please be sure to check your spam mailbox to see if your email filters have identified the email',
        image: 'assets/images/dashboard/user/12.jpg',
        is_reply: true,
      },
    ],
  },
  project_status: [
    {
      id: 1,
      project_title: 'UX Manager',
      project_description: "Group's expertise in the industry and ensuring that the group continues to develop as experts.",
      project_banner: 'assets/images/project/objective/phone1.png',
      tag: 'UI/UX Design',
      tag_color: 'warning',
      date: '02 Jul, 2024',
      attachment: 7,
      comments: 5,
      progress: 30,
      status: 'pending',
      developer: [
        {
          name: 'Marley Ford',
          profile: 'assets/images/dashboard-11/user/10.jpg',
        },
        {
          name: 'Gray Curran',
          profile: 'assets/images/dashboard-11/user/9.jpg',
        },
        {
          name: 'Yarrow  Wix'
        },
      ],
    },
    {
      id: 2,
      project_title: 'Logo Design',
      project_description: 'Create a distinctive and memorable logo that connects with your target market.',
      tag: 'UX Design',
      tag_color: 'success',
      date: '20 Feb, 2024',
      attachment: 7,
      comments: 5,
      progress: 10,
      status: 'pending',
      developer: [
        {
          name: 'Sarah Wilson',
          profile: 'assets/images/dashboard-11/user/2.jpg',
        },
        {
          name: 'Richard Taylor',
          profile: 'assets/images/dashboard-11/user/1.jpg',
        },
        { name: 'Linda Brown' },
        {
          name: 'Jessica Anderson',
          profile: 'assets/images/dashboard-11/user/8.jpg',
        },
      ],
    },
    {
      id: 3,
      project_title: 'Getting together with a customer',
      project_description: 'Deal with problems, and improve our collaboration for success on both sides.',
      tag: 'Negotiation',
      tag_color: 'primary',
      date: '12 Jan, 2024',
      attachment: 1,
      comments: 4,
      progress: 40,
      status: 'pending',
      developer: [
        {
          name: 'Thomas Jones',
          profile: 'assets/images/dashboard-9/user/1.png',
        },
        { name: 'Karen Jones' },
        {
          name: 'Elizabeth Williams',
          profile: 'assets/images/dashboard-9/user/3.png',
        },
      ],
    },
    {
      id: 4,
      project_title: 'Redesign - Landing page',
      project_description: 'Such as contact management, lead management, marketing automation, etc.',
      tag: 'UI/UX Design',
      tag_color: 'primary',
      date: '06 Nov, 2024',
      attachment: 2,
      comments: 3,
      progress: 32,
      status: 'progress',
      developer: [
        {
          name: 'Alexis Taylor',
          profile: 'assets/images/dashboard/user/10.jpg',
        },
        {
          name: 'Andrew Price',
          profile: 'assets/images/dashboard/user/11.jpg',
        },
        { name: 'Emily Park' },
        { name: 'Caryl Kauth', profile: 'assets/images/dashboard/user/1.jpg' },
      ],
    },
    {
      id: 5,
      project_title: 'Mobile Testing',
      project_description: 'Deliver a high-quality product that guarantees client happiness and lowers risk.',
      project_banner: 'assets/images/project/objective/phone.png',
      tag: 'Testing',
      tag_color: 'warning',
      date: '10 Mar, 2024',
      attachment: 6,
      comments: 4,
      progress: 50,
      status: 'progress',
      developer: [
        {
          name: 'Caleb Rivera',
          profile: 'assets/images/dashboard/user/12.jpg',
        },
        { name: 'Ashley Bardot' },
        { name: 'Olivia Gor', profile: 'assets/images/dashboard/user/13.jpg' },
      ],
    },
    {
      id: 6,
      project_title: 'Lead Generation',
      project_description: 'Usually, after initiating conversation, leads hear from a company or organization.',
      tag: 'Lead',
      tag_color: 'success',
      date: '02 Feb, 2024',
      attachment: 1,
      comments: 5,
      progress: 50,
      status: 'progress',
      developer: [
        { name: 'Gasper Mintz' },
        {
          name: 'Ford Stoll',
          profile: 'assets/images/dashboard-11/user/7.jpg',
        },
      ],
    },
    {
      id: 7,
      project_title: 'Client Visit',
      project_description: 'Where you will directly see personalized service and customized solutions.',
      tag: 'Visiter',
      tag_color: 'primary',
      date: '22 Apr, 2024',
      attachment: 7,
      comments: 2,
      progress: 100,
      status: 'completed',
      developer: [
        { name: 'Jenny Wilson', profile: 'assets/images/dashboard/user/2.jpg' },
        {
          name: 'Levine Raven',
          profile: 'assets/images/dashboard-11/user/2.jpg',
        },
        {
          name: 'Davis Jone',
          profile: 'assets/images/dashboard-11/user/12.jpg',
        },
      ],
    },
    {
      id: 8,
      project_title: 'Project Deadline',
      project_description: 'Take aggressive measures to overcome obstacles.',
      tag: 'Deadline',
      tag_color: 'success',
      date: '10 Mar, 2024',
      attachment: 8,
      comments: 2,
      progress: 100,
      status: 'completed',
      developer: [
        {
          name: 'Laurier Caddel',
          profile: 'assets/images/dashboard-11/user/4.jpg',
        },
        { name: 'Barbara Taylor' },
      ],
    },
    {
      id: 9,
      project_title: 'Marketing and client meeting',
      project_description: 'Develop deep relationships with your target market.',
      project_banner: 'assets/images/project/objective/phone2.png',
      tag: 'Marketing',
      tag_color: 'warning',
      date: '15 Feb, 2024',
      attachment: 4,
      comments: 1,
      progress: 100,
      status: 'completed',
      developer: [
        { name: 'Juniper Blake' },
        {
          name: 'Jessica Anderson',
          profile: 'assets/images/dashboard-9/user/2.png',
        },
        {
          name: 'Dashiell Wolfe',
          profile: 'assets/images/dashboard-9/user/5.png',
        },
      ],
    },
  ],
  finance: {
    expenses: [
      {
        id: 1,
        title: 'Weekly Expenses',
        value: '70,000.00',
        profit: '2.7',
        profit_type: 'profit',
        chart_details: {
          series: [
            {
              name: 'Income',
              type: 'line',
              data: [12, 30, 45, 20, 60, 50],
            },
          ],
          chart: {
            height: 100,
            width: 248,
            type: 'line',
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: true,
              top: 4,
              left: 0,
              blur: 2,
              colors: ['#7366FF'],
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
          colors: ['#65c15c'],
          stroke: {
            width: 3,
            curve: 'monotoneCubic',
            lineCap: 'butt',
            opacity: 1,
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
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            tickAmount: 12,
            crosshairs: {
              show: false,
            },
            labels: {
              show: false,
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
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'horizontal',
              inverseColors: true,
              shadeIntensity: 1,
              opacityFrom: [1],
              opacityTo: 1,
              stops: [0, 100, 300],
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
              breakpoint: 1698,
              options: {
                chart: {
                  height: 100,
                  offsetX: 0,
                },
              },
            },
            {
              breakpoint: 497,
              options: {
                chart: {
                  height: 90,
                  width: 200,
                },
              },
            },
            {
              breakpoint: 397,
              options: {
                chart: {
                  width: 150,
                },
              },
            },
            {
              breakpoint: 347,
              options: {
                chart: {
                  width: 120,
                },
              },
            },
          ],
        },
      },
      {
        id: 2,
        title: 'Monthly Expenses',
        value: '32,458.00',
        profit: '1.4',
        profit_type: 'loss',
        chart_details: {
          series: [
            {
              name: 'Month',
              data: [4, 3, 3, 3, 4, 3, 3, 4, 5, 3.5],
            },
          ],
          chart: {
            height: 100,
            width: 248,
            type: 'bar',
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: true,
              top: 8,
              left: 0,
              blur: 8,
              color: '#7366FF',
              opacity: 0.1,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 2,
              borderRadiusApplication: 'around',
              borderRadiusWhenStacked: 'last',
              columnWidth: '20%',
            },
          },
          dataLabels: {
            enabled: false,
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
              show: false,
            },
          },
          grid: {
            show: false,
          },
          colors: [
            'var(--theme-default)',
            'rgba(115, 102, 255, 0.13)',
            'rgba(115, 102, 255, 0.33)',
            'rgba(115, 102, 255, 0.62)',
            'rgba(115, 102, 255, 0.09)',
          ],
          responsive: [
            {
              breakpoint: 1698,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                plotOptions: {
                  bar: {
                    columnWidth: '8px',
                  },
                },
              },
            },
            {
              breakpoint: 497,
              options: {
                chart: {
                  height: 90,
                  width: 200,
                },
              },
            },
            {
              breakpoint: 397,
              options: {
                chart: {
                  width: 150,
                },
              },
            },
            {
              breakpoint: 347,
              options: {
                chart: {
                  width: 120,
                },
                plotOptions: {
                  bar: {
                    columnWidth: '4px',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: 3,
        title: 'Yearly Expenses',
        value: '81,610.00',
        profit: '5.0',
        profit_type: 'profit',
        chart_details: {
          series: [
            {
              name: 'Year',
              data: [20, 20, 8, 8, 20, 20, 25, 25],
            },
          ],
          chart: {
            type: 'area',
            height: 100,
            width: 255,
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: 'straight',
            width: 3,
          },
          xaxis: {
            type: 'category',
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'July',
              'Aug',
            ],
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
          markers: {
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 3,
                fillColor: '#ffb829',
                strokeColor: 'var(--white)',
                size: 4,
                sizeOffset: 2,
              },
            ],
            hover: {
              size: 5,
              sizeOffset: 0,
            },
          },
          colors: ['#ffb829'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'vertical',
              shadeIntensity: 0.1,
              inverseColors: true,
              opacityFrom: 0.2,
              opacityTo: 0,
              stops: [0, 100],
            },
          },
          responsive: [
            {
              breakpoint: 1698,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 497,
              options: {
                chart: {
                  height: 90,
                  width: 200,
                },
              },
            },
            {
              breakpoint: 397,
              options: {
                chart: {
                  width: 150,
                },
              },
            },
            {
              breakpoint: 347,
              options: {
                chart: {
                  width: 120,
                },
              },
            },
          ],
        },
      },
    ],
    budget_details: [
      {
        id: 1,
        type: 'Data Analyst',
        total_budget: 14000.0,
        expenses: 13100.0,
        remaining: 110.0,
      },
      {
        id: 2,
        type: 'Researcher',
        total_budget: 34720.0,
        expenses: 19859.84,
        remaining: 14860.16,
      },
      {
        id: 3,
        type: 'UI Designer',
        total_budget: 11600.0,
        expenses: 3.0,
        remaining: 11600.0,
      },
      {
        id: 4,
        type: 'JS Developer',
        total_budget: 68600.0,
        expenses: 14859.84,
        remaining: 25680.0,
      },
      {
        id: 5,
        type: 'Coordinator',
        total_budget: 48589.0,
        expenses: 10222.12,
        remaining: 9932.24,
      },
      {
        id: 6,
        type: 'Scientist',
        total_budget: 12365.0,
        expenses: 78245.12,
        remaining: 1236.24,
      },
      {
        id: 7,
        type: 'Vue Developer',
        total_budget: 14987.0,
        expenses: 14999.12,
        remaining: 6922.0,
      },
      {
        id: 8,
        type: 'C# Developer',
        total_budget: 25698.0,
        expenses: 12222.12,
        remaining: 1442.0,
      },
    ],
    budget_distribution: {
      series: [44, 55, 67, 83],
      chart: {
        height: 267,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '12px',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 500,
              color: 'var(--chart-text-color)',
              offsetY: 18,
            },
            value: {
              fontSize: '18px',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 600,
              color: '#2F2F3B',
              offsetY: -18,
            },
            total: {
              show: true,
              label: 'Budget Use',
              fontSize: '13px',
              formatter: function (w: any) {
                return 67;
              },
            },
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 0,
        fontSize: '14px',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        labels: {
          colors: 'var(--chart-text-color)',
        },
        markers: {
          width: 8,
          height: 8,
          size: 4,
          strokeWidth: 0,
        },
      },
      colors: ['#7366FF', '#838383', '#ffb829', '#65c15c'],
      labels: ['Design', 'Product', 'Development', 'Marketing'],
    },
  },
  team: [
    {
      id: 1,
      developer_name: 'Cameron Williamson',
      position: 'QA Assistant',
      profile: 'assets/images/dashboard-11/user/1.jpg',
      total_task: 190,
      completed_task: 110,
      revenue: 9284,
      projects: 19,
      features: 150,
      color: 'primary',
    },
    {
      id: 2,
      developer_name: 'Magnolia Parker',
      position: 'Product Manager',
      profile: 'assets/images/dashboard-11/user/3.jpg',
      total_task: 100,
      completed_task: 56,
      revenue: 4869,
      projects: 231,
      features: 108,
      color: 'success',
    },
    {
      id: 3,
      developer_name: 'Jasper Bennett',
      position: 'Freelancer',
      profile: 'assets/images/dashboard-11/user/4.jpg',
      total_task: 200,
      completed_task: 150,
      revenue: 9735,
      projects: 12,
      features: 100,
      color: 'warning',
    },
    {
      id: 4,
      developer_name: 'Leslie Alexander',
      position: 'Web Developer',
      profile: 'assets/images/dashboard-11/user/7.jpg',
      total_task: 200,
      completed_task: 150,
      revenue: 1805,
      projects: 28,
      features: 150,
      color: 'secondary',
    },
    {
      id: 5,
      developer_name: 'Maverick Sullivan',
      position: 'JS Developer',
      profile: 'assets/images/dashboard-11/user/9.jpg',
      total_task: 200,
      completed_task: 120,
      revenue: 3805,
      projects: 69,
      features: 150,
      color: 'warning',
    },
    {
      id: 6,
      developer_name: 'Wren Harrison',
      position: 'Backend Developer',
      profile: 'assets/images/dashboard-11/user/11.jpg',
      total_task: 50,
      completed_task: 30,
      revenue: 6378,
      projects: 56,
      features: 150,
      color: 'secondary',
    },
    {
      id: 7,
      developer_name: 'Saffron Valencia',
      position: 'UX Designer',
      profile: 'assets/images/dashboard-11/user/12.jpg',
      total_task: 200,
      completed_task: 120,
      revenue: 7950,
      projects: 356,
      features: 150,
      color: 'success',
    },
    {
      id: 8,
      developer_name: 'Lyra Hawthorne',
      position: 'Game Developer',
      profile: 'assets/images/dashboard-11/user/8.jpg',
      total_task: 90,
      completed_task: 50,
      revenue: 6378,
      projects: 56,
      features: 150,
      color: 'primary',
    },
  ],
  attachment: {
    attachment_types: [
      {
        id: 1,
        title: 'Images',
        icon: 'attach-img',
        color: 'primary',
      },
      {
        id: 2,
        title: 'Audio',
        icon: 'attach-audio',
        color: 'secondary',
      },
      {
        id: 3,
        title: 'Video',
        icon: 'attach-video',
        color: 'success',
      },
      {
        id: 4,
        title: 'Documents',
        icon: 'attach-doc',
        color: 'warning',
      },
      {
        id: 5,
        title: 'PDF Files',
        icon: 'attach-pdf',
        color: 'primary',
      },
    ],
    attachments: [
      {
        id: 1,
        file_name: 'Logger...',
        upload_time: '7 weeks',
        file_icon: 'doc-file',
        total_file_size: 30,
        upload_size: 10.2,
      },
      {
        id: 2,
        file_name: 'User Product',
        upload_time: '2 weeks',
        file_icon: 'ai-file',
        total_file_size: 14.2,
        upload_size: 14,
      },
      {
        id: 3,
        file_name: 'Database Log..',
        upload_time: '2 days',
        file_icon: 'sql-file',
        total_file_size: 45,
        upload_size: 15.9,
      },
      {
        id: 4,
        file_name: 'Dashboard Doc',
        upload_time: '15 weeks',
        file_icon: 'pdf-file',
        total_file_size: 16,
        upload_size: 10.3,
      },
      {
        id: 5,
        file_name: 'React Theme...',
        upload_time: '11 days',
        file_icon: 'xml-file',
        total_file_size: 35,
        upload_size: 24.9,
      },
      {
        id: 6,
        file_name: 'Mofi Theme..',
        upload_time: '1 day',
        file_icon: 'css-file',
        total_file_size: 20,
        upload_size: 12.6,
      },
    ],
  },
  activity: [
    {
      title: `New order<a href="javascript:void(0)">&nbsp;#109876&nbsp;</a>is placed for Works how of marketing and make new product launch`,
      description:'Conduct Market Research: Start by researching your target market and understanding their needs, preferences, and behaviors. This will help you develop a product that meets their needs and has a strong market demand. Develop a Marketing Plan: Once you have a product idea, develop a marketing plan that outlines your target audience, messaging, and marketing channels. Consider using a mix of traditional and digital marketing tactics to reach your target audience.',
      time: '2:20 PM',
      added_by: {
        name: 'Mili Pais',
        profile: 'assets/images/user/common-user/3.png',
      },
      color: 'primary',
    },
    {
      title: `Megan Elmore`,
      time: 'Adding a new event with attachments - 03:45',
      added_by: {
        name: 'Esther Howard',
        profile: 'assets/images/user/common-user/5.png',
      },
      color: 'warning',
      attachments: [
        {
          file_name: 'Mofi Documentation',
          file_icon: 'pdf-file',
          file_size: '678 KB',
        },
        {
          file_name: 'Web Template',
          file_icon: 'doc-file',
          file_size: '2.4 MB',
        },
      ],
    },
    {
      title: `Five new flowchart ideas have been incorporated.`,
      time: 'at 4:23 PM',
      added_by: {
        name: 'Leslie Alexander',
        profile: 'assets/images/user/common-user/7.png',
      },
      color: 'primary',
      images: [
        { image_url: 'assets/images/project/flowchart-1.png' },
        { image_url: 'assets/images/project/flowchart-2.png' },
        { image_url: 'assets/images/project/flowchart-3.png' },
        { image_url: 'assets/images/project/flowchart-4.png' },
        { image_url: 'assets/images/project/flowchart-5.png' },
      ],
    },
    {
      title: `Any kind of collaborative endeavour might have a theme. Use the theme to pass along data so that your team can understand it and contribute to the project.`,
      time: 'At 6:23 PM',
      added_by: {
        name: 'Guy Hawkins',
        profile: 'assets/images/user/common-user/1.png',
      },
      color: 'warning',
      members: [
        {
          name: 'Sarah Wilson',
          profile: 'assets/images/dashboard-11/user/2.jpg',
        },
        {
          name: 'Richard Taylor',
          profile: 'assets/images/dashboard-11/user/1.jpg',
        },
        { name: 'Linda Brown' },
        {
          name: 'Jessica Anderson',
          profile: 'assets/images/dashboard-11/user/8.jpg',
        },
      ],
    },
    {
      title: `Task has emerged in the 'Mofi' template, awaiting your action.`,
      time: 'At 8:05 PM',
      added_by: {
        name: 'Jacob Jones',
        profile: 'assets/images/user/common-user/8.png',
      },
      color: 'primary',
      templates: [
        {
          id: 1,
          project_name: 'Chitchat Template',
          task: 'Make a creating an account profile',
          assign_to: [
            {
              name: 'Jenny Wilson',
              profile: 'assets/images/dashboard/user/2.jpg',
            },
            {
              name: 'Levine Raven',
              profile: 'assets/images/dashboard-11/user/2.jpg',
            },
            {
              name: 'Davis Jone',
              profile: 'assets/images/dashboard-11/user/12.jpg',
            },
          ],
          status: 'Completed',
          color: 'success',
          due_date: '14 Oct, 2024',
        },
      ],
    },
  ],
};


export const todoStatus = [
  {
    id: 1,
    title: 'Completed'
  },
  {
    id: 2,
    title: 'Reschedule'
  },
  {
    id: 3,
    title: 'Repeat'
  }
]

export const todoListColors: string[] = [
  'primary',
  'secondary',
  'success',
  'warning',
];
export const projectStatus = [
  {
    id: 1,
    title: 'Pending',
    value: 'pending',
    color: 'primary',
  },
  {
    id: 2,
    title: 'In Progress',
    value: 'progress',
    color: 'warning',
  },
  {
    id: 3,
    title: 'Completed',
    value: 'completed',
    color: 'success',
  },
];

export const projectStatusOptions = [
  {
    id: 1,
    title: 'View Project',
  },
  {
    id: 2,
    title: 'Add Members',
  },
  {
    id: 3,
    title: 'Update Status',
  },
];

export const projectCostPerformance: any = {
  title: 'Project Cost Performance',
  total_budget: 45.764,
  actual_cost: 85.49,
  labels: ['Budget', 'Cost', ''],
  series: [50, 30],
  chart: {
    type: 'donut',
    height: 240,
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 6,
      color: ['#7366FF', '#838383', '#ffffff'],
      opacity: 0.2,
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      startAngle: -90,
      endAngle: 90,
      offsetY: -10,
      offsetX: 0,
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            offsetY: -25,
          },
          value: {
            show: false,
          },
          total: {
            show: true,
            fontSize: '14px',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            label: 'Actual Cost',
            color: '#363636',
          },
        },
      },
    },
  },
  grid: {
    padding: {
      bottom: -120,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  colors: [primaryColor, '#65c15c', '#ffffff'],
  responsive: [
    {
      breakpoint: 1870,
      options: {
        chart: {
          height: 250,
        },
      },
    },
    {
      breakpoint: 1780,
      options: {
        chart: {
          height: 240,
        },
      },
    },
  ],
};

export const projectRating = {
  title: 'Highlights Rating',
  rating: 8.63,
  icon: 'thumbs-up',
  card_color: 'secondary',
  details: [
    {
      title: 'Avg. Client Rate',
      rating: 7.8,
      increase: true,
    },
    {
      title: 'Avg. Marketplace Rate',
      rating: 6.8,
      increase: false,
    },
  ],
};

export const projectTeam = {
  title: 'Professionals Team',
  total_member: 56,
  icon: 'user',
  card_color: 'success',
  team_members: [
    { name: 'Marley Ford', profile: 'assets/images/dashboard-11/user/3.jpg' },
    { name: 'Sarah Wilson', profile: 'assets/images/dashboard-11/user/7.jpg' },
    {
      name: 'Jessica Anderson',
      profile: 'assets/images/dashboard-11/user/8.jpg',
    },
    { name: 'Ford Stoll', profile: 'assets/images/dashboard-11/user/9.jpg' },
    { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/1.jpg' },
  ],
};

export const totalProjects = {
  title: 'Total Projects',
  total_project: 153,
  icon: 'file-pen',
  card_color: 'warning',
  details: [
    { title: 'Pending', value: 27 },
    { title: 'Progress', value: 48 },
    { title: 'Completed', value: 78 },
  ],
};

export const projectTab: Tabs[] = [
  {
    id: 1,
    title: 'All',
    value: 'all',
    icon: 'bullseye',
  },
  {
    id: 2,
    title: 'In Progress',
    value: 'in_progress',
    icon: 'bars-progress',
  },
  {
    id: 3,
    title: 'Pending',
    value: 'pending',
    icon: 'hourglass-half',
  },
  {
    id: 4,
    title: 'Completed',
    value: 'completed',
    icon: 'circle-check',
  },
];

export const projects: Projects[] = [
  {
    id: 1,
    project_name: 'CRM Dashboard',
    project_description: 'Create a Brand logo design for a mofi admin.',
    project_banner: 'assets/images/project/list/1.png',
    date: '06 Nov, 2024',
    progress: 40,
    status: 'pending',
    budget: '$845,540.00',
    team_member: [
      { name: 'Alexis Taylor', profile: 'assets/images/dashboard/user/10.jpg' },
      { name: 'Andrew Price', profile: 'assets/images/dashboard/user/11.jpg' },
      { name: 'Emily Park' },
      { name: 'Caryl Kauth', profile: 'assets/images/dashboard/user/1.jpg' },
    ],
  },
  {
    id: 2,
    project_name: 'Chat Application',
    project_description:
      'Create a chat application for business messaging needs.',
    project_banner: 'assets/images/project/list/2.png',
    date: '10 Mar, 2024',
    progress: 100,
    status: 'completed',
    budget: '$348,940.00',
    team_member: [
      { name: 'Caleb Rivera', profile: 'assets/images/dashboard/user/12.jpg' },
      { name: 'Jenny Wilson', profile: 'assets/images/dashboard/user/2.jpg' },
      { name: 'Olivia Gor', profile: 'assets/images/dashboard/user/13.jpg' },
    ],
  },
  {
    id: 3,
    project_name: 'Redesign - Landing page',
    project_description:
      'Resign a landing page design. as per abc minimal design.',
    project_banner: 'assets/images/project/list/3.png',
    date: '12 July, 2023',
    progress: 60,
    status: 'in_progress',
    budget: '$753,759.00',
    team_member: [
      {
        name: 'Levine Raven',
        profile: 'assets/images/dashboard-11/user/2.jpg',
      },
      { name: 'Davis Jone', profile: 'assets/images/dashboard-11/user/12.jpg' },
      {
        name: 'Jessica Anderson',
        profile: 'assets/images/dashboard-9/user/2.png',
      },
      {
        name: 'Dashiell Wolfe',
        profile: 'assets/images/dashboard-9/user/5.png',
      },
    ],
  },
  {
    id: 4,
    project_name: 'Client Meeting',
    project_description: 'Meeting about share web all live link.',
    project_banner: 'assets/images/project/list/4.png',
    date: '10 Feb, 2023',
    progress: 20,
    status: 'pending',
    budget: '$159,948.00',
    team_member: [
      { name: 'Thomas Jones', profile: 'assets/images/dashboard-9/user/1.png' },
      { name: 'Karen Jones' },
      {
        name: 'Elizabeth Williams',
        profile: 'assets/images/dashboard-9/user/3.png',
      },
    ],
  },
  {
    id: 5,
    project_name: 'Makeover-Landing page',
    project_description: 'Create landing page in design guidelines.',
    project_banner: 'assets/images/project/list/5.png',
    date: '09 Feb, 2024',
    progress: 50,
    status: 'in_progress',
    budget: '$987,720.00',
    team_member: [
      {
        name: 'Sarah Wilson',
        profile: 'assets/images/dashboard-11/user/2.jpg',
      },
      {
        name: 'Richard Taylor',
        profile: 'assets/images/dashboard-11/user/1.jpg',
      },
      { name: 'Linda Brown' },
      {
        name: 'Jessica Anderson',
        profile: 'assets/images/dashboard-11/user/8.jpg',
      },
    ],
  },
  {
    id: 6,
    project_name: 'Sales Project',
    project_description:
      'Create a chat application for business messaging needs.',
    project_banner: 'assets/images/project/list/6.png',
    date: '14 May, 2024',
    progress: 70,
    status: 'pending',
    budget: '$821,961.00',
    team_member: [
      {
        name: 'Marley Ford',
        profile: 'assets/images/dashboard-11/user/10.jpg',
      },
      { name: 'Gray Curran', profile: 'assets/images/dashboard-11/user/9.jpg' },
      { name: 'Yarrow Wix' },
    ],
  },
  {
    id: 1,
    project_name: 'Grocery App',
    project_description:
      'smooth purchasing journey and effective delivery options.',
    project_banner: 'assets/images/project/list/7.png',
    date: '27 Oct, 2024',
    progress: 100,
    status: 'completed',
    budget: '$951,675.00',
    team_member: [
      { name: 'Calista Rivers', profile: 'assets/images/dashboard/user/3.jpg' },
      {
        name: 'Jasper Nightingale',
        profile: 'assets/images/dashboard/user/4.jpg',
      },
      { name: 'Seraphina Evergreen' },
      { name: 'Caspian Wilde', profile: 'assets/images/dashboard/user/5.jpg' },
    ],
  },
  {
    id: 2,
    project_name: 'NFT Website',
    project_description: 'Explore our NFT marketplace to find digital assets.',
    project_banner: 'assets/images/project/list/9.png',
    date: '02 Feb, 2024',
    progress: 75,
    status: 'in_progress',
    budget: '$753,759.00',
    team_member: [
      { name: 'Daxton Creed' },
      { name: 'Marigold Luna' },
      { name: 'Charles Rodriguez', profile: 'assets/images/user/14.png' },
      { name: 'Sarah Hernandez', profile: 'assets/images/user/3.png' },
    ],
  },
  {
    id: 3,
    project_name: 'Sales management',
    project_description:
      'Precise objectives and deliver exceptional performance.',
    project_banner: 'assets/images/project/list/10.png',
    date: '28 Jan, 2024',
    progress: 35,
    status: 'completed',
    budget: '$652,444.00',
    team_member: [
      { name: 'Atlas Stone', profile: 'assets/images/user/12.png' },
      { name: 'Oceana Meridian', profile: 'assets/images/user/10.jpg' },
      { name: 'Jett Maverick' },
    ],
  },
  {
    id: 4,
    project_name: 'Fish Mobile App',
    project_description: 'Real-time tracking, and fishing advice.',
    project_banner: 'assets/images/project/list/12.png',
    date: '28 Nov, 2024',
    progress: 87,
    status: 'in_progress',
    budget: '$241,989.00',
    team_member: [
      { name: 'Xander Wilde' },
      {
        name: 'Charles Rodriguez',
        profile: 'assets/images/dashboard-11/user/5.jpg',
      },
      { name: 'Zenith Nova' },
      {
        name: 'Sarah Hernandez',
        profile: 'assets/images/dashboard-11/user/6.jpg',
      },
    ],
  },
  {
    id: 5,
    project_name: 'Nursery App',
    project_description: "Correspondence and monitor your child's development.",
    project_banner: 'assets/images/project/list/11.png',
    date: '03 Sep, 2024',
    progress: 25,
    status: 'completed',
    budget: '$652,444.00',
    team_member: [
      { name: 'Kairos Frost' },
      { name: 'Oceana Meridian', profile: 'assets/images/user/2.jpg' },
      { name: 'Ember Wren' },
    ],
  },
  {
    id: 6,
    project_name: 'E-commerce Web',
    project_description: 'E-commerce is focusing on optimizing.',
    project_banner: 'assets/images/project/list/8.png',
    date: '08 Nov, 2024',
    progress: 80,
    status: 'pending',
    budget: '$400,548.00',
    team_member: [
      { name: 'Joseph Garcia', profile: 'assets/images/avatar/16.jpg' },
      { name: 'Elizabeth Davis', profile: 'assets/images/avatar/3.jpg' },
      { name: 'Karen Moore' },
      { name: 'Robert Williams' },
    ],
  },
];

export const projectType = [
  {
    value: 'hourly',
    label: 'Hourly',
  },
  {
    value: 'fixed',
    label: 'Fixed',
  },
];

export const projectCategory = [
  {
    value: 'developer',
    label: 'Developer',
  },
  {
    value: 'designer',
    label: 'Designer',
  },
  {
    value: 'analyst',
    label: 'Analyst',
  },
  {
    value: 'scientist',
    label: 'Scientist',
  },
  {
    value: 'architect',
    label: 'Architect',
  },
];

export const projectPriority = [
  {
    value: 'urgent',
    label: 'Urgent',
  },
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'low',
    label: 'Low',
  },
];

export const projectSize = [
  {
    value: 'small',
    label: 'Small',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'large',
    label: 'Large',
  },
];
