"use client";
import React, { useEffect, useState } from "react";
import globalStore from "@/store/globalStore";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
// import { removeItemFromCart } from "@/api/cart/removeItemFromCart";
import { removeItemFromCart } from "@/api/cart-wishlist/removeItemFromCartWishlist";
import { toast } from "react-toastify";
import { shippingCost } from "@/data/siteData";
const Checkout = () => {
    const { cartItems, addToCart, removeFromCart, isInCart } = globalStore();
    const { user, loading } = useAuth();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            const price = parseFloat(item.price); // Convert price to number
            const quantity = parseInt(item.quantity, 10); // Convert quantity to number (using base 10)

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });
        setTotalPrice(total);
    }, [cartItems]);

    console.log("cartItems: ", cartItems);

    const handleRemoveFromCart = async (item) => {
        removeFromCart({ id: item.id });

        // remove from firebase
        const email = user.email;
        const itemId = item.id;
        const res = await removeItemFromCart(email, itemId);
        if (res.success) {
            console.log("Item removed from cart");
            toast.success("Item removed from cart");
        } else {
            console.log("Error removing item from cart");
            toast.error("Error removing item from cart");
        }
    };
    return (
        <div className="bg-white">
            <div className=" flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">
                    Your Cart
                </a>
                {cartItems && cartItems?.length > 0 && (
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                        href="#"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </a>
                                    <span className="font-semibold text-gray-900">
                                        Shop
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                        href="#"
                                    >
                                        2
                                    </a>
                                    <span className="font-semibold text-gray-900">
                                        Shipping
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                        href="#"
                                    >
                                        3
                                    </a>
                                    <span className="font-semibold text-gray-500">
                                        Payment
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {cartItems && cartItems?.length > 0 ? (
                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                    <div className="px-4 pt-8">
                        <p className=" font-medium">Order Summary</p>

                        <div className="relative flex flex-col rounded-lg  bg-gray-100 w-full   p-5">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative flex flex-col rounded-lg bg-white sm:flex-row border-b"
                                >
                                    <img
                                        className="m-2 h-24 max-w-28 rounded-md border object-cover object-center"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <div className="flex w-full flex-col px-4 py-4 text-[1rem] ">
                                        <span className="font-semibold line-clamp-2 leading-5 pr-5">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-400">
                                            Quantity: {item.quantity}
                                        </span>
                                        <p className="text-lg font-bold">
                                            ${item.price}
                                        </p>
                                    </div>
                                    {/* Remove button */}
                                    <button
                                        className="absolute top-4 right-2   text-red-500 hover:text-red-700 transition duration-200"
                                        onClick={() => {
                                            handleRemoveFromCart(item);
                                        }}
                                    >
                                        <X className="font-bold w-[25px] " />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Payment Details</p>

                        <div className="">
                            <label
                                htmlFor="email"
                                className="mt-4 mb-2 block text-sm font-medium"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@gmail.com"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <label
                                htmlFor="card-holder"
                                className="mt-4 mb-2 block text-sm font-medium"
                            >
                                Card Holder
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="card-holder"
                                    name="card-holder"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Your full name here"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <label
                                htmlFor="card-no"
                                className="mt-4 mb-2 block text-sm font-medium"
                            >
                                Card Details
                            </label>
                            <div className="flex">
                                <div className="relative w-7/12 flex-shrink-0">
                                    <input
                                        type="text"
                                        id="card-no"
                                        name="card-no"
                                        className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <svg
                                            className="h-4 w-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="credit-expiry"
                                    className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="MM/YY"
                                />
                                <input
                                    type="text"
                                    name="credit-cvc"
                                    className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="CVC"
                                />
                            </div>
                            <label
                                htmlFor="billing-address"
                                className="mt-4 mb-2 block text-sm font-medium"
                            >
                                Billing Address
                            </label>
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative flex-shrink-0 sm:w-7/12">
                                    <input
                                        type="text"
                                        id="billing-address"
                                        name="billing-address"
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Street Address"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <img
                                            className="h-4 w-4 object-contain"
                                            src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <select
                                    type="text"
                                    name="billing-state"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="State">State</option>
                                </select>
                                <input
                                    type="text"
                                    name="billing-zip"
                                    className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="ZIP"
                                />
                            </div>
                            {/* Total */}
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Subtotal
                                    </p>
                                    <p className="font-semibold text-gray-900 text-2xl">
                                        ₹ {totalPrice}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Shipping
                                    </p>
                                    <p className="font-semibold text-gray-900 text-base">
                                        ₹ {shippingCost ? shippingCost : 0}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                    Total
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ₹ {totalPrice + shippingCost}
                                </p>
                            </div>
                        </div>
                        <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                            Place Order
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <p className="text-2xl font-semibold">No items in cart</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
