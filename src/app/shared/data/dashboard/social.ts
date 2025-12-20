import { Tabs } from "../../interface/common";
import { Campaigns, SocialAnalytics, SocialAnalyticsChart, SocialAnalyticsTabs, SocialMediaDetails, TopPerformers } from "../../interface/dashboard/social";
import { primaryColor, secondaryColor } from "../common";

function socialMediaChart(data: { color: string[], dropShadowColor: string, radialYSeries: number[] }) {
  return {
    series: data.radialYSeries,
    chart: {
      height: 120,
      type: "radialBar",
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 10,
        color: data.dropShadowColor,
        opacity: 0.35,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%",
        },
        track: {
          strokeWidth: "55%",
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          showOn: "always",
          value: {
            color: "var(--body-font-color)",
            fontSize: "14px",
            show: true,
            offsetY: -10,
          },
        },
      },
    },
    colors: data.color,
    stroke: {
      lineCap: "round",
    },
    responsive: [
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: 130,
          },
        },
      },
    ],
  };
}

export const socialMediaDetails: SocialMediaDetails[] = [
  {
    id: 1,
    platform_name: 'Facebook',
    platform_logo: 'assets/images/dashboard-5/social/1.png',
    title: 'Likes',
    value: 12098,
    rate: '22.9',
    type: 'increase',
    chart_details: socialMediaChart({
      color: ["var(--theme-default)"],
      dropShadowColor: "var(--theme-default)",
      radialYSeries: [78],
    })
  },
  {
    id: 2,
    platform_name: 'Instagram',
    platform_logo: 'assets/images/dashboard-5/social/2.png',
    title: 'Followers',
    value: 15080,
    rate: '27.4',
    type: 'decrease',
    chart_details: socialMediaChart({
      color: ["var(--theme-secondary)"],
      dropShadowColor: "var(--theme-secondary)",
      radialYSeries: [70],
    })
  },
  {
    id: 3,
    platform_name: 'X (Twitter)',
    platform_logo: 'assets/images/dashboard-5/social/3.png',
    title: 'Followers',
    value: 12564,
    rate: '76.10',
    type: 'increase',
    chart_details: socialMediaChart({
      color: ["#57B9F6"],
      dropShadowColor: "#57B9F6",
      radialYSeries: [58],
    })
  },
  {
    id: 4,
    platform_name: 'Youtube',
    platform_logo: 'assets/images/dashboard-5/social/4.png',
    title: 'Followers',
    value: 85967,
    rate: '62.08',
    type: 'increase',
    chart_details: socialMediaChart({
      color: ["#ffb829"],
      dropShadowColor: "#ffb829",
      radialYSeries: [60],
    })
  },
  {
    id: 5,
    platform_name: 'LinkedIn',
    platform_logo: 'assets/images/dashboard-5/social/5.png',
    title: 'Followers',
    value: 15005,
    rate: '14.09',
    type: 'decrease',
    chart_details: socialMediaChart({
      color: ["var(--theme-default)"],
      dropShadowColor: "var(--theme-default)",
      radialYSeries: [80],
    })
  },
  {
    id: 6,
    platform_name: 'Pinterest',
    platform_logo: 'assets/images/dashboard-5/social/6.png',
    title: 'Followers',
    value: 20015,
    rate: '95.10',
    type: 'increase',
    chart_details: socialMediaChart({
      color: ["var(--theme-secondary)"],
      dropShadowColor: "var(--theme-secondary)",
      radialYSeries: [40],
    })
  }
]

