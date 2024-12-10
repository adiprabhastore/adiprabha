"use client";
import ShopWithUs from "./ShopWithUs";
import Tabs from "@/components/landing/Tabs";
import Testimonials from "./Testimonials";
import Carousel from "./Carousel";
import React from "react";
import BookCategories from "@/components/landing/BookCategories";
const Home = () => {
    return (
        <section className="relative w-full ">
            <Carousel />

            <BookCategories />

            <Tabs />
            <ShopWithUs />
            <Testimonials />
        </section>
    );
};

export default Home;
