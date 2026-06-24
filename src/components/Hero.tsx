import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Github, Linkedin, Award, Sparkles, Terminal } from 'lucide-react';

const specialties = [
  'Full-Stack Developer',
  'UI/UX Interaction Engineer',
  '3D Web Experience Creator',
  'Software Engineer',
];

export default function Hero() {
  const [specialtyIndex, setSpecialtyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden md:px-12"
    >
      {/* Absolute floating accent blobs */}
      <div className="absolute top-[20%] left-[10%] w-[25vw] h-[25vw] max-w-[300px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[350px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Main Bio Text column */}
        <div className="flex-1 text-center lg:text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 font-mono text-[10px] tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-3 h-3 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Open for Opportunities</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Crafting Digital
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.15)]">
              Masterpieces
            </span>
          </motion.h1>

          {/* Specialty sliding rotator */}
          <div className="h-8 md:h-10 overflow-hidden mb-6 flex items-center justify-center lg:justify-start">
            <span className="font-sans text-lg md:text-xl text-slate-400 font-medium mr-2">
              I am a
            </span>
            <div className="relative inline-block h-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={specialtyIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-lg md:text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  {specialties[specialtyIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Supporting Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Full-stack engineer specializing in building high-fidelity web applications with stunning micro-interactions, responsive design, and performant 3D integrations.
          </motion.p>

          {/* Call to Actions & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={handleScrollToAbout}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-slate-950 bg-white shadow-[0_5px_20px_rgba(255,255,255,0.1)] hover:bg-sky-400 hover:shadow-[0_5px_25px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Explore Portfolio
            </button>
            <button
              onClick={handleScrollToContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white bg-slate-900 border border-white/10 hover:border-sky-400/50 hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Let's Talk
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:ml-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-white/10 bg-slate-900/60 hover:border-sky-400/50 hover:text-sky-400 transition-colors duration-300 cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-white/10 bg-slate-900/60 hover:border-sky-400/50 hover:text-sky-400 transition-colors duration-300 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dashboard/Visual column (Bento visual style) */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-none flex items-center justify-center">
          {/* Decorative floating terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden ring-1 ring-white/5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Terminal Top bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                <Terminal className="w-3 h-3" />
                <span>neil-core.ts</span>
              </div>
            </div>

            {/* Code Lines */}
            <div className="font-mono text-xs text-slate-300 space-y-2">
              <p className="text-slate-500">// Initialize Developer profile</p>
              <p>
                <span className="text-pink-400">const</span> dev ={' '}
                <span className="text-sky-400">new</span>{' '}
                <span className="text-amber-400">Developer</span>({'{'}
              </p>
              <p className="pl-4">
                name: <span className="text-emerald-300">"Neil"</span>,
              </p>
              <p className="pl-4">
                role: <span className="text-emerald-300">"Full Stack Engineer"</span>,
              </p>
              <p className="pl-4">
                techStack: [<span className="text-amber-300">"React"</span>,{' '}
                <span className="text-amber-300">"TypeScript"</span>,{' '}
                <span className="text-amber-300">"Tailwind"</span>],
              </p>
              <p className="pl-4">
                loves3D: <span className="text-purple-400">true</span>,
              </p>
              <p className="pl-4">
                currentProject:{' '}
                <span className="text-emerald-300">"SaaS Analytics"</span>
              </p>
              <p>{'}'});</p>
              <p className="text-slate-500">// Run performance tests</p>
              <p className="text-emerald-400">
                &gt; dev.deployApp() <span className="text-sky-400">| Status: Ready</span>
              </p>
            </div>

            {/* Float glassmorphic stat card on top of terminal */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 -right-6 bg-slate-900/85 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-xl flex items-center gap-3 ring-1 ring-white/5"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Success Rate
                </p>
                <p className="font-display font-bold text-base text-white">100% Delivery</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Mouse scroll down indicator */}
      <motion.button
        onClick={handleScrollToAbout}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mt-16 flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300 cursor-pointer group"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-1 group-hover:border-sky-400 transition-colors">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-2 rounded-full bg-sky-400"
          />
        </div>
      </motion.button>
    </section>
  );
}
