import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { updateFullCart } from "./cartServices";
import moment from "moment";
export async function createOrder(cart, orderID, userID, totalPrice) {
  const orderRef = doc(db, "users", userID, "orders", orderID);

  setDoc(orderRef, {
    cart,
    orderID,
    date: moment().format("DD-MM-YYYY"),
    totalPrice,
  });

  await updateFullCart(userID, []);
}

export async function fetchOrders(userID) {
  const ordersRef = collection(db, "users", userID, "orders");

  const ordersSnaphot = await getDocs(ordersRef);

  const formattedOrders = ordersSnaphot.docs.map((doc) => {
    const orderData = doc.data();

    return {
      orderID: orderData.orderID,
      date: orderData.date,
      totalPrice: orderData.totalPrice,
      items: orderData.cart,
    };
  });

  return formattedOrders;
}
