import { Tabs } from "../interface/common"
import { Product } from "../interface/product"

export const addProduct = [
  {
    id: 1,
    value: 'product',
    icon: 'product-detail',
    title: 'Add Product Details',
    description: 'Add product name & details'
  },
  {
    id: 2,
    value: 'gallery',
    icon: 'product-gallery',
    title: 'Product Gallery',
    description: 'Thumbnail & add product gallery'
  },
  {
    id: 3,
    value: 'category',
    icon: 'product-category',
    title: 'Product Categories',
    description: 'Add product category, status and tags'
  },
  {
    id: 4,
    value: 'pricing',
    icon: 'pricing',
    title: 'Product Price & Discount',
    description: 'Add product basic price & discount'
  },
  {
    id: 5,
    value: 'advance',
    icon: 'advance',
    title: 'Additional Options',
    description: 'Add meta details & inventory details'
  }
]

export const additionalOptions = [
  {
    id: 1,
    title: 'Inventory',
    value: 'inventory'
  },
  {
    id: 2,
    title: 'SEO Tag',
    value: 'seo tag'
  },
  {
    id: 3,
    title: 'Shipping',
    value: 'shipping'
  },
  {
    id: 4,
    title: 'Variations',
    value: 'variations'
  },
  {
    id: 5,
    title: 'Publish',
    value: 'publish'
  },
]

export const stockAvailability = [
  {
    value: 'In stock',
    label: 'In stock'
  },
  {
    value: 'Out of stock',
    label: 'Out of stock'
  },
  {
    value: 'Pre-order',
    label: 'Pre-order'
  },
]

export const stockLevel = [
  {
    value: 'Low Stock (5 or less)',
    label: 'Low Stock (5 or less)'
  },
  {
    value: 'Low Stock (10 or less)',
    label: 'Low Stock (10 or less)'
  },
  {
    value: 'Low Stock (20 or less)',
    label: 'Low Stock (20 or less)'
  },
  {
    value: 'Low Stock (25 or less)',
    label: 'Low Stock (25 or less)'
  },
  {
    value: 'Low Stock (30 or less)',
    label: 'Low Stock (30 or less)'
  },
  {
    value: 'sportswear',
    label: 'Sportswear'
  }
]

export const shippingClass = [
  {
    value: 'Basic Shipping',
    label: 'Basic Shipping'
  },
  {
    value: 'Expedited Shipping',
    label: 'Expedited Shipping'
  },
  {
    value: 'International Shipping',
    label: 'International Shipping'
  },
  {
    value: 'Free Shipping',
    label: 'Free Shipping'
  },
  {
    value: 'Same-Day or Next-Day Shipping',
    label: 'Same-Day or Next-Day Shipping'
  },
  {
    value: 'Flat Rate Shipping',
    label: 'Flat Rate Shipping'
  },
  {
    value: 'Local Pickup',
    label: 'Local Pickup'
  },
]

export const colorOptionName = [
  {
    value: 'Color',
    label: 'Color'
  },
  {
    value: 'Size',
    label: 'Size'
  },
  {
    value: 'Material',
    label: 'Material'
  },
  {
    value: 'Style',
    label: 'Style'
  },
]
export const colorOptionValue = [
  {
    value: 'Red',
    label: 'Red'
  },
  {
    value: 'White',
    label: 'White'
  },
  {
    value: 'Black',
    label: 'Black'
  },
  {
    value: 'Gray',
    label: 'Gray'
  },
  {
    value: 'Green',
    label: 'Green'
  },
]
export const publishStatus = [
  {
    value: 'Publish',
    label: 'Publish'
  },
  {
    value: 'Drafts',
    label: 'Drafts'
  },
  {
    value: 'Unpublish',
    label: 'Unpublish'
  },
]
export const priceDiscount = [
  {
    value: 'Fixed Price',
    label: 'Fixed Price'
  },
  {
    value: 'Percentage(%)',
    label: 'Percentage(%)'
  },

]
export const productCategory = [
  {
    value: 'toys',
    label: 'Toys & games'
  },
  {
    value: 'footwear',
    label: 'Footwear'
  },
  {
    value: 'furniture',
    label: 'Furniture and Decor'
  },
  {
    value: 'baby_care',
    label: 'Baby Care Products'
  },
  {
    value: 'accessories',
    label: 'Accessories'
  },
  {
    value: 'sportswear',
    label: 'Sportswear'
  },
  {
    value: 'electronics',
    label: 'Electronics'
  },
  {
    value: 'clothing',
    label: 'Clothing & Apparel'
  },
  {
    value: 'beauty',
    label: 'Beauty & Personal Care'
  }
];

