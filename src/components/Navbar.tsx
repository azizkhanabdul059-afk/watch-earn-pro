import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  PlayCircle,
  Wallet as WalletIcon,
  Users,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { PageId } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    isDarkMode,
    toggleDarkMode,
    currency,
    setCurrency,
    currentUser,
    activeRole,
    switchActiveRole,
    logout,
    wallet,
    formatCurrency
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageId; icon: any }[] = [
    { label: 'Home', page: 'home', icon: Shield },
    { label: 'Campaigns', page: 'campaigns', icon: PlayCircle },
    { label: 'Dashboard', page: activeRole === 'admin' ? 'admin' : activeRole === 'advertiser' ? 'advertiser-dashboard' : 'user-dashboard', icon: User },
    { label: 'Wallet', page: 'wallet', icon: WalletIcon },
    { label: 'Referrals', page: 'referrals', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single-Line Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold group-hover:scale-105 transition-transform">
                <PlayCircle className="w-5 h-5 fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                WatchEarn<span className="text-sky-500">Pro</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Nav Links (Top Bar Contract) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map(({ label, page }) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={label}
                  onClick={() => navigateTo(page)}
                  className={`cursor-pointer whitespace-nowrap transition-colors py-1 ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-500'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Currency Switcher */}
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-900 text-xs font-mono">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="US Dollar"
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  currency === 'PKR'
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Pakistani Rupee"
              >
                PKR
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Balance Chip / Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900 text-left transition-colors cursor-pointer"
                >
                  <div className="hidden sm:block">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-none">Balance</p>
                    <p className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono tabular-nums leading-tight mt-0.5">
                      {formatCurrency(wallet.availableBalance)}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-md bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.displayName ? currentUser.displayName.slice(0, 2) : 'ME'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-2 z-50 text-xs"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{currentUser.displayName}</p>
                      <p className="text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <span>Role: <strong className="text-sky-500 uppercase">{activeRole}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{currentUser.country}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => navigateTo('user-dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        <span>User Dashboard</span>
                        <span className="font-mono text-sky-500">{formatCurrency(wallet.availableBalance)}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('wallet')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        Wallet & Earnings
                      </button>
                      <button
                        onClick={() => navigateTo('withdraw')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        Request Withdrawal
                      </button>
                      <button
                        onClick={() => navigateTo('referrals')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        Referral Program
                      </button>
                      <button
                        onClick={() => navigateTo('advertiser-dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        Advertiser Studio
                      </button>
                      <button
                        onClick={() => navigateTo('admin')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-amber-600 dark:text-amber-400 font-medium cursor-pointer"
                      >
                        Admin Control Center
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(({ label, page, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                navigateTo(page);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
            >
              <Icon className="w-4 h-4 text-sky-500" />
              <span>{label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { navigateTo('advertiser-dashboard'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-center cursor-pointer"
            >
              Advertiser Studio
            </button>
            <button
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-amber-600 dark:text-amber-400 text-center font-medium cursor-pointer"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
