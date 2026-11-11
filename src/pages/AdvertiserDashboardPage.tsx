import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Video,
  DollarSign,
  PlusCircle,
  Eye,
  CheckCircle2,
  Clock,
  Globe2,
  AlertCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Campaign } from '../types';

export const AdvertiserDashboardPage: React.FC = () => {
  const {
    advertiserProfile,
    campaigns,
    createCampaign,
    depositAdvertiserBudget,
    pauseCampaign,
    formatCurrency,
    showToast
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('250');

  // New Campaign Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [thumbnail, setThumbnail] = useState('/src/assets/images/campaign_tech_showcase_1794374593789.jpg');
  const [category, setCategory] = useState<Campaign['category']>('Tech');
  const [rewardAmount, setRewardAmount] = useState('0.15');
  const [watchDuration, setWatchDuration] = useState('30');
  const [budget, setBudget] = useState('300');
  const [targetCountry, setTargetCountry] = useState('Pakistan, International');
  const [dailyLimit, setDailyLimit] = useState('1');

  const rewardNum = parseFloat(rewardAmount) || 0.15;
  const budgetNum = parseFloat(budget) || 300;
  const calculatedSlots = rewardNum > 0 ? Math.floor(budgetNum / rewardNum) : 0;

  // Filter campaigns belonging to this advertiser
  const myCampaigns = campaigns.filter(
    c => c.advertiserId === advertiserProfile?.advertiserId || c.advertiserName.includes('Nexus') || c.advertiserName.includes('Enterprise')
  );

  const totalDeliveredViews = myCampaigns.reduce((acc, c) => acc + c.completedCount, 0);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || budgetNum <= 0 || rewardNum <= 0) {
      showToast('Please fill all campaign fields with valid numbers.');
      return;
    }

    const res = createCampaign({
      advertiserName: advertiserProfile?.companyName || 'Enterprise Partner',
      title,
      description,
      videoUrl,
      thumbnail,
      category,
      rewardAmount: rewardNum,
      requiredWatchDuration: parseInt(watchDuration) || 30,
      totalSlots: calculatedSlots,
      targetCountries: targetCountry.split(',').map(s => s.trim()),
      dailyCompletionLimit: parseInt(dailyLimit) || 1,
      budget: budgetNum,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    if (res.success) {
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (!amt || amt <= 0) return;
    depositAdvertiserBudget(amt);
    setShowDepositModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Enterprise Advertising Studio</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-500 font-semibold">Verified Partner</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {advertiserProfile?.companyName || 'Advertiser Console'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Target high-intent audiences with verifiable video engagement and zero bot traffic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDepositModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            + Add Budget Funds
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch New Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Advertising Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            ${advertiserProfile?.balance.toFixed(2) || '1,450.00'}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Available to fund new video slots
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Budget Spent</span>
            <TrendingUp className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            ${advertiserProfile?.totalSpent.toFixed(2) || '3,200.00'}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            Over lifetime active campaigns
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Verified Video Views</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            {totalDeliveredViews.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            100% human with focus verification
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Active Campaigns</span>
            <Video className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {myCampaigns.filter(c => c.status === 'active').length}
          </p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
            {myCampaigns.filter(c => c.status === 'pending').length} pending admin review
          </p>
        </div>

      </div>

      {/* Campaigns Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Campaign Performance & Slots
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time slot countdown, budget consumption, and status
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Campaign Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Watch Time</th>
                  <th className="py-3 px-4">Reward/View</th>
                  <th className="py-3 px-4">Completed</th>
                  <th className="py-3 px-4">Remaining Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {myCampaigns.map(camp => (
                  <tr key={camp.campaignId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                      {camp.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {camp.category}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {camp.requiredWatchDuration}s
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-sky-600 dark:text-sky-400">
                      ${camp.rewardAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {camp.completedCount.toLocaleString()} / {camp.totalSlots.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      ${camp.remainingBudget.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold capitalize ${
                          camp.status === 'active'
                            ? 'text-emerald-500'
                            : camp.status === 'pending'
                            ? 'text-amber-500'
                            : camp.status === 'paused'
                            ? 'text-slate-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {camp.status === 'active' || camp.status === 'paused' ? (
                        <button
                          onClick={() => pauseCampaign(camp.campaignId)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {camp.status === 'active' ? 'Pause' : 'Resume'}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Awaiting Admin</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Launch New Video Campaign</h2>
                <p className="text-xs text-slate-500">Subject to administrator review and verified deposit funding</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer text-xs">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Electric Scooter Launch Spotlight"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Description & User Instructions</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Briefly describe what users will learn about in this video..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Target Countries</label>
                  <input
                    type="text"
                    value={targetCountry}
                    onChange={e => setTargetCountry(e.target.value)}
                    placeholder="e.g. Pakistan, International"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Watch Duration (s)</label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    value={watchDuration}
                    onChange={e => setWatchDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Reward Per View ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.05"
                    max="5.00"
                    value={rewardAmount}
                    onChange={e => setRewardAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Campaign Budget ($)</label>
                  <input
                    type="number"
                    min="50"
                    step="10"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Slot Calculation Summary */}
              <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 text-sky-800 dark:text-sky-300 flex items-center justify-between">
                <span>Calculated Guaranteed Viewer Slots:</span>
                <span className="font-mono font-bold text-sm">{calculatedSlots.toLocaleString()} valid views</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Funds Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Fund Advertising Balance</h2>
            <p className="text-xs text-slate-500">
              Add test or production balance to allocate toward user video completion rewards.
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Deposit Amount (USD)</label>
                <input
                  type="number"
                  min="50"
                  step="25"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
