import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchBooksByName(bookName) {
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
        "Art and Architecture",
        "History",
        "Ayurveda",
        "Philosophy",
        "Tantra",
        "Astrology",
        "Religious",
        "Sanskrit",
    ];

    const matchingBooks = [];

    try {
        // Normalize book name for case-insensitive search
        const normalizedBookName = bookName.toLowerCase();

        // Use Promise.all to fetch all categories in parallel
        const promises = categories.map(async (category) => {
            const collectionRef = collection(db, category);
            const querySnapshot = await getDocs(collectionRef);

            if (!querySnapshot.empty) {
                querySnapshot.docs.forEach((doc) => {
                    const bookData = doc.data();
                    const productName = bookData.product?.name?.toLowerCase();

                    // Check if the book name matches (case-insensitive)
                    if (
                        productName &&
                        productName.includes(normalizedBookName)
                    ) {
                        matchingBooks.push({
                            category: category,
                            id: doc.id,
                            ...bookData,
                        });
                    }
                });
            }
        });

        await Promise.all(promises); // Wait for all promises to resolve

        // Return matching books, or an empty array if none found
        return matchingBooks;
    } catch (error) {
        console.error("Error fetching books by name:", error.message);
        throw error;
    }
}
