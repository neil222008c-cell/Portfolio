import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Code, Globe, Tag } from 'lucide-react';
import { Project } from '../types';
import Card3D from './Card3D';

const projectsData: Project[] = [
  {
    id: 'proj1',
    title: 'Aura Analytics SaaS Dashboard',
    description: 'A premium, real-time SaaS intelligence dashboard equipped with dynamic data streams, interactive D3 charts, and predictive visual analytics.',
    longDescription: 'Aura Analytics is a next-generation business intelligence system. Designed with a performance-first mindset, it processes hundreds of thousands of client-side events in real-time, utilizing memoized data trees to feed high-fidelity charts. The interface features customizable layout configurations, modular widget builders, and immersive drag-and-drop metrics boards.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    image: '📊', // Beautiful emoji-icon layout fallback to ensure robust visual look
    role: 'Lead Full-Stack Architect',
    client: 'Aura Metrics Inc.',
    duration: '4 Months (2025)',
    stats: [
      { label: 'Event Throughput', value: '1.2M/sec' },
      { label: 'Render Latency', value: '<12ms' },
      { label: 'Storage Savings', value: '45%' },
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
  {
    id: 'proj2',
    title: 'Synapse Collaborative Canvas',
    description: 'A multi-user real-time whiteboard canvas equipped with vector geometry tools, document sync, and sub-pixel gesture tracking.',
    longDescription: 'Synapse provides a seamless collaborative canvas designed for brainstorming and spatial mapping. Running on a lightweight server-authoritative coordinate system, it manages vector coordinate conflicts and applies client-side linear interpolation for a latency-free drawing feel. It includes export modules (SVG/PNG), custom stencil libraries, and infinite zoom structures.',
    tags: ['React', 'TypeScript', 'HTML5 Canvas', 'WebSockets', 'Tailwind CSS'],
    image: '🎨',
    role: 'Principal Frontend Developer',
    client: 'Synapse Team',
    duration: '5 Months (2025)',
    stats: [
      { label: 'Co-Drawing Sync', value: '<30ms' },
      { label: 'Max Active Users', value: '150+' },
      { label: 'File Export Quality', value: '4K Vector' },
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
  {
    id: 'proj3',
    title: 'Apex Procedural 3D Engine',
    description: 'An interactive procedural 3D visual mapping utility that generates structural topographies and responsive cityscapes inside the browser.',
    longDescription: 'Apex is a client-side procedural generation project that builds stunning interactive terrains and structural city blocks on-the-fly. Built using custom shader-like canvas projections, it rotates and structures vectors in real-time. Users can manipulate weather cycles, solar coordinates, and topology heights with instant rendering updates.',
    tags: ['React', 'TypeScript', 'WebGL', 'Three.js', 'Framer Motion'],
    image: '🌌',
    role: '3D UI developer',
    client: 'Apex Labs',
    duration: '3 Months (2026)',
    stats: [
      { label: 'Avg FPS (Mobile)', value: '60 FPS' },
      { label: 'Procedural Blocks', value: '10k+' },
      { label: 'Solar Angles Calc', value: 'Real-time' },
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    // Prevent body scrolling when modal is active
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
          My Creations
        </h2>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Featured Projects
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <Card3D
            key={project.id}
            id={`card-${project.id}`}
            onClick={() => openProjectDetails(project)}
            className="group cursor-pointer project-card-interactive flex flex-col h-full h-[400px] bg-slate-900/40 backdrop-blur-xs border border-white/5 hover:border-white/10"
            intensity={10}
          >
            {/* Visual Header Graphic */}
            <div className="h-44 bg-slate-950 border-b border-white/5 flex items-center justify-center relative overflow-hidden group">
              {/* Dynamic decorative backdrop grid */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/90 z-0" />
              <div className="absolute inset-0 bg-grid-white/[0.02] z-0" />

              {/* Floating gradient orb in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-r from-sky-400/10 to-indigo-500/10 blur-xl group-hover:scale-125 transition-transform duration-500" />

              {/* Big Project Icon Character */}
              <span className="text-6xl select-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300 z-10">
                {project.image}
              </span>

              {/* Float view detail hint */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                  Details
                </span>
              </div>
            </div>

            {/* Core Card Details body */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-sky-400 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed mt-2.5 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Footer categories / tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md border border-white/5 bg-white/[0.02] font-mono text-[9px] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md border border-white/5 bg-white/[0.02] font-mono text-[9px] text-slate-500">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Project Expandable Details Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectDetails}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header Visual with close trigger */}
              <div className="h-56 bg-slate-950 border-b border-white/5 flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                {/* Big icon visual */}
                <span className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {selectedProject.image}
                </span>

                {/* Close Button */}
                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 p-2.5 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md text-slate-400 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content block */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-sky-500/10 bg-sky-500/5 font-mono text-[10px] text-sky-400"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extended description text */}
                <div className="space-y-4 font-sans text-sm text-slate-300 leading-relaxed">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
                    Project Overview
                  </h4>
                  <p>{selectedProject.longDescription}</p>
                </div>

                {/* Split project info columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
                      Project Metadata
                    </h4>
                    <div className="space-y-2 font-sans text-xs">
                      <p className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-500 font-mono">My Role:</span>
                        <span className="text-white font-medium">{selectedProject.role}</span>
                      </p>
                      <p className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-500 font-mono">Client/Owner:</span>
                        <span className="text-white font-medium">{selectedProject.client || 'Internal Project'}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-500 font-mono">Duration:</span>
                        <span className="text-white font-medium">{selectedProject.duration}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
                      Performance & Impact
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProject.stats?.map((stat) => (
                        <div key={stat.label} className="p-2.5 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                          <p className="font-display font-bold text-sky-400 text-xs sm:text-sm">{stat.value}</p>
                          <p className="font-sans text-[8px] text-slate-500 uppercase mt-1 leading-tight">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Links footer */}
              <div className="p-6 bg-slate-950/50 border-t border-white/5 flex items-center justify-end gap-3 shrink-0">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-slate-900 hover:border-white/20 text-slate-300 hover:text-white font-sans text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 hover:bg-sky-300 hover:scale-[1.02] active:scale-[0.98] font-sans text-xs font-bold tracking-wider transition-all cursor-pointer shadow-md shadow-sky-400/10"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Launch Live App</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
