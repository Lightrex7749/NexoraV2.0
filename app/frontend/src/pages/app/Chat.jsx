import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';
import { GlassCard, Overline } from '../../components/ui/primitives';
import { CONVERSATIONS, MESSAGES } from '../../mock/data';

export default function Chat() {
  const [active, setActive] = useState(CONVERSATIONS[0].id);
  const [msgs, setMsgs] = useState(MESSAGES);
  const [draft, setDraft] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const newMsg = { id: `n${Date.now()}`, from: 'me', body: draft, time: 'now' };
    setMsgs({ ...msgs, [active]: [...(msgs[active] || []), newMsg] });
    setDraft('');
  };

  const currentConv = CONVERSATIONS.find(c => c.id === active);
  const currentMsgs = msgs[active] || [];

  return (
    <div className="space-y-6" data-testid="chat-page">
      <Overline>Chat</Overline>
      <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">Live conversations.</h1>

      <GlassCard className="!rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-3 h-[600px]">
          {/* List */}
          <div className="border-r border-white/[0.06] flex flex-col">
            <div className="p-4 border-b border-white/[0.06]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input placeholder="Search…" className="w-full bg-white/[0.03] rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {CONVERSATIONS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`w-full text-left p-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${active === c.id ? 'bg-white/[0.04]' : ''}`}
                  data-testid={`conv-${c.id}`}
                >
                  <div className="flex items-start gap-3">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <div className="text-sm font-medium truncate">{c.name}</div>
                        <div className="text-[10px] text-zinc-500">{c.time}</div>
                      </div>
                      <div className="text-xs text-emerald-500 mb-1">{c.role}</div>
                      <div className="text-xs text-zinc-400 truncate">{c.last}</div>
                    </div>
                    {c.unread > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gradient text-black font-bold shrink-0">{c.unread}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="col-span-2 flex flex-col">
            <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
              <img src={currentConv?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-medium">{currentConv?.name}</div>
                <div className="text-xs text-emerald-500">{currentConv?.role} • Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMsgs.map(m => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : ''}`}>
                  <div className={`max-w-md px-4 py-3 rounded-2xl text-sm ${m.from === 'me' ? 'bg-accent-gradient text-black' : 'bg-white/[0.04] text-white'}`}>
                    {m.body}
                    <div className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-black/60' : 'text-zinc-500'}`}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="p-4 border-t border-white/[0.06] flex gap-2">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" className="flex-1 bg-white/[0.03] rounded-full px-5 py-3 text-sm focus:outline-none" data-testid="chat-input" />
              <button type="submit" className="w-11 h-11 rounded-full bg-accent-gradient flex items-center justify-center text-black" data-testid="chat-send"><Send size={16} /></button>
            </form>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