export const productPriceTabs: Tabs[] = [
  {
    id: 1,
    title: 'Fixed Price Discount',
    value: 'fixed_price_discount'
  },
  {
    id: 2,
    title: 'BOGO (Buy One, Get One)',
    value: 'bogo'
  },
  {
    id: 3,
    title: 'Percentage Based Discount(%)',
    value: 'percentage_discount'
  },
  {
    id: 4,
    title: 'Volume or Bulk Discount',
    value: 'volume_discount'
  }
]

export const bogoProducts = [
  {
    value: 'women-pink-tshirt',
    label: 'Women Pink T-shirt'
  },
  {
    value: 'solid-hooded-sweatshirt',
    label: 'Solid Hooded Sweatshirt'
  },
  {
    value: 'women-flared-jeans',
    label: 'Women Flared Jeans'
  },
  {
    value: 'fresh-and-pure-oil',
    label: 'Fresh And Pure Oil'
  },
  {
    value: 'premium-dumbbells',
    label: 'Premium Dumbbells'
  },
  {
    value: 'Organic-long-grain-rice',
    label: 'Organic Long Grain Rice'
  },
  {
    value: 'delicious-cupcakes',
    label: 'Delicious Cupcakes'
  }
]

export const products: Product[] = [
  {
    id: 1,
    image: "assets/images/ecommerce/01.jpg",
    product_name: "Women's Top",
    sort_description: "Regular Flare Fit Women's white Top",
    description: "Lorate Solid Men's Fashion Full Sleeves Latest Jacket for Men With Button Closure Long Sleeve Casual Torn Lycra Denim Jacket.",
    discount_price: 35,
    price: 50,
    discount: 30,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 2.5,
    colors: [
      "white",
      "gray"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Hudson",
      "Lee"
    ],
    sku: "SKU12345",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 2,
    image: "assets/images/ecommerce/02.jpg",
    product_name: "Women's Black Top",
    sort_description: "Tops for Women Stylish",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 100,
    price: 200,
    discount: 50,
    tag: "Sale",
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 4.5,
    colors: [
      "green",
      "gray"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Levis",
      "Hudson",
      "Lee"
    ],
    sku: "SKU12346",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 3,
    image: "assets/images/ecommerce/03.jpg",
    product_name: "Men's Blazer",
    sort_description: "Men's Denim Jacket",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 100,
    price: 350,
    discount: 71.43,
    stock: "out_of_stock",
    review: 250,
    category: "Men",
    rating: 3,
    colors: [
      "white",
      "gray",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Spykar",
      "Lee"
    ],
    sku: "SKU12347",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 4,
    image: "assets/images/ecommerce/04.jpg",
    product_name: "Elegant Fancy Top",
    sort_description: "Stylish co-ord set 2 piece dress for women",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 50,
    price: 99,
    discount: 49,
    stock: "in_stock",
    tag: "discount",
    review: 250,
    category: "Women",
    rating: 4,
    colors: [
      "red",
      "gray",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Levis",
      "Lee",
      "Hudson"
    ],
    sku: "SKU12348",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 5,
    image: "assets/images/ecommerce/09.jpg",
    product_name: "Classic T-shirt",
    sort_description: "Plan T-shirt for boys",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 840,
    price: 990,
    discount: 15.15,
    stock: "in_stock",
    review: 250,
    category: "Men",
    rating: 5,
    colors: [
      "green",
      "gray",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Denien",
      "Diesel",
      "Spykar"
    ],
    sku: "SKU12349",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 6,
    image: "assets/images/ecommerce/10.jpg",
    product_name: "Camisole Tops",
    sort_description: "Soft cotton camisoles",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 150,
    price: 310,
    discount: 51.61,
    stock: "in_stock",
    tag: "gift",
    review: 250,
    category: "Women",
    rating: 3.5,
    colors: [
      "purple",
      "orange",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Lee",
      "Lifestyle",
      "Nike"
    ],
    sku: "SKU12350",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 7,
    image: "assets/images/ecommerce/11.jpg",
    product_name: "Stylist Full Sleeve T-shirt",
    sort_description: "Chic cotton frill tees with a high neck",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 50,
    price: 120,
    discount: 58.33,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 3,
    colors: [
      "orange",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Lee"
    ],
    sku: "SKU12351",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 8,
    image: "assets/images/ecommerce/12.jpg",
    product_name: "Women's Crop Top",
    sort_description: "Cotton blend women's black top",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 150,
    price: 400,
    discount: 62.5,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 5,
    colors: [
      "purple",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Hudson",
      "Lee"
    ],
    sku: "SKU12352",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 9,
    image: "assets/images/ecommerce/13.jpg",
    product_name: "Men's Winter Wear",
    sort_description: "Men's Denim T-shirt",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 350,
    price: 500,
    discount: 30,
    stock: "in_stock",
    review: 250,
    category: "Men",
    rating: 3.2,
    colors: [
      "white",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Spykar"
    ],
    sku: "SKU12353",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 10,
    image: "assets/images/ecommerce/14.jpg",
    product_name: "Men's Light Green Suit",
    sort_description: "Cotton regular fit for men's suit",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 399,
    price: 699,
    discount: 42.8,
    stock: "in_stock",
    review: 250,
    category: "Men",
    rating: 3,
    colors: [
      "purple",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Hudson",
      "Lee"
    ],
    sku: "SKU12354",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 11,
    image: "assets/images/ecommerce/15.jpg",
    product_name: "Women's Stylist Party Wear",
    sort_description: "Tops for Women Stylish",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 250,
    price: 350,
    discount: 28.57,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 4.5,
    colors: [
      "white",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Hudson",
      "Lee"
    ],
    sku: "SKU12355",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 12,
    image: "assets/images/ecommerce/16.jpg",
    product_name: "Women's Mini Bodycon Dress",
    sort_description: "Stylist mini bodycon dress",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 110,
    price: 350,
    discount: 68.57,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 3.5,
    colors: [
      "white",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Hudson",
      "Lee"
    ],
    sku: "SKU12356",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 13,
    image: "assets/images/ecommerce/17.jpg",
    product_name: "Premium Jacket",
    sort_description: "Women stylish jacket",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 120,
    price: 200,
    discount: 40,
    stock: "in_stock",
    tag: "heart",
    review: 250,
    category: "Women",
    rating: 5,
    colors: [
      "white",
      "pink",
      "blue"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Hudson",
      "Lee"
    ],
    sku: "SKU12357",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 14,
    image: "assets/images/ecommerce/18.jpg",
    product_name: "Colorful One Piece",
    sort_description: "Western one piece dress",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 120,
    price: 300,
    discount: 60,
    stock: "in_stock",
    review: 250,
    category: "Women",
    rating: 4.2,
    colors: [
      "white",
      "blue",
      "yellow"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Diesel",
      "Lee"
    ],
    sku: "SKU12358",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 15,
    image: "assets/images/ecommerce/19.jpg",
    product_name: "Red Western One Piece",
    sort_description: "Stylish co-ord set 2 piece dress for women",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 300,
    price: 600,
    discount: 50,
    stock: "in_stock",
    tag: "Hot",
    review: 250,
    category: "Women",
    rating: 3,
    colors: [
      "black",
      "blue",
      "yellow"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Lee"
    ],
    sku: "SKU12359",
    qty: Math.floor(Math.random() * 101)
  },
  {
    id: 16,
    image: "assets/images/ecommerce/20.jpg",
    product_name: "Printed Full Sleeve T-shirt",
    sort_description: "Women's printed t-shirt",
    description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo.",
    discount_price: 99,
    price: 120,
    discount: 17.5,
    stock: "out_of_stock",
    tag: "none",
    review: 250,
    category: "Women",
    rating: 4,
    colors: [
      "black",
      "pink",
      "yellow"
    ],
    size: [
      "M",
      "L",
      "XL"
    ],
    tags: [
      "Hudson"
    ],
    sku: "SKU12360",
    qty: Math.floor(Math.random() * 101)
  }
]


