import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '../components/ui/primitives';
import { FAQ } from '../mock/data';

export default function FAQPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="pt-40 pb-32 px-6" data-testid="faq-page">
      <div className="mx-auto max-w-4xl">
        <SectionLabel number="00" title="FAQ" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-16">
          Answers, <span className="gradient-text italic">up front.</span>
        </h1>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <div key={f.q} className="border-b border-white/[0.06]">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-6 flex items-center justify-between text-left group">
                <span className="font-display text-xl md:text-2xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors">{f.q}</span>
                <ChevronDown size={20} className={`transition-transform text-zinc-400 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                    <p className="pb-6 text-zinc-400 text-lg leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
