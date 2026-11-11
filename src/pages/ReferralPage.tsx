import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Copy,
  CheckCircle2,
  TrendingUp,
  Share2,
  Gift,
  ShieldCheck,
  Award
} from 'lucide-react';

export const ReferralPage: React.FC = () => {
  const {
    currentUser,
    referrals,
    wallet,
    formatCurrency,
    settings,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const referralCode = currentUser?.referralCode || 'AZIZ2026';
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast(`Referral link copied to clipboard!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Growth Network</span>
          <span aria-hidden="true">·</span>
          <span>Commission Tier: {settings.referralCommissionPct}%</span>
          <span aria-hidden="true">·</span>
          <span>Unlimited Tier 1 Attribution</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Referral Program & Partner Network
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Share WatchEarn Pro with friends, content creators, and colleagues. You earn a perpetual {settings.referralCommissionPct}% bonus on every verified sponsored video campaign they complete.
        </p>
      </div>

      {/* Referral Link & Code Box */}
      <div className="p-6 sm:p-8 rounded-2xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Your Exclusive Invitation Link
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-white truncate shadow-inner">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When a user signs up using your link, their account is permanently attributed to your UID.
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-1">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Your Referral Code</span>
            <p className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400 tracking-wider">
              {referralCode}
            </p>
            <p className="text-[11px] text-slate-400">Can be entered during registration</p>
          </div>

        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <span className="text-xs text-slate-500">Total Referrals</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {referrals.length}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Registered via your link
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <span className="text-xs text-slate-500">Active Contributors</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            {referrals.filter(r => r.status === 'active').length}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Completed at least 1 video task
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <span className="text-xs text-slate-500">Referral Commission Rate</span>
          <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-mono tabular-nums">
            {settings.referralCommissionPct}%
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Funded by platform advertising pool
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <span className="text-xs text-slate-500">Total Referral Earnings</span>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            {formatCurrency(wallet.referralEarnings)}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Credited directly to available balance
          </p>
        </div>

      </div>

      {/* Rules & Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">1</div>
          <h3 className="font-bold text-slate-900 dark:text-white">Share Your Unique Link</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Send your invitation link via WhatsApp, Telegram, Twitter, or YouTube video descriptions.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">2</div>
          <h3 className="font-bold text-slate-900 dark:text-white">They Watch Sponsored Videos</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Your friend signs up for free with zero deposit. Every time they watch an approved campaign, they receive full reward.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">3</div>
          <h3 className="font-bold text-slate-900 dark:text-white">You Get 10% Extra Bonus</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Platform algorithm credits a 10% matching grant to your wallet. Your friend loses zero cents.
          </p>
        </div>
      </div>

      {/* Active Referrals Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Attributed Referrals Network
        </h2>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Member ID</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Commission Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {referrals.map(ref => (
                  <tr key={ref.referralId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {ref.referredUserId}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {ref.referredEmail}
                    </td>
                    <td className="py-3 px-4 text-slate-500 tabular-nums">
                      {new Date(ref.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-500 font-semibold capitalize">
                        {ref.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      +{formatCurrency(ref.commissionEarned)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
