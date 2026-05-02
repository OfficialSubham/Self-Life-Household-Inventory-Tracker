"use client";
import { useLoadingStore } from "@/stores/loading-store";
import Loading from "@/components/loading";
import { useEffect } from "react";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const loading = useLoadingStore((state) => state.loading);

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

    return (
        <>
            {loading && <Loading />}
            {children}
        </>
    );
}
