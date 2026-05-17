import { ProductDetails } from "@/lib/types";
import { create } from "zustand";

export type ProductState = {
    addProductVisible: boolean;
    allProducts: ProductDetails[] | null;
};

export type ProductStoreActions = {
    showAddProduct: () => void;
    removeAddProduct: () => void;
    setProducts: (products: ProductDetails[]) => void;
    addProduct: (product: ProductDetails) => void;
};

export type ProductStore = ProductState & ProductStoreActions;

export const useProductStore = create<ProductStore>((set) => ({
    addProductVisible: false,
    allProducts: null,
    showAddProduct: () => set({ addProductVisible: true }),
    removeAddProduct: () => set({ addProductVisible: false }),
    setProducts: (products) => set({ allProducts: products }),
    addProduct: (product) =>
        set((state) => ({
            allProducts: state.allProducts?.concat(product),
        })),
}));
