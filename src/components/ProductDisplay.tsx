import { Product } from '@/data/products';
import { Play, ShoppingBag } from 'lucide-react';
import { useRef, useState } from 'react';

interface ProductDisplayProps {
  product: Product;
  position: {
    x: number;
    y: number;
    z: number;
    rotationY: number;
  };
  cameraZ: number;
  onClick: () => void;
}

const ProductDisplay = ({ product, position, cameraZ, onClick }: ProductDisplayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate distance from camera to display for proximity effects
  const distanceZ = Math.abs(cameraZ - position.z);
  const isNear = distanceZ < 500;
  const isVeryNear = distanceZ < 300;
  
  // Scale up when approaching for better visibility
  const proximityScale = isVeryNear ? 1.15 : isNear ? 1.08 : 1;
  const hoverScale = isHovered ? 1.03 : 1;
  const scale = proximityScale * hoverScale;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.mediaType === 'video' && videoRef.current && isNear) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (product.mediaType === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Featured';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };
  
  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        width: '220px',
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
        transition: 'transform 0.2s ease-out',
        zIndex: isNear ? 10 : 1,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Frame with elegant border */}
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)',
          padding: '10px',
          boxShadow: isNear 
            ? '0 25px 60px hsl(var(--foreground) / 0.25), 0 0 0 2px hsl(var(--primary) / 0.4)'
            : isHovered 
              ? '0 20px 40px hsl(var(--foreground) / 0.2), 0 0 0 1px hsl(var(--primary) / 0.3)'
              : '0 10px 30px hsl(var(--foreground) / 0.1)',
          transition: 'box-shadow 0.2s ease-out',
        }}
      >
        {/* Product Media */}
        <div 
          className="w-full aspect-[3/4] overflow-hidden rounded relative"
          style={{ 
            background: 'hsl(var(--muted))',
          }}
        >
          {product.mediaType === 'image' ? (
            <img 
              src={product.media} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ) : (
            <>
              <video 
                ref={videoRef}
                src={product.media}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
              {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                    <Play className="w-6 h-6 text-foreground ml-1" />
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Stock badge */}
          {!product.inStock && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
              Out of Stock
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 text-foreground text-xs font-medium rounded">
            {product.category}
          </div>
        </div>

        {/* Product Info - inside frame */}
        <div className="pt-3 pb-1 px-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-sm font-display font-semibold text-foreground mt-0.5 leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {/* View details hint on hover */}
      <div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
        style={{
          opacity: isNear && isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <p className="text-xs text-primary font-medium">
          Click to view details
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
