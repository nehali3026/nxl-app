import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/layout/Dashboard';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { KnowledgeBaseView } from './components/analytics/KnowledgeBaseView';
import { MarketingEventsView } from './components/analytics/MarketingEventsView';

const PAGE_TITLES = {
  home:      'Home',
  analytics: 'Analytics',
  knowledge: 'Knowledge Base',
  events:    'Marketing Events',
};

export default function App() {
  const [page, setPage] = useState('home');
  const [activeAgent, setActiveAgent] = useState(null);

  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        activeAgent={activeAgent}
        onAgentSelect={setActiveAgent}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Page heading for sub-pages */}
        {page !== 'home' && (
          <div className="px-5 md:px-7 pt-6 pb-0">
            <h2 className="text-lg font-bold text-ink-900">{PAGE_TITLES[page]}</h2>
          </div>
        )}
        <div className={page !== 'home' ? 'p-5 md:p-7' : ''}>
          {page === 'home'      && <Dashboard />}
          {page === 'analytics' && <AnalyticsView />}
          {page === 'knowledge' && <KnowledgeBaseView />}
          {page === 'events'    && <MarketingEventsView />}
        </div>
      </main>
    </div>
  );
}
