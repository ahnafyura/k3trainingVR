"use client";

import { Menu, Bell, Search, X } from 'lucide-react';

interface NavbarProps {
  role: 'admin' | 'worker';
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ role, isOpen, toggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left Section: Menu Toggle & Search */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors duration-300"
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>

          {/* Page Title */}
          <div className="hidden md:block">
            <h2 className="text-xl font-bold text-slate-900">
              {role === 'admin' ? 'Admin Dashboard' : 'Worker Dashboard'}
            </h2>
            <p className="text-sm text-slate-500">
              {role === 'admin' 
                ? 'Kelola sistem K3 VR Training' 
                : 'Portal pelatihan keselamatan kerja'}
            </p>
          </div>
        </div>

        {/* Right Section: Search & Notifications */}
        <div className="flex items-center space-x-3">
          {/* Search Button (Desktop) */}
          <button className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300">
            <Search className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600">Cari...</span>
            <kbd className="px-2 py-1 text-xs bg-white rounded border border-slate-300 text-slate-500">
              Ctrl K
            </kbd>
          </button>

          {/* Search Icon (Mobile) */}
          <button className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors duration-300">
            <Search className="w-5 h-5 text-slate-700" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors duration-300">
            <Bell className="w-5 h-5 text-slate-700" />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Avatar (Mobile) */}
          <div className="lg:hidden">
            <button className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {role === 'admin' ? 'A' : 'W'}
            </button>
          </div>

          {/* User Info (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {role === 'admin' ? 'Admin K3' : 'Pekerja Demo'}
              </p>
              <p className="text-xs text-slate-500">
                {role === 'admin' ? 'Administrator' : 'Safety Worker'}
              </p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
              {role === 'admin' ? 'A' : 'W'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}