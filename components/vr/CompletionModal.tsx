"use client";

import { CheckCircle2, Download, Home, Star, Award, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  moduleTitle: string;
  score?: number;
  onClose?: () => void;
}

export default function CompletionModal({ 
  isOpen, 
  moduleTitle, 
  score = 95,
  onClose 
}: CompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      setShowConfetti(true);
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Confetti Effect (Simple CSS Animation) */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-500">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-16 h-16 text-green-400" strokeWidth={2.5} />
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-24 h-24 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Selamat! 🎉
        </h2>
        <p className="text-blue-200 text-center mb-6">
          Anda telah menyelesaikan simulasi K3
        </p>

        {/* Module Title */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-300 text-center mb-1">Modul:</p>
          <p className="text-lg font-bold text-white text-center">{moduleTitle}</p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
            <p className="text-2xl font-bold text-white">{score}%</p>
            <p className="text-xs text-slate-300">Skor</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">A</p>
            <p className="text-xs text-slate-300">Grade</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-slate-300">Progress</p>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-1">
                Sertifikat Tersedia!
              </p>
              <p className="text-xs text-blue-200">
                Anda berhak mendapatkan sertifikat K3 untuk modul ini.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Download Certificate */}
          <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/50 group">
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Unduh Sertifikat</span>
          </button>

          {/* Back to Dashboard */}
          <Link
            href="/worker/dashboard"
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/50"
          >
            <Home className="w-5 h-5" />
            <span>Kembali ke Dashboard</span>
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/worker/modules"
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all"
            >
              <span className="text-sm">Modul Lain</span>
            </Link>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Bagikan</span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Sertifikat akan dikirim ke email Anda dalam 24 jam
        </p>
      </div>
    </div>
  );
}