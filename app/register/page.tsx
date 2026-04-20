const Page = () => {
    return (
        <div className="w-90 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 flex flex-col gap-5">
            <h1 className="text-center font-bold text-3xl">Login</h1>
            <div className="flex gap-2 flex-col">
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="border rounded-lg h-8 border-neutral-400 px-2"
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="border rounded-lg h-8 border-neutral-400 px-2"
                        placeholder="johndoe@gmail.com"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="border rounded-lg h-8 border-neutral-400 px-2"
                        placeholder="johndoe@gmail.com"
                    />
                </div>
            </div>
            <button className="bg-black text-white h-10 rounded-lg hover:bg-neutral-900 cursor-pointer">
                Submit
            </button>
            <span className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="hover:underline ">
                    Login
                </a>
            </span>
        </div>
    );
};

export default Page;
