import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionLabel, GlassCard, MagneticButton } from '../components/ui/primitives';
import { PRICING } from '../mock/data';

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <div className="pt-40 pb-32 px-6" data-testid="pricing-page">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="00" title="Pricing" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] max-w-3xl">
            Priced for founders. <span className="gradient-text italic">Not enterprises.</span>
          </h1>
          <div className="flex items-center gap-3 glass !bg-white/[0.03] p-1.5 rounded-full">
            <button onClick={() => setYearly(false)} className={`px-4 py-2 rounded-full text-sm transition-colors ${!yearly ? 'bg-white text-black' : 'text-zinc-400'}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-2 rounded-full text-sm transition-colors ${yearly ? 'bg-white text-black' : 'text-zinc-400'}`}>Yearly <span className="text-emerald-500 ml-1">-20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PRICING.map(p => (
            <GlassCard key={p.name} className={`p-8 flex flex-col ${p.highlighted ? 'ring-1 ring-emerald-500/30 shadow-glow-emerald' : ''}`}>
              <h3 className="font-display text-2xl font-medium mb-2">{p.name}</h3>
              <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">{p.description}</p>
              <div className="flex items-end gap-2 mb-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={yearly ? 'y' : 'm'} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="font-display text-6xl font-semibold tracking-tighter">
                    ${yearly ? p.yearly : p.monthly}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-500 mb-2 text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton href="/app/dashboard" variant={p.highlighted ? 'primary' : 'ghost'}>{p.cta}</MagneticButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
