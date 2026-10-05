import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Check, Sparkles, X, ChevronUp, Layers, RefreshCw } from 'lucide-react';

export type FontPreset = 'executive' | 'minimal' | 'modern' | 'space';

export interface FontPresetConfig {
  id: FontPreset;
  label: string;
  displayFont: string;
  bodyFont: string;
  tagline: string;
  sampleHeadline: string;
  recommendedFor: string;
  accentColor: string;
  badge: string;
}

export const FONT_PRESETS: FontPresetConfig[] = [
  {
    id: 'executive',
    label: 'Executive',
    displayFont: 'Outfit',
    bodyFont: 'Inter',
    tagline: 'Refined geometric sans for high-stakes enterprise applications',
    sampleHeadline: 'Precision Voice & Vision Intelligence',
    recommendedFor: 'Enterprise C-Suite, Strategy, & Senior Leadership',
    accentColor: 'from-indigo-600 to-violet-600',
    badge: 'Recommended',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    displayFont: 'Inter',
    bodyFont: 'Inter',
    tagline: 'Ultra-clean neutral typography engineered for modern screens',
    sampleHeadline: 'Linear & Vercel Clean Interface',
    recommendedFor: 'Engineering, Systems Architecture, & Quantitative Dev',
    accentColor: 'from-slate-700 to-slate-900',
    badge: 'Clean Tech',
  },
  {
    id: 'modern',
    label: 'Modern',
    displayFont: 'Manrope',
    bodyFont: 'Inter',
    tagline: 'Contemporary, warm, and sophisticated design studio feel',
    sampleHeadline: 'Human-Centered Multimodal Calibration',
    recommendedFor: 'Product Design, Leadership, & Behavioral Talent',
    accentColor: 'from-sky-600 to-indigo-600',
    badge: 'Editorial',
  },
  {
    id: 'space',
    label: 'Space',
    displayFont: 'Space Grotesk',
    bodyFont: 'Inter',
    tagline: 'Expressive technical typography for cutting-edge AI systems',
    sampleHeadline: 'Neural Telemetry & 60Hz Acoustic Sync',
    recommendedFor: 'AI Research, Robotics, & Frontier Platforms',
    accentColor: 'from-purple-600 to-pink-600',
    badge: 'Frontier AI',
  },
];

interface ThemeSwitcherProps {
  variant?: 'floating' | 'embedded';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ variant = 'floating' }) => {
  const [activeFont, setActiveFont] = useState<FontPreset>('executive');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Load saved preference from localStorage on mount & listen for changes
  useEffect(() => {
    const saved = (localStorage.getItem('prepmind_font') as FontPreset) || 'executive';
    setActiveFont(saved);
    document.documentElement.setAttribute('data-font', saved);

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<FontPreset>;
      if (customEvent.detail) {
        setActiveFont(customEvent.detail);
      }
    };

    window.addEventListener('prepmind-font-changed', handleCustomChange);
    return () => window.removeEventListener('prepmind-font-changed', handleCustomChange);
  }, []);

  const handleSelectPreset = (preset: FontPreset) => {
    setActiveFont(preset);
    document.documentElement.setAttribute('data-font', preset);
    localStorage.setItem('prepmind_font', preset);
    window.dispatchEvent(new CustomEvent('prepmind-font-changed', { detail: preset }));
  };

  const activeConfig = FONT_PRESETS.find((p) => p.id === activeFont) || FONT_PRESETS[0];

  if (variant === 'embedded') {
    return (
      <div className="p-4 bg-white/90 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-600" />
            <span className="font-display font-bold text-sm text-slate-900">
              Typography Preset
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Active: <strong className="text-indigo-600">{activeConfig.label}</strong>
          </span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2">
          {FONT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeFont === preset.id
                  ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{preset.label}</span>
                {activeFont === preset.id && (
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {preset.displayFont}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Expanded Modal Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-end sm:justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative z-50 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-7 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xs">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-extrabold text-slate-950">
                    Platform Typography Theme
                  </h3>
                  <p className="text-xs text-slate-500">
                    Switch between 4 high-precision typeface systems. Saved to localStorage.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close theme switcher"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">
                <span>Active Specimen · {activeConfig.label} ({activeConfig.displayFont} + {activeConfig.bodyFont})</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Live</span>
              </div>
              <div className="font-display text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-1">
                {activeConfig.sampleHeadline}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Synchronized 60Hz vocal prosody, micro-expression tracking, and STAR language analysis in real-time.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2.5 mb-6">
              {FONT_PRESETS.map((preset) => {
                const isSelected = activeFont === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/25 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-display font-extrabold text-sm text-slate-950">
                          {preset.label}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {preset.displayFont} + {preset.bodyFont}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {preset.badge}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-normal mb-1">
                      {preset.tagline}
                    </p>

                    <div className="text-[11px] font-mono text-indigo-700 font-medium">
                      Best for: {preset.recommendedFor}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer with Reset CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <button
                onClick={() => handleSelectPreset('executive')}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-mono text-[11px] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Executive (Default)</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Theme Switcher Trigger Pill */}
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        onClick={() => setIsOpen(true)}
        className="group glass-premium flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-slate-300/90 shadow-lg hover:shadow-xl hover:border-indigo-400 bg-white/95 transition-all text-left cursor-pointer"
        title="Change Platform Typography Theme"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-2xs group-hover:rotate-12 transition-transform">
          <Type className="w-3.5 h-3.5" />
        </div>
        <div className="hidden sm:block">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-400 leading-none">
            Font Theme
          </div>
          <div className="text-xs font-display font-extrabold text-slate-900 leading-tight">
            {activeConfig.label}
          </div>
        </div>
        <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors ml-0.5" />
      </motion.button>
    </div>
  );
};
