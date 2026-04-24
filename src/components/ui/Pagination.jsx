import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, totalPages, onPageChange, totalItems, perPage }) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-surface-200 bg-white rounded-b-xl">
      <span className="text-xs text-ink-300">
        Showing <span className="font-medium text-ink-500">{start}–{end}</span> of{' '}
        <span className="font-medium text-ink-500">{totalItems}</span>
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed text-ink-500 transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 text-xs rounded font-medium transition-colors ${
              p === page
                ? 'bg-brand-500 text-white'
                : 'text-ink-500 hover:bg-surface-100'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed text-ink-500 transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
