export interface Product {
  _id?: number;
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
  qty: number;         
}
 export interface Receipt {
  name: string;
  email: string;
  total: number;
  timestamp: Date;
}