import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Filter, Loader2, Search, Heart, Share2, Check } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';

export default function Startups() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharedId, setSharedId] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/startups`);
        setStartups(res.data.data);
      } catch (err) {
        console.error("Failed to fetch startups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const stages = ['All', 'Idea', 'Validation', 'Growth', 'Scale'];

  const filtered = startups.filter(s => {
    const matchStage = filter === 'All' ? true : s.stage?.toLowerCase() === filter.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        (s.tagline && s.tagline.toLowerCase().includes(search.toLowerCase()));
    return matchStage && matchSearch;
  });

  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/community/like`, {
        targetId: id,
        targetType: 'Startup'
      });
      if (res.data.success) {
        setStartups(startups.map(s => {
          if (s.id === id) {
            return { ...s, likes: res.data.data.liked ? (s.likes || 0) + 1 : (s.likes || 0) - 1, userLiked: res.data.data.liked };
          }
          return s;
        }));
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleShare = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/app/startups/${id}`);
    setSharedId(id);
    setTimeout(() => setSharedId(null), 2000);
  };

  return (
    <div className="space-y-6" data-testid="startups-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Startups</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your ideas <span className="gradient-text italic">in motion.</span></h1>
        </div>
        <MagneticButton data-testid="new-startup-btn"><Plus size={16} /> New startup</MagneticButton>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-zinc-500" />
          {stages.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${filter === s ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}
              data-testid={`filter-${s.toLowerCase()}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} onClick={() => navigate(`/app/startups/${s.id}`)} className="cursor-pointer" data-testid={`startup-card-${s.id}`}>
              <GlassCard className="p-6 h-full hover:bg-white/[0.04] transition-colors relative flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center font-display text-xl font-semibold text-black">{s.logo}</div>
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${s.status === 'APPROVED' ? 'text-emerald-500' : 'text-amber-500'}`}>{s.status}</span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight mb-2">{s.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-2">{s.tagline}</p>
                <div className="mt-auto mb-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>{s.stage}</span><span>{s.progress}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden mb-4">
                  <div className="h-full bg-accent-gradient" style={{ width: `${s.progress}%` }} />
                </div>
                <div className="pt-4 border-t border-white/[0.05] flex items-center gap-6 text-xs text-zinc-500">
                  <button onClick={(e) => handleLike(e, s.id)} className={`flex items-center gap-1.5 transition-colors ${s.userLiked ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>
                    <Heart size={14} className={s.userLiked ? 'fill-emerald-400' : ''} /> {s.likes || 0}
                  </button>
                  <button onClick={(e) => handleShare(e, s.id)} className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                    {sharedId === s.id ? <><Check size={14} className="text-emerald-400" /> Copied</> : <><Share2 size={14} /> Share</>}
                  </button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
