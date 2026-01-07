import BithumbHeader from "@/components/header/BithumbHeader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-3xl w-full bg-white">
            <BithumbHeader />
            {children}
        </div>
    );
}
