import { db } from "@/db/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function fetchOneProduct(id, colln) {
  try {
    const productRef = doc(db, colln, id);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      console.error(`No product found with id: ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product data:", error.message);
    throw error;
  }
}
