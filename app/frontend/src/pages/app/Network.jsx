import React, { useState } from 'react';
import { Search, ShieldCheck, MapPin } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { PEOPLE } from '../../mock/data';

export default function Network() {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const roles = ['All', 'Founder', 'Mentor', 'Investor', 'Team Member'];
  const filtered = PEOPLE.filter(p =>
    (role === 'All' || p.role === role) &&
    (q === '' || p.name.toLowerCase().includes(q.toLowerCase()) || p.industry.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6" data-testid="network-page">
      <div>
        <Overline>Network</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">The <span className="gradient-text italic">right</span> people.</h1>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, industry…" className="w-full glass !rounded-full py-3 pl-10 pr-4 text-sm placeholder:text-zinc-500 focus:outline-none" data-testid="network-search" />
        </div>
        <div className="flex items-center gap-2">
          {roles.map(r => (
            <button key={r} onClick={() => setRole(r)} className={`px-3 py-1.5 text-xs rounded-full ${role === r ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <GlassCard key={p.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="font-display text-lg font-medium">{p.name}</div>
                  {p.verified && <ShieldCheck size={12} className="text-emerald-500" />}
                </div>
                <div className="text-xs text-zinc-500">{p.role} • {p.firm}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4"><MapPin size={12} /> {p.location} • {p.industry}</div>
            <div className="flex gap-2">
              <MagneticButton variant="ghost" className="!px-4 !py-2 text-xs flex-1">Connect</MagneticButton>
              <MagneticButton className="!px-4 !py-2 text-xs flex-1">Message</MagneticButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
