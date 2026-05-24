import { ProductDetails } from "@/lib/types";
import { create } from "zustand";

export type ProductState = {
    addProductVisible: boolean;
    editProductVisible: boolean;
    editProductDetails: ProductDetails | null;
    allProducts: ProductDetails[] | null;
    displayedProducts: ProductDetails[] | null;
};

export type ProductStoreActions = {
    showAddProduct: () => void;
    removeAddProduct: () => void;
    setProducts: (products: ProductDetails[]) => void;
    addProduct: (product: ProductDetails) => void;
    toggleEditProduct: (toggle: boolean) => void;
    setEditProductDetails: (product: ProductDetails) => void;
    editTheProduct: (id: number, product: ProductDetails) => void;
    deleteTheProduct: (id: number) => void;
    sortProductsByExpiry: () => void;
    resetProduct: () => void;
    sortLexicographical: () => void;
};

export type ProductStore = ProductState & ProductStoreActions;

export const useProductStore = create<ProductStore>((set) => ({
    addProductVisible: false,
    allProducts: null,
    displayedProducts: null,
    editProductVisible: false,
    editProductDetails: null,
    showAddProduct: () => set({ addProductVisible: true }),
    removeAddProduct: () => set({ addProductVisible: false }),
    setProducts: (products) =>
        set({ allProducts: products, displayedProducts: products }),
    addProduct: (product) =>
        set((state) => ({
            allProducts: state.allProducts?.concat(product),
            displayedProducts: state.allProducts?.concat(product),
        })),
    toggleEditProduct: (toggle) => set({ editProductVisible: toggle }),
    setEditProductDetails: (product) => set({ editProductDetails: product }),
    editTheProduct: (id, product) =>
        set((state) => ({
            allProducts: state.allProducts?.map((eachProd) => {
                if (eachProd._id == id) return product;
                return eachProd;
            }),
            displayedProducts: state.allProducts,
        })),
    deleteTheProduct: (id) =>
        set((state) => ({
            allProducts: state.allProducts?.filter((eachProd) => eachProd._id != id),
            displayedProducts: state.allProducts,
        })),
    sortProductsByExpiry: () =>
        set((state) => {
            if (!state.allProducts || !state.displayedProducts)
                return { allProducts: [] };

            return {
                displayedProducts: [...state.displayedProducts].sort((a, b) => {
                    return (
                        new Date(a.expiryDate!).getTime() -
                        new Date(b.expiryDate!).getTime()
                    );
                }),
            };
        }),
    resetProduct: () => set((state) => ({ displayedProducts: state.allProducts })),
    sortLexicographical: () =>
        set((state) => {
            if (!state.allProducts || !state.displayedProducts)
                return { allProducts: [] };

            return {
                displayedProducts: [...state.displayedProducts].sort((a, b) => {
                    return a.name.localeCompare(b.name);
                }),
            };
        }),
}));
