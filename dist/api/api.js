var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BASE_URL } from './config';
// Funktion för att hämta och cacha Api-nyckeln
let cachedApiKey = null;
let apiKeyPromise = null;
export const fetchApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedApiKey) {
        // Log only once when using the cached API key
        if (!apiKeyPromise) {
            console.log("Using cached API Key:", cachedApiKey);
        }
        return cachedApiKey;
    }
    if (!apiKeyPromise) {
        apiKeyPromise = (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${BASE_URL}/keys`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch API key. Ensure access is valid.");
                }
                const apiKey = yield response.text();
                console.log("Fetched API Key:", apiKey);
                cachedApiKey = apiKey; // Cache API-nyckeln
                return apiKey;
            }
            catch (error) {
                console.error("Error fetching API key:", error);
                throw error;
            }
            finally {
                apiKeyPromise = null; // Återställ pending promise
            }
        }))();
    }
    return apiKeyPromise;
});
export const registerTenantAndPlaceOrder = (tenantName, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = yield fetchApiKey();
    // Register tenant
    const tenantId = yield registerTenant(apiKey, tenantName);
    console.log(`Tenant registered with ID: ${tenantId}`);
    // Place order
    try {
        const response = yield fetch(`${BASE_URL}/tenants/${tenantId}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey,
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            const errorText = yield response.text();
            console.error("Failed to place order. Status:", response.status, "Message:", errorText);
            throw new Error(`Failed to place order. Status: ${response.status}, Message: ${errorText}`);
        }
        const data = yield response.json();
        console.log("Order placed successfully:", data);
    }
    catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
});
export const registerTenant = (apiKey, tenantName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL}/tenants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey,
            },
            body: JSON.stringify({ name: tenantName }),
        });
        if (!response.ok) {
            const errorText = yield response.text();
            console.error("Failed to register tenant. Status:", response.status, "Message:", errorText);
            throw new Error(`Failed to register tenant. Status: ${response.status}, Message: ${errorText}`);
        }
        const data = yield response.json();
        console.log("Tenant registered successfully:", data);
        return data.id; // Return the tenant ID
    }
    catch (error) {
        console.error("Error registering tenant:", error);
        throw error;
    }
});