export const category = [
  {
    id: 1,
    title: 'Man Shirt',
    value: 'men_top'
  },
  {
    id: 2,
    title: 'Man Jeans',
    value: 'men_jeans'
  },
  {
    id: 3,
    title: 'Women Top',
    value: 'women_top'
  },
  {
    id: 4,
    title: 'Women Jeans',
    value: 'women_jeans'
  },
  {
    id: 5,
    title: 'Man T-shirt',
    value: 'man_tshirt'
  }
]

export const brands = [
  {
    id: 1,
    title: "Levi's",
    value: "Levi's"
  },
  {
    id: 2,
    title: 'Diesel',
    value: 'Diesel'
  },
  {
    id: 3,
    title: 'Lee',
    value: 'Lee'
  },
  {
    id: 4,
    title: 'Hudson',
    value: 'Hudson'
  },
  {
    id: 5,
    title: 'Denizen',
    value: 'Denizen'
  },
  {
    id: 6,
    title: 'Spykar',
    value: 'Spykar'
  }
]

export const colors = [
  {
    id: 1,
    title: 'white',
    value: 'white'
  },
  {
    id: 2,
    title: 'black',
    value: 'black'
  },
  {
    id: 3,
    title: 'orange',
    value: 'orange'
  },
  {
    id: 4,
    title: 'green',
    value: 'green'
  },
  {
    id: 5,
    title: 'pink',
    value: 'pink'
  },
  {
    id: 6,
    title: 'yellow',
    value: 'yellow'
  },
  {
    id: 7,
    title: 'blue',
    value: 'blue'
  },
  {
    id: 8,
    title: 'red',
    value: 'red'
  }
]

