import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({ open, onClose, title, children, width = 'max-w-lg' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} animate-fade-in`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <h2 className="font-semibold text-ink-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-100 text-ink-400 hover:text-ink-700 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
