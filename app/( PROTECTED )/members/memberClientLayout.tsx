"use client";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import Member from "@/components/member";

export default function MemberClientLayout({
    members,
    houseDetails,
}: {
    houseDetails: {
        _id: number;
        name: string;
        inviteCode: string;
        wasteScore: number | null;
        ownerId: number;
    };
    members:
        | {
              name: string;
              email: string;
              _id: number;
              householdId: number | null;
          }[]
        | null;
}) {
    const setMembers = useUserStore((state) => state.setMembers);
    const allMembers = useUserStore((state) => state.members);
    useEffect(() => {
        if (!members) return;
        setMembers(members);
    }, [members, setMembers]);

    return (
        allMembers && (
            <>
                <div className="border w-100 divide-y divide-gray-600 relative">
                    <div className="p-4">
                        <span className="font-bold text-2xl font-body text-neutral-700">
                            Invitation Code
                        </span>
                        <br /> {houseDetails.inviteCode}{" "}
                        <button
                            className="border rounded-lg px-2 py-1 absolute right-2 top-7 cursor-pointer  z-10'"
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(
                                        houseDetails.inviteCode,
                                    );
                                    alert("Text Copied successfully");
                                } catch (error) {
                                    console.log("Text Copy Error", error);
                                    alert("Error while copying text ");
                                }
                            }}
                        >
                            Copy
                        </button>
                    </div>
                    {allMembers.map((m, idx) => {
                        return (
                            <Member
                                memberType={m.name}
                                isOwner={m?._id == houseDetails.ownerId}
                                key={idx}
                            />
                        );
                    })}
                </div>
            </>
        )
    );
}
