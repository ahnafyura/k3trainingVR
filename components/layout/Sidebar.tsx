"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlaySquare, 
  Users, 
  FileText, 
  Settings,
  Trophy,
  BookOpen,
  BarChart3,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface SidebarProps {
  role: 'admin' | 'worker';
  isOpen: boolean;
}

export default function Sidebar({ role, isOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Menu items untuk Admin
  const adminMenuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { title: 'Manajemen Modul', icon: PlaySquare, href: '/admin/modules' },
    { title: 'Manajemen User', icon: Users, href: '/admin/users' },
    { title: 'Laporan', icon: BarChart3, href: '/admin/reports' },
    { title: 'Pengaturan', icon: Settings, href: '/admin/settings' },
  ];

  // Menu items untuk Worker
  const workerMenuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/worker/dashboard' },
    { title: 'Modul Training', icon: BookOpen, href: '/worker/modules' },
    { title: 'Progress Saya', icon: Trophy, href: '/worker/progress' },
    { title: 'Sertifikat', icon: FileText, href: '/worker/certificates' },
    { title: 'Pengaturan', icon: Settings, href: '/worker/pengaturan' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : workerMenuItems;

  // Data user dari context atau fallback
  const userName = user?.name || (role === 'admin' ? 'Admin K3' : 'Worker');
  const userSub = user?.nik ? `NIK: ${user.nik}` : user?.email || (role === 'admin' ? 'admin' : 'worker');
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">K3 VR</h1>
                <p className="text-blue-300 text-xs">
                  {role === 'admin' ? 'Admin Panel' : 'Training Portal'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {userName}
                  </p>
                  <p className="text-blue-300 text-xs truncate">
                    {userSub}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
