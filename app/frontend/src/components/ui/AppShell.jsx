import React, { useState } from 'react';
import { NavLink, Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Rocket, Users, MessageSquare, Sparkles, TrendingUp, Briefcase,
  UserCircle, Bell, Search, Settings, Compass, Building2, Award, ShieldCheck, ChevronDown
} from 'lucide-react';
import { CURRENT_USER, NOTIFICATIONS } from '../../mock/data';

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/startups', label: 'Startups', icon: Rocket },
  { to: '/app/network', label: 'Network', icon: Users },
  { to: '/app/community', label: 'Community', icon: MessageSquare },
  { to: '/app/chat', label: 'Chat', icon: MessageSquare },
  { to: '/app/team', label: 'Team Builder', icon: Briefcase },
  { to: '/app/insights', label: 'Market Insights', icon: TrendingUp },
  { to: '/app/ai', label: 'AI Suite', icon: Sparkles },
];

const ROLE_NAV = {
  Founder: [],
  Mentor: [{ to: '/app/mentor', label: 'Mentor Studio', icon: Award }],
  Investor: [{ to: '/app/investor', label: 'Investor Desk', icon: Building2 }],
  Admin: [{ to: '/app/admin', label: 'Admin Console', icon: ShieldCheck }],
};

const ROLES = ['Founder', 'Mentor', 'Investor', 'Admin'];

export default function AppShell() {
  const [role, setRole] = useState('Founder');
  const [roleOpen, setRoleOpen] = useState(false);
  const location = useLocation();

  const roleExtras = ROLE_NAV[role] || [];
  const unread = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 glass rounded-none border-r border-white/[0.06] z-40 flex flex-col" data-testid="app-sidebar">
        <div className="p-6 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2" data-testid="sidebar-logo">
            <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
              <Sparkles size={16} className="text-black" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">NEXORA</span>
          </Link>
        </div>

        {/* Role switcher */}
        <div className="p-4 border-b border-white/[0.06]">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm"
            data-testid="role-switcher"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-300">Role:</span>
              <span className="text-white font-medium">{role}</span>
            </span>
            <ChevronDown size={14} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 glass p-1.5 rounded-xl">
              {ROLES.map(r => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setRoleOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${role === r ? 'bg-white/[0.06] text-white' : 'text-zinc-400 hover:text-white'}`}
                  data-testid={`role-option-${r.toLowerCase()}`}
                >
                  {r}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map(item => (
            <SidebarLink key={item.to} {...item} />
          ))}
          {roleExtras.length > 0 && (
            <>
              <div className="my-3 px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">{role} tools</div>
              {roleExtras.map(item => <SidebarLink key={item.to} {...item} />)}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <Link to="/app/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors" data-testid="profile-link">
            <img src={CURRENT_USER.avatar} alt="me" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{CURRENT_USER.name}</div>
              <div className="text-xs text-zinc-500 truncate">{CURRENT_USER.headline}</div>
            </div>
            <Settings size={14} className="text-zinc-500" />
          </Link>
        </div>
      </aside>

      {/* Topbar */}
      <header className="fixed top-0 left-64 right-0 h-16 z-30 flex items-center px-6 gap-4 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl" data-testid="app-topbar">
        <div className="flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full py-2 pl-10 pr-4 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
            placeholder="Search startups, people, insights…"
            data-testid="global-search"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/app/notifications" className="relative p-2 rounded-full hover:bg-white/[0.05]" data-testid="notifications-btn">
            <Bell size={18} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />}
          </Link>
          <Link to="/app/settings" className="p-2 rounded-full hover:bg-white/[0.05]" data-testid="settings-btn">
            <Settings size={18} />
          </Link>
          <Link to="/" className="text-xs text-zinc-500 hover:text-white transition-colors" data-testid="exit-app-link">
            Exit
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-8 max-w-7xl">
          <Outlet context={{ role }} />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
          isActive ? 'bg-white/[0.05] text-white' : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
        }`
      }
      data-testid={`side-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {({ isActive }) => (
        <>
          <Icon size={16} className={isActive ? 'text-emerald-400' : ''} />
          <span>{label}</span>
          {isActive && <div className="ml-auto w-1 h-4 rounded-full bg-accent-gradient" />}
        </>
      )}
    </NavLink>
  );
}
