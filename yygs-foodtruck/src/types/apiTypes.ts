// Basgränssnitt för alla artiklar
export interface MenuItem {
  id: number;
  type: "wonton" | "dip" | "drink"; // Enum for item type
  name: string;
  description: string;
  price: number; // Price in SEK
  ingredients: string[]; // List of ingredients
}

// CartItem är en utökning av MenuItem med ett "quantity"-fält
export interface CartItem extends MenuItem {
  quantity: number;
}

// Generiskt API-svar för alla datatyper
export interface ApiResponse<T> {
  data: T; // Själva datan
  message?: string; // Valfritt meddelande
}

// Kvittodata
export interface ReceiptItem {
  id: number;
  name: string;
  type: "wonton" | "dip" | "drink";
  description: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  orderValue: number;
  timestamp: string;
  items: ReceiptItem[];
}

// Beställningsdata som skickas till API:et
export interface ApiOrderItem {
  id:string | number; // ID för artikeln
  name: string;
  quantity: number;
  price: number;
}

export interface ApiOrderData {
  items: ApiOrderItem[];
}

export interface OrderData {
  items: number[];
}
