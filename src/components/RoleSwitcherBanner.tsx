import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Video, UserCheck, AlertTriangle } from 'lucide-react';
import { UserRole } from '../types';

export const RoleSwitcherBanner: React.FC = () => {
  const { activeRole, switchActiveRole, currentUser, settings } = useApp();

  return (
    <aside aria-label="Reviewer perspective toolbar" className="w-full bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">Reviewer Test Bar:</span>
          <span className="text-slate-400">Current View:</span>
          <span className="font-bold text-sky-400 uppercase tracking-wide">{activeRole}</span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-slate-400">Account: {currentUser?.email || 'Guest'}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 px-1 hidden lg:inline">Switch Perspective:</span>
          
          <button
            onClick={() => switchActiveRole('user')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'user'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Viewer / User</span>
          </button>

          <button
            onClick={() => switchActiveRole('advertiser')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'advertiser'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Advertiser</span>
          </button>

          <button
            onClick={() => switchActiveRole('admin')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
