import MainHeader from "@/components/header/MainHeader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-3xl w-full bg-white">
            <MainHeader />
            {children}
        </div>
    );
}
