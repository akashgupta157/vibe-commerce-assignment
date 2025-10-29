import type { Product } from "@/types";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getProducts = () => axios.get(`${API_BASE}/products`);

export const getCart = () => axios.get(`${API_BASE}/cart`);

export const addToCart = (item: Product) =>
  axios.post(`${API_BASE}/cart`, item);

export const removeFromCart = (id: number) =>
  axios.delete(`${API_BASE}/cart/${id}`);

export const updateCartQty = (id: number, qty: number) =>
  axios.put(`${API_BASE}/cart/${id}`, { qty });

export const checkout = (data: {
  name: string;
  email: string;
  cartItems: Product[];
}) => axios.post(`${API_BASE}/checkout`, data);
