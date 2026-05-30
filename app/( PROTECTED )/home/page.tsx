"use client";
import AddProduct from "@/components/addProduct";
import AddProductButton from "@/components/addProductButton";
import EditProduct from "@/components/EditProduct";
import Filter from "@/components/filter";
import IndividualProduct from "@/components/individualProduct";
import Product from "@/components/product";
import Sort from "@/components/sort";
import { useProductStore } from "@/stores/product-store";
import { useUserStore } from "@/stores/user-store";

const Page = () => {
    const isAddProductVisible = useProductStore((state) => state.addProductVisible);
    const editProductVisible = useProductStore((state) => state.editProductVisible);
    const individualProductVisible = useProductStore(
        (state) => state.individualProductVisible,
    );
    const allProduct = useProductStore((state) => state.displayedProducts);
    const userDetails = useUserStore((state) => state.user);
    const isOwner = useUserStore((state) => state.isOwner);
    const { usedProduct, totalProduct } = useProductStore((state) => state.badgesCount);
    return (
        <div className="mx-auto flex font-body flex-col pt-20 min-h-full ">
            {isAddProductVisible && <AddProduct />}
            {editProductVisible && <EditProduct />}
            {individualProductVisible && <IndividualProduct />}

            <div className="h-10  items-center justify-end flex right-0 gap-2 px-1">
                <div className="bg-amber-50 h-full px-5 rounded-lg flex items-center justify-center font-mono">
                    Waste Score : {((usedProduct / totalProduct) * 100).toFixed(2)}
                </div>
                <Sort />
                <Filter />
            </div>
            {allProduct && (
                <div className="mt-2 max-w-5xl w-full min-h-full grid gap-2 mx-auto grid-cols-2 md:grid-cols-3 items-stretch justify-items-center">
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
            <AddProductButton />
        </div>
    );
};

export default Page;
