"use client";
import { userValidation } from "@/_lib/validation";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Page = () => {
    const router = useRouter();

    const passwordElmRef = useRef<HTMLInputElement>(null);

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        const { success } = userValidation.safeParse(userDetails);
        if (!success) return alert("Please enter valid details");
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });
        if (res.ok) {
            router.push("/dashboard");
            return;
        }
        const err = await res.json();
        alert(err.message);
    };

    return (
        <div className="w-90 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 flex flex-col gap-5">
            <h1 className="text-center font-bold text-3xl">Login</h1>
            <div className="flex gap-2 flex-col">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={userDetails.email}
                        onChange={handleOnchange}
                        className="border rounded-lg h-8 border-neutral-400 px-2"
                        placeholder="johndoe@gmail.com"
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <input
                        type="password"
                        className="w-full border rounded-lg h-8 border-neutral-400 px-2"
                        placeholder="johndoe@gmail.com"
                        name="password"
                        value={userDetails.password}
                        onChange={handleOnchange}
                        ref={passwordElmRef}
                    />
                    <input
                        type="checkbox"
                        className="peer appearance-none h-5 w-5 border border-black rounded-md checked:bg-blue-500"
                        onClick={() => {
                            if (passwordElmRef.current) {
                                if (passwordElmRef.current?.type == "password")
                                    passwordElmRef.current.type = "text";
                                else passwordElmRef.current.type = "password";
                            }
                        }}
                    />
                </div>
            </div>
            <button
                className="bg-black text-white h-10 rounded-lg hover:bg-neutral-900 cursor-pointer"
                onClick={handleLogin}
            >
                Submit
            </button>
            <span className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="hover:underline ">
                    Register
                </a>
            </span>
        </div>
    );
};

export default Page;
