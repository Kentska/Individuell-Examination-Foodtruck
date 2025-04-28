//Navigationsmenyn
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  target: string;
  label?: string;
  icon?: string;
  className?: string; // Lägg till stöd för className
  onClick?: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ target, label, icon, className, onClick }) => {
  const navigate = useNavigate();

   const handleClick = () => {
    if (onClick) {
      onClick(); // Kör onClick-funktionen om den finns
    } else {
      navigate(target); // Navigera om onClick inte är definierad
    }
  };
return (
    <button className={`navigation-button ${className || ""}`} onClick={handleClick}>
      {icon && <img src={icon} alt="icon" className="navigation-button__icon" />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default NavigationButton;
