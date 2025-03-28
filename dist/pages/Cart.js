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
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cartSlice';
import NavigationButton from '../components/Navigation';
import unionIcon from '../assets/union.svg';
import { registerTenantAndPlaceOrder } from '../api/api'; // Ensure this import is correct
const Cart = () => {
    const dispatch = useDispatch();
    // Ensure default values for selectors to avoid rendering issues
    const menuItems = useSelector((state) => state.menu.items || []);
    const selectedItems = useSelector((state) => state.cart.items || []);
    const totalPrice = useSelector((state) => state.cart.totalPrice || 0);
    const loading = useSelector((state) => state.cart.loading || false);
    const error = useSelector((state) => state.cart.error || null);
    const handlePlaceOrder = () => __awaiter(void 0, void 0, void 0, function* () {
        if (selectedItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        try {
            const orderData = {
                items: selectedItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    type: item.type || "defaultType", // Replace "defaultType" with an appropriate default value
                    description: item.description || "No description", // Replace with a default description if needed
                    ingredients: item.ingredients || [], // Ensure ingredients is an array
                })),
                total: totalPrice,
            };
            console.log("Placing order with data:", orderData);
            // Call API to place the order
            // Replace "TenantName" with the actual tenant name
            yield registerTenantAndPlaceOrder("TenantName", orderData);
            alert("Order placed successfully!");
        }
        catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place the order. Please try again.");
        }
    });
    const addToCart = (itemId) => {
        // Logic to add an item from the menu to the cart
        dispatch(increaseQuantity(itemId));
    };
    return (_jsx("div", { className: "cart-page", children: _jsxs("div", { className: "cart-container", children: [_jsx("div", { className: "navigation-button-wrapper", children: _jsx(NavigationButton, { target: "/", icon: unionIcon }) }), menuItems.length > 0 && (_jsx("div", { className: "menu-container", children: menuItems.map((item) => (_jsxs("div", { className: "menu-item", children: [_jsx("span", { className: "menu-item__name", children: item.name }), _jsxs("span", { className: "menu-item__price", children: [item.price, " SEK"] }), _jsx("button", { onClick: () => addToCart(item.id), children: "Add to Cart" })] }, item.id))) })), _jsx("h2", { children: "Your Cart" }), selectedItems.map((item) => (_jsxs("div", { className: "cart-item", children: [_jsx("span", { className: "cart-item__name", children: item.name }), _jsxs("span", { className: "cart-item__quantity", children: ["x", item.quantity] }), _jsxs("span", { className: "cart-item__price", children: [item.price * item.quantity, " SEK"] }), _jsxs("div", { className: "cart-item__controls", children: [_jsx("button", { className: "cart-btn cart-btn__add", onClick: () => dispatch(increaseQuantity(item.id)), children: "+" }), _jsx("button", { className: "cart-btn cart-btn__remove", onClick: () => dispatch(decreaseQuantity(item.id)), children: "-" }), _jsx("button", { className: "cart-btn cart-btn__delete", onClick: () => dispatch(removeItem(item.id)), children: "\uD83D\uDDD1\uFE0F" })] })] }, item.id))), _jsxs("div", { className: "cart-bottom", children: [_jsxs("div", { className: "cart-total", children: [_jsx("span", { className: "cart-total__label", children: "Totalt:" }), _jsxs("span", { className: "cart-total__price", children: [totalPrice, " SEK"] })] }), _jsx("button", { className: "take-my-money-button", onClick: handlePlaceOrder, disabled: selectedItems.length === 0 || Boolean(loading), children: loading ? "Placing Order..." : "TAKE MY MONEY!" }), error && _jsx("p", { className: "fel", children: error })] })] }) }));
};
export default Cart;
