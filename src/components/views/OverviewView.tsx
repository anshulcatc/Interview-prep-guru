import React from 'react';
import { motion } from 'framer-motion';
import { RolePreset, SubdomainId } from '../../types';
import { HeroProductMockup } from '../visuals/HeroProductMockup';
import { CandidateReadinessRoadmap } from '../CandidateReadinessRoadmap';
import { PlatformImpact } from '../PlatformImpact';
import { Testimonials } from '../Testimonials';
import { ArrowRight, Sliders, PlayCircle, Network, Mic, Eye, Brain, Zap, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface OverviewViewProps {
  selectedRole: RolePreset;
  onOpenRoleModal: () => void;
  onStartPractice: () => void;
  onOpenDemoModal: () => void;
  onNavigateSubdomain: (id: SubdomainId) => void;
}

// Animation configurations
const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedRole,
  onOpenRoleModal,
  onStartPractice,
  onOpenDemoModal,
  onNavigateSubdomain,
}) => {
  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Mesh Accent */}
      <div className="absolute inset-0 bg-mesh-light pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10 opacity-30"></div>

      {/* Subdomain Breadcrumb Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 mb-6 pb-3 border-b border-slate-200/80"
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-500">
          <span className="font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            hub.interviewprepguru.ai
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">product-overview</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Multimodal Stream Online · 60Hz
          </span>
        </div>
      </motion.div>

      {/* Hero Headline & Quick CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="text-center max-w-4xl mx-auto mb-10"
      >
        {/* Active Profile Pill with Role Customizer */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-white text-slate-800 text-xs font-medium mb-5 shadow-2xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-slate-500 font-mono text-[10px]">ROLE:</span>
          <span className="font-bold text-slate-900">{selectedRole.title}</span>
          <button
            onClick={onOpenRoleModal}
            className="ml-1 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-all"
          >
            <Sliders className="w-2.5 h-2.5" />
            <span>Customize</span>
          </button>
        </div>

        {/* Display Headline */}
        <h1 className="font-display fluid-h1 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-4 text-balance">
          The Multimodal Intelligence Layer for{' '}
          <span className="text-gradient-accent">
            High-Stakes Interviews
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          Synchronized voice prosody, micro-expression tracking, and STAR language analysis in real-time.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartPractice}
            className="shimmer-btn w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4 text-indigo-200" />
            <span>Start Practicing with this Role</span>
          </button>

          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <span>Request Enterprise Demo</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </motion.div>

      {/* Primary Visual UI Mockup (Replaces Text Wall) */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-14 max-w-5xl mx-auto"
      >
        <HeroProductMockup roleTitle={selectedRole.title} roleLevel={selectedRole.level} />
      </motion.div>

      {/* Candidate Readiness Roadmap (Scroll-triggered reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
      >
        <CandidateReadinessRoadmap
          selectedRole={selectedRole}
          onStartPractice={onStartPractice}
          onOpenRoleModal={onOpenRoleModal}
        />
      </motion.div>

      {/* Platform Impact Telemetry (Scroll-triggered reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
      >
        <PlatformImpact />
      </motion.div>

      {/* Testimonials Component (Scroll-triggered reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.div>

      {/* Visual Subdomain Directory Cards (Scroll-triggered with staggered children) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display fluid-h2 text-xl sm:text-2xl font-bold text-slate-950">
              Explore Product Subdomains
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Visual surfaces designed for each core capability.</p>
          </div>
        </div>

        <motion.div
          variants={cardStaggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          <motion.div
            variants={cardVariant}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onNavigateSubdomain('problem')}
            className="group glass-premium rounded-2xl p-4 sm:p-5 cursor-pointer border border-slate-200/90 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                <span className="font-mono text-[10px] xs:text-[11px] font-bold text-rose-600 bg-rose-50 px-2 sm:px-2.5 py-0.5 rounded border border-rose-100 truncate min-w-0 max-w-[calc(100%-28px)]">
                  problem.interviewprepguru.ai
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">01</span>
              </div>
              <h3 className="font-display fluid-h3 text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors mb-1.5">
                The 42.6% Employability Problem
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Visual contrast showing how text-only AI loses 70% of human signals.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          <motion.div
            variants={cardVariant}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onNavigateSubdomain('multimodal')}
            className="group glass-premium rounded-2xl p-4 sm:p-5 cursor-pointer border border-slate-200/90 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                <span className="font-mono text-[10px] xs:text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 sm:px-2.5 py-0.5 rounded border border-indigo-100 truncate min-w-0 max-w-[calc(100%-28px)]">
                  multimodal.interviewprepguru.ai
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">02</span>
              </div>
              <h3 className="font-display fluid-h3 text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors mb-1.5">
                4-Pillar Multimodal Pipeline
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Acoustic 60Hz prosody, 18 FACS action units, STAR parsing & sub-200ms sync.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          <motion.div
            variants={cardVariant}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onNavigateSubdomain('ecosystem')}
            className="group glass-premium rounded-2xl p-4 sm:p-5 cursor-pointer border border-slate-200/90 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                <span className="font-mono text-[10px] xs:text-[11px] font-bold text-violet-700 bg-violet-50 px-2 sm:px-2.5 py-0.5 rounded border border-violet-100 truncate min-w-0 max-w-[calc(100%-28px)]">
                  ecosystem.interviewprepguru.ai
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">03</span>
              </div>
              <h3 className="font-display fluid-h3 text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors mb-1.5">
                Tri-Stakeholder Ecosystem
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Visual portals for Candidates, University Career Deans, and Corporate Recruiters.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardStaggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5"
        >
          <motion.div
            variants={cardVariant}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onNavigateSubdomain('engine')}
            className="group glass-premium rounded-2xl p-4 sm:p-5 cursor-pointer border border-slate-200/90 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                <span className="font-mono text-[10px] xs:text-[11px] font-bold text-sky-700 bg-sky-50 px-2 sm:px-2.5 py-0.5 rounded border border-sky-100 truncate min-w-0 max-w-[calc(100%-28px)]">
                  engine.interviewprepguru.ai
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">04</span>
              </div>
              <h3 className="font-display fluid-h3 text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors mb-1.5">
                Live Telemetry Console
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Interactive radial gauge, 138 WPM cadence meter, and dynamic SVG progression curves.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          <motion.div
            variants={cardVariant}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onNavigateSubdomain('moat')}
            className="group glass-premium rounded-2xl p-4 sm:p-5 cursor-pointer border border-slate-200/90 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                <span className="font-mono text-[10px] xs:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded border border-emerald-100 truncate min-w-0 max-w-[calc(100%-28px)]">
                  moat.interviewprepguru.ai
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">05</span>
              </div>
              <h3 className="font-display fluid-h3 text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors mb-1.5">
                Why We Win Matrix
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Direct comparison against traditional mock flashcards and one-way ATS recorders.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Moat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
