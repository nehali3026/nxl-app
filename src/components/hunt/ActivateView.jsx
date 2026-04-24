import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { contacts } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { StageBadge, HealthBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';

const PER_PAGE = 5;

export function ActivateView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [healthFilter, setHealthFilter] = useState('');

  const filtered = useMemo(() => {
    let data = [...contacts];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q));
    }
    if (healthFilter) data = data.filter(c => c.health === healthFilter);
    return data;
  }, [search, healthFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search contacts..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-surface-200 rounded-xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition placeholder-ink-200"
          />
        </div>
        <div className="flex gap-1">
          {['', 'hot', 'warm', 'cold'].map(h => (
            <button
              key={h || 'all'}
              onClick={() => { setHealthFilter(h); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                healthFilter === h ? 'bg-brand-500 text-white border-brand-500' : 'border-surface-200 text-ink-500 hover:border-brand-300'
              }`}
            >
              {h ? h.charAt(0).toUpperCase() + h.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-100 bg-surface-50 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink-700">Nurture Queue</span>
          <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>{filtered.length} contacts</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-100">
              {['Contact', 'Stage', 'Health', 'Last Touch', 'Next Action'].map(col => (
                <th key={col} className="px-3 py-2.5 text-left text-xs font-semibold text-ink-400 uppercase tracking-wide">{col}</th>
              ))}
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {paged.map(c => (
              <tr key={c.id} className="table-row-hover border-b border-surface-100 last:border-0">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={c.initials} color={c.color} size="sm" />
                    <div>
                      <p className="font-medium text-ink-900">{c.name}</p>
                      <p className="text-[11px] text-ink-300">{c.title} · {c.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3"><StageBadge stage={c.stage} /></td>
                <td className="px-3 py-3"><HealthBadge health={c.health} /></td>
                <td className="px-3 py-3 text-ink-500 text-xs">{c.lastTouch}</td>
                <td className="px-3 py-3 text-ink-600 text-sm">{c.nextAction}</td>
                <td className="px-3 py-3">
                  <Button size="xs" variant="secondary">Take Action</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} perPage={PER_PAGE} />
      </div>
    </div>
  );
}