export const instagramSubscribers: any = {
  title: 'Instagram Subscribers',
  description: '(75% activity growth)',
  series: [
    {
      name: "growth",
      type: "line",
      data: [12, 10, 25, 12, 30, 10, 55, 45, 60],
    },
    {
      name: "growth",
      type: "line",
      data: [10, 15, 20, 18, 38, 25, 55, 35, 60],
    },
  ],
  chart: {
    height: 220,
    type: "line",
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 8,
      left: 0,
      blur: 2,
      color: ["#FFA941", primaryColor],
      opacity: 0.1,
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
  colors: ["#FFA941", primaryColor],
  stroke: {
    width: 2,
    curve: "smooth",
    opacity: 1,
  },
  markers: {
    discrete: [
      {
        seriesIndex: 1,
        dataPointIndex: 4,
        fillColor: "#7064F5",
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
    categories: ["Sep 5", "Sep 8", "Sep 12", "Sep 16", "Sep 18", "Sep 17", "Sep 23", "Sep 26", "Sep 30"],
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
    min: 10,
    max: 60,
    tickAmount: 5,
    labels: {
      formatter: function (val: string) {
        return val + "k";
      },
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
      breakpoint: 1694,
      options: {
        chart: {
          height: 245,
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 222,
          width: "100%",
        },
        xaxis: {
          tickAmount: 6,
        },
      },
    },
    {
      breakpoint: 1235,
      options: {
        xaxis: {
          tickAmount: 4,
        },
      },
    },
    {
      breakpoint: 1353,
      options: {
        chart: {
          height: 245,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 260,
        },
      },
    },
    {
      breakpoint: 1040,
      options: {
        chart: {
          height: 240,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 255,
        },
      },
    },
  ],
}

export const facebookCampaign = {
  title: 'Facebook Campaign',
  description: "Here's a brief overview of the data typically associated with a Facebook campaign.",
  tag: 'Active',
  tag_color: 'success',
  details: [
    {
      title: 'Followers today',
      value: 1897
    },
    {
      title: 'Followers goals',
      value: 50000
    }
  ],
  userProfiles: [
    { image_url: 'assets/images/dashboard/user/1.jpg' },
    { image_url: 'assets/images/dashboard/user/6.jpg' },
    { image_url: 'assets/images/dashboard/user/7.jpg' },
    { image_url: 'assets/images/dashboard/user/3.jpg' },
    { image_url: 'assets/images/dashboard/user/8.jpg' },
    { image_url: 'assets/images/dashboard/user/2.jpg' },
    { image_url: 'assets/images/dashboard/user/4.jpg' },
    { image_url: 'assets/images/dashboard/user/5.jpg' },
    { image_url: 'assets/images/dashboard/user/6.jpg' },
    { image_url: 'assets/images/dashboard/user/7.jpg' }
  ]
}

export const campaigns: Campaigns[] = [
  {
    id: 1,
    platform_name: "facebook",
    platform_logo: "facebook-f",
    campaign: "Jane Cooper",
    geo: "UK",
    profitability: "45.6%",
    impressions: "$9,786",
    status: "Active",
    icon: 'trending-up'
  },
  {
    id: 2,
    platform_name: "instagram",
    platform_logo: "instagram",
    campaign: "Floyd Miles",
    geo: "DE",
    profitability: "12.3%",
    impressions: "$19,7098",
    status: "Active",
    icon: 'trending-down'

  },
  {
    id: 3,
    platform_name: "pinterest",
    platform_logo: "pinterest",
    campaign: "Guy Hawkins",
    geo: "ES",
    profitability: "65.6%",
    impressions: "$90,986",
    status: "Active",
    icon: 'trending-up'

  },
  {
    id: 4,
    platform_name: "twitter",
    platform_logo: "x-twitter",
    campaign: "Travis Wright",
    geo: "ES",
    profitability: "35.6%",
    impressions: "$23,654",
    status: "Inactive",
    icon: 'trending-down'

  },
  {
    id: 5,
    platform_name: "you-tube",
    platform_logo: "youtube",
    campaign: "Mark Green",
    geo: "UK",
    profitability: "45.6%",
    impressions: "$12,796",
    status: "Inactive",
    icon: 'trending-up'

  },
  {
    id: 6,
    platform_name: "linked-in",
    platform_logo: "linkedin-in",
    campaign: "Eleanor Pena",
    geo: "UK",
    profitability: "48.6%",
    impressions: "$12,796",
    status: "Inactive",
    icon: 'trending-up'

  },
  {
    id: 7,
    platform_name: "facebook",
    platform_logo: "facebook-f",
    campaign: "Caryl Kauth",
    geo: "DE",
    profitability: "25.4%",
    impressions: "$22,458",
    status: "Active",
    icon: 'trending-up'
  },
  {
    id: 8,
    platform_name: "instagram",
    platform_logo: "instagram",
    campaign: "Chloe Wilson",
    geo: "ES",
    profitability: "26.8%",
    impressions: "$29,4567",
    status: "Active",
    icon: 'trending-down'
  },
  {
    id: 9,
    platform_name: "pinterest",
    platform_logo: "pinterest",
    campaign: "Olivia Gor",
    geo: "UK",
    profitability: "09.8%",
    impressions: "$18,1814",
    status: "Active",
    icon: 'trending-down'
  },
  {
    id: 10,
    platform_name: "twitter",
    platform_logo: "x-twitter",
    campaign: "Robert Fox",
    geo: "ES",
    profitability: "22.6%",
    impressions: "$24,333",
    status: "Active",
    icon: 'trending-up'
  }
]

export const socialAnalyticsChart: SocialAnalyticsChart[] = [
  {
    id: 1,
    title: 'Photo Clicks',
    value: 76,
    analytics_value: '2.7',
    analytics_type: 'decrement',
    chart_details: {
      series: [
        {
          name: "Clicks",
          data: [20, 22, 20, 23, 23, 18, 18, 15, 15, 20, 20, 22, 22, 20, 20, 22, 22],
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
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
      colors: [primaryColor],
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
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 140,
            },
          },
        },
      ],
    }
  },
  {
    id: 2,
    title: 'Link Clicks',
    value: 86,
    analytics_value: '9.4',
    analytics_type: 'increment',
    chart_details: {
      series: [
        {
          name: "Clicks",
          data: [20, 22, 20, 23, 21, 22, 18, 18, 21, 21, 25, 25, 20, 20, 25, 25, 18, 18],
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
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
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 140,
            },
          },
        },
      ],
    }
  },
  {
    id: 3,
    title: 'Followers',
    value: 95,
    analytics_value: '6.8',
    analytics_type: 'increment',
    chart_details: {
      series: [
        {
          name: "Followers",
          data: [20, 22, 20, 23, 23, 19, 19, 16, 16, 21, 21, 20, 20, 25, 25, 22, 22],
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
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
      colors: ["#65c15c"],
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
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 140,
            },
          },
        },
      ],
    }
  },
  {
    id: 4,
    title: 'Link Engagements',
    value: 82,
    analytics_value: '3.2',
    analytics_type: 'decrement',
    chart_details: {
      series: [
        {
          name: "Engagement",
          data: [20, 22, 20, 23, 23, 18, 18, 15, 15, 20, 20, 22, 22, 20, 20, 22, 22],
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        type: "category",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
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
      colors: ["#ffb829"],
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
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 140,
            },
          },
        },
      ],
    }
  }
]

