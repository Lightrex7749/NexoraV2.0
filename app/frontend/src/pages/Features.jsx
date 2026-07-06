import React from 'react';
import { SectionLabel, GlassCard, MagneticButton, Overline } from '../components/ui/primitives';
import { Sparkles, Users, TrendingUp, Briefcase, Award, Building2, MessageSquare, ShieldCheck } from 'lucide-react';

const F = [
  { icon: Sparkles, title: 'AI Idea Validation', body: 'Structured score, SWOT, competitor map, and prescriptive next steps in seconds.' },
  { icon: Sparkles, title: 'Business Plan AI', body: 'Investor-grade plans with version history and PDF export.' },
  { icon: Sparkles, title: 'Roadmap Planner', body: 'Milestone-based timelines that adapt as your stage changes.' },
  { icon: Users, title: 'Team Builder', body: 'AI-matched co-founders and hires. Skill vectors, not job boards.' },
  { icon: Award, title: 'Mentor Studio', body: 'Verified mentors, guided sessions, and shared notes with your team.' },
  { icon: Building2, title: 'Investor Desk', body: 'Warm intros, verified profiles, and a real pipeline — not a CRM.' },
  { icon: TrendingUp, title: 'Insights Feed', body: 'Personalized market signal, calibrated to your stage & industry.' },
  { icon: MessageSquare, title: 'Realtime Chat', body: 'Founder ↔ mentor ↔ investor ↔ team, with read receipts.' },
  { icon: ShieldCheck, title: 'Admin & Governance', body: 'Approvals, moderation, audit logs — production-grade.' },
];

export default function Features() {
  return (
    <div className="pt-40 pb-32 px-6" data-testid="features-page">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="00" title="Features" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-16">
          Everything you need. <br /><span className="gradient-text italic">Nothing you don't.</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-4">
          {F.map((f) => (
            <GlassCard key={f.title} className="p-8">
              <div className="w-10 h-10 rounded-lg glass !bg-white/[0.03] flex items-center justify-center mb-6">
                <f.icon size={18} className="text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight mb-3">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.body}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-24 text-center">
          <MagneticButton href="/app/dashboard" data-testid="features-cta">Explore the full app →</MagneticButton>
        </div>
      </div>
    </div>
  );
}
