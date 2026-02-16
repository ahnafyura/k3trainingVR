"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Video,
  TrendingUp,
  Award,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Shield
} from 'lucide-react';
import LogoutModal from './LogoutModal';

interface SidebarProps {
  role: 'admin' | 'worker';
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Logout Handler
  const handleLogout = () => {
    // Clear any stored auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userNIK');
      localStorage.removeItem('userName');
      sessionStorage.clear();
    }
    
    // Close modal
    setShowLogoutModal(false);
    
    // Redirect to login page
    router.push('/login');
  };

  // Menu items for Admin
  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Video, label: 'Manajemen Modul', href: '/admin/modules' },
    { icon: Users, label: 'Manajemen User', href: '/admin/users' },
    { icon: BarChart3, label: 'Laporan', href: '/admin/reports' },
    { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
  ];

  // Menu items for Worker
  const workerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/worker/dashboard' },
    { icon: Video, label: 'Modul Training', href: '/worker/modules' },
    { icon: TrendingUp, label: 'Progress Saya', href: '/worker/progress' },
    { icon: Award, label: 'Sertifikat', href: '/worker/certificates' },
    { icon: Settings, label: 'Pengaturan', href: '/worker/pengaturan' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : workerMenuItems;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">K3 VR</h1>
                <p className="text-slate-400 text-xs">Training Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group relative flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' 
                      : 'text-slate-300 hover:text-white'
                    }
                  `}
                >
                  {/* Hover Border Effect */}
                  {!isActive && (
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-xl transition-all duration-200"></div>
                  )}
                  
                  {/* Icon */}
                  <item.icon className={`
                    w-5 h-5 transition-all duration-200
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `} />
                  
                  {/* Label */}
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-slate-700">
            {/* User Profile */}
            <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/30">
                {role === 'admin' ? 'A' : 'W'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {role === 'admin' ? 'Admin K3' : 'Pekerja Demo'}
                </p>
                <p className="text-slate-400 text-xs truncate">
                  NIK: {role === 'admin' ? 'admin' : '12345'}
                </p>
              </div>
            </div>

            {/* Logout Button - TRIGGER MODAL */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="group relative w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-xl transition-all duration-300"
            >
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-xl transition-all duration-200"></div>
              
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}