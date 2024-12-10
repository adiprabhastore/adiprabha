import React from "react";

const page = () => {
    return (
        <div className="flex flex-col  justify-between items-center py-4 my-auto h-fit mx-auto md:mt-10 px-5 md:px-20 bg-slate-100">
            {" "}
            {/* Breadcrumb Navigation */}
            <div className="w-full">
                <div className="text-gray-600 text-sm flex space-x-2 w-full">
                    <a href="/" className="hover:text-gray-900">
                        HOME
                    </a>
                    <span>/</span>
                    <a href="/books" className="hover:text-gray-900">
                        ABOUT
                    </a>
                </div>
                <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
                    About Adiprabha
                </h1>
            </div>
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md min-h-screen">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    About Us
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    We are dedicated to serving the academic community with a
                    broad range of serials and monographs covering topics such
                    as Religion, Philosophy, History, Culture, Arts,
                    Architecture, Archaeology, Language, Literature,
                    Linguistics, Mysticism, Yoga, Tantra, Medicine, Astrology,
                    Ayurveda, Social Science, and other related subjects. Our
                    extensive and diverse collection provides a wealth of
                    authoritative and academically rigorous resources,
                    indispensable for scholars and readers alike.
                </p>
            </div>
        </div>
    );
};

export default page;
