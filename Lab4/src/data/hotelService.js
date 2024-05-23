import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./init";

export const getHotels = async () => {
  try {
    const hotelsCollection = collection(firestore, "hotels");
    const hotelsSnapshot = await getDocs(hotelsCollection);
    const hotelsList = hotelsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched hotels from Firestore:", hotelsList);
    return hotelsList;
  } catch (error) {
    console.error("Error fetching hotels from Firestore:", error);
    return [];
  }
};

export const addHotel = async (hotel) => {
  try {
    const hotelsCollection = collection(firestore, "hotels");
    await addDoc(hotelsCollection, hotel);
    console.log("Hotel added to Firestore:", hotel);
  } catch (error) {
    console.error("Error adding hotel to Firestore:", error);
  }
};

export const updateHotel = async (id, updatedData) => {
  try {
    const hotelDoc = doc(firestore, "hotels", id);
    await updateDoc(hotelDoc, updatedData);
    console.log("Hotel updated successfully");
    return { id, ...updatedData };
  } catch (error) {
    console.error("Error updating hotel:", error);
  }
};
