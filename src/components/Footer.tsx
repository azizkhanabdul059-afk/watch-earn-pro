import React from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, ShieldCheck, Lock, Globe, Heart } from 'lucide-react';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Section: Brand + Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                <PlayCircle className="w-5 h-5 fill-current" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                WatchEarn<span className="text-sky-500">Pro</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              International fintech rewards platform connecting genuine advertisers with voluntary viewers in Pakistan and globally. Zero investment required, fully verified payout ledger.
            </p>

            {/* Payout badges */}
            <div>
              <p className="text-[11px] font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2">
                Supported Payout Providers
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold font-mono text-[11px]">
                  JazzCash
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[11px]">
                  Easypaisa
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400 font-semibold font-mono text-[11px]">
                  1-Link Banks
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-semibold font-mono text-[11px]">
                  PayPal
                </span>
              </div>
            </div>
          </div>

          {/* Column 1: For Members */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-200 text-xs uppercase tracking-wider">
              Earn Rewards
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('campaigns')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Available Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('user-dashboard')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  User Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wallet')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Wallet & Ledger
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('withdraw')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Request Payout
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('referrals')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Referral Network
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('transactions')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Transaction History
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Advertisers */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-200 text-xs uppercase tracking-wider">
              For Brands
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('advertiser-dashboard')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Advertiser Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('advertiser-register')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Brand Onboarding
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Campaign Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-amber-500 transition-colors font-medium cursor-pointer">
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Trust */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-200 text-xs uppercase tracking-wider">
              Legal & Trust
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  About WatchEarn
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Support & Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-sky-500 transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Anti-Fraud Disclaimer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
            <span>Advertising Compliance & Anti-Fraud Commitment</span>
          </div>
          <p>
            WatchEarn Pro operates exclusively with verified direct advertiser promotional budgets. We strictly forbid artificial traffic generation, automated click-bots, or simulated ad views. Non-rewarded ad networks (such as Google AdSense) are NEVER integrated into reward-granting workflows. Zero investment is required from participants. Earnings are based purely on valid completion of approved advertiser campaigns.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 dark:text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} WatchEarn Pro International. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Server-side Verified</span>
            <span aria-hidden="true">·</span>
            <span>Immutable Ledger</span>
            <span aria-hidden="true">·</span>
            <span>PKR & USD Settlements</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
