import { useState } from "react";

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
