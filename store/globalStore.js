import { create } from "zustand";
// Update the isInWishList function to accept an id
const globalStore = create((set) => ({
    cartItems: [],
    addToCart: (item) =>
        set((state) => {
            // Check if the item with the given id already exists
            const itemExists = state.cartItems.find((i) => i.id === item.id);

            // If item exists, filter out the old item, then add the new one
            const updatedCartItems = itemExists
                ? state.cartItems.filter((i) => i.id !== item.id)
                : state.cartItems;

            return {
                cartItems: [...updatedCartItems, item], // Add the new item
            };
        }),
    removeFromCart: (item) =>
        set((state) => ({
            cartItems: state.cartItems.filter((i) => i.id !== item.id),
        })),
    isInCart: (id) => {
        const found = globalStore.getState().cartItems.find((i) => i.id == id);
        return !!found; // Return true if found, otherwise false
    },

    wishListItems: [],
    addToWishList: (item) =>
        set((state) => {
            // Check if the item with the given id already exists
            const itemExists = state.wishListItems.find(
                (i) => i.id === item.id
            );

            // If item exists, filter out the old item, then add the new one
            const updatedwishListItems = itemExists
                ? state.wishListItems.filter((i) => i.id !== item.id)
                : state.wishListItems;

            return {
                wishListItems: [...updatedwishListItems, item], // Add the new item
            };
        }),
    removeFromWishList: (item) =>
        set((state) => ({
            wishListItems: state.wishListItems.filter((i) => i.id !== item.id),
        })),
    isInWishList: (id) => {
        const found = globalStore
            .getState()
            .wishListItems.find((i) => i.id == id);
        return !!found; // Return true if found, otherwise false
    },
}));

export default globalStore;
