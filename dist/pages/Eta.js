import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Eta (även för Etapage)
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavigationButton from "../components/Navigation";
import { resetCart } from "../features/cartSlice";
import "../styles/Eta.scss";
const Eta = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderNumber } = location.state || {}; // Hämta ordernummer från state
    const [timeLeft, setTimeLeft] = useState(5 * 60); // Starta ETA på 5 minuter (5 * 60 sekunder)
    // Timer för att räkna ner ETA
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Stoppa timern när tiden når 0
                    return 0;
                }
                return prevTime - 1; // Minska tiden med 1 sekund
            });
        }, 1000); // Uppdatera varje sekund (1000 ms)
        return () => clearInterval(timer); // Rensa timern vid avmontering
    }, []);
    // Konvertera sekunder till minuter och sekunder
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Funktion för att hantera "GÖR EN NY BESTÄLLNING"
    const handleNewOrder = () => {
        dispatch(resetCart()); // Nollställ kundvagnen
        navigate("/"); // Navigera tillbaka till startsidan
    };
    return (_jsx("div", { className: "eta-page", children: _jsxs("div", { className: "eta-container", children: [_jsx("div", { className: "img-yygs", children: _jsx("img", { src: "/Group 6.png", alt: "yygs" }) }), _jsx("div", { className: "img-boxtop", children: _jsx("img", { src: "/boxtop 1.png", alt: "bt" }) }), _jsx("h1", { className: "eta-title", children: "DINA WONTONS TILLAGAS" }), _jsxs("div", { className: "eta-info", children: [_jsxs("p", { children: ["Ber\u00E4knad Leveranstid: ", _jsxs("strong", { children: [minutes, ":", seconds < 10 ? `0${seconds}` : seconds] })] }), _jsxs("p", { children: ["Ordernummer: ", _jsx("strong", { children: orderNumber || "Ingen beställning hittades" })] })] }), _jsxs("div", { className: "eta-buttons", children: [_jsx("button", { onClick: handleNewOrder, className: "eta-navigation-button eta-new-order", children: "G\u00D6R EN NY BEST\u00C4LLNING" }), _jsx(NavigationButton, { target: "/receipt", label: "SE KVITTO", className: "eta-navigation-button eta-receipt", onClick: () => navigate("/receipt", { state: { orderId: orderNumber } }) })] })] }) }));
};
export default Eta;
