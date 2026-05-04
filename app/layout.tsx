import { Inter, JetBrains_Mono, Oswald } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { redirect } from "next/navigation";
import { getUserWithRoomStatus } from "@/actions/user";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
    title: "Inventory Management",
    description: "This is a webapp which is used to manage Household inventory",
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const oswald = Oswald({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-heading",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getUserWithRoomStatus();
    if (!data) redirect("/login");
    const user = await data.json();
    if (!user) redirect("/login");
    else if (user.roomId) redirect("/home");
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`min-h-screen flex flex-col bg-neutral-200 text-black ${inter.variable} ${oswald.variable} ${mono.variable}`}
            >
                <ClientLayout user={{ ...user.user, roomId: user.roomId }}>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
