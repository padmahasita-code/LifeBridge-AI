import React from 'react';
import { HeartHandshake, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';

export const Footer: React.FC = () => {
  const { setPage } = useApp();

  const handleNav = (target: PageType) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-indigo-100 bg-white pt-12 pb-8 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white shadow-xs">
                <HeartHandshake className="h-4 w-4" />
              </span>
              <span className="font-bold text-slate-900 text-base">LifeBridge AI</span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-500">
              From everyday problems to human-centered action. LifeBridge AI equips students, caregivers, older adults, and families with structured action plans, confusing notice explanations, 12 specialized healthcare AI tools, and CareCircle AI for shared family care routines.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-semibold">
              <span>English</span>
              <span aria-hidden="true">·</span>
              <span>తెలుగు (Telugu)</span>
              <span aria-hidden="true">·</span>
              <span>हिन्दी (Hindi)</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Features
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-semibold">
              <li>
                <button
                  onClick={() => handleNav('chat')}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AI Chat Assistant</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  12 AI Healthcare Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('carecircle')}
                  className="hover:text-amber-700 transition-colors"
                >
                  CareCircle Family Space
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Healthcare Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('create')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Create Action Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('landing');
                    setTimeout(() => {
                      const el = document.getElementById('doctors-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Doctors Join Network
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('login')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Sign In / Gateway
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Helpline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Family & Wellbeing
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Designed with trauma-informed, gentle principles. For immediate medical or life-threatening emergencies, please dial your local emergency services (911 / 112).
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-xs">
              <button
                onClick={() => handleNav('settings')}
                className="text-left font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Accessibility & Language Settings →
              </button>
              <button
                onClick={() => handleNav('login')}
                className="text-left font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                Sign In to LifeBridge AI Account →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} LifeBridge AI & CareCircle AI. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <button
              onClick={() => handleNav('login')}
              className="hover:text-slate-600 transition-colors"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('login')}
              className="hover:text-slate-600 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <span>256-Bit HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
