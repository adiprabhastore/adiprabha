"use client";
export default function Home() {
    return (
        <section className="text-4xl w-[100vw] ">
            <div className="bg-white">
                <div className=" flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        Your Orders
                    </a>
                </div>

                <div className="flex items-center justify-center h-96">
                    <p className="text-2xl font-semibold">No Orders</p>
                </div>
            </div>
        </section>
    );
}
