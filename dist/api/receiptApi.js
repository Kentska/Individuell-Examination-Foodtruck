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
export const fetchReceipt = (orderId, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}receipts/${encodeURIComponent(orderId)}`;
    console.log("Fetching receipt with URL:", url);
    const response = yield fetch(url, {
        method: "GET",
        headers: {
            "x-zocom": apiKey, // API-nyckeln krävs för autentisering
        },
    });
    console.log("Using API Key:", apiKey); // för debug
    if (!response.ok) {
        const errorText = yield response.text();
        console.error("Failed to fetch receipt. Status:", response.status, "Message:", errorText);
        throw new Error(`Failed to fetch receipt. Status: ${response.status}, Message: ${errorText}`);
    }
    return yield response.json(); // Returnera kvittot som JSON
});
