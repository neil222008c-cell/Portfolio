import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Database, Cpu, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Skill, Experience } from '../types';

const skillsData: Skill[] = [
  // Frontend
  { name: 'React / Next.js', level: 95, category: 'frontend', iconName: 'Layers' },
  { name: 'TypeScript', level: 92, category: 'frontend', iconName: 'Layers' },
  { name: 'Tailwind CSS', level: 98, category: 'frontend', iconName: 'Layers' },
  { name: 'Framer Motion', level: 88, category: 'frontend', iconName: 'Layers' },
  
  // Backend
  { name: 'Node.js / Express', level: 86, category: 'backend', iconName: 'Database' },
  { name: 'PostgreSQL / SQL', level: 80, category: 'backend', iconName: 'Database' },
  { name: 'REST & GraphQL APIs', level: 88, category: 'backend', iconName: 'Database' },
  { name: 'Firebase / Firestore', level: 85, category: 'backend', iconName: 'Database' },

  // Tools & Frameworks
  { name: 'Vite / Webpack', level: 90, category: 'tools', iconName: 'Cpu' },
  { name: 'Git & GitHub Actions', level: 87, category: 'tools', iconName: 'Cpu' },
  { name: 'Docker / Cloud Run', level: 75, category: 'tools', iconName: 'Cpu' },
  { name: 'Figma (Design to Dev)', level: 85, category: 'tools', iconName: 'Cpu' },
];

const experienceData: Experience[] = [
  {
    id: 'exp1',
    role: 'Lead Full-Stack Developer',
    company: 'Nova Digital Studio',
    location: 'San Francisco, CA (Remote)',
    period: '2024 - Present',
    description: [
      'Engineered state architectures and optimized asset flows inside complex full-stack web platforms.',
      'Configured automated CI/CD flows via GitHub Actions reducing staging errors by over 30%.',
      'Fostered pixel-perfect, highly accessible responsive layouts utilizing modular Tailwind CSS utility classes.',
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Docker'],
  },
  {
    id: 'exp2',
    role: 'Frontend Engineer',
    company: 'Prism Tech Solutions',
    location: 'Austin, TX (Hybrid)',
    period: '2022 - 2024',
    description: [
      'Collaborated closely with visual design directors in translating high-fidelity Figma structures into fluid, interactive layouts.',
      'Developed circular charts and data visualizers using D3 and Recharts with sub-second recalculation latencies.',
      'Reduced loading latencies by over 40% via lazy asset loads and modular bundles.',
    ],
    skills: ['React', 'Framer Motion', 'Figma', 'Recharts', 'Webpack'],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Skills & Categories */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
              My Toolkit
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Skills & Expertise
            </h3>
            <p className="font-sans text-sm text-slate-400 leading-relaxed mb-8">
              I believe in utilizing the optimal instrument for each specific objective. Here is a curated overview of languages, frameworks, and pipelines I configure on a regular basis.
            </p>
          </div>

          {/* Tab Categories selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(['all', 'frontend', 'backend', 'tools'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-sky-400/25 to-indigo-500/25 border border-sky-400/30 text-white shadow-md'
                    : 'bg-slate-900/40 border border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic skill bars layout */}
          <div className="space-y-5">
            {filteredSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    {skill.category === 'frontend' && <Layers className="w-3.5 h-3.5 text-sky-400" />}
                    {skill.category === 'backend' && <Database className="w-3.5 h-3.5 text-sky-400" />}
                    {skill.category === 'tools' && <Cpu className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>{skill.name}</span>
                  </span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>

                {/* Meter container */}
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/5 p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      skill.category === 'frontend'
                        ? 'from-sky-400 to-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                        : skill.category === 'backend'
                        ? 'from-sky-500 to-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                        : 'from-indigo-400 to-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Professional Timeline */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
              My Journey
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
              Work Experience
            </h3>
          </div>

          {/* Vertical Timeline connection line */}
          <div className="relative border-l border-white/10 pl-6 ml-3 space-y-12">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Connector Node */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-400 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.8)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>

                {/* Timeline Card */}
                <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-white group-hover:text-sky-400 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="font-sans text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-[10px] text-slate-500">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bullet accomplishments */}
                  <ul className="space-y-2 list-none p-0 m-0">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 font-sans text-xs text-slate-300 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags deployed */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md border border-white/5 bg-white/[0.01] font-mono text-[9px] text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
