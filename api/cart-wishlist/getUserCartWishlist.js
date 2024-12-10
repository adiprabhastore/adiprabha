import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

export const getUserData = async (userEmail, dataType) => {
    try {
        // Validate dataType
        if (!["cart", "wishlist"].includes(dataType)) {
            throw new Error(
                "Invalid data type. Must be either 'cart' or 'wishlist'"
            );
        }

        // Reference the user document by email
        const userDocRef = doc(db, "user", userEmail);

        // Fetch the document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // Retrieve the requested data type
            const userData = userDoc.data()[dataType];
            console.log(`User's ${dataType}:`, userData);
            return userData || [];
        } else {
            console.log("User document does not exist");
            return [];
        }
    } catch (error) {
        console.error(`Error fetching user ${dataType}:`, error);
        return [];
    }
};

// Helper functions for specific data types
export const getUserCart = (userEmail) => getUserData(userEmail, "cart");
export const getUserWishList = (userEmail) =>
    getUserData(userEmail, "wishlist");
