// API-anrop som hanterar menyer
import { MenuItem } from "../types/apiTypes";
import {BASE_URL} from './config';

export const fetchMenuApi = async (apiKey: string): Promise<MenuItem[]> => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "GET",
    headers: {
      "x-zocom": apiKey, // API-nyckeln behövs för autentisering
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch menu. Please check the API key.");
  }

   const data = await response.json();
    // console.log("Raw API Response:", data); // Log the raw response
  if (data.items && Array.isArray(data.items)) {
   return data.items; // Returnera menyn som JSON
  }

  
   throw new Error("Invalid menu data received from the server.");
};

