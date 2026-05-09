"use client";
import { createProduct } from "@/actions/productActions";
import { categoryEnum } from "@/db/schema";
import { useHandleOnChange } from "@/lib/utils";
import { productSchema } from "@/lib/validation";
import { useLoadingStore } from "@/stores/loading-store";
import { useProductStore } from "@/stores/product-store";
import { useEffect, useRef } from "react";

type ProductDetailsType = {
    productName: string;
    category: "other" | "produce" | "dairy" | "meat" | "pantry" | "frozen";
    quantity: number;
    expiryDate: string;
};

const AddProduct = () => {
    const addProductRef = useRef<HTMLDivElement | null>(null);
    const hideAddProduct = useProductStore((state) => state.removeAddProduct);
    const startLoading = useLoadingStore((state) => state.start);
    const stopLoading = useLoadingStore((state) => state.end);

    const { details, handleOnChange } = useHandleOnChange<ProductDetailsType>({
        productName: "",
        category: "other",
        quantity: 1,
        expiryDate: "",
    });

    const handleSubmit = async () => {
        const { success, error } = productSchema.safeParse(details);
        console.log(error);
        if (!success) return alert("Provide valid product details");
        startLoading();
        const res = await createProduct(details);
        stopLoading();
        if (!res) alert("Something went wrong please try after some time");
        else {
            alert(res.message);
            hideAddProduct();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                hideAddProduct();
            }
        };
        const handleClick = (event: MouseEvent) => {
            if (!addProductRef.current) return;
            if (!addProductRef.current.contains(event.target as Node)) {
                hideAddProduct();
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
        <div className="bg-black/50 backdrop-blur-xs fixed inset-0 items-center flex justify-center">
            <div
                className="w-120 bg-white rounded-2xl border p-4 gap-4 flex flex-col"
                ref={addProductRef}
            >
                <div className="flex flex-col">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        className="border rounded-lg h-10 border-neutral-400 px-2"
                        placeholder="Nutella"
                        value={details.productName}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        className="w-full h-10 border border-neutral-400 rounded-lg px-1"
                        name="category"
                        value={details.category}
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
                        placeholder="1"
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
                        placeholder="1"
                        value={details.expiryDate}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    className="bg-black text-white h-10 rounded-lg hover:bg-neutral-900 cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
