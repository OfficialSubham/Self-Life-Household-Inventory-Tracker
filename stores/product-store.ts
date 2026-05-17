import { create } from "zustand";

type Product = {
    _id: number;
    householdId: number;
    addedBy: number;
    name: string;
    category: "other" | "produce" | "dairy" | "meat" | "pantry" | "frozen";
    expiryDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
    quantity: number;
};

export type ProductState = {
    addProductVisible: boolean;
    allProducts: Product[] | null;
};

export type ProductStoreActions = {
    showAddProduct: () => void;
    removeAddProduct: () => void;
    addProduct: (products: Product[]) => void;
};

export type ProductStore = ProductState & ProductStoreActions;

export const useProductStore = create<ProductStore>((set) => ({
    addProductVisible: false,
    allProducts: null,
    showAddProduct: () => set({ addProductVisible: true }),
    removeAddProduct: () => set({ addProductVisible: false }),
    addProduct: (products) => set({ allProducts: products }),
}));
