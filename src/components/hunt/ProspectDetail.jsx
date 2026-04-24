import { Mail, Zap, X, ExternalLink } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { SignalBadge, StageBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function ProspectDetail({ prospect: p, onClose }) {
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-surface-100">
          <div className="flex items-start gap-3">
            <Avatar initials={p.initials} color={p.color} size="lg" />
            <div>
              <h2 className="font-semibold text-ink-900 text-base">{p.name}</h2>
              <p className="text-sm text-ink-400">{p.title} · {p.company}</p>
              <div className="flex items-center gap-2 mt-2">
                <StageBadge stage={p.stage} />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 text-ink-400">
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Signal */}
          <div className="bg-surface-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">Trigger Signal</p>
            <SignalBadge signal={p.signal} age={p.signalAge} />
          </div>

          {/* AI Recommendation */}
          <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
            <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <Zap size={12} /> AI Recommended Action
            </p>
            <p className="text-sm font-medium text-ink-700">{p.recommendedAction}</p>
            <p className="text-xs text-ink-400 mt-1">Goal: {p.goal}</p>
          </div>

          {/* Draft outreach */}
          <div>
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">Draft Outreach</p>
            <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
              <p className="text-sm text-ink-700 leading-relaxed">
                Hi {p.name.split(' ')[0]}, congrats on the{' '}
                <span className="text-brand-500 font-medium">{p.signal.toLowerCase()}</span> — exciting news! 
                I wanted to reach out because we help companies like {p.company} with revenue growth at this exact stage. 
                Would love to share how. Open to a quick 15-min chat?
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex items-center gap-2">
            <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-brand-500 transition-colors">
              <Mail size={13} /> {p.email}
            </a>
            <span className="text-ink-200">·</span>
            <a href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-brand-500 transition-colors">
              LinkedIn <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-surface-100 bg-surface-50">
          <Button variant="primary" className="flex-1"><Mail size={13} /> Send Outreach</Button>
          <Button variant="secondary"><Zap size={13} /> Add to Sequence</Button>
          <Button variant="ghost">Skip</Button>
        </div>
      </div>
    </div>
  );
}
