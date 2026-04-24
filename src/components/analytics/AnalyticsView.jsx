import { TrendingUp, TrendingDown } from 'lucide-react';
import { analyticsData } from '../../data/mockData';

function MiniBar({ value, max, color }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {[value * 0.6, value * 0.8, value * 0.7, value, value * 0.9, value * 0.5, value * 0.4].map((v, i) => (
        <div
          key={i}
          className="w-3 rounded-sm"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: 0.6 + (i === 3 ? 0.4 : 0) }}
        />
      ))}
    </div>
  );
}

export function AnalyticsView() {
  const weekly = analyticsData.weekly;
  const maxSent = Math.max(...weekly.map(d => d.sent));

  return (
    <div className="animate-fade-in space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {analyticsData.overview.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-surface-200">
            <p className="text-xs text-ink-400 font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-ink-900">{stat.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
              {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.delta} <span className="text-ink-300 font-normal">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-white rounded-xl p-5 border border-surface-200">
        <h3 className="font-semibold text-ink-700 text-sm mb-4">Weekly Activity</h3>
        <div className="flex items-end gap-3 h-32">
          {weekly.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col gap-0.5 items-center" style={{ height: '100px' }}>
                <div className="w-full rounded-t" style={{ height: `${(d.sent / maxSent) * 100}%`, backgroundColor: '#4361ee', opacity: 0.8 }} />
              </div>
              <span className="text-[11px] text-ink-300">{d.day}</span>
              <span className="text-[10px] text-ink-400 font-medium">{d.sent}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-ink-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#4361ee' }} /> Emails Sent
          </span>
          <span className="flex items-center gap-1.5 text-xs text-ink-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#00b894' }} /> Opens
          </span>
          <span className="flex items-center gap-1.5 text-xs text-ink-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#e84393' }} /> Replies
          </span>
        </div>
      </div>

      {/* Top signals */}
      <div className="bg-white rounded-xl p-5 border border-surface-200">
        <h3 className="font-semibold text-ink-700 text-sm mb-3">Top Converting Signals</h3>
        <div className="space-y-2.5">
          {[
            { signal: 'Series B Funding', rate: '34%', count: 8 },
            { signal: 'Hiring Sales Team', rate: '28%', count: 6 },
            { signal: 'New Leadership', rate: '22%', count: 5 },
            { signal: 'Product Launch', rate: '19%', count: 4 },
          ].map(item => (
            <div key={item.signal} className="flex items-center gap-3">
              <span className="text-sm text-ink-600 flex-1">{item.signal}</span>
              <span className="text-xs text-ink-400">{item.count} prospects</span>
              <div className="w-24 bg-surface-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-brand-500" style={{ width: item.rate }} />
              </div>
              <span className="text-xs font-semibold text-brand-500 w-8 text-right">{item.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
