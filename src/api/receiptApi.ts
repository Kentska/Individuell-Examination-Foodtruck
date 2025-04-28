import {BASE_URL }  from './config'; // Import BASE_URL to construct API URLs
import { TENANT_ID } from './api';

export const fetchReceipt = async (apiKey: string, orderId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/tenants/${TENANT_ID}/orders/${orderId}/receipt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch receipt. Ensure access is valid.");
    }

    const receiptData = await response.json();
    console.log("Fetched Receipt Data:", receiptData);
    return receiptData;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  }
};
