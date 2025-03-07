import { Sidebar } from "@/components/sidebar"


export default async function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
            <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 ml-64">
            {children}
          </div>
        </div>
    );
}