"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  X,
  Upload,
  PlayCircle,
  Eye,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Video,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';

// Smart Dummy Data - Database Simulation
const MODULES_DATABASE = [
  {
    id: "1",
    title: "Simulasi Evakuasi Kebakaran",
    category: "Kebakaran & Api",
    description: "Modul pelatihan VR 360° yang mensimulasikan situasi kebakaran di tempat kerja. Pekerja akan belajar prosedur evakuasi darurat, penggunaan APAR (Alat Pemadam Api Ringan), dan jalur evakuasi yang aman.",
    duration: "15",
    videoUrl: "https://example.com/vr-videos/kebakaran-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/kebakaran.jpg",
    status: "active" as const,
    difficulty: "intermediate" as const,
    learningObjectives: "1. Memahami prosedur evakuasi darurat\n2. Mampu menggunakan APAR dengan benar\n3. Mengenali jalur evakuasi terdekat\n4. Memahami titik kumpul darurat"
  },
  {
    id: "2",
    title: "Bahaya Alat Berat di Konstruksi",
    category: "Alat Berat",
    description: "Simulasi VR yang menampilkan berbagai skenario berbahaya saat bekerja dengan alat berat seperti excavator, crane, dan bulldozer. Pekerja akan belajar zona bahaya, komunikasi dengan operator, dan prosedur keselamatan standar.",
    duration: "20",
    videoUrl: "https://example.com/vr-videos/alat-berat-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/alat-berat.jpg",
    status: "active" as const,
    difficulty: "advanced" as const,
    learningObjectives: "1. Mengidentifikasi zona bahaya alat berat\n2. Memahami hand signal untuk operator\n3. Mengenali situasi berbahaya\n4. Prosedur keselamatan saat bekerja di sekitar alat berat"
  },
  {
    id: "3",
    title: "Penggunaan APD yang Benar",
    category: "APD & Perlindungan",
    description: "Panduan komprehensif tentang cara memilih, memakai, dan merawat Alat Pelindung Diri (APD) dengan benar. Mencakup helmet, safety shoes, sarung tangan, masker, dan pelindung mata.",
    duration: "12",
    videoUrl: "https://example.com/vr-videos/apd-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/apd.jpg",
    status: "active" as const,
    difficulty: "beginner" as const,
    learningObjectives: "1. Memilih APD yang sesuai dengan jenis pekerjaan\n2. Cara memakai APD dengan benar\n3. Merawat dan menyimpan APD\n4. Mengenali APD yang sudah tidak layak pakai"
  },
  {
    id: "4",
    title: "Penanganan Bahan Kimia Berbahaya (B3)",
    category: "Bahan Kimia",
    description: "Modul training untuk penanganan material berbahaya dan beracun (B3). Termasuk cara membaca MSDS, prosedur penyimpanan, penanganan tumpahan, dan penggunaan APD khusus.",
    duration: "18",
    videoUrl: "https://example.com/vr-videos/b3-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/b3.jpg",
    status: "active" as const,
    difficulty: "advanced" as const,
    learningObjectives: "1. Membaca dan memahami MSDS (Material Safety Data Sheet)\n2. Prosedur penyimpanan B3 yang aman\n3. Penanganan tumpahan kimia\n4. Penggunaan APD khusus untuk B3"
  },
  {
    id: "5",
    title: "Keselamatan Kerja di Ketinggian",
    category: "Ketinggian",
    description: "Simulasi bekerja di ketinggian dengan fokus pada penggunaan harness, scaffold, dan fall protection. Pekerja akan belajar teknik three-point contact dan prosedur rescue.",
    duration: "16",
    videoUrl: "https://example.com/vr-videos/ketinggian-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/ketinggian.jpg",
    status: "draft" as const,
    difficulty: "advanced" as const,
    learningObjectives: "1. Penggunaan full body harness yang benar\n2. Inspeksi peralatan kerja ketinggian\n3. Teknik three-point contact\n4. Prosedur rescue dasar"
  },
  {
    id: "6",
    title: "Prosedur Lock Out Tag Out (LOTO)",
    category: "Mesin & Peralatan",
    description: "Panduan lengkap prosedur LOTO untuk isolasi energi berbahaya sebelum maintenance. Mencakup electrical, mechanical, hydraulic, dan pneumatic energy isolation.",
    duration: "14",
    videoUrl: "https://example.com/vr-videos/loto-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/loto.jpg",
    status: "active" as const,
    difficulty: "intermediate" as const,
    learningObjectives: "1. Memahami konsep LOTO\n2. Identifikasi sumber energi berbahaya\n3. Prosedur lock out yang benar\n4. Verifikasi isolasi energi"
  },
  {
    id: "7",
    title: "Penanganan Situasi Darurat Listrik",
    category: "Kelistrikan",
    description: "Simulasi penanganan emergency terkait kelistrikan, termasuk electrical shock, arc flash, dan electrical fire. Fokus pada first response dan rescue procedures.",
    duration: "17",
    videoUrl: "https://example.com/vr-videos/listrik-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/listrik.jpg",
    status: "draft" as const,
    difficulty: "advanced" as const,
    learningObjectives: "1. Mengenali bahaya listrik\n2. First aid untuk electrical shock\n3. Prosedur pemadaman electrical fire\n4. Arc flash protection"
  },
  {
    id: "8",
    title: "Ergonomi dan Postur Kerja yang Aman",
    category: "Ergonomi",
    description: "Panduan tentang ergonomi di tempat kerja untuk mencegah musculoskeletal disorders (MSDs). Mencakup postur angkat beban, setup workstation, dan stretching exercises.",
    duration: "10",
    videoUrl: "https://example.com/vr-videos/ergonomi-360.mp4",
    thumbnailUrl: "https://example.com/thumbnails/ergonomi.jpg",
    status: "archived" as const,
    difficulty: "beginner" as const,
    learningObjectives: "1. Teknik angkat beban yang benar\n2. Setup workstation ergonomis\n3. Stretching exercises untuk pekerja\n4. Mengenali gejala MSDs"
  }
];

