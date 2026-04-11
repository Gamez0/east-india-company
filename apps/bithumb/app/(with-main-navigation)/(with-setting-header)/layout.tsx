import SettingHeader from "@/components/header/SettingHeader";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-3xl w-full bg-white">
            <SettingHeader />
            {children}
        </div>
    );
}
