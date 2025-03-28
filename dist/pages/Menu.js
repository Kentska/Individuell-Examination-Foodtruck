var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Meny (även menypage)
import { useEffect, useState } from "react";
import "../styles/Menu.scss";
import NavigationButton from "../components/Navigation"; // Din NavigationButton-komponent
import unionIcon from "../assets/Union.svg";
import { fetchApiKey } from "../api/api"; // Importera funktionen för att hämta API-nyckeln
import { fetchMenuApi } from "../api/menuApi"; // Importera funktionen för att hämta menyn
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { addItem } from "../features/cartSlice"; // Redux-action för att lägga till varor i kundvagnen
const Menu = () => {
    const [menuItems, setMenuItems] = useState([]); // State för menydata
    const [loading, setLoading] = useState(true); // State för laddning
    const [error, setError] = useState(null); // State för felhantering
    const dispatch = useDispatch(); // Redux dispatch
    const cartItems = useSelector((state) => state.cart.items); // Hämta kundvagnsdata från Redux-storen
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Dynamisk badge för antal varor i kundvagnen
    useEffect(() => {
        const fetchMenuData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                // Hämta API-nyckeln
                const apiKey = yield fetchApiKey();
                console.log("API Key fetched successfully:", apiKey);
                // Hämta menyn med API-nyckeln
                const data = yield fetchMenuApi(apiKey);
                setMenuItems(data); // Sätt menydata i state
                setError(null); // Nollställ eventuella fel
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message || "Something went wrong"); // Hantera fel
                }
                else {
                    setError("An unknown error occurred");
                }
            }
            finally {
                setLoading(false); // Avsluta laddning
            }
        });
        fetchMenuData();
    }, []);
    // Funktion för att lägga till en vara i kundvagnen
    const addToCart = (item) => {
        const cartItem = Object.assign(Object.assign({}, item), { quantity: 1 }); // Lägg till en default-quantity
        dispatch(addItem(cartItem)); // Skicka det nya objektet till Redux
    };
    // Filtrera menyn baserat på typ
    const dips = menuItems.filter((item) => item.type === "dip");
    const drinks = menuItems.filter((item) => item.type === "drink");
    const otherItems = menuItems.filter((item) => item.type !== "dip" && item.type !== "drink");
    return (_jsxs("div", { className: "menu-page", children: [_jsxs("div", { className: "background_image", children: [_jsx("img", { src: "/mmm 1.png", alt: "bg" }), _jsxs("div", { className: "navigation-button-wrapper", children: [_jsx(NavigationButton, { target: "/cart", icon: unionIcon }), cartCount > 0 && _jsx("div", { className: "badge", children: cartCount }), " "] })] }), _jsxs("div", { className: "menu-container", children: [_jsx("h1", { className: "menu__title", children: "MENY" }), loading && _jsx("p", { children: "Loading..." }), " ", error && _jsx("p", { className: "error", children: error }), " ", _jsxs("div", { className: "menu-section", children: [_jsx("h1", { className: "menu-section__title" }), _jsx("div", { className: "menu-items", children: otherItems.map((item) => {
                                    var _a;
                                    return (_jsxs("div", { className: "menu-item", onClick: () => addToCart(item), children: [_jsxs("div", { className: "menu-item__header", children: [_jsx("span", { className: "menu-item__name", children: item.name }), _jsxs("span", { className: "menu-item__price", children: [item.price, " SEK"] })] }), _jsx("p", { className: "menu-item__ingredients", children: (_a = item.ingredients) === null || _a === void 0 ? void 0 : _a.join(", ") })] }, item.id));
                                }) })] }), _jsxs("div", { className: "menu-section", children: [_jsx("h1", { className: "menu-section__title", children: "DIP" }), _jsx("div", { className: "menu-items menu-items--dip", children: dips.map((item) => (_jsxs("div", { className: "menu-item menu-item--dip", onClick: () => addToCart(item), children: [_jsx("span", { className: "menu-item__name", children: item.name }), _jsxs("span", { className: "menu-item__price", children: [item.price, " SEK"] })] }, item.id))) })] }), _jsxs("div", { className: "menu-section", children: [_jsx("h1", { className: "menu-section__title", children: "DRINK" }), _jsx("div", { className: "menu-items menu-items--drink", children: drinks.map((item) => (_jsxs("div", { className: "menu-item menu-item--drink", onClick: () => addToCart(item), children: [_jsx("span", { className: "menu-item__name", children: item.name }), _jsxs("span", { className: "menu-item__price", children: [item.price, " SEK"] })] }, item.id))) })] })] })] }));
};
export default Menu;
