import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const bannerImages = [
    "/banner/banner1.webp",
    "/banner/banner2.webp",
    "/home-1.jpg",
    "/banner/banner3.webp",
];
const Carousel = () => {
    return (
        <section className="grid grid-cols-6 w-full  bg-white py-10  mx:px-10  ">
            <div className="  col-span-6 md:col-span-4   w-full  mx-auto ">
                <LazyLoad />
            </div>
            <div className="  flex w-full   flex-col justify-start items-center col-span-6 md:col-span-2">
                {/* <Image
                    src="/images/free-static-1.webp"
                    alt="image"
                    width={400}
                    height={400}
                    className="w-full h-[275px]"
                ></Image>
                <Image
                    src="/images/years-static-2.webp"
                    alt="image"
                    width={400}
                    height={400}
                    className="w-full h-[275px]"
                ></Image> */}

                <Image
                    src="/home-2.jpg"
                    alt="image"
                    width={400}
                    height={400}
                    className="   h-[90vh] w-auto"
                ></Image>
            </div>
        </section>
    );
};

export default Carousel;

function LazyLoad() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="slider-container  ">
            <Slider {...settings}>
                {bannerImages.map((image, index) => (
                    <div key={index} className="w-full  flex justify-center  ">
                        <img src={image} className="md:w-[95%] mx-auto" />
                    </div>
                ))}
            </Slider>
        </div>
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
                margin: "0px 25px",

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
                margin: "0px 25px",
                background: "rgba(176, 149, 52, 0.3)", // Semi-transparent background
                borderRadius: "50%",
                width: "50px", // Change this to the size you want
                height: "50px", // Change this to the size you want
            }}
            onClick={onClick}
        />
    );
}
