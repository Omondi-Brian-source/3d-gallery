import { Artwork } from '@/data/artworks';
import { Play } from 'lucide-react';
import { useRef, useState } from 'react';

interface GalleryPosterProps {
  artwork: Artwork;
  position: {
    x: number;
    y: number;
    z: number;
    rotationY: number;
  };
  cameraZ: number;
  onClick: () => void;
}

const GalleryPoster = ({ artwork, position, cameraZ, onClick }: GalleryPosterProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate distance from camera to poster for proximity effects
  const distance = Math.abs(cameraZ - position.z);
  const isNear = distance < 400;
  
  // Calculate scale based on proximity (subtle enlargement when close)
  const scale = isNear ? 1.05 : 1;

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Auto-play video on hover when nearby
    if (artwork.mediaType === 'video' && videoRef.current && isNear) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Pause video when not hovering
    if (artwork.mediaType === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  return (
    <div
      className="absolute cursor-pointer poster-frame p-3 rounded"
      style={{
        width: '180px',
        height: '240px',
        left: '50%',
        top: '50%',
        transform: `
          translateX(-50%) 
          translateY(-50%) 
          translateX(${position.x}px) 
          translateY(${position.y}px) 
          translateZ(${position.z}px) 
          rotateY(${position.rotationY}deg)
          scale(${scale})
        `,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster Media (Image or Video) */}
      <div 
        className="w-full h-full overflow-hidden rounded-sm poster-image relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {artwork.mediaType === 'image' ? (
          <img 
            src={artwork.media} 
            alt={artwork.title}
            className="w-full h-full object-cover"
            style={{
              backfaceVisibility: 'hidden',
            }}
          />
        ) : (
          <>
            <video 
              ref={videoRef}
              src={artwork.media}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              style={{
                backfaceVisibility: 'hidden',
              }}
            />
            {/* Play indicator overlay */}
            {!isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                  <Play className="w-6 h-6 text-foreground ml-1" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Artwork Label */}
      <div 
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
        style={{
          opacity: isNear ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
        }}
      >
        <p className="text-xs font-display font-semibold text-foreground/90">
          {artwork.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {artwork.artist}
        </p>
      </div>
    </div>
  );
};

export default GalleryPoster;
