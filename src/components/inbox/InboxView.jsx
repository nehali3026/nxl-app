import { useState } from 'react';
import { Mail, Reply, Archive, Star, MoreHorizontal, Inbox } from 'lucide-react';
import { inboxMessages } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export function InboxView() {
  const [messages, setMessages] = useState(inboxMessages);
  const [selected, setSelected] = useState(null);

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const selectedMsg = messages.find(m => m.id === selected);

  return (
    <div className="animate-fade-in">
      <div className="flex gap-4 h-[calc(100vh-200px)] min-h-[400px]">
        {/* Message list */}
        <div className="w-full md:w-80 flex-shrink-0 bg-white rounded-xl border border-surface-200 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-100 bg-surface-50">
            <Inbox size={14} className="text-brand-500" />
            <span className="text-sm font-semibold text-ink-700">Inbox</span>
            <span className="badge ml-auto" style={{ backgroundColor: '#e0e9ff', color: '#3451d1' }}>
              {messages.filter(m => !m.read).length} new
            </span>
          </div>
          <div className="overflow-y-auto flex-1">
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg.id); markRead(msg.id); }}
                className={`w-full text-left px-4 py-3.5 border-b border-surface-100 hover:bg-surface-50 transition-colors ${selected === msg.id ? 'bg-brand-50' : ''}`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="relative">
                    <Avatar initials={msg.initials} color={msg.color} size="sm" />
                    {!msg.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-500 rounded-full border border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm truncate ${!msg.read ? 'font-semibold text-ink-900' : 'font-medium text-ink-700'}`}>
                        {msg.from}
                      </span>
                      <span className="text-[10px] text-ink-300 flex-shrink-0 ml-2">{msg.time}</span>
                    </div>
                    <p className="text-xs font-medium text-ink-500 truncate">{msg.subject}</p>
                    <p className="text-xs text-ink-300 mt-0.5 truncate">{msg.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message detail */}
        <div className="hidden md:flex flex-1 bg-white rounded-xl border border-surface-200 flex-col overflow-hidden">
          {selectedMsg ? (
            <>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-100 bg-surface-50">
                <div>
                  <h3 className="font-semibold text-ink-900 text-sm">{selectedMsg.subject}</h3>
                  <p className="text-xs text-ink-400 mt-0.5">From {selectedMsg.from} · {selectedMsg.company}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-surface-200 text-ink-400 transition-colors"><Star size={14} /></button>
                  <button className="p-1.5 rounded hover:bg-surface-200 text-ink-400 transition-colors"><Archive size={14} /></button>
                  <button className="p-1.5 rounded hover:bg-surface-200 text-ink-400 transition-colors"><MoreHorizontal size={14} /></button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex items-start gap-3 mb-6">
                  <Avatar initials={selectedMsg.initials} color={selectedMsg.color} size="md" />
                  <div className="flex-1 bg-surface-50 rounded-xl p-4 border border-surface-200">
                    <p className="text-sm text-ink-700 leading-relaxed">{selectedMsg.preview}</p>
                    <p className="text-sm text-ink-700 leading-relaxed mt-3">
                      Looking forward to exploring synergies between our teams. Feel free to suggest a time that works for you.
                    </p>
                    <p className="text-sm text-ink-700 mt-3">
                      Best,<br/>{selectedMsg.from}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-surface-100">
                <div className="bg-surface-50 rounded-xl p-3 border border-surface-200">
                  <textarea
                    placeholder={`Reply to ${selectedMsg.from}...`}
                    rows={3}
                    className="w-full bg-transparent text-sm text-ink-700 placeholder-ink-200 outline-none resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="primary"><Reply size={12} /> Reply</Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-ink-200">
              <Mail size={32} className="mb-2" />
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
