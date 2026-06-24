import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  color: string;
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic density based on screen size
    const isMobile = width < 768;
    const particleCount = isMobile ? 40 : 120;
    const connectionDistance = isMobile ? 65 : 110;
    const particles: Particle[] = [];

    // Create particles in a 3D volume
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(width, height) * 0.8;
      
      particles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 800, // Depth
        px: 0,
        py: 0,
        size: Math.random() * 2 + 1,
        // Dual tone theme coloring (sky-400 and indigo-500)
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(99, 102, 241, ', // sky-400 or indigo-500
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to center-based (-1 to 1)
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      // Smoothly interpolate mouse values for premium ease feel
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep space atmospheric background aligned with Sleek Interface gradient
      const gradient = ctx.createRadialGradient(
        0,
        0,
        10,
        0,
        0,
        Math.max(width, height) * 1.3
      );
      gradient.addColorStop(0, '#0f172a'); // Slate blue top-left
      gradient.addColorStop(1, '#020617'); // Deep slate black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient lights
      const mx = (mouseRef.current.x + 1) * (width / 2);
      const my = (mouseRef.current.y + 1) * (height / 2);
      ctx.beginPath();
      const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, isMobile ? 150 : 350);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.07)'); // Neon blue light hover glow
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.arc(mx, my, isMobile ? 150 : 350, 0, Math.PI * 2);
      ctx.fill();

      // Transform and Project particles in 3D
      const rx = mouseRef.current.y * 0.15; // pitch rotation from mouse Y
      const ry = mouseRef.current.x * 0.25; // yaw rotation from mouse X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Projection field of view
      const fov = 400;

      particles.forEach((p) => {
        // Slow automatic rotation in 3D space
        const autoSpeed = 0.001;
        const tempX = p.x * Math.cos(autoSpeed) - p.z * Math.sin(autoSpeed);
        const tempZ = p.x * Math.sin(autoSpeed) + p.z * Math.cos(autoSpeed);
        p.x = tempX;
        p.z = tempZ;

        // Apply mouse-driven 3D Rotation
        // Yaw (around Y axis)
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        // Pitch (around X axis)
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // 3D Perspective Projection
        const scale = fov / (fov + z2 + 400); // Translate depth offset
        p.px = width / 2 + x1 * scale;
        p.py = height / 2 + y2 * scale;

        // Draw particle if in front of camera
        if (scale > 0) {
          const opacity = Math.max(0.05, Math.min(0.8, scale * 0.5));
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${opacity})`;
          ctx.fill();
        }
      });

      // Draw Connection Lines between close particles (creating a 3D mesh web)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12 * Math.min(1, (p1.size + p2.size) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            
            // Create a gradient line between sky-400 and indigo-500 depending on positions
            const lineGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
            lineGrad.addColorStop(0, p1.color.includes('56') ? `rgba(56, 189, 248, ${alpha})` : `rgba(99, 102, 241, ${alpha})`);
            lineGrad.addColorStop(1, p2.color.includes('56') ? `rgba(56, 189, 248, ${alpha})` : `rgba(99, 102, 241, ${alpha})`);

            ctx.strokeStyle = lineGrad;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-slate-950"
    />
  );
}
