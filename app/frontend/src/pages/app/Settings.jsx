import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';

export default function Settings() {
  return (
    <div className="space-y-6" data-testid="settings-page">
      <div>
        <Overline>Settings</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Preferences.</h1>
      </div>

      <GlassCard className="p-8">
        <div className="space-y-6">
          {[
            { label: 'Email notifications', desc: 'Weekly digest of insights and pipeline changes.', on: true },
            { label: 'Mentor messages', desc: 'Real-time push for new mentor conversations.', on: true },
            { label: 'Investor requests', desc: 'Notify me when an investor requests a meeting.', on: true },
            { label: 'Community mentions', desc: 'Alert me when someone @mentions me.', on: false },
            { label: 'Weekly insight digest', desc: 'A Sunday summary of the market signals that matter.', on: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between pb-6 border-b border-white/[0.05] last:border-0 last:pb-0">
              <div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-zinc-500 mt-1">{s.desc}</div>
              </div>
              <div className={`w-11 h-6 rounded-full p-1 transition-colors ${s.on ? 'bg-accent-gradient' : 'bg-white/[0.08]'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${s.on ? 'translate-x-5' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
