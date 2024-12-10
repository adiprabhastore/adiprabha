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
                        Terms & Conditions
                    </a>
                </div>
                <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
                    Terms & Conditions
                </h1>
            </div>
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md min-h-screen">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Terms & Conditions
                </h2>

                <p className="text-gray-700 mb-4">
                    Sales will be subject to the following terms and conditions:
                </p>

                <ul className="list-decimal ml-5 space-y-4 text-gray-700">
                    <li>
                        Goods once sold will not be taken back or exchanged,
                        unless there is a manufacturing or binding defect.
                    </li>

                    <li>
                        The availability and prices of the products on this
                        website are based on the data provided by the supplier
                        or publisher of that product. It may vary at the actual
                        time of supply.
                    </li>

                    <li>
                        All disputes arising from the execution of this contract
                        shall be settled amicably through friendly negotiation.
                        In case a settlement cannot be reached, the case shall
                        be referred to a neutral third party, approved by both
                        parties, for arbitration. The arbitral award made by the
                        third party is final and binding on both parties.
                        <p className="mt-2">
                            All disputes between the seller and buyer shall be
                            resolved by an arbitration proceeding conducted at a
                            location selected by the arbitrator within the city
                            of{" "}
                            <span className="font-semibold">Delhi, India</span>.
                            This contract is issued under, and is subject to,
                            Delhi jurisdiction and law. The Delhi Courts shall
                            have exclusive jurisdiction to settle any disputes
                            which may arise out of or in connection with the
                            contract.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default page;
