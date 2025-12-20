export interface FileTypes {
  name: string;
  total_files: number;
  size: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  storage: string;
  status: string;
  image: string;
}

export interface FileManager {
  name: string;
  type: string;
  text?: string;
}