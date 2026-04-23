import Navbar from "@/components/navbar";

const Page = () => {
    return (
        <div className="min-h-screen flex font-body flex-col">
            <Navbar />

            <div className="flex-1 mt-2 bg-amber-100">
                <div className="h-[1000px]"></div>
            </div>
        </div>
    );
};

export default Page;