export const discount = [
  {
    id: 1,
    title: 'upto 5%',
    value: '<5',
    badge: 6
  },
  {
    id: 2,
    title: '5% - 10%',
    value: '5-10',
    badge: 12
  },
  {
    id: 3,
    title: '10% - 15%',
    value: '10-15',
    badge: 20
  },
  {
    id: 4,
    title: '15% - 25%',
    value: '15-25',
    badge: 22
  },
  {
    id: 5,
    title: 'More than 25%',
    value: '>25',
    badge: 24
  }
]

export const socialShareOptions = [
  {
    id: 1,
    name: 'Facebook',
    link: 'https://www.facebook.com/',
    icon: 'fa-brands fa-facebook-f'
  },
  {
    id: 2,
    name: 'Pinterest',
    link: 'https://in.pinterest.com/',
    icon: 'fa-brands fa-pinterest-p'
  },
  {
    id: 3,
    name: 'Twitter',
    link: 'https://twitter.com/',
    icon: 'fa-brands fa-x-twitter'
  },
  {
    id: 4,
    name: 'Instagram',
    link: 'https://www.instagram.com/',
    icon: 'fa-brands fa-instagram'
  },
  {
    id: 5,
    name: 'RSS',
    link: 'https://rss.app/',
    icon: 'fa-solid fa-share-nodes'
  }
]

