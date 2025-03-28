var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// API-anrop som hanterar beställning
import { BASE_URL } from './config';
export const placeOrderApi = (apiKey, tenantId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Sending order to API:", JSON.stringify(orderData, null, 2));
        // Skicka POST-anrop till rätt endpoint med tenantId
        const response = yield fetch(`${BASE_URL}/${tenantId}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey, // API-nyckeln behövs för autentisering
            },
            body: JSON.stringify(orderData),
        });
        // Hantera fel om anropet misslyckas
        if (!response.ok) {
            const errorText = yield response.text();
            console.error("Failed to place order. Status:", response.status, "Message:", errorText);
            throw new Error(`Failed to place order. Status: ${response.status}, Message: ${errorText}`);
        }
        // Läs och returnera svaret från API:t
        const data = yield response.json();
        console.log("Order placed successfully. Response:", data);
        return data; // Returnera orderns data
    }
    catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
});
