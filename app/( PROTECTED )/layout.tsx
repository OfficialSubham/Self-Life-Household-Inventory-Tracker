import { getUserWithRoomStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const response = await getUserWithRoomStatus();
    if (!response) redirect("/login");

    const details = await response.json();
    console.log(details);
    if (!details.user || !details.roomId) redirect("/");
    return <div className="relative">{children}</div>;
};

export default HomeLayout;
