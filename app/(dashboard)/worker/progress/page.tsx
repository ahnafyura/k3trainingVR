"use client";

import { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  Calendar,
  Download,
  Star,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: number;
  title: string;
  category: string;
  status: 'completed' | 'in_progress' | 'not_started';
  score?: number;
  completedDate?: string;
  duration: string;
  progress: number;
}

interface Activity {
  id: number;
  type: 'completed' | 'started' | 'certificate';
  moduleTitle: string;
  date: string;
  score?: number;
}

export default function WorkerProgressPage() {
  const [modules] = useState<Module[]>([
    {
      id: 1,
      title: "Simulasi Evakuasi Kebakaran",
      category: "Kebakaran & Api",
      status: "completed",
      score: 95,
      completedDate: "2024-02-10",
      duration: "15 menit",
      progress: 100
    },
    {
      id: 2,
      title: "Bahaya Alat Berat di Konstruksi",
      category: "Alat Berat",
      status: "in_progress",
      duration: "20 menit",
      progress: 45
    },
    {
      id: 3,
      title: "Penggunaan APD yang Benar",
      category: "APD & Perlindungan",
      status: "completed",
      score: 88,
      completedDate: "2024-02-08",
      duration: "12 menit",
      progress: 100
    },
    {
      id: 4,
      title: "Penanganan Bahan Kimia Berbahaya",
      category: "Bahan Kimia",
      status: "not_started",
      duration: "18 menit",
      progress: 0
    },
    {
      id: 5,
      title: "Keselamatan Kerja di Ketinggian",
      category: "Ketinggian",
      status: "not_started",
      duration: "16 menit",
      progress: 0
    },
    {
      id: 6,
      title: "Prosedur Lock Out Tag Out (LOTO)",
      category: "Mesin & Peralatan",
      status: "completed",
      score: 92,
      completedDate: "2024-02-05",
      duration: "14 menit",
      progress: 100
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: 1,
      type: "completed",
      moduleTitle: "Simulasi Evakuasi Kebakaran",
      date: "2024-02-10 14:30",
      score: 95
    },
    {
      id: 2,
      type: "certificate",
      moduleTitle: "Simulasi Evakuasi Kebakaran",
      date: "2024-02-10 14:35"
    },
    {
      id: 3,
      type: "completed",
      moduleTitle: "Penggunaan APD yang Benar",
      date: "2024-02-08 10:15",
      score: 88
    },
    {
      id: 4,
      type: "started",
      moduleTitle: "Bahaya Alat Berat di Konstruksi",
      date: "2024-02-07 16:20"
    },
    {
      id: 5,
      type: "completed",
      moduleTitle: "Prosedur Lock Out Tag Out (LOTO)",
      date: "2024-02-05 11:45",
      score: 92
    }
  ]);

  const completedModules = modules.filter(m => m.status === 'completed');
  const inProgressModules = modules.filter(m => m.status === 'in_progress');
  const averageScore = completedModules.reduce((acc, m) => acc + (m.score || 0), 0) / completedModules.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Progress Saya</h1>
        <p className="text-slate-600 mt-1">Tracking pencapaian dan riwayat pelatihan K3 Anda</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Progress */}
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-blue-600">
              {Math.round((completedModules.length / modules.length) * 100)}%
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Progress Keseluruhan</h3>
          <p className="text-xs text-slate-500">{completedModules.length} dari {modules.length} modul</p>
        </div>

        {/* Average Score */}
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600 fill-green-600" />
            </div>
            <span className="text-3xl font-bold text-green-600">
              {Math.round(averageScore)}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Rata-rata Skor</h3>
          <p className="text-xs text-slate-500">Dari {completedModules.length} modul selesai</p>
        </div>

        {/* Certificates */}
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-purple-600">
              {completedModules.length}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Sertifikat</h3>
          <p className="text-xs text-slate-500">Siap diunduh</p>
        </div>

        {/* Total Hours */}
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-orange-600">
              12.5
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Jam Training</h3>
          <p className="text-xs text-slate-500">Bulan ini</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Progress List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Completed Modules */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Modul Selesai</h2>
                  <p className="text-sm text-slate-600">{completedModules.length} modul</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {completedModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{module.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{module.completedDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-green-600">{module.score}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>Sertifikat</span>
                    </button>
                    <Link
                      href={`/worker/modules/${module.id}`}
                      className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ulangi
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Modules */}
          {inProgressModules.length > 0 && (
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <PlayCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Sedang Berlangsung</h2>
                    <p className="text-sm text-slate-600">{inProgressModules.length} modul</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {inProgressModules.map((module) => (
                  <div
                    key={module.id}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900">{module.title}</h3>
                      <span className="text-sm font-bold text-blue-600">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <Link
                      href={`/worker/modules/${module.id}/play`}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Lanjutkan Training</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Aktivitas Terbaru</h2>
                <p className="text-sm text-slate-600">Riwayat training</p>
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'completed' ? 'bg-green-100' :
                    activity.type === 'certificate' ? 'bg-purple-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.type === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    {activity.type === 'certificate' && <Award className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'started' && <PlayCircle className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      {activity.type === 'completed' && 'Menyelesaikan modul'}
                      {activity.type === 'certificate' && 'Mendapatkan sertifikat'}
                      {activity.type === 'started' && 'Memulai modul'}
                    </p>
                    <p className="text-sm text-slate-600 mb-1 truncate">{activity.moduleTitle}</p>
                    {activity.score && (
                      <p className="text-xs font-semibold text-green-600 mb-1">Skor: {activity.score}%</p>
                    )}
                    <p className="text-xs text-slate-500">{activity.date}</p>
                  </div>
                  {index !== activities.length - 1 && (
                    <div className="absolute left-[19px] top-8 w-0.5 h-16 bg-slate-200" style={{ marginLeft: '0.75rem' }} />
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua Aktivitas →
            </button>
          </div>

          {/* Achievements */}
          <div className="mt-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6" />
              <h3 className="text-lg font-bold">Target Berikutnya</h3>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              Selesaikan 5 modul lagi untuk mendapatkan badge "Safety Expert"
            </p>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-blue-100">3 dari 5 modul selesai</p>
          </div>
        </div>
      </div>
    </div>
  );
}