
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  return (
    <SidebarProvider defaultCollapsed={isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="border-b px-4 py-3 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="sm" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-xl font-bold">InvoiceEasy</h1>
            </div>
            <div className="flex items-center gap-2">
              {/* User profile button will go here */}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
