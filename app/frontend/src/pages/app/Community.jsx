import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronUp, MessageSquare, Loader2, Plus, X, Heart, Share2, FileText, Check, Paperclip, Link as LinkIcon } from 'lucide-react';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Submit Post/Idea State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState('idea'); // 'idea' or 'post'
  const [ideaForm, setIdeaForm] = useState({ title: '', body: '', category: 'Product', attachmentUrl: '' });
  const [submitError, setSubmitError] = useState('');
  const [sharedId, setSharedId] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/community`);
        setPosts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmitIdea = async () => {
    setSubmitError('');
    if (ideaForm.body.length < 10) {
      setSubmitError('Body (min 10 chars) is required.');
      return;
    }
    if (submitType === 'idea' && ideaForm.title.length < 5) {
      setSubmitError('Title (min 5 chars) is required for ideas.');
      return;
    }
    try {
      const payload = {
        type: submitType,
        title: submitType === 'idea' ? ideaForm.title : null,
        body: ideaForm.body,
        category: submitType === 'idea' ? ideaForm.category : 'Discussion',
        attachmentUrl: ideaForm.attachmentUrl
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/community`, payload);
      if (res.data.success) {
        // Optimistically add to list
        const newPost = {
          id: res.data.data._id,
          type: submitType,
          title: payload.title,
          body: payload.body,
          attachmentUrl: payload.attachmentUrl,
          category: payload.category,
          author: 'You',
          likes: 0,
          comments: 0,
          time: new Date()
        };
        setPosts([newPost, ...posts]);
        setIsSubmitting(false);
        setIdeaForm({ title: '', body: '', category: 'Product', attachmentUrl: '' });
      }
    } catch (err) {
      setSubmitError('Failed to submit post. Please try again.');
    }
  };

  const handleLike = async (id, type) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/community/like`, {
        targetId: id,
        targetType: type === 'idea' ? 'Idea' : 'Post'
      });
      if (res.data.success) {
        setPosts(posts.map(p => {
          if (p.id === id) {
            return { ...p, likes: res.data.data.liked ? p.likes + 1 : p.likes - 1, userLiked: res.data.data.liked };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/app/community/${id}`);
    setSharedId(id);
    setTimeout(() => setSharedId(null), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingDoc(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setIdeaForm({ ...ideaForm, attachmentUrl: reader.result });
      setUploadingDoc(false);
    };
    reader.readAsDataURL(file);
  };

  // Make dynamic categories based on tags from ideas
  const dynamicCats = Array.from(new Set(posts.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1))));
  const cats = ['All', ...dynamicCats.filter(c => c !== 'All')];

  const shown = category === 'All' ? posts : posts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="space-y-6" data-testid="community-page">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <Overline>Community</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Founders <span className="gradient-text italic">talking shop.</span></h1>
        </div>
        <MagneticButton onClick={() => setIsSubmitting(true)} data-testid="new-post-btn">
          <Plus size={16} className="mr-2" /> New post
        </MagneticButton>
      </div>

      {isSubmitting && (
        <GlassCard className="p-6 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button onClick={() => setSubmitType('idea')} className={`text-sm font-medium ${submitType === 'idea' ? 'text-emerald-400 border-b border-emerald-400 pb-1' : 'text-zinc-500 hover:text-white'}`}>New Idea</button>
              <button onClick={() => setSubmitType('post')} className={`text-sm font-medium ${submitType === 'post' ? 'text-emerald-400 border-b border-emerald-400 pb-1' : 'text-zinc-500 hover:text-white'}`}>New Post</button>
            </div>
            <button onClick={() => setIsSubmitting(false)} className="text-zinc-400 hover:text-white"><X size={16}/></button>
          </div>
          {submitError && <div className="text-red-400 text-xs mb-4 bg-red-500/10 p-2 rounded">{submitError}</div>}
          <div className="space-y-4">
            {submitType === 'idea' && (
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Title</label>
                <input type="text" value={ideaForm.title} onChange={e => setIdeaForm({...ideaForm, title: e.target.value})} placeholder="What's your idea?" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
            )}
            <div>
              <label className="text-xs text-zinc-400 block mb-1">{submitType === 'idea' ? 'Details' : 'What do you want to share?'}</label>
              <textarea value={ideaForm.body} onChange={e => setIdeaForm({...ideaForm, body: e.target.value})} rows={3} placeholder={submitType === 'idea' ? "Explain your idea..." : "Write a post..."} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
            </div>
            {submitType === 'idea' && (
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Category</label>
                <select value={ideaForm.category} onChange={e => setIdeaForm({...ideaForm, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                  <option value="Product">Product</option>
                  <option value="Market">Market</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Building">Building</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                <Paperclip size={14} />
                {uploadingDoc ? 'Uploading...' : 'Attach File or Image'}
                <input type="file" className="hidden" onChange={handleFileUpload} accept="*/*" disabled={uploadingDoc} />
              </label>
              {ideaForm.attachmentUrl && (
                <div className="flex items-center gap-1 text-xs text-emerald-500">
                  <Check size={14} /> Attached
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <MagneticButton onClick={handleSubmitIdea}>Publish</MagneticButton>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="flex gap-2 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs rounded-full ${category === c ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>{c}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map(p => (
            <GlassCard key={p.id} className="p-6 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {p.avatar ? <img src={p.avatar} alt="avatar" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-emerald-500/20" />}
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-medium text-white">{p.author}</span>
                      <span>•</span>
                      <span className="text-emerald-500 uppercase tracking-widest">{p.category}</span>
                    </div>
                  </div>
                  {p.title && <h3 className="font-display text-xl font-medium tracking-tight mb-2 hover:text-emerald-400 transition-colors cursor-pointer">{p.title}</h3>}
                  <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">{p.body}</p>

                  {p.attachmentUrl && (
                    <div className="mt-4">
                      {p.attachmentUrl.startsWith('data:image') ? (
                        <img src={p.attachmentUrl} alt="Attachment" className="max-h-64 rounded-xl object-contain border border-white/10" />
                      ) : (
                        <a href={p.attachmentUrl} download className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-emerald-400 transition-colors">
                          <LinkIcon size={14} /> Download Attachment
                        </a>
                      )}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center gap-6 text-xs text-zinc-500">
                    <button onClick={() => handleLike(p.id, p.type)} className={`flex items-center gap-1.5 transition-colors ${p.userLiked ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>
                      <Heart size={14} className={p.userLiked ? 'fill-emerald-400' : ''} /> {p.likes || 0}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <MessageSquare size={14} /> {p.comments || 0}
                    </button>
                    <button onClick={() => handleShare(p.id)} className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                      {sharedId === p.id ? <><Check size={14} className="text-emerald-400" /> Copied</> : <><Share2 size={14} /> Share</>}
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