export default function AdminModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params?.id as string;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    videoUrl: "",
    thumbnailUrl: "",
    status: "draft" as "active" | "draft" | "archived",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    learningObjectives: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load module data based on ID
  useEffect(() => {
    if (moduleId === "new") {
      // New module - use empty form
      setIsLoading(false);
      return;
    }

    // Simulate fetching data from database
    const moduleData = MODULES_DATABASE.find(m => m.id === moduleId);

    if (moduleData) {
      setFormData({
        title: moduleData.title,
        category: moduleData.category,
        description: moduleData.description,
        duration: moduleData.duration,
        videoUrl: moduleData.videoUrl,
        thumbnailUrl: moduleData.thumbnailUrl,
        status: moduleData.status,
        difficulty: moduleData.difficulty,
        learningObjectives: moduleData.learningObjectives
      });
    } else {
      // Module not found - redirect or show error
      console.warn(`Module with ID ${moduleId} not found`);
      // Could redirect to modules list or show 404
    }

    setIsLoading(false);
  }, [moduleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert(`Modul "${formData.title}" berhasil disimpan!`);
      router.push('/admin/modules');
    }, 1500);
  };

  const handleCancel = () => {
    if (confirm("Perubahan yang belum disimpan akan hilang. Lanjutkan?")) {
      router.push('/admin/modules');
    }
  };

  const isNewModule = moduleId === "new";

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Memuat data modul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/admin/modules" className="hover:text-blue-600 transition-colors">
              Manajemen Modul
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">
              {isNewModule ? "Tambah Modul Baru" : "Edit Modul"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            {isNewModule ? "Buat Modul Training Baru" : `Edit: ${formData.title}`}
          </h1>
        </div>
        
        <Link
          href="/admin/modules"
          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Informasi Dasar</h2>
                <p className="text-sm text-slate-600">Detail utama modul training</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  Judul Modul <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul modul training..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Category & Duration - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Kebakaran & Api">Kebakaran & Api</option>
                    <option value="Alat Berat">Alat Berat</option>
                    <option value="APD & Perlindungan">APD & Perlindungan</option>
                    <option value="Bahan Kimia">Bahan Kimia</option>
                    <option value="Ketinggian">Ketinggian</option>
                    <option value="Mesin & Peralatan">Mesin & Peralatan</option>
                    <option value="Kelistrikan">Kelistrikan</option>
                    <option value="Ergonomi">Ergonomi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 mb-2">
                    Durasi (menit) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="15"
                      min="1"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi Modul <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Jelaskan detail modul training ini..."
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
                <p className="text-xs text-slate-500 mt-2">
                  {formData.description.length} karakter
                </p>
              </div>

              {/* Difficulty & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-semibold text-slate-700 mb-2">
                    Tingkat Kesulitan
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="beginner">Pemula</option>
                    <option value="intermediate">Menengah</option>
                    <option value="advanced">Lanjutan</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
                    Status Publikasi <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Aktif</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Objectives Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Tujuan Pembelajaran</h2>
                <p className="text-sm text-slate-600">Apa yang akan dipelajari pekerja</p>
              </div>
            </div>

            <div>
              <label htmlFor="learningObjectives" className="block text-sm font-semibold text-slate-700 mb-2">
                Objectives (satu per baris)
              </label>
              <textarea
                id="learningObjectives"
                name="learningObjectives"
                value={formData.learningObjectives}
                onChange={handleInputChange}
                placeholder="1. Objective pertama&#10;2. Objective kedua&#10;3. Objective ketiga"
                rows={6}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none font-mono text-sm"
              />
            </div>
          </div>

          {/* Video & Media Upload Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Video className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Media & Konten VR</h2>
                <p className="text-sm text-slate-600">Upload video 360° dan thumbnail</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Video URL */}
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-semibold text-slate-700 mb-2">
                  URL Video VR 360° <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Video className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mt-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-xl transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    <span>Upload Video dari Komputer</span>
                  </button>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label htmlFor="thumbnailUrl" className="block text-sm font-semibold text-slate-700 mb-2">
                  URL Thumbnail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="thumbnailUrl"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="mt-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    <span>Upload Thumbnail</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Video Preview Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Preview Video 360°</h3>
            
            {/* Video Preview Box */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-xl overflow-hidden mb-4 group">
              {formData.thumbnailUrl ? (
                <div className="absolute inset-0 bg-slate-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-all group-hover:scale-110">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white text-sm font-medium">Klik untuk Preview</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                      <Video className="w-8 h-8 text-white/60" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">Preview Video 360°</p>
                    <p className="text-white/60 text-xs mt-1">Upload video untuk melihat preview</p>
                  </div>
                </div>
              )}
              
              {/* 360° Indicator */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                360° VR
              </div>
            </div>

            {/* Module Info Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Durasi</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formData.duration || "-"} menit
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Kategori</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formData.category || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Status</span>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${
                  formData.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                  formData.status === 'draft' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-slate-100 text-slate-800 border-slate-200'
                }`}>
                  {formData.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                  {formData.status === 'draft' && <Clock className="w-3 h-3" />}
                  {formData.status === 'archived' && <AlertCircle className="w-3 h-3" />}
                  <span className="capitalize">{formData.status}</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Kesulitan</span>
                <span className="text-sm font-semibold text-slate-900 capitalize">
                  {formData.difficulty === 'beginner' ? 'Pemula' : 
                   formData.difficulty === 'intermediate' ? 'Menengah' : 'Lanjutan'}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview sebagai Worker</span>
              </button>
              
              {!isNewModule && (
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Hapus Modul</span>
                </button>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Tips Video VR 360°</p>
                <ul className="space-y-1 text-xs">
                  <li>• Format: MP4, WebM (H.264)</li>
                  <li>• Resolusi minimal: 4K (3840x2160)</li>
                  <li>• Metadata 360° harus ada</li>
                  <li>• Ukuran maksimal: 500MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - Sticky */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-lg rounded-t-2xl p-6 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">Terakhir diubah:</span> {new Date().toLocaleString('id-ID')}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              <span>Batal</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Modul</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}