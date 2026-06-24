import { useState, useEffect, useRef, ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'motion/react';
import { Camera, RefreshCw, Zap, Shield, Eye } from 'lucide-react';
import Card3D from './Card3D';

export default function About() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom persisted profile image if it exists
  useEffect(() => {
    const savedPic = localStorage.getItem('user-portfolio-profile-pic');
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('user-portfolio-profile-pic', base64String);
        setProfilePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetProfilePic = (e: ReactMouseEvent) => {
    e.stopPropagation(); // Avoid triggering card events
    localStorage.removeItem('user-portfolio-profile-pic');
    setProfilePic(null);
  };

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
          About Me
        </h2>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Who is behind the code?
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Card column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Card3D tilt frame */}
          <Card3D
            id="profile-picture-card"
            className="w-72 h-80 sm:w-80 sm:h-96 relative group cursor-pointer profile-pic-interactive"
            intensity={12}
          >
            {profilePic ? (
              // User uploaded base64 picture
              <img
                src={profilePic}
                alt="Neil Profile Portrait"
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              // Stunning vector/stylized avatar representing the brick-wall neon aesthetic
              <div className="w-full h-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 border border-white/5 relative overflow-hidden">
                {/* Brick wall SVG motif */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30 stroke-slate-800"
                  width="100%"
                  height="100%"
                >
                  <pattern id="brick-pattern" width="80" height="30" patternUnits="userSpaceOnUse">
                    <rect width="80" height="30" fill="none" />
                    <path d="M 0 0 L 80 0 M 0 30 L 80 30 M 40 0 L 40 30 M 0 0 L 0 30" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#brick-pattern)" />
                </svg>

                {/* Neon lights */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-80 blur-sm shadow-[0_0_15px_rgba(56,189,248,0.8)]" />

                {/* Profile Silhouette with dark wavy hair and black jacket */}
                <div className="relative z-10 w-44 h-44 rounded-full bg-slate-950 border-2 border-sky-400/30 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                  {/* Human shape SVG representing the uploaded look */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full fill-slate-800 stroke-slate-700 mt-4"
                  >
                    {/* Wavy hair */}
                    <path
                      d="M 25 35 C 25 20, 75 20, 75 35 C 80 32, 60 5, 50 15 C 40 5, 20 32, 25 35 Z"
                      className="fill-slate-950"
                    />
                    {/* Head */}
                    <circle cx="50" cy="40" r="18" className="fill-slate-700/60" />
                    {/* Hair strands */}
                    <path
                      d="M 33 26 Q 42 18 50 28 Q 58 18 67 26"
                      stroke="rgba(99, 102, 241, 0.4)"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Leather jacket & shirt */}
                    <path
                      d="M 15 90 C 25 70, 75 70, 85 90 Z"
                      className="fill-slate-900 stroke-slate-950"
                    />
                    {/* V-neck white shirt */}
                    <polygon points="40,75 50,88 60,75" className="fill-slate-200" />
                    {/* Leather collar flaps */}
                    <path d="M 20 78 L 35 83 L 30 90 Z" className="fill-slate-950" />
                    <path d="M 80 78 L 65 83 L 70 90 Z" className="fill-slate-950" />
                  </svg>
                </div>

                <div className="mt-6 text-center relative z-10">
                  <p className="font-display font-bold text-sm text-white">Default Silhouette</p>
                  <p className="font-mono text-[10px] text-slate-500 mt-1">Brick & Leather Jacket Motif</p>
                </div>
              </div>
            )}

            {/* Float glassmorphic upload trigger overlay */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={triggerUpload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-white/20 text-white font-sans text-xs font-semibold shadow-lg hover:bg-sky-400 hover:text-slate-950 hover:border-transparent transition-all duration-300 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Upload Profile Pic</span>
              </button>
            </div>

            {/* If customized, show small reset button in corner */}
            {profilePic && (
              <button
                onClick={resetProfilePic}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-rose-400 hover:text-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 z-20 cursor-pointer shadow-md"
                title="Reset to default illustration"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </Card3D>

          {/* Hidden input field */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <p className="font-mono text-[10px] text-slate-500 mt-4 text-center">
            Click to upload your custom image. Persists via local storage!
          </p>
        </div>

        {/* Text Bio Column */}
        <div className="lg:col-span-7 flex flex-col">
          <h4 className="font-display text-xl md:text-2xl font-bold text-white mb-6">
            Hi, I'm Neil — developer, designer, and digital builder.
          </h4>

          <div className="space-y-4 font-sans text-sm md:text-base text-slate-300 leading-relaxed">
            <p>
              I specialize in combining powerful logic, elegant structure, and breathtaking visuals to build flawless digital experiences. Over the years, I've developed a reputation for executing ideas with pixel-perfect accuracy and high-performance engineering.
            </p>
            <p>
              My stack is focused heavily on React, TypeScript, and Tailwind CSS, coupled with high-efficiency state structures and animation engines like Framer Motion. I love creating fluid 3D transformations and responsive geometries that capture user attention instantly.
            </p>
          </div>

          {/* Value pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 text-indigo-400">
                <Zap className="w-4 h-4" />
              </div>
              <h5 className="font-display font-semibold text-xs text-white mb-1">Performance First</h5>
              <p className="font-sans text-[11px] text-slate-400 leading-normal">
                Sub-second initial loads, optimized bundle sizes, and efficient re-renders.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3 text-sky-400">
                <Shield className="w-4 h-4" />
              </div>
              <h5 className="font-display font-semibold text-xs text-white mb-1">Clean Architectures</h5>
              <p className="font-sans text-[11px] text-slate-400 leading-normal">
                Modular components, well-defined types, and easily maintainable codebase patterns.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center mb-3 text-sky-400">
                <Eye className="w-4 h-4" />
              </div>
              <h5 className="font-display font-semibold text-xs text-white mb-1">Stunning Visuals</h5>
              <p className="font-sans text-[11px] text-slate-400 leading-normal">
                Smooth transitions, spring-physics micro-interactions, and 3D details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/5">
        <div className="text-center md:text-left">
          <h4 className="font-display text-3xl md:text-4xl font-extrabold text-white">5+</h4>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            Years Coding Experience
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-display text-3xl md:text-4xl font-extrabold text-sky-400">40+</h4>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            Projects Completed
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-display text-3xl md:text-4xl font-extrabold text-indigo-400">100%</h4>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            Client Satisfaction
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-display text-3xl md:text-4xl font-extrabold text-sky-400">20+</h4>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            SaaS Modules Built
          </p>
        </div>
      </div>
    </section>
  );
}
