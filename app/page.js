"use client";
import LandingPage from "@/components/landing/LandingPage";
import { useEffect } from "react";
// import { getUserCart } from "@/api/cart/getUserCart";
import { getUserCart } from "@/api/cart-wishlist/getUserCartWishlist";
import { useAuth } from "@/hooks/useAuth";

import globalStore from "@/store/globalStore";
// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export default function Home() {
    const { cartItems, addToCart, removeFromCart, isInCart } = globalStore();
    const { user, loading } = useAuth();
    useEffect(() => {
        const f = async () => {
            if (!user) {
                return;
            }
            const data = await getUserCart(user.email);
            data.forEach((item) => {
                addToCart(item);
            });
        };
        f();
    }, [user]);
    return (
        <section className="text-4xl w-[100vw] ">
            <LandingPage />
        </section>
    );
}
