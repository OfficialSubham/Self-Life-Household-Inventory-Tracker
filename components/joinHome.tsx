import { useHandleOnChange } from "@/lib/utils";
import { useRouter } from "next/navigation";

const JoinHome = ({
    setIsCreateHome,
}: {
    setIsCreateHome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const { details, handleOnChange } = useHandleOnChange({
        inviteCode: "",
    });

    const handleJoinHome = async () => {
        const res = await fetch("/api/joinHome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        const result = await res.json();

        if (res.status != 200) return alert(result.message);
        router.push("/home");
    };

    return (
        <div className="flex flex-col gap-4 w-80">
            <input
                type="text"
                name="inviteCode"
                value={details.inviteCode}
                onChange={handleOnChange}
                className="border rounded-lg h-10 border-neutral-400 px-2"
                placeholder="Invite Code"
            />
            <button
                className="w-full bg-neutral-800 rounded-lg text-white py-2 cursor-pointer"
                onClick={handleJoinHome}
            >
                Join Home
            </button>
            {/* Create a component to show the invitations from room */}
            <p className="flex items-center gap-1 font-mono tracking-tight">
                Wanna create your own Home?{" "}
                <span
                    className="cursor-pointer hover:underline font-bold"
                    onClick={() => {
                        setIsCreateHome(() => true);
                    }}
                >
                    create
                </span>
            </p>
        </div>
    );
};

export default JoinHome;
