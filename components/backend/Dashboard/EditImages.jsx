"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    list,
    ref,
    uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/db/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { fetchOneProduct } from "@/api/fetchOneProduct";

const EditImages = ({ id, colln }) => {
    const [images, setImages] = useState([]);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpadating] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            setError(null);

            console.log(id, colln);

            try {
                const productData = await fetchOneProduct(id, colln);
                if (productData) {
                    setProduct(productData);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                setError(`Error fetching product: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id, colln]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
    const handleUploadImages = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to update this item?"
        );
        if (confirmDelete) {
            setUpadating(true);
            confirmUpload();
        }
    };

    const confirmUpload = async () => {
        try {
            const categoryFolder = colln;
            const productFolder = id;
            const path = `${categoryFolder}/${productFolder}/`;
            const folderRef = ref(storage, path);

            try {
                const result = await list(folderRef);

                const deletePromises = result.items.map((itemRef) =>
                    deleteObject(itemRef)
                );

                await Promise.all(deletePromises);

                console.log(
                    "All items in the folder have been deleted successfully"
                );
            } catch (error) {
                if (error.code === "storage/object-not-found") {
                    console.log("Folder does not exist in storage.");
                } else {
                    console.error("Error getting metadata:", error);
                }
            }

            const imageUrls = await Promise.all(
                images.map(async (image, index) => {
                    const imageRef = ref(
                        storage,
                        `${categoryFolder}/${productFolder}/image${
                            index + 1
                        }.jpg`
                    );
                    await uploadBytes(imageRef, image);
                    const imageUrl = await getDownloadURL(imageRef);
                    return imageUrl;
                })
            );

            const productRef = doc(db, colln, id);
            await updateDoc(productRef, {
                imageUrls: imageUrls,
            });

            setUpadating(false);

            toast.success("Product images uploaded successfully!");
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        } catch (error) {
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
            console.error("Error during image upload:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <div className="flex gap-4 justify-center items-center mb-8">
                {product?.imageUrls &&
                    product?.imageUrls.map((url, index) => (
                        <div
                            key={index}
                            className=" bg-gray-200 flex justify-center items-center"
                        >
                            <Image
                                height={844}
                                width={844}
                                src={url}
                                alt={`Image ${index + 1}`}
                                className="w-44 h-44"
                            />
                        </div>
                    ))}
            </div>

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

            <div>
                <button
                    type="button"
                    onClick={handleUploadImages}
                    disabled={images.length === 0}
                    className={`bg-blue-500 w-full text-white p-2 rounded-md mt-4 focus:outline-none hover:bg-blue-600 ${
                        updating && "cursor-not-allowed"
                    } ${
                        images.length === 0 && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    {updating ? "Uploading..." : "Upload Images"}
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditImages;

const UpdateImages = ({ images, setImages }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return; // Dragged outside the droppable area
        }

        const updatedImages = Array.from(images);
        const [movedImage] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, movedImage);

        setImages(updatedImages);
    };

    const handleDelete = (index) => {
        const updatedImages = Array.from(images);
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div>
                {images.length > 0 ? (
                    <DraggableImageList
                        images={images}
                        onDelete={handleDelete}
                    />
                ) : (
                    "No images found"
                )}
            </div>
        </DragDropContext>
    );
};

const DraggableImage = ({ img, index, onDelete }) => {
    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <Draggable draggableId={index.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative bg-gray-200 flex justify-center items-center"
                >
                    <Image
                        height={844}
                        width={844}
                        src={URL.createObjectURL(img)}
                        alt={`Image ${index + 1}`}
                        className="w-44 h-44"
                    />
                    <span className="absolute top-0 left-0 bg-black text-white p-2">
                        {index + 1}
                    </span>
                    <button
                        className="absolute top-0 right-0 bg-red-500 text-white p-2"
                        onClick={handleDelete}
                    >
                        X
                    </button>
                </div>
            )}
        </Draggable>
    );
};

const DraggableImageList = ({ images, onDelete }) => {
    return (
        <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex gap-4"
                >
                    {images.map((img, index) => (
                        <DraggableImage
                            key={index}
                            img={img}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
