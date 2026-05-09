"use client";

import { useLoadingStore } from "@/stores/loading-store";
import Image from "next/image";
import { useEffect } from "react";

const Loading = () => {
    const loading = useLoadingStore((state) => state.loading);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        console.log("Running Use Effect");
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    return (
        loading && (
            <div className="z-10 fixed inset-0 flex items-center justify-center bg-white">
                <div className="w-20 h-20 relative">
                    <Image alt="" src="/loading.gif" width={100} height={100} />
                </div>
            </div>
        )
    );
};

export default Loading;
