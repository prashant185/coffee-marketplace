export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  soldQuantity: number;
  roastLevel: string;
  process: string;
  flavorNotes: string[];
  isOrganic: boolean;
  acidity: string;
  body: string;
  altitude: string;
  farm?: string;
  harvestPeriod?: string;
  varieties?: string;
  roastDate?: string;
  rating: number;
  seller: string;
}

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
}

export interface OrderItem {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface OrderSummary {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
  customerName: string;
  customerEmail: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}