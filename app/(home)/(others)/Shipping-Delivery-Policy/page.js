import React from "react";

const page = () => {
    return (
        <div className="flex flex-col  justify-between items-center py-4 my-auto h-fit mx-auto md:mt-10 px-5 md:px-20 bg-slate-100 text-base">
            {" "}
            {/* Breadcrumb Navigation */}
            <div className="w-full">
                <div className="text-gray-600 text-sm flex space-x-2 w-full">
                    <a href="/" className="hover:text-gray-900">
                        HOME
                    </a>
                    <span>/</span>
                    <a href="/books" className="hover:text-gray-900">
                        Return & Refund Policy
                    </a>
                </div>
                <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
                    Return, Refund and Cancellation Policy
                </h1>
            </div>
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md min-h-screen">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Shipping Information
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        <strong>1. Purchasing</strong> - Purchasing is very
                        simple! Once you have found your book through search or
                        browse links, you can place it in your shopping cart.
                        Just click on the{" "}
                        <span className="font-semibold">
                            “Add to Shopping Cart”
                        </span>{" "}
                        button. Continue to make selections, and when you have
                        filled your shopping basket, you are ready to begin the
                        checkout process.
                    </p>

                    <p>
                        <strong>2. Shipping Process</strong> - Shipping starts
                        as soon as we receive your order and payment. Please
                        submit your complete postal address, including postal
                        code and telephone number, for faster transit. We ensure
                        careful packaging to deliver the product in perfect
                        condition.
                    </p>

                    <p>
                        <strong>3. Dispatch Timing</strong> - Orders placed
                        before 5 pm are dispatched the same day. Orders placed
                        afterward are shipped the following day.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 border-b pb-2">
                    Delivery Policy
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        We offer delivery by courier. Payment options include:
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Online payment (Net banking or through cards)</li>
                        <li>
                            All major Credit Cards / Net Banking (VISA, MASTER
                            CARD, AMERICAN EXPRESS)
                        </li>
                        <li>Demand Draft in advance</li>
                        <li>Cash-on-delivery</li>
                    </ul>

                    <p>
                        Orders are dispatched within{" "}
                        <span className="font-semibold">1-3 working days</span>,
                        though it may take an additional 3-4 days if the items
                        are sourced from outside. Courier delivery typically
                        takes 4-5 days from dispatch.
                    </p>

                    <p>
                        We use reputed courier services for timely delivery.
                        However, delays can occasionally occur due to regional
                        or internal factors. We provide customers with the
                        courier AWB number or postal receipt for tracking.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
