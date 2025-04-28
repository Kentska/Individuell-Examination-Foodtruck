// Eta (även för Etapage)
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavigationButton from "../components/Navigation";
import { resetCart } from "../features/cartSlice";
import "../styles/Eta.scss";

const Eta: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderNumber } = location.state || {}; // Hämta ordernummer från state
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60); // Starta ETA på 5 minuter (5 * 60 sekunder)
  useEffect(() => {
  if (!orderNumber) {
    navigate("/cart"); // Navigera tillbaka till Cart om ordernummer saknas
  }
}, [orderNumber, navigate]);
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

  return (
    
      <div className="eta-page">
      <div className="eta-container">
        {/* Bild högst upp till vänster */}
        <div className="img-yygs">
          <img src="/Group 6.png" alt="yygs" />
        </div>

        {/* Centrerad bild */}
        <div className="img-boxtop">
          <img src="/boxtop 1.png" alt="bt" />
        </div>

        {/* Rubrik */}
        <h1 className="eta-title">DINA WONTONS TILLAGAS</h1>

        {/* ETA och Ordernummer */}
        <div className="eta-info">
          <p>Beräknad Leveranstid: <strong>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</strong></p>
          <p>Ordernummer: <strong>{orderNumber || "Ingen beställning hittades"}</strong></p>
        </div>

        {/* Knappar */}
        <div className="eta-buttons">
			<button
            onClick={handleNewOrder} // Anropa handleNewOrder
            className="eta-navigation-button eta-new-order"
          >
            GÖR EN NY BESTÄLLNING
          </button>
          <NavigationButton target="/receipt" label="SE KVITTO" className="eta-navigation-button eta-receipt" 
		   onClick={() => navigate("/receipt", { state: { orderId: orderNumber } })}
		   />
        </div>
      </div>
    </div>
  );
};

export default Eta;