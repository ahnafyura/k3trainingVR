"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  UserCheck,
  Activity,
  ChevronRight,
  Download,
  Plus,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalAdmins: 0,
    activeModules: 0,
    averageScore: 0,
    completedProgress: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [allProgress, setAllProgress] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Ambil semua users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const workers = usersData.filter((u: any) => u.role === "worker");
      const admins = usersData.filter((u: any) => u.role === "admin");

      // 2. Ambil semua modules
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modulesData = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const activeModules = modulesData.filter((m: any) => m.status === "active");

      // 3. Ambil semua progress
      const progressSnapshot = await getDocs(collection(db, "user_progress"));
      const progressData = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const completedProgress = progressData.filter((p: any) => p.status === "completed");
      
      // Hitung rata-rata skor
      let avgScore = 0;
      if (completedProgress.length > 0) {
        const totalScore = completedProgress.reduce((sum: number, p: any) => sum + (p.score || 0), 0);
        avgScore = Math.round(totalScore / completedProgress.length);
      }

      setStats({
        totalWorkers: workers.length,
        totalAdmins: admins.length,
        activeModules: activeModules.length,
        averageScore: avgScore,
        completedProgress: completedProgress.length,
      });

      // 4. Recent users (5 terbaru)
      const sortedUsers = usersData.sort((a: any, b: any) => {
        const dateA = a.created_at?.seconds || 0;
        const dateB = b.created_at?.seconds || 0;
        return dateB - dateA;
      });
      setRecentUsers(sortedUsers.slice(0, 6));
      setAllProgress(progressData);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  // Format tanggal dari Firestore timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Ringkasan sistem K3 VR Training</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Data</span>
          </button>
          <Link 
            href="/admin/modules/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Tambah Modul</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Workers */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.totalWorkers}</h3>
            <p className="text-sm text-slate-600">Total Pekerja</p>
            <p className="text-xs text-slate-500">Terdaftar di sistem</p>
          </div>
        </div>

        {/* Active Modules */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.activeModules}</h3>
            <p className="text-sm text-slate-600">Modul Aktif</p>
            <p className="text-xs text-slate-500">VR Training tersedia</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.averageScore > 0 ? `${stats.averageScore}%` : '-'}</h3>
            <p className="text-sm text-slate-600">Rata-rata Skor</p>
            <p className="text-xs text-slate-500">Training selesai</p>
          </div>
        </div>

        {/* Completed Trainings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.completedProgress}</h3>
            <p className="text-sm text-slate-600">Training Selesai</p>
            <p className="text-xs text-slate-500">Total penyelesaian</p>
          </div>
        </div>
      </div>

      {/* User List & Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Pengguna Terdaftar</h2>
                <p className="text-sm text-slate-600 mt-1">Data dari Firebase Firestore</p>
              </div>
              <Link 
                href="/admin/users"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pengguna</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">NIK</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Terdaftar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Belum ada pengguna terdaftar
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{user.name || '-'}</p>
                            <p className="text-xs text-slate-500">{user.email || '-'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-700 font-mono">{user.nik || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Pekerja'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(user.created_at)}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Ringkasan Sistem</h2>
          <p className="text-sm text-slate-600 mb-6">Status keseluruhan platform</p>
          
          <div className="space-y-4">
            {/* Total Users */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Total Pengguna</p>
                <p className="text-xs text-slate-600">{stats.totalWorkers + stats.totalAdmins} user ({stats.totalAdmins} admin, {stats.totalWorkers} pekerja)</p>
              </div>
            </div>

            {/* Modules */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Modul Training</p>
                <p className="text-xs text-slate-600">{stats.activeModules} modul aktif</p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Training Selesai</p>
                <p className="text-xs text-slate-600">{stats.completedProgress} penyelesaian</p>
              </div>
            </div>

            {/* Average Score */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-orange-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Rata-rata Skor</p>
                <p className="text-xs text-slate-600">{stats.averageScore > 0 ? `${stats.averageScore}%` : 'Belum ada data'}</p>
              </div>
            </div>

            {/* Firebase Status */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Firebase</p>
                <p className="text-xs text-emerald-600 font-medium">● Terhubung</p>
              </div>
            </div>
          </div>

          <Link 
            href="/admin/users"
            className="block mt-4 text-center py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors"
          >
            Kelola Pengguna
          </Link>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/admin/modules/new"
          className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-lg font-bold mb-1">Buat Modul Baru</h3>
          <p className="text-sm text-blue-100">Tambahkan VR training module</p>
        </Link>

        <Link 
          href="/admin/users"
          className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <UserCheck className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-lg font-bold mb-1">Kelola Pengguna</h3>
          <p className="text-sm text-purple-100">Tambah atau edit user</p>
        </Link>

        <Link 
          href="/admin/reports"
          className="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Download className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-lg font-bold mb-1">Generate Report</h3>
          <p className="text-sm text-green-100">Export data & analytics</p>
        </Link>
      </div>
    </div>
  );
}
