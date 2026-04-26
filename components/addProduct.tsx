"use client";
import { categoryEnum } from "@/db/schema";
import { useProductStore } from "@/stores/product-store";
import { useEffect } from "react";

const AddProduct = () => {
    const hideAddProduct = useProductStore((state) => state.removeAddProduct);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                console.log("hello");
                hideAddProduct();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <div className="bg-black/50 backdrop-blur-xs fixed inset-0 items-center flex justify-center">
            <div className="w-120 bg-white rounded-2xl border p-4 gap-4 flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className="border rounded-lg h-10 border-neutral-400 px-2"
                        placeholder="Nutella"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select className="w-full h-10 border border-neutral-400 rounded-lg">
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
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        className="border rounded-lg h-10 border-neutral-400 px-2"
                        placeholder="1"
                    />
                </div>
                <button className="bg-black text-white h-10 rounded-lg hover:bg-neutral-900 cursor-pointer">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
