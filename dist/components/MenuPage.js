import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Meny för beställning
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../features/menuSlice";
const MenuComponent = () => {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu.items);
    const status = useSelector((state) => state.menu.status);
    const error = useSelector((state) => state.menu.error);
    const apiKey = "din-api-nyckel"; // Lägg in giltig API-nyckel här
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMenu(apiKey));
        }
    }, [dispatch, status, apiKey]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Menu" }), status === "loading" && _jsx("p", { children: "Loading..." }), status === "failed" && _jsxs("p", { children: ["Error: ", error] }), status === "succeeded" && (_jsx("ul", { children: menu.map((item) => (_jsxs("li", { children: [item.name, " - ", item.price, " SEK"] }, item.id))) }))] }));
};
export default MenuComponent;
