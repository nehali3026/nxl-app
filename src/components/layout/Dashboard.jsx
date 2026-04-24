import { useState } from 'react';
import { Zap, Sparkles, Inbox } from 'lucide-react';
import { prospects, contacts, inboxMessages } from '../../data/mockData';
import { HuntQueue } from '../hunt/HuntQueue';
import { ActivateView } from '../hunt/ActivateView';
import { InboxView } from '../inbox/InboxView';
import { Avatar } from '../ui/Avatar';

const TAB_HUNT    = 'hunt';
const TAB_ACTIVATE= 'activate';
const TAB_INBOX   = 'inbox';

export function Dashboard() {
  const [mainTab, setMainTab] = useState(TAB_HUNT);
  const [subTab, setSubTab] = useState('contacts');

  const huntCount     = prospects.length;
  const activateCount = contacts.length;
  const inboxCount    = inboxMessages.filter(m => !m.read).length;

  const tabs = [
    { id: TAB_HUNT,     icon: Zap,      label: 'Hunt',     count: huntCount    },
    { id: TAB_ACTIVATE, icon: Sparkles, label: 'Activate', count: activateCount},
    { id: TAB_INBOX,    icon: Inbox,    label: 'Inbox',    count: inboxCount   },
  ];

  return (
    <div className="p-5 md:p-7 max-w-screen-xl mx-auto">
      {/* Greeting header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Avatar initials="L" color="#4361ee" size="lg" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white pulse-dot" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink-900">Good afternoon, Lewis!</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            I have{' '}
            <span className="font-semibold text-ink-700">{huntCount} prospects</span> to hunt,{' '}
            <span className="font-semibold text-ink-700">{activateCount} contacts</span> to nurture, and{' '}
            <span className="font-semibold text-ink-700">{inboxCount} replies</span> waiting.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1.5 mb-5 bg-surface-100 rounded-xl p-1 w-fit">
        {tabs.map(({ id, icon: Icon, label, count }) => (
          <button
            key={id}
            onClick={() => setMainTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              mainTab === id
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-400 hover:text-ink-700'
            }`}
          >
            <Icon size={14} />
            {label}
            <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
              mainTab === id ? 'bg-brand-500 text-white' : 'bg-surface-200 text-ink-400'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {mainTab === TAB_HUNT && (
        <HuntQueue activeTab={subTab} onTabChange={setSubTab} />
      )}
      {mainTab === TAB_ACTIVATE && <ActivateView />}
      {mainTab === TAB_INBOX && <InboxView />}
    </div>
  );
}
