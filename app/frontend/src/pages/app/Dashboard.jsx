import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, MessageSquare, Sparkles, TrendingUp, ArrowUpRight, Calendar, Users, Bell } from 'lucide-react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { CURRENT_USER, STARTUPS, INSIGHTS, MEETINGS, NOTIFICATIONS, CONVERSATIONS } from '../../mock/data';

export default function Dashboard() {
  const { role } = useOutletContext() || { role: 'Founder' };
  const myStartup = STARTUPS[0];
  const unread = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Hero header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>{role} Dashboard</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">
            Good evening, <span className="gradient-text italic">{CURRENT_USER.name.split(' ')[0]}.</span>
          </h1>
          <p className="text-zinc-400 mt-2">You have {unread} new signals and 2 upcoming meetings.</p>
        </div>
        <Link to="/app/ai" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-gradient text-black font-medium text-sm" data-testid="run-ai-btn">
          <Sparkles size={14} /> Run AI Validation
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Startup progress', value: '62%', sub: 'MVP stage' },
          { label: 'Insights this week', value: '18', sub: '+4 vs last week' },
          { label: 'Warm intros', value: '7', sub: '3 investors, 4 mentors' },
          { label: 'Team applicants', value: '24', sub: '5 new today' },
        ].map(k => (
          <GlassCard key={k.label} className="p-6">
            <div className="text-xs text-zinc-500 uppercase tracking-widest">{k.label}</div>
            <div className="font-display text-4xl font-medium tracking-tight mt-2">{k.value}</div>
            <div className="text-xs text-emerald-400 mt-2">{k.sub}</div>
          </GlassCard>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* My startup */}
        <GlassCard className="p-6 md:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Overline>My startup</Overline>
              <h3 className="font-display text-2xl font-medium mt-2">{myStartup.name}</h3>
              <p className="text-zinc-400 text-sm mt-1">{myStartup.tagline}</p>
            </div>
            <Link to={`/app/startups/${myStartup.id}`} className="text-xs text-emerald-400 flex items-center gap-1">Open <ArrowUpRight size={12} /></Link>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
              <span>Idea → Impact</span><span>{myStartup.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${myStartup.progress}%` }} transition={{ duration: 1 }} className="h-full bg-accent-gradient" />
            </div>
            <div className="mt-4 flex justify-between text-xs text-zinc-500">
              {['Idea', 'Validation', 'MVP', 'Launch', 'Growth', 'Funding'].map((s, i) => (
                <span key={s} className={i <= 2 ? 'text-emerald-400' : ''}>{s}</span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Meetings */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Overline>Upcoming</Overline>
            <Calendar size={14} className="text-zinc-500" />
          </div>
          <div className="space-y-4">
            {MEETINGS.slice(0, 3).map(m => (
              <div key={m.id} className="pb-4 border-b border-white/[0.05] last:border-0 last:pb-0">
                <div className="text-sm font-medium">{m.with}</div>
                <div className="text-xs text-zinc-500">{m.topic}</div>
                <div className="text-xs text-emerald-400 mt-1">{m.when}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Insights */}
        <GlassCard className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <Overline>Market Insights</Overline>
            <Link to="/app/insights" className="text-xs text-emerald-400 flex items-center gap-1">All insights <ArrowUpRight size={12} /></Link>
          </div>
          <div className="space-y-4">
            {INSIGHTS.slice(0, 3).map(i => (
              <div key={i.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{i.tag}</span>
                  <span className="text-xs text-zinc-500">• {i.time} ago</span>
                </div>
                <div className="text-sm font-medium mb-1">{i.title}</div>
                <div className="text-xs text-zinc-500">{i.reason}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent activity */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Overline>Activity</Overline>
            <Bell size={14} className="text-zinc-500" />
          </div>
          <div className="space-y-3">
            {NOTIFICATIONS.slice(0, 4).map(n => (
              <div key={n.id} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${n.unread ? 'bg-emerald-500' : 'bg-white/20'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-zinc-300">{n.text}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{n.time} ago</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
