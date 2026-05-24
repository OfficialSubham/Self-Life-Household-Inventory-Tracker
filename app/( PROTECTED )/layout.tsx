import { getUserWithAllProduct } from "@/actions/user";
import { redirect } from "next/navigation";
import ClientLayout from "./ClientLayout";
import Navbar from "@/components/navbar";
import { getHomeDetails } from "@/actions/homeActions";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const response = await getUserWithAllProduct();
    if (!response) redirect("/login");
    if (!response.user || !response.user.householdId) redirect("/");
    const houseDetails = await getHomeDetails();
    console.log("House Details ->", houseDetails);
    return (
        <div className="relative min-h-screen flex flex-row">
            <Navbar />
            <ClientLayout
                user={{ ...response.user }}
                items={response.items}
                houseDetails={houseDetails}
            >
                {children}
            </ClientLayout>
        </div>
    );
};

export default HomeLayout;
