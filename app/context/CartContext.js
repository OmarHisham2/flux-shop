"use client";
import { useState } from "react";

import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "./AuthContext"; // Ensure this path is correct
import {
  addToProfileCart,
  getCartItemsFromDB as getCloudCart,
  removeFromProfileCart,
  updateFullCart,
} from "../services/cartServices";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART": {
      const existingIndex = state.findIndex(
        (item) => item.title === action.payload.title
      );
      if (existingIndex > -1) {
        const newState = [...state];
        newState[existingIndex] = {
          ...newState[existingIndex],
          quantity: (newState[existingIndex].quantity || 1) + 1,
        };
        return newState;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_FROM_CART": {
      const existingItem = state.find(
        (item) => item.title === action.payload.title
      );

      if (!existingItem) return state;

      if (existingItem.quantity > 1) {
        return state.map((item) =>
          item.title === action.payload.title
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return state.filter((item) => item.title !== action.payload.title);
      }
    }

    case "MERGE_CARTS": {
      const { cloudItems, guestItems } = action.payload;
      const cartMap = new Map();

      cloudItems.forEach((item) => cartMap.set(item.title, { ...item }));
      guestItems.forEach((guestItem) => {
        if (cartMap.has(guestItem.title)) {
          const existing = cartMap.get(guestItem.title);
          existing.quantity =
            (existing.quantity || 1) + (guestItem.quantity || 1);
        } else {
          cartMap.set(guestItem.title, {
            ...guestItem,
            quantity: guestItem.quantity || 1,
          });
        }
      });
      return Array.from(cartMap.values());
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const { user } = useAuthContext();
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toggleCart = () => {
    if (orderPlaced) {
      setOrderPlaced(false);
      clearCart();
    }
    setCartOpen(!cartOpen);
  };

  const changeOrderPlacedStatus = (isPlaced) => {
    setOrderPlaced(isPlaced);
  };

  useEffect(() => {
    let isMounted = true;
    async function sync() {
      if (!user) {
        const localData = localStorage.getItem("cart");
        if (localData && isMounted) {
          dispatch({ type: "SET_CART", payload: JSON.parse(localData) });
        }
        return;
      }

      try {
        const localData = localStorage.getItem("cart");
        const guestItems = localData ? JSON.parse(localData) : [];
        const cloudItems = (await getCloudCart(user.uid)) || [];

        dispatch({ type: "MERGE_CARTS", payload: { cloudItems, guestItems } });

        if (guestItems.length > 0) {
          const cartMap = new Map();
          [...cloudItems, ...guestItems].forEach((i) => {
            const existing = cartMap.get(i.title);
            if (existing) existing.quantity += i.quantity || 1;
            else cartMap.set(i.title, { ...i, quantity: i.quantity || 1 });
          });

          await updateFullCart(user.uid, Array.from(cartMap.values()));
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.error("Cart Sync Error:", error);
      }
    }
    sync();
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      if (cartItems.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [cartItems, user]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    if (user) addToProfileCart(product, user.uid);
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
    if (user) removeFromProfileCart(product, user.uid);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.length,
        toggleCart,
        cartOpen,
        orderPlaced,
        changeOrderPlacedStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
