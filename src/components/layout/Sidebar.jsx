import { useState } from 'react';
import {
  Home, BarChart2, BookOpen, CalendarDays, User,
  ChevronRight, Menu, X
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { agents } from '../../data/mockData';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'events', label: 'Marketing Events', icon: CalendarDays },
];

export function Sidebar({ activePage, onNavigate, activeAgent, onAgentSelect }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="font-bold text-ink-900 text-lg tracking-tight">NXL</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { onNavigate(id); setMobileOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              activePage === id
                ? 'bg-brand-50 text-brand-500'
                : 'text-ink-500 hover:bg-surface-100 hover:text-ink-700'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}

        {/* Agents section */}
        <div className="pt-4 pb-1">
          <p className="px-3 text-[10px] font-semibold text-ink-300 uppercase tracking-widest mb-1">
            AI Revenue GTM Team
          </p>
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => { onAgentSelect(agent.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                activeAgent === agent.id
                  ? 'bg-surface-100 text-ink-900'
                  : 'text-ink-500 hover:bg-surface-50'
              }`}
            >
              <Avatar initials={agent.initials} color={agent.color} size="sm" />
              <div className="flex flex-col items-start min-w-0">
                <span className="font-medium text-ink-700 text-sm leading-tight">{agent.name}</span>
                <span className="text-[11px] text-ink-300 truncate w-full text-left">{agent.role}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Resources */}
        <div className="pt-2">
          <p className="px-3 text-[10px] font-semibold text-ink-300 uppercase tracking-widest mb-1">
            Resources
          </p>
          {['Analytics', 'Knowledge Base', 'Marketing Events'].map(r => (
            <button
              key={r}
              onClick={() => {
                const map = { 'Analytics': 'analytics', 'Knowledge Base': 'knowledge', 'Marketing Events': 'events' };
                onNavigate(map[r]);
                setMobileOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ink-500 hover:bg-surface-50 hover:text-ink-700 transition-colors"
            >
              <span>{r}</span>
              <ChevronRight size={13} className="opacity-40" />
            </button>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-surface-200">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-surface-50 cursor-pointer transition-colors">
          <Avatar initials="L" color="#4361ee" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-700 truncate">Lewis</p>
            <p className="text-xs text-ink-300">lewis@nxl.ai</p>
          </div>
          <User size={14} className="text-ink-300 flex-shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-surface-200 h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 p-2 bg-white rounded-lg shadow border border-surface-200"
      >
        <Menu size={18} className="text-ink-700" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink-900/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white h-full overflow-y-auto animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-surface-100 text-ink-400"
            >
              <X size={16} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
