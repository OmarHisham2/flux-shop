import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
export async function addToProfileCart(product, id) {
  const cartRef = doc(db, "users", id, "cart", id);

  const cartSnapshot = await getDoc(cartRef);
  let items = [];

  if (cartSnapshot.exists()) {
    items = cartSnapshot.data().items || [];
  }

  const existingItemIndex = items.findIndex(
    (item) => item.title === product.title
  );
  if (existingItemIndex > -1) {
    const currentQuantity = items[existingItemIndex].quantity || 1;
    items[existingItemIndex].quantity = currentQuantity + 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }
  try {
    await setDoc(
      cartRef,
      {
        items,
      },
      { merge: true }
    );
    console.log(`${product} added to cart!`);
  } catch (error) {
    console.log("Cart Addition Failed: " + error);
  }
}

export async function removeFromProfileCart(product, id) {
  const cartRef = doc(db, "users", id, "cart", id);

  const cartSnapshot = await getDoc(cartRef);
  let items = [];

  if (cartSnapshot.exists()) {
    items = cartSnapshot.data().items || [];
  }

  const existingItemIndex = items.findIndex(
    (item) => item.title === product.title
  );
  if (existingItemIndex > -1) {
    const currentQuantity = items[existingItemIndex].quantity || 1;
    if (currentQuantity === 1) {
      items = items.filter(
        (item) => item.title !== items[existingItemIndex].title
      );
    } else {
      items[existingItemIndex].quantity = currentQuantity - 1;
    }
  } else {
    throw new Error("Cart Remova Failed -> Item Not Found!");
  }
  try {
    await setDoc(
      cartRef,
      {
        items,
      },
      { merge: true }
    );
    console.log(`${product} removed from cart!`);
  } catch (error) {
    console.log("Cart Removal Failed: " + error);
  }
}

export async function getCartItemsFromDB(id) {
  const cartRef = doc(db, "users", id, "cart", id);

  const cartSnapshot = await getDoc(cartRef);
  let items = [];

  if (cartSnapshot.exists()) {
    items = cartSnapshot.data().items || [];
  }

  return items;
}

export function getCartItemsFromLocalStorage() {
  const localItems = localStorage.getItem("cart");
  if (localItems) {
    const guestItems = JSON.parse(localItems);
    return guestItems;
  }
  return [];
}

export function getCartTotal(cartItems, shippingValue) {
  let sum = 0;
  cartItems.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return Number(sum + shippingValue);
}

export async function updateFullCart(id, items) {
  const cartRef = doc(db, "users", id, "cart", id);
  try {
    await setDoc(cartRef, { items }, { merge: true });
  } catch (error) {
    console.error("Failed to update full cart:", error);
  }
}
