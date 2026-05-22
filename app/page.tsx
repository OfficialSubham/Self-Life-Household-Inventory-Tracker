"use client";

import CreateHome from "@/components/createHome";
import JoinHome from "@/components/joinHome";
import { useState } from "react";

const Page = () => {
    const [isCreateHome, setIsCreateHome] = useState(false);
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            {isCreateHome ? (
                <CreateHome setIsCreateHome={setIsCreateHome} />
            ) : (
                <JoinHome setIsCreateHome={setIsCreateHome} />
            )}
        </div>
    );
};

export default Page;
