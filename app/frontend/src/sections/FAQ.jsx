import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SEC, FAQ } from "../constants/testIds";

const items = [
  {
    q: "Is Nexora only for early founders?",
    a: "No. Nexora spans the full journey — idea, MVP, launch, growth and funding. Investors, mentors and team members work inside the same ecosystem, so a startup doesn't have to change tools as it grows.",
  },
  {
    q: "Do the AI outputs replace a real business plan?",
    a: "They accelerate one. Every AI output is a first draft you can edit, version and export. Think of it as a senior operator who's already done the reading and wants your call on the details.",
  },
  {
    q: "How does mentor and investor matching actually work?",
    a: "We combine explicit signals (stage, industry, geography, thesis) with behavioural signals (activity, saved startups, feedback patterns) into a compatibility score. You always control who reaches you.",
  },
  {
    q: "Is my company data used to train models?",
    a: "No. Your data is encrypted at rest, siloed per workspace, and never used for third-party model training. See our security page for the fine print.",
  },
  {
    q: "Can I invite my co-founder and team on the free plan?",
    a: "Yes — up to three seats on Starter, unlimited on Pro. Team members join with their own login and role permissions.",
  },
  {
    q: "What happens after I raise?",
    a: "Nexora Scale is designed for funded teams — workspace, kanban, docs, cap table lite and warm investor intros for the next round. You keep your history and your relationships.",
  },
];

const Row = ({ item, open, onToggle }) => (
  <div className="mb-6">
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="w-full flex items-center justify-between gap-4 text-left"
    >
      <div>
        <div className="text-sm text-white/60">{item.q}</div>
      </div>
      <div className="text-white/60">
        <Plus className="h-4 w-4" />
      </div>
    </button>
    {open && <div className="mt-3 text-white/60 text-sm">{item.a}</div>}
  </div>
);

export const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      data-testid={SEC.faq}
      className="relative py-32 md:py-48 bg-ink-950"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">FAQ</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight leading-[0.95]">
              Small print,
              <br />
              <span className="italic font-light text-white/50">no fine print.</span>
            </h2>
          </div>
          <div>
            {items.map((it, i) => (
              <Row
                key={it.q}
                item={it}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
