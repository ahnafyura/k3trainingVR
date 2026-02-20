"use client";

import { useState, useEffect } from 'react';
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
  Clock,
  Loader2,
  X
} from 'lucide-react';
import { collection, getDocs, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  duration_minutes: number;
  difficulty: string;
  video_url: string;
  thumbnail_url: string;
  created_at: any;
}

export default function AdminModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // State untuk modal tambah modul
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    duration_minutes: 15,
    status: 'active',
    video_url: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const snapshot = await getDocs(collection(db, "modules"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || '',
        description: doc.data().description || '',
        category: doc.data().category || '',
        status: doc.data().status || 'draft',
        duration_minutes: doc.data().duration_minutes || 0,
        difficulty: doc.data().difficulty || 'beginner',
        video_url: doc.data().video_url || '',
        thumbnail_url: doc.data().thumbnail_url || '',
        created_at: doc.data().created_at,
      })) as Module[];

      data.sort((a, b) => {
        const dateA = a.created_at?.seconds || 0;
        const dateB = b.created_at?.seconds || 0;
        return dateB - dateA;
      });

      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tambah modul baru
  const handleAddModule = async () => {
    if (!newModule.title.trim()) return;
    setAdding(true);
    try {
      await addDoc(collection(db, "modules"), {
        ...newModule,
        duration_minutes: Number(newModule.duration_minutes),
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      setShowAddModal(false);
      setNewModule({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        duration_minutes: 15,
        status: 'active',
        video_url: '',
        thumbnail_url: '',
      });
      await fetchModules();
    } catch (error) {
      console.error("Error adding module:", error);
    } finally {
      setAdding(false);
    }
  };

  // Hapus modul
  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "modules", deleteTargetId));
      setModules(prev => prev.filter(m => m.id !== deleteTargetId));
    } catch (error) {
      console.error("Error deleting module:", error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    }
  };

  // Format tanggal
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  // Filter
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || module.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-3 h-3" />;
      case 'draft': return <Clock className="w-3 h-3" />;
      case 'archived': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'Pemula';
      case 'intermediate': return 'Menengah';
      case 'advanced': return 'Lanjutan';
      default: return diff;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat data modul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Modul K3</h1>
          <p className="text-slate-600 mt-1">Kelola modul VR Training untuk pekerja</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/50"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Tambah Modul Baru</span>
          </button>
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
              <p className="text-2xl font-bold text-green-600">{modules.filter(m => m.status === 'active').length}</p>
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
              <p className="text-2xl font-bold text-yellow-600">{modules.filter(m => m.status === 'draft').length}</p>
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
              <p className="text-2xl font-bold text-slate-600">{modules.filter(m => m.status === 'archived').length}</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
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
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-600" />
            {['all', 'active', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? status === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : status === 'active' ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                    : status === 'draft' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/50'
                    : 'bg-slate-600 text-white shadow-lg shadow-slate-500/50'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'Semua' : status === 'active' ? 'Aktif' : status === 'draft' ? 'Draft' : 'Archived'}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredModules.length}</span> dari{' '}
          <span className="font-semibold text-slate-900">{modules.length}</span> modul
        </div>
      </div>

      {/* Modules Table */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Modul</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Durasi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tingkat</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredModules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <PlaySquare className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">
                          {modules.length === 0 ? 'Belum ada modul' : 'Tidak ada modul ditemukan'}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {modules.length === 0 ? 'Klik "Tambah Modul Baru" untuk membuat modul pertama' : 'Coba ubah kata kunci pencarian atau filter'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredModules.map((module) => (
                  <tr key={module.id} className="hover:bg-slate-50/80 transition-colors group">
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
                            Dibuat: {formatDate(module.created_at)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {module.category || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration_minutes} menit</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{getDifficultyLabel(module.difficulty)}</span>
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
                          onClick={() => handleDeleteClick(module.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Module Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Tambah Modul Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Modul *</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="contoh: Simulasi Evakuasi Kebakaran"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea
                  value={newModule.description}
                  onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi singkat modul training..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Kategori & Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={newModule.category}
                    onChange={(e) => setNewModule(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="contoh: Kebakaran"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat Kesulitan</label>
                  <select
                    value={newModule.difficulty}
                    onChange={(e) => setNewModule(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Pemula</option>
                    <option value="intermediate">Menengah</option>
                    <option value="advanced">Lanjutan</option>
                  </select>
                </div>
              </div>

              {/* Durasi & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Durasi (menit)</label>
                  <input
                    type="number"
                    value={newModule.duration_minutes}
                    onChange={(e) => setNewModule(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 0 }))}
                    min={1}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={newModule.status}
                    onChange={(e) => setNewModule(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Aktif</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Video URL (opsional)</label>
                <input
                  type="text"
                  value={newModule.video_url}
                  onChange={(e) => setNewModule(prev => ({ ...prev, video_url: e.target.value }))}
                  placeholder="URL video 360° (bisa diisi nanti)"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                disabled={adding}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddModule}
                disabled={adding || !newModule.title.trim()}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-lg shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {adding ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Menyimpan...
                  </>
                ) : 'Simpan Modul'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Hapus Modul?</h3>
            <p className="text-slate-500 text-sm text-center mt-2">Aksi ini tidak bisa dibatalkan. Modul akan dihapus dari database.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDeleteModal(false)} disabled={deleting} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium disabled:opacity-50">Batal</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-medium shadow-lg shadow-red-500/30 disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Menghapus...
                  </>
                ) : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
