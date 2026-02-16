"use client";

import { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

interface MonthlyData {
  month: string;
  completions: number;
  enrollments: number;
  avgScore: number;
}

interface TopModule {
  id: number;
  title: string;
  completions: number;
  avgScore: number;
  avgDuration: string;
  trend: 'up' | 'down' | 'stable';
}

interface TopWorker {
  id: number;
  name: string;
  department: string;
  modulesCompleted: number;
  avgScore: number;
  totalHours: number;
}

interface DepartmentStat {
  name: string;
  workers: number;
  avgCompletion: number;
  avgScore: number;
  color: string;
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState('6bulan');

  // Summary stats
  const summaryStats = {
    totalCompletions: 1247,
    completionGrowth: 12.5,
    avgScore: 84.3,
    scoreGrowth: 3.2,
    totalHours: 562,
    hoursGrowth: 18.7,
    certificatesIssued: 189,
    certGrowth: 22.1,
  };

  // Monthly trend data
  const monthlyData: MonthlyData[] = [
    { month: "Sep", completions: 145, enrollments: 180, avgScore: 78 },
    { month: "Okt", completions: 178, enrollments: 210, avgScore: 80 },
    { month: "Nov", completions: 203, enrollments: 195, avgScore: 82 },
    { month: "Des", completions: 167, enrollments: 220, avgScore: 81 },
    { month: "Jan", completions: 245, enrollments: 260, avgScore: 85 },
    { month: "Feb", completions: 309, enrollments: 285, avgScore: 87 },
  ];

  // Top modules
  const topModules: TopModule[] = [
    { id: 1, title: "Simulasi Evakuasi Kebakaran", completions: 247, avgScore: 88, avgDuration: "14 menit", trend: "up" },
    { id: 3, title: "Penggunaan APD yang Benar", completions: 312, avgScore: 91, avgDuration: "11 menit", trend: "up" },
    { id: 2, title: "Bahaya Alat Berat di Konstruksi", completions: 189, avgScore: 79, avgDuration: "19 menit", trend: "stable" },
    { id: 4, title: "Penanganan Bahan Kimia (B3)", completions: 156, avgScore: 72, avgDuration: "17 menit", trend: "down" },
    { id: 6, title: "Prosedur LOTO", completions: 203, avgScore: 85, avgDuration: "13 menit", trend: "up" },
  ];

  // Top workers
  const topWorkers: TopWorker[] = [
    { id: 3, name: "Ahmad Dahlan", department: "Konstruksi", modulesCompleted: 8, avgScore: 95, totalHours: 12 },
    { id: 7, name: "Hendra Pratama", department: "Konstruksi", modulesCompleted: 7, avgScore: 90, totalHours: 10 },
    { id: 1, name: "Budi Santoso", department: "Konstruksi", modulesCompleted: 6, avgScore: 92, totalHours: 9 },
    { id: 2, name: "Siti Nurhaliza", department: "Laboratorium", modulesCompleted: 4, avgScore: 87, totalHours: 7 },
    { id: 11, name: "Dewi Lestari", department: "Laboratorium", modulesCompleted: 5, avgScore: 86, totalHours: 8 },
  ];

  // Department stats
  const departmentStats: DepartmentStat[] = [
    { name: "Konstruksi", workers: 45, avgCompletion: 82, avgScore: 88, color: "blue" },
    { name: "Laboratorium", workers: 32, avgCompletion: 75, avgScore: 85, color: "purple" },
    { name: "Gudang", workers: 28, avgCompletion: 68, avgScore: 79, color: "amber" },
    { name: "Mekanik", workers: 38, avgCompletion: 71, avgScore: 82, color: "emerald" },
    { name: "HSE", workers: 12, avgCompletion: 95, avgScore: 94, color: "rose" },
  ];

  // Completion status breakdown
  const completionBreakdown = {
    completed: 65,
    inProgress: 22,
    notStarted: 13,
  };

  // Max value for bar chart scaling
  const maxCompletions = Math.max(...monthlyData.map(d => Math.max(d.completions, d.enrollments)));

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
            label: "Total Penyelesaian", value: summaryStats.totalCompletions.toLocaleString(),
            growth: summaryStats.completionGrowth, icon: CheckCircle2, iconBg: "bg-emerald-100", iconColor: "text-emerald-600"
          },
          {
            label: "Rata-rata Skor", value: `${summaryStats.avgScore}%`,
            growth: summaryStats.scoreGrowth, icon: Target, iconBg: "bg-blue-100", iconColor: "text-blue-600"
          },
          {
            label: "Total Jam Training", value: `${summaryStats.totalHours}`,
            growth: summaryStats.hoursGrowth, icon: Clock, iconBg: "bg-purple-100", iconColor: "text-purple-600"
          },
          {
            label: "Sertifikat Terbit", value: summaryStats.certificatesIssued.toString(),
            growth: summaryStats.certGrowth, icon: Award, iconBg: "bg-amber-100", iconColor: "text-amber-600"
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.growth >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                {stat.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(stat.growth)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Monthly Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tren Bulanan</h2>
              <p className="text-slate-500 text-sm">Penyelesaian & pendaftaran modul</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Penyelesaian
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-300 rounded-full"></span> Pendaftaran
              </span>
            </div>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-1 h-40">
                  <div className="flex-1 max-w-[24px] bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                    style={{ height: `${(data.completions / maxCompletions) * 100}%` }}
                    title={`Penyelesaian: ${data.completions}`}
                  />
                  <div className="flex-1 max-w-[24px] bg-slate-200 rounded-t-md transition-all hover:bg-slate-300"
                    style={{ height: `${(data.enrollments / maxCompletions) * 100}%` }}
                    title={`Pendaftaran: ${data.enrollments}`}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut-like Completion Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Status Penyelesaian</h2>
          <p className="text-slate-500 text-sm mb-6">Distribusi progress seluruh pekerja</p>

          {/* Visual ring using conic-gradient */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
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

              {/* Completion bar */}
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

              {/* Avg score */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Rata-rata Skor</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getScoreBg(dept.avgScore)}`}>
                  {dept.avgScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          <div className="space-y-4">
            {topModules.map((mod, i) => (
              <div key={mod.id} className="flex items-center gap-4">
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
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-500">{mod.completions} selesai</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{mod.avgDuration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${getScoreColor(mod.avgScore)}`}>{mod.avgScore}%</span>
                  <div className="mt-0.5">
                    {mod.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                    {mod.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500 ml-auto" />}
                    {mod.trend === 'stable' && <Activity className="w-3.5 h-3.5 text-slate-400 ml-auto" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <div className="space-y-4">
            {topWorkers.map((worker, i) => (
              <div key={worker.id} className="flex items-center gap-4">
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
                  <p className="text-xs text-slate-400 mt-0.5">{worker.totalHours} jam</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts / Insights */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Insight & Peringatan</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span><strong>3 pekerja</strong> belum memulai modul apapun dalam 2 minggu terakhir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>Modul <strong>&quot;Penanganan Bahan Kimia&quot;</strong> memiliki skor rata-rata terendah (72%) — pertimbangkan revisi konten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>Departemen <strong>HSE</strong> memiliki tingkat penyelesaian tertinggi (95%) — jadikan benchmark</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>Departemen <strong>Gudang</strong> memiliki skor terendah (79%) — perlu perhatian khusus</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
