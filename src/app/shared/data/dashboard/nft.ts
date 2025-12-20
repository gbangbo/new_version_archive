import { ActivityPanel, Artwork, ArtworkDetails, Collection, Creator, LiveAuction, TopNFT, TrendingBids, TrendingCreator } from "../../interface/dashboard/nft";

export const trendingCreator: TrendingCreator[] = [
  {
    id: 1,
    title: 'Project',
    image: 'assets/images/dashboard-6/1.png',
    items: '12.090',
    price: 200
  },
  {
    id: 2,
    title: 'The Aston',
    image: 'assets/images/dashboard-6/2.png',
    items: '12.098',
    price: 340
  },
  {
    id: 3,
    title: 'Narkey X',
    image: 'assets/images/dashboard-6/3.png',
    items: '19.998',
    price: 879
  }
]

export const incomeChart: any = {
  series: [
    {
      name: "Income",
      data: [15, 14.5, 15, 14.5, 14.2, 14.5, 14.2, 15, 14.8, 14.5, 14.6, 14.4, 14.5, 14.4, 14.6, 14.3, 14.4, 14.3, 14.35, 14.2, 14.4, 14.3, 14.2, 14.3, 14, 15, 14.8, 14.9, 14.5, 14.6, 14.5, 14.7, 15, 14.5, 12.2],
    },
  ],
  chart: {
    height: 250,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    type: "category",
    categories: ["10", "11", "12", "13", "14", "15"],
    tickAmount: 15,
    tickPlacement: "on",
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
  yaxis: {
    labels: {
      formatter: function (val: string) {
        return val + "k";
      },
    },
    tooltip: {
      show: false,
    },
  },
  grid: {
    borderColor: "var(--chart-dashed-border)",
    strokeDashArray: 5,
    padding: {
      right: -15,
    },
  },
  colors: ["#7366ff"],
  fill: {
    gradient: {
      type: "vertical",
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [],
    },
  }
}

export const artworks: Artwork[] = [
  {
    id: 1,
    course_name: '3d Artwork',
    course_profile: 'assets/images/dashboard-6/sales/1.png',
    course_site: 'Designing.co',
    sale: 12,
    earnings: 120.9
  },
  {
    id: 2,
    course_name: '3d Writing',
    course_profile: 'assets/images/dashboard-6/sales/2.png',
    course_site: 'Designing.co',
    sale: 20,
    earnings: 180.5
  },
  {
    id: 3,
    course_name: '3d Poster',
    course_profile: 'assets/images/dashboard-6/sales/3.png',
    course_site: 'Designing.co',
    sale: 27,
    earnings: 190.2
  }
]

export const trendingBids: TrendingBids[] = [
  {
    id: 1,
    bead_name: 'Byte Beauty',
    bead_owner: 'Beauty',
    owner_profile: 'assets/images/dashboard-6/author/1.png',
    banner: 'assets/images/dashboard-6/action/1.png',
    auction_date: 'Feb 7, 2026 10:43:01',
    current_bid: '0.15 ETH',
  },
  {
    id: 2,
    bead_name: 'Neon Nexus',
    bead_owner: 'Nexus',
    owner_profile: 'assets/images/dashboard-6/author/2.png',
    banner: 'assets/images/dashboard-6/action/2.png',
    auction_date: 'Mar 12, 2026 12:43:01',
    current_bid: '0.15 ETH',
  },
  {
    id: 3,
    bead_name: 'Pixel Prism',
    bead_owner: 'Prism',
    owner_profile: 'assets/images/dashboard-6/author/3.png',
    banner: 'assets/images/dashboard-6/action/3.png',
    auction_date: 'Jan 7, 2026 04:15:01',
    current_bid: '0.15 ETH',
  },
  {
    id: 4,
    bead_name: 'NFT Nirvana',
    bead_owner: 'Nirvana',
    owner_profile: 'assets/images/dashboard-6/author/1.png',
    banner: 'assets/images/dashboard-6/action/1.png',
    auction_date: 'May 30, 2026 10:43:01',
    current_bid: '0.15 ETH',
  }
]

function widgetCommonOption(data: { color: string[], dropShadowColor: string, label: string[], widgetYSeries: number[] }) {
  return {
    series: [
      {
        data: data.widgetYSeries,
      },
    ],
    chart: {
      width: 180,
      height: 90,
      type: "line",
      toolbar: {
        show: false,
      },
      offsetY: 10,
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 3,
        left: 0,
        blur: 3,
        color: data.dropShadowColor,
        opacity: 0.4,
      },
    },
    grid: {
      show: false,
    },
    colors: data.color,
    stroke: {
      width: 2,
      curve: "smooth",
    },
    labels: data.label,
    markers: {
      size: 0,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
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
    legend: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
      y: {
        show: false,
        labels: {
          show: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: 1660,
        options: {
          chart: {
            width: 120,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 300,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
  };
}

export const analyticsCharts: any = [
  {
    id: 1,
    title: 'Growth',
    color: 'primary',
    value: 2.78,
    profit: 5.7,
    profit_type: 'profit',
    price: '4,987',
    chart_details: widgetCommonOption({
      color: ["var(--theme-default)"],
      dropShadowColor: "var(--theme-default)",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct"],
      widgetYSeries: [30, 25, 64, 30, 45, 35, 64, 15, 30, 20],
    })
  },
  {
    id: 2,
    title: 'Sales',
    color: 'warning',
    value: 3.90,
    profit: 2.7,
    profit_type: 'profit',
    price: '3,897',
    chart_details: widgetCommonOption({
      color: ["#FFAA05"],
      dropShadowColor: "#FFAA05",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov"],
      widgetYSeries: [64, 10, 50, 20, 45, 35, 50, 5, 30, 20, 30],
    })
  },
  {
    id: 3,
    title: 'Revenue',
    color: 'success',
    value: 2.78,
    profit: 2.7,
    profit_type: 'profit',
    price: '4,987',
    chart_details: widgetCommonOption({
      color: ["#54BA4A"],
      dropShadowColor: "#54BA4A",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
      widgetYSeries: [15, 10, 40, 20, 64, 10, 30, 0, 40, 10, 50, 20]
    })
  }
]

export const exploreArtwork = [
  {
    id: 1,
    title: 'Art',
    banner: 'assets/images/dashboard-6/category/1.png'
  },
  {
    id: 2,
    title: 'Music',
    banner: 'assets/images/dashboard-6/category/2.png'
  },
  {
    id: 3,
    title: 'Games',
    banner: 'assets/images/dashboard-6/category/3.png'
  },
  {
    id: 4,
    title: 'Music',
    banner: 'assets/images/dashboard-6/category/4.png'
  },
  {
    id: 5,
    title: 'Metavereses',
    banner: 'assets/images/dashboard-6/category/5.png'
  },
  {
    id: 6,
    title: 'Games',
    banner: 'assets/images/dashboard-6/category/3.png'
  }
]

export const topNFT: TopNFT[] = [
  {
    id: 1,
    collection_name: 'Cody Fisher',
    profile: 'assets/images/dashboard-6/author/10.png"',
    volume: '20,254.45',
    profit: 0.56,
    profit_type: 'loss',
    items: '99.41K'
  },
  {
    id: 2,
    collection_name: 'Jacob Jones',
    profile: 'assets/images/dashboard-6/author/8.png"',
    volume: '15,658.02',
    profit: 5.69,
    profit_type: 'loss',
    items: '28.45K'
  },
  {
    id: 3,
    collection_name: 'Jenny Wilson',
    profile: 'assets/images/dashboard-6/author/6.png"',
    volume: '8,547.05',
    profit: 2.65,
    profit_type: 'loss',
    items: '14.12K'
  },
  {
    id: 4,
    collection_name: 'Lily Ramirez',
    profile: 'assets/images/dashboard-6/author/9.png"',
    volume: '26,458.05',
    profit: 9.89,
    profit_type: 'profit',
    items: '99.41K'
  },
  {
    id: 5,
    collection_name: 'The X Takashih',
    profile: 'assets/images/dashboard-6/author/4.png"',
    volume: '13,098.09',
    profit: 5.90,
    profit_type: 'profit',
    items: '17.09K'
  },
  {
    id: 6,
    collection_name: 'Williamson',
    profile: 'assets/images/dashboard-6/author/5.png"',
    volume: '10,050.00',
    profit: 4.5,
    profit_type: 'profit',
    items: '16.15K'
  }
]

export const statistics: any = {
  total_art_sold: 135,
  total_earning: 908,
  chart_details: {
    series: [
      {
        name: "Earning",
        data: [80, 40, 100, 40, 70, 45, 120, 60, 0],
      },
    ],
    chart: {
      height: 242,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep"],
      tickAmount: 15,
      tickPlacement: "on",
      labels: {
        show: true,
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
    yaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        right: -40,
      },
    },
    colors: ["#7366ff"],
    fill: {
      gradient: {
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [],
      },
    },
    responsive: [
      {
        breakpoint: 1571,
        options: {
          xaxis: {
            tickAmount: 4,
          },
        },
      },
      {
        breakpoint: 1404,
        options: {
          chart: {
            height: 220,
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 170,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            tickAmount: 5,
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            tickAmount: 4,
          },
        },
      },
    ]
  }
}

export const activityPanel: ActivityPanel[] = [
  {
    id: 1,
    title: 'Top Artist',
    name: 'Williamson',
    value: 'curtis@co.in',
    profile: 'assets/images/dashboard-6/author/8.png',
    follow_button: true,
  },
  {
    id: 2,
    title: 'Top Seller',
    name: 'Sophia Nit',
    value: 'wilson@co.in',
    profile: 'assets/images/dashboard-6/author/9.png',
    image: 'assets/images/dashboard-6/author/medal.svg',
  },
  {
    id: 3,
    title: 'Recent Activity',
    name: 'Jenny Wilson',
    value: '<span class="f-light">Buy<span class="font-primary d-inline-block ms-1">0.98 ETH</span></span>',
    profile: 'assets/images/dashboard-6/author/10.png',
    time: '12m ago',
  }
]

export const liveAuction: LiveAuction[] = [
  {
    id: 1,
    name: 'Digital Landscape',
    owner_profile: 'assets/images/dashboard-6/author/11.png',
    banner: 'assets/images/dashboard-6/action/1.png',
    high_bid: 8.01,
    total_currency: 12,
    auction_date: 'Sep 11, 2025 02:12:02'
  },
  {
    id: 2,
    name: 'Cityscape',
    owner_profile: 'assets/images/dashboard-6/author/12.png',
    banner: 'assets/images/dashboard-6/action/4.png',
    high_bid: 6.12,
    total_currency: 34,
    auction_date: 'Nov 02, 2025 02:10:04'
  },
  {
    id: 3,
    name: 'Digital Sunset',
    owner_profile: 'assets/images/dashboard-6/author/13.png',
    banner: 'assets/images/dashboard-6/action/5.png',
    high_bid: 1.04,
    total_currency: 10,
    auction_date: 'Jun 23, 2025 04:17:01'
  },
  {
    id: 4,
    name: 'Abstract Waves',
    owner_profile: 'assets/images/dashboard-6/author/14.png',
    banner: 'assets/images/dashboard-6/action/6.png',
    high_bid: 7.12,
    total_currency: 12,
    auction_date: 'Dec 16, 2025 06:25:01'
  },
  {
    id: 5,
    name: 'Nature\'s Reflection',
    owner_profile: 'assets/images/dashboard-6/author/15.png',
    banner: 'assets/images/dashboard-6/action/7.png',
    high_bid: 9.45,
    total_currency: 16,
    auction_date: 'Dec 22, 2026 08:12:02'
  },
  {
    id: 6,
    name: 'Digital Landscape',
    owner_profile: 'assets/images/dashboard-6/author/11.png',
    banner: 'assets/images/dashboard-6/action/1.png',
    high_bid: 4.8,
    total_currency: 14,
    auction_date: 'Dec 21, 2025 04:15:01'
  }
]

export const creators: Creator[] = [
  {
    id: 1,
    creator_name: "Nexus Pulse",
    creator_profile: "assets/images/dashboard-6/creator/1.png",
    category: "Digital Art",
    creations: 60,
    followers: '10K',
  },
  {
    id: 2,
    creator_name: "Harry Picker",
    creator_profile: "assets/images/dashboard-6/creator/2.png",
    category: "Crypto Collectibles",
    creations: 45,
    followers: '25K',
  },
  {
    id: 3,
    creator_name: "Jacob Jones",
    creator_profile: "assets/images/dashboard-6/creator/4.png",
    category: "Nature-inspired",
    creations: 80,
    followers: '10K',
  },
  {
    id: 4,
    creator_name: "Jenny Wilson",
    creator_profile: "assets/images/dashboard-6/creator/5.png",
    category: "Digital Art",
    creations: 82,
    followers: '21M',
  },
  {
    id: 5,
    creator_name: "Alexis Taylor",
    creator_profile: "assets/images/dashboard-6/author/10.png",
    category: "Surrealism",
    creations: 96,
    followers: '10M',
  },
  {
    id: 6,
    creator_name: "Caleb Riv",
    creator_profile: "assets/images/dashboard-6/author/16.png",
    category: "Nature-inspired",
    creations: 33,
    followers: '22M',
  },
  {
    id: 7,
    creator_name: "Olivia Gor",
    creator_profile: "assets/images/dashboard-6/author/17.png",
    category: "Crypto Collectibles",
    creations: 25,
    followers: '28K',
  },
  {
    id: 8,
    creator_name: "Eriko Fonsa",
    creator_profile: "assets/images/dashboard-6/author/18.png",
    category: "Digital Art",
    creations: 33,
    followers: '46K',
  }
]

export const collections: Collection[] = [
  {
    id: 1,
    title: "Light Dark Fish",
    banner: "assets/images/dashboard-6/collection/2.png",
    created_by: "@LibertyLoot...",
    profile: "assets/images/dashboard-6/collection/user.png",
    items: 5,
    likes: "2.1k",
  },
  {
    id: 2,
    title: "Light Steel Ball",
    banner: "assets/images/dashboard-6/collection/3.png",
    created_by: "@YankeeYield...",
    profile: "assets/images/dashboard-6/collection/user1.png",
    items: 3,
    likes: "4.1k",
  },
  {
    id: 3,
    title: "Light Fingers",
    banner: "assets/images/dashboard-6/collection/4.png",
    created_by: "@YankeeYen...",
    profile: "assets/images/dashboard-6/collection/user2.png",
    items: 6,
    likes: "4.1k",
  },
  {
    id: 4,
    title: "Light Background",
    banner: "assets/images/dashboard-6/collection/1.png",
    created_by: "@SamSell...",
    profile: "assets/images/dashboard-6/collection/user3.png",
    items: 3,
    likes: "7.1k",
  }
]

export const artworksDetails: ArtworkDetails[] = [
  {
    id: 1,
    artwork_name: "Digital Sunset",
    artwork_profile: "assets/images/dashboard-6/artwork/1.png",
    owner_name: "Jane Cooper",
    total_sales: 15520,
    total_usd: "$512,006+"
  },
  {
    id: 2,
    artwork_name: "CryptoPortrait",
    artwork_profile: "assets/images/dashboard-6/artwork/2.png",
    owner_name: "Guy Hawkins",
    total_sales: 95248,
    total_usd: "$842,015+"
  },
  {
    id: 3,
    artwork_name: "Abstract",
    artwork_profile: "assets/images/dashboard-6/artwork/3.png",
    owner_name: "Kristin Watson",
    total_sales: 30851,
    total_usd: "$950,350+"
  },
  {
    id: 4,
    artwork_name: "Surreal Dreams",
    artwork_profile: "assets/images/dashboard-6/artwork/4.png",
    owner_name: "Ralph Edwards",
    total_sales: 30753,
    total_usd: "$945,025+"
  },
  {
    id: 5,
    artwork_name: "Nature's Reflection",
    artwork_profile: "assets/images/dashboard-6/artwork/5.png",
    owner_name: "Annette Black",
    total_sales: 25302,
    total_usd: "$349,791+"
  },
  {
    id: 6,
    artwork_name: "NFT Masterpieces",
    artwork_profile: "assets/images/dashboard-6/artwork/6.png",
    owner_name: "Wade Warren",
    total_sales: 68899,
    total_usd: "$587,106+"
  },
  {
    id: 7,
    artwork_name: "CryptoCanvas",
    artwork_profile: "assets/images/dashboard-6/artwork/7.png",
    owner_name: "Kristin Watson",
    total_sales: 21333,
    total_usd: "$325,102+"
  },
  {
    id: 8,
    artwork_name: "ArtisticTokens",
    artwork_profile: "assets/images/dashboard-6/artwork/8.png",
    owner_name: "Ralph Edwards",
    total_sales: 25321,
    total_usd: "$102,122+"
  }
]