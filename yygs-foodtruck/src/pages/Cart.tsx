import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cartSlice';
import { RootState } from '../store/store';
import NavigationButton from '../components/Navigation';
import unionIcon from '../assets/union.svg';// Ensure this import is correct
import { fetchApiKey } from '../api/api'; // Adjust the import path as necessary
import { placeOrderApi } from '../api/orderApi'; // Adjust the import path as necessary
import { OrderData } from '../types/apiTypes';
import '../styles/Cart.scss';
const Cart: React.FC = () => {
  const dispatch = useDispatch();

  //Ensure default values for selectors to avoid rendering issues
  const selectedItems = useSelector((state: RootState) => state.cart.items || []);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice || 0);
  const loading = useSelector((state: RootState) => state.cart.loading || false);
  const error = useSelector((state: RootState) => state.cart.error || null);
  const navigate = useNavigate();
console.log("Selected Items:", selectedItems);


const handlePlaceOrder = async () => {
  if (selectedItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const apiKey = await fetchApiKey();
    const tenant = "9hiv";

    
	const orderData: OrderData = {
  items: selectedItems.reduce((acc, item) => {
    return acc.concat(Array(item.quantity).fill( item.id ));
  }, [] as number []), // Starta med en tom array
};

	console.log("selected items after update", selectedItems);
    console.log("Placing order with data:", JSON.stringify(orderData, null, 2));

    const response = await placeOrderApi(apiKey, tenant, orderData);

    console.log("Order Response:", response);

    // Extrahera order från svaret
    const { order } = response;

    if (!order || !order.id) {
      throw new Error("Order ID is missing in the response");
    }

    console.log("Order placed successfully!", order);

    // Navigera till ETA-sidan med ordernummer
    navigate("/eta", {
      state: {
        orderNumber: order.id, // Använd order.id från svaret
        eta: order.eta, // Skicka även ETA om det behövs
      },
    });
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place the order. Please try again.");
  }
};



  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="navigation-button-wrapper">
          <NavigationButton target="/" icon={unionIcon} />
        </div>
         
        <h2></h2>
		<div className="cart-items-box">
        {selectedItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="cart-item__name">{item.name}</span>
            <span className="cart-item__quantity">x{item.quantity}</span>
            <span className="cart-item__price">{item.price * item.quantity} SEK</span>
            <div className="cart-item__controls">
              <button
                className="cart-btn cart-btn__add"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
              <button
                className="cart-btn cart-btn__remove"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>
              <button
                className="cart-btn cart-btn__delete"
                onClick={() => dispatch(removeItem(item.id))}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
		</div>
        <div className="cart-bottom">
          <div className="cart-total">
            <span className="cart-total__label">Totalt:</span>
            <span className="cart-total__price">{totalPrice} SEK</span>
          </div>
          <button
            className="take-my-money-button"
            onClick={handlePlaceOrder}
            disabled={selectedItems.length === 0 || Boolean(loading)}
          >
            {loading ? "Placing Order..." : "TAKE MY MONEY!"}
          </button>
          {error && <p className="fel">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;

