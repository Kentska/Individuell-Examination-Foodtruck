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
export const fetchMenuApi = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${BASE_URL}/menu`, {
        method: "GET",
        headers: {
            "x-zocom": apiKey, // API-nyckeln behövs för autentisering
        },
    });
    console.log("Using API Key:", apiKey); // logga API-nyckeln för debugging
    if (!response.ok) {
        throw new Error("Failed to fetch menu. Please check the API key.");
    }
    const data = yield response.json();
    console.log("Raw API Response:", data); // Log the raw response
    if (data.items && Array.isArray(data.items)) {
        return data.items; // Returnera menyn som JSON
    }
    throw new Error("Invalid menu data received from the server.");
});
