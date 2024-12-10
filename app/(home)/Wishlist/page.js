"use client";
import { useEffect } from "react";
// import { getUserWishList } from "@/api/wishlist/getUserWishList";
import { getUserWishList } from "@/api/cart-wishlist/getUserCartWishlist";

import { useAuth } from "@/hooks/useAuth";

import WishList from "@/components/Wishlist";
import globalStore from "@/store/globalStore";

export default function Home() {
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
        <section className="text-4xl w-[100vw] ">
            <WishList />
        </section>
    );
}
