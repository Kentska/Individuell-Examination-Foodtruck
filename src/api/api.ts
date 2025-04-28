import { BASE_URL } from './config';

console.log("BASE_URL in api.ts:", BASE_URL);

// Hardcoded tenant ID (replace "HARDCODED_TENANT_ID" with the actual tenant ID you fetched)
export const TENANT_ID = "HARDCODED_TENANT_ID";

export const fetchApiKey = async (): Promise<string> => {
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
    return apiKey;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
};

export const fetchTenantData = async (): Promise<void> => {
  try {
    const apiKey = await fetchApiKey();

    const response = await fetch(`${BASE_URL}/tenants/${TENANT_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tenant data. Ensure access is valid.");
    }

    const tenantData = await response.json();
    console.log("Fetched Tenant Data:", tenantData);
  } catch (error) {
    console.error("Error fetching tenant data:", error);
    throw error;
  }
};
