"use client";

import { uploadProduct } from "@/api/uploadProduct";
import FixedFields from "@/components/backend/FixedFields";
import UpdateImages from "@/components/backend/UpdateImages";
import { db, storage } from "@/db/firebase";
import { useState } from "react";
// import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import { useAuth } from "@/hooks/useAuth";

const Upload = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        // strikePrice: "",
        discount: "",
        Shipping: "",
        Sourcing: "",
        availability: true,
        // shortDescription: "",
        description: "",
        category: "",
        ItemCode: "",
        Author: "",
        Publisher: "",
        Language: "",
        Edition: "",
        ISBN: "",
        Pages: "",
        Cover: "",
        Dimensions: "",
        Weight: "",
        // shippingDetails: "",
    });
    const [images, setImages] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const getRandomId = () => Math.floor(1000 + Math.random() * 9000);

    const showFieldEmptyToast = (fieldName) => {
        toast.error(`Please fill in the ${fieldName} field.`);
    };

    const showSuccessToast = () => {
        toast.success("Product uploaded successfully!");
    };

    const showErrorToast = (errorMessage) => {
        toast.error(`Error: ${errorMessage}`);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);

        const imageFiles = files.filter((file) => {
            const extension = file.name.split(".").pop().toLowerCase();
            return [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp", // Common formats
                "svg", // SVG (for vector images)
                "webp", // WebP (modern image format)
                "heic", // HEIC (used in iOS devices)
            ].includes(extension);
        });

        setImages((prevImages) => [...prevImages, ...imageFiles]);
    };

    const handleSubmit = async () => {
        setIsButtonDisabled(true);

        console.log("product is: ", product);
        const result = await uploadProduct(
            product,
            images,
            db,
            storage,
            showFieldEmptyToast,
            showSuccessToast,
            showErrorToast,
            getRandomId
        );
        if (!result.success) {
            console.error(result.message);
            setIsButtonDisabled(false);
        }
        if (result.success) {
            setIsButtonDisabled(false);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <div className="bg-white p-6 grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <UpdateImages images={images} setImages={setImages} />
                <div>
                    <h1 className="w-full font-bold text-black text-start my-4 text-2xl capitalize">
                        Add new images
                    </h1>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="w-full md:w-auto"
                    />
                </div>
            </div>

            <FixedFields product={product} setProduct={setProduct} />

            <ToastContainer />
            <div className="col-span-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`bg-blue-500 w-full text-white p-2 mt-4 focus:outline-none hover:bg-blue-600 ${
                        isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    // disabled={!isButtonDisabled}
                >
                    {isButtonDisabled ? "Uploading..." : "Upload Product"}
                </button>
            </div>
        </div>
    );
};

export default Upload;
