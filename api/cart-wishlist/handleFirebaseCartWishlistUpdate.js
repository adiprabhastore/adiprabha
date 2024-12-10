import {
    doc,
    updateDoc,
    getDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "@/db/firebase";

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

    // Validate dataType
    if (!["cart", "wishlist"].includes(dataType)) {
        throw new Error(
            "Invalid data type. Must be either 'cart' or 'wishlist'"
        );
    }

    const userDocRef = doc(db, "user", userEmail);

    try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            console.log("User document does not exist");
            return {
                success: false,
                message: "User document does not exist",
            };
        }

        const userData = userDoc.data()[dataType] || [];
        const existingItem = userData.find(
            (item) => item.id === productData.id
        );

        if (existingItem) {
            // Remove item from Firebase
            await updateDoc(userDocRef, {
                [dataType]: arrayRemove(existingItem),
            });
            console.log(`Item removed from Firebase ${dataType}`);
            return {
                success: true,
                message: `Item removed from ${dataType}`,
            };
        } else {
            // Create new item based on dataType
            const newItem = {
                id: productData.id || "",
                category: productData.product?.category || "",
                name: productData.product?.name || "",
                price: productData.product?.price || "",
                // Use default image if imageUrls is empty or undefined
                image: productData.imageUrls?.[0] || "",
                ...(dataType === "cart" && {
                    discountPrice: productData.product?.strikePrice || "",
                    quantity: orderCount || 1,
                }),
                // Add any additional fields from your data structure
                Author: productData.product?.Author || "",
                Cover: productData.product?.Cover || "",
                Edition: productData.product?.Edition || "",
                ISBN: productData.product?.ISBN || "",
                ItemCode: productData.product?.ItemCode || "",
                Language: productData.product?.Language || "",
                OtherDetails: productData.product?.OtherDetails || "",
                Pages: productData.product?.Pages || "",
                Publisher: productData.product?.Publisher || "",
                Shipping: productData.product?.Shipping || "",
                Sourcing: productData.product?.Sourcing || "",
                Weight: productData.product?.Weight || "",
                availability: productData.product?.availability || false,
                description: productData.product?.description || "",
                shortDescription: productData.product?.shortDescription || "",
            };

            // Add new item to Firebase
            await updateDoc(userDocRef, {
                [dataType]: arrayUnion(newItem),
            });
            console.log(`Item added to Firebase ${dataType}`);
            return {
                success: true,
                message: `Item added to ${dataType}`,
            };
        }
    } catch (error) {
        console.error(`Error updating Firebase ${dataType}:`, error);
        return {
            success: false,
            message: `Error updating Firebase ${dataType}`,
        };
    }
};

// Helper functions to maintain original API
export const handleFirebaseCartUpdate = (userEmail, productData, orderCount) =>
    handleFirebaseUpdate(userEmail, productData, "cart", orderCount);

export const handleFirebaseWishListUpdate = (userEmail, productData) =>
    handleFirebaseUpdate(userEmail, productData, "wishlist");
