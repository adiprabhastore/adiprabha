"use client";
import React, { useEffect, useState } from "react";
import globalStore from "@/store/globalStore";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
// import { removeItemFromWishList } from "@/api/wishlist/removeItemFromWishList";
import { removeItemFromWishList } from "@/api/cart-wishlist/removeItemFromCartWishlist";
import { toast } from "react-toastify";
import { shippingCost } from "@/data/siteData";
const Checkout = () => {
    const { wishListItems, removeFromWishList } = globalStore();
    const { user, loading } = useAuth();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        wishListItems.forEach((item) => {
            const price = parseFloat(item.price); // Convert price to number
            const quantity = parseInt(item.quantity, 10); // Convert quantity to number (using base 10)

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });
        setTotalPrice(total);
    }, [wishListItems]);

    console.log("wishListItems: ", wishListItems);

    const handleRemoveFromWishList = async (item) => {
        removeFromWishList({ id: item.id });

        // remove from firebase
        const email = user.email;
        const itemId = item.id;
        const res = await removeItemFromWishList(email, itemId);
        if (res.success) {
            console.log("Item removed from wishlist");
            toast.success("Item removed from wishlist");
        } else {
            console.log("Error removing item from wishlist");
            toast.error("Error removing item from wishlist");
        }
    };
    return (
      <div className="bg-white min-h-[100vh]">
        <div className=" flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <p className="text-2xl font-bold text-gray-800">
            Your Wishlist ({wishListItems && wishListItems?.length} items)
          </p>
        </div>

        {wishListItems && wishListItems?.length > 0 ? (
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <div className="relative flex flex-col rounded-lg  bg-gray-100 w-full   p-5">
                {wishListItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-col rounded-lg bg-white sm:flex-row border-b my-1"
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

                      <p className="text-lg font-bold">
                        Rs{" "}
                        {(parseInt(item?.price) || 0) +
                          (parseInt(item?.Shipping) || 0) +
                          (parseInt(item?.Sourcing) || 0) -
                          (parseInt(item?.Discount) || 0)}
                      </p>
                    </div>
                    {/* Remove button */}
                    <button
                      className="absolute top-4 right-2   text-red-500 hover:text-red-700 transition duration-200"
                      onClick={() => {
                        handleRemoveFromWishList(item);
                      }}
                    >
                      <X className="font-bold w-[25px] " />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl font-semibold">No items in wishlist</p>
          </div>
        )}
      </div>
    );
};

export default Checkout;
