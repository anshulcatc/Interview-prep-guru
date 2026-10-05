import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RolePreset } from '../types';
import {
  Mic,
  Video,
  Volume2,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Play,
  Square,
  FileText,
  Activity,
  Clock,
  ArrowRight,
  Award,
  Layers,
  Check,
  ChevronRight,
} from 'lucide-react';

interface PracticeStudioProps {
  selectedRole: RolePreset;
  onOpenRoleModal: () => void;
  onBackToOverview: () => void;
}

interface InterviewTurn {
  id: number;
  title: string;
  stageName: string;
  question: string;
  focusArea: string;
  simulatedAnswer: {
    opening: string;
    action: string;
    result: string;
    metrics: {
      wpm: number;
      score: number;
      fillers: number;
      starAccuracy: string;
    };
  };
}

export const PracticeStudio: React.FC<PracticeStudioProps> = ({
  selectedRole,
  onOpenRoleModal,
  onBackToOverview,
}) => {
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<'prompt' | 'evaluating' | 'results'>('prompt');
  const [candidateResponseText, setCandidateResponseText] = useState<string>('');
  const [evalProgress, setEvalProgress] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(142); // 2m 22s initial baseline

  // Completed turn scores map
  const [completedTurns, setCompletedTurns] = useState<{ [turnId: number]: boolean }>({});

  // 3-Turn Longitudinal Interview Curriculum
  const turns: InterviewTurn[] = [
    {
      id: 0,
      title: 'Turn 01 · Technical Architecture',
      stageName: 'Core Technical Rigor',
      question: selectedRole.sampleQuestion,
      focusArea: selectedRole.evalCriteria.technicalPillars.slice(0, 2).join(' & '),
      simulatedAnswer: selectedRole.sampleSimulatedAnswer,
    },
    {
      id: 1,
      title: 'Turn 02 · Stakeholder & Ambiguity Defense',
      stageName: 'Behavioral Counter-Probing',
      question: `Walk me through a scenario where a cross-functional partner or executive challenged your decision on ${selectedRole.evalCriteria.technicalPillars[0] || 'core architecture'}. How did you defend your proposal with empirical data?`,
      focusArea: selectedRole.evalCriteria.behavioralFocus,
      simulatedAnswer: {
        opening: `During our quarterly infrastructure roadmap review, the lead product stakeholder pushed back on our proposed migration to an event-driven model, citing launch schedule risks.`,
        action: `Instead of arguing abstract architecture, I scheduled a live synthetic load test demonstrating that our existing synchronous pipeline would breach P99 latency SLAs at 3x Black Friday volumes. I then outlined a 2-phase shadow deployment that mitigated all product rollback risks.`,
        result: `The executive sponsor approved the proposal unanimously, and our phased rollout sustained 4.2x load spikes with zero SLA breaches.`,
        metrics: {
          wpm: 139,
          score: 91,
          fillers: 1.1,
          starAccuracy: '97% STAR Delineated',
        },
      },
    },
    {
      id: 2,
      title: 'Turn 03 · Senior Tradeoff & Scale',
      stageName: 'Systems Tradeoffs & Scalability',
      question: `If you were tasked with rebuilding this entire stack from scratch to handle 10x current scale with half the latency budget, which foundational assumption would you reverse first, and what would be the failure mode?`,
      focusArea: 'Scale Economics, Failure Modes & Executive Judgement',
      simulatedAnswer: {
        opening: `To achieve a 10x scale multiplier under strict sub-50ms latency bounds, I would fundamentally transition from distributed ACID transactions to localized optimistic concurrency with asynchronous conflict-free data types.`,
        action: `I would enforce write-ahead localized logs and move our verification checkpoints to edge replicas, deliberately trading immediate global consistency for bounded eventual convergence within 200 milliseconds.`,
        result: `This architecture eliminates cross-region coordination latency entirely, reducing median response times from 180ms to 24ms while preserving strict partition tolerance.`,
        metrics: {
          wpm: 143,
          score: 96,
          fillers: 0.7,
          starAccuracy: '99% STAR Delineated',
        },
      },
    },
  ];

  const currentTurn = turns[currentTurnIndex];

  // Timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSimulation = () => {
    setIsRecording(true);
    setActiveStep('prompt');
    setCandidateResponseText(currentTurn.simulatedAnswer.opening);

    setTimeout(() => {
      setCandidateResponseText(
        `${currentTurn.simulatedAnswer.opening} ${currentTurn.simulatedAnswer.action}`
      );
    }, 1800);

    setTimeout(() => {
      setCandidateResponseText(
        `${currentTurn.simulatedAnswer.opening} ${currentTurn.simulatedAnswer.action} ${currentTurn.simulatedAnswer.result}`
      );
      setIsRecording(false);
      triggerEvaluation();
    }, 3800);
  };

  const triggerEvaluation = () => {
    setActiveStep('evaluating');
    setEvalProgress(15);
    const interval = setInterval(() => {
      setEvalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveStep('results');
          setCompletedTurns((prevDone) => ({
            ...prevDone,
            [currentTurnIndex]: true,
          }));
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  const resetCurrentTurn = () => {
    setIsRecording(false);
    setActiveStep('prompt');
    setCandidateResponseText('');
  };

  const handleSelectTurn = (index: number) => {
    setCurrentTurnIndex(index);
    setActiveStep(completedTurns[index] ? 'results' : 'prompt');
    setCandidateResponseText('');
    setIsRecording(false);
  };

  const handleNextTurn = () => {
    if (currentTurnIndex < turns.length - 1) {
      handleSelectTurn(currentTurnIndex + 1);
    }
  };

  // Calculate overall session completion percentage
  const completedCount = Object.keys(completedTurns).length;
  const overallProgressPercentage = Math.round(
    ((completedCount + (activeStep === 'evaluating' ? 0.5 : activeStep === 'results' ? 1 : 0.2)) /
      turns.length) *
      100
  );

  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background accents */}
      <div className="absolute inset-0 bg-mesh-light pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10 opacity-30"></div>

      {/* Top Banner / Role & JD Header */}
      <div className="glass-premium rounded-3xl border border-slate-200/90 p-6 sm:p-8 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-3 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hub Overview</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
              Interactive Practice Studio
            </h1>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 shadow-2xs">
              Role: {selectedRole.title}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Benchmarked against target environment:{' '}
            <strong className="text-slate-900">{selectedRole.companyContext}</strong>
          </p>
        </div>

        <button
          onClick={onOpenRoleModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50/80 border border-indigo-200/90 rounded-xl transition-all shadow-xs hover:border-indigo-300 cursor-pointer"
        >
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Switch Target Role or Edit JD</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* VISUAL SESSION PROGRESS TRACKER (NEW COMPONENT) */}
      {/* ============================================================ */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 mb-8 shadow-sm">
        {/* Top summary row: Turn count, Overall percentage, Timer, Readiness */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-display font-extrabold text-sm shadow-xs shrink-0">
              0{currentTurnIndex + 1}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                  Turn {currentTurnIndex + 1} of {turns.length}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-bold text-slate-950 font-display truncate">
                  {currentTurn.stageName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal truncate">
                Pillars: <strong className="text-slate-700">{currentTurn.focusArea}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono self-start sm:self-auto">
            {/* Session Timer */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs text-[11px] sm:text-xs">
              <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>
                Elapsed: <strong>{formatTime(elapsedSeconds)}</strong>
              </span>
            </div>

            {/* Overall Progress Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs font-bold text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>{Math.min(100, overallProgressPercentage)}% Complete</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(15, overallProgressPercentage))}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Stepper Navigation: 3 Interview Turns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {turns.map((turn, idx) => {
            const isCompleted = completedTurns[idx];
            const isActive = currentTurnIndex === idx;
            return (
              <motion.button
                key={turn.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectTurn(idx)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200/80 hover:bg-emerald-50'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : `0${idx + 1}`}
                  </span>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    {isCompleted ? (
                      <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        Score: {turn.simulatedAnswer.metrics.score}/100
                      </span>
                    ) : isActive ? (
                      <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 animate-pulse">
                        Active Turn
                      </span>
                    ) : (
                      <span className="text-slate-400">Upcoming</span>
                    )}
                  </span>
                </div>

                <div className="font-display text-xs font-bold text-slate-900 truncate">
                  {turn.stageName}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  Focus: {turn.focusArea}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Current Turn Micro-Pipeline Status Sub-Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-slate-500">
            <span className="text-slate-400 font-semibold uppercase text-[10px] w-full sm:w-auto">
              Active Turn Pipeline:
            </span>
            <span
              className={`flex items-center gap-1 ${
                activeStep === 'prompt' ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeStep === 'prompt' ? 'bg-indigo-600 animate-ping' : 'bg-slate-300'
                }`}
              ></span>
              <span>1. Prompt</span>
            </span>

            <span className="text-slate-300">→</span>

            <span
              className={`flex items-center gap-1 ${
                isRecording ? 'text-rose-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-300'
                }`}
              ></span>
              <span>2. 60Hz Audio</span>
            </span>

            <span className="text-slate-300">→</span>

            <span
              className={`flex items-center gap-1 ${
                activeStep === 'evaluating' ? 'text-violet-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeStep === 'evaluating' ? 'bg-violet-600 animate-ping' : 'bg-slate-300'
                }`}
              ></span>
              <span>3. Synthesis</span>
            </span>

            <span className="text-slate-300">→</span>

            <span
              className={`flex items-center gap-1 ${
                activeStep === 'results' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeStep === 'results' ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              ></span>
              <span>4. Scorecard</span>
            </span>
          </div>

          <span className="text-indigo-700 font-bold text-[10px] uppercase tracking-wider">
            Sub-200ms Latency SLA Verified
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Active Role & JD Context Drawer */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-premium rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Job Description Calibrator</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                100% Calibrated
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 mb-4">
              <div>
                <span className="text-slate-400 font-medium">Seniority Level: </span>
                <span className="font-bold text-slate-900">{selectedRole.level}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Functional Domain: </span>
                <span className="font-bold text-slate-900">{selectedRole.category}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] font-mono text-slate-700 max-h-48 overflow-y-auto leading-relaxed">
              {selectedRole.defaultJD}
            </div>

            {/* Rubrics active */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5">Evaluated Focus Pillars</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {selectedRole.evalCriteria.technicalPillars.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-800">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-premium rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Behavioral Criteria for this Role
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {selectedRole.evalCriteria.behavioralFocus}
            </p>
          </div>
        </div>

        {/* Right: Live Interview Simulation Cockpit */}
        <div className="lg:col-span-8 space-y-6">
          {/* Question Prompt Card */}
          <div className="glass-premium rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>Turn 0{currentTurnIndex + 1} Scenario Prompt</span>
              </div>
              <span className="text-xs text-slate-400 font-mono font-semibold">
                TURN {currentTurnIndex + 1} OF {turns.length}
              </span>
            </div>

            <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-950 leading-snug mb-5">
              "{currentTurn.question}"
            </h2>

            {/* Interactive Simulation Area */}
            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 min-h-[150px] flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono font-semibold flex items-center gap-2">
                    {isRecording ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                        <strong className="text-rose-700">LISTENING & INGESTING PROSODY (60Hz)</strong>
                      </>
                    ) : (
                      <span>Candidate Response Stream</span>
                    )}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">Audio/Vision/STAR Synced</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal italic">
                  {candidateResponseText ||
                    'Click "Simulate Live Candidate Audio" below to run the sub-200ms multimodal evaluation pipeline for this exact question.'}
                </p>
              </div>

              {isRecording && (
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 bg-indigo-500 rounded-full h-3 animate-pulse"></span>
                  <span className="w-1.5 bg-indigo-600 rounded-full h-6 animate-pulse"></span>
                  <span className="w-1.5 bg-violet-600 rounded-full h-8 animate-pulse"></span>
                  <span className="w-1.5 bg-indigo-500 rounded-full h-4 animate-pulse"></span>
                  <span className="w-1.5 bg-indigo-600 rounded-full h-7 animate-pulse"></span>
                  <span className="w-1.5 bg-violet-500 rounded-full h-5 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-indigo-700 ml-2 font-bold">
                    Acoustic Cadence Analysis Active...
                  </span>
                </div>
              )}
            </div>

            {/* Simulation controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 sm:gap-4">
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startSimulation}
                    className="shimmer-btn inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer min-h-[44px]"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0" />
                    <span>Simulate Candidate Audio</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsRecording(false);
                      triggerEvaluation();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all cursor-pointer min-h-[44px]"
                  >
                    <Square className="w-4 h-4 fill-white shrink-0" />
                    <span>Halt & Evaluate Now</span>
                  </motion.button>
                )}

                <button
                  onClick={resetCurrentTurn}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Reset Question</span>
                </button>
              </div>

              <span className="text-[11px] sm:text-xs text-slate-500 font-mono font-medium text-center sm:text-right">
                Latency: 148ms · Zero Biometric Storage
              </span>
            </div>
          </div>

          {/* Evaluation Results Card */}
          {activeStep === 'evaluating' && (
            <div className="glass-premium rounded-3xl border border-slate-200/90 p-8 text-center space-y-4 shadow-sm">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="font-display text-lg font-bold text-slate-950">
                Synthesizing Multimodal Signals
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Cross-referencing audio inflection, STAR structure & JD criteria...
              </p>
              <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
                  style={{ width: `${evalProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {activeStep === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-premium rounded-2xl sm:rounded-3xl border border-emerald-300/80 p-5 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-200 shadow-2xs shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-950">
                      Turn 0{currentTurnIndex + 1} Evaluation Dossier
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-mono">
                      Benchmarked against {selectedRole.title} ({selectedRole.level})
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right flex items-center sm:block gap-3">
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-indigo-700 font-mono">
                    {currentTurn.simulatedAnswer.metrics.score}
                    <span className="text-sm text-slate-400 font-normal">/100</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Top 6% Percentile
                  </span>
                </div>
              </div>

              {/* Breakdown Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                    Speaking Cadence
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-950 mt-1">
                    {currentTurn.simulatedAnswer.metrics.wpm} WPM
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-bold">
                    Ideal Range (130-150 WPM)
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                    Filler Word Ratio
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-950 mt-1">
                    {currentTurn.simulatedAnswer.metrics.fillers}%
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-bold">
                    Minimal Hesitation
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                    STAR Methodology
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-950 mt-1">
                    {currentTurn.simulatedAnswer.metrics.starAccuracy}
                  </div>
                  <div className="text-[10px] text-indigo-700 mt-0.5 font-bold">
                    Action-Oriented Verbs
                  </div>
                </div>
              </div>

              {/* Specific Feedback Box */}
              <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>AI Coaching Recommendations for this Turn</span>
                </div>
                <p className="leading-relaxed">
                  Strong ownership shown by stating actionable steps directly. For maximum senior-level differentiation, articulate trade-offs explicitly before diving into the chosen solution.
                </p>
              </div>

              {/* Action: Next Turn or Complete Session */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-mono">
                  {currentTurnIndex < turns.length - 1
                    ? `Next up: ${turns[currentTurnIndex + 1].stageName}`
                    : 'All 3 interview turns successfully calibrated!'}
                </span>

                {currentTurnIndex < turns.length - 1 ? (
                  <motion.button
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextTurn}
                    className="shimmer-btn px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Advance to Turn 0{currentTurnIndex + 2}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 shadow-2xs">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Session Certified Offer-Ready (94/100)</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
