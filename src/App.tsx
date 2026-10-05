import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SubdomainId, RolePreset } from './types';
import { ROLE_PRESETS } from './data/rolesAndJDs';
import { Navbar } from './components/Navbar';
import { RoleJDModal } from './components/RoleJDModal';
import { DemoModal } from './components/DemoModal';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { PracticeStudio } from './components/PracticeStudio';
import { OverviewView } from './components/views/OverviewView';
import { ProblemView } from './components/views/ProblemView';
import { MultimodalView } from './components/views/MultimodalView';
import { EcosystemView } from './components/views/EcosystemView';
import { EngineView } from './components/views/EngineView';
import { MoatView } from './components/views/MoatView';
import { ResumeModuleView, ResumeTab } from './components/views/ResumeModuleView';
import { Brain, Sliders, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentSubdomain, setCurrentSubdomain] = useState<SubdomainId>('overview');
  const [resumeSubTab, setResumeSubTab] = useState<ResumeTab>('landing');
  const [selectedRole, setSelectedRole] = useState<RolePreset>(ROLE_PRESETS[0]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Sync hash routing & font styling
  useEffect(() => {
    const savedFont = localStorage.getItem('prepmind_font') || 'executive';
    document.documentElement.setAttribute('data-font', savedFont);

    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = rawHash.split('/');
      const baseSubdomain = parts[0];
      const validSubdomains: SubdomainId[] = [
        'overview',
        'problem',
        'multimodal',
        'ecosystem',
        'engine',
        'moat',
        'practice',
        'resume',
      ];
      if (validSubdomains.includes(baseSubdomain as SubdomainId)) {
        setCurrentSubdomain(baseSubdomain as SubdomainId);
      }
      if (baseSubdomain === 'resume') {
        const sub = parts[1];
        if (sub === 'builder' || sub === 'tailor' || sub === 'ats-check' || sub === 'templates' || sub === 'dashboard') {
          setResumeSubTab(sub as ResumeTab);
        } else {
          setResumeSubTab('landing');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateSubdomain = (id: SubdomainId) => {
    setCurrentSubdomain(id);
    window.location.hash = `#/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = () => {
    handleNavigateSubdomain('practice');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Universal Top Navigation */}
      <Navbar
        currentSubdomain={currentSubdomain}
        onSelectSubdomain={handleNavigateSubdomain}
        selectedRole={selectedRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onStartPractice={handleStartPractice}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-24">
        {currentSubdomain === 'overview' && (
          <OverviewView
            selectedRole={selectedRole}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            onStartPractice={handleStartPractice}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onNavigateSubdomain={handleNavigateSubdomain}
          />
        )}

        {currentSubdomain === 'problem' && (
          <ProblemView
            onNavigateSubdomain={handleNavigateSubdomain}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />
        )}

        {currentSubdomain === 'multimodal' && (
          <MultimodalView
            onNavigateSubdomain={handleNavigateSubdomain}
            onStartPractice={handleStartPractice}
          />
        )}

        {currentSubdomain === 'ecosystem' && (
          <EcosystemView
            onNavigateSubdomain={handleNavigateSubdomain}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onStartPractice={handleStartPractice}
            selectedRole={selectedRole}
          />
        )}

        {currentSubdomain === 'engine' && (
          <EngineView
            onNavigateSubdomain={handleNavigateSubdomain}
            selectedRole={selectedRole}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />
        )}

        {currentSubdomain === 'moat' && (
          <MoatView
            onNavigateSubdomain={handleNavigateSubdomain}
            onStartPractice={handleStartPractice}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
          />
        )}

        {currentSubdomain === 'practice' && (
          <PracticeStudio
            selectedRole={selectedRole}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            onBackToOverview={() => handleNavigateSubdomain('overview')}
          />
        )}

        {currentSubdomain === 'resume' && (
          <ResumeModuleView
            initialSubTab={resumeSubTab}
            onNavigateSubdomain={handleNavigateSubdomain}
          />
        )}
      </main>

      {/* Universal Light Theme Footer */}
      <footer className="border-t border-slate-200 bg-white pt-12 pb-10 text-slate-500 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
            <div className="md:col-span-5 space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => handleNavigateSubdomain('overview')}
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Interview Prep Guru</span>
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  PrepMind AI
                </span>
              </motion.div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                The multimodal employability intelligence platform connecting candidates, universities, and enterprise talent acquisition.
              </p>
              <div className="text-[11px] font-mono text-slate-400">
                Active Role: <strong className="text-slate-700 font-semibold">{selectedRole.title}</strong>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5">
              <h5 className="font-mono text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                Subdomains
              </h5>
              <ul className="space-y-1.5">
                {[
                  { id: 'overview' as SubdomainId, label: 'Hub Overview' },
                  { id: 'resume' as SubdomainId, label: 'AI Resume Builder' },
                  { id: 'problem' as SubdomainId, label: 'The Problem' },
                  { id: 'multimodal' as SubdomainId, label: 'Multimodal Layer' },
                  { id: 'ecosystem' as SubdomainId, label: 'Ecosystem' },
                  { id: 'engine' as SubdomainId, label: 'Intelligence Console' },
                  { id: 'moat' as SubdomainId, label: 'Why We Win' },
                ].map((item) => (
                  <li key={item.id}>
                    <motion.button
                      whileHover={{ x: 3, color: '#4f46e5' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      onClick={() => handleNavigateSubdomain(item.id)}
                      className="hover:text-indigo-600 transition-colors text-left cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 space-y-2.5">
              <h5 className="font-mono text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                Practice Studio
              </h5>
              <ul className="space-y-1.5">
                <li>
                  <motion.button
                    whileHover={{ x: 3, color: '#4f46e5' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={handleStartPractice}
                    className="hover:text-indigo-600 transition-colors text-left cursor-pointer"
                  >
                    Launch Interactive Practice
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 3, color: '#4f46e5' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={() => setIsRoleModalOpen(true)}
                    className="hover:text-indigo-600 transition-colors text-left cursor-pointer"
                  >
                    Customize Target Role & JD
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 3, color: '#4f46e5' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={() => setIsDemoModalOpen(true)}
                    className="hover:text-indigo-600 transition-colors text-left cursor-pointer"
                  >
                    Schedule Institutional Demo
                  </motion.button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h5 className="font-mono text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                Philosophical Standard
              </h5>
              <p className="italic text-slate-600 text-xs leading-relaxed border-l-2 border-indigo-400 pl-3">
                "Intelligence without understanding is automation. Understanding is the threshold of something genuinely new."
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-600 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Sub-200ms Telemetry Standard</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-[11px] font-mono text-slate-400 text-center sm:text-left">
            <div>
              &copy; 2026 Interview Prep Guru (PrepMind AI Inc.). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <motion.span whileHover={{ y: -1, color: '#0f172a' }} className="transition-colors cursor-default">
                SOC2 Type II
              </motion.span>
              <span>·</span>
              <motion.span whileHover={{ y: -1, color: '#0f172a' }} className="transition-colors cursor-default">
                GDPR Zero-Retention
              </motion.span>
              <span>·</span>
              <motion.span whileHover={{ y: -1, color: '#0f172a' }} className="transition-colors cursor-default">
                ISO 27001
              </motion.span>
            </div>
          </div>
        </div>
      </footer>

      {/* Role & JD Selection Modal */}
      <RoleJDModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        selectedRole={selectedRole}
        onSelectRole={(r) => setSelectedRole(r)}
        onProceedToPractice={(r) => {
          setSelectedRole(r);
          handleNavigateSubdomain('practice');
        }}
      />

      {/* Enterprise Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        selectedRole={selectedRole}
      />

      {/* User-Facing Typography Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}
