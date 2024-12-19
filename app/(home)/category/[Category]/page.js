"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOneCollection } from "@/api/fetchOneCollection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const Page = () => {
    const { Category } = useParams();
    const [decodedCategory, setDecodedCategory] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        const decoded_category = decodeURIComponent(Category);
        setDecodedCategory(decoded_category);

        fetchOneCollection(decoded_category).then((data) => {
            setCategoryData(data);
            console.log("categoryData", data);
        });
    }, [Category]);

    return (
        <div className="  md:px-[6rem] min-h-[100vh]">
            <div className="flex   justify-between items-center py-4 my-auto h-fit mx-auto md:mt-10 px-5 md:px-20 bg-slate-100">
                {/* Breadcrumb Navigation */}
                <div>
                    <div className="text-gray-600 text-sm flex space-x-2">
                        <a href="/" className="hover:text-gray-900">
                            HOME
                        </a>
                        <span>/</span>
                        <a href="/books" className="hover:text-gray-900">
                            BOOKS
                        </a>
                    </div>
                    <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
                        Books on {decodedCategory}
                    </h1>
                </div>

                <div className="">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 8c0-3.314-2.686-6-6-6S6 4.686 6 8c0 1.655.673 3.315 2 4.447v1.11a4 4 0 001.664 3.2l-1.575 2.363A6 6 0 018 18c-3.314 0-6-2.686-6-6 0-1.654.672-3.314 2-4.447V7.552A6 6 0 018 1h4c3.314 0 6 2.686 6 6 0 1.654-.672 3.315-2 4.447v1.11a4 4 0 01-1.664 3.2l1.575 2.363a6 6 0 00-.889-8.909z"
                            />
                        </svg>
                        Share
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3">
                {categoryData.length > 0 &&
                    categoryData.map((item, index) => (
                        <div
                            key={index}
                            className="carousel-item    mt-5  col-span-3 md:col-span-1"
                        >
                            <div className="bg-white rounded-lg   p-4 w-[21rem] mx-auto border border-gray-200 shadow-xl  ">
                                {" "}
                                {/* Adjusted the width to create a portrait layout */}
                                <Link
                                    href={`/product/${
                                        item.id
                                    }?collection=${encodeURIComponent(
                                        item.product.category
                                    )}`}
                                >
                                    {item && item.imageUrls.length > 0 && (
                                        <img
                                            src={item?.imageUrls[0]}
                                            alt={item?.imageUrls[0]}
                                            className="w-full h-auto object-cover rounded-md mb-4"
                                        />
                                    )}
                                    <h3 className="text-[1rem] leading-5 font-semibold ">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-sm mt-2 ">
                                        MRP:{" "}
                                        <span className="font-medium mx-2">
                                            ₹ {item.product.price}
                                        </span>
                                        {item.product.strikePrice && (
                                            <span className="text-red-500 text-sm mt-1 line-through">
                                                {item.product.strikePrice}
                                            </span>
                                        )}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Page;

export function SimpleSlider({ categoryData }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className="text-black" />,
        prevArrow: <SamplePrevArrow className="rounded-full" />,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            <p>hello</p>
        </Slider>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src="/arrow_right.png"
            className={className}
            style={{
                ...style,
                display: "block",

                background: "rgba(176, 149, 52, 0.3)", // Semi-transparent background
                borderRadius: "50%",
                width: "50px", // Change this to the size you want
                height: "50px", // Change this to the size you want
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src="/arrow_left.png"
            className={className}
            style={{
                ...style,
                display: "block",
                zIndex: "100",
                background: "rgba(176, 149, 52, 0.3)", // Semi-transparent background
                borderRadius: "50%",
                width: "50px", // Change this to the size you want
                height: "50px", // Change this to the size you want
            }}
            onClick={onClick}
        />
    );
}