export const socialAnalyticsTab: SocialAnalyticsTabs[] = [
  {
    id: 1,
    title: 'Youtube',
    value: 'youtube',
    icon: 'youtube',
    bg_color: 'danger',
    icon_color: 'youtube-color'
  },
  {
    id: 2,
    title: 'Facebook',
    value: 'facebook',
    icon: 'facebook-f',
    bg_color: 'primary',
    icon_color: 'bg-primary',
    class: 'text-white'
  },
  {
    id: 3,
    title: 'Instagram',
    value: 'instagram',
    icon: 'instagram',
    bg_color: 'warning',
    icon_color: 'instagram-color',
    class: 'text-white'
  },
  {
    id: 4,
    title: 'Linkedin',
    value: 'linkedin',
    icon: 'linkedin-in',
    bg_color: 'info',
    icon_color: 'bg-info',
    class: 'text-white'
  },
  {
    id: 5,
    title: 'X (Twitter)',
    value: 'twitter',
    icon: 'x-twitter',
    bg_color: 'secondary',
    icon_color: 'bg-dark',
    class: 'text-white'
  }
]

export const socialAnalytics: SocialAnalytics = {
  marker: [
    {
      title: 'Followers',
      color: 'primary'
    },
    {
      title: 'Comments',
      color: 'secondary'
    },
    {
      title: 'Likes',
      color: 'success'
    }
  ],
  charts: [
    {
      value: 'youtube',
      chart_details: {
        series: [
          {
            name: "Followers",
            data: [58, 29, 39, 19, 75, 58, 32, 67, 50, 22, 44, 49],
          },
          {
            name: "Comments",
            data: [45, 69, 32, 70, 45, 32, 50, 40, 45, 60, 40, 45],
          },
          {
            name: "Likes",
            data: [18, 39, 60, 30, 18, 40, 35, 50, 18, 30, 25, 60],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
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
        colors: ["var(--theme-default)", "#AAAFCB", "#65c15c"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          tickPlacement: "between",
          labels: {
            style: {
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
        yaxis: {
          min: 10,
          max: 80,
          labels: {
            formatter: function (val: string) {
              return val + "k";
            },
            style: {
              colors: "#52526C",
              fontSize: "12px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          position: "back",
          borderColor: "var(--chart-border)",
        },
        responsive: [
          {
            breakpoint: 446,
            options: {
              xaxis: {
                type: "category",
                tickAmount: 5,
                tickPlacement: "between",
              },
            },
          },
          {
            breakpoint: 808,
            options: {
              chart: {
                height: 360,
              },
            },
          },
        ]
      }
    },
    {
      value: 'facebook',
      chart_details: {
        series: [
          {
            name: "Followers",
            data: [10, 25, 25, 30, 12, 26, 10, 16, 40, 35, 20, 21],
          },
          {
            name: "Comments",
            data: [20, 15, 35, 17, 47, 36, 25, 13, 14, 45, 48, 36],
          },
          {
            name: "Likes",
            data: [25, 33, 15, 12, 16, 34, 45, 20, 24, 33, 44, 21],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
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
        colors: ["var(--theme-default)", "#AAAFCB", "#65c15c"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          min: 10,
          max: 80,
          labels: {
            formatter: function (val: string) {
              return val + "k";
            },
            style: {
              colors: "#52526C",
              fontSize: "12px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          borderColor: "var(--chart-border)",
        },
        responsive: [
          {
            breakpoint: 446,
            options: {
              xaxis: {
                type: "category",
                tickAmount: 5,
                tickPlacement: "between",
              },
            },
          },
        ],
      }
    },
    {
      value: 'instagram',
      chart_details: {
        series: [
          {
            name: "Followers",
            data: [58, 29, 39, 19, 75, 58, 32, 67, 50, 22, 44, 49],
          },
          {
            name: "Comments",
            data: [45, 69, 32, 70, 45, 32, 50, 40, 45, 60, 40, 45],
          },
          {
            name: "Likes",
            data: [18, 39, 60, 30, 18, 40, 35, 50, 18, 30, 25, 60],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
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
        colors: ["var(--theme-default)", "#AAAFCB", "#65c15c"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          min: 10,
          max: 80,
          labels: {
            formatter: function (val: string) {
              return val + "k";
            },
            style: {
              colors: "#52526C",
              fontSize: "12px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "var(--chart-border)",
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 446,
            options: {
              xaxis: {
                type: "category",
                tickAmount: 5,
                tickPlacement: "between",
              },
            },
          },
        ]
      }
    },
    {
      value: 'linkedin',
      chart_details: {
        series: [
          {
            name: "Followers",
            data: [56, 40, 35, 12, 16, 34, 50, 12, 18, 21, 18, 28],
          },
          {
            name: "Comments",
            data: [20, 10, 14, 26, 35, 44, 35, 17, 15, 29, 35, 48],
          },
          {
            name: "Likes",
            data: [16, 35, 50, 35, 68, 49, 25, 14, 12, 30, 47, 18],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
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
        colors: ["var(--theme-default)", "#AAAFCB", "#65c15c"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          min: 10,
          max: 80,
          labels: {
            formatter: function (val: string) {
              return val + "k";
            },
            style: {
              colors: "#52526C",
              fontSize: "12px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          borderColor: "var(--chart-border)",
        },
        responsive: [
          {
            breakpoint: 446,
            options: {
              xaxis: {
                type: "category",
                tickAmount: 5,
                tickPlacement: "between",
              },
            },
          },
        ]
      }
    },
    {
      value: 'twitter',
      chart_details: {
        series: [
          {
            name: "Followers",
            data: [56, 46, 35, 12, 16, 34, 62, 34, 65, 35, 18, 28],
          },
          {
            name: "Comments",
            data: [20, 10, 14, 26, 35, 44, 35, 17, 65, 29, 35, 48],
          },
          {
            name: "Likes",
            data: [16, 35, 78, 35, 68, 49, 25, 14, 12, 30, 47, 18],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
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
        colors: ["var(--theme-default)", "#AAAFCB", "#65c15c"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          min: 10,
          max: 80,
          labels: {
            formatter: function (val: string) {
              return val + "k";
            },
            style: {
              colors: "#52526C",
              fontSize: "12px",
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          borderColor: "var(--chart-border)",
        },
        responsive: [
          {
            breakpoint: 446,
            options: {
              xaxis: {
                type: "category",
                tickAmount: 5,
                tickPlacement: "between",
              },
            },
          },
        ]
      }
    }
  ]
}

export const topPerformers: TopPerformers[] = [
  {
    country_name: 'Germany',
    country_flag: 'assets/images/dashboard-5/flags/1.png',
    total_followers: 865
  },
  {
    country_name: 'USA',
    country_flag: 'assets/images/dashboard-5/flags/2.png',
    total_followers: 542
  },
  {
    country_name: 'India',
    country_flag: 'assets/images/dashboard-5/flags/3.png',
    total_followers: 951
  },
  {
    country_name: 'Australia',
    country_flag: 'assets/images/dashboard-5/flags/4.png',
    total_followers: 751
  }
]

export const maxFollowers: number = Math.max(...topPerformers.map(p => p.total_followers));
