import { editProductUsage } from "@/actions/productActions";
import { useLoadingStore } from "@/stores/loading-store";
import { useProductStore } from "@/stores/product-store";
import { useEffect, useRef } from "react";

const IndividualProduct = () => {
    const addProductRef = useRef<HTMLDivElement | null>(null);
    const startLoading = useLoadingStore((state) => state.start);
    const stopLoading = useLoadingStore((state) => state.end);

    const toggleIndividualProduct = useProductStore(
        (state) => state.toggleIndividualProduct,
    );
    const editTheProduct = useProductStore((state) => state.editTheProduct);
    const individualProduct = useProductStore((state) => state.individualProduct);

    const statusColors = {
        fresh: "bg-green-500",
        "expiring-soon": "bg-yellow-500",
        expired: "bg-red-500",
        used: "bg-purple-400",
        wasted: "bg-gray-400",
        null: "",
    };

    const handleProductUsage = async (id: number, status: "used" | "wasted") => {
        if (!individualProduct) return;
        try {
            startLoading();
            const res = await editProductUsage(id, status);
            if (!res)
                return alert("Something went wrong please try again after some time");
            const editedProduct = {
                ...individualProduct,
                status,
            };
            editTheProduct(id, editedProduct);
            toggleIndividualProduct(false, null);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            stopLoading();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                toggleIndividualProduct(false, null);
            }
        };
        const handleClick = (event: MouseEvent) => {
            if (!addProductRef.current) return;
            if (!addProductRef.current.contains(event.target as Node)) {
                toggleIndividualProduct(false, null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    });
    return (
        individualProduct && (
            <div className="bg-black/50 backdrop-blur-xs fixed inset-0 items-center flex justify-center z-10">
                <div
                    className="w-100 bg-white rounded-2xl border p-4 gap-4 flex flex-col"
                    ref={addProductRef}
                >
                    <h1 className="font-bold font-body text-2xl">
                        {individualProduct.name.length <= 20
                            ? individualProduct.name
                            : individualProduct?.name.slice(0, 20) + "..."}
                    </h1>
                    <h3 className="font-heading text-xl">
                        Category :{" "}
                        <span className="text-lg font-bold">
                            {individualProduct.category}
                        </span>
                    </h3>
                    <h3 className="font-heading text-xl">
                        Quantity :{" "}
                        <span className="text-lg font-bold">
                            {individualProduct.quantity}
                        </span>
                    </h3>
                    <h1
                        className={`px-2 py-1 w-fit text-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
                            individualProduct.status &&
                            statusColors[individualProduct.status]
                        }`}
                    >
                        {individualProduct.status}
                    </h1>
                    <div className="flex flex-col gap-4">
                        <button
                            className="flex-1 bg-purple-400 px-4 py-2 rounded-lg cursor-pointer font-mono"
                            onClick={() => {
                                handleProductUsage(individualProduct._id, "used");
                            }}
                        >
                            Mark as Used
                        </button>
                        <button
                            className="flex-1 bg-gray-400 rounded-lg  px-4 py-2 font-mono"
                            onClick={() => {
                                handleProductUsage(individualProduct._id, "wasted");
                            }}
                        >
                            Mark as Wasted
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default IndividualProduct;
