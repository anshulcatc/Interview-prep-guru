import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubdomainId, RolePreset } from '../types';
import {
  Brain,
  Sliders,
  Sparkles,
  Building2,
  PlayCircle,
  Globe,
  ChevronRight,
  Type,
  Check,
  ChevronDown,
  Menu,
  X,
  FileText,
} from 'lucide-react';

interface NavbarProps {
  currentSubdomain: SubdomainId;
  onSelectSubdomain: (id: SubdomainId) => void;
  selectedRole: RolePreset;
  onOpenRoleModal: () => void;
  onOpenDemoModal: () => void;
  onStartPractice: () => void;
}

export type FontTheme = 'executive' | 'minimal' | 'modern' | 'space';

const FONT_OPTIONS: { id: FontTheme; name: string; displayFont: string; desc: string }[] = [
  { id: 'executive', name: 'Outfit + Inter', displayFont: 'Outfit', desc: 'Modern executive tech (Recommended)' },
  { id: 'minimal', name: 'Inter Clean', displayFont: 'Inter', desc: 'Linear & Vercel minimalist style' },
  { id: 'modern', name: 'Manrope + Inter', displayFont: 'Manrope', desc: 'Sleek product editorial' },
  { id: 'space', name: 'Space Grotesk', displayFont: 'Space Grotesk', desc: 'Futuristic AI & telemetry' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentSubdomain,
  onSelectSubdomain,
  selectedRole,
  onOpenRoleModal,
  onOpenDemoModal,
  onStartPractice,
}) => {
  const [currentFont, setCurrentFont] = useState<FontTheme>('executive');
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('prepmind_font') as FontTheme) || 'executive';
    setCurrentFont(saved);
    document.documentElement.setAttribute('data-font', saved);

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<FontTheme>;
      if (customEvent.detail) {
        setCurrentFont(customEvent.detail);
      }
    };

    window.addEventListener('prepmind-font-changed', handleCustomChange);
    return () => window.removeEventListener('prepmind-font-changed', handleCustomChange);
  }, []);

  const handleSelectFont = (fontId: FontTheme) => {
    setCurrentFont(fontId);
    document.documentElement.setAttribute('data-font', fontId);
    localStorage.setItem('prepmind_font', fontId);
    window.dispatchEvent(new CustomEvent('prepmind-font-changed', { detail: fontId }));
    setIsFontMenuOpen(false);
  };

  const handleSubdomainClick = (id: SubdomainId) => {
    onSelectSubdomain(id);
    setIsMobileMenuOpen(false);
  };

  const subdomains: { id: SubdomainId; label: string; tag: string }[] = [
    { id: 'overview', label: 'Overview', tag: 'HUB' },
    { id: 'resume', label: 'AI Resume Builder', tag: 'NEW' },
    { id: 'problem', label: 'The Problem', tag: '01' },
    { id: 'multimodal', label: 'Multimodal Layer', tag: '02' },
    { id: 'ecosystem', label: 'Ecosystem', tag: '03' },
    { id: 'engine', label: 'Intelligence Console', tag: '04' },
    { id: 'moat', label: 'Why We Win', tag: '05' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav-light">
      {/* Top domain status bar */}
      <div className="bg-slate-100/90 border-b border-slate-200/70 px-3 sm:px-4 py-1.5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-semibold text-indigo-950 bg-white px-2 sm:px-2.5 py-0.5 rounded-full border border-indigo-100 shadow-2xs truncate max-w-[170px] xs:max-w-[210px] sm:max-w-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="truncate">
                https://<strong className="text-indigo-600">{currentSubdomain}</strong>.interviewprepguru.ai
              </span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
              <span>Target Role:</span>
              <span className="font-semibold text-slate-900 bg-slate-200/60 px-2 py-0.5 rounded truncate max-w-[180px]">
                {selectedRole.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Font Style Switcher Pill with Framer Motion hover */}
            <div className="relative">
              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
                className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-700 hover:text-indigo-950 transition-colors bg-white hover:bg-slate-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs cursor-pointer min-h-[26px]"
                title="Change Platform Font Style"
              >
                <Type className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="hidden xs:inline">Font: </span>
                <strong className="font-bold text-slate-900">
                  {FONT_OPTIONS.find((f) => f.id === currentFont)?.displayFont}
                </strong>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </motion.button>

              <AnimatePresence>
                {isFontMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsFontMenuOpen(false)}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50"
                    >
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1">
                        Typography Aesthetic
                      </div>
                      {FONT_OPTIONS.map((f) => {
                        const isSelected = currentFont === f.id;
                        return (
                          <motion.button
                            key={f.id}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelectFont(f.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex items-start justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50/80 text-indigo-950 font-bold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-semibold flex items-center gap-1.5">
                                <span>{f.name}</span>
                                {f.id === 'executive' && (
                                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                                {f.desc}
                              </div>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              onClick={onOpenRoleModal}
              className="group flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-indigo-700 hover:text-indigo-950 transition-colors bg-white hover:bg-indigo-50/80 px-2 sm:px-2.5 py-0.5 rounded-full border border-indigo-200/80 shadow-2xs cursor-pointer min-h-[26px]"
            >
              <Sliders className="w-3 h-3 text-indigo-600 group-hover:rotate-45 transition-transform shrink-0" />
              <span className="hidden sm:inline">Customize Role & JD</span>
              <span className="sm:hidden">Role</span>
              <ChevronRight className="w-2.5 h-2.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => handleSubdomainClick('overview')}
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink-0 min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all flex items-center justify-center text-white shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                Interview Prep Guru
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-wider font-mono text-indigo-600 font-bold uppercase flex items-center gap-1 truncate">
              <span>Powered by PrepMind AI</span>
            </div>
          </div>
        </motion.button>

        {/* Subdomain Switcher Navigation Tabs (Desktop only) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/90 text-xs font-medium shrink-0">
          {subdomains.map((item) => {
            const isActive = currentSubdomain === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                onClick={() => handleSubdomainClick(item.id)}
                className={`relative px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-indigo-900 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeSubdomainDot"
                    className="w-1.5 h-1.5 rounded-full bg-indigo-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Action CTAs + Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <motion.button
            whileHover={{ y: -1.5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            onClick={onOpenDemoModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer min-h-[36px]"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Demo</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            onClick={onStartPractice}
            className="shimmer-btn inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:opacity-95 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer min-h-[36px]"
          >
            <PlayCircle className="w-4 h-4 text-indigo-200 shrink-0" />
            <span className="hidden sm:inline">Practice This Role</span>
            <span className="sm:hidden font-bold">Practice</span>
          </motion.button>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border border-slate-200 bg-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 tracking-wider">
                Explore Platform Subdomains
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {subdomains.map((item) => {
                  const isActive = currentSubdomain === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSubdomainClick(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between min-h-[44px] cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200/80 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.tag}
                        </span>
                        <span className="text-xs font-semibold">{item.label}</span>
                      </div>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Action Strip */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRoleModal();
                  }}
                  className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center cursor-pointer min-h-[40px] flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Customize Role</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDemoModal();
                  }}
                  className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center cursor-pointer min-h-[40px] flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Enterprise Demo</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
