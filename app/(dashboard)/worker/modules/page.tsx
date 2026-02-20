"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter,
  PlayCircle,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function WorkerModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

      // Ambil progress user ini
      const progressSnapshot = await getDocs(collection(db, "user_progress"));
      const allProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const myProgress = allProgress.filter((p: any) => p.user_id === uid);
      setProgress(myProgress);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // Get progress for specific module
  const getModuleProgress = (moduleId: string) => {
    return progress.find((p: any) => p.module_id === moduleId);
  };

  const getModuleStatus = (moduleId: string) => {
    const prog = getModuleProgress(moduleId);
    if (!prog) return "not_started";
    return prog.status || "not_started";
  };

  // Filter
  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      module.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = getModuleStatus(module.id);
    let matchesStatus = true;
    if (filterStatus === "not_started") matchesStatus = status === "not_started";
    else if (filterStatus === "in_progress") matchesStatus = status === "in_progress";
    else if (filterStatus === "completed") matchesStatus = status === "completed";
    
    return matchesSearch && matchesStatus;
  });

  // Stats
  const completedCount = modules.filter(m => getModuleStatus(m.id) === "completed").length;
  const inProgressCount = modules.filter(m => getModuleStatus(m.id) === "in_progress").length;
  const notStartedCount = modules.filter(m => getModuleStatus(m.id) === "not_started").length;

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'Pemula';
      case 'intermediate': return 'Menengah';
      case 'advanced': return 'Lanjutan';
      default: return diff || 'Pemula';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'bg-green-600/90';
      case 'intermediate': return 'bg-yellow-600/90';
      case 'advanced': return 'bg-red-600/90';
      default: return 'bg-green-600/90';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat modul training...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Modul Training K3</h1>
          <p className="text-slate-600 mt-1">Pilih modul VR untuk meningkatkan kompetensi keselamatan kerja Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Total Modul</span>
            <PlayCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{modules.length}</p>
          <p className="text-xs text-slate-500 mt-1">Tersedia</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Selesai</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-slate-500 mt-1">{modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0}% progress</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Berlangsung</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
          <p className="text-xs text-slate-500 mt-1">Modul aktif</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Belum Mulai</span>
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{notStartedCount}</p>
          <p className="text-xs text-slate-500 mt-1">Siap dimulai</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          <div className="relative flex-1 lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari modul training..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-5 h-5 text-slate-600 flex-shrink-0" />
            {[
              { key: 'all', label: 'Semua', activeClass: 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' },
              { key: 'not_started', label: 'Belum Mulai', activeClass: 'bg-slate-600 text-white shadow-lg shadow-slate-500/50' },
              { key: 'in_progress', label: 'Sedang Berjalan', activeClass: 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' },
              { key: 'completed', label: 'Selesai', activeClass: 'bg-green-600 text-white shadow-lg shadow-green-500/50' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === filter.key ? filter.activeClass : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredModules.length}</span> modul
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {modules.length === 0 ? 'Belum Ada Modul' : 'Tidak ada modul ditemukan'}
            </h3>
            <p className="text-slate-600">
              {modules.length === 0 ? 'Modul training akan muncul di sini setelah admin menambahkannya' : 'Coba ubah kata kunci pencarian atau filter yang dipilih'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module: any) => {
            const status = getModuleStatus(module.id);
            const modProgress = getModuleProgress(module.id);
            const progressPct = modProgress?.progress_percentage || 0;

            return (
              <div
                key={module.id}
                className="group bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Thumbnail Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/80" />
                  </div>
                  
                  {/* Status Badge */}
                  {status === "in_progress" && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center space-x-1">
                      <PlayCircle className="w-3 h-3" />
                      <span>Berlangsung</span>
                    </div>
                  )}
                  {status === "completed" && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Selesai</span>
                    </div>
                  )}

                  {/* Difficulty Badge */}
                  {module.difficulty && (
                    <div className={`absolute top-3 right-3 px-3 py-1 backdrop-blur-sm text-white text-xs font-bold rounded-full ${getDifficultyColor(module.difficulty)}`}>
                      {getDifficultyLabel(module.difficulty)}
                    </div>
                  )}

                  {/* Progress Bar */}
                  {status === "in_progress" && (
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  {module.category && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                        {module.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {module.description || 'Modul training VR K3'}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 mb-4 text-xs text-slate-500">
                    {module.duration_minutes > 0 && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration_minutes} menit</span>
                      </div>
                    )}
                    {module.difficulty && (
                      <div className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${
                          module.difficulty === 'beginner' ? 'bg-green-500' :
                          module.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span>{getDifficultyLabel(module.difficulty)}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Info */}
                  {status === "in_progress" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={`/worker/modules/${module.id}`}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      status === "completed"
                        ? 'bg-green-100 hover:bg-green-200 text-green-700 border-2 border-green-300'
                        : status === "in_progress"
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-500/50'
                    }`}
                  >
                    {status === "completed" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Ulangi Simulasi</span>
                      </>
                    ) : status === "in_progress" ? (
                      <>
                        <PlayCircle className="w-5 h-5" />
                        <span>Lanjutkan VR</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5" />
                        <span>Mulai Simulasi VR</span>
                      </>
                    )}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
