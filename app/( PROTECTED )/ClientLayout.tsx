"use client";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { ProductDetails } from "@/lib/types";
import { useProductStore } from "@/stores/product-store";

export default function ClientLayout({
    user,
    items,
    children,
    houseDetails,
}: {
    children: React.ReactNode;
    user: {
        name: string;
        email: string;
        _id: number;
        householdId: number | null;
    };
    items: ProductDetails[];
    houseDetails: {
        _id: number;
        name: string;
        inviteCode: string;
        wasteScore: number | null;
        ownerId: number;
    } | null;
}) {
    const setUser = useUserStore((state) => state.setUser);
    const setIsOwner = useUserStore((state) => state.setIsOwner);
    const setProducts = useProductStore((state) => state.setProducts);
    useEffect(() => {
        if (!setUser) return;
        setUser(user);
        if (houseDetails) {
            setIsOwner(houseDetails.ownerId == user._id);
        }
    }, [user, setUser, setIsOwner, houseDetails]);

    useEffect(() => {
        setProducts(items);
    }, [items, setProducts]);
    return (
        <div className="fixed pb-30 h-full w-full overflow-y-auto no-scrollbar">
            {children}
        </div>
    );
}
