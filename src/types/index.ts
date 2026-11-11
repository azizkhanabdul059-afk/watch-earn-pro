export type UserRole = 'user' | 'advertiser' | 'admin';
export type AccountStatus = 'active' | 'suspended';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  country: string;
  role: UserRole;
  status: AccountStatus;
  referralCode: string;
  referredBy?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AdvertiserProfile {
  advertiserId: string;
  companyName: string;
  contactEmail: string;
  website: string;
  balance: number;
  totalSpent: number;
  verified: boolean;
  status: AccountStatus;
  createdAt: string;
}

export type CampaignStatus = 'pending' | 'active' | 'paused' | 'completed' | 'rejected';

export interface Campaign {
  campaignId: string;
  advertiserId: string;
  advertiserName: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: 'Tech' | 'Finance' | 'E-commerce' | 'Gaming' | 'Education' | 'Lifestyle';
  rewardAmount: number; // in USD (or converted to PKR)
  requiredWatchDuration: number; // in seconds
  totalSlots: number;
  remainingSlots: number;
  completedCount: number;
  targetCountries: string[]; // e.g. ['Pakistan', 'International', 'USA', 'UK']
  dailyCompletionLimit: number;
  status: CampaignStatus;
  budget: number;
  remainingBudget: number;
  createdAt: string;
  expiresAt: string;
}

export interface CampaignSession {
  sessionId: string;
  campaignId: string;
  userId: string;
  token: string;
  status: 'started' | 'verifying' | 'completed' | 'expired' | 'fraud_flagged';
  watchTimeSeconds: number;
  clientFingerprint: string;
  startedAt: string;
  completedAt?: string;
}

export interface Wallet {
  userId: string;
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  referralEarnings: number;
  updatedAt: string;
}

export type TransactionType =
  | 'reward_video'
  | 'reward_referral'
  | 'daily_bonus'
  | 'withdrawal_hold'
  | 'withdrawal_payout'
  | 'withdrawal_refund'
  | 'deposit_advertiser';

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'reversed';

export interface Transaction {
  transactionId: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  idempotencyKey: string;
  referenceId: string;
  description: string;
  createdAt: string;
}

export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'paypal' | 'crypto_usdt';

export interface Withdrawal {
  withdrawalId: string;
  userId: string;
  userEmail?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  accountTitle: string;
  accountNumber: string;
  bankName?: string;
  status: 'pending' | 'approved' | 'rejected';
  transactionRef?: string;
  adminNotes?: string;
  proofUrl?: string;
  requestedAt: string;
  processedAt?: string;
}

export interface ReferralRecord {
  referralId: string;
  referrerId: string;
  referredUserId: string;
  referredEmail: string;
  commissionEarned: number;
  status: 'active' | 'pending_task';
  createdAt: string;
}

export interface SupportTicket {
  ticketId: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'Withdrawal' | 'Task Verification' | 'Advertiser' | 'Account' | 'Other';
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  replies?: {
    sender: 'user' | 'support';
    text: string;
    time: string;
  }[];
}

export interface NotificationItem {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'reward' | 'withdrawal' | 'campaign';
  read: boolean;
  createdAt: string;
}

export interface AdminSettings {
  platformCommissionRate: number; // percentage, e.g. 15
  minWithdrawalPKR: number; // e.g. 500 PKR
  minWithdrawalUSD: number; // e.g. 5 USD
  referralCommissionPct: number; // e.g. 10
  dailyBonusAmount: number; // e.g. 0.05 USD
  dailyBonusEnabled: boolean;
  supportedCountries: string[];
  fraudSensitivity: 'low' | 'balanced' | 'strict';
  maintenanceMode: boolean;
}

export interface AuditLog {
  logId: string;
  actorId: string;
  actorRole: string;
  action: string;
  targetResource: string;
  details: string;
  timestamp: string;
}

export type PageId =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'campaigns'
  | 'user-dashboard'
  | 'advertiser-dashboard'
  | 'register'
  | 'login'
  | 'wallet'
  | 'withdraw'
  | 'referrals'
  | 'transactions'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'advertiser-register'
  | 'admin';
