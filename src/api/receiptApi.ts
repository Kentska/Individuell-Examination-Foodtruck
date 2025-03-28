//API-Hantering som handhar kvitto
import { ReceiptApiResponse } from '../types/apiTypes';
import {BASE_URL} from './config';

export const fetchReceipt = async (orderId: string, apiKey: string): Promise<ReceiptApiResponse> => {
  const url = `${BASE_URL}receipts/${encodeURIComponent(orderId)}`;
  console.log("Fetching receipt with URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-zocom": apiKey, // API-nyckeln krävs för autentisering
    },
  });
console.log("Using API Key:", apiKey); // för debug
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to fetch receipt. Status:", response.status, "Message:", errorText);
    throw new Error(`Failed to fetch receipt. Status: ${response.status}, Message: ${errorText}`);
  }

  return await response.json(); // Returnera kvittot som JSON
};

