import { AnalyticsDetailsChart, PageAnalytics, ReferralsVisit, SessionByBrowser } from "../../interface/dashboard/analytics";
import { primaryColor, secondaryColor } from "../common";

export const referralsVisit: ReferralsVisit[] = [
    {
        social_network: 'Facebook',
        conversion_rate: '3.2%',
        visits: '10,000',
        icon_class: 'primary',
        icon: 's-facebook',
        class: 'success'
    },
    {
        social_network: 'Instagram',
        conversion_rate: '2.8%',
        visits: '5,000',
        icon_class: 'warning',
        icon: 's-instagram',
        class: 'warning'
    },
    {
        social_network: 'Pinterest',
        conversion_rate: '4.0%',
        visits: '7,500',
        icon_class: 'secondary',
        icon: 's-pinterest',
        class: 'info'
    },
    {
        social_network: 'Twitter',
        conversion_rate: '3.8%',
        visits: '3,000',
        icon_class: 'info',
        icon: 's-twitter',
        class: 'danger'
    }
];

export const sessionByCountries: any = {
    series: [
        {
            name: "Session",
            data: [40, 20, 30, 15, 40, 26],
        },
    ],
    chart: {
        type: "bar",
        height: 275,
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "52%",
            borderRadius: 0,
        },
    },
    grid: {
        show: true,
        borderColor: "var(--chart-border)",

        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val: string) {
            return val + "%";
        },
        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize: "11px",
            fontFamily: "Rubik, sans-serif",
            fontWeight: "500",
        },
    },
    stroke: {
        width: 2,
        dashArray: 0,
        lineCap: "butt",
        colors: "#fff",
    },
    legend: {
        show: false,
    },

    colors: ["#40b8f5"],
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            gradientToColors: [primaryColor],
            shadeIntensity: 1,
            type: "vertical",
            opacityFrom: 0.9,
            opacityTo: 1,
            opacity: 1,
            stops: [0, 100, 100, 100],
        },
    },
    yaxis: {
        min: 0,
        max: 50,
        tickAmount: 5,
        tickPlacement: "between",
        labels: {
            formatter: function (value: string) {
                return value + "%";
            },
            style: {
                fontWeight: 400,
                colors: "#52526C",
                fontSize: 12,
                fontFamily: "Rubik, sans-serif",
            },
        },

        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    xaxis: {
        categories: ["India", "Canada", "Russia", "Germany", "France", "China"],
        labels: {
            style: {
                fontWeight: 400,
                colors: "#52526C",
                fontFamily: "Rubik, sans-serif",
                fontSize: 12,
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1846,
            options: {
                chart: {
                    height: 298,
                },
            },
        },
        {
            breakpoint: 1456,
            options: {
                chart: {
                    height: 275,
                },
            },
        },
        {
            breakpoint: 1735,
            options: {
                dataLabels: {
                    style: {
                        fontSize: "9px",
                    },
                },
            },
        },
        {
            breakpoint: 1560,
            options: {
                dataLabels: {
                    style: {
                        fontSize: "8px",
                    },
                },
            },
        },
        {
            breakpoint: 1325,
            options: {
                dataLabels: {
                    enabled: false,
                },
            },
        },
        {
            breakpoint: 1200,
            options: {
                chart: {
                    height: 282,
                },
            },
        },
        {
            breakpoint: 767,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: "15px",
                    },
                },
            },
        },
        {
            breakpoint: 624,
            options: {
                chart: {
                    height: 264,
                },
            },
        },
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 284,
                },
                plotOptions: {
                    bar: {
                        columnWidth: "30px",
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "12px",
                    },
                },
            },
        },
        {
            breakpoint: 400,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: "20px",
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "8px",
                    },
                },
            },
        },
    ],
}

