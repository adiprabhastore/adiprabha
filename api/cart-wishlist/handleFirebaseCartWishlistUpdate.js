import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/db/firebase";

// Simplified Firebase update function that works for both "cart" and "wishlist"
export const handleFirebaseUpdate = async (
  userEmail,
  productData,
  dataType,
  orderCount = null
) => {
  console.log("userEmail: ", userEmail);
  console.log("productData: ", productData);
  console.log("dataType: ", dataType);
  console.log("orderCount: ", orderCount);

  if (!["cart", "wishlist"].includes(dataType)) {
    throw new Error("Invalid data type. Must be either 'cart' or 'wishlist'");
  }

  const userDocRef = doc(db, "user", userEmail);

  try {
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.log("User document does not exist");
      return { success: false, message: "User document does not exist" };
    }

    const userData = userDoc.data()[dataType] || [];
    const existingItem = userData.find((item) => item.id === productData.id);

    if (existingItem) {
      // Remove the item if it already exists
      await updateDoc(userDocRef, {
        [dataType]: arrayRemove(existingItem),
      });
      console.log(`Item removed from Firebase ${dataType}`);
      return { success: true, message: `Item removed from ${dataType}` };
    } else {
      // Build the new item based on the provided properties
      const newItem = {
        id: productData.id,
        category: productData.category,
        name: productData.name,
        price: productData.price,
        Discount: productData.Discount,
        Shipping: productData.Shipping,
        Sourcing: productData.Sourcing,
        image: productData.image,
        quantity: productData.quantity || orderCount || 1,
      };

      await updateDoc(userDocRef, {
        [dataType]: arrayUnion(newItem),
      });
      console.log(`Item added to Firebase ${dataType}`);
      return { success: true, message: `Item added to ${dataType}` };
    }
  } catch (error) {
    console.error(`Error updating Firebase ${dataType}:`, error);
    return { success: false, message: `Error updating Firebase ${dataType}` };
  }
};

// Helper functions to call the update for cart and wishlist separately
export const handleFirebaseCartUpdate = (userEmail, productData, orderCount) =>
  handleFirebaseUpdate(userEmail, productData, "cart", orderCount);

export const handleFirebaseWishListUpdate = (userEmail, productData) =>
  handleFirebaseUpdate(userEmail, productData, "wishlist");
