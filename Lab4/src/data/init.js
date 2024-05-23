import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnXYWlFomuLEVocj8efHJtQJv0AHVs06w",
  authDomain: "travel-agency-6c727.firebaseapp.com",
  projectId: "travel-agency-6c727",
  storageBucket: "travel-agency-6c727.appspot.com",
  messagingSenderId: "396317351550",
  appId: "1:396317351550:web:1e44e9f7ee6e1999a5022f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
