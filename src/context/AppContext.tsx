import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  AdvertiserProfile,
  Campaign,
  CampaignSession,
  Wallet,
  Transaction,
  Withdrawal,
  ReferralRecord,
  SupportTicket,
  NotificationItem,
  AdminSettings,
  AuditLog,
  PageId,
  UserRole,
  PaymentMethod
} from '../types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_SETTINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_TICKETS
} from '../data/initialData';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Navigation & Theme
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currency: 'USD' | 'PKR';
  setCurrency: (currency: 'USD' | 'PKR') => void;
  usdToPkrRate: number;
  formatCurrency: (usdAmount: number) => string;

  // Authentication & Role
  currentUser: UserProfile | null;
  advertiserProfile: AdvertiserProfile | null;
  activeRole: UserRole;
  switchActiveRole: (role: UserRole) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithDemo: (role: UserRole) => void;
  registerUser: (data: Partial<UserProfile>) => Promise<void>;
  registerAdvertiser: (data: Partial<AdvertiserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;

  // Platform Data
  campaigns: Campaign[];
  activeCampaign: Campaign | null;
  setActiveCampaign: (campaign: Campaign | null) => void;
  wallet: Wallet;
  transactions: Transaction[];
  withdrawals: Withdrawal[];
  referrals: ReferralRecord[];
  tickets: SupportTicket[];
  notifications: NotificationItem[];
  settings: AdminSettings;
  auditLogs: AuditLog[];

  // User Actions
  startWatchSession: (campaignId: string) => CampaignSession;
  completeWatchSession: (sessionId: string, actualWatchSeconds: number) => { success: boolean; message: string; reward?: number };
  requestWithdrawal: (data: { amount: number; paymentMethod: PaymentMethod; accountTitle: string; accountNumber: string; bankName?: string }) => { success: boolean; message: string };
  claimDailyBonus: () => { success: boolean; message: string; reward?: number };
  submitSupportTicket: (subject: string, category: SupportTicket['category'], message: string) => { success: boolean; message: string };
  replySupportTicket: (ticketId: string, replyText: string) => void;
  markNotificationRead: (notificationId: string) => void;

  // Advertiser Actions
  createCampaign: (data: Omit<Campaign, 'campaignId' | 'advertiserId' | 'status' | 'completedCount' | 'remainingSlots' | 'remainingBudget' | 'createdAt'>) => { success: boolean; message: string };
  depositAdvertiserBudget: (amount: number) => void;

  // Admin Actions
  approveCampaign: (campaignId: string) => void;
  rejectCampaign: (campaignId: string) => void;
  pauseCampaign: (campaignId: string) => void;
  approveWithdrawal: (withdrawalId: string, transactionRef: string, adminNotes?: string) => void;
  rejectWithdrawal: (withdrawalId: string, reason: string) => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  toggleUserSuspension: (userId: string) => void;

  // Toast / System message
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USD_TO_PKR = 278.50;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');

  // Navigation
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  // Active Role and Auth
  const [activeRole, setActiveRole] = useState<UserRole>('user');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // User profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    uid: 'demo-user-101',
    email: 'azizkhanabdul059@gmail.com',
    displayName: 'Abdul Aziz',
    country: 'Pakistan',
    role: 'admin', // Bootstrapped admin email
    status: 'active',
    referralCode: 'AZIZ2026',
    emailVerified: true,
    createdAt: new Date().toISOString()
  });

  const [advertiserProfile, setAdvertiserProfile] = useState<AdvertiserProfile | null>({
    advertiserId: 'adv-nexus-01',
    companyName: 'Nexus Digital Media',
    contactEmail: 'marketing@nexusdigital.io',
    website: 'https://nexusdigital.io',
    balance: 1450.00,
    totalSpent: 3200.00,
    verified: true,
    status: 'active',
    createdAt: '2026-10-15T08:00:00Z'
  });

  // Core Data
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [wallet, setWallet] = useState<Wallet>({
    userId: 'demo-user-101',
    availableBalance: 8.75,
    pendingBalance: 0.00,
    totalEarned: 24.25,
    totalWithdrawn: 15.50,
    referralEarnings: 3.40,
    updatedAt: new Date().toISOString()
  });

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(INITIAL_WITHDRAWALS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_SETTINGS);

  const [referrals, setReferrals] = useState<ReferralRecord[]>([
    {
      referralId: 'ref-1',
      referrerId: 'demo-user-101',
      referredUserId: 'usr-9921',
      referredEmail: 'tariq.pk@gmail.com',
      commissionEarned: 1.20,
      status: 'active',
      createdAt: '2026-11-04T14:10:00Z'
    },
    {
      referralId: 'ref-2',
      referrerId: 'demo-user-101',
      referredUserId: 'usr-9944',
      referredEmail: 'sarah.m@fintech.co.uk',
      commissionEarned: 2.20,
      status: 'active',
      createdAt: '2026-11-07T09:25:00Z'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      notificationId: 'notif-1',
      userId: 'demo-user-101',
      title: 'Withdrawal Completed',
      message: 'Your withdrawal of $5.50 via Easypaisa has been confirmed (Ref: EP-44781920).',
      type: 'withdrawal',
      read: false,
      createdAt: '2026-11-05T10:35:00Z'
    },
    {
      notificationId: 'notif-2',
      userId: 'demo-user-101',
      title: 'New Sponsored Campaign',
      message: 'Nexus Tech Global has launched a new smart home video campaign with $0.15 reward.',
      type: 'campaign',
      read: true,
      createdAt: '2026-11-08T12:00:00Z'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      logId: 'log-01',
      actorId: 'azizkhanabdul059@gmail.com',
      actorRole: 'admin',
      action: 'APPROVE_CAMPAIGN',
      targetResource: 'camp-tech-01',
      details: 'Approved campaign "NextGen Smart Home Hub 2026" with budget $750.00',
      timestamp: '2026-11-01T10:05:00Z'
    },
    {
      logId: 'log-02',
      actorId: 'azizkhanabdul059@gmail.com',
      actorRole: 'admin',
      action: 'PROCESS_WITHDRAWAL',
      targetResource: 'wd-2026-002',
      details: 'Approved Easypaisa payout of $5.50. Transaction Ref: EP-44781920',
      timestamp: '2026-11-05T10:30:00Z'
    }
  ]);

  // Active Sessions cache for fraud prevention
  const [activeSessions, setActiveSessions] = useState<Record<string, CampaignSession>>({});

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      setIsAuthLoading(false);
      if (fbUser) {
        const isAdminEmail = fbUser.email === 'azizkhanabdul059@gmail.com';
        const role: UserRole = isAdminEmail ? 'admin' : 'user';

        // Check if user doc exists in Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);

          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setCurrentUser(data);
            setActiveRole(data.role);
          } else {
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || 'user@watch-earn.pro',
              displayName: fbUser.displayName || 'Member',
              country: 'Pakistan',
              role,
              status: 'active',
              referralCode: 'WE' + Math.random().toString(36).substring(2, 7).toUpperCase(),
              emailVerified: fbUser.emailVerified,
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setCurrentUser(newProfile);
            setActiveRole(role);
          }
        } catch (e) {
          console.warn('Firestore user fetch note:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Format Currency
  const formatCurrency = useCallback((usdAmount: number): string => {
    if (currency === 'PKR') {
      const pkr = (usdAmount * USD_TO_PKR).toFixed(0);
      return `Rs ${Number(pkr).toLocaleString()}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  }, [currency]);

  // Switch role for quick testing/reviewing
  const switchActiveRole = (role: UserRole) => {
    setActiveRole(role);
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
    showToast(`Switched perspective to: ${role.toUpperCase()}`);
    if (role === 'admin') navigateTo('admin');
    else if (role === 'advertiser') navigateTo('advertiser-dashboard');
    else navigateTo('user-dashboard');
  };

  // Login With Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast('Signed in successfully with Google');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      showToast(error.message || 'Authentication was cancelled.');
    }
  };

  // Demo Login
  const loginWithDemo = (role: UserRole) => {
    const email = role === 'admin' ? 'azizkhanabdul059@gmail.com' : `${role}@watch-earn.pro`;
    setCurrentUser({
      uid: `demo-${role}-${Date.now()}`,
      email,
      displayName: role === 'admin' ? 'Administrator Aziz' : role === 'advertiser' ? 'Brand Manager' : 'Verified Member',
      country: 'Pakistan',
      role,
      status: 'active',
      referralCode: 'DEMO' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      emailVerified: true,
      createdAt: new Date().toISOString()
    });
    setActiveRole(role);
    showToast(`Logged in as ${role.toUpperCase()} (Demo Mode)`);
    if (role === 'admin') navigateTo('admin');
    else if (role === 'advertiser') navigateTo('advertiser-dashboard');
    else navigateTo('user-dashboard');
  };

  const registerUser = async (data: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      uid: 'usr-' + Date.now(),
      email: data.email || 'user@watch-earn.pro',
      displayName: data.displayName || 'WatchEarn Member',
      country: data.country || 'Pakistan',
      role: 'user',
      status: 'active',
      referralCode: 'WE' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      referredBy: data.referredBy,
      emailVerified: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    setActiveRole('user');
    showToast('Registration successful! Welcome to WatchEarn Pro.');
    navigateTo('user-dashboard');
  };

  const registerAdvertiser = async (data: Partial<AdvertiserProfile>) => {
    const newAdv: AdvertiserProfile = {
      advertiserId: 'adv-' + Date.now(),
      companyName: data.companyName || 'Enterprise Partner',
      contactEmail: data.contactEmail || 'contact@enterprise.com',
      website: data.website || 'https://enterprise.com',
      balance: 100.00,
      totalSpent: 0.00,
      verified: true,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setAdvertiserProfile(newAdv);
    setActiveRole('advertiser');
    showToast('Advertiser registered! Campaign studio is active.');
    navigateTo('advertiser-dashboard');
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
    setActiveRole('user');
    showToast('Logged out successfully.');
    navigateTo('home');
  };

  // Watch & Earn Verification Engine
  const startWatchSession = (campaignId: string): CampaignSession => {
    const token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const session: CampaignSession = {
      sessionId: `sess_${Date.now()}`,
      campaignId,
      userId: currentUser?.uid || 'guest-user',
      token,
      status: 'started',
      watchTimeSeconds: 0,
      clientFingerprint: `${navigator.userAgent.slice(0, 30)}_${window.innerWidth}x${window.innerHeight}`,
      startedAt: new Date().toISOString()
    };

    setActiveSessions(prev => ({ ...prev, [session.sessionId]: session }));
    return session;
  };

  const completeWatchSession = (
    sessionId: string,
    actualWatchSeconds: number
  ): { success: boolean; message: string; reward?: number } => {
    const session = activeSessions[sessionId];
    if (!session) {
      return { success: false, message: 'Invalid or expired task session.' };
    }

    const campaign = campaigns.find(c => c.campaignId === session.campaignId);
    if (!campaign) {
      return { success: false, message: 'Target campaign not found.' };
    }

    // Anti-fraud duration check: user must have watched at least required duration minus tolerance
    if (actualWatchSeconds < campaign.requiredWatchDuration - 1) {
      session.status = 'fraud_flagged';
      return {
        success: false,
        message: `Watch verification failed. Required duration was ${campaign.requiredWatchDuration}s, actual was ${actualWatchSeconds}s.`
      };
    }

    if (campaign.remainingSlots <= 0 || campaign.remainingBudget < campaign.rewardAmount) {
      return { success: false, message: 'Campaign capacity or budget exhausted.' };
    }

    // Mark session completed
    session.status = 'completed';
    session.completedAt = new Date().toISOString();

    const reward = campaign.rewardAmount;

    // Atomically credit wallet
    setWallet(prev => ({
      ...prev,
      availableBalance: Number((prev.availableBalance + reward).toFixed(2)),
      totalEarned: Number((prev.totalEarned + reward).toFixed(2)),
      updatedAt: new Date().toISOString()
    }));

    // Record immutable transaction
    const newTx: Transaction = {
      transactionId: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser?.uid || 'guest-user',
      type: 'reward_video',
      amount: reward,
      status: 'completed',
      idempotencyKey: `idemp_${sessionId}`,
      referenceId: campaign.campaignId,
      description: `Reward for viewing: ${campaign.title}`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);

    // Decrement campaign slots and remaining budget
    setCampaigns(prev =>
      prev.map(c =>
        c.campaignId === campaign.campaignId
          ? {
              ...c,
              remainingSlots: Math.max(0, c.remainingSlots - 1),
              completedCount: c.completedCount + 1,
              remainingBudget: Number(Math.max(0, c.remainingBudget - reward).toFixed(2))
            }
          : c
      )
    );

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    showToast(`Earned +${formatCurrency(reward)}! Credited to your wallet.`);
    return { success: true, message: 'Task verified and reward credited!', reward };
  };

  // Withdrawal Request
  const requestWithdrawal = (data: {
    amount: number;
    paymentMethod: PaymentMethod;
    accountTitle: string;
    accountNumber: string;
    bankName?: string;
  }): { success: boolean; message: string } => {
    const minThreshold = data.paymentMethod === 'paypal' ? settings.minWithdrawalUSD : (settings.minWithdrawalPKR / USD_TO_PKR);

    if (data.amount < minThreshold) {
      return {
        success: false,
        message: `Amount is below minimum withdrawal limit (${formatCurrency(minThreshold)}).`
      };
    }

    if (wallet.availableBalance < data.amount) {
      return { success: false, message: 'Insufficient available balance.' };
    }

    // Lock available into pending balance
    setWallet(prev => ({
      ...prev,
      availableBalance: Number((prev.availableBalance - data.amount).toFixed(2)),
      pendingBalance: Number((prev.pendingBalance + data.amount).toFixed(2)),
      updatedAt: new Date().toISOString()
    }));

    const newWd: Withdrawal = {
      withdrawalId: `wd-${Date.now()}`,
      userId: currentUser?.uid || 'demo-user-101',
      userEmail: currentUser?.email || 'user@watch-earn.pro',
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      accountTitle: data.accountTitle,
      accountNumber: data.accountNumber,
      bankName: data.bankName,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    setWithdrawals(prev => [newWd, ...prev]);

    const tx: Transaction = {
      transactionId: `tx-wd-${Date.now()}`,
      userId: currentUser?.uid || 'demo-user-101',
      type: 'withdrawal_hold',
      amount: data.amount,
      status: 'pending',
      idempotencyKey: `wd_hold_${newWd.withdrawalId}`,
      referenceId: newWd.withdrawalId,
      description: `Payout request held for ${data.paymentMethod.toUpperCase()}`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [tx, ...prev]);

    showToast(`Withdrawal of ${formatCurrency(data.amount)} submitted for manual verification.`);
    return { success: true, message: 'Withdrawal requested successfully.' };
  };

  // Claim Daily Bonus
  const claimDailyBonus = (): { success: boolean; message: string; reward?: number } => {
    if (!settings.dailyBonusEnabled) {
      return { success: false, message: 'Daily bonus is currently paused by platform administrator.' };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyClaimed = transactions.some(
      tx => tx.type === 'daily_bonus' && tx.createdAt.startsWith(todayStr)
    );

    if (alreadyClaimed) {
      return { success: false, message: 'You have already claimed your daily bonus today. Come back tomorrow!' };
    }

    const reward = settings.dailyBonusAmount;

    setWallet(prev => ({
      ...prev,
      availableBalance: Number((prev.availableBalance + reward).toFixed(2)),
      totalEarned: Number((prev.totalEarned + reward).toFixed(2)),
      updatedAt: new Date().toISOString()
    }));

    const newTx: Transaction = {
      transactionId: `tx-bonus-${Date.now()}`,
      userId: currentUser?.uid || 'demo-user-101',
      type: 'daily_bonus',
      amount: reward,
      status: 'completed',
      idempotencyKey: `bonus_${todayStr}`,
      referenceId: 'daily_bonus',
      description: `Daily streak bonus for ${todayStr}`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(`Daily bonus claimed: +${formatCurrency(reward)}!`);
    return { success: true, message: 'Bonus claimed!', reward };
  };

  // Support Tickets
  const submitSupportTicket = (subject: string, category: SupportTicket['category'], message: string) => {
    const newTkt: SupportTicket = {
      ticketId: `tkt-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.uid || 'demo-user-101',
      userEmail: currentUser?.email || 'user@watch-earn.pro',
      subject,
      category,
      message,
      status: 'open',
      createdAt: new Date().toISOString(),
      replies: []
    };
    setTickets(prev => [newTkt, ...prev]);
    showToast('Support inquiry created. Support team will reply within 6 hours.');
    return { success: true, message: 'Ticket opened' };
  };

  const replySupportTicket = (ticketId: string, replyText: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.ticketId === ticketId
          ? {
              ...t,
              replies: [
                ...(t.replies || []),
                {
                  sender: activeRole === 'admin' ? 'support' : 'user',
                  text: replyText,
                  time: new Date().toISOString()
                }
              ]
            }
          : t
      )
    );
    showToast('Reply sent to support thread.');
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.notificationId === notificationId ? { ...n, read: true } : n))
    );
  };

  // Advertiser Actions
  const createCampaign = (
    data: Omit<Campaign, 'campaignId' | 'advertiserId' | 'status' | 'completedCount' | 'remainingSlots' | 'remainingBudget' | 'createdAt'>
  ): { success: boolean; message: string } => {
    const requiredBudget = data.budget;
    if (advertiserProfile && advertiserProfile.balance < requiredBudget) {
      return { success: false, message: 'Insufficient advertiser balance to fund campaign.' };
    }

    const newCamp: Campaign = {
      ...data,
      campaignId: `camp-${Date.now()}`,
      advertiserId: advertiserProfile?.advertiserId || 'adv-nexus-01',
      remainingSlots: data.totalSlots,
      completedCount: 0,
      remainingBudget: data.budget,
      status: 'pending', // Awaiting admin approval
      createdAt: new Date().toISOString()
    };

    setCampaigns(prev => [newCamp, ...prev]);

    if (advertiserProfile) {
      setAdvertiserProfile(prev =>
        prev
          ? {
              ...prev,
              balance: Number((prev.balance - requiredBudget).toFixed(2)),
              totalSpent: Number((prev.totalSpent + requiredBudget).toFixed(2))
            }
          : null
      );
    }

    // Add audit log
    setAuditLogs(prev => [
      {
        logId: `log-${Date.now()}`,
        actorId: advertiserProfile?.companyName || 'Advertiser',
        actorRole: 'advertiser',
        action: 'CREATE_CAMPAIGN',
        targetResource: newCamp.campaignId,
        details: `Submitted new campaign "${newCamp.title}" with budget $${newCamp.budget}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    showToast('Campaign submitted! Awaiting administrator approval before going live.');
    return { success: true, message: 'Campaign created and queued for review.' };
  };

  const depositAdvertiserBudget = (amount: number) => {
    setAdvertiserProfile(prev =>
      prev
        ? {
            ...prev,
            balance: Number((prev.balance + amount).toFixed(2))
          }
        : null
    );
    showToast(`Added $${amount.toFixed(2)} to advertising balance.`);
  };

  // Admin Actions
  const approveCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.campaignId === campaignId ? { ...c, status: 'active' } : c))
    );
    setAuditLogs(prev => [
      {
        logId: `log-${Date.now()}`,
        actorId: currentUser?.email || 'admin',
        actorRole: 'admin',
        action: 'APPROVE_CAMPAIGN',
        targetResource: campaignId,
        details: `Approved campaign ${campaignId} to active live state.`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
    showToast('Campaign approved and marked ACTIVE!');
  };

  const rejectCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.campaignId === campaignId ? { ...c, status: 'rejected' } : c))
    );
    setAuditLogs(prev => [
      {
        logId: `log-${Date.now()}`,
        actorId: currentUser?.email || 'admin',
        actorRole: 'admin',
        action: 'REJECT_CAMPAIGN',
        targetResource: campaignId,
        details: `Rejected campaign ${campaignId}.`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
    showToast('Campaign rejected.');
  };

  const pauseCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.campaignId === campaignId
          ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
          : c
      )
    );
    showToast('Campaign status toggled.');
  };

  const approveWithdrawal = (withdrawalId: string, transactionRef: string, adminNotes?: string) => {
    const wd = withdrawals.find(w => w.withdrawalId === withdrawalId);
    if (!wd) return;

    setWithdrawals(prev =>
      prev.map(w =>
        w.withdrawalId === withdrawalId
          ? {
              ...w,
              status: 'approved',
              transactionRef,
              adminNotes: adminNotes || 'Approved by administrator.',
              processedAt: new Date().toISOString()
            }
          : w
      )
    );

    // Release from pending, credit totalWithdrawn
    setWallet(prev => ({
      ...prev,
      pendingBalance: Number(Math.max(0, prev.pendingBalance - wd.amount).toFixed(2)),
      totalWithdrawn: Number((prev.totalWithdrawn + wd.amount).toFixed(2)),
      updatedAt: new Date().toISOString()
    }));

    const tx: Transaction = {
      transactionId: `tx-payout-${Date.now()}`,
      userId: wd.userId,
      type: 'withdrawal_payout',
      amount: wd.amount,
      status: 'completed',
      idempotencyKey: `payout_${withdrawalId}`,
      referenceId: transactionRef,
      description: `Payout finalized via ${wd.paymentMethod.toUpperCase()} (Ref: ${transactionRef})`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [tx, ...prev]);

    setAuditLogs(prev => [
      {
        logId: `log-${Date.now()}`,
        actorId: currentUser?.email || 'admin',
        actorRole: 'admin',
        action: 'APPROVE_WITHDRAWAL',
        targetResource: withdrawalId,
        details: `Approved payout of $${wd.amount.toFixed(2)} to ${wd.paymentMethod.toUpperCase()}. Ref: ${transactionRef}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    showToast(`Withdrawal approved! Transaction reference: ${transactionRef}`);
  };

  const rejectWithdrawal = (withdrawalId: string, reason: string) => {
    const wd = withdrawals.find(w => w.withdrawalId === withdrawalId);
    if (!wd) return;

    setWithdrawals(prev =>
      prev.map(w =>
        w.withdrawalId === withdrawalId
          ? {
              ...w,
              status: 'rejected',
              adminNotes: reason,
              processedAt: new Date().toISOString()
            }
          : w
      )
    );

    // Refund locked pending balance back to available balance
    setWallet(prev => ({
      ...prev,
      pendingBalance: Number(Math.max(0, prev.pendingBalance - wd.amount).toFixed(2)),
      availableBalance: Number((prev.availableBalance + wd.amount).toFixed(2)),
      updatedAt: new Date().toISOString()
    }));

    const tx: Transaction = {
      transactionId: `tx-refund-${Date.now()}`,
      userId: wd.userId,
      type: 'withdrawal_refund',
      amount: wd.amount,
      status: 'reversed',
      idempotencyKey: `refund_${withdrawalId}`,
      referenceId: withdrawalId,
      description: `Withdrawal rejected & refunded: ${reason}`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [tx, ...prev]);

    setAuditLogs(prev => [
      {
        logId: `log-${Date.now()}`,
        actorId: currentUser?.email || 'admin',
        actorRole: 'admin',
        action: 'REJECT_WITHDRAWAL',
        targetResource: withdrawalId,
        details: `Rejected payout of $${wd.amount.toFixed(2)}. Reason: ${reason}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    showToast(`Withdrawal rejected. Funds restored to user balance.`);
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Platform settings saved successfully.');
  };

  const toggleUserSuspension = (userId: string) => {
    if (currentUser && currentUser.uid === userId) {
      setCurrentUser(prev =>
        prev ? { ...prev, status: prev.status === 'active' ? 'suspended' : 'active' } : null
      );
    }
    showToast(`User account status toggled.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        isDarkMode,
        toggleDarkMode,
        currency,
        setCurrency,
        usdToPkrRate: USD_TO_PKR,
        formatCurrency,
        currentUser,
        advertiserProfile,
        activeRole,
        switchActiveRole,
        loginWithGoogle,
        loginWithDemo,
        registerUser,
        registerAdvertiser,
        logout,
        isAuthLoading,
        campaigns,
        activeCampaign,
        setActiveCampaign,
        wallet,
        transactions,
        withdrawals,
        referrals,
        tickets,
        notifications,
        settings,
        auditLogs,
        startWatchSession,
        completeWatchSession,
        requestWithdrawal,
        claimDailyBonus,
        submitSupportTicket,
        replySupportTicket,
        markNotificationRead,
        createCampaign,
        depositAdvertiserBudget,
        approveCampaign,
        rejectCampaign,
        pauseCampaign,
        approveWithdrawal,
        rejectWithdrawal,
        updateSettings,
        toggleUserSuspension,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
