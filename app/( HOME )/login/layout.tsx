export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-black flex items-center justify-center min-h-screen">
            {children}
        </div>
    );
}
