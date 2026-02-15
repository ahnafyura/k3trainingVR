"use client";

import { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import VRControls from '@/components/vr/VRControls';
import CompletionModal from '@/components/vr/CompletionModal';

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
    videoUrl: "/videos/videoplayback.mp4",
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
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const moduleData = MODULES_DATA[moduleId] || {
    title: "Modul K3 VR",
    videoUrl: "/videos/videoplayback.mp4",
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

  // BUG FIX 1: Auto-hide controls logic - Moved to parent
  const resetHideTimer = () => {
    setShowControls(true);
    
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      // Only hide if video is playing
      if (videoElement && !videoElement.paused) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Handle mouse move to show controls
  const handleMouseMove = () => {
    resetHideTimer();
  };

  // Handle click to show controls
  const handleClick = () => {
    resetHideTimer();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    console.log('Video selesai - showing completion modal!');
    setShowCompletion(true);
    setShowControls(false);
    
    // Prevent video controls from being usable
    if (videoElement) {
      videoElement.removeAttribute('controls');
    }
  };

  const handleVideoReady = () => {
    console.log('Video is ready to play');
    setIsLoading(false);
  };

  const handleVideoError = (error: string) => {
    console.error('Video error:', error);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full bg-slate-900 overflow-hidden">
      {/* BUG FIX 3: Top Navigation Bar - Fixed Header with Glassmorphism */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex justify-between items-center p-4">
          {/* Back Button */}
          <Link
            href={`/worker/modules/${moduleId}`}
            className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          {/* Module Title - NO BACKGROUND COLOR, PROPER TEXT */}
          <div className="flex-1 px-4 min-w-0">
            <h1 className="text-white font-semibold text-base sm:text-lg md:text-xl text-center truncate">
              {moduleData.title}
            </h1>
            <p className="text-blue-300 text-xs sm:text-sm text-center hidden sm:block">
              VR 360° Training
            </p>
          </div>

          {/* Spacer for layout balance */}
          <div className="flex-shrink-0 w-20 sm:w-28"></div>
        </div>
      </div>

      {/* BUG FIX 1: VR Player Container with Mouse/Click Events */}
      <div 
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={() => {
          // Don't hide immediately on mouse leave, let timer handle it
        }}
      >
        {/* VR Player Component */}
        <VRPlayer 
          videoUrl={moduleData.videoUrl}
          onVideoEnd={handleVideoEnd}
          onVideoReady={handleVideoReady}
          onVideoError={handleVideoError}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-40">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white text-lg">Memuat Video 360°...</p>
            </div>
          </div>
        )}

        {/* VR Controls Overlay - Controlled by parent state */}
        {!showCompletion && (
          <VRControls 
            videoElement={videoElement} 
            showControls={showControls}
            onMouseMove={handleMouseMove}
          />
        )}

        {/* Instructions Overlay (Bottom Left) */}
        {!showCompletion && showControls && (
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
        )}
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        moduleTitle={moduleData.title}
        score={95}
        onClose={() => setShowCompletion(false)}
      />
    </div>
  );
}