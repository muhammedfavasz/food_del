import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000/"; // Ensure this has a trailing slash
  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        `${url}api/cart/add`, // Correctly concatenates the URL
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeCart = async (itemId) => {
    // Update the local state first
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });

    // Send a request to the backend to update the cart
    if (token) {
      try {
        await axios.post(
          `${url}api/cart/remove`, // Correctly concatenates the URL
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };



  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) { // Ensure itemInfo is not undefined
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with ID ${item} not found in food_list`);
        }
      }
    }
    return totalAmount;
  };
  

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}api/food/list`); // Fixed URL
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}api/cart/get`, // Use template literal for concatenation
        {}, // Empty body for POST request
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData); // Ensure the response is correctly processed
      } else {
        console.error("Failed to load cart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
  

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
