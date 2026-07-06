import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { STARTUPS, PEOPLE } from '../../mock/data';

export default function AdminConsole() {
  const pending = STARTUPS.filter(s => s.status === 'PENDING');
  return (
    <div className="space-y-6" data-testid="admin-console">
      <div>
        <Overline>Admin Console</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Platform <span className="gradient-text italic">governance.</span></h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Total users', '4,218'],
          ['Active startups', '1,204'],
          ['Pending approvals', pending.length],
          ['Weekly signups', '312'],
        ].map(([l, v]) => (
          <GlassCard key={l} className="p-6">
            <div className="text-xs text-zinc-500 uppercase tracking-widest">{l}</div>
            <div className="font-display text-4xl font-medium mt-2">{v}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <Overline>Pending startups</Overline>
        <div className="mt-4 space-y-3">
          {pending.map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center font-display text-sm font-semibold text-black">{s.logo}</div>
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-zinc-500">{s.industry} • {s.owner}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">Approve</button>
                <button className="px-3 py-1.5 text-xs rounded-full bg-white/[0.03] text-zinc-400 hover:text-white transition-colors">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <Overline>Recent users</Overline>
        <div className="mt-4 divide-y divide-white/[0.05]">
          {PEOPLE.map(p => (
            <div key={p.id} className="flex items-center gap-4 py-3">
              <img src={p.avatar} className="w-10 h-10 rounded-full object-cover" alt={p.name} />
              <div className="flex-1">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-zinc-500">{p.role} • {p.industry}</div>
              </div>
              <div className="text-xs text-emerald-500">{p.verified ? 'Verified' : 'Unverified'}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
