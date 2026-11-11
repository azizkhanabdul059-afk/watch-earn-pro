import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Mail,
  Send,
  Lock,
  Globe2,
  ChevronDown,
  PlayCircle,
  TrendingUp,
  Award,
  Video,
  DollarSign
} from 'lucide-react';
import { SupportTicket } from '../types';

/* =========================================================================
   1. ABOUT PAGE
   ========================================================================= */
export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 text-center">
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          Our Foundation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About WatchEarn Pro
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          An international fintech rewards network dedicated to connecting voluntary viewers with genuine brand promotional budgets.
        </p>
      </div>

      <div className="prose dark:prose-invert text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
        <div className="p-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 dark:bg-sky-950/20 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            The Zero-Investment Principle
          </h2>
          <p>
            Unlike deceptive "earning schemes" that demand deposits, subscriptions, or membership fees, <strong>WatchEarn Pro is 100% free and will never ask users to invest or deposit money</strong> to unlock tasks or withdraw their balances.
          </p>
          <p>
            Every single cent disbursed in our ecosystem originates from verified corporate advertising contracts. When companies launch new apps, gadgets, or digital services, they allocate marketing capital to reach authentic humans rather than bot networks.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Why We Emphasize Pakistan and South Asia
          </h2>
          <p>
            Millions of diligent freelancers and digital students across Pakistan and developing regions are excluded from traditional online reward platforms due to lack of local payout integration. WatchEarn Pro bridges this divide by providing direct automated support for <strong>JazzCash</strong>, <strong>Easypaisa</strong>, and 1-Link bank institutions alongside global gateways like <strong>PayPal</strong>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Zero-Tolerance Anti-Fraud Security
          </h2>
          <p>
            Advertisers trust us because our verification system enforces tab visibility detection, single-use cryptographically signed session tokens, and algorithmic watch verification. This ensures our community remains sustainable, funded, and respected by international brand partners.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. HOW IT WORKS PAGE
   ========================================================================= */
