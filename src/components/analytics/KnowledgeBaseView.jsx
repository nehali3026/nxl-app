import { BookOpen, FileText, ExternalLink } from 'lucide-react';
import { knowledgeBaseItems } from '../../data/mockData';

const categoryColors = {
  Strategy: { bg: '#e0f2fe', color: '#0369a1' },
  Templates: { bg: '#dcfce7', color: '#166534' },
  Sales:     { bg: '#fef9c3', color: '#854d0e' },
  Intel:     { bg: '#f3e8ff', color: '#6b21a8' },
  Content:   { bg: '#fee2e2', color: '#991b1b' },
  Tools:     { bg: '#fff7ed', color: '#9a3412' },
};

export function KnowledgeBaseView() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 bg-surface-50 flex items-center gap-2">
          <BookOpen size={14} className="text-brand-500" />
          <span className="font-semibold text-sm text-ink-700">Knowledge Base</span>
          <span className="badge ml-auto" style={{ backgroundColor: '#e0e9ff', color: '#3451d1' }}>{knowledgeBaseItems.length} items</span>
        </div>
        <div className="divide-y divide-surface-100">
          {knowledgeBaseItems.map(item => {
            const cat = categoryColors[item.category] || { bg: '#f1f3f8', color: '#5a6380' };
            return (
              <div key={item.id} className="flex items-center gap-3 px-5 py-4 hover:bg-surface-50 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.bg }}>
                  <FileText size={14} style={{ color: cat.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-700">{item.title}</p>
                  <p className="text-xs text-ink-300 mt-0.5">Updated {item.updated}</p>
                </div>
                <span className="badge text-xs" style={{ backgroundColor: cat.bg, color: cat.color }}>{item.category}</span>
                <button className="p-1.5 rounded hover:bg-surface-100 text-ink-300 ml-1 transition-colors">
                  <ExternalLink size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
