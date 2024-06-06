import { useEffect, useState } from "react";
import { auth, firestore } from "./init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log("Google login successful");
  } catch (error) {
    console.error("Google login failed", error);
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered:", user);
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });
    console.log("User data written to Firestore");
  } catch (error) {
    console.error("Error registering user:", error.message); // Updated error message
    if (error.code === "auth/operation-not-allowed") {
      console.error(
        "Operation not allowed. Make sure the method is enabled in Firebase."
      );
    }
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Email login successful");
  } catch (error) {
    console.error("Error logging in with email:", error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout successful");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export const useUser = () => {
  const [user, setUser] = useState(auth?.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return user;
};
