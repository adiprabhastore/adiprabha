import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

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

function findMatchingCategory(query) {
  const normalizedQuery = query.trim().toLowerCase();
  return categories.find((cat) => cat.toLowerCase().includes(normalizedQuery));
}

export async function fetchBook(params) {
  const { type, value } = params;
  if (!type || !value) throw new Error("Missing type or value in params");

  try {
    const normalizedValue = value.trim().toLowerCase();
    let matchingBooks = [];

    // Handle collection search
    if (type === "collection") {
      const matchedCategory = findMatchingCategory(normalizedValue);
      if (!matchedCategory) return [];
      const collectionRef = collection(db, matchedCategory);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map((doc) => ({
        category: matchedCategory,
        id: doc.id,
        ...doc.data(),
      }));
    }

    // Handle ISBN, ItemCode, and Name searches
    for (const category of categories) {
      const collectionRef = collection(db, category);
      const snapshot = await getDocs(collectionRef);

      for (const doc of snapshot.docs) {
        const data = doc.data();
        let isMatch = false;

        switch (type) {
          case "isbn":
            isMatch =
              data.product?.ISBN?.toLowerCase().includes(normalizedValue);
            break;
          case "itemCode":
            isMatch =
              data.product?.ItemCode?.toLowerCase().includes(normalizedValue);
            break;
          case "name":
            isMatch = data.product?.name
              ?.toLowerCase()
              .includes(normalizedValue);
            break;
          default:
            throw new Error("Invalid search type");
        }

        if (isMatch) {
          matchingBooks.push({
            category: category,
            id: doc.id,
            ...data,
          });

          // Early return for unique identifiers
          if (["isbn", "itemCode"].includes(type)) {
            return matchingBooks;
          }
        }
      }
    }

    return matchingBooks;
  } catch (error) {
    console.error(`Error fetching books by ${type}:`, error.message);
    throw error;
  }
}