export const pageAnalytics: PageAnalytics[] = [
    {
        id: 1,
        page_name: '/home',
        page_views: '96,860',
        bounce_rate: '30',
        click_rate: '1.7',
        devices: 'Mobile',
        page_icon: 'up',
        bounce_icon: 'down',
        click_icon: 'down',
        page_class: 'success',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 2,
        page_name: '/product',
        page_views: '20,759',
        bounce_rate: '90',
        click_rate: '6.9',
        devices: 'Desktop',
        page_icon: 'down',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'danger',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 3,
        page_name: '/blog',
        page_views: '46,159',
        bounce_rate: '16',
        click_rate: '2.4',
        devices: 'Desktop',
        page_icon: 'up',
        bounce_icon: 'down',
        click_icon: 'down',
        page_class: 'success',
        bounce_class: 'danger',
        click_class: 'danger',
    },
    {
        id: 4,
        page_name: '/aboutus',
        page_views: '84,252',
        bounce_rate: '70',
        click_rate: '6.7',
        devices: 'Mobile',
        page_icon: 'up',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'success',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 5,
        page_name: '/contactus',
        page_views: '26,780',
        bounce_rate: '60',
        click_rate: '8.3',
        devices: 'Desktop',
        page_icon: 'down',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'danger',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 6,
        page_name: '/users',
        page_views: '52,452',
        bounce_rate: '54',
        click_rate: '8.6',
        devices: 'Tablet',
        page_icon: 'up',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'success',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 7,
        page_name: '/faq',
        page_views: '75,568',
        bounce_rate: '20',
        click_rate: '3.3',
        devices: 'Desktop',
        page_icon: 'down',
        bounce_icon: 'down',
        click_icon: 'down',
        page_class: 'danger',
        bounce_class: 'danger',
        click_class: 'danger',
    },
    {
        id: 8,
        page_name: '/chat',
        page_views: '45,586',
        bounce_rate: '75',
        click_rate: '9.3',
        devices: 'Tablet',
        page_icon: 'down',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'danger',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 9,
        page_name: '/charts',
        page_views: '65,258',
        bounce_rate: '69',
        click_rate: '4.2',
        devices: 'Mobile',
        page_icon: 'up',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'danger',
        bounce_class: 'success',
        click_class: 'success',
    },
    {
        id: 10,
        page_name: '/tasks',
        page_views: '69,777',
        bounce_rate: '86',
        click_rate: '9.1',
        devices: 'Desktop',
        page_icon: 'up',
        bounce_icon: 'up',
        click_icon: 'up',
        page_class: 'success',
        bounce_class: 'success',
        click_class: 'success',
    },
]

export const sessionByBrowser: SessionByBrowser[] = [
    {
        browser: "Chrome",
        sessions: '84,8604',
        image: "assets/images/dashboard-10/browsers/chrome.svg"
    },
    {
        browser: "Safari",
        sessions: '51,4850',
        image: "assets/images/dashboard-10/browsers/safari.svg"
    },
    {
        browser: "Firefox",
        sessions: '15,750',
        image: "assets/images/dashboard-10/browsers/firefox.svg"
    },
    {
        browser: "Edge",
        sessions: '8,952',
        image: "assets/images/dashboard-10/browsers/edge.svg"
    },
    {
        browser: "Opera",
        sessions: '5,950',
        image: "assets/images/dashboard-10/browsers/opera.svg"
    }
]

