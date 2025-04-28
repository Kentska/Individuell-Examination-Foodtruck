import { BASE_URL } from './config'; // Import BASE_URL to construct API URLs

export const fetchMenu = async (apiKey: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu. Ensure access is valid.");
    }

    const menuData = await response.json();
    console.log("Fetched Menu Data:", menuData);
    return menuData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};