export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          Complete Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          How WatchEarn Pro Operates
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Understand the exact journey from advertiser campaign funding to verified member wallet payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* For Earners */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm">
            <PlayCircle className="w-5 h-5 fill-current" />
            <span>For Voluntary Earners</span>
          </div>

          <ol className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="font-bold font-mono text-sky-500">1.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Register for Free</strong>
                Sign up with your email or Google account. No credit card or deposit required.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-sky-500">2.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Select a Campaign</strong>
                Choose an approved video broadcast that matches your region and interest.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-sky-500">3.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Keep Tab in Direct Focus</strong>
                Watch for the required duration (20s - 45s). Tab must stay active to complete verification.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-sky-500">4.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Receive Instant Credit</strong>
                The reward is appended to your immutable ledger immediately.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-sky-500">5.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Withdraw with Low Minimums</strong>
                Cash out to JazzCash, Easypaisa, or PayPal once you hit Rs 500 / $5.00.
              </div>
            </li>
          </ol>
        </div>

        {/* For Advertisers */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Video className="w-5 h-5" />
            <span>For Brand Advertisers</span>
          </div>

          <ol className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="font-bold font-mono text-emerald-500">1.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Create Brand Account</strong>
                Submit your corporate contact and business website in the Advertiser Studio.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-emerald-500">2.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Deposit Budget</strong>
                Fund your advertising escrow. Funds remain in reserve and are only consumed on valid views.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-emerald-500">3.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Submit Video Specs</strong>
                Set target regions, required watch duration (e.g. 30s), and custom completion rewards.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-emerald-500">4.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Admin Security Audit</strong>
                Our team validates campaign content to verify compliance with international guidelines.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold font-mono text-emerald-500">5.</span>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Real-Time Conversion Tracking</strong>
                Monitor active view slots, audience engagement, and completed reach in real time.
              </div>
            </li>
          </ol>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   3. FAQ PAGE
   ========================================================================= */
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I have to pay or deposit any money to start earning?',
      a: 'Absolutely not. WatchEarn Pro is 100% free to join and participate. We never ask for deposit fees, VIP level upgrades, or subscription payments. Any website that asks you to pay to withdraw money is a scam; WatchEarn Pro strictly prohibits this.'
    },
    {
      q: 'Which payout methods are supported in Pakistan?',
      a: 'In Pakistan, we natively support JazzCash, Easypaisa, and 1-Link bank accounts (Meezan, HBL, UBL, Alfalah, Standard Chartered, and more). Minimum withdrawal is Rs 500.'
    },
    {
      q: 'Which payout methods are supported internationally?',
      a: 'For members outside Pakistan, we disburse funds via PayPal and decentralized crypto (USDT TRC20). The international minimum withdrawal is $5.00.'
    },
    {
      q: 'How does the anti-fraud watch verification work?',
      a: 'When you begin a sponsored campaign, the backend provisions a single-use session token. Our player enforces active tab focus (pausing automatically if you minimize or switch tabs) and checks elapsed playback time. Only genuine, uninterrupted views qualify for reward credits.'
    },
    {
      q: 'How does the 10% referral program work?',
      a: 'Every member receives a unique referral code and link. When your invited contacts complete verified video tasks, you earn a 10% bonus credit from the platform advertising pool. Your friend keeps 100% of their earned rewards.'
    },
    {
      q: 'How fast are withdrawal requests processed?',
      a: 'All withdrawals are reviewed manually by platform administrators to confirm mobile account and bank details. Typical processing turnaround is between 2 and 6 business hours.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          Help Desk
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Common inquiries regarding earnings, withdrawals, anti-cheat rules, and advertiser campaigns.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   4. CONTACT & SUPPORT PAGE
   ========================================================================= */
export const ContactPage: React.FC = () => {
  const { submitSupportTicket, tickets, currentUser } = useApp();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Withdrawal');
  const [message, setMessage] = useState('');

  const myTickets = tickets.filter(t => t.userId === currentUser?.uid || t.userEmail === currentUser?.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    submitSupportTicket(subject, category, message);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          Direct Assistance
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Contact Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Need help with a payout, campaign, or task verification? Open a ticket below and our team will respond promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Ticket Form */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Open a Support Ticket</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Inquiry Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. JazzCash payout transaction reference status"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="Withdrawal">Withdrawal / Payout</option>
                <option value="Task Verification">Task Verification / Session Error</option>
                <option value="Advertiser">Advertiser Budget & Campaign</option>
                <option value="Account">Account Status & Password</option>
                <option value="Other">Other Question</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Detailed Message</label>
              <textarea
                required
                rows={4}
                placeholder="Please describe your inquiry with account number or transaction ID..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info & Active Tickets */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white">Direct Support Channels</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Email: <strong className="text-slate-900 dark:text-white font-mono">support@watch-earn.pro</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Response Time: <strong className="text-slate-900 dark:text-white font-mono">Within 2 to 6 hours</strong>
            </p>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              Our support team operates 7 days a week for withdrawal reconciliations and campaign quality checks.
            </p>
          </div>

          {/* User's recent tickets */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Your Active Tickets</h3>
            {myTickets.length === 0 ? (
              <p className="text-xs text-slate-500">No recent support tickets.</p>
            ) : (
              myTickets.map(tkt => (
                <div key={tkt.ticketId} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-400 text-[11px]">#{tkt.ticketId}</span>
                    <span className={`font-semibold uppercase text-[10px] ${tkt.status === 'open' ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {tkt.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white truncate">{tkt.subject}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   5. PRIVACY & TERMS
   ========================================================================= */
export const PrivacyPolicyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
      Privacy Policy & Data Protection
    </h1>
    <p>Last updated: November 2026</p>
    <p>
      WatchEarn Pro ("we", "our", or "the Platform") values the privacy of its members and advertising partners. This policy outlines how user credentials, session fingerprints, and financial payout destinations are handled.
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">1. Collected Information</h2>
    <p>
      We collect email addresses for authentication via Firebase Authentication, voluntary country selection, and payout account titles and numbers exclusively for dishing out withdrawals. We do not sell or monetize personal identifiable data.
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">2. Anti-Cheat & Telemetry Signals</h2>
    <p>
      To preserve advertiser integrity, we collect client window visibility states and non-identifying screen metrics to verify that videos are viewed by humans rather than headless bot instances.
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">3. Financial Ledger Security</h2>
    <p>
      Payment details (JazzCash, Easypaisa, Bank account titles, PayPal IDs) are encrypted and accessible strictly to authorized financial review personnel.
    </p>
  </div>
);

export const TermsConditionsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
      Terms of Service & Participation Rules
    </h1>
    <p>Last updated: November 2026</p>
    <p>
      By accessing or registering with WatchEarn Pro, you agree to comply with the following operational invariants:
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">1. Zero Investment Policy</h2>
    <p>
      WatchEarn Pro is entirely free to participate. The platform will never ask users to invest capital or buy packages to earn. Any member attempting to solicit funds from other users will have their account permanently suspended.
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">2. Prohibition of Automation & Bots</h2>
    <p>
      The use of automated scripts, emulators, auto-clickers, multi-tab farming, or VPN spoofing to fake video duration is strictly forbidden. Discovered bot activity results in immediate forfeiture of balances.
    </p>
    <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">3. Manual Withdrawal Approvals</h2>
    <p>
      To prevent fraudulent chargebacks, all withdrawal requests undergo manual administrative reconciliation with mobile gateway transaction references.
    </p>
  </div>
);

/* =========================================================================
   6. USER REGISTRATION & LOGIN PAGES
   ========================================================================= */
export const UserRegistrationPage: React.FC = () => {
  const { registerUser, loginWithGoogle, loginWithDemo, navigateTo } = useApp();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ email, displayName, country, referredBy: referralCode });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create Free Earner Account</h1>
          <p className="text-xs text-slate-500">100% Free · No deposit needed · Instant access</p>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          <span>or sign up with email</span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Abdul Aziz"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. user@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
            >
              <option value="Pakistan">Pakistan</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Canada">Canada</option>
              <option value="Other">Other Country</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Referral Code (Optional)</label>
            <input
              type="text"
              placeholder="e.g. AZIZ2026"
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs cursor-pointer shadow-xs mt-2"
          >
            Create Free Account
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button onClick={() => navigateTo('login')} className="text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginWithDemo, navigateTo } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sign In to WatchEarn Pro</h1>
          <p className="text-xs text-slate-500">Access your dashboard, wallet, and campaigns</p>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Sign In with Google</span>
        </button>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          <span>Fast Reviewer Demo Logins</span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2 text-xs">
          <button
            onClick={() => loginWithDemo('user')}
            className="w-full py-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-semibold hover:bg-sky-100 cursor-pointer text-center"
          >
            Sign In as Viewer / User (Demo)
          </button>
          <button
            onClick={() => loginWithDemo('advertiser')}
            className="w-full py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-100 cursor-pointer text-center"
          >
            Sign In as Brand Advertiser (Demo)
          </button>
          <button
            onClick={() => loginWithDemo('admin')}
            className="w-full py-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold hover:bg-amber-100 cursor-pointer text-center"
          >
            Sign In as Administrator (Demo)
          </button>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          New to WatchEarn?{' '}
          <button onClick={() => navigateTo('register')} className="text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer">
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdvertiserRegistrationPage: React.FC = () => {
  const { registerAdvertiser, navigateTo } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerAdvertiser({ companyName, contactEmail, website });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Brand Onboarding</span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Register Advertiser Account</h1>
          <p className="text-xs text-slate-500">Launch verified video campaigns with zero bot traffic</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Brand Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Finova Tech Global"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Corporate Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. ads@finova.com"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
            <input
              type="url"
              required
              placeholder="https://finova.com"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs cursor-pointer shadow-xs mt-2"
          >
            Create Advertiser Studio Account
          </button>
        </form>
      </div>
    </div>
  );
};
