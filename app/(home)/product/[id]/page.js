"use client";
// app/product/[id]/page.js
import { useParams, useSearchParams } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";

import { useEffect } from "react";
// import { getUserWishList } from "@/api/wishlist/getUserWishList";
import { getUserWishList } from "@/api/cart-wishlist/getUserCartWishlist";
import { useAuth } from "@/hooks/useAuth";

import globalStore from "@/store/globalStore";

const ProductPage = () => {
    // Retrieve the dynamic 'id' from the URL
    const { id } = useParams();

    // Retrieve the 'category' query parameter from the URL
    const searchParams = useSearchParams();
    const category = searchParams.get("collection");

    const uid = decodeURIComponent(id);

    const { cartItems, addToWishList, removeFromCart, isInCart } =
        globalStore();
    const { user, loading } = useAuth();
    useEffect(() => {
        const f = async () => {
            if (!user) {
                return;
            }
            const data = await getUserWishList(user.email);
            console.log("user wishlist: ", data);
            data.forEach((item) => {
                addToWishList(item);
            });
        };
        f();
    }, [user]);
    return (
        <div>
            <ProductDetails id={uid} category={category} />
        </div>
    );
};

export default ProductPage;
