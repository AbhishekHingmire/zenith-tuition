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
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 overflow-auto pb-20 lg:pb-4">
          {children}
        </main>

        <footer className="hidden lg:block border-t border-border py-3 px-6">
          <div className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </div>
        </footer>

        {/* Mobile bottom tab bar */}
        <BottomTabBar onMoreClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
};
