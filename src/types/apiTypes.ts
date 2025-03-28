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


// OrderItem återanvänder också MenuItem och lägger till "quantity"
export interface OrderItem extends MenuItem {
  quantity: number;
}



// Generiskt API-svar för alla datatyper
export interface ApiResponse<T> {
  data: T; // Själva datan
  message?: string; // Valfritt meddelande
}


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

export interface PlaceOrderData {
	items: number[]; 
}

export interface ReceiptApiResponse {
  receipt: Receipt;
}

export interface OrderItem {
  id: number;
  type: 'wonton' | 'dip' | 'drink';
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  quantity: number;
}

export interface OrderData {
  items: OrderItem[];
  total: number;
}