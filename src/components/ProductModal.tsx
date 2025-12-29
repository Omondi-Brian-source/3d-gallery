import { X, Play, Pause, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !product) return null;

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

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Featured Item';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full mx-4 bg-card rounded-xl overflow-hidden shadow-2xl animate-scale-in"
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

        <div className="flex flex-col md:flex-row">
          {/* Media Section */}
          <div className="md:w-1/2 relative bg-muted">
            {product.mediaType === 'image' ? (
              <img 
                src={product.media} 
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className="relative h-64 md:h-full">
                <video 
                  ref={videoRef}
                  src={product.media}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
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
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              {product.category}
            </div>
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.inStock ? (
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-destructive/20 text-destructive rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-border">
              <Button 
                className="flex-1"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Notify Me'}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
