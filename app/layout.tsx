import type { Metadata } from "next";
import "./globals.css";
import Loading from "@/components/loading";

export const metadata: Metadata = {
    title: "Inventory Management",
    description: "This is a webapp which is used to manage Household inventory",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col bg-neutral-200 text-black">
                {/* <Loading /> */}
                {children}
            </body>
        </html>
    );
}
