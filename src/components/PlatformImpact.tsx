import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, Clock, Users, Award, ShieldCheck, Sparkles, ArrowUpRight, Info } from 'lucide-react';

// Domain Comparison Data: Baseline vs PrepMind AI Trained
const DOMAIN_COMPARISON_DATA = [
  { domain: 'Distributed SWE', baseline: 41, prepMind: 86, gain: '+45%' },
  { domain: 'AI / ML Platforms', baseline: 38, prepMind: 84, gain: '+46%' },
  { domain: 'Product Management', baseline: 44, prepMind: 88, gain: '+44%' },
  { domain: 'Quant & Finance', baseline: 36, prepMind: 82, gain: '+46%' },
  { domain: 'Strategy Consulting', baseline: 42, prepMind: 89, gain: '+47%' },
];

// Session-by-Session Growth Trajectory
const PROGRESSION_TRAJECTORY_DATA = [
  { session: 'Baseline Mock', score: 54, pacing: 112, starAccuracy: 58 },
  { session: 'Session 1', score: 67, pacing: 124, starAccuracy: 71 },
  { session: 'Session 2', score: 78, pacing: 132, starAccuracy: 82 },
  { session: 'Session 3', score: 86, pacing: 138, starAccuracy: 89 },
  { session: 'Session 4 (Ready)', score: 93, pacing: 142, starAccuracy: 96 },
];

