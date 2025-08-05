export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  orderDate: string;
  orderId: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  shippingAddress: string;
}

export interface Filters {
  category?: string;
  search?: string;
  sortBy?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
