"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  MoreVertical,
  PlaySquare,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  duration: string;
  views: number;
  completionRate: number;
  createdAt: string;
}

export default function AdminModulesPage() {
  // Dummy data
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Simulasi Evakuasi Kebakaran",
      category: "Kebakaran & Api",
      status: "active",
      duration: "15 menit",
      views: 247,
      completionRate: 85,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Bahaya Alat Berat di Konstruksi",
      category: "Alat Berat",
      status: "active",
      duration: "20 menit",
      views: 189,
      completionRate: 72,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Penggunaan APD yang Benar",
      category: "APD & Perlindungan",
      status: "active",
      duration: "12 menit",
      views: 312,
      completionRate: 91,
      createdAt: "2024-01-05"
    },
    {
      id: 4,
      title: "Penanganan Bahan Kimia Berbahaya (B3)",
      category: "Bahan Kimia",
      status: "active",
      duration: "18 menit",
      views: 156,
      completionRate: 68,
      createdAt: "2024-01-20"
    },
    {
      id: 5,
      title: "Keselamatan Kerja di Ketinggian",
      category: "Ketinggian",
      status: "draft",
      duration: "16 menit",
      views: 0,
      completionRate: 0,
      createdAt: "2024-02-01"
    },
    {
      id: 6,
      title: "Prosedur Lock Out Tag Out (LOTO)",
      category: "Mesin & Peralatan",
      status: "active",
      duration: "14 menit",
      views: 203,
      completionRate: 79,
      createdAt: "2024-01-25"
    },
    {
      id: 7,
      title: "Penanganan Situasi Darurat Listrik",
      category: "Kelistrikan",
      status: "draft",
      duration: "17 menit",
      views: 0,
      completionRate: 0,
      createdAt: "2024-02-05"
    },
    {
      id: 8,
      title: "Ergonomi dan Postur Kerja yang Aman",
      category: "Ergonomi",
      status: "archived",
      duration: "10 menit",
      views: 95,
      completionRate: 64,
      createdAt: "2023-12-20"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter modules based on search and status
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || module.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Delete handler (dummy)
  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'draft':
        return <Clock className="w-3 h-3" />;
      case 'archived':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Modul K3</h1>
          <p className="text-slate-600 mt-1">Kelola modul VR Training untuk pekerja</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <Link 
            href="/admin/modules/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/50"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Tambah Modul Baru</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Modul</p>
              <p className="text-2xl font-bold text-slate-900">{modules.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <PlaySquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {modules.filter(m => m.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">
                {modules.filter(m => m.status === 'draft').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Archived</p>
              <p className="text-2xl font-bold text-slate-600">
                {modules.filter(m => m.status === 'archived').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search Bar */}
          <div className="relative flex-1 md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari modul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "all"
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "active"
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilterStatus("draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "draft"
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => setFilterStatus("archived")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "archived"
                  ? 'bg-slate-600 text-white shadow-lg shadow-slate-500/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredModules.length}</span> dari{' '}
          <span className="font-semibold text-slate-900">{modules.length}</span> modul
        </div>
      </div>

      {/* Modules Table */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Modul
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Durasi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Completion
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredModules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">Tidak ada modul ditemukan</p>
                        <p className="text-sm text-slate-500 mt-1">Coba ubah kata kunci pencarian atau filter</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredModules.map((module) => (
                  <tr 
                    key={module.id} 
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <PlaySquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {module.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Dibuat: {new Date(module.createdAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {module.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Eye className="w-4 h-4" />
                        <span>{module.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                            style={{ width: `${module.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
                          {module.completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(module.status)}`}>
                        {getStatusIcon(module.status)}
                        <span className="capitalize">{module.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/modules/${module.id}`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(module.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                          title="More"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        {filteredModules.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Menampilkan <span className="font-semibold">{filteredModules.length}</span> modul
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 rounded text-sm font-medium text-slate-700 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 rounded text-sm font-medium text-slate-700 transition-colors">
                2
              </button>
              <button className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 rounded text-sm font-medium text-slate-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}