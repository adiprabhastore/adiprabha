import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { fetchAllCollectionsData } from "@/api/fetchAllCollections";

import { tabData, productData } from "@/data/tabsData";

import allCollectionDataStore from "@/store/allCollectionDataStore";
const CuratedItems = () => {
    const { allCollectionsData, setAllCollectionsData } =
        allCollectionDataStore();

    const [tabData, setTabData] = useState({
        Religious: [],
        Spirituality: [],
        Purana: [],
        Ayurveda: [],
        "Art & Culture": [],
    });

    useEffect(() => {
        console.log("tabdata", tabData);
    }, [tabData]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = await fetchAllCollectionsData();
                console.log("allcollectiondata", allData);
                setAllCollectionsData(allData);

                const temp_tabData = {
                    Religious: [],
                    Spirituality: [],
                    Purana: [],
                    Ayurveda: [],
                    "Art & Culture": [],
                };
                temp_tabData.Religious = allData["Religious"] || [];
                temp_tabData.Spirituality = allData["Spirituality"] || [];
                temp_tabData.Purana = allData["Purana"] || [];
                temp_tabData.Ayurveda = allData["Ayurveda"] || [];
                temp_tabData["Art & Culture"] = allData["Art & Culture"] || [];

                setTabData(temp_tabData);
                console.log("tabData", tabData);
                /////////////////////////////////
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    const [activeTab, setActiveTab] = useState("Religious");
    const tabs = [
        { id: "Religious", label: "Religious" },
        { id: "Spirituality", label: "Spirituality " },
        { id: "Purana", label: "Purana" },
        { id: "Ayurveda", label: "Ayurveda" },
        { id: "Art & Culture", label: "Art & Culture" },
    ];

    return (
        <div className="p-5 max-w-7xl mx-auto py-10 my-10  ">
            <div className="container mx-auto">
                <h2 className="text-4xl font-semibold text-gray-700 mb-8 w-full text-center">
                    Discover Curated Items
                </h2>
                <div className="relative">
                    {/* Thin orange line spanning the entire width */}
                    <div className="absolute -top-0 left-0 right-0 h-[5px] opacity-55 bg-orange-400 "></div>

                    {/* Tab container */}
                    <div className="flex justify-between relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                py-2 px-4 text-lg font-semibold focus:outline-none
                ${
                    activeTab === tab.id
                        ? "text-orange-500 border-t-[10px]  border-orange-500 -mt-0.5"
                        : "text-gray-600 hover:text-gray-800"
                }
              `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Carousel for Active Tab */}
            <div className="carousel ">
                <SimpleSlider tabData={tabData} activeTab={activeTab} />
            </div>
        </div>
    );
};

export default CuratedItems;

export function SimpleSlider({ tabData, activeTab }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
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
        {tabData[activeTab].length > 0 &&
          tabData[activeTab]?.map((item, index) => (
            <div key={index} className="carousel-item mt-5">
              <div className="bg-white rounded-lg p-4 w-[21rem] mx-auto border border-red-500">
                {/* Adjusted the width to create a portrait layout */}
                <Link href={`/product/${item.id}?collection=${item.category}`}>
                  {item && item.imageUrls.length > 0 && (
                    <div className="w-full h-[300px] mb-4">
                      <img
                        src={item?.imageUrls[0]}
                        alt={item?.imageUrls[0]}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                  <h3 className="text-[1rem] leading-5 font-semibold">
                    {item.product.name}
                  </h3>
                  <p className="text-sm mt-2">
                    MRP:{" "}
                    {/* <span className="font-medium mx-2">
                      ₹ {item.product.price}
                    </span> */}
                    <span className="font-medium mx-2">
                      ₹{" "}
                      {(parseInt(item?.product?.price) || 0) +
                        (parseInt(item?.product?.Shipping) || 0) +
                        (parseInt(item?.product?.Sourcing) || 0) -
                        (parseInt(item?.product.Discount) || 0)}
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
