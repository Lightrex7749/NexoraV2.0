import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import { SEC, PRICING } from "../constants/testIds";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tag: "For the first spark",
    monthly: 0,
    yearly: 0,
    features: [
      "Idea validation (3 / mo)",
      "Community + networking",
      "Founder profile",
      "Basic market insights",
    ],
    cta: "Start free",
    testId: PRICING.cardStarter,
    ctaTestId: PRICING.ctaStarter,
  },
  {
    id: "pro",
    name: "Pro",
    tag: "The founder's OS",
    monthly: 39,
    yearly: 29,
    highlight: true,
    features: [
      "Unlimited AI validation",
      "Business plan + roadmap AI",
      "Team builder + matching",
      "Mentor network access",
      "Investor pipeline",
    ],
    cta: "Go Pro",
    testId: PRICING.cardPro,
    ctaTestId: PRICING.ctaPro,
  },
  {
    id: "scale",
    name: "Scale",
    tag: "For funded teams",
    monthly: 129,
    yearly: 99,
    features: [
      "Everything in Pro",
      "Workspace + kanban + docs",
      "Cap table lite",
      "Priority mentor matching",
      "Warm investor intros",
    ],
    cta: "Talk to us",
    testId: PRICING.cardScale,
    ctaTestId: PRICING.ctaScale,
  },
];

const NumberMorph = ({ value }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-white/40 text-2xl font-display">$</span>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-6xl md:text-7xl font-medium tracking-tight leading-none"
      >
        {value}
      </motion.span>
    </AnimatePresence>
    <span className="text-white/40 text-sm ml-1">/mo</span>
  </div>
);

export const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      data-testid={SEC.pricing}
      className="relative py-32 md:py-48 bg-ink-900"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">Pricing</div>
          <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight leading-[0.95]">
            Priced like the tool <span className="italic font-light text-white/50">you&rsquo;d actually keep.</span>
          </h2>

          <div
            data-testid={PRICING.toggle}
            className="mt-10 inline-flex items-center gap-1 rounded-full glass p-1 text-sm"
          >
            <button
              data-testid={PRICING.monthly}
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full transition-colors ${!yearly ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              data-testid={PRICING.yearly}
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full transition-colors relative ${yearly ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
            >
              Yearly
              <span className="ml-2 text-[10px] uppercase tracking-widest text-emerald-500">−25%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
          {plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <motion.div
                key={p.id}
                data-testid={p.testId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-2xl p-8 md:p-10 flex flex-col ${p.highlight ? "" : "glass"}`}
                style={
                  p.highlight
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(16,185,129,0.10), rgba(245,158,11,0.06) 60%, rgba(255,255,255,0.02) 100%)",
                        border: "1px solid transparent",
                        backgroundClip: "padding-box",
                        boxShadow:
                          "0 0 0 1px rgba(16,185,129,0.35), 0 40px 80px -20px rgba(16,185,129,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }
                    : {}
                }
                data-cursor="hover"
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 bg-gradient-to-r from-emerald-400 to-amber-500 text-black text-[10px] font-bold uppercase tracking-[0.2em]">
                    Most loved
                  </span>
                )}
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{p.tag}</div>
                  <h3 className="font-display text-3xl mb-6">{p.name}</h3>
                  <NumberMorph value={price} />
                  <div className="mt-2 text-xs text-white/40">
                    {yearly ? "Billed yearly" : "Billed monthly"} · cancel anytime
                  </div>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="h-4 w-4 mt-0.5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <MagneticButton
                    data-testid={p.ctaTestId}
                    variant={p.highlight ? "primary" : "ghost"}
                    href="#final-cta"
                    className="w-full"
                  >
                    {p.cta} <span aria-hidden="true">→</span>
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;