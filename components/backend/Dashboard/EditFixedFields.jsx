"uce client";

import { fetchOneProduct } from "@/api/fetchOneProduct";
import { uploadProduct } from "@/api/uploadProduct";
import { db } from "@/db/firebase";
import { doc, updateDoc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const EditFixedFields = ({ id, colln }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpadating] = useState(false);

  const [oldCategory, setOldCategory] = useState(null);

  const [AllCategories] = useState([
    "Buddhism",
    "Jainism",
    "Psychology",
    "Literature",
    "Bhagavad Gita",
    "Purana",
    "Yoga",
    "Vedic Maths",
    "Vedanta",
    "Spirituality",
    "Alternative Medicine",
    "Art & Culture",
    "History",
    "Ayurveda",
    "Philosophy",
    "Tantra",
    "Astrology",
    "Religious",
    "Sanskrit",
  ]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);

      console.log(id, colln);

      try {
        const productData = await fetchOneProduct(id, colln);
        if (productData) {
          console.log(productData);
          setProduct(productData.product);
          setOldCategory(productData.product.category);
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

  const handleChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleUploadTexts = () => {
    const update = window.confirm("Are you sure you want to update this item?");
    if (update) {
      setUpadating(true);
      confirmUpload();
    }
  };

  const confirmUpload = async () => {
    try {
      // if category is changed, delete the product from old category and add the product to new category
      // fetch images from old category and add to new category
      let old_images = [];
      let old_date = null;
      if (oldCategory != product.category) {
        const oldCategoryRef = doc(
          db,

          colln,
          id
        );
        const oldCategoryData = await getDoc(oldCategoryRef);
        if (oldCategoryData.exists()) {
          old_images = oldCategoryData.data().imageUrls;
          old_date = oldCategoryData.data().date;
        }

        // delete the product
        await deleteDoc(oldCategoryRef);

        // create new product
        const newProductRef = doc(db, product.category, id);
        await setDoc(newProductRef, {
          imageUrls: old_images,
          date: old_date,
          product: product,
        });
      } else {
        // otherwise, just update the product
        const productRef = doc(db, product.category, id);
        await updateDoc(productRef, {
          product: product,
        });
      }

      setUpadating(false);

      toast.success("Product uploaded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // setTimeout(() => {
      //     window.location.reload();
      // }, 1000);
      console.error("Error during image upload:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 grid grid-cols-2 w-full gap-4">
      <div>
        <div className="flex items-center w-fit rounded-md bg-green-300 p-2 text-4xl my-5 gap-5">
          <label className="  text-gray-700  font-bold">Availability</label>
          <input
            type="checkbox"
            checked={product?.availability ? true : false}
            className="form-checkbox h-8 w-8 text-blue-500"
            onChange={(e) => handleChange("availability", e.target.checked)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            value={product?.name}
            className="border border-gray-300 p-2 w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Price (₹ ):
          </label>
          <input
            type="number"
            value={product?.price}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Shipping Price (₹ ):
          </label>
          <input
            type="number"
            value={product?.Shipping}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Shipping", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Sourcing Price (₹ ):
          </label>
          <input
            type="number"
            value={product?.Sourcing}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Sourcing", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Discount (₹ ):
          </label>
          <input
            type="number"
            value={product?.Discount}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Discount", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Category:
          </label>
          <select
            value={product?.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {AllCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Description:
          </label>
          <textarea
            value={product?.description}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("description", e.target.value)}
            rows={5}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Item Code:
          </label>
          <input
            type="text"
            value={product?.ItemCode}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("ItemCode", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Author:
          </label>
          <input
            type="text"
            value={product?.Author}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Author", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Publisher:
          </label>
          <input
            type="text"
            value={product?.Publisher}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Publisher", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Language:
          </label>
          <input
            type="text"
            value={product?.Language}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Language", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Edition:
          </label>
          <input
            type="text"
            value={product?.Edition}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Edition", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            ISBN:
          </label>
          <input
            type="text"
            value={product?.ISBN}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("ISBN", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Pages:
          </label>
          <input
            type="number"
            value={product?.Pages}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Pages", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Binding:
          </label>
          <input
            type="text"
            value={product?.Cover}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Cover", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Weight (gm):
          </label>
          <input
            type="number"
            value={product?.Weight}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Weight", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Dimensions :
          </label>
          <input
            type="text"
            value={product?.Dimensions}
            className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange("Dimensions", e.target.value)}
          />
        </div>
      </div>

      <ToastContainer />
      <div className="col-span-2">
        <button
          onClick={handleUploadTexts}
          className={`bg-blue-500 w-full text-white p-2 mt-4 focus:outline-none hover:bg-blue-600 ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </div>
    </div>
  );
};

export default EditFixedFields;
