import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'text-input' | 'project-card'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use framer-motion useMotionValue for direct performance without React state re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics setup for smooth lag effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect mobile or touch screen to disable custom cursor (avoid overlapping or poor UX)
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // standard desktop threshold
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverEvents = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .project-card-interactive, .profile-pic-interactive'
      );

      clickables.forEach((el) => {
        // Hover state listener
        el.addEventListener('mouseenter', () => {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            setHoverState('text-input');
          } else if (el.classList.contains('project-card-interactive')) {
            setHoverState('project-card');
          } else {
            setHoverState('hover');
          }
        });

        el.addEventListener('mouseleave', () => {
          setHoverState('default');
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Initial setup and a periodic check in case new elements are rendered
    handleHoverEvents();
    const interval = setInterval(handleHoverEvents, 1000);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  // Custom styling states based on hovering
  const getOuterStyles = () => {
    switch (hoverState) {
      case 'hover':
        return {
          width: '56px',
          height: '56px',
          backgroundColor: 'rgba(56, 189, 248, 0.15)', // sky-400 tint
          borderColor: 'rgb(56, 189, 248)',
          borderWidth: '1.5px',
        };
      case 'text-input':
        return {
          width: '12px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          borderWidth: '1px',
        };
      case 'project-card':
        return {
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(99, 102, 241, 0.15)', // indigo-500 tint
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: '1.5px',
        };
      default:
        return {
          width: '28px',
          height: '28px',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.45)',
          borderWidth: '1px',
        };
    }
  };

  const getInnerStyles = () => {
    switch (hoverState) {
      case 'hover':
        return { scale: 1.5, backgroundColor: 'rgb(56, 189, 248)' };
      case 'project-card':
        return { scale: 1.8, backgroundColor: 'rgb(99, 102, 241)' };
      case 'text-input':
        return { scale: 0 }; // Hide central dot for cursor focus inside text lines
      default:
        return { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.95)' };
    }
  };

  return (
    <>
      {/* Outer lagged ring using springs */}
      <motion.div
        id="custom-cursor-outer"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getOuterStyles()}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center overflow-hidden"
      >
        {hoverState === 'project-card' && (
          <span className="text-[10px] font-sans font-bold tracking-widest text-indigo-400 uppercase select-none animate-pulse">
            View
          </span>
        )}
      </motion.div>

      {/* Central responsive dot, instantly locked to mouse */}
      <motion.div
        id="custom-cursor-inner"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getInnerStyles()}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 mix-blend-difference"
      />
    </>
  );
}
