"use client";

import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";

const AuthLoader = () => {
    const setUser = useUserStore((state) => state.setUser);
    useEffect(() => {
        fetch("api/me")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
            });
    });

    return null;
};

export default AuthLoader;
