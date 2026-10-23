import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Languages,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Explanation, Language } from '../types';
import { explainConfusingMessage } from '../utils/data';

export const ExplainMessagePage: React.FC = () => {
  const { language: defaultLang, addExplanation, showToast } = useApp();

  const [messageText, setMessageText] = useState('');
  const [targetLang, setTargetLang] = useState<Language>(defaultLang);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [explanationResult, setExplanationResult] = useState<{
    explanation: string;
    dates_found: string[];
    recommended_actions: string[];
    cautionary_notes: string[];
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sampleNotice =
    'Dear Parent, the Half-Yearly examinations scheduled from 15-10-2025 are hereby postponed to 22-10-2025 due to administrative restructuring. The revised timetable will be shared by the class teacher by 18-10-2025. Please ensure your child submits the science project journal by 20-10-2025 at the principal desk.';

  const handleLoadSample = () => {
    setMessageText(sampleNotice);
    setExplanationResult(null);
    showToast('Loaded sample notice');
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      showToast('Please paste a message to explain', 'error');
      return;
    }
    if (messageText.trim().length < 20) {
      showToast('Please paste a longer message (at least 20 characters)', 'error');
      return;
    }

    setIsAnalyzing(true);
    setExplanationResult(null);

    try {
      // Call Gemini summarizer tool for live AI explanation
      const res = await fetch('/api/gemini/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'summarizer',
          input: messageText,
        }),
      });
      const data = await res.json();
      const localRes = explainConfusingMessage(messageText, targetLang);
      if (data.result && data.result.length > 50) {
        localRes.explanation = data.result;
      }
      setExplanationResult(localRes);

      const expRecord: Explanation = {
        id: `exp-${Date.now()}`,
        original_message: messageText,
        explanation: localRes.explanation,
        dates_found: localRes.dates_found,
        recommended_actions: localRes.recommended_actions,
        cautionary_notes: localRes.cautionary_notes,
        language: targetLang,
        created_at: new Date().toISOString(),
      };
      addExplanation(expRecord);
    } catch {
      const res = explainConfusingMessage(messageText, targetLang);
      setExplanationResult(res);

      const expRecord: Explanation = {
        id: `exp-${Date.now()}`,
        original_message: messageText,
        explanation: res.explanation,
        dates_found: res.dates_found,
        recommended_actions: res.recommended_actions,
        cautionary_notes: res.cautionary_notes,
        language: targetLang,
        created_at: new Date().toISOString(),
      };
      addExplanation(expRecord);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-[#FAF9F6] text-slate-800">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          Document Clarifier
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Explain Confusing Message</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
          Paste any confusing notice, hospital bill, clinical discharge slip, or school letter. We will translate jargon into plain takeaways and critical dates.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Paste Notice, Email, or Medical Letter:
          </label>
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors"
          >
            Load Example Notice
          </button>
        </div>

        <textarea
          rows={5}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Paste official notice text, doctor note, legal memo, or insurance paperwork..."
          className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400 leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Translate explanation into:</span>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as Language)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-rose-400"
            >
              <option value="english">English</option>
              <option value="telugu">తెలుగు (Telugu)</option>
              <option value="hindi">हिन्दी (Hindi)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isAnalyzing ? 'Extracting Clarity with Gemini...' : 'Explain Message'}</span>
          </button>
        </div>
      </form>

      {/* Results */}
      {explanationResult && (
        <div className="rounded-3xl border border-rose-200/80 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-rose-500" />
              <span>Plain Language Explanation</span>
            </h3>
            <button
              onClick={() => handleCopy(explanationResult.explanation, 'exp')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#FAF9F6] px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-xs"
            >
              {copiedKey === 'exp' ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === 'exp' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#FAF9F6] p-4 border border-slate-100">
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {explanationResult.explanation}
            </p>
          </div>

          {/* Key Dates & Deadlines */}
          {explanationResult.dates_found.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-teal-600" />
                <span>Extracted Key Dates & Deadlines</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {explanationResult.dates_found.map((date, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-900"
                  >
                    <Calendar className="h-3 w-3 text-teal-600" />
                    <span>{date}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommended actions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Recommended Action Steps</span>
              </h4>
              <button
                onClick={() =>
                  handleCopy(explanationResult.recommended_actions.join('\n'), 'actions')
                }
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Copy checklist
              </button>
            </div>
            <div className="space-y-2">
              {explanationResult.recommended_actions.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5 text-xs font-medium text-slate-800 shadow-xs"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    ✓
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cautionary notes */}
          {explanationResult.cautionary_notes.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                <span>Cautionary Notes</span>
              </h4>
              <ul className="space-y-1 text-xs text-amber-900 font-medium">
                {explanationResult.cautionary_notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
