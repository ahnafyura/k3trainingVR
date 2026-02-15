"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Maximize2,
  Settings
} from 'lucide-react';

interface VRControlsProps {
  videoElement: HTMLVideoElement | null;
  showControls: boolean;
  onMouseMove?: () => void;
}

export default function VRControls({ videoElement, showControls, onMouseMove }: VRControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Format time to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update time and duration
  useEffect(() => {
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('volumechange', handleVolumeChange);

    // Initialize duration if already loaded
    if (videoElement.duration) {
      setDuration(videoElement.duration);
    }

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoElement]);

  // Play/Pause toggle with Promise handling
  const togglePlayPause = () => {
    if (!videoElement) return;
    
    // Check if video is ready to play
    if (videoElement.readyState < 2) {
      console.warn('Video not ready yet, readyState:', videoElement.readyState);
      return;
    }
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      // Handle play() as a Promise
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playback started successfully');
          })
          .catch((error) => {
            console.warn('Autoplay/Play prevented or video not ready:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoElement) return;
    
    const newTime = parseFloat(e.target.value);
    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoElement) return;
    
    videoElement.muted = !videoElement.muted;
    setIsMuted(!isMuted);
  };

  // Change volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoElement) return;
    
    const newVolume = parseFloat(e.target.value);
    videoElement.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Restart video
  const handleRestart = () => {
    if (!videoElement) return;
    
    videoElement.currentTime = 0;
    
    // Check readyState before playing
    if (videoElement.readyState >= 2) {
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video restarted successfully');
          })
          .catch((error) => {
            console.warn('Restart play prevented:', error);
          });
      }
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`absolute bottom-0 left-0 w-full z-50 transition-all duration-300 ${
        showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseMove}
    >
      {/* Progress Bar */}
      <div className="relative h-2 bg-slate-900/60 backdrop-blur-sm cursor-pointer group">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Progress Background */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        {/* Progress Fill */}
        <div 
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        
        {/* Progress Thumb (visible on hover) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          style={{ left: `calc(${progressPercentage}% - 8px)` }}
        ></div>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Play Controls */}
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!videoElement || videoElement.readyState < 2}
              title={!videoElement || videoElement.readyState < 2 ? 'Video loading...' : ''}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </button>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2 group">
              <button
                onClick={toggleMute}
                className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              
              {/* Volume Slider (shows on hover) */}
              <div className="hidden lg:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3
                    [&::-moz-range-thumb]:h-3
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Time Display */}
            <div className="hidden md:flex items-center space-x-1 text-white text-sm font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="text-white/60">/</span>
              <span className="text-white/60">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Section - Additional Controls */}
          <div className="flex items-center space-x-2">
            {/* Settings Button */}
            <button
              className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              title="Settings"
            >
              <Settings className="w-4 h-4 text-white" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>

            {/* VR Mode Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-blue-600/20 border border-blue-400/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-xs font-bold">VR 360°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}