import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { Transaction } from '../types';

export const TransactionsPage: React.FC = () => {
  const { transactions, formatCurrency, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Type filter
      if (selectedType !== 'all' && tx.type !== selectedType) return false;

      // Status filter
      if (selectedStatus !== 'all' && tx.status !== selectedStatus) return false;

      // Search match
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = tx.transactionId.toLowerCase().includes(q);
        const matchDesc = tx.description.toLowerCase().includes(q);
        const matchKey = tx.idempotencyKey.toLowerCase().includes(q);
        if (!matchId && !matchDesc && !matchKey) return false;
      }

      return true;
    });
  }, [transactions, searchQuery, selectedType, selectedStatus]);

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showToast('No records to export.');
      return;
    }

    const headers = ['Transaction ID', 'Type', 'Amount USD', 'Status', 'Description', 'Idempotency Key', 'Date'];
    const rows = filteredTransactions.map(t => [
      t.transactionId,
      t.type,
      t.amount,
      t.status,
      `"${t.description.replace(/"/g, '""')}"`,
      t.idempotencyKey,
      t.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `watch_earn_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Transaction ledger exported to CSV!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Audit Trail</span>
            <span aria-hidden="true">·</span>
            <span>Append-Only Ledger</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{filteredTransactions.length} records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Transaction History & Ledger
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-sky-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Transaction Types</option>
              <option value="reward_video">Sponsored Video Reward</option>
              <option value="daily_bonus">Daily Streak Bonus</option>
              <option value="reward_referral">Referral Commission</option>
              <option value="withdrawal_payout">Withdrawal Payout</option>
              <option value="withdrawal_hold">Withdrawal Balance Hold</option>
              <option value="withdrawal_refund">Withdrawal Refund</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="reversed">Reversed / Refunded</option>
            </select>
          </div>

        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Idempotency Key</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map(tx => (
                <tr key={tx.transactionId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white text-[11px]">
                    {tx.transactionId}
                  </td>
                  <td className="py-3 px-4 capitalize font-medium text-slate-700 dark:text-slate-200">
                    {tx.type.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {tx.description}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[10px]">
                    {tx.idempotencyKey}
                  </td>
                  <td className="py-3 px-4 text-slate-500 tabular-nums">
                    {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                    <span className={tx.type.includes('hold') ? 'text-amber-500' : 'text-emerald-500'}>
                      {tx.type.includes('hold') ? '-' : '+'}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold capitalize ${
                      tx.status === 'completed'
                        ? 'text-emerald-500'
                        : tx.status === 'pending'
                        ? 'text-amber-500'
                        : 'text-rose-500'
                    }`}>
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
  );
};
