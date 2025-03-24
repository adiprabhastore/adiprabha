import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchBookByItemCode(item_code) {
  const categories = [
    "Buddhism",
    "Jainism",
    "Psychology",
    "Literature",
    "Bhagavad Gita",
    "Purana",
    "Yoga",
    "Vedic Maths",
    "Vedanta",
    "Spirituality",
    "Alternative Medicine",
    "Art & Culture",
    "Art and Architecture",
    "History",
    "Ayurveda",
    "Philosophy",
    "Tantra",
    "Astrology",
    "Religious",
    "Sanskrit",
  ];

  try {
    // Normalize the ISBN for case-insensitive comparison
    const normalizedItemCode = item_code.trim().toLowerCase();

    // Create an empty array to hold the matching book (if found)
    const matchingBook = [];

    // Loop through categories to find the book
    for (const category of categories) {
      const collectionRef = collection(db, category);
      const querySnapshot = await getDocs(collectionRef);

      if (!querySnapshot.empty) {
        for (const doc of querySnapshot.docs) {
          const bookData = doc.data();
          const productItemCode = bookData.product?.ItemCode?.toLowerCase();

          // Check if the book ISBN matches (case-insensitive)
          if (productItemCode && productItemCode.includes(normalizedItemCode)) {
            matchingBook.push({
              category: category,
              id: doc.id,
              ...bookData,
            });

            // Return the array containing the single matching book
            return matchingBook;
          }
        }
      }
    }

    // If no book is found, return an empty array
    return matchingBook;
  } catch (error) {
    console.error("Error fetching book by ISBN:", error.message);
    throw error;
  }
}
