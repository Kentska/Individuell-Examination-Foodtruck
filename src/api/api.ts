import { BASE_URL } from './config';
import { OrderData } from '../types/apiTypes';


// Funktion för att hämta och cacha Api-nyckeln
let cachedApiKey: string | null = null;
let apiKeyPromise: Promise<string> | null = null;

export const fetchApiKey = async (): Promise<string> => {
  if (cachedApiKey) {
    // Log only once when using the cached API key
    if (!apiKeyPromise) {
      console.log("Using cached API Key:", cachedApiKey);
    }
    return cachedApiKey;
  }

  if (!apiKeyPromise) {
    apiKeyPromise = (async () => {
      try {
        const response = await fetch(`${BASE_URL}/keys`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch API key. Ensure access is valid.");
        }

        const apiKey = await response.text();
        console.log("Fetched API Key:", apiKey);
        cachedApiKey = apiKey; // Cache API-nyckeln
        return apiKey;
      } catch (error) {
        console.error("Error fetching API key:", error);
        throw error;
      } finally {
        apiKeyPromise = null; // Återställ pending promise
      }
    })();
  }

  return apiKeyPromise;
};

export const registerTenantAndPlaceOrder = async (tenantName: string, orderData: OrderData): Promise<void> => {
  const apiKey = await fetchApiKey();

  // Register tenant
  const tenantId = await registerTenant(apiKey, tenantName);
  console.log(`Tenant registered with ID: ${tenantId}`);

  // Place order
  try {
    const response = await fetch(`${BASE_URL}/tenants/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to place order. Status:", response.status, "Message:", errorText);
      throw new Error(`Failed to place order. Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    console.log("Order placed successfully:", data);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const registerTenant = async (apiKey: string, tenantName: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/tenants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({ name: tenantName }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to register tenant. Status:", response.status, "Message:", errorText);
      throw new Error(`Failed to register tenant. Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    console.log("Tenant registered successfully:", data);
    return data.id; // Return the tenant ID
  } catch (error) {
    console.error("Error registering tenant:", error);
    throw error;
  }
};

