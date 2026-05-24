import { useProductStore } from "@/stores/product-store";
import { useState } from "react";

const Sort = () => {
    const [sortOpen, setSortOpen] = useState(false);
    const sortProductByExpiry = useProductStore((state) => state.sortProductsByExpiry);
    const resetProduct = useProductStore((state) => state.resetProduct);
    const sortLexico = useProductStore((state) => state.sortLexicographical);

    const handleClick = (cbfn: () => void) => {
        cbfn();
        setSortOpen(false);
    };

    return (
        <div className="relative h-10">
            <div
                className="bg-amber-50 h-full w-20 rounded-lg flex items-center justify-center font-mono cursor-pointer"
                onClick={() => {
                    setSortOpen((s) => !s);
                }}
            >
                Sort
            </div>
            {sortOpen && (
                <div className="bg-amber-50 mt-2 absolute w-50 rounded-lg">
                    <ul className="flex p-3 gap-2 flex-col divide-black divide-y">
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(sortProductByExpiry);
                            }}
                        >
                            Date of expiry
                        </li>
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(sortLexico);
                            }}
                        >
                            A to Z
                        </li>
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(resetProduct);
                            }}
                        >
                            Reset
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
