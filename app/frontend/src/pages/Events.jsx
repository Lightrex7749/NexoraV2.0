import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { SectionLabel, GlassCard } from '../components/ui/primitives';
import { EVENTS } from '../mock/data';

export default function Events() {
  return (
    <div className="pt-40 pb-32 px-6" data-testid="events-page">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="00" title="Events" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-16">
          Where founders <span className="gradient-text italic">meet.</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {EVENTS.map(e => (
            <GlassCard key={e.id} className="p-8">
              <div className="flex items-center gap-3 text-xs text-emerald-500 uppercase tracking-widest mb-4">
                <Calendar size={12} /> {e.date} • {e.type}
              </div>
              <h3 className="font-display text-2xl font-medium tracking-tight mb-2">{e.title}</h3>
              <p className="text-zinc-400 text-sm mb-6">Hosted by {e.hosts}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-500"><Users size={14} /> {e.attending} attending</div>
                <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">RSVP →</button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
