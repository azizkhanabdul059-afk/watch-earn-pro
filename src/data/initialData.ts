import { Campaign, AdminSettings, Transaction, Withdrawal, SupportTicket } from '../types';

export const INITIAL_SETTINGS: AdminSettings = {
  platformCommissionRate: 15,
  minWithdrawalPKR: 500,
  minWithdrawalUSD: 5,
  referralCommissionPct: 10,
  dailyBonusAmount: 0.05,
  dailyBonusEnabled: true,
  supportedCountries: ['Pakistan', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Saudi Arabia', 'Germany', 'India'],
  fraudSensitivity: 'strict',
  maintenanceMode: false,
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    campaignId: 'camp-tech-01',
    advertiserId: 'adv-nexus-01',
    advertiserName: 'Nexus Tech Global',
    title: 'NextGen Smart Home Hub 2026 Innovation Showcase',
    description: 'Discover the next evolution of home automation. View the 30-second official feature spotlight to learn how the connected hub optimizes ambient comfort.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: '/src/assets/images/campaign_tech_showcase_1794374593789.jpg',
    category: 'Tech',
    rewardAmount: 0.15,
    requiredWatchDuration: 30,
    totalSlots: 5000,
    remainingSlots: 4120,
    completedCount: 880,
    targetCountries: ['Pakistan', 'International', 'United States', 'United Kingdom'],
    dailyCompletionLimit: 1,
    status: 'active',
    budget: 750,
    remainingBudget: 618,
    createdAt: '2026-11-01T10:00:00Z',
    expiresAt: '2026-12-31T23:59:59Z'
  },
  {
    campaignId: 'camp-fintech-02',
    advertiserId: 'adv-finova-02',
    advertiserName: 'GlobalPay Financial Inc.',
    title: 'GlobalPay Cross-Border Zero-Fee Digital Wallet',
    description: 'Watch the official product reveal of GlobalPay virtual cards with instant multi-currency conversion and bank settlement across 60+ countries.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: '/src/assets/images/campaign_fintech_mobile_1794374593274.jpg',
    category: 'Finance',
    rewardAmount: 0.20,
    requiredWatchDuration: 35,
    totalSlots: 8000,
    remainingSlots: 6240,
    completedCount: 1760,
    targetCountries: ['Pakistan', 'International', 'United Arab Emirates', 'Saudi Arabia'],
    dailyCompletionLimit: 1,
    status: 'active',
    budget: 1600,
    remainingBudget: 1248,
    createdAt: '2026-11-03T12:00:00Z',
    expiresAt: '2026-12-31T23:59:59Z'
  },
  {
    campaignId: 'camp-rewards-03',
    advertiserId: 'adv-fintech-03',
    advertiserName: 'OmniStream Digital Media',
    title: 'Fintech Rewards & Global Financial Connectivity 2026',
    description: 'An in-depth look into decentralized digital payment streams and instant micro-reward verification pipelines.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: '/src/assets/images/hero_fintech_rewards_platform_1794374592730.jpg',
    category: 'Finance',
    rewardAmount: 0.18,
    requiredWatchDuration: 25,
    totalSlots: 6000,
    remainingSlots: 4890,
    completedCount: 1110,
    targetCountries: ['Pakistan', 'International', 'United States'],
    dailyCompletionLimit: 1,
    status: 'active',
    budget: 1080,
    remainingBudget: 880.2,
    createdAt: '2026-11-05T09:30:00Z',
    expiresAt: '2026-12-15T23:59:59Z'
  },
  {
    campaignId: 'camp-edu-04',
    advertiserId: 'adv-edutech-04',
    advertiserName: 'FutureSkills Online Institute',
    title: 'Cloud Engineering & Modern Web Architecture Masterclass',
    description: 'Watch the curriculum trailer for the upcoming professional cloud engineering scholarship program open for international participants.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: '/src/assets/images/campaign_tech_showcase_1794374593789.jpg',
    category: 'Education',
    rewardAmount: 0.12,
    requiredWatchDuration: 20,
    totalSlots: 4000,
    remainingSlots: 3100,
    completedCount: 900,
    targetCountries: ['Pakistan', 'International'],
    dailyCompletionLimit: 1,
    status: 'active',
    budget: 480,
    remainingBudget: 372,
    createdAt: '2026-11-06T15:00:00Z',
    expiresAt: '2026-12-20T23:59:59Z'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    transactionId: 'tx-init-01',
    userId: 'demo-user-id',
    type: 'reward_video',
    amount: 0.20,
    status: 'completed',
    idempotencyKey: 'idemp_camp_fintech_01',
    referenceId: 'camp-fintech-02',
    description: 'Reward for verified viewing: GlobalPay Cross-Border',
    createdAt: '2026-11-09T18:22:10Z'
  },
  {
    transactionId: 'tx-init-02',
    userId: 'demo-user-id',
    type: 'daily_bonus',
    amount: 0.05,
    status: 'completed',
    idempotencyKey: 'idemp_daily_20261109',
    referenceId: 'daily_bonus',
    description: 'Daily activity reward bonus',
    createdAt: '2026-11-09T08:14:02Z'
  },
  {
    transactionId: 'tx-init-03',
    userId: 'demo-user-id',
    type: 'reward_referral',
    amount: 0.10,
    status: 'completed',
    idempotencyKey: 'idemp_ref_7781',
    referenceId: 'ref-7781',
    description: 'Referral commission: Task completed by member #7781',
    createdAt: '2026-11-08T14:40:55Z'
  }
];

export const INITIAL_WITHDRAWALS: Withdrawal[] = [
  {
    withdrawalId: 'wd-2026-001',
    userId: 'demo-user-id',
    userEmail: 'user@watch-earn.pro',
    amount: 10.00,
    paymentMethod: 'jazzcash',
    accountTitle: 'Abdul Aziz',
    accountNumber: '03001234567',
    status: 'approved',
    transactionRef: 'JC-994821033',
    adminNotes: 'Verified and paid via JazzCash Merchant Gateway.',
    requestedAt: '2026-11-02T11:20:00Z',
    processedAt: '2026-11-02T13:45:00Z'
  },
  {
    withdrawalId: 'wd-2026-002',
    userId: 'demo-user-id',
    userEmail: 'user@watch-earn.pro',
    amount: 5.50,
    paymentMethod: 'easypaisa',
    accountTitle: 'Abdul Aziz',
    accountNumber: '03459876543',
    status: 'approved',
    transactionRef: 'EP-44781920',
    adminNotes: 'Direct Easypaisa settlement confirmed.',
    requestedAt: '2026-11-05T09:15:00Z',
    processedAt: '2026-11-05T10:30:00Z'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    ticketId: 'tkt-8821',
    userId: 'demo-user-id',
    userEmail: 'user@watch-earn.pro',
    subject: 'Easypaisa payout delivery time inquiry',
    category: 'Withdrawal',
    message: 'Hello, what is the typical processing window for Easypaisa transfers on weekends?',
    status: 'resolved',
    createdAt: '2026-11-04T12:00:00Z',
    replies: [
      {
        sender: 'support',
        text: 'All Pakistan withdrawals (JazzCash, Easypaisa, Bank Transfer) are processed manually within 2 to 6 business hours. Weekend requests are finalized same day.',
        time: '2026-11-04T12:45:00Z'
      }
    ]
  }
];
