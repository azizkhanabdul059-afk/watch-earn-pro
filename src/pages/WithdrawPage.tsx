import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { PaymentMethod } from '../types';

export const WithdrawPage: React.FC = () => {
  const {
    wallet,
    withdrawals,
    requestWithdrawal,
    formatCurrency,
    currency,
    usdToPkrRate,
    settings,
    showToast
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('jazzcash');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('Meezan Bank');
  const [amountInput, setAmountInput] = useState('');

  // Determine minimum threshold in USD
  const isPakistanMethod = selectedMethod === 'jazzcash' || selectedMethod === 'easypaisa' || selectedMethod === 'bank_transfer';
  const minThresholdUSD = isPakistanMethod ? (settings.minWithdrawalPKR / usdToPkrRate) : settings.minWithdrawalUSD;

  const enteredAmountUSD = parseFloat(amountInput) || 0;
  const isAmountValid = enteredAmountUSD >= minThresholdUSD && enteredAmountUSD <= wallet.availableBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountTitle || !accountNumber || !enteredAmountUSD) {
      showToast('Please fill all required payment details.');
      return;
    }

    if (!isAmountValid) {
      showToast(`Amount must be at least ${formatCurrency(minThresholdUSD)} and cannot exceed available balance.`);
      return;
    }

    const res = requestWithdrawal({
      amount: enteredAmountUSD,
      paymentMethod: selectedMethod,
      accountTitle,
      accountNumber,
      bankName: selectedMethod === 'bank_transfer' ? bankName : undefined
    });

    if (res.success) {
      setAmountInput('');
      setAccountNumber('');
      setAccountTitle('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Payout Gateways</span>
          <span aria-hidden="true">·</span>
          <span>Zero Commission Fees</span>
          <span aria-hidden="true">·</span>
          <span>Manual Admin Settlement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Request Reward Withdrawal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Withdraw your verified balance to JazzCash, Easypaisa, Pakistani bank accounts, or PayPal. Funds are reserved automatically and disbursed within 2 to 6 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Withdrawal Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          
          {/* Step 1: Choose Payout Method */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Select Payout Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              <button
                type="button"
                onClick={() => setSelectedMethod('jazzcash')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMethod === 'jazzcash'
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-900 dark:text-white ring-1 ring-sky-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="font-bold text-xs text-slate-900 dark:text-white">JazzCash</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Mobile Account</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 font-semibold">Min: Rs 500</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('easypaisa')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMethod === 'easypaisa'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="font-bold text-xs text-emerald-600 dark:text-emerald-400">Easypaisa</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Direct Wallet</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 font-semibold">Min: Rs 500</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMethod === 'bank_transfer'
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-900 dark:text-white ring-1 ring-sky-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="font-bold text-xs text-sky-600 dark:text-sky-400">1-Link Bank</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Any PK Bank</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 font-semibold">Min: Rs 1,000</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('paypal')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-slate-900 dark:text-white ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="font-bold text-xs text-blue-600 dark:text-blue-400">PayPal</p>
                <p className="text-[10px] text-slate-500 mt-0.5">International</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 font-semibold">Min: $5.00</p>
              </button>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Account Title */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Account Title / Receiver Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Abdul Aziz (Exact title on account)"
                value={accountTitle}
                onChange={e => setAccountTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Account Number / Mobile Number */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                {selectedMethod === 'paypal' ? 'PayPal Email Address' : selectedMethod === 'bank_transfer' ? 'IBAN or Account Number' : 'Mobile Account Number'}
              </label>
              <input
                type="text"
                required
                placeholder={selectedMethod === 'paypal' ? 'e.g. your-email@domain.com' : 'e.g. 03001234567'}
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Bank Name if 1-Link */}
            {selectedMethod === 'bank_transfer' && (
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Bank Name
                </label>
                <select
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="Meezan Bank">Meezan Bank Ltd.</option>
                  <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                  <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                  <option value="Bank Alfalah">Bank Alfalah</option>
                  <option value="MCB Bank">MCB Bank Limited</option>
                  <option value="Faysal Bank">Faysal Bank</option>
                  <option value="Standard Chartered">Standard Chartered Pakistan</option>
                </select>
              </div>
            )}

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-slate-700 dark:text-slate-300">
                  Withdrawal Amount (USD)
                </label>
                <span className="text-[11px] text-slate-500">
                  Available: <strong className="font-mono text-slate-900 dark:text-white">{formatCurrency(wallet.availableBalance)}</strong>
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  required
                  min={minThresholdUSD}
                  max={wallet.availableBalance}
                  placeholder={`Min ${minThresholdUSD.toFixed(2)}`}
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setAmountInput(wallet.availableBalance.toString())}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  MAX
                </button>
              </div>
              
              {enteredAmountUSD > 0 && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                  Equivalent in PKR: Rs {(enteredAmountUSD * usdToPkrRate).toFixed(0)} (Rate: 1 USD = Rs {usdToPkrRate})
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isAmountValid}
                className={`w-full py-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isAmountValid
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Submit Withdrawal Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

        {/* Right Column: Policy & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Payout Security Invariants</span>
            </div>

            <ul className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Balance Reservation:</strong> Funds are automatically locked into "Pending" status to prevent duplicate withdrawals or concurrent overdrafts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Manual Verification:</strong> An authorized administrator reviews account titles against mobile network registries to guarantee accurate receipt.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Refund Guarantee:</strong> If an account number is entered incorrectly, the administrator will reject the request and the funds will instantly bounce back to your Available Balance.
                </span>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-800 dark:text-sky-300 text-[11px] space-y-1">
              <p className="font-semibold">Processing Timeline</p>
              <p>JazzCash & Easypaisa: 2 - 4 hours</p>
              <p>Pakistani Banks (1-Link): Same business day</p>
              <p>PayPal International: 6 - 12 hours</p>
            </div>
          </div>

        </div>

      </div>

      {/* Withdrawal History Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Your Withdrawal History
        </h2>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Account Number</th>
                  <th className="py-3 px-4">Requested At</th>
                  <th className="py-3 px-4 font-mono">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Transaction Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {withdrawals.map(wd => (
                  <tr key={wd.withdrawalId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {wd.withdrawalId}
                    </td>
                    <td className="py-3 px-4 font-semibold uppercase text-slate-900 dark:text-white">
                      {wd.paymentMethod}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {wd.accountNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-500 tabular-nums">
                      {new Date(wd.requestedAt).toLocaleDateString()}
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
                    <td className="py-3 px-4 text-right font-mono text-slate-500 text-[11px]">
                      {wd.transactionRef || 'Pending Review'}
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
