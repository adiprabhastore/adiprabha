import { allBooksData } from "@/data/booksData";
export const fetchProductData = (id) => {
    const product = allBooksData.find((product) => product.id === id);
    return product;
};
