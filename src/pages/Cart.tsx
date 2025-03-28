import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cartSlice';
import { RootState } from '../store/store';
import NavigationButton from '../components/Navigation';
import unionIcon from '../assets/union.svg';
import { registerTenantAndPlaceOrder } from '../api/api'; // Ensure this import is correct

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  // Ensure default values for selectors to avoid rendering issues
  const menuItems = useSelector((state: RootState) => state.menu.items || []);
  const selectedItems = useSelector((state: RootState) => state.cart.items || []);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice || 0);
  const loading = useSelector((state: RootState) => state.cart.loading || false);
  const error = useSelector((state: RootState) => state.cart.error || null);

  const handlePlaceOrder = async () => {
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
      await registerTenantAndPlaceOrder("TenantName", orderData);
  
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  const addToCart = (itemId: number) => {
    // Logic to add an item from the menu to the cart
    dispatch(increaseQuantity(itemId));
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="navigation-button-wrapper">
          <NavigationButton target="/" icon={unionIcon} />
        </div>
        {menuItems.length > 0 && (
          <div className="menu-container">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <span className="menu-item__name">{item.name}</span>
                <span className="menu-item__price">{item.price} SEK</span>
                <button onClick={() => addToCart(item.id)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
        <h2>Your Cart</h2>
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

