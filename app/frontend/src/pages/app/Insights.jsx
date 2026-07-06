import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { INSIGHTS } from '../../mock/data';

export default function Insights() {
  return (
    <div className="space-y-6" data-testid="insights-page">
      <div>
        <Overline>Market Insights</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Signal, <span className="gradient-text italic">not noise.</span></h1>
        <p className="text-zinc-400 mt-2 max-w-xl">Personalized for your industry, stage, and interests. Every card explains why you're seeing it.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {INSIGHTS.map(i => (
          <GlassCard key={i.id} className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{i.tag}</span>
              <span className="text-xs text-zinc-500">• {i.time} ago</span>
            </div>
            <h3 className="font-display text-xl font-medium tracking-tight mb-3">{i.title}</h3>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs text-zinc-300 leading-relaxed">
              <span className="text-emerald-400 font-medium">Why this: </span>{i.reason}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
