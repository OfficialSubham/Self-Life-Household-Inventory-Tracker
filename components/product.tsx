import { deleteProduct } from "@/actions/productActions";
import { ProductDetails } from "@/lib/types";
import { useLoadingStore } from "@/stores/loading-store";
import { useProductStore } from "@/stores/product-store";

const Product = ({
    isOwner,
    isProductCreator,
    productDetails,
}: {
    isOwner: boolean;
    isProductCreator: boolean;
    productDetails: ProductDetails;
}) => {
    const statusColors = {
        fresh: "bg-green-500",
        "expiring-soon": "bg-yellow-500",
        expired: "bg-red-500",
        used: "",
        wasted: "",
        null: "",
    };

    const startLoading = useLoadingStore((state) => state.start);
    const stopLoading = useLoadingStore((state) => state.end);
    const toggleEditProduct = useProductStore((state) => state.toggleEditProduct);
    const deleteTheProduct = useProductStore((state) => state.deleteTheProduct);
    const setEditProductDetails = useProductStore((state) => state.setEditProductDetails);

    const handleDeleteProduct = async () => {
        startLoading();
        try {
            const res = await deleteProduct(productDetails._id);
            if (!res) return alert("Something went wrong please try again later");
            deleteTheProduct(productDetails._id);
        } catch (error) {
            console.log("Error", error);
        } finally {
            stopLoading();
        }
    };

    return (
        <div className="bg-white py-10 w-50 lg:w-80 rounded-lg border border-neutral-400 p-4 flex flex-col gap-4">
            <h1 className="text-3xl font-bold font-heading">
                {productDetails.name.length > 18
                    ? productDetails.name.substring(0, 18) + "..."
                    : productDetails.name}
            </h1>
            <h3 className="font-heading text-xl">
                Category :{" "}
                <span className="text-lg font-bold">{productDetails.category}</span>
            </h3>
            <h3 className="font-heading text-xl">
                Quantity :{" "}
                <span className="text-lg font-bold">{productDetails.quantity}</span>
            </h3>
            <h1
                className={`px-2 py-1 w-fit text-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
                    productDetails.status && statusColors[productDetails.status]
                }`}
            >
                {productDetails.status}
            </h1>
            {(isOwner || isProductCreator) && (
                <div className="flex gap-4">
                    <button
                        className="flex-1 bg-blue-400 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => {
                            toggleEditProduct(true);
                            setEditProductDetails(productDetails);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="flex-1 bg-red-500 rounded-lg  px-4 py-2"
                        onClick={handleDeleteProduct}
                    >
                        delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;
