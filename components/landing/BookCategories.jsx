import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const categories = [
  { name: "Buddhism", image: "/book-images/categories/bhuddhism.webp" },
  { name: "Jainism", image: "/book-images/categories/jainism.webp" },
  { name: "Psychology", image: "/book-images/categories/phsycology.webp" },
  { name: "Literature", image: "/book-images/categories/literature.webp" },
  {
    name: "Bhagavad Gita",
    image: "/book-images/categories/bhagvad-gita.webp",
  },
  { name: "Purana", image: "/book-images/categories/purana.webp" },
  { name: "Yoga", image: "/book-images/categories/yoga.png" },
  { name: "Vedic Maths", image: "/book-images/categories/vedic-maths.webp" },
  { name: "Vedanta", image: "/book-images/categories/vedanta.webp" },
  {
    name: "Spirituality",
    image: "/book-images/categories/spirituality.webp",
  },
  {
    name: "Alternative Medicine",
    image: "/book-images/categories/alternative-medicine.webp",
  },
  {
    name: "Art & Culture",
    image: "/book-images/categories/art-culture.webp",
  },
  // {
  //     name: "Art and Architecture",
  //     image: "/book-images/categories/art-architecture.webp",
  // },
  { name: "History", image: "/book-images/categories/history.webp" },
  { name: "Philosophy", image: "/book-images/categories/philosophy.webp" },
  { name: "Astrology", image: "/book-images/categories/astrology.webp" },

  { name: "Ayurveda", image: "/book-images/categories/ayurveda.jfif" },
  { name: "Tantra", image: "/book-images/categories/tantra.webp" },
  { name: "Religious", image: "/book-images/categories/relegious.webp" },
  { name: "Sanskrit", image: "/book-images/categories/sanskrit.webp" },
];

const BookCategories = () => {
  // State to control how many categories are shown
  const [visibleCount, setVisibleCount] = useState(12);

  // Function to show all categories when "More" is clicked

  // If we want to toggle between "More" and "Less", we can use this:
  // const handleToggle = () => {
  //     setVisibleCount(visibleCount === 12 ? categories.length : 12);
  // };

  return (
    <div className="text-center py-8 md:px-[12rem] my-10">
      <h2 className="text-4xl font-semibold text-gray-700 mb-8">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.slice(0, visibleCount).map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden   flex items-center justify-center mb-4">
              <Link href={`/category/${category.name}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  width={999}
                  height={999}
                />
              </Link>
            </div>
            <h4 className="text-sm font-medium uppercase">{category.name}</h4>
          </div>
        ))}
      </div>
      {visibleCount < categories.length ? (
        <button
          onClick={() => setVisibleCount(categories.length)}
          className="mt-8 px-6 py-2 bg-black text-white text-sm  rounded-3xl hover:bg-gray-800"
        >
          + More
        </button>
      ) : (
        <button
          onClick={() => setVisibleCount(12)}
          className="mt-8 px-6 py-2 bg-black text-white  text-sm  rounded-3xl hover:bg-gray-800"
        >
          + Less
        </button>
      )}
    </div>
  );
};

export default BookCategories;
