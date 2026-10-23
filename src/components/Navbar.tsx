import React, { useState } from 'react';
import {
  HeartHandshake,
  Menu,
  X,
  Languages,
  Sparkles,
  Settings,
  User,
  KeyRound,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language, PageType } from '../types';

export const Navbar: React.FC = () => {
  const { page, setPage, language, setLanguage, currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { page: PageType; label: string; highlight?: boolean; badge?: string }[] = [
    { page: 'dashboard', label: 'Dashboard' },
    { page: 'tools', label: 'AI Tools' },
    { page: 'carecircle', label: 'CareCircle', highlight: true, badge: 'Family Hub' },
    { page: 'create', label: 'Create Plan' },
    { page: 'explain', label: 'Explain Message' },
    { page: 'saved', label: 'Saved Plans' },
    { page: 'login', label: 'Sign In' },
  ];

  const handleNavClick = (target: PageType) => {
    setPage(target);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('landing')}
          className="group flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-teal-400 text-white shadow-sm shadow-indigo-200">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="font-bold text-slate-900 tracking-tight">
            LifeBridge <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">AI</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = page === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`group relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right utility items */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 pl-2 pr-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-indigo-100/70 transition-colors shadow-2xs"
                title="Account & Role Settings"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white text-[11px] font-bold">
                  {currentUser.name.charAt(0)}
                </span>
                <span className="hidden sm:inline font-bold text-slate-900 max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="hidden md:inline rounded-md bg-white border border-indigo-200 px-1.5 py-0.2 text-[9px] font-semibold text-indigo-700">
                  {currentUser.badge}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 origin-top-right rounded-2xl border border-slate-200 bg-white py-2 shadow-xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[9px] font-bold text-indigo-700">
                      {currentUser.roleTitle}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('login')}
                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Switch Role / Entry Portal</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <HeartHandshake className="h-3.5 w-3.5 text-teal-600" />
                      <span>Family Healthcare Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('carecircle')}
                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span>CareCircle Hub</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('settings')}
                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5 text-slate-500" />
                      <span>Accessibility & Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPage('landing');
                  setTimeout(() => {
                    const el = document.getElementById('doctors-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hidden md:flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-2.5 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors shadow-2xs cursor-pointer"
                title="Doctors & Clinicians Partner Network"
              >
                <span>Doctors Join</span>
              </button>
              <button
                onClick={() => handleNavClick('login')}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Language selector toggle */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors shadow-xs"
              aria-label="Select Language"
            >
              <Languages className="h-3.5 w-3.5 text-teal-600" />
              <span className="capitalize">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 origin-top-right rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl backdrop-blur-md z-50">
                <button
                  onClick={() => handleLanguageSelect('english')}
                  className={`flex w-full items-center px-3.5 py-2 text-xs text-left transition-colors ${
                    language === 'english'
                      ? 'bg-indigo-50 font-bold text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageSelect('telugu')}
                  className={`flex w-full items-center px-3.5 py-2 text-xs text-left transition-colors ${
                    language === 'telugu'
                      ? 'bg-indigo-50 font-bold text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  తెలుగు (Telugu)
                </button>
                <button
                  onClick={() => handleLanguageSelect('hindi')}
                  className={`flex w-full items-center px-3.5 py-2 text-xs text-left transition-colors ${
                    language === 'hindi'
                      ? 'bg-indigo-50 font-bold text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => handleLanguageSelect('spanish')}
                  className={`flex w-full items-center px-3.5 py-2 text-xs text-left transition-colors ${
                    language === 'spanish'
                      ? 'bg-indigo-50 font-bold text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Español (Spanish)
                </button>
              </div>
            )}
          </div>

          {/* Settings icon */}
          <button
            onClick={() => handleNavClick('settings')}
            className={`hidden sm:flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 transition-colors shadow-xs ${
              page === 'settings' ? 'text-indigo-600 border-indigo-300 bg-indigo-50/50' : ''
            }`}
            title="Settings & Accessibility"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Primary Action Button: AI Chat Assistant */}
          <button
            onClick={() => handleNavClick('chat')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Chat Assistant</span>
            <span className="sm:hidden">AI Chat</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex xl:hidden items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-indigo-100 bg-white px-4 pt-2 pb-5 xl:hidden shadow-md">
          {currentUser && (
            <div className="mb-3 flex items-center justify-between rounded-xl bg-indigo-50/80 p-3 border border-indigo-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.roleTitle}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  page === item.page
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('login')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold ${
                page === 'login'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Entry Portal & Role Login</span>
            </button>
            <button
              onClick={() => handleNavClick('chat')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold ${
                page === 'chat' || page === 'assistant'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>AI Chat Assistant</span>
            </button>
            <button
              onClick={() => handleNavClick('settings')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold ${
                page === 'settings'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Settings & Accessibility</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
