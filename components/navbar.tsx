const Navbar = () => {
    return (
        <div className="sticky top-2 h-12 backdrop-blur-3xl flex items-center justify-center gap-10 w-fit mx-auto px-10 mt-2 rounded-2xl border border-neutral-600 font-heading">
            <div className="hover:underline cursor-pointer transition-discrete duration-300">
                Home
            </div>
            <div className="hover:underline cursor-pointer transition-discrete duration-300">
                Add Product
            </div>
            <div className="hover:underline cursor-pointer transition-discrete duration-300">
                About
            </div>
            <div className="hover:underline cursor-pointer transition-discrete duration-300">
                Profile
            </div>
        </div>
    );
};

export default Navbar;
