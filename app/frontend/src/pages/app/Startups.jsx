import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { STARTUPS } from '../../mock/data';

export default function Startups() {
  const [filter, setFilter] = useState('All');
  const stages = ['All', 'Idea', 'Validation', 'MVP', 'Launch', 'Growth', 'Funding'];
  const filtered = filter === 'All' ? STARTUPS : STARTUPS.filter(s => s.stage === filter);

  return (
    <div className="space-y-6" data-testid="startups-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Startups</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your ideas <span className="gradient-text italic">in motion.</span></h1>
        </div>
        <MagneticButton data-testid="new-startup-btn"><Plus size={16} /> New startup</MagneticButton>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-zinc-500" />
        {stages.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${filter === s ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}
            data-testid={`filter-${s.toLowerCase()}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <Link key={s.id} to={`/app/startups/${s.id}`} data-testid={`startup-card-${s.id}`}>
            <GlassCard className="p-6 h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center font-display text-xl font-semibold text-black">{s.logo}</div>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${s.status === 'APPROVED' ? 'text-emerald-500' : 'text-amber-500'}`}>{s.status}</span>
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight mb-2">{s.name}</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{s.tagline}</p>
              <div className="mt-6 mb-2 flex items-center justify-between text-xs text-zinc-500">
                <span>{s.stage}</span><span>{s.progress}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full bg-accent-gradient" style={{ width: `${s.progress}%` }} />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
