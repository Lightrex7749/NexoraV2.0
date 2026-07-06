import React from 'react';
import { SectionLabel, GlassCard, MagneticButton } from '../components/ui/primitives';

export default function About() {
  return (
    <div className="pt-40 pb-32 px-6" data-testid="about-page">
      <div className="mx-auto max-w-5xl">
        <SectionLabel number="00" title="About Nexora" />
        <h1 className="font-display text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.9] mb-12">
          We build the surface <span className="gradient-text italic">founders deserve.</span>
        </h1>
        <p className="text-zinc-400 text-xl leading-relaxed max-w-3xl mb-16">
          Nexora exists because building a company shouldn't require 12 disjointed tools and a spreadsheet of contacts. We're a small team of ex-operators, designers, and researchers building a calmer operating layer for the next generation of founders.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { title: 'Craft over sprawl', body: 'We\'d rather ship one feature that reshapes a founder\'s week than ten that clutter it.' },
            { title: 'Signal over noise', body: 'Every feed, notification, and recommendation earns its place. Or it gets removed.' },
            { title: 'Founders first', body: 'Every decision is checked against the person on the other side of the screen at 11pm on Tuesday.' },
          ].map(v => (
            <GlassCard key={v.title} className="p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight mb-4">{v.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{v.body}</p>
            </GlassCard>
          ))}
        </div>

        <MagneticButton href="/app/dashboard" data-testid="about-cta">Join us inside →</MagneticButton>
      </div>
    </div>
  );
}
