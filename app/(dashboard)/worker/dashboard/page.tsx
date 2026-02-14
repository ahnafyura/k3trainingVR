"use client";

import { useState } from 'react';
import { 
  PlayCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Flame,
  HardHat,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function WorkerDashboard() {
  // Dummy data
  const workerName = "Budi Santoso";
  const workerNIK = "K3-2024-001";
  const completionPercentage = 68;
  const completedModules = 17;
  const totalModules = 25;
  const currentStreak = 5;

  const mandatoryModules = [
    {
      id: 1,
      title: "Simulasi Evakuasi Kebakaran",
      description: "Praktik evakuasi darurat dan penggunaan APAR",
      duration: "15 menit",
      difficulty: "Menengah",
      status: "not_started",
      thumbnail: "🔥",
      progress: 0,
      deadline: "3 hari lagi",
      priority: "high"
    },
    {
      id: 2,
      title: "Bahaya Alat Berat",
      description: "Identifikasi risiko dan prosedur keselamatan alat berat",
      duration: "20 menit",
      difficulty: "Lanjutan",
      status: "in_progress",
      thumbnail: "🚜",
      progress: 45,
      deadline: "5 hari lagi",
      priority: "high"
    },
    {
      id: 3,
      title: "Penggunaan APD yang Benar",
      description: "Cara memakai dan merawat Alat Pelindung Diri",
      duration: "12 menit",
      difficulty: "Pemula",
      status: "not_started",
      thumbnail: "🦺",
      progress: 0,
      deadline: "7 hari lagi",
      priority: "medium"
    },
    {
      id: 4,
      title: "Penanganan Bahan Kimia Berbahaya",
      description: "Prosedur aman menangani material berbahaya (B3)",
      duration: "18 menit",
      difficulty: "Lanjutan",
      status: "not_started",
      thumbnail: "⚠️",
      progress: 0,
      deadline: "10 hari lagi",
      priority: "medium"
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Safety Champion",
      description: "Menyelesaikan 15+ modul",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Selesaikan modul dalam 24 jam",
      icon: Zap,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Selamat datang kembali, {workerName}! 👋
            </h1>
            <p className="text-blue-100 flex items-center space-x-2">
              <HardHat className="w-4 h-4" />
              <span>NIK: {workerNIK}</span>
              <span className="mx-2">•</span>
              <Flame className="w-4 h-4" />
              <span>{currentStreak} hari berturut-turut</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-3xl font-bold">{completedModules}</div>
              <div className="text-xs text-blue-100">Selesai</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalModules - completedModules}</div>
              <div className="text-xs text-blue-100">Tersisa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{completionPercentage}%</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Progress Keseluruhan</h3>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Modules */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{completedModules}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Modul Selesai</h3>
          <p className="text-xs text-slate-500">Dari {totalModules} total modul</p>
        </div>

        {/* Time Spent */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">12.5</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Jam Training</h3>
          <p className="text-xs text-slate-500">Bulan ini</p>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">8</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Sertifikat</h3>
          <p className="text-xs text-slate-500">Tersedia untuk diunduh</p>
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Progress Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Progress Belajar Anda</h2>
              <p className="text-slate-600 text-sm mt-1">Visualisasi pencapaian modul K3</p>
            </div>
            <Link 
              href="/worker/progress"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors"
            >
              <span>Lihat Detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mb-6 md:mb-0">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - completionPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-slate-900">{completionPercentage}%</div>
                <div className="text-sm text-slate-600">Selesai</div>
              </div>
            </div>

            {/* Progress Breakdown */}
            <div className="space-y-4 flex-1 md:ml-8">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-900">Selesai</span>
                </div>
                <span className="font-bold text-green-600">{completedModules} modul</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">Dalam Progress</span>
                </div>
                <span className="font-bold text-blue-600">3 modul</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Belum Dimulai</span>
                </div>
                <span className="font-bold text-slate-600">{totalModules - completedModules - 3} modul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Pencapaian Terbaru</h3>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className="flex items-start space-x-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${achievement.color} shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
            
            <Link 
              href="/worker/achievements"
              className="block text-center py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors"
            >
              Lihat Semua Pencapaian
            </Link>
          </div>
        </div>
      </div>

      {/* Mandatory Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span>Modul Wajib Bulan Ini</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {mandatoryModules.filter(m => m.status === 'not_started').length} modul belum dimulai
            </p>
          </div>
          <Link 
            href="/worker/modules"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mandatoryModules.map((module) => (
            <div 
              key={module.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* Module Header with Priority Badge */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-6xl">{module.thumbnail}</div>
                {module.priority === 'high' && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Prioritas Tinggi
                  </div>
                )}
                {module.status === 'in_progress' && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                    <PlayCircle className="w-3 h-3" />
                    <span>Berlangsung</span>
                  </div>
                )}
              </div>

              {/* Module Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex-1">
                    {module.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Module Meta Info */}
                <div className="flex items-center space-x-4 mb-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`w-2 h-2 rounded-full ${
                      module.difficulty === 'Pemula' ? 'bg-green-500' :
                      module.difficulty === 'Menengah' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></span>
                    <span>{module.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{module.deadline}</span>
                  </div>
                </div>

                {/* Progress Bar (if in progress) */}
                {module.status === 'in_progress' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Link
                  href={`/worker/modules/${module.id}`}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    module.status === 'in_progress'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>
                    {module.status === 'in_progress' ? 'Lanjutkan Training' : 'Mulai VR Simulasi'}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
