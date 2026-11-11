import React from 'react';
import { useApp } from '../context/AppContext';
import {
  PlayCircle,
  ShieldCheck,
  TrendingUp,
  Zap,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Lock,
  Wallet,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, campaigns, setActiveCampaign, formatCurrency } = useApp();

  const activeCampaignsList = campaigns.filter(c => c.status === 'active').slice(0, 3);

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Free · No Investment Scheme · Funded by Direct Advertisers</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                Watch Approved Brand Campaigns. Earn Real Rewards.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                WatchEarn Pro is the international micro-reward network connecting voluntary viewers with genuine advertiser video campaigns. Payouts processed directly to <strong className="text-slate-900 dark:text-white">JazzCash, Easypaisa, Bank Transfer, and PayPal</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('campaigns')}
                  className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <PlayCircle className="w-4 h-4 fill-current" />
                  <span>Browse Available Campaigns</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('advertiser-dashboard')}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Advertise With Us</span>
                </button>
              </div>

              {/* Zero-Pill Quiet Micro-Trust Signals */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Zero deposit required</span>
                <span aria-hidden="true">·</span>
                <span>Minimum withdrawal $5 / Rs 500</span>
                <span aria-hidden="true">·</span>
                <span>Anti-bot protected</span>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950 aspect-video lg:aspect-4/3 group">
                <img
                  src="/src/assets/images/hero_fintech_rewards_platform_1794374592730.jpg"
                  alt="WatchEarn Pro global rewards network"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Scrim with Live Metric */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold">Live Payout Stream Active</span>
                    </div>
                    <span className="font-mono text-sky-400">PKR & USD Settlements</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Atomic transaction ledger with server-side validation and anti-speedhack verification.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Claim-to-Proof Adjacency Strip */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 shadow-xs">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Distributed Rewards</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
                $48,920.00
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">100% verified ledger payouts</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Earners</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
                14,350+
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Pakistan & International</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Payout Time</p>
              <p className="text-xl sm:text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-mono tabular-nums mt-0.5">
                2 - 6 Hours
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Manual admin confirmation</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Required Investment</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums mt-0.5">
                $0.00 (Zero)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Strict anti-Ponzi compliance</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3-Step Mechanism Chain */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Verified Reward Pipeline
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How It Works: Clean, Transparent, Funded
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Every dollar in our ecosystem is deposited by verified brand advertisers before campaigns launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Select an Approved Campaign
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse brand campaigns in technology, e-commerce, and education. Each campaign displays transparent watch times, remaining slots, and reward amounts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Watch with Active Window Focus
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our anti-cheat engine creates a cryptographically signed session. Keep the video in focus to meet the required duration without speed-skipping or multi-tab spoofing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Withdraw to JazzCash or PayPal
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rewards are credited instantly to your available balance. Request withdrawals to JazzCash, Easypaisa, 1-Link bank accounts, or PayPal as soon as you reach the minimum.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Live Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              Ready to Watch
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Featured Sponsored Campaigns
            </h2>
          </div>
          <button
            onClick={() => navigateTo('campaigns')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCampaignsList.map(camp => (
            <div
              key={camp.campaignId}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-sky-500/50 transition-all flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={camp.thumbnail}
                  alt={camp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-1 rounded">
                  {camp.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-500 text-slate-950 text-xs font-bold font-mono px-2.5 py-1 rounded shadow">
                  +{formatCurrency(camp.rewardAmount)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span>{camp.advertiserName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{camp.requiredWatchDuration}s watch</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {camp.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono tabular-nums">{camp.remainingSlots}</span> slots open
                  </div>
                  <button
                    onClick={() => setActiveCampaign(camp)}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Watch & Earn</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payout & Local Gateway Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Reliable Cash-Out Channels
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Made for Pakistan & Global Earners
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We understand that international platforms frequently lack accessible payout methods for South Asia. That's why WatchEarn Pro has first-class native workflows for <strong>JazzCash</strong>, <strong>Easypaisa</strong>, and Pakistani 1-Link bank transfers alongside <strong>PayPal</strong> and decentralized crypto.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Low minimum cashout: Rs 500 (JazzCash / Easypaisa) or $5.00 (PayPal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Manual admin inspection ensures no fraudulent chargebacks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full transaction receipts with bank reference numbers</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('withdraw')}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  View Payout Guidelines
                </button>
              </div>
            </div>

            {/* Methods Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">JazzCash</p>
                <p className="text-[11px] text-slate-500">Instant mobile account</p>
                <p className="text-xs font-mono text-emerald-500 font-semibold pt-1">Min: Rs 500</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Easypaisa</p>
                <p className="text-[11px] text-slate-500">Direct mobile wallet</p>
                <p className="text-xs font-mono text-emerald-500 font-semibold pt-1">Min: Rs 500</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
                <p className="text-xs font-bold text-sky-600 dark:text-sky-400">Bank 1-Link</p>
                <p className="text-[11px] text-slate-500">Meezan, HBL, UBL, etc.</p>
                <p className="text-xs font-mono text-emerald-500 font-semibold pt-1">Min: Rs 1,000</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">PayPal Global</p>
                <p className="text-[11px] text-slate-500">Worldwide settlements</p>
                <p className="text-xs font-mono text-emerald-500 font-semibold pt-1">Min: $5.00</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
