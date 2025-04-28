//API-anrop som hanterar beställning
import {BASE_URL} from './config';
import {OrderData} from './../types/apiTypes';


export const placeOrderApi = async (
  apiKey: string,
  tenant: string,
  orderData: OrderData
  
): Promise<{ order: { id: string; eta: number } }> => {
  const response = await fetch(`${BASE_URL}/${tenant}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to place order. Status: ${response.status}, Message: ${errorText}`);
  }

  return response.json();
};

