import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code2, Heart, ExternalLink, Sparkles } from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Premium initial counting splash loader
  useEffect(() => {
    if (loadProgress >= 100) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      return;
    }

    const timer = setInterval(() => {
      setLoadProgress((prev) => {
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(100, prev + increment);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [loadProgress]);

  return (
    <div className="relative min-h-screen text-white bg-[#030712] font-sans selection:bg-sky-500/30 selection:text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          // Tech Splash Screen Loader
          <motion.div
            key="loader"
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 border-b border-white/5"
          >
            <div className="absolute inset-0 bg-grid-white/[0.01]" />
            
            <div className="flex flex-col items-center max-w-sm w-full relative z-10">
              {/* Spinning tech logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              >
                <div className="w-full h-full bg-slate-950 rounded-[12px] flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-sky-400" />
                </div>
              </motion.div>

              {/* Progress Count */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 animate-pulse text-sky-400" />
                    <span>SYSTEM_BOOT_NEIL_DEV</span>
                  </span>
                  <span>{loadProgress}%</span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-white/5 p-[1px]">
                  <div
                    style={{ width: `${loadProgress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-100 ease-out"
                  />
                </div>
              </div>

              {/* Loader Subtitles */}
              <p className="font-mono text-[9px] text-slate-500 tracking-wider uppercase mt-6 text-center">
                Initializing 3D Shaders & Motion Matrices...
              </p>
            </div>
          </motion.div>
        ) : (
          // Portfolio Main layout reveal
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative"
          >
            {/* Custom Mouse Cursor */}
            <CustomCursor />

            {/* Interactive 3D Background */}
            <ThreeCanvas />

            {/* Floating Navigation Menu */}
            <Navbar />

            {/* Sections */}
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />

            {/* Modular Footer */}
            <footer className="border-t border-white/5 bg-slate-950/80 backdrop-blur-md relative z-10 py-12 px-6 md:px-12">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Footer Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                        <Code2 className="w-3 h-3 text-sky-400" />
                      </div>
                    </div>
                    <span className="font-display font-extrabold text-base tracking-tight bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                      NEIL<span className="text-white">.</span>
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-500 text-center md:text-left">
                    Crafting premium, high-performance web experiences.
                  </p>
                </div>

                {/* Core quicklinks / credentials */}
                <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                  <p className="font-sans text-[11px] text-slate-400 flex items-center gap-1.5 justify-center md:justify-end">
                    <span>Designed & engineered with</span>
                    <Heart className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 animate-pulse" />
                    <span>by Neil</span>
                  </p>
                  <p className="font-mono text-[9px] text-slate-500">
                    &copy; {new Date().getFullYear()} Neil. All Rights Reserved.
                  </p>
                </div>

              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
