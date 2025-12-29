import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface GalleryTVProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  width: number;
  height: number;
  cameraZ: number;
}

const GalleryTV = ({ position, width, height, cameraZ }: GalleryTVProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Calculate distance for proximity-based interactions
  const distance = Math.abs(cameraZ - position.z);
  const isNear = distance < 600;
  const isVeryNear = distance < 300;

  // Auto-play when user gets close
  useEffect(() => {
    if (videoRef.current) {
      if (isNear && !isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, [isNear, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="absolute"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: '50%',
        top: '50%',
        transform: `
          translateX(-50%) 
          translateY(-50%) 
          translateX(${position.x}px) 
          translateY(${position.y}px) 
          translateZ(${position.z}px)
        `,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* TV Frame - slim modern bezel */}
      <div 
        className="absolute inset-0 rounded"
        style={{
          background: 'linear-gradient(135deg, hsl(0 0% 12%) 0%, hsl(0 0% 8%) 100%)',
          boxShadow: `
            0 10px 40px hsl(0 0% 0% / 0.5),
            inset 0 1px 0 hsl(0 0% 25%)
          `,
          padding: '4px',
        }}
      >
        {/* Screen */}
        <div 
          className="relative w-full h-full overflow-hidden rounded-sm"
          style={{
            background: 'hsl(0 0% 2%)',
          }}
        >
          {/* Video content */}
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Screen glow effect when playing */}
          {isPlaying && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px hsl(200 80% 50% / 0.1)',
              }}
            />
          )}

          {/* Controls overlay - visible when near */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300"
            style={{
              opacity: isVeryNear ? 1 : 0,
              background: 'linear-gradient(transparent, hsl(0 0% 0% / 0.8))',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-background/20 hover:bg-background/40 transition-colors backdrop-blur-sm"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-background/20 hover:bg-background/40 transition-colors backdrop-blur-sm"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-primary-foreground" />
                  )}
                </button>
              </div>
              <div className="text-sm text-primary-foreground/80 font-display">
                Featured Exhibition
              </div>
            </div>
          </div>

          {/* "Walk closer" hint when not near */}
          {!isNear && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/20 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
                <p className="text-primary-foreground/90 font-display text-lg">
                  Walk closer to watch
                </p>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Subtle ambient light glow behind TV */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          transform: 'translateZ(-5px) scale(1.05)',
          background: isPlaying 
            ? 'radial-gradient(ellipse at center, hsl(200 50% 50% / 0.15) 0%, transparent 60%)'
            : 'transparent',
          filter: 'blur(20px)',
          transition: 'background 0.5s ease',
        }}
      />
    </div>
  );
};

export default GalleryTV;
