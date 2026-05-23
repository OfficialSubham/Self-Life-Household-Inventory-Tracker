"use client";
import AddProduct from "@/components/addProduct";
import AddProductButton from "@/components/addProductButton";
import EditProduct from "@/components/EditProduct";
import Product from "@/components/product";
import { useProductStore } from "@/stores/product-store";
import { useUserStore } from "@/stores/user-store";

const Page = () => {
    const isAddProductVisible = useProductStore((state) => state.addProductVisible);
    const editProductVisible = useProductStore((state) => state.editProductVisible);
    const allProduct = useProductStore((state) => state.allProducts);
    const userDetails = useUserStore((state) => state.user);
    const isOwner = useUserStore((state) => state.isOwner);
    return (
        <div className="flex-1 flex font-body flex-col pt-20 min-h-[200vh]">
            {isAddProductVisible && <AddProduct />}
            {editProductVisible && <EditProduct />}

            <div className="flex-1 mt-2 max-w-5xl mx-auto w-full">
                {allProduct && (
                    <div className="grid gap-2 mx-auto grid-cols-2 md:grid-cols-3 place-items-center">
                        {allProduct.map((p, idx) => {
                            return (
                                <Product
                                    key={idx}
                                    isOwner={isOwner}
                                    isProductCreator={userDetails?._id == p.addedBy}
                                    productDetails={p}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <AddProductButton />
        </div>
    );
};

export default Page;
