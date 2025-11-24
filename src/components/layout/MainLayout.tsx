import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { BottomTabBar } from "./BottomTabBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto pb-20 lg:pb-4">
          {children}
        </main>

        <footer className="hidden lg:block border-t border-border py-4 px-6">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </div>
        </footer>

        {/* Mobile bottom tab bar */}
        <BottomTabBar onMoreClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
};
