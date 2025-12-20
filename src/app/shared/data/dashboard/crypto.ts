import { Tabs } from "../../interface/common";
import { Activities, AverageDayDetails, AverageSalePrice, CurrencyChart, MyCurrency, TopPerformers, Transactions } from "../../interface/dashboard/crypto";
import { primaryColor } from "../common";

function radialCommonOption(data: { color: string[], dropShadowColor: string, radialYSeries: number[] }) {
  return {
    series: data.radialYSeries,
    chart: {
      height: 150,
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
          size: "60%",
        },
        track: {
          strokeWidth: "45%",
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          showOn: "always",
          value: {
            color: "var(--chart-text-color)",
            fontSize: "18px",
            show: true,
            offsetY: -8,
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

export const averageDayDetails: AverageDayDetails[] = [
  {
    id: 1,
    title: 'Average Sales Per Day',
    description: 'Customers benefits offerings',
    value: '45,908',
    margin: '5.7%',
    margin_type: 'profit',
    color: 'primary',
    chart_details: radialCommonOption({
      color: ["var(--theme-default)"],
      dropShadowColor: "var(--theme-default)",
      radialYSeries: [70],
    })
  },
  {
    id: 2,
    title: 'Average Profit Per Day',
    description: 'An investment or business',
    value: '89.6%',
    margin: '2.7%',
    margin_type: 'profit',
    color: 'secondary',
    chart_details: radialCommonOption({
      color: ["var(--theme-secondary)"],
      dropShadowColor: "var(--theme-secondary)",
      radialYSeries: [80],
    })
  },
  {
    id: 3,
    title: 'Average Visits Per Day',
    description: 'Measure in a variety of situations',
    value: '80k',
    margin: '1.5%',
    margin_type: 'profit',
    color: 'success',
    chart_details: radialCommonOption({
      color: ["#54BA4A"],
      dropShadowColor: "#54BA4A",
      radialYSeries: [48],
    })
  }
]

export const transactionTab: Tabs[] = [
  {
    id: 1,
    title: 'All',
    value: 'all'
  },
  {
    id: 2,
    title: 'Buy',
    value: 'buy'
  },
  {
    id: 3,
    title: 'Sell',
    value: 'sell'
  }
];

export const transactions: Transactions[] = [
  {
    id: 1,
    currency: 'Buy BTC',
    date: '14 Mar',
    profit_type: 'profit',
    value: '0.018',
    price: '236.89',
    type: 'buy',
  },
  {
    id: 2,
    currency: 'Sell ETH',
    date: '25 Mar',
    profit_type: 'loss',
    value: '0.089',
    price: '116.89',
    type: 'sell',
  },
  {
    id: 3,
    currency: 'Buy LTC',
    date: '28 Mar',
    profit_type: 'profit',
    value: '0.018',
    price: '236.89',
    type: 'buy',
  },
  {
    id: 4,
    currency: 'Buy LTC',
    date: '05 Apr',
    profit_type: 'profit',
    value: '0.089',
    price: '29.89',
    type: 'buy',
  },
  {
    id: 5,
    currency: 'Sell BTC',
    date: '16 Apr',
    profit_type: 'loss',
    value: '0.012',
    price: '236.89',
    type: 'sell',
  },
  {
    id: 6,
    currency: 'Sell ETH',
    date: '25 Mar',
    profit_type: 'loss',
    value: '0.089',
    price: '116.89',
    type: 'sell',
  },
  {
    id: 7,
    currency: 'Buy LTC',
    date: '28 Mar',
    profit_type: 'profit',
    value: '0.018',
    price: '236.89',
    type: 'buy',
  }
]

function commonCurrencyChart(data: { color: string[], dropShadowColor: string, label: string[], widgetYSeries: number[] }) {
  return {
    series: [
      {
        data: data.widgetYSeries,
      },
    ],
    chart: {
      width: 110,
      height: 110,
      type: "line",
      toolbar: {
        show: false,
      },
      offsetY: 10,
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 6,
        left: 0,
        blur: 6,
        color: data.dropShadowColor,
        opacity: 0.3,
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
      // type: 'datetime',
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
        breakpoint: 1790,
        options: {
          chart: {
            width: 100,
            height: 100,
          },
        },
      },
      {
        breakpoint: 1661,
        options: {
          chart: {
            width: "100%",
            height: 100,
          },
        },
      },
    ],
  };
}

export const currencyChart: CurrencyChart[] = [
  {
    id: 1,
    currency_name: 'Bitcoin',
    currency_code: 'BTC',
    currency_symbol: 'beta',
    price: 2143,
    profit: 50,
    profit_type: 'profit',
    color: 'warning',
    chart_details: commonCurrencyChart({
      color: ["#FFA941"],
      dropShadowColor: "#FFA941",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov"],
      widgetYSeries: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    })
  },
  {
    id: 2,
    currency_name: 'Ethereum',
    currency_code: 'ETC',
    currency_symbol: 'eth',
    price: 7450,
    profit: 35,
    profit_type: 'profit',
    color: 'primary',
    chart_details: commonCurrencyChart({
      color: ["var(--theme-default)"],
      dropShadowColor: "var(--theme-default)",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep"],
      widgetYSeries: [30, 25, 30, 25, 64, 40, 59, 52, 64],
    })
  },
  {
    id: 3,
    currency_name: 'Leave Travel',
    currency_code: 'LTC',
    currency_symbol: 'ltc',
    price: 2198,
    profit: 73,
    profit_type: 'profit',
    color: 'success',
    chart_details: commonCurrencyChart({
      color: ["#54BA4A"],
      dropShadowColor: "#54BA4A",
      label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct"],
      widgetYSeries: [30, 25, 36, 30, 64, 50, 45, 62, 60, 64],
    })
  }
]

export const marketGraph: any = {
  title: 'Market Graph',
  series: [
    {
      name: "TEAM A",
      type: "column",
      data: [4, 8, 4.5, 8, 13, 8.5, 12, 5, 7, 12],
    },
    {
      name: "TEAM C",
      type: "line",
      data: [2, 3, 2, 6, 8, 12, 9, 7, 9, 7],
    },
  ],
  chart: {
    height: 300,
    type: "line",
    stacked: false,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: [1],
      top: 0,
      left: 0,
      blur: 15,
      color: "var(--theme-default)",
      opacity: 0.3,
    },
  },
  stroke: {
    width: [0, 3],
    curve: "smooth",
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  colors: ["rgba(170, 175, 203, 0.2)", "var(--theme-default)"],
  grid: {
    borderColor: "var(--chart-border)",
  },
  plotOptions: {
    bar: {
      columnWidth: "20%",
    },
  },

  fill: {
    type: ["solid", "gradient"],
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ["var(--theme-default)", "#d867ac"],
      opacityFrom: 0.8,
      opacityTo: 0.8,
      colorStops: [
        {
          offset: 0,
          color: "#d867ac",
          opacity: 1,
        },
        {
          offset: 30,
          color: "#d867ac",
          opacity: 1,
        },
        {
          offset: 50,
          color: "var(--theme-default)",
          opacity: 1,
        },
        {
          offset: 80,
          color: "var(--theme-default)",
          opacity: 1,
        },
        {
          offset: 100,
          color: "var(--theme-default)",
          opacity: 1,
        },
      ],
    },
  },
  labels: ["Sep 10", "Sep 15", "Sep 20", "Sep 25", "Sep 30", "Oct 05", "Oct 10", "Oct 15", "Oct 20", "Oct 25"],
  markers: {
    size: 0,
  },
  yaxis: {
    min: 0,
    max: 20,
    tickAmount: 5,
    labels: {
      formatter: function (val: string) {
        return val + "k";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "var(--chart-text-color)",
      },
    },
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    labels: {
      style: {
        fontSize: "10px",
        fontFamily: "Rubik, sans-serif",
        colors: "var(--chart-text-color)",
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  legend: {
    show: false,
  },
  chart_details: [
    {
      title: 'Coinmarketcap',
      value: '11.67',
      profit_type: 'profit'
    },
    {
      title: 'Binance',
      value: '10.67',
      profit_type: 'profit'
    },
    {
      title: 'Coinbase',
      value: '11.67',
      profit_type: 'loss'
    },
    {
      title: 'Yobit',
      value: '13.67',
      profit_type: 'profit'
    }
  ]
}

export const myCurrency: MyCurrency[] = [
  {
    id: 1,
    currency_name: 'Bitcoin',
    currency_symbol: 'beta',
    price: '13,098.09',
    day_change: '5.90',
    total_balance: '74,871.470',
    total_coin: '1.09634721',
    profit_type: 'profit',
    color: 'warning'
  },
  {
    id: 2,
    currency_name: 'Litecoin',
    currency_symbol: 'ltc',
    price: '11,098.04',
    day_change: '2.90',
    total_balance: '87,897.098',
    total_coin: '1.09675432',
    profit_type: 'loss',
    color: 'success'
  },
  {
    id: 3,
    currency_name: 'Eathereum',
    currency_symbol: 'eth',
    price: '45,198.09',
    day_change: '0.12',
    total_balance: '45,178.010',
    total_coin: '1.41557127',
    profit_type: 'profit',
    color: 'primary'
  },
  {
    id: 4,
    currency_name: 'Binance',
    currency_symbol: 'bin',
    price: '35,098.34',
    day_change: '3.56',
    total_balance: '64,100.066',
    total_coin: '1.78142254',
    profit_type: 'profit',
    color: 'secondary'
  },
  {
    id: 5,
    currency_name: 'Tether',
    currency_symbol: 'te',
    price: '56,898.91',
    day_change: '1.23',
    total_balance: '61,574.218',
    total_coin: '1.574215',
    profit_type: 'profit',
    color: 'dark-green'
  },
  {
    id: 6,
    currency_name: 'Chainlink',
    currency_symbol: 'chainlink',
    price: '62,098.09',
    day_change: '1.85',
    total_balance: '87,897.098',
    total_coin: '1.09675432',
    profit_type: 'profit',
    color: 'dark-green'
  },
  {
    id: 7,
    currency_name: 'Solana',
    currency_symbol: 'solana',
    price: '17,045.03',
    day_change: '6.54',
    total_balance: '25,457.354',
    total_coin: '1.09634721',
    profit_type: 'profit',
    color: 'primary'
  },
  {
    id: 8,
    currency_name: 'Cardano',
    currency_symbol: 'cardano',
    price: '25,045.04',
    day_change: '2.90',
    total_balance: '92,897.098',
    total_coin: '1.06895425',
    profit_type: 'loss',
    color: 'primary'
  }
]

export const currencyOptions = [
  {
    id: 1,
    name: 'USD',
    value: 'usd'
  },
  {
    id: 2,
    name: 'BTC',
    value: 'btc'
  },
  {
    id: 3,
    name: 'LTC',
    value: 'ltc'
  },
  {
    id: 4,
    name: 'ETH',
    value: 'eth'
  }
]

export const balanceDetails = {
  total_balance: 76898790,
  details: [
    {
      id: 1,
      title: 'Investment',
      value: '78.8K',
      profit: '11.67',
      profit_type: 'loss'
    },
    {
      id: 2,
      title: 'Returns',
      value: '19.7K',
      profit: '10.67',
      profit_type: 'profit'
    }
  ]
}

export const myPortfolio: any = {
  title: 'My Portfolio',
  dropdownOption: [
    { id: 1, title: 'ETH' },
    { id: 2, title: 'USD' },
    { id: 3, title: 'LTC' }
  ],
  series: [44, 55, 67],
  chart: {
    height: 280,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        show: false,
      },
      track: {
        background: "var(--chart-progress-light)",
        opacity: 0.3,
      },
      hollow: {
        margin: 10,
        size: "40%",
        image: "assets/images/dashboard-4/portfolio-bg.png",
        imageWidth: 230,
        imageHeight: 230,
        imageClipped: false,
      },
    },
  },
  colors: ["#54BA4A", "#FFA539", primaryColor],
  labels: ["USD", "BTC", "ETH"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.25,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 80, 100],
    },
  },
  responsive: [
    {
      breakpoint: 1500,
      options: {
        chart: {
          height: 260,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: "40%",
              image: "assets/images/dashboard-4/portfolio-bg.png",
              imageWidth: 190,
              imageHeight: 190,
              imageClipped: false,
            },
          },
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 320,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              imageWidth: 260,
              imageHeight: 260,
            },
          },
        },
      },
    },
    {
      breakpoint: 650,
      options: {
        chart: {
          height: 280,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              imageWidth: 220,
              imageHeight: 220,
            },
          },
        },
      },
    },
  ],
  chart_details: [
    {
      id: 1,
      currency_name: 'Bitcoin',
      currency_symbol: 'beta',
      currency_code: 'BTC',
      value: 'BTC 0.543',
      total_price: '14,987.13',
      profit_type: 'profit',
      icon_color: 'warning'
    },
    {
      id: 2,
      currency_name: 'Ethereum',
      currency_symbol: 'ltc',
      currency_code: 'ETH',
      value: 'ETC 1.673',
      total_price: '49,987.13',
      profit_type: 'loss',
      icon_color: 'success'
    },
    {
      id: 3,
      currency_name: 'Litecoin',
      currency_symbol: 'eth',
      currency_code: 'LTC',
      value: 'LTC 1.643',
      total_price: '35,571.25',
      profit_type: 'profit',
      icon_color: 'primary'
    },
    {
      id: 4,
      currency_name: 'Dash',
      currency_symbol: 'dash',
      currency_code: 'DSH',
      value: 'DSH 1.810',
      total_price: '17,047.30',
      profit_type: 'profit',
      icon_color: 'light-blue'
    }
  ]
}

