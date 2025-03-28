// API-anrop som hanterar beställning
import {BASE_URL} from './config';
import { OrderData} from './../types/apiTypes';


export const placeOrderApi = async (
  apiKey: string,
  tenantId: string,
  orderData: OrderData

): Promise<{ id: string }> => {
  try {
    console.log("Sending order to API:", JSON.stringify(orderData, null, 2));

    // Skicka POST-anrop till rätt endpoint med tenantId
    const response = await fetch(`${BASE_URL}/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey, // API-nyckeln behövs för autentisering
      },
      body: JSON.stringify(orderData),
    });

    // Hantera fel om anropet misslyckas
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to place order. Status:", response.status, "Message:", errorText);
      throw new Error(`Failed to place order. Status: ${response.status}, Message: ${errorText}`);
    }

    // Läs och returnera svaret från API:t
    const data = await response.json();
    console.log("Order placed successfully. Response:", data);
    return data; // Returnera orderns data
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};


