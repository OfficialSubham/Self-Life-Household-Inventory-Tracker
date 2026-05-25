import { getAllMembers } from "@/actions/user";
import LeaveHomeButton from "@/components/leaveHomeButton";
import MemberClientLayout from "./memberClientLayout";

const Page = async () => {
    const members = await getAllMembers();
    if (!members?.users) return null;
    return (
        <div className="flex items-center justify-center min-h-screen relative w-full">
            <MemberClientLayout
                members={members.users}
                houseDetails={members.houseDetails}
            />
            <LeaveHomeButton />
        </div>
    );
};

export default Page;
