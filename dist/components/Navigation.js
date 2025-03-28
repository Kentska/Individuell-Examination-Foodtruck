import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const NavigationButton = ({ target, label, icon, className, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick(); // Kör onClick-funktionen om den finns
        }
        else {
            navigate(target); // Navigera om onClick inte är definierad
        }
    };
    return (_jsxs("button", { className: `navigation-button ${className || ""}`, onClick: handleClick, children: [icon && _jsx("img", { src: icon, alt: "icon", className: "navigation-button__icon" }), label && _jsx("span", { children: label })] }));
};
export default NavigationButton;
