import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Tilt strength
  onClick?: () => void;
  id?: string;
  key?: string;
}

export default function Card3D({
  children,
  className = '',
  intensity = 15,
  onClick,
  id,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt degrees
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  
  // Motion values for sheen position
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);

  // Smooth springs to eliminate jitter and add inertial weight
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation: mouse X tilts around Y axis, mouse Y tilts around X axis
    // Use the negative sign on relativeY to tilt forward/backward intuitively
    rotateXVal.set(-relativeY * intensity);
    rotateYVal.set(relativeX * intensity);

    // Dynamic sheen glare position in percentage (0 to 100)
    sheenX.set((e.clientX - rect.left) / width * 100);
    sheenY.set((e.clientY - rect.top) / height * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
    sheenX.set(50);
    sheenY.set(50);
  };

  const sheenBackground = useTransform(
    [sheenX, sheenY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 65%)`
  );

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
        isHovered
          ? 'shadow-[0_20px_50px_rgba(56,189,248,0.15)] ring-1 ring-sky-500/30'
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10'
      } ${className}`}
    >
      {/* 3D Depth Spacer content container */}
      <div
        className="w-full h-full relative"
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {children}
      </div>

      {/* Reflection shine glint gloss overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
        style={{
          background: sheenBackground,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </motion.div>
  );
}
