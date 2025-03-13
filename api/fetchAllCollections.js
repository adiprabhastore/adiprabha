import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchAllCollectionsData() {
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
    "History",
    "Ayurveda",
    "Philosophy",
    "Tantra",
    "Astrology",
    "Religious",
    "Sanskrit",
  ];

  const allCollectionsData = {};

  try {
    // Use Promise.all to fetch all categories in parallel
    const promises = categories.map(async (category) => {
      const collectionRef = collection(db, category);
      const querySnapshot = await getDocs(collectionRef);

      if (!querySnapshot.empty) {
        const categoryData = querySnapshot.docs.map((doc) => ({
          category: category,
          id: doc.id,
          ...doc.data(),
        }));
        allCollectionsData[category] = categoryData;
      } else {
        allCollectionsData[category] = []; // If empty, initialize with an empty array
      }
    });

    await Promise.all(promises); // Wait for all promises to resolve
    return allCollectionsData;
  } catch (error) {
    console.error("Error fetching collections data:", error.message);
    throw error;
  }
}
