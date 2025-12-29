import { useState } from 'react';
import { useGalleryCamera } from '@/hooks/useGalleryCamera';
import { products, Product } from '@/data/products';
import ProductDisplay from '@/components/ProductDisplay';
import CeilingLight from '@/components/CeilingLight';
import ProductModal from '@/components/ProductModal';
import ControlsHint from '@/components/ControlsHint';
import GalleryTV from '@/components/GalleryTV';

const Gallery3D = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Camera hook handles all movement (WASD, scroll, touch)
  const camera = useGalleryCamera({
    initialZ: 500,
    minZ: -1900,
    maxZ: 700,
    moveSpeed: 12,
    scrollSpeed: 70
  });

  // Gallery dimensions - wider room for better exploration
  const galleryWidth = 1000;
  const galleryHeight = 550;
  const galleryDepth = 2400;

  // Calculate product display positions - on walls, spaced out for approach
  const displayPositions = [
    // Left wall displays - positioned to allow close approach
    { x: -galleryWidth / 2 + 40, y: 0, z: -300, rotationY: 90 },
    { x: -galleryWidth / 2 + 40, y: 0, z: -900, rotationY: 90 },
    { x: -galleryWidth / 2 + 40, y: 0, z: -1500, rotationY: 90 },
    // Right wall displays
    { x: galleryWidth / 2 - 40, y: 0, z: -300, rotationY: -90 },
    { x: galleryWidth / 2 - 40, y: 0, z: -900, rotationY: -90 },
    { x: galleryWidth / 2 - 40, y: 0, z: -1500, rotationY: -90 },
  ];

  // Ceiling light positions - track lighting along the center
  const lightPositions = [
    { x: -150, z: -100 },
    { x: 150, z: -100 },
    { x: -150, z: -700 },
    { x: 150, z: -700 },
    { x: -150, z: -1300 },
    { x: 150, z: -1300 },
    { x: 0, z: -1900 },
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {/* Exhibition Title */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 text-center">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-wide">
          Product Exhibition
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore our collection
        </p>
      </div>

      {/* 3D Scene Container - perspective applied here */}
      <div 
        className="w-full h-full gallery-scene"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D World - transforms based on camera position */}
        <div 
          className="absolute inset-0 gallery-world"
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              translateZ(${camera.z}px) 
              translateX(${camera.x}px)
              translateY(${camera.y}px)
              rotateY(${camera.rotationY}deg)
            `,
          }}
        >
          {/* Floor - rotated to be horizontal */}
          <div
            className="absolute gallery-floor"
            style={{
              width: `${galleryWidth}px`,
              height: `${galleryDepth}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateY(${galleryHeight / 2}px) 
                rotateX(90deg)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Wood plank lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-primary/10"
                style={{
                  top: `${(i + 1) * 5}%`,
                }}
              />
            ))}
          </div>

          {/* Ceiling */}
          <div
            className="absolute gallery-ceiling"
            style={{
              width: `${galleryWidth}px`,
              height: `${galleryDepth}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateY(-${galleryHeight / 2}px) 
                rotateX(90deg)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Left Wall */}
          <div
            className="absolute gallery-wall"
            style={{
              width: `${galleryDepth}px`,
              height: `${galleryHeight}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateX(-${galleryWidth / 2}px) 
                rotateY(90deg)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Right Wall */}
          <div
            className="absolute gallery-wall"
            style={{
              width: `${galleryDepth}px`,
              height: `${galleryHeight}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateX(${galleryWidth / 2}px) 
                rotateY(-90deg)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Back Wall - white gallery wall with TV mounted */}
          <div
            className="absolute gallery-wall"
            style={{
              width: `${galleryWidth}px`,
              height: `${galleryHeight}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateZ(-${galleryDepth / 2}px)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Giant TV on the back wall */}
          <GalleryTV
            position={{ x: 0, y: -20, z: -galleryDepth / 2 + 15 }}
            width={galleryWidth - 100}
            height={galleryHeight - 120}
            cameraZ={camera.z}
          />

          {/* Front Wall (with entrance opening) */}
          <div
            className="absolute gallery-wall"
            style={{
              width: `${galleryWidth}px`,
              height: `${galleryHeight}px`,
              left: '50%',
              top: '50%',
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                translateZ(${galleryDepth / 2}px)
                rotateY(180deg)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
              opacity: 0.3, // Semi-transparent to see into gallery
            }}
          />

          {/* Ceiling Lights */}
          {lightPositions.map((pos, index) => (
            <CeilingLight key={index} position={pos} />
          ))}

          {/* Product Displays */}
          {products.map((product, index) => (
            <ProductDisplay
              key={product.id}
              product={product}
              position={displayPositions[index]}
              cameraZ={camera.z}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

      {/* Controls Hint */}
      <ControlsHint />

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Gallery3D;
