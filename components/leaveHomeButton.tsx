"use client";

import { leaveHome } from "@/actions/homeActions";
import { useLoadingStore } from "@/stores/loading-store";
import { useRouter } from "next/navigation";

const LeaveHomeButton = () => {
    const router = useRouter();
    const startLoading = useLoadingStore((state) => state.start);
    const stopLoading = useLoadingStore((state) => state.end);
    const handleLeaveHome = async () => {
        startLoading();
        const res = await leaveHome();
        stopLoading();
        if (res.status == 200) router.push("/");
        else alert("Something went wrong");
    };
    return (
        <div
            className="absolute bg-red-500 bottom-10 right-5 py-3 rounded-lg px-5 "
            onClick={handleLeaveHome}
        >
            Leave House
        </div>
    );
};

export default LeaveHomeButton;
