import { useState } from "react";
import { ProductDetails } from "./types";

export const useHandleOnChange = <T extends Record<string, unknown>>(initialState: T) => {
    const [details, setDetails] = useState<T>(initialState);
    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return { details, setDetails, handleOnChange };
};

export const calculateBadgesCountForAllProduct = (products: ProductDetails[]) => {
    let freshItems = 0;
    let expiringSoonItems = 0;
    let expiredItems = 0;

    for (const product of products) {
        if (product.status == "fresh") freshItems++;
        else if (product.status == "expired") expiredItems++;
        else expiringSoonItems++;
    }

    return {
        freshItems,
        expiredItems,
        expiringSoonItems,
    };
};
