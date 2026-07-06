import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { STARTUPS } from '../../mock/data';

const STAGES = ['Watching', 'Interested', 'Meeting', 'Invested'];

export default function InvestorDesk() {
  const byStage = {
    Watching: STARTUPS.slice(0, 3),
    Interested: STARTUPS.slice(3, 5),
    Meeting: [STARTUPS[5]],
    Invested: [],
  };

  return (
    <div className="space-y-6" data-testid="investor-desk">
      <div>
        <Overline>Investor Desk</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your <span className="gradient-text italic">pipeline.</span></h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {STAGES.map(stage => (
          <div key={stage}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-500">{stage}</div>
              <span className="text-xs text-zinc-500">{byStage[stage].length}</span>
            </div>
            <div className="space-y-3">
              {byStage[stage].map(s => (
                <GlassCard key={s.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center font-display text-sm font-semibold text-black">{s.logo}</div>
                    <div>
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-[10px] text-zinc-500">{s.industry}</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2">{s.tagline}</p>
                </GlassCard>
              ))}
              {byStage[stage].length === 0 && (
                <div className="p-6 rounded-xl border border-dashed border-white/[0.08] text-xs text-zinc-600 text-center">Nothing yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
