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

   
    setReceipt(data.receipt);
	console.log("Receipt data:", data.receipt); // Logga kvittodata
	
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
		<div className="receipt-header">
        <div className="img-yygs">
          <img src="/Group 6.png" alt="yygs" />
        </div>
		</div>

        <div className="receipt-content">
          {loading && <p>Hämtar kvitto...</p>}
          {error && <p className="error">{error}</p>}
		{receipt && (
  <>
  <div className="logo"> <img src="/logo.png" alt="logo" />
  </div>
	<div className="receipt-details">
    <h1 className="receipt-title">Kvitto</h1>
    <p className="receipt-id"><strong>#</strong> {receipt.id}</p>
    
    <p className="receipt-time"><strong></strong> {new Date(receipt.timestamp).toLocaleString()}</p>
    <h2 className="receipt-items-title"></h2>
    {receipt.items && receipt.items.length > 0 ? (
      <>
        {console.log("Receipt items:", receipt.items)} {/* Logga här */}

<ul className="receipt-items-list">
  {receipt.items.map((item) => (
    <li key={item.id} className="receipt-item">
      <div className="receipt-item-left">
        <span className="receipt-item-name">{item.name}</span>
        <span className="receipt-item-quantity">{item.quantity} stycken</span>
      </div>
      <div className="receipt-item-right">
        <span className="receipt-item-price">{item.price} SEK</span>
      </div>
    </li>
  ))}
</ul>

      </>
    ) : (
      <p>Inga varor i kvittot</p>
    )}
	</div>

	{/* Box för totalbeloppet */}
      <div className="receipt-total-box">
  <div className="receipt-total-text">
    <span className="receipt-total">Totalt:</span>
    <span className="receipt-tax">inkl 20% moms</span>
  </div>
  <span className="receipt-total-amount">{receipt.orderValue} SEK</span>
</div>
  </>
)}

</div>
          <div className="receipt-footer">
            <button
			onClick={handleNewOrder} // Anropa handleNewOrder
              className="receipt-navigation-button receipt-new-order"
            >
              GÖR EN NY BESTÄLLNING
             </button>
          </div>
        
      </div>
    </div>
  );
};

export default ReceiptPage;

