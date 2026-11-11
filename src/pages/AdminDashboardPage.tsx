import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Video,
  Settings,
  FileText,
  LifeBuoy,
  Lock,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { Campaign, Withdrawal, SupportTicket } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    activeRole,
    campaigns,
    approveCampaign,
    rejectCampaign,
    withdrawals,
    approveWithdrawal,
    rejectWithdrawal,
    settings,
    updateSettings,
    auditLogs,
    tickets,
    replySupportTicket,
    toggleUserSuspension,
    formatCurrency,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'withdrawals' | 'settings' | 'audit' | 'support'>('overview');

  // Approval modal states
  const [selectedWd, setSelectedWd] = useState<Withdrawal | null>(null);
  const [txRefInput, setTxRefInput] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // Rejection modal
  const [rejectWd, setRejectWd] = useState<Withdrawal | null>(null);
  const [rejectReason, setRejectReason] = useState('Payment details unverified with mobile provider.');

  // Support reply
  const [replyTicketId, setReplyTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Editable settings
  const [minPkr, setMinPkr] = useState(settings.minWithdrawalPKR.toString());
  const [minUsd, setMinUsd] = useState(settings.minWithdrawalUSD.toString());
  const [commissionRate, setCommissionRate] = useState(settings.platformCommissionRate.toString());
  const [referralPct, setReferralPct] = useState(settings.referralCommissionPct.toString());
  const [dailyBonus, setDailyBonus] = useState(settings.dailyBonusAmount.toString());
  const [bonusEnabled, setBonusEnabled] = useState(settings.dailyBonusEnabled);

  // Security gate
  const isAuthorized = activeRole === 'admin' || currentUser?.email === 'azizkhanabdul059@gmail.com';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Lock className="w-12 h-12 text-rose-500 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Restricted Administrator Area</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This control center is restricted to authorized platform administrators ({currentUser?.email || 'Unauthorized'}). Switch to the Administrator role using the top reviewer toolbar to access.
        </p>
      </div>
    );
  }

  // Calculate platform statistics
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const totalCampaignFunding = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalCompletedWithdrawals = withdrawals.filter(w => w.status === 'approved').reduce((acc, w) => acc + w.amount, 0);

  const handleApproveWd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWd || !txRefInput) {
      showToast('Please provide a valid payment gateway transaction reference.');
      return;
    }
    approveWithdrawal(selectedWd.withdrawalId, txRefInput, adminNotesInput);
    setSelectedWd(null);
    setTxRefInput('');
    setAdminNotesInput('');
  };

  const handleRejectWd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectWd) return;
    rejectWithdrawal(rejectWd.withdrawalId, rejectReason);
    setRejectWd(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      minWithdrawalPKR: parseFloat(minPkr) || 500,
      minWithdrawalUSD: parseFloat(minUsd) || 5,
      platformCommissionRate: parseFloat(commissionRate) || 15,
      referralCommissionPct: parseFloat(referralPct) || 10,
      dailyBonusAmount: parseFloat(dailyBonus) || 0.05,
      dailyBonusEnabled: bonusEnabled
    });
  };

  const handleSendReply = (ticketId: string) => {
    if (!replyMessage.trim()) return;
    replySupportTicket(ticketId, replyMessage);
    setReplyMessage('');
    setReplyTicketId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Governance & Compliance Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            WatchEarn Pro Administration
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Admin Authority: <span className="font-mono text-slate-700 dark:text-slate-300">azizkhanabdul059@gmail.com</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingWithdrawals.length > 0 && (
            <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{pendingWithdrawals.length} Payouts Pending</span>
            </span>
          )}
          {pendingCampaigns.length > 0 && (
            <span className="px-3 py-1.5 rounded-lg bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>{pendingCampaigns.length} Campaigns Queued</span>
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Overview & Stats
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'campaigns'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Campaign Approvals</span>
          {pendingCampaigns.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-sky-500 text-white text-[10px] font-mono">
              {pendingCampaigns.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'withdrawals'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Payout Approvals</span>
          {pendingWithdrawals.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] font-mono">
              {pendingWithdrawals.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Platform Settings
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Audit & Fraud Logs
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'support'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Support Tickets</span>
          {tickets.filter(t => t.status === 'open').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-mono">
              {tickets.filter(t => t.status === 'open').length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <span className="text-xs text-slate-500">Total Campaign Deposits</span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                ${totalCampaignFunding.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                Funded by approved brand accounts
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <span className="text-xs text-slate-500">Completed Payouts</span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                ${totalCompletedWithdrawals.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                Disbursed to JazzCash, Easypaisa, PayPal
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <span className="text-xs text-slate-500">Pending Withdrawals Queue</span>
              <p className="text-2xl font-extrabold text-amber-500 font-mono tabular-nums">
                {pendingWithdrawals.length}
              </p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                Awaiting manual bank verification
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <span className="text-xs text-slate-500">Platform Revenue Commission</span>
              <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-mono tabular-nums">
                {settings.platformCommissionRate}%
              </p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                Operating margin from advertiser funds
              </p>
            </div>

          </div>

          {/* Quick System Action Banner */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Security Invariants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">Zero Direct Client Wallet Writes</p>
                <p className="text-[11px] text-slate-500">Enforced by Firestore Security Rules & Master Gate relational checks.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">Idempotent Payouts</p>
                <p className="text-[11px] text-slate-500">Every withdrawal requires admin transaction reference before marking completed.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">Tab Visibility Defense</p>
                <p className="text-[11px] text-slate-500">Automatic pause protects against bot multi-tab background completion.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campaign Approvals */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Campaign Approval Queue & Management
          </h2>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title & Advertiser</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Reward</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {campaigns.map(camp => (
                    <tr key={camp.campaignId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{camp.title}</p>
                        <p className="text-[11px] text-slate-500">{camp.advertiserName}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{camp.category}</td>
                      <td className="py-3 px-4 font-mono">{camp.requiredWatchDuration}s</td>
                      <td className="py-3 px-4 font-mono text-sky-500 font-bold">${camp.rewardAmount.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono font-semibold">${camp.budget.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold capitalize ${
                          camp.status === 'active' ? 'text-emerald-500' : camp.status === 'pending' ? 'text-amber-500' : 'text-slate-400'
                        }`}>
                          {camp.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {camp.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => approveCampaign(camp.campaignId)}
                              className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectCampaign(camp.campaignId)}
                              className="px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-500 transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-400">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Withdrawal Approvals */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Withdrawal Cash-Out Processing Queue
            </h2>
            <span className="text-xs text-slate-500">
              Never mark a withdrawal as paid without genuine transaction confirmation
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Account Details</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {withdrawals.map(wd => (
                    <tr key={wd.withdrawalId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {wd.withdrawalId}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{wd.userEmail || wd.userId}</p>
                        <p className="text-[11px] text-slate-500">{new Date(wd.requestedAt).toLocaleDateString()}</p>
                      </td>
                      <td className="py-3 px-4 font-bold uppercase text-slate-800 dark:text-slate-200">
                        {wd.paymentMethod}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        <p className="font-medium text-slate-900 dark:text-white">{wd.accountTitle}</p>
                        <p className="font-mono text-[11px] text-slate-500">{wd.accountNumber} {wd.bankName ? `(${wd.bankName})` : ''}</p>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatCurrency(wd.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold capitalize ${
                          wd.status === 'approved' ? 'text-emerald-500' : wd.status === 'pending' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {wd.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {wd.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => { setSelectedWd(wd); setTxRefInput(''); }}
                              className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors cursor-pointer"
                            >
                              Confirm Payout
                            </button>
                            <button
                              onClick={() => setRejectWd(wd)}
                              className="px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-500 transition-colors cursor-pointer"
                            >
                              Reject & Refund
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">
                            Ref: {wd.transactionRef || 'N/A'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Platform Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Platform Governance Settings</h2>
            <p className="text-xs text-slate-500">Configure financial limits, commission rates, and bonus rules</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Min. Withdrawal (PKR)</label>
                <input
                  type="number"
                  value={minPkr}
                  onChange={e => setMinPkr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Min. Withdrawal (USD)</label>
                <input
                  type="number"
                  value={minUsd}
                  onChange={e => setMinUsd(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Commission (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={e => setCommissionRate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Referral Commission (%)</label>
                <input
                  type="number"
                  value={referralPct}
                  onChange={e => setReferralPct(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Daily Streak Bonus ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dailyBonus}
                  onChange={e => setDailyBonus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="bonusToggle"
                  checked={bonusEnabled}
                  onChange={e => setBonusEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 cursor-pointer"
                />
                <label htmlFor="bonusToggle" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Enable Daily Streak Bonus
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold cursor-pointer shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 5: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Security & Compliance Audit Trail
          </h2>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Target</th>
                    <th className="py-3 px-4">Details</th>
                    <th className="py-3 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {auditLogs.map(log => (
                    <tr key={log.logId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">
                        {log.action}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {log.actorId} <span className="text-[10px] uppercase text-slate-400">({log.actorRole})</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {log.targetResource}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-sm truncate">
                        {log.details}
                      </td>
                      <td className="py-3 px-4 text-slate-500 tabular-nums">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Support Tickets */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Customer Support Inquiry Desk</h2>

          <div className="space-y-4">
            {tickets.map(tkt => (
              <div
                key={tkt.ticketId}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 text-xs">#{tkt.ticketId}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{tkt.subject}</h3>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
                      {tkt.category}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold uppercase ${
                    tkt.status === 'open' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {tkt.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {tkt.message}
                </p>

                {/* Replies list */}
                {tkt.replies && tkt.replies.length > 0 && (
                  <div className="pl-4 border-l-2 border-sky-500 space-y-2">
                    {tkt.replies.map((r, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-semibold text-sky-500 capitalize">{r.sender}: </span>
                        <span className="text-slate-600 dark:text-slate-300">{r.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply action */}
                {replyTicketId === tkt.ticketId ? (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Type official support reply..."
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                    <button
                      onClick={() => handleSendReply(tkt.ticketId)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-medium text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                    <button
                      onClick={() => setReplyTicketId(null)}
                      className="px-2 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyTicketId(tkt.ticketId)}
                    className="text-xs text-sky-500 font-semibold hover:underline cursor-pointer"
                  >
                    Reply to User →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal: Approve Withdrawal */}
      {selectedWd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Confirm Manual Payment</h2>
            <p className="text-xs text-slate-500">
              Provide the verified bank or mobile gateway reference after sending funds.
            </p>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
              <p>User: <strong className="text-slate-900 dark:text-white">{selectedWd.userEmail}</strong></p>
              <p>Amount: <strong className="text-emerald-500 font-mono">{formatCurrency(selectedWd.amount)}</strong></p>
              <p>Method: <strong className="uppercase">{selectedWd.paymentMethod}</strong></p>
              <p>Account: <strong className="font-mono">{selectedWd.accountNumber} ({selectedWd.accountTitle})</strong></p>
            </div>

            <form onSubmit={handleApproveWd} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Transaction Reference (Required)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JC-99281729 or PP-PAYOUT-4410"
                  value={txRefInput}
                  onChange={e => setTxRefInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Admin Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Disbursed via JazzCash Merchant Agent"
                  value={adminNotesInput}
                  onChange={e => setAdminNotesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedWd(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                >
                  Confirm & Finalize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectWd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Reject Withdrawal & Refund Balance</h2>
            <p className="text-xs text-slate-500">
              The locked amount ({formatCurrency(rejectWd.amount)}) will be returned immediately to the user's available balance.
            </p>

            <form onSubmit={handleRejectWd} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Reason for Rejection</label>
                <textarea
                  rows={3}
                  required
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectWd(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold cursor-pointer"
                >
                  Reject & Refund Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
