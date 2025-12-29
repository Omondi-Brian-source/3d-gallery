import { useState, useEffect, useCallback, useRef } from 'react';

interface CameraState {
  x: number;
  y: number;
  z: number;
  rotationY: number;
}

interface UseGalleryCameraOptions {
  initialZ?: number;
  minZ?: number;
  maxZ?: number;
  moveSpeed?: number;
  scrollSpeed?: number;
  mouseSensitivity?: number;
}

export const useGalleryCamera = (options: UseGalleryCameraOptions = {}) => {
  const {
    initialZ = 0,
    minZ = -2000,
    maxZ = 500,
    moveSpeed = 8,
    scrollSpeed = 50,
    mouseSensitivity = 0.3
  } = options;

  // Boundaries for free roaming inside the gallery
  const minX = -350;
  const maxX = 350;

  const [camera, setCamera] = useState<CameraState>({
    x: 0,
    y: 0,
    z: initialZ,
    rotationY: 0
  });

  // Track pressed keys
  const keysPressed = useRef<Set<string>>(new Set());
  
  // Animation frame reference
  const animationFrameRef = useRef<number>();
  
  // Mouse position for smooth movement
  const targetX = useRef(0);
  
  // Touch handling ref
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
      keysPressed.current.add(key);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.delete(key);
  }, []);

  // Handle mouse scroll for forward/backward movement
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setCamera(prev => ({
      ...prev,
      z: Math.min(maxZ, Math.max(minZ, prev.z - e.deltaY * (scrollSpeed / 50)))
    }));
  }, [minZ, maxZ, scrollSpeed]);

  // Handle mouse movement for looking around (subtle effect only at edges)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only apply subtle movement when mouse is near screen edges
    const centerX = window.innerWidth / 2;
    const normalizedX = (e.clientX - centerX) / centerX;
    
    // Only influence camera when close to edges (beyond 60% from center)
    if (Math.abs(normalizedX) > 0.6) {
      const edgeFactor = (Math.abs(normalizedX) - 0.6) / 0.4; // 0 to 1 at edges
      targetX.current = Math.sign(normalizedX) * edgeFactor * 100 * mouseSensitivity;
    } else {
      targetX.current = 0;
    }
  }, [mouseSensitivity]);

  // Animation loop for smooth movement
  const animate = useCallback(() => {
    const keys = keysPressed.current;
    
    setCamera(prev => {
      let newX = prev.x;
      let newZ = prev.z;

      // WASD / Arrow keys movement - free roaming in the gallery
      if (keys.has('w') || keys.has('arrowup')) {
        newZ = Math.max(minZ, prev.z - moveSpeed);
      }
      if (keys.has('s') || keys.has('arrowdown')) {
        newZ = Math.min(maxZ, prev.z + moveSpeed);
      }
      if (keys.has('a') || keys.has('arrowleft')) {
        newX = Math.min(maxX, prev.x + moveSpeed);
      }
      if (keys.has('d') || keys.has('arrowright')) {
        newX = Math.max(minX, prev.x - moveSpeed);
      }

      // Subtle edge-based mouse panning (additive to current position)
      if (Math.abs(targetX.current) > 0.5) {
        const mouseInfluence = targetX.current * 0.15;
        newX = Math.min(maxX, Math.max(minX, newX - mouseInfluence));
      }

      if (newX !== prev.x || newZ !== prev.z) {
        return { ...prev, x: newX, z: newZ };
      }
      return prev;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [minZ, maxZ, minX, maxX, moveSpeed]);

  // Touch handling for mobile

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!touchStartRef.current || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;
    
    // Swipe left/right to strafe, swipe up/down to move forward/back
    setCamera(prev => ({
      ...prev,
      x: Math.min(maxX, Math.max(minX, prev.x + deltaX * 1.5)),
      z: Math.min(maxZ, Math.max(minZ, prev.z + deltaY * 3))
    }));

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }, [minZ, maxZ, minX, maxX]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleKeyDown, handleKeyUp, handleWheel, handleMouseMove, handleTouchStart, handleTouchMove, handleTouchEnd, animate]);

  return camera;
};
