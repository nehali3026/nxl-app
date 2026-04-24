import { useState, useMemo } from 'react';
import {
  Search, Filter, Upload, ChevronDown, ChevronUp,
  ArrowUpDown, Eye, Zap, MoreHorizontal, CheckSquare
} from 'lucide-react';
import { prospects, contacts, inboxMessages } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { SignalBadge, StageBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { Modal } from '../ui/Modal';
import { FilterPanel } from './FilterPanel';
import { ProspectDetail } from './ProspectDetail';

const PER_PAGE = 5;
const TABS = [
  { id: 'contacts', label: 'Contacts' },
  { id: 'accounts', label: 'Accounts' },
];

function getSummaryFromProspects(ps) {
  // Group by company as "accounts"
  const map = {};
  ps.forEach(p => {
    if (!map[p.company]) map[p.company] = { company: p.company, contacts: 0, stage: p.stage, signal: p.signal, signalAge: p.signalAge, companyType: p.companyType, color: p.color };
    map[p.company].contacts++;
  });
  return Object.values(map);
}

export function HuntQueue({ activeTab, onTabChange }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ stage: '', signal: '' });
  const [detailProspect, setDetailProspect] = useState(null);

  const allData = activeTab === 'contacts' ? prospects : getSummaryFromProspects(prospects);

  const filtered = useMemo(() => {
    let data = [...allData];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.company?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q)
      );
    }
    if (filters.stage) data = data.filter(p => p.stage === filters.stage);
    if (filters.signal) data = data.filter(p => p.signal === filters.signal);
    if (sortField) {
      data.sort((a, b) => {
        const av = (a[sortField] || '').toString();
        const bv = (b[sortField] || '').toString();
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return data;
  }, [allData, search, filters, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
    setPage(1);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleAll = () => {
    const ids = paged.map(p => p.id);
    const allSelected = ids.every(id => selectedIds.includes(id));
    setSelectedIds(allSelected ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
  };
  const allPageSelected = paged.length > 0 && paged.every(p => selectedIds.includes(p.id));

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-ink-200" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-brand-500" />
      : <ChevronDown size={12} className="text-brand-500" />;
  };

  return (
    <div className="animate-fade-in">
      {/* Search + Actions row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by prospect, signal, account..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-surface-200 rounded-xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition placeholder-ink-200"
          />
        </div>
        <Button variant="outline" onClick={() => setFilterOpen(true)}>
          <Filter size={13} /> Filters {(filters.stage || filters.signal) ? '•' : ''}
        </Button>
        <Button variant="outline">
          <Upload size={13} /> Upload
        </Button>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-3">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { onTabChange(t.id); setPage(1); setSelectedIds([]); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id
                ? 'bg-white text-ink-900 shadow-sm border border-surface-200'
                : 'text-ink-400 hover:text-ink-700 hover:bg-surface-50'
            }`}
          >
            {t.label} ({activeTab === t.id ? filtered.length : (t.id === 'contacts' ? prospects.length : getSummaryFromProspects(prospects).length)})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        {/* Queue header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100 bg-surface-50">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand-500" />
            <span className="text-sm font-semibold text-ink-700">Hunt Queue</span>
            <span className="badge text-xs" style={{ backgroundColor: '#e0e9ff', color: '#3451d1' }}>
              {filtered.length} pending
            </span>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-400">{selectedIds.length} selected</span>
              <Button size="xs" variant="primary"><Zap size={11} /> Bulk Outreach</Button>
            </div>
          )}
        </div>

        {activeTab === 'contacts' ? (
          <>
            {/* Contacts table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-100">
                  <th className="w-10 px-4 py-2.5">
                    <input type="checkbox" checked={allPageSelected} onChange={toggleAll} className="cursor-pointer accent-brand-500" />
                  </th>
                  {[
                    { label: 'Prospect', field: 'name' },
                    { label: 'Stage', field: 'stage' },
                    { label: 'Goal', field: 'goal' },
                    { label: 'Signal', field: 'signal' },
                    { label: 'Recommended Action', field: 'recommendedAction' },
                  ].map(col => (
                    <th
                      key={col.field}
                      onClick={() => toggleSort(col.field)}
                      className="px-3 py-2.5 text-left text-xs font-semibold text-ink-400 uppercase tracking-wide cursor-pointer hover:text-ink-700 whitespace-nowrap select-none"
                    >
                      <span className="flex items-center gap-1">
                        {col.label} <SortIcon field={col.field} />
                      </span>
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-ink-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-ink-300 text-sm">
                      No prospects match your search.
                    </td>
                  </tr>
                ) : paged.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`table-row-hover border-b border-surface-100 last:border-0 transition-colors ${selectedIds.includes(p.id) ? 'bg-brand-50' : ''}`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} className="cursor-pointer accent-brand-500" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={p.initials} color={p.color} size="sm" />
                        <div>
                          <button onClick={() => setDetailProspect(p)} className="font-medium text-ink-900 hover:text-brand-500 transition-colors text-left">
                            {p.name}
                          </button>
                          <p className="text-[11px] text-ink-300 flex items-center gap-1 mt-0.5">
                            <span className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: p.color }}>
                              {p.companyType}
                            </span>
                            {p.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3"><StageBadge stage={p.stage} /></td>
                    <td className="px-3 py-3 text-ink-600 text-sm">{p.goal}</td>
                    <td className="px-3 py-3"><SignalBadge signal={p.signal} age={p.signalAge} /></td>
                    <td className="px-3 py-3 text-ink-600 text-sm max-w-[180px] truncate">{p.recommendedAction}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <Button size="xs" variant="primary" onClick={() => setDetailProspect(p)}>
                          <Eye size={11} /> Review
                        </Button>
                        <button className="p-1.5 rounded hover:bg-surface-100 text-ink-300 transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          /* Accounts view */
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="w-10 px-4 py-2.5" />
                {['Company', 'Contacts', 'Stage', 'Latest Signal'].map(col => (
                  <th key={col} className="px-3 py-2.5 text-left text-xs font-semibold text-ink-400 uppercase tracking-wide">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((a, i) => (
                <tr key={i} className="table-row-hover border-b border-surface-100 last:border-0">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="cursor-pointer accent-brand-500" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center text-white" style={{ backgroundColor: a.color }}>
                        {a.companyType}
                      </span>
                      <span className="font-medium text-ink-900">{a.company}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-ink-600">{a.contacts} contact{a.contacts !== 1 ? 's' : ''}</td>
                  <td className="px-3 py-3"><StageBadge stage={a.stage} /></td>
                  <td className="px-3 py-3"><SignalBadge signal={a.signal} age={a.signalAge} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          perPage={PER_PAGE}
        />
      </div>

      {/* Filter panel */}
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={f => { setFilters(f); setPage(1); }}
      />

      {/* Prospect detail modal */}
      {detailProspect && (
        <ProspectDetail prospect={detailProspect} onClose={() => setDetailProspect(null)} />
      )}
    </div>
  );
}
