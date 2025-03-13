"use client";
import React, { useEffect, useState } from "react";

const FixedFields = ({ product, setProduct }) => {
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

  const handleChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  return (
    <>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Name:
        </label>
        <input
          type="text"
          value={product.name}
          className="border border-gray-300 p-2 w-full focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={product.availability}
          className="form-checkbox h-4 w-4 text-blue-500"
          onChange={(e) => handleChange("availability", e.target.checked)}
        />
        <label className="ml-2 text-gray-700 text-sm font-semibold">
          Availability
        </label>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Price (₹ ):
        </label>
        <input
          type="number"
          value={product.price}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </div>
      {/* 
            <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Strike Price (₹ ):
                </label>
                <input
                    type="number"
                    value={product.strikePrice}
                    className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                        handleChange("strikePrice", e.target.value)
                    }
                />
            </div> */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Shipping Price:
        </label>
        <input
          type="number"
          value={product.Shipping}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Shipping", e.target.value)}
        />
      </div>{" "}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Sourcing Price:
        </label>
        <input
          type="number"
          value={product.Sourcing}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Sourcing", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Discount (₹):
        </label>
        <input
          type="number"
          value={product.Discount}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Discount", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Category:
        </label>
        <select
          value={product.category}
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
      {/* 
            <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Short Description:
                </label>
                <textarea
                    value={product.shortDescription}
                    className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                        handleChange("shortDescription", e.target.value)
                    }
                />
            </div> */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Description:
        </label>
        <textarea
          value={product.description}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Item Code:
        </label>
        <input
          type="text"
          value={product.ItemCode}
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
          value={product.Author}
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
          value={product.Publisher}
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
          value={product.Language}
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
          value={product.Edition}
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
          value={product.ISBN}
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
          value={product.Pages}
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
          value={product.Cover}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Cover", e.target.value)}
        />
      </div>
      {/* <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Other Details:
                </label>
                <input
                    type="text"
                    value={product.OtherDetails}
                    className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                        handleChange("OtherDetails", e.target.value)
                    }
                />
            </div> */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Weight (gm):
        </label>
        <input
          type="number"
          value={product.Weight}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Weight", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Dimensions:
        </label>
        <input
          type="text"
          value={product.Dimensions}
          className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange("Dimensions", e.target.value)}
        />
      </div>
      {/* <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Shipping Details:
                </label>
                <textarea
                    value={product.shippingDetails}
                    className="border border-gray-300 p-2 w-full  focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                        handleChange("shippingDetails", e.target.value)
                    }
                />
            </div> */}
    </>
  );
};

export default FixedFields;
