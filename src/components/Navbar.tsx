import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2 } from 'lucide-react';

interface NavItem {
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills & Bio', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic IntersectionObserver to highlight current active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger roughly around the upper-middle of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-all duration-300 rounded-full ${
          scrolled
            ? 'bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] py-3 px-6'
            : 'bg-transparent border border-transparent py-5 px-6'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_20px_rgba(129,140,248,0.5)] transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-sky-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              NEIL<span className="text-white">.</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-indigo-500/20 border border-sky-400/30 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Hire Me Button (Action call) */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="relative overflow-hidden group px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider text-slate-950 bg-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(56,189,248,0.4)] hover:bg-sky-400 hover:scale-105 active:scale-95"
            >
              Contact Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-35 w-[90%] bg-slate-950/95 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-display font-medium text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-400/15 to-indigo-500/15 border border-sky-400/30 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-3.5 rounded-xl text-center text-xs font-sans font-bold uppercase tracking-widest bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-lg cursor-pointer"
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
