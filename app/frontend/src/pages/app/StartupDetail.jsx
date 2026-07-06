import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Users, Sparkles } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { STARTUPS, BUSINESS_PLAN_SECTIONS, ROADMAP } from '../../mock/data';

export default function StartupDetail() {
  const { id } = useParams();
  const s = STARTUPS.find(x => x.id === id) || STARTUPS[0];

  return (
    <div className="space-y-8" data-testid="startup-detail">
      <Link to="/app/startups" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft size={14} /> All startups</Link>

      <div className="flex items-start justify-between flex-wrap gap-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center font-display text-3xl font-semibold text-black">{s.logo}</div>
          <div>
            <Overline>{s.industry} • {s.stage}</Overline>
            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">{s.name}</h1>
            <p className="text-zinc-400 mt-2 max-w-xl">{s.tagline}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MagneticButton variant="ghost" data-testid="edit-startup"><FileText size={14} /> Edit</MagneticButton>
          <MagneticButton data-testid="run-ai-startup"><Sparkles size={14} /> Run AI</MagneticButton>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-6"><Overline>Stage</Overline><div className="font-display text-3xl mt-2">{s.stage}</div><div className="text-xs text-zinc-500 mt-1">Nexora incubation pipeline</div></GlassCard>
        <GlassCard className="p-6"><Overline>Progress</Overline><div className="font-display text-3xl mt-2">{s.progress}%</div><div className="h-1 rounded-full bg-white/[0.05] mt-3"><div className="h-full bg-accent-gradient rounded-full" style={{ width: `${s.progress}%` }} /></div></GlassCard>
        <GlassCard className="p-6"><Overline>Team</Overline><div className="font-display text-3xl mt-2">6</div><div className="text-xs text-zinc-500 mt-1">3 co-founders, 3 hires</div></GlassCard>
      </div>

      <GlassCard className="p-8">
        <Overline>Business Plan</Overline>
        <h2 className="font-display text-3xl font-medium tracking-tight mt-2 mb-8">The full plan.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BUSINESS_PLAN_SECTIONS.map(sec => (
            <div key={sec.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-sm font-bold text-emerald-400 mb-2">{sec.title}</div>
              <p className="text-sm text-zinc-400 leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <Overline>Roadmap</Overline>
        <h2 className="font-display text-3xl font-medium tracking-tight mt-2 mb-8">Milestones.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP.map(r => (
            <div key={r.quarter} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">{r.quarter}</div>
              <div className="text-sm font-medium mb-3">{r.title}</div>
              <ul className="space-y-2">
                {r.milestones.map(m => <li key={m} className="text-xs text-zinc-400 flex items-start gap-2"><span className="text-emerald-500 mt-0.5">◆</span>{m}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
