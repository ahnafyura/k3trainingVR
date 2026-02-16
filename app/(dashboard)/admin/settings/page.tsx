"use client";

import { useState } from 'react';
import { 
  Settings,
  Building2,
  Mail,
  Bell,
  Shield,
  Database,
  Cloud,
  Key,
  Users,
  Globe,
  Save,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Zap,
  Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Company Settings
  const [companySettings, setCompanySettings] = useState({
    companyName: "PT. Keselamatan Kerja Indonesia",
    companyEmail: "admin@k3training.com",
    companyPhone: "+62 21 1234 5678",
    companyAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
    companyWebsite: "https://k3training.com",
    companyLogo: ""
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@k3training.com",
    smtpPassword: "********",
    smtpFrom: "K3 Training <noreply@k3training.com>",
    enableTLS: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newUserAlert: true,
    certificateIssued: true,
    moduleCompleted: true,
    systemAlerts: true,
    weeklyReport: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiry: "90",
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    requireEmailVerification: true,
    twoFactorAuth: false,
    passwordMinLength: "8",
    requireSpecialChar: true,
    requireNumber: true
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    allowGuestAccess: false,
    maxFileUploadSize: "50",
    sessionLifetime: "120",
    cacheEnabled: true,
    debugMode: false
  });

  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
    lastBackup: "2024-02-15 03:00:00",
    nextBackup: "2024-02-16 03:00:00"
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Pengaturan berhasil disimpan!');
    }, 1500);
  };

  const handleBackupNow = () => {
    alert('Memulai backup database...');
  };

  const handleRestoreBackup = () => {
    if (confirm('Apakah Anda yakin ingin restore backup? Ini akan menimpa data saat ini.')) {
      alert('Memulai restore database...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pengaturan Sistem</h1>
          <p className="text-slate-600 mt-1">Konfigurasi dan kelola pengaturan aplikasi K3 Training</p>
        </div>
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
              <span>Simpan Semua</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Informasi Perusahaan</h2>
                <p className="text-sm text-slate-600">Detail organisasi dan kontak</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  value={companySettings.companyName}
                  onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    value={companySettings.companyEmail}
                    onChange={(e) => setCompanySettings({ ...companySettings, companyEmail: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Telepon
                </label>
                <input
                  type="tel"
                  value={companySettings.companyPhone}
                  onChange={(e) => setCompanySettings({ ...companySettings, companyPhone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat
                </label>
                <textarea
                  value={companySettings.companyAddress}
                  onChange={(e) => setCompanySettings({ ...companySettings, companyAddress: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="url"
                    value={companySettings.companyWebsite}
                    onChange={(e) => setCompanySettings({ ...companySettings, companyWebsite: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Configuration */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Konfigurasi Email (SMTP)</h2>
                <p className="text-sm text-slate-600">Pengaturan server email untuk notifikasi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  SMTP Username
                </label>
                <input
                  type="text"
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  SMTP Password
                </label>
                <div className="relative">
                  <input
                    type={showSmtpPassword ? "text" : "password"}
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showSmtpPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  From Email
                </label>
                <input
                  type="text"
                  value={emailSettings.smtpFrom}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpFrom: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Enable TLS/SSL</p>
                    <p className="text-sm text-slate-600">Enkripsi koneksi SMTP</p>
                  </div>
                  <button
                    onClick={() => setEmailSettings({ ...emailSettings, enableTLS: !emailSettings.enableTLS })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailSettings.enableTLS ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailSettings.enableTLS ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
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
                <p className="text-sm text-slate-600">Pengaturan keamanan dan autentikasi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password Expiry (hari)
                </label>
                <input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session Timeout (menit)
                </label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Min Password Length
                </label>
                <input
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Email Verification</p>
                    <p className="text-sm text-slate-600">Wajib verifikasi email saat registrasi</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({ ...securitySettings, requireEmailVerification: !securitySettings.requireEmailVerification })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.requireEmailVerification ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-600">Autentikasi 2 faktor untuk admin</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Require Special Character</p>
                    <p className="text-sm text-slate-600">Password harus mengandung karakter spesial</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({ ...securitySettings, requireSpecialChar: !securitySettings.requireSpecialChar })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.requireSpecialChar ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.requireSpecialChar ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Require Number</p>
                    <p className="text-sm text-slate-600">Password harus mengandung angka</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({ ...securitySettings, requireNumber: !securitySettings.requireNumber })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.requireNumber ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.requireNumber ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notification Settings */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notifikasi</h2>
                <p className="text-xs text-slate-600">Alert & pemberitahuan</p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <button
                    onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Sistem</h2>
                <p className="text-xs text-slate-600">Konfigurasi aplikasi</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-red-900">Maintenance Mode</p>
                  <p className="text-xs text-red-600">Menonaktifkan akses user</p>
                </div>
                <button
                  onClick={() => setSystemSettings({ ...systemSettings, maintenanceMode: !systemSettings.maintenanceMode })}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    systemSettings.maintenanceMode ? 'bg-red-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      systemSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">Allow Registration</p>
                  <button
                    onClick={() => setSystemSettings({ ...systemSettings, allowRegistration: !systemSettings.allowRegistration })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      systemSettings.allowRegistration ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        systemSettings.allowRegistration ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">Cache Enabled</p>
                  <button
                    onClick={() => setSystemSettings({ ...systemSettings, cacheEnabled: !systemSettings.cacheEnabled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      systemSettings.cacheEnabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        systemSettings.cacheEnabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">Debug Mode</p>
                  <button
                    onClick={() => setSystemSettings({ ...systemSettings, debugMode: !systemSettings.debugMode })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      systemSettings.debugMode ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        systemSettings.debugMode ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max Upload Size (MB)
                </label>
                <input
                  type="number"
                  value={systemSettings.maxFileUploadSize}
                  onChange={(e) => setSystemSettings({ ...systemSettings, maxFileUploadSize: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Backup</h2>
                <p className="text-xs text-slate-600">Database backup</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-slate-600">Last Backup</p>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-slate-900">{backupSettings.lastBackup}</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-xs font-medium text-slate-600 mb-1">Next Scheduled</p>
                <p className="text-sm font-semibold text-blue-900">{backupSettings.nextBackup}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={backupSettings.backupFrequency}
                  onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="hourly">Setiap Jam</option>
                  <option value="daily">Harian</option>
                  <option value="weekly">Mingguan</option>
                  <option value="monthly">Bulanan</option>
                </select>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleBackupNow}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Backup Sekarang</span>
                </button>

                <button
                  onClick={handleRestoreBackup}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restore Backup</span>
                </button>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5" />
              <h3 className="font-bold">System Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Version:</span>
                <span className="font-semibold">v1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Server:</span>
                <span className="font-semibold">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Database:</span>
                <span className="font-semibold">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Storage:</span>
                <span className="font-semibold">45.2 GB / 100 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}