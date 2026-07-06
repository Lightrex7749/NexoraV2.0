import React from "react";
import Marquee from "react-fast-marquee";
import { SEC } from "../constants/testIds";

const cols = [
  {
    title: "Product",
    links: ["Idea Validation", "Business Plan AI", "Team Builder", "Mentorship", "Investor Matching", "Market Insights"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Partners"],
  },
  {
    title: "Resources",
    links: ["Blog", "Founder guides", "Changelog", "Support", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

const tags = [
  "AI VALIDATION", "BUSINESS PLAN AI", "MENTOR NETWORK", "INVESTOR PIPELINE",
  "MARKET INSIGHTS", "CO-FOUNDER MATCH", "PITCH DECKS", "ROADMAP AI",
];

export const Footer = () => (
  <footer data-testid={SEC.footer} className="relative bg-ink-950 border-t border-white/[0.06]">
    {/* Parallax marquee tag strip */}
    <div className="py-8 border-b border-white/[0.06]">
      <Marquee gradient={false} speed={30} autoFill direction="right">
        {tags.map((t, i) => (
          <span key={i} className="mx-6 text-xs uppercase tracking-[0.3em] text-white/30 flex items-center gap-6">
            {t}
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </span>
        ))}
      </Marquee>
    </div>

    <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-24">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-display text-2xl font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
            Nexora
          </div>
          <p className="mt-4 text-white/50 text-sm max-w-xs leading-relaxed">
            The AI-powered operating system for founders. From idea to impact — under one roof.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/50 hover:text-white hover:border-white/30 transition-colors"
                aria-label={s}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">{c.title}</div>
            <ul className="space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Massive Nexora wordmark */}
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 pb-6">
        <div className="font-display font-semibold tracking-[-0.05em] leading-none text-[24vw] text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none pointer-events-none">
          NEXORA
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-6 mx-auto max-w-[1240px] px-6 flex flex-wrap justify-between items-center gap-4 text-xs text-white/40">
        <div>© {new Date().getFullYear()} Nexora Systems. From idea to impact.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;