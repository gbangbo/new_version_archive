import { Select2Data } from "ng-select2-component";
import { Category } from "../interface/category";

export const category: Category[] = [
  {
    id: 1,
    category_name: 'Fashion',
    description: 'Latest trends in clothing, shoes, and accessories.',
    category_type: 'Clothing',
    color: 'primary',
    image: 'assets/images/category/Fashion.png',
    is_active: true,
  },
  {
    id: 2,
    category_name: 'Furniture',
    description: 'Comfortable and stylish furniture for your home.',
    category_type: 'Furniture',
    color: 'secondary',
    image: 'assets/images/category/Furniture.png',
    is_active: true,
  },
  {
    id: 3,
    category_name: 'Electronics',
    description: 'Gadgets and electronics for personal and home use.',
    category_type: 'Electric',
    color: 'warning',
    image: 'assets/images/category/Electronics.png',
    is_active: false,
  },
  {
    id: 4,
    category_name: 'Beauty & Health',
    description: 'Skincare, cosmetics, and health products.',
    category_type: 'Personal Care',
    color: 'success',
    image: 'assets/images/category/Beauty.png',
    is_active: true,
  },
  {
    id: 5,
    category_name: 'Books',
    description: 'A wide collection of books in various genres.',
    category_type: 'Books',
    color: 'primary',
    image: 'assets/images/category/Books.png',
    is_active: false,
  },
  {
    id: 6,
    category_name: 'Sports & Outdoors',
    description: 'Equipment and gear for sports and outdoor activities.',
    category_type: 'Sports',
    color: 'secondary',
    image: 'assets/images/category/Sports.png',
    is_active: true,
  },
  {
    id: 7,
    category_name: 'Toys & Games',
    description: 'Toys and games for children of all ages.',
    category_type: 'Toys',
    color: 'warning',
    image: 'assets/images/category/Toys.png',
    is_active: true,
  },
  {
    id: 8,
    category_name: 'Automotive',
    description: 'Car accessories, parts, and maintenance products.',
    category_type: 'Vehicles',
    color: 'success',
    image: 'assets/images/category/Automotive.png',
    is_active: false,
  },
  {
    id: 9,
    category_name: 'Groceries',
    description: 'Food items, beverages, and household essentials.',
    category_type: 'Groceries',
    color: 'primary',
    image: 'assets/images/category/Grocery.png',
    is_active: true,
  },
  {
    id: 10,
    category_name: 'Jewelry',
    description: 'Elegant and fine jewelry for every occasion.',
    category_type: 'Accessories',
    color: 'success',
    image: 'assets/images/category/Jewelry.png',
    is_active: true,
  },
];

export const categoryStatus: Select2Data = [
  {
    value: 1,
    label: 'Active'
  },
  {
    value: 0,
    label: 'Inactive'
  }
]

