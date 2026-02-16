"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, Eye, EyeOff, Loader2, ShieldCheck, CheckCircle2, IdCard, Briefcase, HardHat } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    password: '',
    confirmPassword: '',
    role: 'worker' as 'worker' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRoleChange = (role: 'worker' | 'admin') => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validasi Nama
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }

    // Validasi NIK
    if (!formData.nik.trim()) {
      newErrors.nik = 'NIK wajib diisi';
    } else if (formData.nik.trim().length < 5) {
      newErrors.nik = 'NIK minimal 5 karakter';
    }

    // Validasi Password
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    // Validasi Konfirmasi Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulasi API call dengan delay 1.5 detik
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Setelah 2 detik, redirect ke login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }, 1500);
  };

  // Success State Screen
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Registrasi Berhasil!
          </h2>
          <p className="text-blue-200 mb-6">
            Akun Anda telah dibuat. Mengalihkan ke halaman login...
          </p>
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>
    );
  }

  // Main Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-lg">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Daftar Akun Baru
          </h1>
          <p className="text-blue-200">
            Bergabung dengan K3 VR Training
          </p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Nama Lengkap Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-blue-100">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.name ? 'border-red-500/50' : 'border-white/10'
                  } rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* NIK Input */}
            <div className="space-y-2">
              <label htmlFor="nik" className="block text-sm font-medium text-blue-100">
                Nomor Induk Karyawan (NIK)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  placeholder="Masukkan NIK"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.nik ? 'border-red-500/50' : 'border-white/10'
                  } rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  disabled={isLoading}
                />
              </div>
              {errors.nik && (
                <p className="text-red-300 text-xs mt-1">{errors.nik}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimal 6 karakter"
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                    errors.password ? 'border-red-500/50' : 'border-white/10'
                  } rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-100">
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Ulangi password Anda"
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                    errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'
                  } rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-100">
                Pilih Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Worker Role */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('worker')}
                  disabled={isLoading}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'worker'
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formData.role === 'worker' ? 'bg-blue-500' : 'bg-white/10'
                    }`}>
                      <HardHat className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">Pekerja</span>
                    <span className="text-blue-200 text-xs text-center">
                      Akses training & sertifikat
                    </span>
                  </div>
                  {formData.role === 'worker' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                </button>

                {/* Admin Role */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  disabled={isLoading}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'admin'
                      ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formData.role === 'admin' ? 'bg-purple-500' : 'bg-white/10'
                    }`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">Admin K3</span>
                    <span className="text-blue-200 text-xs text-center">
                      Kelola modul & pengguna
                    </span>
                  </div>
                  {formData.role === 'admin' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Memproses Registrasi...
                </>
              ) : (
                'Daftar Sekarang'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-blue-300">atau</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-blue-200">
                Sudah punya akun?{' '}
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Login di sini
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center">
          <p className="text-blue-300/60 text-xs">
            Dengan mendaftar, Anda menyetujui syarat dan ketentuan K3 VR Training
          </p>
        </div>
      </div>
    </div>
  );
}