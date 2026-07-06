import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { MagneticButton } from './primitives';

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: '/features', label: 'Features' },
    { to: '/showcase', label: 'Showcase' },
    { to: '/events', label: 'Events' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
      data-testid="public-navbar"
    >
      <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between ${scrolled ? 'glass px-6 py-3 rounded-full' : ''}`}>
        <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
          <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
            <Sparkles size={16} className="text-black" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">NEXORA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `text-sm transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
              data-testid={`nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/app/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors" data-testid="signin-link">Sign in</Link>
          <MagneticButton href="/app/dashboard" data-testid="launch-app-btn" className="!px-5 !py-2.5 text-sm">
            Launch app →
          </MagneticButton>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-6 right-6 mt-2 glass p-6 rounded-2xl"
          >
            <div className="flex flex-col gap-4">
              {links.map(l => (
                <Link key={l.to} to={l.to} className="text-zinc-300" data-testid={`m-nav-${l.label.toLowerCase()}`}>
                  {l.label}
                </Link>
              ))}
              <div className="divider-line" />
              <Link to="/app/dashboard" className="text-emerald-400" data-testid="m-launch-link">Launch app →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function PublicFooter() {
  return (
    <footer className="relative mt-32 px-6 pb-16 pt-24 border-t border-white/[0.06]" data-testid="public-footer">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Sparkles size={16} className="text-black" />
              </div>
              <span className="font-display text-xl font-semibold">NEXORA</span>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              From idea to impact. The AI-native operating layer for the next generation of founders, mentors, and investors.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-500 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/showcase">Showcase</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-500 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/success-stories">Success stories</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div
            className="font-display font-bold tracking-tighter leading-none select-none pointer-events-none text-stroke"
            style={{ fontSize: 'clamp(4rem, 22vw, 20rem)' }}
            aria-hidden
          >
            NEXORA
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-zinc-500 mt-8 pt-8 border-t border-white/[0.06]">
          <p>© 2026 Nexora Labs. From idea to impact.</p>
          <p>Made for founders, worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
