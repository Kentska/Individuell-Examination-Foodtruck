import {MenuItem} from './apiTypes';

export interface MenuState {
  items: MenuItem[]; 
  status: "idle" | "loading" | "succeeded" | "failed"; 
  error: string | null; 
}

export interface CartState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed"; 
}

export interface ReceiptState {
  orderId: number;
  date: string;
  items: MenuItem[];
  total: number;
}