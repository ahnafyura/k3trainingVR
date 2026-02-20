"use client";

import { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Flame,
  HardHat,
  Zap,
  Loader2,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function WorkerDashboard() {
  const [loading, setLoading] = useState(true);
  const [workerName, setWorkerName] = useState('');
  const [workerNIK, setWorkerNIK] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [totalModules, setTotalModules] = useState(0);
  const [completedModules, setCompletedModules] = useState(0);
  const [inProgressModules, setInProgressModules] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchWorkerData(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchWorkerData = async (uid: string) => {
    try {
      // 1. Ambil data profil worker
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setWorkerName(userData.name || '');
        setWorkerNIK(userData.nik || '');
        setWorkerEmail(userData.email || '');
      }

      // 2. Ambil semua modul aktif
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modulesData = modulesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((m: any) => m.status === "active");
      setModules(modulesData);
      setTotalModules(modulesData.length);

      // 3. Ambil progress worker ini
      const progressSnapshot = await getDocs(collection(db, "user_progress"));
      const allProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const myProgress = allProgress.filter((p: any) => p.user_id === uid);
      setProgress(myProgress);

      const completed = myProgress.filter((p: any) => p.status === "completed");
      const inProg = myProgress.filter((p: any) => p.status === "in_progress");
      setCompletedModules(completed.length);
      setInProgressModules(inProg.length);

      // Rata-rata skor
      if (completed.length > 0) {
        const total = completed.reduce((sum: number, p: any) => sum + (p.score || 0), 0);
        setAvgScore(Math.round(total / completed.length));
      }

    } catch (error) {
      console.error("Error fetching worker data:", error);
    }
  };

  const completionPercentage = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100) 
    : 0;

  const notStartedModules = totalModules - completedModules - inProgressModules;

  // Get module status for a specific module
  const getModuleProgress = (moduleId: string) => {
    return progress.find((p: any) => p.module_id === moduleId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Selamat datang{workerName ? `, ${workerName}` : ''}! 👋
            </h1>
            <p className="text-blue-100 flex items-center space-x-2">
              <HardHat className="w-4 h-4" />
              <span>{workerNIK ? `NIK: ${workerNIK}` : workerEmail}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-3xl font-bold">{completedModules}</div>
              <div className="text-xs text-blue-100">Selesai</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalModules > 0 ? totalModules - completedModules : 0}</div>
              <div className="text-xs text-blue-100">Tersisa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{completionPercentage}%</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Progress Keseluruhan</h3>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Modules */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{completedModules}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Modul Selesai</h3>
          <p className="text-xs text-slate-500">Dari {totalModules} total modul</p>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{inProgressModules}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Sedang Dikerjakan</h3>
          <p className="text-xs text-slate-500">Modul berlangsung</p>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{avgScore > 0 ? `${avgScore}%` : '-'}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Rata-rata Skor</h3>
          <p className="text-xs text-slate-500">Dari training selesai</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Progress Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Progress Belajar Anda</h2>
              <p className="text-slate-600 text-sm mt-1">Visualisasi pencapaian modul K3</p>
            </div>
            <Link 
              href="/worker/progress"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors"
            >
              <span>Lihat Detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mb-6 md:mb-0">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - completionPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-slate-900">{completionPercentage}%</div>
                <div className="text-sm text-slate-600">Selesai</div>
              </div>
            </div>

            {/* Progress Breakdown */}
            <div className="space-y-4 flex-1 md:ml-8">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-900">Selesai</span>
                </div>
                <span className="font-bold text-green-600">{completedModules} modul</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">Dalam Progress</span>
                </div>
                <span className="font-bold text-blue-600">{inProgressModules} modul</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Belum Dimulai</span>
                </div>
                <span className="font-bold text-slate-600">{Math.max(0, notStartedModules)} modul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Informasi Akun</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Nama Lengkap</p>
              <p className="font-semibold text-slate-900">{workerName || '-'}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">NIK</p>
              <p className="font-semibold text-slate-900">{workerNIK || '-'}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="font-semibold text-slate-900">{workerEmail || '-'}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Rata-rata Skor</p>
              <p className="font-semibold text-slate-900">{avgScore > 0 ? `${avgScore}%` : 'Belum ada data'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>Modul Training Tersedia</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {totalModules > 0 ? `${totalModules} modul tersedia` : 'Belum ada modul training'}
            </p>
          </div>
          <Link 
            href="/worker/modules"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {modules.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Modul</h3>
            <p className="text-slate-500">Modul training VR akan muncul di sini setelah admin menambahkannya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {modules.slice(0, 4).map((module: any) => {
              const modProgress = getModuleProgress(module.id);
              const status = modProgress?.status || 'not_started';
              const progressPct = modProgress?.progress_percentage || 0;

              return (
                <div 
                  key={module.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Module Header */}
                  <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/80" />
                    {status === 'in_progress' && (
                      <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <PlayCircle className="w-3 h-3" />
                        <span>Berlangsung</span>
                      </div>
                    )}
                    {status === 'completed' && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Selesai</span>
                      </div>
                    )}
                  </div>

                  {/* Module Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {module.description || 'Modul training K3 VR'}
                    </p>

                    <div className="flex items-center space-x-4 mb-4 text-xs text-slate-500">
                      {module.duration_minutes && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration_minutes} menit</span>
                        </div>
                      )}
                      {module.difficulty && (
                        <div className="flex items-center space-x-1">
                          <span className={`w-2 h-2 rounded-full ${
                            module.difficulty === 'beginner' ? 'bg-green-500' :
                            module.difficulty === 'intermediate' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></span>
                          <span>{module.difficulty === 'beginner' ? 'Pemula' : module.difficulty === 'intermediate' ? 'Menengah' : 'Lanjutan'}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {status === 'in_progress' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span className="font-semibold">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Link
                      href={`/worker/modules/${module.id}`}
                      className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        status === 'in_progress'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                          : status === 'completed'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>
                        {status === 'in_progress' ? 'Lanjutkan Training' : status === 'completed' ? 'Lihat Hasil' : 'Mulai VR Simulasi'}
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
