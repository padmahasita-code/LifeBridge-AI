import React from 'react';
import {
  Download,
  Eye,
  Languages,
  RotateCcw,
  ShieldCheck,
  Type,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    language,
    setLanguage,
    largeText,
    setLargeText,
    highContrast,
    setHighContrast,
    resetAllData,
    plans,
    familyMembers,
    showToast,
  } = useApp();

  const handleExportData = () => {
    const backupData = {
      plans: localStorage.getItem('lifebridge_plans'),
      explanations: localStorage.getItem('lifebridge_explanations'),
      carecircle_family: localStorage.getItem('carecircle_family'),
      carecircle_schedule: localStorage.getItem('carecircle_schedule'),
      carecircle_tasks: localStorage.getItem('carecircle_tasks'),
      carecircle_shopping: localStorage.getItem('carecircle_shopping'),
      exported_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifebridge-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported backup file successfully');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all your data? This will restore factory sample data for LifeBridge and CareCircle.'
      )
    ) {
      resetAllData();
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-[#FAF9F6] text-slate-800">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
          Preferences
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          Settings & Accessibility
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Customize language, display readability, and manage your family and plan records.
        </p>
      </div>

      {/* Language Section */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Languages className="h-4 w-4 text-teal-600" />
          <span>Application Language</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Select your primary language for AI plan generation, confusing message explanations, and companion guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            { id: 'english', label: 'English', desc: 'Default English' },
            { id: 'telugu', label: 'తెలుగు (Telugu)', desc: 'Multilingual support' },
            { id: 'hindi', label: 'हिन्दी (Hindi)', desc: 'Multilingual support' },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`rounded-2xl border p-4 text-left transition-all shadow-xs ${
                language === lang.id
                  ? 'border-indigo-400 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-200'
                  : 'border-slate-200 bg-[#FAF9F6] text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{lang.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{lang.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Section */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Eye className="h-4 w-4 text-indigo-600" />
          <span>Visual Readability & Accessibility</span>
        </div>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Type className="h-4 w-4 text-teal-600" />
                <span>Large Text Mode</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Increases type scale across cards, checklists, and messages for older adults.
              </p>
            </div>
            <button
              onClick={() => setLargeText(!largeText)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                largeText ? 'bg-teal-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  largeText ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-600" />
                <span>High Contrast Mode</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Strengthens borders and card outlines to ensure WCAG AAA visual sharpness.
              </p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                highContrast ? 'bg-teal-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Local Privacy & Data Storage</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          All your LifeBridge action plans and CareCircle family data stay in your local browser storage. You can export a backup JSON at any time or reset back to default sample data.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-[#FAF9F6] px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Data Backup</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Data</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Active Plans: {plans.length}</span>
          <span>CareCircle Members: {familyMembers.length}</span>
        </div>
      </div>
    </div>
  );
};
