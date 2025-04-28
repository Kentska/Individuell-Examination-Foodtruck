// Meny för beställning
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../features/menuSlice";
import { RootState, AppDispatch } from "../store/store";

const MenuComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu.items);
  const status = useSelector((state: RootState) => state.menu.status);
  const error = useSelector((state: RootState) => state.menu.error);

  const apiKey = "din-api-nyckel"; // Lägg in giltig API-nyckel här

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenu(apiKey));
    }
  }, [dispatch, status, apiKey]);

  return (
    <div>
      <h1>Menu</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>
          {menu.map((item) => (
            <li key={item.id}>{item.name} - {item.price} SEK</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuComponent;