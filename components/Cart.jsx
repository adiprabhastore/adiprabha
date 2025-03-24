"use client";
import React, { useEffect, useState } from "react";
import globalStore from "@/store/globalStore";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { removeItemFromCart } from "@/api/cart-wishlist/removeItemFromCartWishlist";
import { toast } from "react-toastify";

// Example helper to load Razorpay script (if you have a payment flow).
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { cartItems, removeFromCart } = globalStore();
  const { user } = useAuth();

  // Price breakdown states
  const [subTotal, setSubTotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [sourcingTotal, setSourcingTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setSubTotal(0);
      setShippingTotal(0);
      setSourcingTotal(0);
      setDiscountTotal(0);
      setGrandTotal(0);
      return;
    }

    let sub = 0;
    let shipping = 0;
    let sourcing = 0;
    let discount = 0;

    cartItems.forEach((item) => {
      const quantity = item.quantity || 1;
      const priceVal = parseInt(item.price) || 0;
      const shippingVal = parseInt(item.Shipping) || 0;
      const sourcingVal = parseInt(item.Sourcing) || 0;
      const discountVal = parseInt(item.Discount) || 0;

      sub += priceVal * quantity;
      shipping += shippingVal * quantity;
      sourcing += sourcingVal * quantity;
      discount += discountVal * quantity;
    });

    setSubTotal(sub);
    setShippingTotal(shipping);
    setSourcingTotal(sourcing);
    setDiscountTotal(discount);
    setGrandTotal(sub + shipping + sourcing - discount);
  }, [cartItems]);

  const handleRemoveFromCart = async (item) => {
    removeFromCart({ id: item.id });
    if (user?.email) {
      const res = await removeItemFromCart(user.email, item.id);
      if (res.success) {
        toast.success("Item removed from cart");
      } else {
        toast.error("Error removing item from cart");
      }
    }
  };

  // Example function to handle a Razorpay payment (optional).
  const handleRazorpayPayment = async () => {
    if (!user?.email) {
      toast.error("Please login to proceed to payment");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay. Are you online?");
      return;
    }

    // In a real app, you'd generate an order on your server. For demo:
    const options = {
      key: "rzp_test_iXXoTR7hHddScK", // Replace with your test key
      amount: grandTotal*100,
      currency: "INR",
      name: "Adi Prabha",
      description: "Test Transaction",
      handler: (response) => {
        toast.success("Payment successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
      },
      prefill: {
        name: user?.displayName || "Test User",
        email: user?.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header / Title */}
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        {cartItems?.length > 0 && (
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
                  <span className="font-semibold text-gray-900">Shop</span>
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
                  <span className="font-semibold text-gray-900">Shipping</span>
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
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      {cartItems && cartItems.length > 0 ? (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          {/* Left: Order Summary */}
          <div className="px-4 pt-8">
            <p className="font-medium text-lg">Order Summary</p>
            <div className="relative flex flex-col rounded-lg bg-gray-100 w-full p-5 mt-3">
              {cartItems.map((item) => {
                const quantity = item.quantity || 1;
                const priceVal = parseInt(item.price) || 0;
                const shippingVal = parseInt(item.Shipping) || 0;
                const sourcingVal = parseInt(item.Sourcing) || 0;
                const discountVal = parseInt(item.Discount) || 0;

                // Calculate item total after shipping, sourcing, discount
                const itemTotal =
                  priceVal  +
                  shippingVal  +
                  sourcingVal  -
                  discountVal ;

                return (
                  <div
                    key={item.id}
                    className="relative flex flex-col rounded-lg bg-white sm:flex-row border-b mb-3 last:mb-0 last:border-b-0"
                  >
                    <div className="flex w-full flex-col px-4 py-4 text-sm text-gray-700">
                      <img
                        className="m-2 h-24 w-20 rounded-md border object-cover object-center"
                        src={item.image}
                        alt={item.name}
                      />
                      <span className="font-semibold text-base line-clamp-2 leading-5 pr-5 text-gray-900">
                        {item.name}
                      </span>
                      <div className="mt-1 flex gap-2 flex-wrap">
                        <p>Price: Rs {priceVal}</p>
                        <p>Shipping: Rs {shippingVal}</p>
                        <p>Sourcing: Rs {sourcingVal}</p>
                        <p className="text-red-600">
                          Discount: -Rs {discountVal}
                        </p>
                      </div>
                      <span className="mt-1">Quantity: {quantity}</span>
                      <p className="mt-2 text-base font-semibold text-gray-800">
                        {quantity} * {itemTotal} = {itemTotal * quantity}
                      </p>
                    </div>
                    {/* Remove button */}
                    <button
                      className="absolute top-4 right-2 text-red-500 hover:text-red-700 transition duration-200"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <X className="font-bold w-[25px]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Payment Details */}
          <div className="mt-8 px-4 pt-8 lg:mt-0">
            <div className="rounded-lg bg-white p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">
                Payment Details
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">Rs {subTotal}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">Rs {shippingTotal}</span>
              </div>

              {/* Sourcing */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Sourcing</span>
                <span className="font-medium">Rs {sourcingTotal}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium">-Rs {discountTotal}</span>
              </div>

              <hr />

              {/* Grand Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">Rs {grandTotal}</span>
              </div>

              <button
                onClick={handleRazorpayPayment}
                className="mt-4 w-full rounded-md bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors text-xl"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        // No items in cart
        <div className="flex items-center justify-center h-96">
          <p className="text-2xl font-semibold">No items in cart</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
