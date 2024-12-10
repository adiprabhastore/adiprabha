import React from "react";
import Slider from "react-slick";
import Image from "next/image";
const ProductCarousel = () => {
    return <LazyLoad />;
};

export default ProductCarousel;

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
                <div>
                    <img src={"/book-images/ayurveda-sangrah-1.jfif"} />{" "}
                </div>
                <div>
                    <img src={"/book-images/ayurveda-sangrah-1.jfif"} />{" "}
                </div>
                <div>
                    <img src={"/book-images/ayurveda-sangrah-1.jfif"} />{" "}
                </div>
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
