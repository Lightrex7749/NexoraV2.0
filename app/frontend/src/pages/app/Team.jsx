import React from 'react';
import { MapPin, Users } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { JOBS } from '../../mock/data';

export default function Team() {
  return (
    <div className="space-y-6" data-testid="team-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Team Builder</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Find your <span className="gradient-text italic">co-conspirators.</span></h1>
        </div>
        <MagneticButton data-testid="post-job-btn">Post a role</MagneticButton>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {JOBS.map(j => (
          <GlassCard key={j.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-emerald-500 mb-1">{j.startup}</div>
                <div className="font-display text-xl font-medium tracking-tight">{j.title}</div>
              </div>
              <div className="text-xs text-zinc-500 text-right">{j.applicants} applicants</div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {j.skills.map(s => <span key={s} className="px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] text-zinc-300 uppercase tracking-widest">{s}</span>)}
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
              <span className="flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
              <span>Equity: {j.equity}</span>
            </div>
            <MagneticButton className="!px-4 !py-2 text-xs w-full">Apply →</MagneticButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
