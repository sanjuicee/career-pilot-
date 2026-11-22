import React, { useState } from 'react';
import { useCareerPilot } from '../../context/CareerPilotContext';
import { SEED_CAREERS } from '../../data/seedCareers';
import { TechCard } from '../common/TechCard';
import { CompassRose } from '../common/BespokeIcons';
import {
  CheckSquare,
  Square,
  Printer,
} from 'lucide-react';
import { clsx } from 'clsx';

interface ActionItemState {
  id: string;
  title: string;
  timeframe: 'Next 7 Days' | 'Next 30 Days' | 'Quarter 1';
  category: 'Skill Acquisition' | 'Portfolio Project' | 'Industry Research';
  hours: number;
  completed: boolean;
}

export const RoadmapView: React.FC = () => {
  const { activePathwayCareerId } = useCareerPilot();

  const targetCareer =
    SEED_CAREERS.find((c) => c.id === activePathwayCareerId) || SEED_CAREERS[0];

  const [actions, setActions] = useState<ActionItemState[]>([
    {
      id: 'act-01',
      title: 'Audit systems architecture fundamentals: Read Raft consensus specification & paper.',
      timeframe: 'Next 7 Days',
      category: 'Skill Acquisition',
      hours: 6,
      completed: true,
    },
    {
      id: 'act-02',
      title: 'Initialize GitHub repository for distributed key-value store prototype in Rust / Go.',
      timeframe: 'Next 7 Days',
      category: 'Portfolio Project',
      hours: 4,
      completed: false,
    },
    {
      id: 'act-03',
      title: 'Inspect 3 open-source production post-mortems from Cloudflare, AWS, or Discord.',
      timeframe: 'Next 7 Days',
      category: 'Industry Research',
      hours: 3,
      completed: false,
    },
    {
      id: 'act-04',
      title: 'Implement RPC protocol buffers and heartbeat mechanism for cluster leader election.',
      timeframe: 'Next 30 Days',
      category: 'Portfolio Project',
      hours: 15,
      completed: false,
    },
    {
      id: 'act-05',
      title: 'Deploy eBPF kernel tracing scripts on local Linux VM to measure context-switch overhead.',
      timeframe: 'Next 30 Days',
      category: 'Skill Acquisition',
      hours: 10,
      completed: false,
    },
  ]);

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = actions.filter((a) => a.completed).length;
  const progressPercent = Math.round((completedCount / actions.length) * 100);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Roadmap Context */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#00F0B4] tracking-wider uppercase font-medium">
              <CompassRose size={16} color="#00F0B4" />
              <span>Career Roadmap</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Action Plan: {targetCareer.title}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-1.5 leading-relaxed font-sans">
              Concrete weekly milestones, portfolio projects, and skill acquisition targets toward your chosen direction.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 border border-white/20 bg-white/[0.02] text-xs font-mono text-slate-200 hover:bg-white/[0.05] hover:border-[#00F0B4] transition-all flex items-center gap-1.5 rounded btn-tactile"
            >
              <Printer className="w-3.5 h-3.5 text-[#00F0B4]" />
              <span>Print Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#0E1217] border border-white/10 font-mono text-xs">
          <div className="text-[10px] text-slate-500 uppercase">ACTION VELOCITY</div>
          <div className="text-[#00F0B4] text-xl font-bold mt-1">
            {completedCount} of {actions.length} Completed
          </div>
          <div className="w-full h-1.5 bg-white/10 mt-2">
            <div
              className="h-full bg-[#00F0B4] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-[#0E1217] border border-white/10 font-mono text-xs">
          <div className="text-[10px] text-slate-500 uppercase">TARGET TIME COMMITMENT</div>
          <div className="text-slate-200 text-xl font-bold mt-1">10 – 12 Hours / Week</div>
          <div className="text-[10px] text-slate-400 mt-1">Sustainable non-burnout cadence</div>
        </div>

        <div className="p-4 bg-[#0E1217] border border-white/10 font-mono text-xs">
          <div className="text-[10px] text-slate-500 uppercase">NEXT MILESTONE CHECKPOINT</div>
          <div className="text-amber-400 text-xl font-bold mt-1">Day 14 Review</div>
          <div className="text-[10px] text-slate-400 mt-1">Proof repository verification</div>
        </div>
      </div>

      {/* Split: Immediate Checklist (7 cols) + Skills Delta Gap (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Action Items */}
        <div className="lg:col-span-7 space-y-4">
          <TechCard
            tag="SPRINT-01"
            title="IMMEDIATE ACTION PLAN (NEXT 7 TO 30 DAYS)"
            glow={true}
          >
            <div className="space-y-3 font-mono text-xs">
              {actions.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleAction(act.id)}
                  className={clsx(
                    'p-3.5 border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none',
                    act.completed
                      ? 'border-[#00F0B4]/40 bg-[#00F0B4]/5 text-slate-400'
                      : 'border-white/10 bg-[#0E1217]/60 hover:border-white/30 text-slate-200'
                  )}
                >
                  <button
                    className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-[#00F0B4] transition-colors"
                    aria-label={act.completed ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {act.completed ? (
                      <CheckSquare className="w-4 h-4 text-[#00F0B4]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div
                      className={clsx(
                        'font-sans text-xs sm:text-sm font-medium leading-snug',
                        act.completed && 'line-through text-slate-500'
                      )}
                    >
                      {act.title}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="text-[#00F0B4] uppercase">{act.timeframe}</span>
                      <span>·</span>
                      <span>{act.category}</span>
                      <span>·</span>
                      <span>~{act.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TechCard>
        </div>

        {/* Right Column: Skills Gap Delta */}
        <div className="lg:col-span-5 space-y-6">
          <TechCard tag="DELTA-ANALYSIS" title="SKILLS GAP ARCHITECTURE">
            <div className="space-y-4 font-mono text-xs">
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Based on your current baseline, the system has prioritized high-leverage competencies required for {targetCareer.title}:
              </p>

              <div className="space-y-2">
                {targetCareer.requiredSkills.map((sk) => (
                  <div
                    key={sk.skillId}
                    className="p-3 bg-white/[0.02] border border-white/10 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="text-slate-200 font-semibold">{sk.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase">
                        Category: {sk.category} · Priority: {sk.importance}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider border border-[#00F0B4]/40 bg-[#00F0B4]/10 text-[#00F0B4]">
                      TARGET
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-white/[0.01] border border-dashed border-white/20 text-[11px] text-slate-400 space-y-1">
                <span className="text-[#00F0B4] font-semibold block uppercase text-[10px]">
                  ARCHITECT'S NOTE
                </span>
                <p>
                  Avoid tutorial lock. Focus on deploying functioning, publicly benchmarked repositories that prove you can handle edge cases and real production load.
                </p>
              </div>
            </div>
          </TechCard>
        </div>
      </div>
    </div>
  );
};
