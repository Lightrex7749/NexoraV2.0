import React from 'react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { NOTIFICATIONS } from '../../mock/data';

export default function Notifications() {
  return (
    <div className="space-y-6" data-testid="notifications-page">
      <div>
        <Overline>Notifications</Overline>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your <span className="gradient-text italic">signals.</span></h1>
      </div>
      <GlassCard className="p-2">
        <div className="divide-y divide-white/[0.05]">
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className={`p-5 flex items-start gap-4 ${n.unread ? 'bg-emerald-500/[0.03]' : ''}`}>
              <div className={`w-2 h-2 rounded-full mt-2 ${n.unread ? 'bg-emerald-500' : 'bg-white/20'}`} />
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{n.text}</div>
                <div className="text-xs text-zinc-500 mt-1">{n.time} ago • {n.type}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
