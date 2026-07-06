import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { STARTUPS, MEETINGS } from '../../mock/data';

export default function MentorStudio() {
  return (
    <div className="space-y-6" data-testid="mentor-studio">
      <div>
        <Overline>Mentor Studio</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your <span className="gradient-text italic">assigned</span> startups.</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {STARTUPS.slice(0, 4).map(s => (
          <GlassCard key={s.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center font-display font-semibold text-black">{s.logo}</div>
                <div>
                  <div className="font-display text-lg font-medium">{s.name}</div>
                  <div className="text-xs text-zinc-500">{s.industry} • {s.stage}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Active</span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">{s.tagline}</p>
            <div className="flex gap-3 text-xs text-zinc-500">
              <span>3 notes</span><span>•</span><span>Last session: 3 days ago</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <Overline>Upcoming sessions</Overline>
        <div className="mt-4 space-y-3">
          {MEETINGS.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
              <div>
                <div className="text-sm font-medium">{m.with} — {m.topic}</div>
                <div className="text-xs text-emerald-400">{m.when}</div>
              </div>
              <button className="text-xs text-zinc-400 hover:text-white">Open notes →</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
