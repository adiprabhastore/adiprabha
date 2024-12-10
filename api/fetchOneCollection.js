import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchOneCollection(colln) {
    try {
        const collectionRef = collection(db, colln);
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
            const categoryData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return categoryData;
        } else {
            return []; // If empty, initialize with an empty array
        }
    } catch (error) {
        console.error("Error fetching collections data:", error.message);
        throw error;
    }
}
