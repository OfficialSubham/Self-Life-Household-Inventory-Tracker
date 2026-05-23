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
                <div className="border w-100 divide-y divide-gray-600">
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
