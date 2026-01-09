import InoutHeader from "@/components/header/InoutHeader";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-3xl w-full bg-white">
            <InoutHeader />
            {children}
        </div>
    );
}