export const services = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'Free shipping world wide',
    icon: 'truck'
  },
  {
    id: 2,
    title: '24 X 7 Service',
    description: 'Online service for new customer',
    icon: 'clock'
  },
  {
    id: 3,
    title: 'Festival Offer',
    description: 'New online special festival',
    icon: 'gift'
  },
  {
    id: 4,
    title: 'Online Payment',
    description: 'Country to popular belief.',
    icon: 'credit-card'
  }
]

export const productDetailsTab: Tabs[] = [
  {
    id: 1,
    title: 'Description',
    value: 'description'
  },
  {
    id: 2,
    title: 'Additional Info',
    value: 'additional_info'
  },
  {
    id: 3,
    title: 'Write Review',
    value: 'review'
  },
]

export const productDetails = {
  description: [
    {
      description: "The model is wearing a white blouse from our stylist's collection, see the image for a mock-up of what the actual blouse would look like.it has text written on it in a black cursive language which looks great on a white color."
    },
    {
      title: 'Fabric',
      description: "Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers."
    },
    {
      title: 'Size & Fit',
      description: `The model (height 5'8") is wearing a size S`
    },
    {
      title: 'Material & Care',
      description: 'fabric: pure cotton'
    }
  ],
  additional_info: [
    {
      material: 'Polyester',
      colors: 'Yellow',
      size_range: 'XS',
      fit: 'Slim fit',
      neckline: 'V-neck',
      seam: 'French',
    },
    {
      material: 'Blend',
      colors: 'Black',
      size_range: 'XL',
      fit: 'Regular fit',
      neckline: 'Scoop neck',
      seam: 'Flat',
    },
    {
      material: 'Cotton',
      colors: 'Blue',
      size_range: 'S',
      fit: 'Relaxed',
      neckline: 'Mandarin collar',
      seam: 'Exposed',
    },
    {
      material: 'Polyester',
      colors: 'White',
      size_range: 'M',
      fit: 'Slim Fit',
      neckline: 'Spread collar',
      seam: 'Topstitching',
    }
  ],
  review: {
    total_review: 5,
    review: 4.5,
    review_count: [4, 3, 2, 1, 1],
    reviews: [
      {
        name: 'Scarlet',
        image: 'assets/images/dashboard-11/user/1.jpg',
        product: 'Smart Watch',
        rating: 4,
        date: '03 Feb, 2024',
        review_text: "I adore this outfit! The print is stunning, and the fabric is incredibly smooth and flowing. It's ideal for a night out or summer weddings. Just be mindful that the straps are little adjustable, so you may need fashion tape for piece of mind if you're busty.",
      },
      {
        name: 'Arya',
        image: 'assets/images/dashboard-11/user/2.jpg',
        product: 'Arm Chair',
        rating: 4,
        date: '24 May, 2024',
        review_text: "This tee is a fantastic basic. For warmer days, the lightweight, breathable linen is ideal. You might want to go down if you like a more tailored look because the fit is a little boxy. All in all, this is a versatile shirt that I will wear often.",
      },
      {
        name: 'Kyro',
        image: 'assets/images/dashboard-11/user/3.jpg',
        product: 'Study Lamp',
        rating: 3,
        date: '30 Jun, 2024',
        review_text: "What a letdown this jacket is. In person, the wash is more rigid and dark than it appears in the photo, which is retro and stylish. I got a medium, but it seems more like a small. The size is also incorrect. Returning it in disappointment.",
      },
      {
        name: 'Izabella',
        image: 'assets/images/dashboard-11/user/8.jpg',
        product: 'Beauty Blender',
        rating: 4,
        date: '18 Dec, 2024',
        review_text: "There is nothing but luxury about this jumper. It feels of excellent quality, and the cashmere is wonderfully warm and cuddly. It's a classic piece with a long lifespan. incredibly elegant and comfy, ideal for chilly days.",
      }
    ]
  }
}
