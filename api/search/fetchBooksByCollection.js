import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

// Predefined categories (your collection names)
const categories = [
    "Buddhism",
    "Jainism",
    "Psychology",
    "Literature",
    "Bhagavad Gita",
    "Purana",
    "Mathematics",
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

// Helper function to find a matching category (case-insensitive)
function findMatchingCategory(query) {
    const normalizedQuery = query.trim().toLowerCase();
    return categories.find((category) =>
        category.toLowerCase().includes(normalizedQuery)
    );
}

export async function fetchBooksByCollection(query) {
    try {
        // Find the matching collection name
        const matchedCategory = findMatchingCategory(query);

        if (!matchedCategory) {
            throw new Error(`No matching category found for query: "${query}"`);
        }

        // Fetch the data from the matched collection
        const collectionRef = collection(db, matchedCategory);
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
            const categoryData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return categoryData;
        } else {
            return []; // If empty, return an empty array
        }
    } catch (error) {
        console.error("Error fetching collections data:", error.message);
        throw error;
    }
}