export const activities: Activities[] = [
  {
    id: 1,
    user_name: "Anna K.",
    user_profile: "assets/images/dashboard/user/3.jpg",
    transaction_to: "07...12bb",
    transaction_amount: "+0.3BNB",
    transaction_date: "02.01.24",
    profit_type: 'profit'
  },
  {
    id: 2,
    user_name: "Guy H.",
    user_profile: "assets/images/dashboard/user/12.jpg",
    transaction_to: "09...12ac",
    transaction_amount: "+0.3BNB",
    transaction_date: "12.02.24",
    profit_type: 'profit'
  },
  {
    id: 3,
    user_name: "Jenny W.",
    user_profile: "assets/images/dashboard/user/10.jpg",
    transaction_to: "01...12ab",
    transaction_amount: "-0.1BNB",
    transaction_date: "22.02.24",
    profit_type: 'loss'
  },
  {
    id: 4,
    user_name: "Jacob B.",
    user_profile: "assets/images/dashboard/user/11.jpg",
    transaction_to: "01...12nf",
    transaction_amount: "+0.3BNB",
    transaction_date: "29.02.24",
    profit_type: 'profit'
  },
  {
    id: 5,
    user_name: "Esther H.",
    user_profile: "assets/images/dashboard/user/13.jpg",
    transaction_to: "07...12bd",
    transaction_amount: "-0.2BNB",
    transaction_date: "02.03.24",
    profit_type: 'loss'
  },
  {
    id: 6,
    user_name: "Leslie A.",
    user_profile: "assets/images/dashboard/user/5.jpg",
    transaction_to: "03...12se",
    transaction_amount: "+0.3BNB",
    transaction_date: "23.04.24",
    profit_type: 'profit'
  }
];

