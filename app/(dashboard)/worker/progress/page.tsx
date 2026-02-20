"use client";

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  Calendar,
  Star,
  Target,
  Zap,
  Loader2,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function WorkerProgressPage() {
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [totalModules, setTotalModules] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchData(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (uid: string) => {
    try {
      // Ambil semua modul aktif
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modulesData = modulesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((m: any) => m.status === "active");
      setModules(modulesData);
      setTotalModules(modulesData.length);

      // Ambil progress user ini
      const progressSnapshot = await getDocs(collection(db, "user_progress"));
      const allProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const myProgress = allProgress.filter((p: any) => p.user_id === uid);
      setProgress(myProgress);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  // Helpers
  const getModuleById = (moduleId: string) => {
    return modules.find((m: any) => m.id === moduleId);
  };

  const getModuleProgress = (moduleId: string) => {
    return progress.find((p: any) => p.module_id === moduleId);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  // Computed stats
  const completedProgress = progress.filter((p: any) => p.status === "completed");
  const inProgressItems = progress.filter((p: any) => p.status === "in_progress");
  const completedCount = completedProgress.length;
  const inProgressCount = inProgressItems.length;
  const notStartedCount = Math.max(0, totalModules - completedCount - inProgressCount);

  const averageScore = completedProgress.length > 0
    ? Math.round(completedProgress.reduce((sum: number, p: any) => sum + (p.score || 0), 0) / completedProgress.length)
    : 0;

  const completionPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat data progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Progress Saya</h1>
        <p className="text-slate-600 mt-1">Tracking pencapaian dan riwayat pelatihan K3 Anda</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-blue-600">{completionPct}%</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Progress Keseluruhan</h3>
          <p className="text-xs text-slate-500">{completedCount} dari {totalModules} modul</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600 fill-green-600" />
            </div>
            <span className="text-3xl font-bold text-green-600">{averageScore > 0 ? averageScore : '-'}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Rata-rata Skor</h3>
          <p className="text-xs text-slate-500">{completedCount > 0 ? `Dari ${completedCount} modul selesai` : 'Belum ada data'}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-purple-600">{completedCount}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Modul Selesai</h3>
          <p className="text-xs text-slate-500">{completedCount > 0 ? 'Training tuntas' : 'Belum ada'}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-orange-600">{inProgressCount}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Sedang Dikerjakan</h3>
          <p className="text-xs text-slate-500">{notStartedCount} belum dimulai</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Progress List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Completed Modules */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Modul Selesai</h2>
                <p className="text-sm text-slate-600">{completedCount} modul</p>
              </div>
            </div>

            {completedProgress.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <p className="font-medium">Belum ada modul selesai</p>
                <p className="text-sm mt-1">Mulai training untuk melihat progress di sini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedProgress.map((prog: any) => {
                  const mod = getModuleById(prog.module_id);
                  return (
                    <div
                      key={prog.id}
                      className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{mod?.title || 'Modul Training'}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(prog.completed_at || prog.updated_at)}</span>
                          </span>
                          {prog.score > 0 && (
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold text-green-600">{prog.score}%</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/worker/modules/${prog.module_id}`}
                        className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Ulangi
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* In Progress Modules */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Sedang Berlangsung</h2>
                <p className="text-sm text-slate-600">{inProgressCount} modul</p>
              </div>
            </div>

            {inProgressItems.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <PlayCircle className="w-12 h-12 mx-auto mb-3" />
                <p className="font-medium">Tidak ada modul berlangsung</p>
                <Link href="/worker/modules" className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block">
                  Mulai training baru →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {inProgressItems.map((prog: any) => {
                  const mod = getModuleById(prog.module_id);
                  const progressPct = prog.progress_percentage || 0;
                  return (
                    <div key={prog.id} className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">{mod?.title || 'Modul Training'}</h3>
                        <span className="text-sm font-bold text-blue-600">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <Link
                        href={`/worker/modules/${prog.module_id}`}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Lanjutkan Training</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Not Started Modules */}
          {notStartedCount > 0 && (
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Belum Dimulai</h2>
                  <p className="text-sm text-slate-600">{notStartedCount} modul</p>
                </div>
              </div>

              <div className="space-y-3">
                {modules
                  .filter(m => !getModuleProgress(m.id))
                  .map((mod: any) => (
                    <div key={mod.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm">{mod.title}</h3>
                        <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                          {mod.duration_minutes > 0 && (
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{mod.duration_minutes} menit</span>
                            </span>
                          )}
                          {mod.category && <span>{mod.category}</span>}
                        </div>
                      </div>
                      <Link
                        href={`/worker/modules/${mod.id}`}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Mulai
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress Visual */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Ringkasan Progress</h3>
            
            {/* Circular Progress */}
            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36">
                <svg className="transform -rotate-90 w-36 h-36">
                  <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-200" />
                  <circle
                    cx="72" cy="72" r="64"
                    stroke="url(#progressGrad)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 64}`}
                    strokeDashoffset={`${2 * Math.PI * 64 * (1 - completionPct / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-slate-900">{completionPct}%</div>
                  <div className="text-xs text-slate-500">Selesai</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="flex items-center space-x-2 text-sm text-slate-700">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Selesai</span>
                </span>
                <span className="font-bold text-green-600">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="flex items-center space-x-2 text-sm text-slate-700">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span>Berlangsung</span>
                </span>
                <span className="font-bold text-blue-600">{inProgressCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="flex items-center space-x-2 text-sm text-slate-700">
                  <span className="w-3 h-3 bg-slate-300 rounded-full"></span>
                  <span>Belum Mulai</span>
                </span>
                <span className="font-bold text-slate-600">{notStartedCount}</span>
              </div>
            </div>
          </div>

          {/* Target Card */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6" />
              <h3 className="text-lg font-bold">Target Berikutnya</h3>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              {totalModules === 0 
                ? 'Belum ada modul training tersedia'
                : completedCount >= totalModules
                ? 'Semua modul sudah selesai! 🎉'
                : `Selesaikan ${totalModules - completedCount} modul lagi untuk menuntaskan semua training`
              }
            </p>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
            </div>
            <p className="text-xs text-blue-100">{completedCount} dari {totalModules} modul selesai</p>
          </div>

          {/* Quick Link */}
          <Link
            href="/worker/modules"
            className="block w-full py-4 bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl text-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Lihat Semua Modul →
          </Link>
        </div>
      </div>
    </div>
  );
}
