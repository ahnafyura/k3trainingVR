"use client";

import { useState } from 'react';
import { 
  Award,
  Download,
  Share2,
  Calendar,
  Star,
  CheckCircle2,
  Filter,
  Search,
  Eye,
  Printer,
  Mail
} from 'lucide-react';

interface Certificate {
  id: number;
  moduleTitle: string;
  category: string;
  completedDate: string;
  score: number;
  certificateNumber: string;
  validUntil: string;
  instructor: string;
}

export default function WorkerCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const [certificates] = useState<Certificate[]>([
    {
      id: 1,
      moduleTitle: "Simulasi Evakuasi Kebakaran",
      category: "Kebakaran & Api",
      completedDate: "2024-02-10",
      score: 95,
      certificateNumber: "K3-FIRE-2024-001",
      validUntil: "2027-02-10",
      instructor: "Ir. Ahmad Santoso"
    },
    {
      id: 2,
      moduleTitle: "Penggunaan APD yang Benar",
      category: "APD & Perlindungan",
      completedDate: "2024-02-08",
      score: 88,
      certificateNumber: "K3-PPE-2024-002",
      validUntil: "2027-02-08",
      instructor: "Dr. Siti Rahayu"
    },
    {
      id: 3,
      moduleTitle: "Prosedur Lock Out Tag Out (LOTO)",
      category: "Mesin & Peralatan",
      completedDate: "2024-02-05",
      score: 92,
      certificateNumber: "K3-LOTO-2024-003",
      validUntil: "2027-02-05",
      instructor: "Ir. Budi Hartono"
    },
    {
      id: 4,
      moduleTitle: "Penanganan Bahan Kimia Berbahaya",
      category: "Bahan Kimia",
      completedDate: "2024-01-28",
      score: 90,
      certificateNumber: "K3-CHEM-2024-004",
      validUntil: "2027-01-28",
      instructor: "Dr. Maria Kusuma"
    },
    {
      id: 5,
      moduleTitle: "Keselamatan Kerja di Ketinggian",
      category: "Ketinggian",
      completedDate: "2024-01-20",
      score: 87,
      certificateNumber: "K3-HEIGHT-2024-005",
      validUntil: "2027-01-20",
      instructor: "Ir. Andi Wijaya"
    },
    {
      id: 6,
      moduleTitle: "Bahaya Alat Berat di Konstruksi",
      category: "Alat Berat",
      completedDate: "2024-01-15",
      score: 93,
      certificateNumber: "K3-HEAVY-2024-006",
      validUntil: "2027-01-15",
      instructor: "Ir. Hendra Gunawan"
    }
  ]);

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || cert.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(certificates.map(c => c.category)));

  // Stats
  const thisMonthCerts = certificates.filter(c => {
    const certDate = new Date(c.completedDate);
    const now = new Date();
    return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
  }).length;

  const averageScore = Math.round(
    certificates.reduce((acc, c) => acc + c.score, 0) / certificates.length
  );

  const handleDownload = (cert: Certificate) => {
    alert(`Mengunduh sertifikat: ${cert.certificateNumber}`);
  };

  const handleShare = (cert: Certificate) => {
    alert(`Membagikan sertifikat: ${cert.moduleTitle}`);
  };

  const handlePreview = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sertifikat Saya</h1>
        <p className="text-slate-600 mt-1">Koleksi sertifikat K3 yang telah Anda peroleh</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-blue-600">{certificates.length}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Total Sertifikat</h3>
          <p className="text-xs text-slate-500 mt-1">Semua kategori</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-green-600">{thisMonthCerts}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Bulan Ini</h3>
          <p className="text-xs text-slate-500 mt-1">Sertifikat baru</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
            </div>
            <span className="text-3xl font-bold text-purple-600">{averageScore}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Rata-rata Skor</h3>
          <p className="text-xs text-slate-500 mt-1">Dari semua modul</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-orange-600">3</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Masa Berlaku</h3>
          <p className="text-xs text-slate-500 mt-1">Tahun valid</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari sertifikat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-5 h-5 text-slate-600 flex-shrink-0" />
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filterCategory === "all"
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredCertificates.length}</span> sertifikat
        </div>
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tidak ada sertifikat ditemukan</h3>
            <p className="text-slate-600">Coba ubah kata kunci pencarian atau filter yang dipilih</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Certificate Preview/Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6 flex flex-col justify-between">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-white" />
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      VERIFIED
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {cert.moduleTitle}
                  </h3>
                </div>

                <div className="relative text-white/80 text-xs font-mono">
                  {cert.certificateNumber}
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Kategori:</span>
                    <span className="font-semibold text-slate-900">{cert.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tanggal:</span>
                    <span className="font-semibold text-slate-900">{cert.completedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Skor:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-green-600">{cert.score}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Berlaku s/d:</span>
                    <span className="font-semibold text-slate-900">{cert.validUntil}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Instruktur:</span>
                    <span className="font-semibold text-slate-900 text-right line-clamp-1">
                      {cert.instructor}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handlePreview(cert)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare(cert)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Preview */}
            <div className="aspect-[1.414/1] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
              
              {/* Certificate Content */}
              <div className="relative h-full flex flex-col justify-between border-8 border-blue-600 rounded-2xl bg-white p-8">
                {/* Header */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">SERTIFIKAT</h1>
                  <p className="text-xl text-blue-600 font-semibold">Keselamatan dan Kesehatan Kerja (K3)</p>
                </div>

                {/* Body */}
                <div className="text-center space-y-4">
                  <p className="text-lg text-slate-700">Diberikan kepada:</p>
                  <h2 className="text-3xl font-bold text-slate-900">Budi Santoso</h2>
                  <p className="text-lg text-slate-700">Telah berhasil menyelesaikan modul:</p>
                  <h3 className="text-2xl font-bold text-blue-600">{selectedCertificate.moduleTitle}</h3>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-slate-700">dengan skor:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold text-green-600">{selectedCertificate.score}%</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="h-px bg-slate-300 w-48 mx-auto mb-2"></div>
                    <p className="text-sm text-slate-600">Instruktur</p>
                    <p className="font-semibold text-slate-900">{selectedCertificate.instructor}</p>
                  </div>
                  <div>
                    <div className="h-px bg-slate-300 w-48 mx-auto mb-2"></div>
                    <p className="text-sm text-slate-600">Tanggal Terbit</p>
                    <p className="font-semibold text-slate-900">{selectedCertificate.completedDate}</p>
                  </div>
                </div>

                {/* Certificate Number */}
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-mono">
                    No. Sertifikat: {selectedCertificate.certificateNumber}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Berlaku hingga: {selectedCertificate.validUntil}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 px-8 py-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Tutup
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDownload(selectedCertificate)}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  className="flex items-center space-x-2 px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => handleShare(selectedCertificate)}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}