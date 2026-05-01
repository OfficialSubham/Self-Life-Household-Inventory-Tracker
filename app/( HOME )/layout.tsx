"use client";

import Loading from "@/components/loading";
import { useLoadingStore } from "@/stores/loading-store";
import { useEffect } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
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
        <div className="relative">
            {loading && <Loading />}
            {children}
        </div>
    );
};

export default HomeLayout;
