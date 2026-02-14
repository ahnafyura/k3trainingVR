"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import VRControls from '@/components/vr/VRControls';

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

// Dummy module data
const MODULES_DATA: Record<string, any> = {
  "1": {
    title: "Simulasi Evakuasi Kebakaran",
    videoUrl: "/videos/dummy-360.mp4",
    duration: "15:00"
  },
  "2": {
    title: "Bahaya Alat Berat di Konstruksi",
    videoUrl: "/videos/dummy-360.mp4",
    duration: "20:00"
  },
  "3": {
    title: "Penggunaan APD yang Benar",
    videoUrl: "/videos/dummy-360.mp4",
    duration: "12:00"
  }
};

export default function VRPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const moduleId = resolvedParams.id;
  
  const [showCompletion, setShowCompletion] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const moduleData = MODULES_DATA[moduleId] || {
    title: "Modul K3 VR",
    videoUrl: "/videos/dummy-360.mp4",
    duration: "15:00"
  };

  // Get video element reference after A-Frame loads
  useEffect(() => {
    const checkVideoElement = setInterval(() => {
      const video = document.getElementById('vr-video') as HTMLVideoElement;
      if (video) {
        setVideoElement(video);
        clearInterval(checkVideoElement);
      }
    }, 500);

    return () => clearInterval(checkVideoElement);
  }, []);

  const handleVideoEnd = () => {
    console.log('Video selesai!');
    setShowCompletion(true);
  };

  return (
    <div className="h-screen w-full bg-slate-900 overflow-hidden">
      {/* Top Navigation Bar - Fixed Overlay */}
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

          {/* Spacer for layout balance */}
          <div className="w-24"></div>
        </div>
      </div>

      {/* VR Player Container - RELATIVE POSITIONING CONTEXT */}
      <div className="relative w-full h-full">
        {/* VR Player Component */}
        <VRPlayer 
          videoUrl={moduleData.videoUrl}
          onVideoEnd={handleVideoEnd}
        />

        {/* VR Controls Overlay - NOW ABSOLUTE WITHIN THIS CONTAINER */}
        <VRControls videoElement={videoElement} />

        {/* Instructions Overlay (Bottom Left) */}
        <div className="absolute bottom-24 left-4 z-40 max-w-xs">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
            <h3 className="font-bold text-sm mb-2">Cara Menggunakan VR:</h3>
            <ul className="text-xs space-y-1 text-slate-300">
              <li>• Geser mouse/jari untuk melihat sekeliling</li>
              <li>• Gunakan headset VR untuk pengalaman immersive</li>
              <li>• Arahkan kursor biru untuk interaksi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}