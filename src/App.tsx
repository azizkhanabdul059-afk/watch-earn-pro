import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoleSwitcherBanner } from './components/RoleSwitcherBanner';
import { WatchModal } from './components/WatchModal';
import { HomePage } from './pages/HomePage';
import { CampaignsPage } from './pages/CampaignsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdvertiserDashboardPage } from './pages/AdvertiserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { WalletPage } from './pages/WalletPage';
import { WithdrawPage } from './pages/WithdrawPage';
import { ReferralPage } from './pages/ReferralPage';
import { TransactionsPage } from './pages/TransactionsPage';
import {
  AboutPage,
  HowItWorksPage,
  FAQPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  UserRegistrationPage,
  LoginPage,
  AdvertiserRegistrationPage
} from './pages/StaticPages';

const MainLayout: React.FC = () => {
  const { currentPage, activeCampaign, setActiveCampaign, toastMessage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'user-dashboard':
        return <UserDashboardPage />;
      case 'advertiser-dashboard':
        return <AdvertiserDashboardPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'wallet':
        return <WalletPage />;
      case 'withdraw':
        return <WithdrawPage />;
      case 'referrals':
        return <ReferralPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'about':
        return <AboutPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsConditionsPage />;
      case 'register':
        return <UserRegistrationPage />;
      case 'login':
        return <LoginPage />;
      case 'advertiser-register':
        return <AdvertiserRegistrationPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Reviewer Role Switcher Toolbar */}
      <RoleSwitcherBanner />

      {/* Main Top Bar */}
      <Navbar />

      {/* Dynamic Main Viewport */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Watch & Earn Player Modal */}
      {activeCampaign && (
        <WatchModal
          campaign={activeCampaign}
          onClose={() => setActiveCampaign(null)}
        />
      )}

      {/* System Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-2xl border border-slate-700 dark:border-slate-200 animate-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
