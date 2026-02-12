import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { SidebarProvider } from '@/context/SidebarContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-[#050507]">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