export const averageSalePrice: AverageSalePrice[] = [
  {
    id: 1,
    currency_name: "Bitcoin",
    currency_symbol: "beta",
    usd: "$50,000",
    eth: "2.0",
    btc: "50.0",
    price_change: "+2%",
    bg_color: "bg-warning"
  },
  {
    id: 2,
    currency_name: "Litecoin",
    currency_symbol: "ltc",
    usd: "$64,540",
    eth: "1.053415",
    btc: "0.526",
    price_change: "-1%",
    bg_color: "bg-success"
  },
  {
    id: 3,
    currency_name: "Ethereum",
    currency_symbol: "eth",
    usd: "$92,310",
    eth: "0.00154",
    btc: "0.00563",
    price_change: "+0.5%",
    bg_color: "bg-primary"
  },
  {
    id: 4,
    currency_name: "Binance",
    currency_symbol: "bin",
    usd: "$20,952",
    eth: "0.0006",
    btc: "0.951200",
    price_change: "+0.5%",
    bg_color: "bg-secondary"
  },
  {
    id: 5,
    currency_name: "Tether",
    currency_symbol: "te1",
    usd: "$45,000",
    eth: "0.546",
    btc: "50.0",
    price_change: "+5%",
    bg_color: "bg-warning"
  },
  {
    id: 6,
    currency_name: "Dash",
    currency_symbol: "dash",
    usd: "$85,547",
    eth: "1.254634",
    btc: "0.14578",
    price_change: "+8%",
    bg_color: "bg-success"
  },
  {
    id: 7,
    currency_name: "Cardano",
    currency_symbol: "cardano",
    usd: "$45,310",
    eth: "0.00578",
    btc: "0.00654",
    price_change: "+0.2%",
    bg_color: "bg-primary"
  },
  {
    id: 8,
    currency_name: "Solana",
    currency_symbol: "solana",
    usd: "$68,548",
    eth: "0.0005",
    btc: "0.658910",
    price_change: "+0.9%",
    bg_color: "bg-secondary"
  }
]

