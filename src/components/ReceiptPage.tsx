// Kvittosida

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { fetchReceipt } from "../api/receiptApi";
import { Receipt } from "../types/apiTypes";
import { resetCart } from "../features/cartSlice";
import "../styles/Receipt.scss";



const ReceiptPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = location.state || {}; // Hämta order-ID från state
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing.");
      setLoading(false);
      return;
    }

const fetchReceiptData = async () => {
  try {
    setLoading(true);
    const apiKey = "DIN_API_NYCKEL"; // Ersätt med din API-nyckel
    const data = await fetchReceipt(orderId, apiKey);
    console.log("Fetched receipt data:", data); // Logga hela svaret

    // Extrahera receipt från API-svaret
    setReceipt(data.receipt);
    setError(null);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message || "Något gick fel");
    } else {
      setError("Ett okänt fel inträffade");
    }
  } finally {
    setLoading(false);
  }
};

    fetchReceiptData();
  }, [orderId]);

  // Funktion för att hantera "GÖR EN NY BESTÄLLNING"
  const handleNewOrder = () => {
    dispatch(resetCart()); // Nollställ kundvagnen
    navigate("/"); // Navigera tillbaka till menyn
  };


  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <div className="img-yygs">
          <img src="/Group 6.png" alt="yygs" />
        </div>
        <div className="receipt-box">
          {loading && <p>Hämtar kvitto...</p>}
          {error && <p className="error">{error}</p>}
          {receipt && (
            <>
              <h1>Kvitto</h1>
              <p><strong>Order-ID:</strong> {receipt.id}</p>
              <p><strong>Ordervärde:</strong> {receipt.orderValue} SEK</p>
              <p><strong>Tid:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
              <h2>Varor:</h2>
			   {receipt.items && receipt.items.length > 0 ? (  //Tillägg
              <ul>
                {receipt.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.name} ({item.price} SEK/st)
                  </li>
                ))}
              </ul>
			   ):( 
				<p>Inga varor i kvittot</p>  // Tillägg för att hantera tomma varor
			   )}
            </>
          )}
		  
          <div className="receipt-button">
            <button
			onClick={handleNewOrder} // Anropa handleNewOrder
              className="receipt-navigation-button receipt-new-order"
            >
              GÖR EN NY BESTÄLLNING"
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;

