import PayHeader from "@/components/header/PayHeader";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-3xl w-full bg-white">
            <PayHeader />
            {children}
        </div>
    );
}
