import { BASE_URL } from './config';
import { TENANT_ID } from './api';

export const placeOrderApi = async (apiKey: string, orderData: any): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/tenants/${TENANT_ID}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to place order. Ensure access is valid.");
    }

    const orderResponse = await response.json();
    console.log("Order placed successfully:", orderResponse);
    return orderResponse;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
