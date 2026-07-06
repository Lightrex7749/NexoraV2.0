import React, { useState } from 'react';
import { ChevronUp, MessageSquare } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';
import { POSTS } from '../../mock/data';

export default function Community() {
  const [posts, setPosts] = useState(POSTS);
  const [category, setCategory] = useState('All');
  const cats = ['All', 'Fundraising', 'Product', 'Market', 'Building'];
  const shown = category === 'All' ? posts : posts.filter(p => p.category === category);

  const upvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));

  return (
    <div className="space-y-6" data-testid="community-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Community</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Founders <span className="gradient-text italic">talking shop.</span></h1>
        </div>
        <MagneticButton data-testid="new-post-btn">New post</MagneticButton>
      </div>

      <div className="flex gap-2 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs rounded-full ${category === c ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map(p => (
          <GlassCard key={p.id} className="p-6">
            <div className="flex items-start gap-4">
              <button onClick={() => upvote(p.id)} className="flex flex-col items-center gap-1 shrink-0 p-2 rounded-lg hover:bg-white/[0.04]" data-testid={`upvote-${p.id}`}>
                <ChevronUp size={16} className="text-emerald-500" />
                <span className="text-sm font-medium">{p.votes}</span>
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                  <span className="text-emerald-500 font-bold uppercase tracking-widest">{p.category}</span>
                  <span>•</span><span>{p.author}</span><span>•</span><span>{p.time} ago</span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight mb-2 hover:text-emerald-400 transition-colors cursor-pointer">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1"><MessageSquare size={12} /> {p.comments} comments</div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
