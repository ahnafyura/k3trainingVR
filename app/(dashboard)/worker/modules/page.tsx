"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter,
  PlayCircle,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  TrendingUp,
  Star,
  Users,
  Flame,
  ChevronRight
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  thumbnail: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  rating: number;
  enrolledUsers: number;
  isLocked: boolean;
}

export default function WorkerModulesPage() {
  // Dummy data - modul yang tersedia untuk worker
  const [modules] = useState<Module[]>([
    {
      id: 1,
      title: "Simulasi Evakuasi Kebakaran",
      description: "Praktik evakuasi darurat dan penggunaan APAR dalam situasi kebakaran",
      category: "Kebakaran & Api",
      duration: "15 menit",
      difficulty: "Menengah",
      thumbnail: "🔥",
      status: "not_started",
      progress: 0,
      rating: 4.8,
      enrolledUsers: 247,
      isLocked: false
    },
    {
      id: 2,
      title: "Bahaya Alat Berat di Konstruksi",
      description: "Identifikasi risiko dan prosedur keselamatan saat bekerja dengan alat berat",
      category: "Alat Berat",
      duration: "20 menit",
      difficulty: "Lanjutan",
      thumbnail: "🚜",
      status: "in_progress",
      progress: 45,
      rating: 4.9,
      enrolledUsers: 189,
      isLocked: false
    },
    {
      id: 3,
      title: "Penggunaan APD yang Benar",
      description: "Cara memakai dan merawat Alat Pelindung Diri dengan benar",
      category: "APD & Perlindungan",
      duration: "12 menit",
      difficulty: "Pemula",
      thumbnail: "🦺",
      status: "completed",
      progress: 100,
      rating: 4.7,
      enrolledUsers: 312,
      isLocked: false
    },
    {
      id: 4,
      title: "Penanganan Bahan Kimia Berbahaya",
      description: "Prosedur aman menangani material berbahaya dan beracun (B3)",
      category: "Bahan Kimia",
      duration: "18 menit",
      difficulty: "Lanjutan",
      thumbnail: "⚠️",
      status: "not_started",
      progress: 0,
      rating: 4.6,
      enrolledUsers: 156,
      isLocked: false
    },
    {
      id: 5,
      title: "Keselamatan Kerja di Ketinggian",
      description: "Penggunaan harness, scaffold, dan fall protection yang aman",
      category: "Ketinggian",
      duration: "16 menit",
      difficulty: "Lanjutan",
      thumbnail: "🪜",
      status: "not_started",
      progress: 0,
      rating: 4.8,
      enrolledUsers: 203,
      isLocked: false
    },
    {
      id: 6,
      title: "Prosedur Lock Out Tag Out (LOTO)",
      description: "Isolasi energi berbahaya sebelum maintenance mesin",
      category: "Mesin & Peralatan",
      duration: "14 menit",
      difficulty: "Menengah",
      thumbnail: "🔒",
      status: "completed",
      progress: 100,
      rating: 4.9,
      enrolledUsers: 178,
      isLocked: false
    },
    {
      id: 7,
      title: "Penanganan Situasi Darurat Listrik",
      description: "First response untuk electrical shock, arc flash, dan electrical fire",
      category: "Kelistrikan",
      duration: "17 menit",
      difficulty: "Lanjutan",
      thumbnail: "⚡",
      status: "in_progress",
      progress: 30,
      rating: 4.7,
      enrolledUsers: 134,
      isLocked: false
    },
    {
      id: 8,
      title: "Ergonomi dan Postur Kerja",
      description: "Mencegah musculoskeletal disorders dengan postur kerja yang benar",
      category: "Ergonomi",
      duration: "10 menit",
      difficulty: "Pemula",
      thumbnail: "🧘",
      status: "completed",
      progress: 100,
      rating: 4.5,
      enrolledUsers: 289,
      isLocked: false
    },
    {
      id: 9,
      title: "Keselamatan Confined Space",
      description: "Prosedur masuk dan bekerja di ruang terbatas dengan aman",
      category: "Confined Space",
      duration: "19 menit",
      difficulty: "Lanjutan",
      thumbnail: "🚪",
      status: "not_started",
      progress: 0,
      rating: 4.8,
      enrolledUsers: 167,
      isLocked: true
    },
    {
      id: 10,
      title: "Pertolongan Pertama (First Aid)",
      description: "Penanganan cedera ringan dan kondisi darurat di tempat kerja",
      category: "Medical Emergency",
      duration: "22 menit",
      difficulty: "Menengah",
      thumbnail: "🩹",
      status: "not_started",
      progress: 0,
      rating: 4.9,
      enrolledUsers: 298,
      isLocked: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter modules
  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (filterStatus === "not_started") {
      matchesStatus = module.status === "not_started";
    } else if (filterStatus === "in_progress") {
      matchesStatus = module.status === "in_progress";
    } else if (filterStatus === "completed") {
      matchesStatus = module.status === "completed";
    }
    
    return matchesSearch && matchesStatus;
  });

  // Get stats
  const stats = {
    total: modules.filter(m => !m.isLocked).length,
    completed: modules.filter(m => m.status === "completed").length,
    inProgress: modules.filter(m => m.status === "in_progress").length,
    notStarted: modules.filter(m => m.status === "not_started" && !m.isLocked).length
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Modul Training K3</h1>
          <p className="text-slate-600 mt-1">Pilih modul VR untuk meningkatkan kompetensi keselamatan kerja Anda</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-600">Streak</p>
              <p className="text-sm font-bold text-slate-900">5 Hari</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
            <Award className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-slate-600">Points</p>
              <p className="text-sm font-bold text-slate-900">1,250</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Total Modul</span>
            <PlayCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-xs text-slate-500 mt-1">Tersedia</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Selesai</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round((stats.completed / stats.total) * 100)}% progress</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Berlangsung</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          <p className="text-xs text-slate-500 mt-1">Modul aktif</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Belum Mulai</span>
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.notStarted}</p>
          <p className="text-xs text-slate-500 mt-1">Siap dimulai</p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          {/* Search Bar */}
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

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-5 h-5 text-slate-600 flex-shrink-0" />
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filterStatus === "all"
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus("not_started")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filterStatus === "not_started"
                  ? 'bg-slate-600 text-white shadow-lg shadow-slate-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Belum Mulai
            </button>
            <button
              onClick={() => setFilterStatus("in_progress")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filterStatus === "in_progress"
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sedang Berjalan
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filterStatus === "completed"
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredModules.length}</span> modul
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tidak ada modul ditemukan</h3>
            <p className="text-slate-600">Coba ubah kata kunci pencarian atau filter yang dipilih</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="group bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Thumbnail Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                    {module.thumbnail}
                  </div>
                </div>
                
                {/* Status Badge */}
                {module.status === "in_progress" && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center space-x-1">
                    <PlayCircle className="w-3 h-3" />
                    <span>Berlangsung</span>
                  </div>
                )}
                {module.status === "completed" && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selesai</span>
                  </div>
                )}
                {module.isLocked && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Terkunci</span>
                  </div>
                )}

                {/* Difficulty Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 backdrop-blur-sm text-white text-xs font-bold rounded-full ${
                  module.difficulty === "Pemula" ? "bg-green-600/90" :
                  module.difficulty === "Menengah" ? "bg-yellow-600/90" :
                  "bg-red-600/90"
                }`}>
                  {module.difficulty}
                </div>

                {/* Progress Bar (if in progress) */}
                {module.status === "in_progress" && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                    {module.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center space-x-4 mb-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-slate-900">{module.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{module.enrolledUsers}</span>
                  </div>
                </div>

                {/* Progress Info (if in progress) */}
                {module.status === "in_progress" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {module.isLocked ? (
                  <button
                    disabled
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-200 text-slate-500 rounded-xl font-semibold cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Selesaikan Modul Sebelumnya</span>
                  </button>
                ) : (
                  <Link
                    href={`/worker/modules/${module.id}`}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      module.status === "completed"
                        ? 'bg-green-100 hover:bg-green-200 text-green-700 border-2 border-green-300'
                        : module.status === "in_progress"
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-500/50'
                    }`}
                  >
                    {module.status === "completed" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Ulangi Simulasi</span>
                      </>
                    ) : module.status === "in_progress" ? (
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}