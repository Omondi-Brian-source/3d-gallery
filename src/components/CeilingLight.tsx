interface CeilingLightProps {
  position: { x: number; z: number };
}

const CeilingLight = ({ position }: CeilingLightProps) => {
  return (
    <div
      className="absolute"
      style={{
        width: '120px',
        height: '120px',
        left: '50%',
        top: '50%',
        transform: `
          translateX(-50%) 
          translateY(-50%) 
          translateX(${position.x}px)
          translateY(-280px)
          translateZ(${position.z}px)
          rotateX(90deg)
        `,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Light fixture */}
      <div 
        className="ceiling-light absolute inset-0 rounded-full animate-glow"
      />
      
      {/* Light beam effect */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
        style={{
          width: '200px',
          height: '400px',
          background: 'linear-gradient(180deg, hsl(45 100% 95% / 0.15) 0%, transparent 100%)',
          transformOrigin: 'top center',
          transform: 'rotateX(-90deg)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};

export default CeilingLight;
