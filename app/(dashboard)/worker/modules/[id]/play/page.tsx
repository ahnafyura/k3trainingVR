"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Maximize2, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

// Dynamically import VRPlayer with SSR disabled
const VRPlayer = dynamic(() => import('@/components/vr/VRPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white text-lg">Memuat VR Environment...</p>
      </div>
    </div>
  ),
});

// Dummy module data (in real app, fetch from API/database)
const MODULES_DATA: Record<string, any> = {
  "1": {
    title: "Simulasi Evakuasi Kebakaran",
    videoUrl: "/videos/videoplayback.mp4", // Place your 360° video here
    duration: "15:00"
  },
  "2": {
    title: "Bahaya Alat Berat di Konstruksi",
    videoUrl: "/videos/videoplayback.mp4",
    duration: "20:00"
  },
  "3": {
    title: "Penggunaan APD yang Benar",
    videoUrl: "/videos/videoplayback.mp4",
    duration: "12:00"
  }
};

export default function VRPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const moduleId = resolvedParams.id;
  
  const [showCompletion, setShowCompletion] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const moduleData = MODULES_DATA[moduleId] || {
    title: "Modul K3 VR",
    videoUrl: "/videos/dummy-360.mp4",
    duration: "15:00"
  };

  const handleVideoEnd = () => {
    console.log('Video selesai!');
    setShowCompletion(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('vr-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link
            href={`/worker/modules/${moduleId}`}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-slate-800/80 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          {/* Module Title */}
          <div className="flex-1 px-4 text-center">
            <h1 className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">
              {moduleData.title}
            </h1>
            <p className="text-blue-300 text-sm">VR 360° Training</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-slate-800/80 rounded-xl transition-all"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-slate-800/80 rounded-xl transition-all"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* VR Player Component */}
      <VRPlayer 
        videoUrl={moduleData.videoUrl}
        onVideoEnd={handleVideoEnd}
      />

      {/* Instructions Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-40 max-w-xs">
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
          <h3 className="font-bold text-sm mb-2">Cara Menggunakan VR:</h3>
          <ul className="text-xs space-y-1 text-slate-300">
            <li>• Geser mouse/jari untuk melihat sekeliling</li>
            <li>• Gunakan headset VR untuk pengalaman immersive</li>
            <li>• Arahkan kursor biru untuk interaksi</li>
          </ul>
        </div>
      </div>

      {/* Video Info (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-40">
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-white">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>VR 360° LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
