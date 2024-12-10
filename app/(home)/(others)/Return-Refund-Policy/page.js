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
                    Return & Refund Policy
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        We offer a{" "}
                        <span className="font-semibold">
                            100% satisfaction guarantee
                        </span>{" "}
                        on products offered on our website. If you are not
                        satisfied with any of our products purchased from us, we
                        will provide a full refund (excluding delivery charges
                        and any applicable offers during purchase). Product
                        returns for a refund must be received back into our
                        warehouse within{" "}
                        <span className="font-semibold">7 days</span> from the
                        date of purchase.
                    </p>

                    <p>
                        When returning goods, please include the following
                        details:
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Your name and customer code</li>
                        <li>Order number and date of purchase</li>
                        <li>
                            Product name, payment mode, and reason for return
                        </li>
                    </ul>

                    <p className="font-semibold">Note</p>
                    <p>Books should not be damaged.</p>

                    <div className="mt-4 space-y-2">
                        <p>
                            <span className="font-semibold">
                                Mode of Payment
                            </span>{" "}
                            - Online Transfer, request routed through the
                            payment gateway.
                        </p>
                        <p>
                            <span className="font-semibold">Refund Timer</span>{" "}
                            - Refunds will be initiated within 7 days from the
                            date of order.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 border-b pb-2">
                    Cancellations Policy
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        You can cancel your order by sending an email or calling
                        us on the same day of your order before 5 pm. The entire
                        order amount will be refunded.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
