import { create } from "zustand";
// Update the isInCart function to accept an id
const allCollectionDataStore = create((set) => ({
    allCollectionsData: null,
    setAllCollectionsData: (data) => set({ allCollectionsData: data }),
}));

export default allCollectionDataStore;
