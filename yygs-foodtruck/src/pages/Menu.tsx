// Meny (även menypage)
import React, { useEffect, useState } from "react";
import "../styles/Menu.scss";
import NavigationButton from "../components/Navigation"; // Din NavigationButton-komponent
import unionIcon from "../assets/Union.svg";
import { fetchApiKey } from "../api/api"; // Importera funktionen för att hämta API-nyckeln
import { fetchMenuApi } from "../api/menuApi"; // Importera funktionen för att hämta menyn
import { MenuItem } from "../types/apiTypes"; // Typ för menyobjekt
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { RootState } from "../store/store"; // Typ för Redux-storen
import { addItem } from "../features/cartSlice"; // Redux-action för att lägga till varor i kundvagnen

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // State för menydata
  const [loading, setLoading] = useState<boolean>(true); // State för laddning
  const [error, setError] = useState<string | null>(null); // State för felhantering

  const dispatch = useDispatch(); // Redux dispatch
  const cartItems = useSelector((state: RootState) => state.cart.items); // Hämta kundvagnsdata från Redux-storen
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Dynamisk badge för antal varor i kundvagnen

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);

        // Hämta API-nyckeln
        const apiKey = await fetchApiKey();
        console.log("API Key fetched successfully:", apiKey);

        // Hämta menyn med API-nyckeln
        const data = await fetchMenuApi(apiKey);
        setMenuItems(data); // Sätt menydata i state
        setError(null); // Nollställ eventuella fel
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong"); // Hantera fel
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Avsluta laddning
      }
    };
    fetchMenuData();
  }, []);

  // Funktion för att lägga till en vara i kundvagnen
const addToCart = (item: MenuItem) => {
  const cartItem = { ...item, quantity: 1 }; // Lägg till en default-quantity
  dispatch(addItem(cartItem)); // Skicka det nya objektet till Redux
  console.log(`${item.name} has been added to your cart!`); // Visa en bekräftelse
};

  // Filtrera menyn baserat på typ
  const dips = menuItems.filter((item) => item.type === "dip");
  const drinks = menuItems.filter((item) => item.type === "drink");
  const otherItems = menuItems.filter((item) => item.type !== "dip" && item.type !== "drink");

  return (
    <div className="menu-page">
      <div className="background_image">
        <img src="/mmm 1.png" alt="bg" />
        {/* NavigationButton är placerad här */}
        <div className="navigation-button-wrapper">
          <NavigationButton target="/cart" icon={unionIcon} />
          {cartCount > 0 && <div className="badge">{cartCount}</div>} {/* Dynamisk badge */}
        </div>
      </div>
      <div className="menu-container">
        <h1 className="menu__title">MENY</h1>
        {loading && <p>Loading...</p>} {/* Visa laddningsmeddelande */}
        {error && <p className="error">{error}</p>} {/* Visa felmeddelande */}

        {/* Sektion för övriga menyobjekt */}
        <div className="menu-section">
          <h1 className="menu-section__title"></h1>
          <div className="menu-items">
            {otherItems.map((item) => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => addToCart(item)} // Gör hela menyrutan klickbar
              >
                <div className="menu-item__header">
                  <span className="menu-item__name">{item.name}</span>
                  <span className="menu-item__price">{item.price} SEK</span>
                </div>
                <p className="menu-item__ingredients">{item.ingredients?.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sektion för Dip */}
        <div className="menu-section">
          <h1 className="menu-section__title">DIP</h1>
          <div className="menu-items menu-items--dip">
            {dips.map((item) => (
              <div
                key={item.id}
                className="menu-item menu-item--dip"
                onClick={() => addToCart(item)}
              >
                <span className="menu-item__name">{item.name}</span>
                <span className="menu-item__price">{item.price} SEK</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sektion för Drink */}
        <div className="menu-section">
          <h1 className="menu-section__title">DRINK</h1>
          <div className="menu-items menu-items--drink">
            {drinks.map((item) => (
              <div
                key={item.id}
                className="menu-item menu-item--drink"
                onClick={() => addToCart(item)}
              >
                <span className="menu-item__name">{item.name}</span>
                <span className="menu-item__price">{item.price} SEK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;