import { CalendarDays, MapPin, Users } from 'lucide-react';
import { marketingEvents } from '../../data/mockData';

const typeColors = {
  Conference: { bg: '#e0f2fe', color: '#0369a1' },
  Meetup:     { bg: '#dcfce7', color: '#166534' },
  Webinar:    { bg: '#f3e8ff', color: '#6b21a8' },
};

export function MarketingEventsView() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 bg-surface-50 flex items-center gap-2">
          <CalendarDays size={14} className="text-brand-500" />
          <span className="font-semibold text-sm text-ink-700">Marketing Events</span>
          <span className="badge ml-auto" style={{ backgroundColor: '#e0e9ff', color: '#3451d1' }}>{marketingEvents.length} upcoming</span>
        </div>
        <div className="divide-y divide-surface-100">
          {marketingEvents.map(evt => {
            const tc = typeColors[evt.type] || { bg: '#f1f3f8', color: '#5a6380' };
            return (
              <div key={evt.id} className="flex items-start gap-4 px-5 py-4 hover:bg-surface-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <CalendarDays size={18} className="text-brand-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{evt.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <CalendarDays size={11} /> {evt.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <MapPin size={11} /> {evt.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <Users size={11} /> {evt.attendees.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="badge text-xs ml-4" style={{ backgroundColor: tc.bg, color: tc.color }}>
                      {evt.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
