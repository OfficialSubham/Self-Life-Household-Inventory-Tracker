"use client";
import { useHandleOnChange } from "@/lib/utils";

type RoomIdType = {
    roomId: string;
};

const Page = () => {
    const { details, handleOnChange } = useHandleOnChange<RoomIdType>({
        roomId: "",
    });

    const handleJoinHome = () => {
        console.log(typeof details.roomId);
    };

    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        name="roomId"
                        value={details.roomId}
                        onChange={handleOnChange}
                        className="border rounded-lg h-10 border-neutral-400 px-2"
                        placeholder="1234"
                    />
                    <button
                        className="w-full bg-neutral-800 rounded-lg px-4 text-white py-2 cursor-pointer"
                        onClick={handleJoinHome}
                    >
                        Join Home
                    </button>
                </div>
                <button className="w-full bg-neutral-800 rounded-lg text-white py-2 cursor-pointer">
                    Create Home
                </button>
            </div>
        </div>
    );
};

export default Page;
