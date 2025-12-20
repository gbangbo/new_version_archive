export interface BasicTable {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  designation: string;
  company: string;
  language: string;
  country: string;
  class: string;
  tr_class: string;
  image_url: string;
}

export interface Student {
  id: string;
  roll_number: string;
  student_name: string;
  standard: string;
  grade: string;
  percentage: string;
  class?: string;
}

export interface InverseTable {
  id: number;
  first_name: string;
  last_name: string;
  office: string;
  position: string;
  salary: string;
  join_date: string;
  age: number;
}

export interface HoverAbleTable {
  id: number
  status: string;
  class: string;
  signal_name: string;
  security: string;
  stage: string;
  schedule: number;
  team_lead: string;
}

export interface InverseTableBackground {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  credit_volume: string;
  user_name: string;
  role: string;
  country: string;
}

export interface Caption {
  id: number;
  employee_name: string;
  email: string;
  experience: string;
  sex: string;
  contact_number: string;
  age: number;
}

export interface TableHeadOption {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
}

export interface StripedRow {
  id: number;
  dessert: string;
  calories: number;
  fat: number;
  price: number;
}

export interface StripedColumn {
  id: number;
  name: string;
  age: number;
  city: string;
  occupation: string;
}

export interface ActiveTable {
  product_id: string;
  product_name: string;
  category: string;
  price: string;
}

export interface TableBorder {
  isbn: string;
  title: string;
  author: string;
  year_published: number;
}

export interface TableWithoutBorder {
  date: string;
  exercise_type: string;
  duration: number;
  calories_burned: number;
}

export interface VerticalAlignment {
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
}

export interface AnatomyTable {
  version: string;
  class: string;
  release_date: string;
  new_features: string;
  bug_fixes: string;
}

export interface TableFoot {
  product_id: string;
  product_name: string;
  category: string;
  price: string;
}

export interface TableGroupDivider {
  id: number;
  first_name: string;
  last_name?: string;
  handle: string;
}

export interface BreakpointTable {
  id: number;
  name: string;
  order_id: string;
  price: number;
  quantity: number;
  total: string;
}

export interface ResponsiveTable {
  id: number;
  task: string;
  email: string;
  phone: string;
  assign: string;
  date: string;
  price: number;
  status: string;
  progress: string;
  class: string;
}

export interface SizingTable {
  id: number;
  employee_name: string;
  date: string;
  status: string;
  hours: number;
  performance: string;
  class: string;
}

export interface CustomTable {
  id: number;
  film_title: string;
  released: number;
  studio: string;
  budget: string;
  domestic_gross: string;
}

export interface DashedBorderTable {
  id: number;
  class_name: string;
  type: string;
  hours: string;
  trainer: string;
  spots: number;
}
