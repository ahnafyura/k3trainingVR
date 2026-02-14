"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  PlayCircle, 
  Clock, 
  Award,
  CheckCircle2,
  ArrowLeft,
  Users,
  Star,
  BookOpen,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react';

// Dummy module database (sama seperti di admin)
const MODULES_DATABASE = [
  {
    id: "1",
    title: "Simulasi Evakuasi Kebakaran",
    category: "Kebakaran & Api",
    description: "Modul pelatihan VR 360° yang mensimulasikan situasi kebakaran di tempat kerja. Pekerja akan belajar prosedur evakuasi darurat, penggunaan APAR (Alat Pemadam Api Ringan), dan jalur evakuasi yang aman.",
    duration: "15",
    difficulty: "intermediate" as const,
    thumbnail: "🔥",
    status: "not_started" as const,
    progress: 0,
    rating: 4.8,
    enrolledUsers: 247,
    completionRate: 85,
    learningObjectives: [
      "Memahami prosedur evakuasi darurat",
      "Mampu menggunakan APAR dengan benar",
      "Mengenali jalur evakuasi terdekat",
      "Memahami titik kumpul darurat"
    ]
  },
  {
    id: "2",
    title: "Bahaya Alat Berat di Konstruksi",
    category: "Alat Berat",
    description: "Simulasi VR yang menampilkan berbagai skenario berbahaya saat bekerja dengan alat berat seperti excavator, crane, dan bulldozer. Pekerja akan belajar zona bahaya, komunikasi dengan operator, dan prosedur keselamatan standar.",
    duration: "20",
    difficulty: "advanced" as const,
    thumbnail: "🚜",
    status: "in_progress" as const,
    progress: 45,
    rating: 4.9,
    enrolledUsers: 189,
    completionRate: 72,
    learningObjectives: [
      "Mengidentifikasi zona bahaya alat berat",
      "Memahami hand signal untuk operator",
      "Mengenali situasi berbahaya",
      "Prosedur keselamatan saat bekerja di sekitar alat berat"
    ]
  },
  {
    id: "3",
    title: "Penggunaan APD yang Benar",
    category: "APD & Perlindungan",
    description: "Panduan komprehensif tentang cara memilih, memakai, dan merawat Alat Pelindung Diri (APD) dengan benar. Mencakup helmet, safety shoes, sarung tangan, masker, dan pelindung mata.",
    duration: "12",
    difficulty: "beginner" as const,
    thumbnail: "🦺",
    status: "completed" as const,
    progress: 100,
    rating: 4.7,
    enrolledUsers: 312,
    completionRate: 91,
    learningObjectives: [
      "Memilih APD yang sesuai dengan jenis pekerjaan",
      "Cara memakai APD dengan benar",
      "Merawat dan menyimpan APD",
      "Mengenali APD yang sudah tidak layak pakai"
    ]
  }
];

export default function WorkerModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const moduleId = resolvedParams.id;

  const [moduleData, setModuleData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching module data
    const module = MODULES_DATABASE.find(m => m.id === moduleId);
    
    if (module) {
      setModuleData(module);
    } else {
      // Module not found - could redirect to 404
      console.warn(`Module ${moduleId} not found`);
    }
    
    setIsLoading(false);
  }, [moduleId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Memuat detail modul...</p>
        </div>
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-slate-900 text-xl font-bold">Modul tidak ditemukan</p>
          <Link href="/worker/modules" className="text-blue-600 hover:underline">
            Kembali ke daftar modul
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Pemula';
      case 'intermediate': return 'Menengah';
      case 'advanced': return 'Lanjutan';
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Back */}
      <div className="flex items-center space-x-2 text-sm text-slate-600">
        <Link href="/worker/modules" className="hover:text-blue-600 transition-colors">
          Modul Training
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{moduleData.title}</span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Preview Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl overflow-hidden">
            {/* Video Thumbnail */}
            <div className="relative h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl animate-pulse">
                  {moduleData.thumbnail}
                </div>
              </div>
              
              {/* Status Badge */}
              {moduleData.status === "in_progress" && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-bold rounded-xl flex items-center space-x-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Berlangsung - {moduleData.progress}%</span>
                </div>
              )}
              {moduleData.status === "completed" && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-green-600/90 backdrop-blur-sm text-white text-sm font-bold rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai</span>
                </div>
              )}

              {/* 360 VR Badge */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-bold rounded-xl">
                360° VR
              </div>

              {/* Progress Bar (if in progress) */}
              {moduleData.status === "in_progress" && (
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-white/20">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${moduleData.progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Module Header Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg">
                      {moduleData.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-lg border ${getDifficultyColor(moduleData.difficulty)}`}>
                      {getDifficultyText(moduleData.difficulty)}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {moduleData.title}
                  </h1>
                  <p className="text-slate-600 leading-relaxed">
                    {moduleData.description}
                  </p>
                </div>
              </div>

              {/* Meta Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-2xl font-bold text-slate-900">{moduleData.duration}</span>
                  </div>
                  <p className="text-xs text-slate-600">Menit</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold text-slate-900">{moduleData.rating}</span>
                  </div>
                  <p className="text-xs text-slate-600">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-2xl font-bold text-slate-900">{moduleData.enrolledUsers}</span>
                  </div>
                  <p className="text-xs text-slate-600">Peserta</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-2xl font-bold text-slate-900">{moduleData.completionRate}%</span>
                  </div>
                  <p className="text-xs text-slate-600">Completion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Tujuan Pembelajaran</h2>
                <p className="text-sm text-slate-600">Apa yang akan Anda pelajari</p>
              </div>
            </div>

            <ul className="space-y-3">
              {moduleData.learningObjectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 leading-relaxed">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Actions & Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* CTA Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Mulai Training</h3>
            
            {moduleData.status === "in_progress" && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Progress Anda</span>
                  <span className="text-sm font-bold text-blue-900">{moduleData.progress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${moduleData.progress}%` }}
                  />
                </div>
              </div>
            )}

            <Link
              href={`/worker/modules/${moduleId}/play`}
              className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
                moduleData.status === "completed"
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/50'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
              }`}
            >
              <PlayCircle className="w-5 h-5" />
              <span>
                {moduleData.status === "completed" ? "Ulangi Simulasi VR" :
                 moduleData.status === "in_progress" ? "Lanjutkan VR Training" :
                 "Mulai Simulasi VR"}
              </span>
            </Link>

            {moduleData.status === "completed" && (
              <button className="w-full mt-3 flex items-center justify-center space-x-2 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-medium transition-all">
                <Download className="w-4 h-4" />
                <span>Unduh Sertifikat</span>
              </button>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Bagikan Modul</span>
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Dapatkan Sertifikat!</p>
                <p className="text-xs">Selesaikan modul ini dengan skor minimal 80% untuk mendapatkan sertifikat K3.</p>
              </div>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">Persyaratan</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Browser modern (Chrome, Firefox, Edge)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Koneksi internet stabil</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Headset VR (opsional untuk pengalaman terbaik)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}