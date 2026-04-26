import Image from "next/image";

const Loading = () => {
    return (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-white">
            <div className="w-20 h-20 relative">
                <Image alt="" src="/loading.gif" width={100} height={100} />
            </div>
        </div>
    );
};

export default Loading;
