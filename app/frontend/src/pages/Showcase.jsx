import React from 'react';
import { SectionLabel, GlassCard } from '../components/ui/primitives';
import { STARTUPS } from '../mock/data';

export default function Showcase() {
  return (
    <div className="pt-40 pb-32 px-6" data-testid="showcase-page">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="00" title="Showcase" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-16">
          Startups building <span className="gradient-text italic">inside Nexora.</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STARTUPS.map(s => (
            <GlassCard key={s.id} className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center font-display text-xl font-semibold text-black">{s.logo}</div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500">{s.stage}</span>
              </div>
              <h3 className="font-display text-2xl font-medium tracking-tight mb-2">{s.name}</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{s.tagline}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{s.industry}</span>
                <span>{s.owner}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
