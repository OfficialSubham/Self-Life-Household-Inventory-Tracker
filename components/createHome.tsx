import { useHandleOnChange } from "@/lib/utils";
import { stringValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

const CreateHome = ({
    setIsCreateHome,
}: {
    setIsCreateHome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const { details, handleOnChange } = useHandleOnChange({
        houseName: "",
    });

    const handleCreateHome = async () => {
        const trimmedHouseName = details.houseName.trim();
        const { success } = stringValidation.safeParse(trimmedHouseName);

        if (!success) return alert("Please Enter a Long House Name");

        const res = await fetch("/api/createHome", {
            method: "POST",
            body: JSON.stringify({ houseName: trimmedHouseName }),
        });
        if (res.status == 201) router.push("/home");
    };

    return (
        <div className="flex flex-col gap-4 w-80 ">
            <input
                type="text"
                name="houseName"
                value={details.houseName}
                onChange={handleOnChange}
                className="border rounded-lg h-10 border-neutral-400 px-2"
                placeholder="House name"
            />
            <button
                className="w-full bg-neutral-800 rounded-lg text-white py-2 cursor-pointer"
                onClick={handleCreateHome}
            >
                Create Home
            </button>
            <p className="flex items-center gap-1 font-mono tracking-tight ">
                Already have a invite code?{" "}
                <span
                    className="cursor-pointer hover:underline font-bold"
                    onClick={() => {
                        setIsCreateHome(() => false);
                    }}
                >
                    join
                </span>
            </p>
        </div>
    );
};

export default CreateHome;
