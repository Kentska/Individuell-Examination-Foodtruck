import { BASE_URL } from './config';

// Hardcoded tenant ID
const TENANT = "9hiv";

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

    const response = await fetch(`${BASE_URL}/tenants/${TENANT}`, {
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