"use client";

import { useState } from 'react';
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  HardHat,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  nik: string;
  email: string;
  phone: string;
  role: 'admin' | 'worker';
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  modulesCompleted: number;
  totalModules: number;
  lastActive: string;
  joinedAt: string;
  avgScore: number;
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Dummy users data
  const [users] = useState<User[]>([
    {
      id: 1, name: "Budi Santoso", nik: "K3-2024-001", email: "budi.santoso@company.com",
      phone: "081234567890", role: "worker", department: "Konstruksi", status: "active",
      modulesCompleted: 6, totalModules: 8, lastActive: "5 menit lalu", joinedAt: "2024-01-15", avgScore: 92
    },
    {
      id: 2, name: "Siti Nurhaliza", nik: "K3-2024-002", email: "siti.nurhaliza@company.com",
      phone: "081234567891", role: "worker", department: "Laboratorium", status: "active",
      modulesCompleted: 4, totalModules: 8, lastActive: "1 jam lalu", joinedAt: "2024-01-20", avgScore: 87
    },
    {
      id: 3, name: "Ahmad Dahlan", nik: "K3-2024-003", email: "ahmad.dahlan@company.com",
      phone: "081234567892", role: "worker", department: "Konstruksi", status: "active",
      modulesCompleted: 8, totalModules: 8, lastActive: "30 menit lalu", joinedAt: "2024-01-10", avgScore: 95
    },
    {
      id: 4, name: "Rina Wijaya", nik: "K3-2024-004", email: "rina.wijaya@company.com",
      phone: "081234567893", role: "worker", department: "Gudang", status: "inactive",
      modulesCompleted: 2, totalModules: 8, lastActive: "3 hari lalu", joinedAt: "2024-02-01", avgScore: 74
    },
    {
      id: 5, name: "Dedi Kurniawan", nik: "K3-2024-005", email: "dedi.kurniawan@company.com",
      phone: "081234567894", role: "worker", department: "Mekanik", status: "active",
      modulesCompleted: 5, totalModules: 8, lastActive: "2 jam lalu", joinedAt: "2024-01-25", avgScore: 83
    },
    {
      id: 6, name: "Maya Sari", nik: "K3-2024-006", email: "maya.sari@company.com",
      phone: "081234567895", role: "worker", department: "Laboratorium", status: "suspended",
      modulesCompleted: 1, totalModules: 8, lastActive: "1 minggu lalu", joinedAt: "2024-02-10", avgScore: 60
    },
    {
      id: 7, name: "Admin K3", nik: "ADM-001", email: "admin@k3company.com",
      phone: "081234567896", role: "admin", department: "HSE", status: "active",
      modulesCompleted: 8, totalModules: 8, lastActive: "Online", joinedAt: "2023-12-01", avgScore: 98
    },
    {
      id: 8, name: "Hendra Pratama", nik: "K3-2024-007", email: "hendra.pratama@company.com",
      phone: "081234567897", role: "worker", department: "Konstruksi", status: "active",
      modulesCompleted: 7, totalModules: 8, lastActive: "15 menit lalu", joinedAt: "2024-01-18", avgScore: 90
    },
    {
      id: 9, name: "Fitri Handayani", nik: "K3-2024-008", email: "fitri.handayani@company.com",
      phone: "081234567898", role: "worker", department: "Gudang", status: "active",
      modulesCompleted: 3, totalModules: 8, lastActive: "4 jam lalu", joinedAt: "2024-02-05", avgScore: 78
    },
    {
      id: 10, name: "Rudi Hermawan", nik: "K3-2024-009", email: "rudi.hermawan@company.com",
      phone: "081234567899", role: "worker", department: "Mekanik", status: "inactive",
      modulesCompleted: 0, totalModules: 8, lastActive: "2 minggu lalu", joinedAt: "2024-02-15", avgScore: 0
    },
    {
      id: 11, name: "Dewi Lestari", nik: "K3-2024-010", email: "dewi.lestari@company.com",
      phone: "081234567800", role: "worker", department: "Laboratorium", status: "active",
      modulesCompleted: 5, totalModules: 8, lastActive: "45 menit lalu", joinedAt: "2024-01-22", avgScore: 86
    },
    {
      id: 12, name: "Supervisor HSE", nik: "ADM-002", email: "supervisor@k3company.com",
      phone: "081234567801", role: "admin", department: "HSE", status: "active",
      modulesCompleted: 8, totalModules: 8, lastActive: "10 menit lalu", joinedAt: "2023-12-15", avgScore: 96
    }
  ]);

  // Filter logic
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalWorkers = users.filter(u => u.role === 'worker').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const avgCompletion = Math.round(
    users.filter(u => u.role === 'worker').reduce((acc, u) => acc + (u.modulesCompleted / u.totalModules) * 100, 0) / totalWorkers
  );

  // Helpers
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-3 h-3" /> Aktif
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <Clock className="w-3 h-3" /> Tidak Aktif
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" /> Ditangguhkan
          </span>
        );
      default: return null;
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          <Shield className="w-3 h-3" /> Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <HardHat className="w-3 h-3" /> Pekerja
      </span>
    );
  };

  const getProgressColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-500';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const toggleSelectUser = (id: number) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting user:', deleteTargetId);
    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Kelola Pengguna</h1>
          <p className="text-slate-500 mt-1">Manajemen akun pekerja dan administrator</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-lg shadow-blue-500/30">
            <Plus className="w-4 h-4" /> Tambah User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Pekerja", value: totalWorkers, icon: HardHat, color: "blue", growth: "+8.2%" },
          { label: "Total Admin", value: totalAdmins, icon: Shield, color: "purple" },
          { label: "User Aktif", value: activeUsers, icon: UserCheck, color: "emerald" },
          { label: "Rata-rata Penyelesaian", value: `${avgCompletion}%`, icon: TrendingUp, color: "amber" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              {stat.growth && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.growth}</span>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" placeholder="Cari nama, NIK, email, atau departemen..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="worker">Pekerja</option>
            </select>
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
            <option value="suspended">Ditangguhkan</option>
          </select>
        </div>

        {selectedUsers.length > 0 && (
          <div className="mt-3 flex items-center gap-3 px-3 py-2 bg-blue-50 rounded-xl">
            <span className="text-sm text-blue-700 font-medium">{selectedUsers.length} user dipilih</span>
            <button className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all font-medium">Hapus Terpilih</button>
            <button onClick={() => setSelectedUsers([])} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all font-medium">Batal</button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-4">
                  <input type="checkbox" checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={toggleSelectAll} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengguna</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Departemen</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Role</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Progress</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">Terakhir Aktif</th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((user) => {
                const completionPct = user.totalModules > 0 ? Math.round((user.modulesCompleted / user.totalModules) * 100) : 0;
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <input type="checkbox" checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                          user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                        }`}>
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                          <p className="text-slate-500 text-xs">{user.nik}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell"><span className="text-sm text-slate-700">{user.department}</span></td>
                    <td className="px-5 py-4 hidden lg:table-cell">{getRoleBadge(user.role)}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[120px]">
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${getProgressColor(completionPct)}`} style={{ width: `${completionPct}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-600 whitespace-nowrap">{user.modulesCompleted}/{user.totalModules}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-5 py-4 hidden xl:table-cell"><span className="text-sm text-slate-500">{user.lastActive}</span></td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-blue-600" title="Lihat Detail"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-amber-600" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteClick(user.id)} className="p-2 hover:bg-red-50 rounded-lg transition-all text-slate-400 hover:text-red-600" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <UserX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Tidak ada pengguna ditemukan</p>
                    <p className="text-slate-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 bg-slate-50/50">
            <p className="text-sm text-slate-500">
              Menampilkan {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredUsers.length)} dari {filteredUsers.length} pengguna
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'border border-slate-200 text-slate-600 hover:bg-white'
                  }`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Hapus Pengguna?</h3>
            <p className="text-slate-500 text-sm text-center mt-2">Aksi ini tidak bisa dibatalkan. Semua data progress pengguna akan ikut terhapus.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium">Batal</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-medium shadow-lg shadow-red-500/30">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}