var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Kvittosida
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchReceipt } from "../api/receiptApi";
import { resetCart } from "../features/cartSlice";
import "../styles/Receipt.scss";
const ReceiptPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = location.state || {}; // Hämta order-ID från state
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!orderId) {
            setError("Order ID is missing.");
            setLoading(false);
            return;
        }
        const fetchReceiptData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                const apiKey = "DIN_API_NYCKEL"; // Ersätt med din API-nyckel
                const data = yield fetchReceipt(orderId, apiKey);
                console.log("Fetched receipt data:", data); // Logga hela svaret
                // Extrahera receipt från API-svaret
                setReceipt(data.receipt);
                setError(null);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message || "Något gick fel");
                }
                else {
                    setError("Ett okänt fel inträffade");
                }
            }
            finally {
                setLoading(false);
            }
        });
        fetchReceiptData();
    }, [orderId]);
    // Funktion för att hantera "GÖR EN NY BESTÄLLNING"
    const handleNewOrder = () => {
        dispatch(resetCart()); // Nollställ kundvagnen
        navigate("/"); // Navigera tillbaka till menyn
    };
    return (_jsx("div", { className: "receipt-page", children: _jsxs("div", { className: "receipt-container", children: [_jsx("div", { className: "img-yygs", children: _jsx("img", { src: "/Group 6.png", alt: "yygs" }) }), _jsxs("div", { className: "receipt-box", children: [loading && _jsx("p", { children: "H\u00E4mtar kvitto..." }), error && _jsx("p", { className: "error", children: error }), receipt && (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Kvitto" }), _jsxs("p", { children: [_jsx("strong", { children: "Order-ID:" }), " ", receipt.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Orderv\u00E4rde:" }), " ", receipt.orderValue, " SEK"] }), _jsxs("p", { children: [_jsx("strong", { children: "Tid:" }), " ", new Date(receipt.timestamp).toLocaleString()] }), _jsx("h2", { children: "Varor:" }), receipt.items && receipt.items.length > 0 ? ( //Tillägg
                                _jsx("ul", { children: receipt.items.map((item) => (_jsxs("li", { children: [item.quantity, "x ", item.name, " (", item.price, " SEK/st)"] }, item.id))) })) : (_jsx("p", { children: "Inga varor i kvittot" }) // Tillägg för att hantera tomma varor
                                )] })), _jsx("div", { className: "receipt-button", children: _jsx("button", { onClick: handleNewOrder, className: "receipt-navigation-button receipt-new-order", children: "G\u00D6R EN NY BEST\u00C4LLNING\"" }) })] })] }) }));
};
export default ReceiptPage;
