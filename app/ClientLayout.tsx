"use client";
import { useLoadingStore } from "@/stores/loading-store";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";

export default function ClientLayout({
    user,
    children,
}: {
    children: React.ReactNode;
    user: {
        name: string;
        email: string;
        id: number;
        roomId: number | null;
    };
}) {
    const loading = useLoadingStore((state) => state.loading);
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    useEffect(() => {
        if (!setUser) return;
        setUser(user);
        console.log(user);
    }, [user, setUser]);

    return (
        <>
            {loading && <Loading />}
            {children}
        </>
    );
}
