import { useProductStore } from "@/stores/product-store";
import { useState } from "react";

const Filter = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const showUserAskedProduct = useProductStore((state) => state.showUserAskedProduct);
    const resetProduct = useProductStore((state) => state.resetProduct);

    const handleClick = (cbfn: () => void) => {
        cbfn();
        setFilterOpen(false);
    };

    return (
        <div className="relative h-10">
            <div
                className="bg-amber-50 h-full w-20 rounded-lg flex items-center justify-center font-mono cursor-pointer"
                onClick={() => {
                    setFilterOpen((s) => !s);
                }}
            >
                Filter
            </div>
            {filterOpen && (
                <div className="bg-amber-50 mt-2 absolute w-50 rounded-lg -left-24">
                    <ul className="flex p-3 gap-2 flex-col divide-black divide-y">
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(() => showUserAskedProduct("fresh"));
                            }}
                        >
                            Fresh Product
                        </li>
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(() => showUserAskedProduct("expiring-soon"));
                            }}
                        >
                            Expiring soon Product
                        </li>
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                handleClick(() => showUserAskedProduct("expired"));
                            }}
                        >
                            Expired Product
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

export default Filter;
