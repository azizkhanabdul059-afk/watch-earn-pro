import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  PlayCircle,
  Search,
  Filter,
  Clock,
  Globe2,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Campaign } from '../types';

export const CampaignsPage: React.FC = () => {
  const { campaigns, setActiveCampaign, formatCurrency } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Finance', 'Education'];
  const countries = ['All', 'Pakistan', 'International', 'United States'];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(camp => {
      // Must be active
      if (camp.status !== 'active') return false;

      // Search match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = camp.title.toLowerCase().includes(query);
        const matchesAdv = camp.advertiserName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAdv) return false;
      }

      // Category match
      if (selectedCategory !== 'All' && camp.category !== selectedCategory) {
        return false;
      }

      // Country match
      if (selectedCountry !== 'All') {
        const hasCountry = camp.targetCountries.some(
          c => c.toLowerCase() === selectedCountry.toLowerCase() || c === 'International'
        );
        if (!hasCountry) return false;
      }

      return true;
    });
  }, [campaigns, searchQuery, selectedCountry, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Explore</span>
          <span aria-hidden="true">·</span>
          <span>Sponsored Broadcasts</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{filteredCampaigns.length} campaigns available</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Available Sponsored Video Campaigns
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Watch approved sponsor videos to credit your wallet balance. All campaigns are pre-funded with verified advertiser budgets.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, brand, or topic..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="py-2 px-3 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Regions' : c}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Filter Buttons (Interactive Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 text-xs font-medium mr-1">Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No campaigns match your filters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Regions", or choosing a different category.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCountry('All'); setSelectedCategory('All'); }}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(camp => (
            <div
              key={camp.campaignId}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-sky-500/50 transition-all flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={camp.thumbnail}
                  alt={camp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {camp.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-500 text-slate-950 text-xs font-bold font-mono px-2.5 py-1 rounded shadow">
                  +{formatCurrency(camp.rewardAmount)}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{camp.advertiserName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {camp.requiredWatchDuration}s
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="text-slate-700 dark:text-slate-200 font-mono tabular-nums">{camp.remainingSlots}</strong> slots left
                    </span>
                    <span>Daily limit: {camp.dailyCompletionLimit}</span>
                  </div>

                  <button
                    onClick={() => setActiveCampaign(camp)}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4 fill-current" />
                    <span>Watch & Claim Reward</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
