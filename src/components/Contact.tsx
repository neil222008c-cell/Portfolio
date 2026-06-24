import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, MessageSquareCode } from 'lucide-react';
import { ContactForm } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setFormState('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setFormState('error');
      return;
    }

    setFormState('submitting');

    // Simulate reliable API endpoint submit delay
    setTimeout(() => {
      // Clear data on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setFormState('success');
    }, 1500);
  };

  const handleResetFormState = () => {
    setFormState('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
          Connect
        </h2>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Get In Touch
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Contact Info Sidebar Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h4 className="font-display text-xl md:text-2xl font-bold text-white">
              Let's craft something amazing together.
            </h4>
            <p className="font-sans text-sm text-slate-400 leading-relaxed">
              Have an idea, project, or open vacancy? Send over a message! I respond within 24 hours to coordinate an introductory virtual sync.
            </p>
          </div>

          {/* Quick contact direct channels */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm group hover:border-sky-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  Direct Email
                </p>
                <a href="mailto:neil222008c@gmail.com" className="font-sans text-sm text-white hover:text-sky-400 transition-colors">
                  neil222008c@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm group hover:border-indigo-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  Mobile Call
                </p>
                <a href="tel:+15550199" className="font-sans text-sm text-white hover:text-indigo-400 transition-colors">
                  +1 (555) 0199
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-sm group hover:border-sky-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  Location base
                </p>
                <p className="font-sans text-sm text-white">
                  San Francisco, California
                </p>
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] text-slate-500 flex items-center gap-2">
            <MessageSquareCode className="w-4 h-4 text-sky-400" />
            <span>Responsive form validation enabled</span>
          </div>
        </div>

        {/* Form panel Column */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/30 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              // Success checkout drawing screen
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                {/* Drawing checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.15, type: 'spring' }}
                  className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>

                <h4 className="font-display text-2xl font-extrabold text-white mb-3">
                  Message Dispatched!
                </h4>
                <p className="font-sans text-sm text-slate-400 max-w-sm leading-relaxed mb-8">
                  Your communication was processed and securely routed. Neil will review your message shortly and follow up directly!
                </p>

                <button
                  onClick={handleResetFormState}
                  className="px-6 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-slate-950 bg-white hover:bg-sky-400 transition-colors cursor-pointer shadow-lg"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              // Standard Form display
              <motion.form
                key="form"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/60 text-white font-sans text-xs focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/60 text-white font-sans text-xs focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/60 text-white font-sans text-xs focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hi Neil, I'd like to discuss building a custom..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/60 text-white font-sans text-xs focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all outline-none resize-none"
                    required
                  />
                </div>

                {/* Inline validations alert error message */}
                {formState === 'error' && (
                  <motion.div
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-sans text-xs"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-slate-950 bg-white hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 transition-all cursor-pointer shadow-[0_5px_15px_rgba(255,255,255,0.05)] hover:shadow-[0_5px_20px_rgba(56,189,248,0.3)] disabled:hover:shadow-none hover:scale-[1.01] active:scale-[0.99]"
                >
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
