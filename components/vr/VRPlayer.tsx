"use client";

import { useEffect, useRef, useState } from 'react';

interface VRPlayerProps {
  videoUrl: string;
  onVideoEnd?: () => void;
  onVideoReady?: () => void;
  onVideoError?: (error: string) => void;
}

export default function VRPlayer({ videoUrl, onVideoEnd, onVideoReady, onVideoError }: VRPlayerProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fallback videoUrl jika tidak valid
  const validVideoUrl = videoUrl || "/videos/videoplayback.mp4";

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      if (!(window as any).AFRAME) {
        import('aframe').then(() => {
          console.log('A-Frame loaded successfully');
          setIsAFrameLoaded(true);
        }).catch((err) => {
          console.error('Failed to load A-Frame:', err);
        });
      } else {
        setIsAFrameLoaded(true);
      }
    }

    return () => {
      setIsMounted(false);
      if (sceneRef.current) {
        const scene = sceneRef.current.querySelector('a-scene');
        if (scene) {
          scene.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isAFrameLoaded && videoRef.current && isMounted) {
      const video = videoRef.current;

      const handleCanPlay = () => {
        console.log('Video can play - readyState:', video.readyState);
        if (onVideoReady) {
          onVideoReady();
        }
      };

      const handleLoadedData = () => {
        console.log('Video data loaded - readyState:', video.readyState);
      };

      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded - duration:', video.duration);
      };

      const handlePlaying = () => {
        console.log('Video is playing');
        if (onVideoReady) {
          onVideoReady();
        }
      };

      const handleVideoEnd = () => {
        console.log('Video ended - triggering completion modal');
        setHasEnded(true);
        video.pause();
        
        if (onVideoEnd) {
          onVideoEnd();
        }
      };

      const handleSeeking = () => {
        if (hasEnded && video.currentTime < video.duration - 1) {
          video.currentTime = video.duration;
        }
      };

      const handleError = (e: Event) => {
        const error = video.error;
        let errorMessage = 'Unknown video error';
        
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMessage = 'Video loading aborted';
              break;
            case error.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error while loading video';
              break;
            case error.MEDIA_ERR_DECODE:
              errorMessage = 'Video decoding error';
              break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Video format not supported or file not found';
              break;
          }
        }
        
        console.error('Video error:', errorMessage, error);
        if (onVideoError) {
          onVideoError(errorMessage);
        }
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('seeking', handleSeeking);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('seeking', handleSeeking);
        video.removeEventListener('error', handleError);
      };
    }
  }, [isAFrameLoaded, onVideoEnd, onVideoReady, onVideoError, hasEnded, isMounted]);

  if (!isAFrameLoaded || !isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white text-lg">Memuat VR Player...</p>
          <p className="text-slate-400 text-sm">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sceneRef} className="w-full h-full">
      {/* @ts-expect-error - A-Frame custom elements */}
      <a-scene
        embedded
        vr-mode-ui="enabled: true"
        loading-screen="enabled: false"
      >
        {/* @ts-expect-error - A-Frame custom elements */}
        <a-assets>
          <video
            ref={videoRef}
            id="vr-video"
            src={validVideoUrl}
            type="video/mp4"
            crossOrigin="anonymous"
            playsInline
            webkit-playsinline="true"
            preload="auto"
            muted={false}
          />
        </a-assets>

        {/* @ts-expect-error - A-Frame custom elements */}
        <a-camera>
          {/* BUG FIX 2: Cursor dihapus/disembunyikan karena tidak diperlukan untuk web */}
          {/* Pengguna akan rotate menggunakan mouse drag, bukan cursor VR */}
        </a-camera>

        {/* @ts-expect-error - A-Frame custom elements */}
        <a-videosphere
          src="#vr-video"
          rotation="0 180 0"
          radius="100"
        />

        {/* @ts-expect-error - A-Frame custom elements */}
        <a-sky color="#000000" />
      </a-scene>
    </div>
  );
}