import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

export const removeItemFromData = async (userEmail, itemId, dataType) => {
    try {
        // Validate dataType
        if (!["cart", "wishlist"].includes(dataType)) {
            throw new Error(
                "Invalid data type. Must be either 'cart' or 'wishlist'"
            );
        }

        // Validate input parameters
        if (!userEmail || !itemId) {
            console.log("Invalid input parameters");
            return {
                success: false,
                message: "Invalid input parameters",
            };
        }

        // Reference the user document by email
        const userDocRef = doc(db, "user", userEmail);

        // Fetch the document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // Retrieve the data
            const userData = userDoc.data()[dataType] || [];

            // Filter out the item to be removed by its id
            const updatedData = userData.filter((item) => item.id !== itemId);

            // Update the user's data in Firestore using dynamic field name
            await updateDoc(userDocRef, { [dataType]: updatedData });

            console.log(`Item removed from ${dataType}:`, updatedData);
            return {
                success: true,
                message: `Item removed from ${dataType}`,
            };
        } else {
            console.log("User document does not exist");
            return {
                success: false,
                message: "User document does not exist",
            };
        }
    } catch (error) {
        console.error(`Error removing item from ${dataType}:`, error);
        return {
            success: false,
            message: `Error removing item from ${dataType}`,
        };
    }
};

// Helper functions to maintain original API
export const removeItemFromCart = (userEmail, itemId) =>
    removeItemFromData(userEmail, itemId, "cart");

export const removeItemFromWishList = (userEmail, itemId) =>
    removeItemFromData(userEmail, itemId, "wishlist");
