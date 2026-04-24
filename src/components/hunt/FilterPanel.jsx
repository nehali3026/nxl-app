import { X } from 'lucide-react';
import { STAGES, SIGNAL_COLORS } from '../../data/mockData';
import { Button } from '../ui/Button';

export function FilterPanel({ open, onClose, filters, onChange }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-ink-900/20" onClick={onClose} />
      <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <h3 className="font-semibold text-ink-900 text-sm">Filters</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-100 text-ink-400">
            <X size={15} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Stage filter */}
          <div>
            <label className="text-xs font-semibold text-ink-400 uppercase tracking-wide block mb-2">Stage</label>
            <div className="flex flex-wrap gap-2">
              {['', ...STAGES].map(s => (
                <button
                  key={s || 'all'}
                  onClick={() => onChange({ ...filters, stage: s })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    filters.stage === s
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'border-surface-200 text-ink-500 hover:border-brand-300 hover:text-brand-500'
                  }`}
                >
                  {s || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Signal filter */}
          <div>
            <label className="text-xs font-semibold text-ink-400 uppercase tracking-wide block mb-2">Signal</label>
            <div className="flex flex-col gap-1.5">
              {['', ...Object.keys(SIGNAL_COLORS)].map(sig => (
                <button
                  key={sig || 'all'}
                  onClick={() => onChange({ ...filters, signal: sig })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                    filters.signal === sig
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'border-surface-200 text-ink-500 hover:bg-surface-50'
                  }`}
                >
                  {sig || 'All Signals'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-surface-200 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => { onChange({ stage: '', signal: '' }); onClose(); }}>
            Clear All
          </Button>
          <Button variant="primary" className="flex-1" onClick={onClose}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
