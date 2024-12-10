export const productData = [
    {
        id: "1",
        category: "Bhuddhism",
        title: "Bharatiya Darshan (Indian Philosophy)",
        images: [
            "/book-images/indian-philosophy/img0.webp",
            "/book-images/indian-philosophy/img2.jpg",
            "/book-images/indian-philosophy/img4.webp",
            "/book-images/indian-philosophy/img5.jpg",
            "/book-images/indian-philosophy/img7.webp",
        ],
        price: 1500,
        discountPrice: 1000,
        shortDescription:
            "Indian Philosophy is a comprehensive book that covers the various philosophies of India. The book is written in simple language and is easy to understand. The book is a must-have for all philosophy students and practitioners.",
        description:
            "This book is a comprehensive guide to the various philosophies of India. The book covers the various philosophies of India, including Hinduism, Buddhism, Jainism, and Sikhism. The book is written in simple language and is easy to understand. The book is a must-have for all philosophy students and practitioners.",
        productDetails: {
            itemCode: "HBA647",
            author: "Dr Govinda Parik",
            publisher: "Dev Publishers And Distributors",
            language: "English",
            edition: "2025",
            isbn: "9789359445892",
            pages: "69",
            cover: "Hardcover",
            dimensions: "9 x 6 inches",
            weight: "2.80 kg",
        },
    },
];

export const tabData = {
    newArrivals: productData,
    recentlySold: productData,
    bestSellers: productData,
    trending: productData,
    editorsPicks: productData,
};