export const topPerformers: TopPerformers[] = [
  {
    id: 1,
    currency_name: "Bitcoin",
    currency_symbol: "beta",
    market_cap: "$1,204,510",
    usd: "$54,500",
    btc: "2.0",
    eth: "65",
    change24h: "+60%",
    bg_color: "bg-warning"
  },
  {
    id: 2,
    currency_name: "Ripple",
    currency_symbol: "ripple",
    market_cap: "$9,420,159",
    usd: "$3,5100",
    btc: "0.54",
    eth: "3.5",
    change24h: "-20%",
    bg_color: "bg-success"
  },
  {
    id: 3,
    currency_name: "Ethereum",
    currency_symbol: "eth",
    market_cap: "$8,943,349",
    usd: "$9,9510",
    btc: "0.54001",
    eth: "0.5480",
    change24h: "+50%",
    bg_color: "bg-primary"
  },
  {
    id: 4,
    currency_name: "Dash",
    currency_symbol: "dash",
    market_cap: "$7,218,940",
    usd: "$8,5420",
    btc: "0.008",
    eth: "0.841",
    change24h: "-18%",
    bg_color: "bg-success"
  },
  {
    id: 5,
    currency_name: "Tether",
    currency_symbol: "te1",
    market_cap: "$2,305,451",
    usd: "$55,400",
    btc: "3.0",
    eth: "66",
    change24h: "+66%",
    bg_color: "bg-warning"
  },
  {
    id: 6,
    currency_name: "Solana",
    currency_symbol: "solana",
    market_cap: "$5,450,478",
    usd: "$5,5542",
    btc: "0.55",
    eth: "4.6",
    change24h: "-25%",
    bg_color: "bg-success"
  },
  {
    id: 7,
    currency_name: "Cardano",
    currency_symbol: "cardano",
    market_cap: "$6,356,457",
    usd: "$5,9687",
    btc: "0.65557",
    eth: "0.4578",
    change24h: "+65%",
    bg_color: "bg-primary"
  },
  {
    id: 8,
    currency_name: "Binance",
    currency_symbol: "bin",
    market_cap: "$5,218,940",
    usd: "$3,5420",
    btc: "0.067",
    eth: "0.831",
    change24h: "-3%",
    bg_color: "bg-secondary"
  }
]

