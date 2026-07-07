import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Send, Paperclip, File as FileIcon, X, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { GlassCard, Overline, MagneticButton } from '../../components/ui/primitives';

const TABS = [
  { id: 'validation', label: 'Idea Validation' },
  { id: 'plan', label: 'Business Plan' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'chat', label: 'Ask AI' },
];

export default function AISuite() {
  const [tab, setTab] = useState('validation');
  const [idea, setIdea] = useState('An agentic checkout assistant for mid-market Shopify brands.');

  // Validation State
  const [valStatus, setValStatus] = useState('idle');
  const [validationData, setValidationData] = useState(null);

  // Plan State
  const [planStatus, setPlanStatus] = useState('idle');
  const [planData, setPlanData] = useState(null);

  // Roadmap State
  const [roadmapStatus, setRoadmapStatus] = useState('idle');
  const [roadmapData, setRoadmapData] = useState(null);

  // Recommendations State
  const [recStatus, setRecStatus] = useState('idle');
  const [recData, setRecData] = useState(null);

  // Chat State
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatFile, setChatFile] = useState(null);
  const [chatStatus, setChatStatus] = useState('idle');
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // API Status
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ai/health`);
        if (res.data?.success && res.data?.data) {
          // If score is >= 0, it means the API is at least configured and responding
          setApiStatus('connected');
        } else {
          setApiStatus('disconnected');
        }
      } catch (err) {
        setApiStatus('disconnected');
      }
    };
    checkApiStatus();
  }, []);

  const fetchChatSessions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat/sessions`);
      if (res.data?.success) {
        setChatSessions(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch chat sessions');
    }
  };

  useEffect(() => {
    if (tab === 'chat') {
      fetchChatSessions();
    }
  }, [tab]);

  const loadSession = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat/sessions/${id}`);
      if (res.data?.success) {
        setChatHistory(res.data.data.messages);
        setCurrentSessionId(id);
      }
    } catch (err) {
      toast.error('Failed to load session');
    }
  };

  const deleteSession = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat/sessions/${id}`);
      if (currentSessionId === id) {
        setCurrentSessionId(null);
        setChatHistory([]);
      }
      fetchChatSessions();
    } catch (err) {
      toast.error('Failed to delete session');
    }
  };

  const newSession = () => {
    setCurrentSessionId(null);
    setChatHistory([]);
  };

  const runValidation = async () => {
    if (!idea || idea.trim().length < 10) return toast.error("Please enter a more detailed idea.");
    setValStatus('running');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/validate-idea`, { idea });
      setValidationData(res.data.data);
      setValStatus('done');
    } catch (err) {
      toast.error(err.response?.data?.detail || "Validation Failed");
      setValStatus('idle');
    }
  };

  const runPlan = async () => {
    if (!idea || idea.trim().length < 10) return toast.error("Please enter a more detailed idea.");
    setPlanStatus('running');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate-plan`, { idea });
      setPlanData(res.data.data);
      setPlanStatus('done');
    } catch (err) {
      toast.error(err.response?.data?.detail || "Plan Generation Failed");
      setPlanStatus('idle');
    }
  };

  const runRoadmap = async () => {
    if (!idea || idea.trim().length < 10) return toast.error("Please enter a more detailed idea.");
    setRoadmapStatus('running');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate-roadmap`, { idea });
      setRoadmapData(res.data.data);
      setRoadmapStatus('done');
    } catch (err) {
      toast.error(err.response?.data?.detail || "Roadmap Generation Failed");
      setRoadmapStatus('idle');
    }
  };

  const runRecommendations = async () => {
    if (!idea || idea.trim().length < 10) return toast.error("Please enter a more detailed idea.");
    setRecStatus('running');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate-recommendations`, { idea, planData, roadmapData });
      setRecData(res.data.data);
      setRecStatus('done');
    } catch (err) {
      toast.error(err.response?.data?.detail || "Recommendations Generation Failed");
      setRecStatus('idle');
    }
  };

  const handleChat = async () => {
    if (!chatMsg.trim() && !chatFile) return;
    const msg = chatMsg;
    setChatMsg('');
    setChatHistory(prev => [...prev, { role: 'user', content: msg, file: chatFile?.name }]);
    setChatStatus('running');

    try {
      const formData = new FormData();
      formData.append('message', msg);
      formData.append('history', JSON.stringify(chatHistory));
      if (currentSessionId) formData.append('sessionId', currentSessionId);
      if (chatFile) formData.append('file', chatFile);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`, formData);
      setChatHistory(prev => [...prev, { role: 'ai', content: res.data.data.reply }]);
      if (res.data.data.sessionId && !currentSessionId) {
        setCurrentSessionId(res.data.data.sessionId);
        fetchChatSessions();
      }
      setChatFile(null);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Chat Failed");
    } finally {
      setChatStatus('idle');
    }
  };

  return (
    <div className="space-y-6" data-testid="ai-suite">
      <div className="flex items-start justify-between">
        <div>
          <Overline>AI Suite</Overline>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-2">Your always-on <span className="gradient-text italic">operator.</span></h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-zinc-300">Groq API:</span>
          {apiStatus === 'checking' && (
            <span className="flex items-center gap-1.5 text-sm text-amber-500 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div> Checking...
            </span>
          )}
          {apiStatus === 'connected' && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Connected & Working
            </span>
          )}
          {apiStatus === 'disconnected' && (
            <span className="flex items-center gap-1.5 text-sm text-rose-400">
              <XCircle className="w-4 h-4" /> Not Working
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm rounded-full ${tab === t.id ? 'bg-white text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`} data-testid={`ai-tab-${t.id}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab !== 'chat' && (
        <GlassCard className="p-6 mb-6 border border-emerald-500/10">
          <label className="text-xs text-emerald-500 font-bold uppercase tracking-widest block mb-2">Core Concept</label>
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows="2" placeholder="Describe your startup idea..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
        </GlassCard>
      )}

      {tab === 'validation' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MagneticButton onClick={runValidation}>
              {valStatus === 'running' ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : <><Sparkles size={16} /> Run Validation</>}
            </MagneticButton>
          </div>

          <AnimatePresence>
            {valStatus === 'done' && validationData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Score</div>
                    <div className="font-display text-7xl font-semibold gradient-text tracking-tighter">{validationData.score}</div>
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(validationData.swot || {}).map(([k, v]) => (
                    <div key={k} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">{k}</div>
                      <ul className="space-y-2">
                        {v.map(x => <li key={x} className="text-sm text-zinc-300">• {x}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Risks</div>
                  <div className="space-y-2">
                    {(validationData.risks || []).map(r => (
                      <div key={r.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${r.level === 'High' ? 'bg-red-500/20 text-red-400' : r.level === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{r.level}</span>
                        <span className="text-sm text-zinc-300">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Suggestions</div>
                  <ul className="space-y-2">
                    {(validationData.suggestions || []).map(x => <li key={x} className="text-sm text-zinc-300 flex items-start gap-2"><span className="text-emerald-500 mt-0.5">→</span>{x}</li>)}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {tab === 'plan' && (
        <div className="space-y-6">
          <MagneticButton onClick={runPlan}>
            {planStatus === 'running' ? <><Loader2 size={16} className="animate-spin" /> Generating Plan…</> : <><Sparkles size={16} /> Generate Plan</>}
          </MagneticButton>

          <AnimatePresence>
            {planStatus === 'done' && planData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard className="p-8 border border-emerald-500/20">
                  <h2 className="font-display text-2xl font-medium mb-6 flex items-center gap-3"><Sparkles className="text-emerald-500" /> Generated Business Plan</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {planData.map(sec => (
                      <div key={sec.title} className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
                        <div className="text-sm font-bold text-emerald-400 mb-2">{sec.title}</div>
                        <p className="text-sm text-zinc-300 leading-relaxed">{sec.content}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {tab === 'roadmap' && (
        <div className="space-y-6">
          <MagneticButton onClick={runRoadmap}>
            {roadmapStatus === 'running' ? <><Loader2 size={16} className="animate-spin" /> Generating Roadmap…</> : <><Sparkles size={16} /> Generate Roadmap</>}
          </MagneticButton>

          <AnimatePresence>
            {roadmapStatus === 'done' && roadmapData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard className="p-8 border border-emerald-500/20">
                  <h2 className="font-display text-2xl font-medium mb-6 flex items-center gap-3"><Sparkles className="text-emerald-500" /> Strategic Roadmap</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roadmapData.map(r => (
                      <div key={r.phase} className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">{r.phase}</div>
                        <div className="text-sm font-medium mb-3 text-white">{r.title}</div>
                        <ul className="space-y-2">
                          {r.items.map(m => <li key={m} className="text-xs text-zinc-400 flex items-start gap-2"><span className="text-emerald-500 mt-0.5">◆</span>{m}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {tab === 'recommendations' && (
        <div className="space-y-6">
          <MagneticButton onClick={runRecommendations}>
            {recStatus === 'running' ? <><Loader2 size={16} className="animate-spin" /> Analyzing Profile…</> : <><Sparkles size={16} /> Generate Recommendations</>}
          </MagneticButton>

          <AnimatePresence>
            {recStatus === 'done' && recData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard className="p-8 border border-emerald-500/20">
                  <h2 className="font-display text-2xl font-medium mb-6 flex items-center gap-3"><Sparkles className="text-emerald-500" /> Recommended for You</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recData.map((r, idx) => (
                      <div key={idx} className="p-6 rounded-xl bg-black/40 border border-white/[0.05] hover:border-emerald-500/30 transition-colors">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">{r.type}</div>
                        <div className="font-display text-lg font-medium mb-3 text-white">{r.name}</div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{r.why}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {tab === 'chat' && (
        <GlassCard className="h-[calc(100vh-240px)] min-h-[500px] p-0 overflow-hidden relative bg-black/60 backdrop-blur-2xl border-white/10" contentClassName="h-full">
          <div className="flex w-full h-full">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-black/40 flex-col hidden md:flex">
              <div className="p-4 border-b border-white/5">
                <button onClick={newSession} className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium">
                  <Sparkles size={14} /> New Chat
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                {chatSessions.map(session => (
                  <div key={session._id} className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${currentSessionId === session._id ? 'bg-white/10' : 'hover:bg-white/5'}`} onClick={() => loadSession(session._id)}>
                    <div className="truncate text-sm text-zinc-300 w-[160px]">{session.title}</div>
                    <button onClick={(e) => { e.stopPropagation(); deleteSession(session._id); }} className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {chatSessions.length === 0 && (
                  <div className="text-center text-xs text-zinc-500 mt-4">No previous chats</div>
                )}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">AI Advisor</h3>
                  <p className="text-xs text-zinc-400">Always online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                      <Sparkles size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl text-white font-medium mb-2">How can I help you build?</h3>
                    <p className="text-sm text-center max-w-sm">Upload a pitch deck, financial model, or just ask me anything about your startup strategy.</p>
                  </div>
                ) : (
                  chatHistory.map((msg, i) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-emerald-500/20'}`}>
                        {msg.role === 'user' ? <span className="text-xs font-bold">ME</span> : <Sparkles size={14} className="text-emerald-500" />}
                      </div>
                      <div className={`max-w-[75%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-emerald-500/20 text-white' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>
                        {msg.file && (
                          <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-black/40 text-xs text-emerald-400 border border-emerald-500/20 w-fit">
                            <FileIcon size={14} /> {msg.file}
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))
                )}
                {chatStatus === 'running' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-emerald-500" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl p-4 bg-white/5 text-zinc-400 border border-white/5 flex items-center gap-3">
                      <Loader2 size={16} className="animate-spin text-emerald-500" /> Analyzing your request...
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-gradient-to-t from-black/80 to-transparent pt-8">
                <div className="bg-black border border-white/10 rounded-2xl p-2 relative shadow-2xl">
                  {chatFile && (
                    <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg w-fit ml-2">
                      <FileIcon size={14} /> {chatFile.name}
                      <button onClick={() => setChatFile(null)} className="hover:text-white p-1"><X size={12} /></button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="p-3 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer rounded-xl hover:bg-white/5 flex-shrink-0">
                      <Paperclip size={20} />
                      <input type="file" className="hidden" onChange={e => setChatFile(e.target.files[0])} accept=".pdf,.doc,.docx,.txt,.csv" />
                    </label>
                    <input
                      value={chatMsg}
                      onChange={e => setChatMsg(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleChat()}
                      placeholder="Ask your AI advisor..."
                      className="flex-1 bg-transparent border-none py-3 px-2 text-sm text-white focus:outline-none focus:ring-0 placeholder:text-zinc-600"
                    />
                    <button onClick={handleChat} disabled={!chatMsg.trim() && !chatFile} className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0">
                      <Send size={18} className="mr-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