export const analyticsDetailsChart: AnalyticsDetailsChart[] = [
    {
        id: 1,
        title: 'Total Users',
        value: '8630k',
        analytics_value: '+50%',
        txt_class: 'success',
        image_class: 'primary',
        icon: 'trending-up',
        image: 'analytics-user',
        chart_id: 'user-analytics',
        card_body_class: 'pt-0',
        card_class: 'overflow-hidden',
        body_div_class: 'user-analytics-wrapper',
        chart_details: {
            series: [
                {
                    name: "Month",
                    data: [4, 3, 3, 3, 4, 3, 3, 4, 5, 3.5, 2.5, 2.5],
                },
            ],
            chart: {
                height: 105,
                type: "bar",
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: "around",
                    borderRadiusWhenStacked: "last",
                    columnWidth: "30%",
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
            colors: ["var(--theme-default)", "rgba(115, 102, 255, 0.13)", "rgba(115, 102, 255, 0.33)", "rgba(115, 102, 255, 0.62)", "rgba(115, 102, 255, 0.09)"],
            responsive: [
                {
                    breakpoint: 576,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: "8px",
                            },
                        },
                    },
                },
            ],
        }
    },
    {
        id: 2,
        title: 'Page Views',
        value: '54390k',
        analytics_value: '-20%',
        txt_class: 'danger',
        image_class: 'secondary',
        icon: 'trending-down',
        image: 'analytics-view',
        chart_id: 'page-view-chart',
        card_body_class: 'p-0',
        card_class: 'overflow-hidden',
        body_div_class: 'analytics-view-wrapper',
        chart_details: {
            series: [
                {
                    name: "Month",
                    data: [0, 20, 20, 15, 15, 10, 10, 5, 5, 10, 10, 20, 20, 15, 15, 20, 20],
                },
            ],
            chart: {
                type: "area",
                height: 128,
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            xaxis: {
                type: "category",
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
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
                padding: {
                    left: -60,
                },
            },
            yaxis: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                hover: {
                    sizeOffset: 4,
                },
            },
            colors: [secondaryColor],
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.1,
                    inverseColors: true,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
        }
    },
    {
        id: 3,
        title: 'Sessions',
        value: '921,35k',
        analytics_value: '-15%',
        txt_class: 'danger',
        image_class: 'success',
        icon: 'trending-down',
        image: 'analytics-session',
        progress: true,
        card_body_class: 'pt-0',
        body_div_class: 'session-progress',
    },
    {
        id: 4,
        title: 'Bounce Rate',
        value: '95.45%',
        analytics_value: '+85%',
        txt_class: 'success',
        image_class: 'danger',
        icon: 'trending-up',
        image: 'analytics-rate',
        chart_id: 'bounce-rate-chart',
        card_body_class: 'p-0',
        card_class: 'overflow-hidden',
        body_div_class: 'bounce-rate-wrapper',
        chart_details: {
            series: [
                {
                    name: "Bounce Rate",
                    data: [10, 5, 4, 8, 3, 4, 6, 4, 3, 9, 10, 5, 12, 14, 10, 12, 14, 14, 10, 12, 14, 20, 24, 14, 10, 12, 10, 12, 14, 18, 18, 10, 12, 10, 8, 12, 10, 12, 14, 10, 8, 10, 12, 12, 14, 10, 14, 12, 12, 10, 22, 12, 11, 8, 12, 8, 12, 14, 13, 16, 14, 14, 8, 8, 5, 6, 6, 8, 8, 7, 7, 6, 10, 18, 8],
                },
            ],
            chart: {
                height: 160,
                type: "area",
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: 2,
                curve: "straight",
                lineCap: "butt",
            },

            colors: ["#fc564a"],
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.1,
                    inverseColors: true,
                    opacityFrom: 0.5,
                    opacityTo: 0.1,
                    stops: [0, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },

            title: {
                show: false,
            },
            grid: {
                show: false,
                padding: {
                    left: -60,
                },
            },
            xaxis: {
                categories: undefined,
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
                show: false,
            },
            markers: {
                hover: {
                    sizeOffset: 4,
                },
            },
            responsive: [
                {
                    breakpoint: 1501,
                    options: {
                        chart: {
                            height: 188,
                        },
                    },
                },
                {
                    breakpoint: 1200,
                    options: {
                        chart: {
                            height: 130,
                        },
                    },
                },
            ],
        }
    },
    {
        id: 5,
        title: 'Average Visit Duration',
        value: '789,10k',
        analytics_value: '+80%',
        txt_class: 'success',
        image_class: 'warning',
        icon: 'trending-up',
        image: 'analytics-duration',
        chart_id: 'visit-duration',
        card_body_class: 'p-0',
        card_class: 'overflow-hidden',
        body_div_class: 'visit-duration-wrapper',
        chart_details: {
            series: [
                {
                    name: "Month",
                    data: [0, 15, 15, 10, 10, 20, 20, 25, 25],
                },
            ],
            chart: {
                type: "area",
                height: 160,
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: "straight",
                width: 3,
            },
            xaxis: {
                type: "category",
                categories: ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct"],
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
                padding: {
                    left: -60,
                },
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
                        dataPointIndex: 7,
                        fillColor: "#ffb829",
                        strokeColor: "var(--white)",
                        size: 6,
                        sizeOffset: 3,
                    },
                ],
                hover: {
                    size: 5,
                    sizeOffset: 0,
                },
            },
            colors: ["#ffb829"],
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.1,
                    inverseColors: true,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
            responsive: [
                {
                    breakpoint: 1501,
                    options: {
                        chart: {
                            height: 188,
                        },
                    },
                },
                {
                    breakpoint: 1200,
                    options: {
                        chart: {
                            height: 130,
                        },
                    },
                },
            ],
        }
    },
    {
        id: 6,
        title: 'User Retention',
        value: '845,48k',
        analytics_value: '-22%',
        txt_class: 'danger',
        image_class: 'info',
        icon: 'trending-down',
        image: 'analytics-retention',
        user_progress: true,
        card_class: 'retention-progress',
        body_div_class: 'progress',
    },
]