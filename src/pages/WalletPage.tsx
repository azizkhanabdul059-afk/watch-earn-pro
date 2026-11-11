import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet as WalletIcon,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Gift,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard
} from 'lucide-react';

export const WalletPage: React.FC = () => {
  const {
    wallet,
    transactions,
    formatCurrency,
    navigateTo,
    claimDailyBonus,
    settings
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');

  // Filter transactions
  const filteredTx = transactions.filter(tx => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  const videoEarnings = transactions
    .filter(t => t.type === 'reward_video')
    .reduce((acc, t) => acc + t.amount, 0);

  const referralEarnings = transactions
    .filter(t => t.type === 'reward_referral')
    .reduce((acc, t) => acc + t.amount, 0);

  const bonusEarnings = transactions
    .filter(t => t.type === 'daily_bonus')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Fintech Rewards</span>
            <span aria-hidden="true">·</span>
            <span>Immutable Ledger</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">PKR & USD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Wallet & Earnings Overview
          </h1>
        </div>

        <button
          onClick={() => navigateTo('withdraw')}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>Request Withdrawal</span>
        </button>
      </div>

      {/* Main Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Available Card */}
        <div className="p-6 rounded-2xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
            <span>Available Balance</span>
            <WalletIcon className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {formatCurrency(wallet.availableBalance)}
          </p>
          <div className="pt-2 border-t border-sky-500/20 flex items-center justify-between text-xs">
            <span className="text-slate-500">Ready for instant payout</span>
            <button
              onClick={() => navigateTo('withdraw')}
              className="text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
            >
              Withdraw Now →
            </button>
          </div>
        </div>

        {/* Pending Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-500">
            <span>Pending Payouts</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
            {formatCurrency(wallet.pendingBalance)}
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Locked during bank verification
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-500">
            <span>Lifetime Earned</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            {formatCurrency(wallet.totalEarned)}
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span>Withdrawn:</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{formatCurrency(wallet.totalWithdrawn)}</span>
          </div>
        </div>

      </div>

      {/* Revenue Breakdown by Channel */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Earnings Breakdown by Source</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Sponsored Video Views</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">{formatCurrency(videoEarnings)}</p>
            <p className="text-[11px] text-slate-400">Direct viewer broadcast rewards</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Referral Commissions</span>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono tabular-nums">{formatCurrency(referralEarnings)}</p>
            <p className="text-[11px] text-slate-400">10% tier from invite completions</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Daily Streak Bonuses</span>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{formatCurrency(bonusEarnings)}</p>
            <p className="text-[11px] text-slate-400">Free daily member activity grants</p>
          </div>
        </div>
      </div>

      {/* Immutable Transaction Ledger */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Financial Transaction Ledger</h2>
            <p className="text-xs text-slate-500">Cryptographically auditable and idempotent credits/debits</p>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
            {['all', 'reward_video', 'daily_bonus', 'reward_referral', 'withdrawal_payout'].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer capitalize ${
                  filterType === t
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t === 'all' ? 'All' : t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTx.map(tx => (
                  <tr key={tx.transactionId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white capitalize">
                      {tx.type.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-sm truncate">
                      {tx.description}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {tx.transactionId}
                    </td>
                    <td className="py-3 px-4 text-slate-500 tabular-nums">
                      {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      +{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold capitalize">
                        {tx.status}
                      </span>
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