// Time to Offer Velocity (Days)
const VELOCITY_DATA = [
  { cohort: 'Engineering Eng', traditionalDays: 48, prepMindDays: 16 },
  { cohort: 'Product Tracks', traditionalDays: 52, prepMindDays: 19 },
  { cohort: 'Business & MBA', traditionalDays: 45, prepMindDays: 15 },
  { cohort: 'FinTech Quant', traditionalDays: 56, prepMindDays: 18 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg text-xs font-sans">
        <div className="font-bold text-slate-900 pb-1 mb-1.5 border-b border-slate-100 font-display">
          {label}
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              ></span>
              <span>{entry.name}:</span>
            </span>
            <span className="font-mono font-bold text-slate-900">
              {entry.value}
              {entry.unit || (entry.name.includes('Rate') || entry.name.includes('Score') || entry.name.includes('Accuracy') ? '%' : ' days')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  subtext: string;
  explanation: string;
  valueColor?: string;
  subtextColor?: string;
}

const MetricCardWithTooltip: React.FC<MetricCardProps> = ({
  title,
  icon,
  value,
  subtext,
  explanation,
  valueColor = 'text-slate-950',
  subtextColor = 'text-emerald-700',
}) => {
  return (
    <div className="group relative p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 transition-all hover:border-indigo-300 hover:bg-white hover:shadow-sm">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase font-bold">
        <span className="flex items-center gap-1 border-b border-dotted border-slate-400 group-hover:border-indigo-600 group-hover:text-indigo-900 transition-colors cursor-help">
          <span>{title}</span>
          <Info className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
        </span>
        <div className="p-1 rounded-md bg-white border border-slate-200/80 shadow-2xs group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className={`font-display text-2xl sm:text-3xl font-extrabold mt-1.5 ${valueColor}`}>
        {value}
      </div>
      <div className={`text-[10px] font-mono mt-0.5 font-bold ${subtextColor}`}>
        {subtext}
      </div>

      {/* Interactive Tooltip on Hover */}
      <div className="pointer-events-none absolute bottom-full left-0 right-0 sm:right-auto sm:w-64 mb-2 p-3 bg-slate-950/95 backdrop-blur-md rounded-xl text-white text-[11px] font-sans leading-relaxed shadow-xl border border-slate-800 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
        <div className="font-display font-bold text-xs text-white mb-1 flex items-center justify-between">
          <span>{title} Telemetry</span>
          <span className="text-[10px] font-mono text-indigo-400 font-semibold">PREPMIND AI</span>
        </div>
        <p className="text-slate-300">{explanation}</p>
        <div className="absolute top-full left-6 -mt-1 border-4 border-transparent border-t-slate-950/95"></div>
      </div>
    </div>
  );
};

export const PlatformImpact: React.FC = () => {
  const [activeMetricTab, setActiveMetricTab] = useState<'conversion' | 'progression' | 'velocity'>('conversion');

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Platform Impact Telemetry
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              120,000+ Calibrated Runs
            </span>
          </div>
          <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950">
            Measurable Candidate & Cohort Velocity
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Real performance shifts tracked across candidates, campus career departments, and enterprise hiring pipelines. Hover terms or icons for methodology details.
          </p>
        </div>

        {/* Metric Selector Tabs with Tooltips */}
        <div className="flex flex-wrap sm:inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto shadow-2xs gap-1 max-w-full">
          <div className="group relative">
            <button
              onClick={() => setActiveMetricTab('conversion')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                activeMetricTab === 'conversion'
                  ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Offer Conversion Rate
            </button>
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center font-normal">
              Onsite offer rate comparison by functional engineering & business tracks.
            </div>
          </div>

          <div className="group relative">
            <button
              onClick={() => setActiveMetricTab('progression')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                activeMetricTab === 'progression'
                  ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Score Progression Curve
            </button>
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center font-normal">
              Candidate growth curve across successive 4-phase mock attempts.
            </div>
          </div>

          <div className="group relative">
            <button
              onClick={() => setActiveMetricTab('velocity')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                activeMetricTab === 'velocity'
                  ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Time-to-Offer Days
            </button>
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center font-normal">
              Calendar days elapsed from first application to formal offer acceptance.
            </div>
          </div>
        </div>
      </div>

      {/* Main Impact Metrics Cockpit */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm">
        {/* KPI Strip with Interactive Hover Tooltips */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-6 mb-6 border-b border-slate-100">
          <MetricCardWithTooltip
            title="Offer Rate"
            icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
            value="86.2%"
            subtext="+43.6% vs 42.6% Industry Bar"
            explanation="Percentage of candidates who pass all onsite interview loops and receive formal job offers after 4 PrepMind simulation sessions, compared to the 42.6% global baseline."
            valueColor="text-slate-950"
            subtextColor="text-emerald-700"
          />

          <MetricCardWithTooltip
            title="Time-to-Offer"
            icon={<Clock className="w-3.5 h-3.5 text-indigo-600" />}
            value="16.4 Days"
            subtext="3.1x Faster Placement Speed"
            explanation="Total calendar days elapsed from initial application to final signed contract. Accelerated by eliminating uncalibrated resume screening loops and candidate rejection churn."
            valueColor="text-indigo-700"
            subtextColor="text-indigo-700"
          />

          <MetricCardWithTooltip
            title="Recruiter Hours"
            icon={<Users className="w-3.5 h-3.5 text-violet-600" />}
            value="-68%"
            subtext="Screening Fatigue Eliminated"
            explanation="Reduction in engineering and recruiting team hours spent conducting redundant 30-minute first-round phone screens, replaced with verified 3-minute executive highlight dossiers."
            valueColor="text-violet-700"
            subtextColor="text-violet-700"
          />

          <MetricCardWithTooltip
            title="STAR Coherence"
            icon={<Award className="w-3.5 h-3.5 text-emerald-600" />}
            value="96.4%"
            subtext="Action & Result Delineated"
            explanation="Algorithmic validation score measuring how cleanly candidates articulate Situation, Task, Action, and Result without passive team-speak ('we did') vs individual ownership ('I designed')."
            valueColor="text-slate-950"
            subtextColor="text-emerald-700"
          />
        </div>

        {/* Dynamic Chart Display based on Tab */}
        <div className="h-72 w-full pt-2">
          {activeMetricTab === 'conversion' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DOMAIN_COMPARISON_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="domain"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Bar
                  name="Industry Baseline"
                  dataKey="baseline"
                  fill="#cbd5e1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  name="PrepMind Prepared"
                  dataKey="prepMind"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeMetricTab === 'progression' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={PROGRESSION_TRAJECTORY_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="starColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="session"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  domain={[40, 100]}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Area
                  type="monotone"
                  name="Employability Index"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreColor)"
                />
                <Area
                  type="monotone"
                  name="STAR Structuring Accuracy"
                  dataKey="starAccuracy"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#starColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeMetricTab === 'velocity' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={VELOCITY_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="cohort"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  domain={[0, 60]}
                  unit="d"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Bar
                  name="Traditional Career Prep (Days)"
                  dataKey="traditionalDays"
                  fill="#e2e8f0"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={38}
                />
                <Bar
                  name="PrepMind AI Platform (Days)"
                  dataKey="prepMindDays"
                  fill="#059669"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bottom Insight Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Benchmarked against verified post-grad outcomes (N=12,400+)</span>
          </span>
          <span className="text-indigo-700 font-bold flex items-center gap-1">
            <span>Live Calibrated Baseline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
};
