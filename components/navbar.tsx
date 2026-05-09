import { useRouter } from "next/navigation";

const contents = ["Home", "About", "Profile", "Members"];

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="sticky top-2 h-12 backdrop-blur-3xl flex items-center justify-center gap-10 w-fit mx-auto px-10 mt-2 rounded-2xl border border-neutral-600 font-heading">
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
    );
};

export default Navbar;
