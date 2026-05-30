import { ProductDetails } from "@/lib/types";
import { calculateBadgesCountForAllProduct } from "@/lib/utils";
import { create } from "zustand";

const statusToBadgeKey = {
    fresh: "freshItems",
    "expiring-soon": "expiringSoonItems",
    expired: "expiredItems",
    used: "usedProduct",
} as const;

export type ProductState = {
    addProductVisible: boolean;
    editProductVisible: boolean;
    individualProductVisible: boolean;
    individualProduct: ProductDetails | null;
    editProductDetails: ProductDetails | null;
    allProducts: ProductDetails[] | null;
    displayedProducts: ProductDetails[] | null;
    badgesCount: {
        freshItems: number;
        expiringSoonItems: number;
        expiredItems: number;
        usedProduct: number;
        totalProduct: number;
    };
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
    showUserAskedProduct: (type: string) => void;
    toggleIndividualProduct: (show: boolean, product: ProductDetails | null) => void;
    showExpiredItemsWithin24Hrs: () => void;
};

export type ProductStore = ProductState & ProductStoreActions;

export const useProductStore = create<ProductStore>((set) => ({
    addProductVisible: false,
    allProducts: null,
    displayedProducts: null,
    editProductVisible: false,
    editProductDetails: null,
    individualProductVisible: false,
    individualProduct: null,
    badgesCount: {
        expiredItems: 0,
        expiringSoonItems: 0,
        freshItems: 0,
        usedProduct: 0,
        totalProduct: 0,
    },
    showAddProduct: () => set({ addProductVisible: true }),
    removeAddProduct: () => set({ addProductVisible: false }),
    setProducts: (products) =>
        set(() => {
            return {
                allProducts: products,
                displayedProducts: products,
                badgesCount: calculateBadgesCountForAllProduct(products),
            };
        }),
    addProduct: (product) =>
        set((state) => {
            const updatedBadge = { ...state.badgesCount };
            if (
                product.status == "expired" ||
                product.status == "expiring-soon" ||
                product.status == "fresh"
            )
                updatedBadge[statusToBadgeKey[product.status]]++;

            return {
                allProducts: state.allProducts?.concat(product),
                displayedProducts: state.allProducts?.concat(product),
                badgesCount: updatedBadge,
            };
        }),
    toggleEditProduct: (toggle) => set({ editProductVisible: toggle }),
    setEditProductDetails: (product) => set({ editProductDetails: product }),
    editTheProduct: (id, product) =>
        set((state) => {
            const updatedBadge = { ...state.badgesCount };
            const updatedProducts = state.allProducts?.map((eachProd) => {
                if (eachProd._id == id) {
                    if (
                        eachProd.status != product.status &&
                        product.status != "wasted" &&
                        product.status != null
                    ) {
                        updatedBadge[statusToBadgeKey[product.status]]++;
                    }
                    return product;
                }
                return eachProd;
            });

            return {
                allProducts: updatedProducts,
                displayedProducts: updatedProducts,
                badgesCount: updatedBadge,
            };
        }),
    deleteTheProduct: (id) =>
        set((state) => {
            const updatedBadge = {
                ...state.badgesCount,
                totalProduct: state.badgesCount.totalProduct - 1,
            };
            const updatedProducts = state.allProducts?.filter((eachProd) => {
                if (eachProd._id == id) {
                    if (eachProd.status != null && eachProd.status != "wasted")
                        updatedBadge[statusToBadgeKey[eachProd.status]]--;
                    return false;
                }
                return true;
            });
            return {
                allProducts: updatedProducts,
                displayedProducts: updatedProducts,
            };
        }),
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
    showUserAskedProduct: (type) =>
        set((state) => {
            if (!state.displayedProducts || !state.allProducts)
                return { displayedProducts: [] };

            return {
                displayedProducts: state.allProducts.filter(
                    (product) => product.status == type,
                ),
            };
        }),
    toggleIndividualProduct: (show, product) =>
        set(() => {
            if (product) {
                return { individualProductVisible: show, individualProduct: product };
            }
            return { individualProductVisible: false };
        }),
    showExpiredItemsWithin24Hrs: () =>
        set((state) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const oneDay = 24 * 60 * 60 * 1000;
            const expiringProducts = state.allProducts?.filter((eachProd) => {
                const expiringTime = new Date(eachProd.expiryDate!);
                if (
                    expiringTime.getTime() <= now.getTime() + oneDay &&
                    expiringTime.getTime() >= now.getTime()
                )
                    return true;
                return false;
            });

            return { displayedProducts: expiringProducts };
        }),
}));
