import { X, Play, Pause } from 'lucide-react';
import { Artwork } from '@/data/artworks';
import { useRef, useState } from 'react';

interface PosterModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const PosterModal = ({ artwork, isOpen, onClose }: PosterModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !artwork) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full mx-4 modal-content rounded-lg overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Media */}
        <div className="relative bg-muted">
          {artwork.mediaType === 'image' ? (
            <img 
              src={artwork.media} 
              alt={artwork.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          ) : (
            <div className="relative">
              <video 
                ref={videoRef}
                src={artwork.media}
                className="w-full h-auto max-h-[70vh] object-contain"
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {/* Video controls overlay */}
              <button
                onClick={togglePlay}
                className="absolute bottom-4 left-4 p-3 rounded-full bg-background/80 hover:bg-background transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-foreground ml-0.5" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="p-6 bg-card">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {artwork.title}
            </h2>
            {artwork.mediaType === 'video' && (
              <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded">
                VIDEO
              </span>
            )}
          </div>
          <p className="text-lg text-primary mb-1">
            {artwork.artist}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {artwork.year}
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            {artwork.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PosterModal;
