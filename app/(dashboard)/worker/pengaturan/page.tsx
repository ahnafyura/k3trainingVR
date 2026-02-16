"use client";

import { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Eye,
  EyeOff,
  Save,
  Camera
} from 'lucide-react';

export default function WorkerPengaturanPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Budi Santoso",
    nik: "12345",
    email: "budi.santoso@company.com",
    phone: "+62 812-3456-7890",
    position: "Safety Worker",
    department: "Konstruksi",
    location: "Jakarta Pusat"
  });

  const [notifications, setNotifications] = useState({
    emailNotif: true,
    pushNotif: true,
    weeklyReport: false,
    newModule: true
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Pengaturan berhasil disimpan!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Pengaturan</h1>
        <p className="text-slate-600 mt-1">Kelola profil dan preferensi akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  BS
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{profileData.name}</h2>
              <p className="text-sm text-slate-600">NIK: {profileData.nik}</p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Posisi:</span>
                    <span className="font-medium text-slate-900">{profileData.position}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Departemen:</span>
                    <span className="font-medium text-slate-900">{profileData.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Lokasi:</span>
                    <span className="font-medium text-slate-900">{profileData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Informasi Pribadi</h2>
                <p className="text-sm text-slate-600">Update data profil Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  NIK
                </label>
                <input
                  type="text"
                  value={profileData.nik}
                  disabled
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Telepon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Departemen
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Lokasi
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Keamanan</h2>
                <p className="text-sm text-slate-600">Ubah password dan pengaturan keamanan</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password Lama
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password lama"
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Konfirmasi password baru"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Notifikasi</h2>
                <p className="text-sm text-slate-600">Atur preferensi notifikasi Anda</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Email Notifikasi</p>
                  <p className="text-sm text-slate-600">Terima notifikasi via email</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, emailNotif: !notifications.emailNotif })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailNotif ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailNotif ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Push Notifikasi</p>
                  <p className="text-sm text-slate-600">Notifikasi browser/aplikasi</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, pushNotif: !notifications.pushNotif })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.pushNotif ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.pushNotif ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Laporan Mingguan</p>
                  <p className="text-sm text-slate-600">Ringkasan progress per minggu</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, weeklyReport: !notifications.weeklyReport })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.weeklyReport ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Modul Baru</p>
                  <p className="text-sm text-slate-600">Notifikasi saat ada modul baru</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, newModule: !notifications.newModule })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.newModule ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.newModule ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-3">
            <button className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-colors">
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/50 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}