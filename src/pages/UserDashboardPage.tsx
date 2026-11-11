import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  TrendingUp,
  Clock,
  Users,
  PlayCircle,
  ArrowUpRight,
  Gift,
  CheckCircle2,
  Copy,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const {
    currentUser,
    wallet,
    transactions,
    withdrawals,
    campaigns,
    formatCurrency,
    navigateTo,
    claimDailyBonus,
    showToast
  } = useApp();

  // Calculate today's completed tasks and earnings
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTransactions = transactions.filter(tx => tx.createdAt.startsWith(todayStr));
  const todayEarned = todayTransactions.reduce((acc, tx) => acc + (tx.amount > 0 ? tx.amount : 0), 0);
  const todayVideoTasks = todayTransactions.filter(tx => tx.type === 'reward_video').length;

  const copyReferral = () => {
    const code = currentUser?.referralCode || 'WE2026';
    const link = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(link);
    showToast(`Referral link copied: ${link}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Verified Member</span>
            <span aria-hidden="true">·</span>
            <span>{currentUser?.country || 'Pakistan'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-500 font-semibold">Active Standing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Welcome back, {currentUser?.displayName || 'Member'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            UID: <span className="font-mono">{currentUser?.uid}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('campaigns')}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlayCircle className="w-4 h-4 fill-current" />
            <span>Watch Next Video</span>
          </button>
          <button
            onClick={() => navigateTo('withdraw')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Available Balance</span>
            <Wallet className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {formatCurrency(wallet.availableBalance)}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Instant Cashout Ready</span>
            <button
              onClick={() => navigateTo('withdraw')}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer"
            >
              Withdraw →
            </button>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Lifetime Earned</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            {formatCurrency(wallet.totalEarned)}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
            <span>Paid out:</span>
            <span className="font-mono">{formatCurrency(wallet.totalWithdrawn)}</span>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Pending Payouts</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
            {formatCurrency(wallet.pendingBalance)}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
            <span>Under review:</span>
            <span>{withdrawals.filter(w => w.status === 'pending').length} requests</span>
          </div>
        </div>

        {/* Referral Earnings */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Referral Earnings</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            {formatCurrency(wallet.referralEarnings)}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
            <span>Code:</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{currentUser?.referralCode || 'AZIZ2026'}</span>
          </div>
        </div>

      </div>

      {/* Two Column Section: Daily Bonus + Referral Quick Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Streak Bonus Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Gift className="w-4 h-4" />
              <span>Free Daily Bonus</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Claim Today's Activity Bonus
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Active members can claim a daily bonus funded by platform advertising revenues. Come back every 24 hours to keep your streak going!
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
              +{formatCurrency(0.05)}
            </span>
            <button
              onClick={claimDailyBonus}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              Claim Daily Bonus
            </button>
          </div>
        </div>

        {/* Share Referral Quick Banner */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
              <Users className="w-4 h-4" />
              <span>Referral Network · Earn 10% Commission</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Invite Friends & Colleagues
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive 10% bonus credit whenever your referred members complete verified sponsor campaigns. Unlimited friends, zero limits.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 truncate">
              {window.location.origin}/?ref={currentUser?.referralCode || 'WE2026'}
            </div>
            <button
              onClick={copyReferral}
              className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

      </div>

      {/* Today's Activity & Recent Transactions Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Verified Activity & Ledger
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Today: {todayVideoTasks} video tasks completed · {formatCurrency(todayEarned)} earned
            </p>
          </div>
          <button
            onClick={() => navigateTo('transactions')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
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
                {transactions.slice(0, 5).map(tx => (
                  <tr key={tx.transactionId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {tx.type === 'reward_video' ? 'Video View' : tx.type === 'daily_bonus' ? 'Daily Streak' : tx.type === 'reward_referral' ? 'Referral Bonus' : 'Payout'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {tx.description}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {tx.transactionId.slice(0, 14)}...
                    </td>
                    <td className="py-3 px-4 text-slate-500 tabular-nums">
                      {new Date(tx.createdAt).toLocaleDateString()}
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
