"use client";

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Flame,
  Star,
  FileText,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminReportsPage() {
  const [period, setPeriod] = useState('6bulan');
  const [loading, setLoading] = useState(true);

  // State data real
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalModules, setTotalModules] = useState(0);
  const [activeModules, setActiveModules] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [completedProgress, setCompletedProgress] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [modulesData, setModulesData] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      // 1. Ambil semua users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsersData(users);
      setTotalUsers(users.length);
      setTotalWorkers(users.filter((u: any) => u.role === "worker").length);
      setTotalAdmins(users.filter((u: any) => u.role === "admin").length);

      // 2. Ambil semua modules
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modules = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setModulesData(modules);
      setTotalModules(modules.length);
      setActiveModules(modules.filter((m: any) => m.status === "active").length);

      // 3. Ambil semua progress
      const progressSnapshot = await getDocs(collection(db, "user_progress"));
      const progress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProgressData(progress);
      setTotalProgress(progress.length);
      
      const completed = progress.filter((p: any) => p.status === "completed");
      setCompletedProgress(completed.length);
      setInProgressCount(progress.filter((p: any) => p.status === "in_progress").length);

      // Hitung rata-rata skor
      if (completed.length > 0) {
        const total = completed.reduce((sum: number, p: any) => sum + (p.score || 0), 0);
        setAvgScore(Math.round(total / completed.length));
      }

    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-100 text-emerald-700';
    if (score >= 70) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  // Hitung completion breakdown persentase
  const completionBreakdown = (() => {
    if (totalWorkers === 0 || totalModules === 0) {
      return { completed: 0, inProgress: 0, notStarted: 100 };
    }
    const totalSlots = totalWorkers * totalModules;
    const compPct = Math.round((completedProgress / totalSlots) * 100);
    const inProgPct = Math.round((inProgressCount / totalSlots) * 100);
    const notStartedPct = 100 - compPct - inProgPct;
    return { completed: compPct, inProgress: inProgPct, notStarted: Math.max(0, notStartedPct) };
  })();

  // Top workers by score from progress data
  const topWorkers = (() => {
    if (progressData.length === 0 || usersData.length === 0) return [];
    
    const workerScores: Record<string, { totalScore: number; count: number; userId: string }> = {};
    progressData.filter((p: any) => p.status === "completed").forEach((p: any) => {
      if (!workerScores[p.user_id]) {
        workerScores[p.user_id] = { totalScore: 0, count: 0, userId: p.user_id };
      }
      workerScores[p.user_id].totalScore += (p.score || 0);
      workerScores[p.user_id].count += 1;
    });

    return Object.values(workerScores)
      .map(ws => {
        const user = usersData.find((u: any) => u.id === ws.userId);
        return {
          name: user?.name || "Unknown",
          department: user?.department || "-",
          modulesCompleted: ws.count,
          avgScore: Math.round(ws.totalScore / ws.count),
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 5);
  })();

  // Top modules by completion count
  const topModules = (() => {
    if (progressData.length === 0 || modulesData.length === 0) return [];

    const moduleCompletions: Record<string, { count: number; totalScore: number; moduleId: string }> = {};
    progressData.filter((p: any) => p.status === "completed").forEach((p: any) => {
      if (!moduleCompletions[p.module_id]) {
        moduleCompletions[p.module_id] = { count: 0, totalScore: 0, moduleId: p.module_id };
      }
      moduleCompletions[p.module_id].count += 1;
      moduleCompletions[p.module_id].totalScore += (p.score || 0);
    });

    return Object.values(moduleCompletions)
      .map(mc => {
        const mod = modulesData.find((m: any) => m.id === mc.moduleId);
        return {
          title: mod?.title || "Unknown Module",
          completions: mc.count,
          avgScore: Math.round(mc.totalScore / mc.count),
        };
      })
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 5);
  })();

  // Department stats
  const departmentStats = (() => {
    const workers = usersData.filter((u: any) => u.role === "worker");
    if (workers.length === 0) return [];

    const deptMap: Record<string, { workers: number; userIds: string[] }> = {};
    workers.forEach((w: any) => {
      const dept = w.department || "Lainnya";
      if (!deptMap[dept]) deptMap[dept] = { workers: 0, userIds: [] };
      deptMap[dept].workers += 1;
      deptMap[dept].userIds.push(w.id);
    });

    return Object.entries(deptMap).map(([name, data]) => {
      const deptProgress = progressData.filter((p: any) => data.userIds.includes(p.user_id));
      const deptCompleted = deptProgress.filter((p: any) => p.status === "completed");
      const avgCompletion = totalModules > 0 
        ? Math.round((deptCompleted.length / (data.workers * totalModules)) * 100) 
        : 0;
      const deptAvgScore = deptCompleted.length > 0
        ? Math.round(deptCompleted.reduce((sum: number, p: any) => sum + (p.score || 0), 0) / deptCompleted.length)
        : 0;

      return { name, workers: data.workers, avgCompletion, avgScore: deptAvgScore };
    });
  })();

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Laporan & Analitik</h1>
          <p className="text-slate-500 mt-1">Pantau performa training K3 secara keseluruhan</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-9 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="1bulan">1 Bulan Terakhir</option>
              <option value="3bulan">3 Bulan Terakhir</option>
              <option value="6bulan">6 Bulan Terakhir</option>
              <option value="1tahun">1 Tahun</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-lg shadow-blue-500/30">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Pengguna", value: totalUsers.toString(),
            icon: Users, iconBg: "bg-blue-100", iconColor: "text-blue-600",
            sub: `${totalAdmins} admin, ${totalWorkers} pekerja`
          },
          {
            label: "Rata-rata Skor", value: avgScore > 0 ? `${avgScore}%` : '-',
            icon: Target, iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
            sub: `${completedProgress} training selesai`
          },
          {
            label: "Modul Training", value: totalModules.toString(),
            icon: BookOpen, iconBg: "bg-purple-100", iconColor: "text-purple-600",
            sub: `${activeModules} aktif`
          },
          {
            label: "Training Selesai", value: completedProgress.toString(),
            icon: CheckCircle2, iconBg: "bg-amber-100", iconColor: "text-amber-600",
            sub: `${inProgressCount} sedang berlangsung`
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
            <p className="text-slate-400 text-xs mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Registration Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Daftar Pengguna</h2>
              <p className="text-slate-500 text-sm">Semua user terdaftar di sistem</p>
            </div>
          </div>

          {usersData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <Users className="w-12 h-12 mb-3" />
              <p className="font-medium">Belum ada pengguna</p>
              <p className="text-sm">Data akan muncul setelah ada user yang register</p>
            </div>
          ) : (
            <div className="space-y-3">
              {usersData.slice(0, 8).map((user: any, i: number) => (
                <div key={user.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                    user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                  }`}>
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm">{user.name || '-'}</p>
                    <p className="text-xs text-slate-500">{user.email} • NIK: {user.nik || '-'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Pekerja'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completion Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Status Penyelesaian</h2>
          <p className="text-slate-500 text-sm mb-6">Distribusi progress seluruh pekerja</p>

          {/* Visual ring */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: totalWorkers === 0 || totalModules === 0
                    ? '#e2e8f0'
                    : `conic-gradient(
                      #10b981 0% ${completionBreakdown.completed}%,
                      #f59e0b ${completionBreakdown.completed}% ${completionBreakdown.completed + completionBreakdown.inProgress}%,
                      #e2e8f0 ${completionBreakdown.completed + completionBreakdown.inProgress}% 100%
                    )`
                }}
              />
              <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{completionBreakdown.completed}%</span>
                <span className="text-xs text-slate-500">Selesai</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Selesai
              </span>
              <span className="text-sm font-semibold text-slate-900">{completionBreakdown.completed}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span> Sedang Dikerjakan
              </span>
              <span className="text-sm font-semibold text-slate-900">{completionBreakdown.inProgress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-3 h-3 bg-slate-200 rounded-full"></span> Belum Mulai
              </span>
              <span className="text-sm font-semibold text-slate-900">{completionBreakdown.notStarted}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      {departmentStats.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Performa per Departemen</h2>
              <p className="text-slate-500 text-sm">Perbandingan tingkat penyelesaian & skor antar departemen</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {departmentStats.map((dept, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 text-sm">{dept.name}</h3>
                  <span className="text-xs text-slate-500">{dept.workers} pekerja</span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Penyelesaian</span>
                    <span className="text-xs font-semibold text-slate-700">{dept.avgCompletion}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        dept.avgCompletion >= 80 ? 'bg-emerald-500' : dept.avgCompletion >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dept.avgCompletion}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Rata-rata Skor</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getScoreBg(dept.avgScore)}`}>
                    {dept.avgScore > 0 ? dept.avgScore : '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Row: Top Modules & Top Workers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Modules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Modul Terpopuler</h2>
              <p className="text-slate-500 text-sm">Berdasarkan jumlah penyelesaian</p>
            </div>
            <BookOpen className="w-5 h-5 text-slate-400" />
          </div>
          {topModules.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400">
              <BookOpen className="w-10 h-10 mb-2" />
              <p className="text-sm">Belum ada data modul</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topModules.map((mod, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-amber-100 text-amber-700' :
                    i === 1 ? 'bg-slate-100 text-slate-600' :
                    i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-50 text-slate-500'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">{mod.title}</p>
                    <span className="text-xs text-slate-500">{mod.completions} selesai</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${getScoreColor(mod.avgScore)}`}>{mod.avgScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Workers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pekerja Terbaik</h2>
              <p className="text-slate-500 text-sm">Berdasarkan skor rata-rata</p>
            </div>
            <Flame className="w-5 h-5 text-slate-400" />
          </div>
          {topWorkers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400">
              <Users className="w-10 h-10 mb-2" />
              <p className="text-sm">Belum ada data progress</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topWorkers.map((worker, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-amber-100 text-amber-700' :
                    i === 1 ? 'bg-slate-100 text-slate-600' :
                    i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-50 text-slate-500'
                  }`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm">{worker.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-500">{worker.department}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{worker.modulesCompleted} modul</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${getScoreColor(worker.avgScore)}`}>{worker.avgScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Ringkasan Data</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>{totalUsers}</strong> total pengguna terdaftar ({totalAdmins} admin, {totalWorkers} pekerja)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>{totalModules}</strong> modul training tersedia ({activeModules} aktif)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>{completedProgress}</strong> training telah diselesaikan dengan rata-rata skor {avgScore > 0 ? `${avgScore}%` : '-'}</span>
              </li>
              {totalWorkers === 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Belum ada pekerja terdaftar — laporan akan lebih lengkap setelah ada data</span>
                </li>
              )}
              {totalModules === 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Belum ada modul training — tambahkan modul untuk mulai tracking progress</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
