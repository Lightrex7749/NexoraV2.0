import React from 'react';
import { MapPin } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { CURRENT_USER } from '../../mock/data';

export default function Profile() {
  return (
    <div className="space-y-6" data-testid="profile-page">
      <div className="flex items-start gap-6">
        <img src={CURRENT_USER.avatar} className="w-24 h-24 rounded-2xl object-cover" alt={CURRENT_USER.name} />
        <div className="flex-1">
          <Overline>{CURRENT_USER.role}</Overline>
          <h1 className="font-display text-4xl font-medium tracking-tight mt-2">{CURRENT_USER.name}</h1>
          <p className="text-zinc-400 mt-1">{CURRENT_USER.headline}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><MapPin size={12} /> {CURRENT_USER.location}</span>
            <span>•</span>
            <span>{CURRENT_USER.industry}</span>
          </div>
        </div>
        <MagneticButton variant="ghost" className="!px-4 !py-2 text-sm">Edit profile</MagneticButton>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-6"><Overline>Skills</Overline><div className="mt-3 flex flex-wrap gap-2">{CURRENT_USER.skills.map(s => <span key={s} className="px-3 py-1 text-xs rounded-full bg-white/[0.04]">{s}</span>)}</div></GlassCard>
        <GlassCard className="p-6"><Overline>Roles</Overline><div className="mt-3 flex flex-wrap gap-2">{CURRENT_USER.roles.map(r => <span key={r} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">{r}</span>)}</div></GlassCard>
        <GlassCard className="p-6"><Overline>Connections</Overline><div className="font-display text-4xl mt-2">142</div><div className="text-xs text-zinc-500 mt-1">12 mentors • 8 investors</div></GlassCard>
      </div>
    </div>
  );
}
