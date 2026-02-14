"use client";

import { useEffect, useRef, useState } from 'react';

interface VRPlayerProps {
  videoUrl: string;
  onVideoEnd?: () => void;
}

export default function VRPlayer({ videoUrl, onVideoEnd }: VRPlayerProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);

  useEffect(() => {
    // Load A-Frame only on client-side
    if (typeof window !== 'undefined') {
      // Check if A-Frame is already loaded
      if (!(window as any).AFRAME) {
        // Dynamically import A-Frame
        import('aframe').then(() => {
          console.log('A-Frame loaded successfully');
          setIsAFrameLoaded(true);
        });
      } else {
        setIsAFrameLoaded(true);
      }
    }

    // Cleanup
    return () => {
      // Remove A-Frame scene if needed
      if (sceneRef.current) {
        const scene = sceneRef.current.querySelector('a-scene');
        if (scene) {
          scene.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isAFrameLoaded && videoRef.current) {
      const video = videoRef.current;

      // Event listener untuk video selesai
      const handleVideoEnd = () => {
        if (onVideoEnd) {
          onVideoEnd();
        }
      };

      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [isAFrameLoaded, onVideoEnd]);

  if (!isAFrameLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white text-lg">Memuat VR Player...</p>
          <p className="text-slate-400 text-sm">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sceneRef} className="w-full h-screen">
      {/* Hidden video element that will be used as texture */}
      <video
        ref={videoRef}
        id="vr-video"
        className="hidden"
        crossOrigin="anonymous"
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* A-Frame Scene */}
      <a-scene
        embedded
        vr-mode-ui="enabled: true"
        loading-screen="enabled: false"
      >
        {/* Camera with cursor for interaction */}
        <a-camera>
          <a-cursor
            color="#4A90E2"
            opacity="0.8"
            fuse="true"
            fuse-timeout="1500"
          ></a-cursor>
        </a-camera>

        {/* 360° Video Sphere */}
        <a-videosphere
          src="#vr-video"
          rotation="0 180 0"
          radius="100"
        ></a-videosphere>

        {/* Sky (fallback if video not loaded) */}
        <a-sky color="#000000"></a-sky>
      </a-scene>
    </div>
  );
}