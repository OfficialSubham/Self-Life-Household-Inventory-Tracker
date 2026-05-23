"use client";
import { useRouter } from "next/navigation";

const contents = ["Home", "About", "Profile", "Members"];

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="z-100 fixed top-2 flex items-center justify-center w-full">
            <div className="flex gap-10 w-fit h-12 items-center px-10 mt-2 rounded-2xl border backdrop-blur-3xl border-neutral-600 font-heading ">
                {contents.map((navLink, idx) => {
                    return (
                        <div
                            className="hover:underline cursor-pointer transition-discrete duration-300"
                            key={idx}
                            onClick={() =>
                                router.push(navLink[0].toLowerCase() + navLink.slice(1))
                            }
                        >
                            {navLink}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;
