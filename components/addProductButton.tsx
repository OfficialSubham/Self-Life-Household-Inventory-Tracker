import { useProductStore } from "@/stores/product-store";

const AddProductButton = () => {
    const showProduct = useProductStore((state) => state.showAddProduct);

    return (
        <div
            className="fixed bottom-10 right-10 bg-orange-600 px-4 py-2 text-4xl font-bold text-white rounded-full cursor-pointer"
            onClick={showProduct}
        >
            +
        </div>
    );
};

export default AddProductButton;
