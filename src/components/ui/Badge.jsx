import { SIGNAL_COLORS } from '../../data/mockData';

export function SignalBadge({ signal, age }) {
  const style = SIGNAL_COLORS[signal] || { bg: '#f0f4ff', text: '#4361ee', dot: '#4361ee' };
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="badge text-xs font-medium"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: style.dot }} />
        {signal}
      </span>
      {age && <span className="text-[11px] text-ink-300 ml-0.5">{age}</span>}
    </div>
  );
}

export function StageBadge({ stage }) {
  const stageMap = {
    MQL:          { bg: '#e0f2fe', color: '#0369a1' },
    SQL:          { bg: '#dcfce7', color: '#166534' },
    SAL:          { bg: '#fef9c3', color: '#854d0e' },
    SQO:          { bg: '#f3e8ff', color: '#6b21a8' },
    'Closed Won': { bg: '#dcfce7', color: '#166534' },
    'Closed Lost':{ bg: '#fee2e2', color: '#991b1b' },
    Nurture:      { bg: '#fef3c7', color: '#92400e' },
    Engaged:      { bg: '#d1fae5', color: '#065f46' },
    'Demo Scheduled':{ bg: '#dbeafe', color: '#1e40af' },
    'Proposal Sent': { bg: '#ede9fe', color: '#5b21b6' },
  };
  const s = stageMap[stage] || { bg: '#f1f3f8', color: '#5a6380' };
  return (
    <span className="badge font-mono text-[11px] font-semibold tracking-wide" style={{ backgroundColor: s.bg, color: s.color }}>
      {stage}
    </span>
  );
}

export function HealthBadge({ health }) {
  const map = {
    hot:  { bg: '#fee2e2', color: '#991b1b', label: '🔥 Hot' },
    warm: { bg: '#fff7ed', color: '#9a3412', label: '♨️ Warm' },
    cold: { bg: '#eff6ff', color: '#1d4ed8', label: '❄️ Cold' },
  };
  const s = map[health] || map.warm;
  return (
    <span className="badge text-xs" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}
