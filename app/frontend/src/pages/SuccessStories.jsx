import React from 'react';
import { Star } from 'lucide-react';
import { SectionLabel, GlassCard } from '../components/ui/primitives';
import { SUCCESS_STORIES } from '../mock/data';

export default function SuccessStories() {
  return (
    <div className="pt-40 pb-32 px-6" data-testid="stories-page">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="00" title="Success Stories" />
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-16">
          Real founders. <span className="gradient-text italic">Real outcomes.</span>
        </h1>

        <div className="space-y-16">
          {SUCCESS_STORIES.map((s, i) => (
            <div key={s.name} className="grid md:grid-cols-3 gap-8 items-start">
              <div>
                <div className="flex gap-1 mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={12} className="fill-amber-500 text-amber-500" />)}</div>
                <div className="font-display text-2xl font-medium">{s.name}</div>
                <div className="text-sm text-zinc-500">{s.founder}</div>
                <div className="mt-2 text-emerald-500 font-mono text-sm">{s.metric}</div>
              </div>
              <div className="md:col-span-2">
                <p className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight">"{s.quote}"</p>
              </div>
              {i < SUCCESS_STORIES.length - 1 && <div className="col-span-full divider-line" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
