"use client";

import { LogOut, X, AlertTriangle } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose} // Click backdrop to close
    >
      <div 
        className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal
      >
        {/* Header with gradient accent */}
        <div className="relative bg-gradient-to-r from-red-600 to-pink-600 p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header content */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <LogOut className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Konfirmasi Logout</h3>
              <p className="text-sm text-red-100">Keluar dari aplikasi</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning icon & message */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-slate-200 text-lg font-medium mb-2">
              Apakah Anda yakin ingin keluar?
            </p>
            <p className="text-slate-400 text-sm">
              Anda akan keluar dari aplikasi K3 VR Training dan harus login kembali untuk mengakses.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white rounded-xl font-semibold transition-all duration-200"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/50"
            >
              Ya, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}