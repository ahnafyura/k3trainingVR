"use client";

import { useState } from 'react';
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
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Dummy stats data
  const stats = {
    totalWorkers: 247,
    activeModules: 25,
    averageCompletion: 72,
    certificatesIssued: 189,
    weeklyGrowth: {
      workers: 8.2,
      completion: 5.7,
      modules: 12.0,
      certificates: 15.3
    }
  };

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      user: "Budi Santoso",
      action: "menyelesaikan",
      module: "Bahaya Alat Berat",
      time: "5 menit yang lalu",
      type: "completion",
      score: 95
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      action: "memulai",
      module: "Simulasi Evakuasi Kebakaran",
      time: "12 menit yang lalu",
      type: "start"
    },
    {
      id: 3,
      user: "Ahmad Dahlan",
      action: "menyelesaikan",
      module: "Penggunaan APD yang Benar",
      time: "1 jam yang lalu",
      type: "completion",
      score: 88
    },
    {
      id: 4,
      user: "Rina Wijaya",
      action: "mendapatkan sertifikat",
      module: "K3 Dasar Level 1",
      time: "2 jam yang lalu",
      type: "certificate"
    },
    {
      id: 5,
      user: "Dedi Kurniawan",
      action: "memulai",
      module: "Penanganan Bahan Kimia",
      time: "3 jam yang lalu",
      type: "start"
    },
    {
      id: 6,
      user: "Maya Sari",
      action: "menyelesaikan",
      module: "Keselamatan Kerja di Ketinggian",
      time: "4 jam yang lalu",
      type: "completion",
      score: 92
    }
  ];

  // Top performing workers
  const topWorkers = [
    { name: "Budi Santoso", completed: 23, score: 94 },
    { name: "Siti Nurhaliza", completed: 21, score: 91 },
    { name: "Ahmad Dahlan", completed: 20, score: 89 },
    { name: "Rina Wijaya", completed: 19, score: 88 },
    { name: "Dedi Kurniawan", completed: 18, score: 87 }
  ];

  // Module completion data (for chart)
  const moduleStats = [
    { name: "Simulasi Kebakaran", completion: 85 },
    { name: "Bahaya Alat Berat", completion: 72 },
    { name: "Penggunaan APD", completion: 91 },
    { name: "Bahan Kimia B3", completion: 68 },
    { name: "Kerja Ketinggian", completion: 79 }
  ];

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
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-semibold">+{stats.weeklyGrowth.workers}%</span>
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
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-semibold">+{stats.weeklyGrowth.modules}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.activeModules}</h3>
            <p className="text-sm text-slate-600">Modul Aktif</p>
            <p className="text-xs text-slate-500">VR Training tersedia</p>
          </div>
        </div>

        {/* Average Completion */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-semibold">+{stats.weeklyGrowth.completion}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.averageCompletion}%</h3>
            <p className="text-sm text-slate-600">Rata-rata Kelulusan</p>
            <p className="text-xs text-slate-500">Simulasi VR</p>
          </div>
        </div>

        {/* Certificates Issued */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-semibold">+{stats.weeklyGrowth.certificates}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{stats.certificatesIssued}</h3>
            <p className="text-sm text-slate-600">Sertifikat Terbit</p>
            <p className="text-xs text-slate-500">Bulan ini</p>
          </div>
        </div>
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Completion Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Statistik Penyelesaian Modul</h2>
              <p className="text-sm text-slate-600 mt-1">5 modul teratas minggu ini</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>Lihat Semua</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {moduleStats.map((module, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">{module.name}</span>
                  <span className="text-slate-600 font-semibold">{module.completion}%</span>
                </div>
                <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${module.completion}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-xs text-slate-600 mt-1">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-xs text-slate-600 mt-1">Completions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">71.5%</div>
              <div className="text-xs text-slate-600 mt-1">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Top Performers</h2>
          <p className="text-sm text-slate-600 mb-6">Pekerja dengan performa terbaik</p>
          
          <div className="space-y-4">
            {topWorkers.map((worker, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{worker.name}</p>
                  <p className="text-xs text-slate-600">{worker.completed} modul • {worker.score}% avg</p>
                </div>
                <div className="flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            ))}
          </div>

          <Link 
            href="/admin/users"
            className="block mt-4 text-center py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors"
          >
            Lihat Semua Pekerja
          </Link>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Aktivitas Terbaru</h2>
              <p className="text-sm text-slate-600 mt-1">Real-time activity monitoring</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Search className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">Cari</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Aktivitas
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Modul
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Skor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{activity.user}</p>
                        <p className="text-xs text-slate-500">Pekerja</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {activity.type === 'completion' && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      {activity.type === 'start' && (
                        <PlayCircle className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === 'certificate' && (
                        <Award className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-sm text-slate-700">{activity.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{activity.module}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.score ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600"
                            style={{ width: `${activity.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{activity.score}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'completion' 
                        ? 'bg-green-100 text-green-800'
                        : activity.type === 'certificate'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.type === 'completion' ? 'Selesai' : 
                       activity.type === 'certificate' ? 'Sertifikat' : 'Berlangsung'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan <span className="font-semibold">6</span> dari <span className="font-semibold">124</span> aktivitas
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
              3
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
              Next
            </button>
          </div>
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