import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, db, firestore } from "./firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { addToProfileCart } from "./cartService";
export async function registerUser(
  name,
  email,
  password,
  address,
  phoneNumber
) {
  const existingCartItems = JSON.parse(localStorage.getItem("cart"));
  let response = null;
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredentials.user) {
      const user = userCredentials.user;
      await updateProfile(user, { displayName: name });

      await setDoc(
        doc(db, "users", userCredentials.user.uid, "information", user.uid),
        {
          id: user.uid,
          name,
          email,
          address,
          phoneNumber,
          creationDate: serverTimestamp(),
        }
      );
      if (existingCartItems) {
        console.log(existingCartItems);
        existingCartItems.forEach((item, index) => {
          addToProfileCart(item, user.uid);
        });
      }
    }
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        response = {
          message: "The email address is already in use by another account.",
        };
        break;
      case "auth/invalid-email":
        response = {
          message: "The email address is not valid.",
        };
        break;
      case "auth/weak-password":
        response = {
          message: "The password is too weak. Please use a stronger password.",
        };
        break;
      case "auth/operation-not-allowed":
        response = {
          message:
            "Email/password accounts are not enabled. Enable them in the Firebase console.",
        };
        break;
      default:
        response = {
          message:
            "An unexpected error has occured. Please try again later." +
            error.message,
        };
    }
  }
  return response;
}

export async function getUserData(id) {
  const docRef = doc(db, "users", id, "information", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists) {
    console.log(docSnap.data());
    return docSnap.data();
  } else return {};
}
