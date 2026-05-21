import { categoryEnum } from "@/db/schema";
import { ProductDetails } from "@/lib/types";
import { useHandleOnChange } from "@/lib/utils";
import { useProductStore } from "@/stores/product-store";
import { useEffect, useRef } from "react";

const EditProduct = () => {
    const editProductRef = useRef<HTMLDivElement | null>(null);
    const toggelEditProduct = useProductStore((state) => state.toggleEditProduct);
    const editProductDetails = useProductStore((state) => state.editProductDetails);

    const { details, handleOnChange } = useHandleOnChange<ProductDetails>(
        editProductDetails!,
    );

    const handleUpdate = async () => {
        console.log("Handling Update");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                toggelEditProduct(false);
            }
        };
        const handleClick = (event: MouseEvent) => {
            if (!editProductRef.current) return;
            if (!editProductRef.current.contains(event.target as Node)) {
                toggelEditProduct(false);
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
        editProductDetails && (
            <div className="bg-black/50 backdrop-blur-xs fixed inset-0 items-center flex justify-center">
                <div
                    className="w-100 bg-white rounded-2xl border p-4 gap-4 flex flex-col"
                    ref={editProductRef}
                >
                    <div className="flex flex-col">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            className="border rounded-lg h-10 border-neutral-400 px-2"
                            placeholder="Nutella"
                            value={details.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            className="w-full h-10 border border-neutral-400 rounded-lg px-1"
                            name="category"
                            value={`${details.category}`}
                            onChange={handleOnChange}
                        >
                            {categoryEnum.enumValues.map((cat, idx) => {
                                return (
                                    <option value={cat} key={idx}>
                                        {cat[0].toUpperCase() + cat.slice(1)}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="border rounded-lg h-10 border-neutral-400 px-2"
                            value={details.quantity}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            className="border rounded-lg h-10 border-neutral-400 px-2"
                            value={
                                details.expiryDate
                                    ? new Date(details.expiryDate)
                                          .toISOString()
                                          .split("T")[0]
                                    : ""
                            }
                            onChange={handleOnChange}
                        />
                    </div>
                    <button
                        className="bg-black text-white h-10 rounded-lg hover:bg-neutral-900 cursor-pointer"
                        onClick={handleUpdate}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

export default EditProduct;
