"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Determine role based on pathname
  const role = pathname?.startsWith('/admin') ? 'admin' : 'worker';

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Close sidebar when clicking outside (handled in Sidebar component)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar role={role} isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar 
          role={role} 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
          <div className="px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-sm text-slate-600">
                © 2024 K3 VR Training. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <button className="hover:text-blue-600 transition-colors">
                  Bantuan
                </button>
                <button className="hover:text-blue-600 transition-colors">
                  Privasi
                </button>
                <button className="hover:text-blue-600 transition-colors">
                  Syarat & Ketentuan
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}