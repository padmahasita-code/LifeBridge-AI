import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  PhoneCall,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  Audience,
  Category,
  Language,
  Plan,
  PlanTask,
  ResponseStyle,
  Urgency,
} from '../types';
import {
  AUDIENCE_LABELS,
  CATEGORY_LABELS,
  generateLifeBridgePlan,
  LANGUAGE_LABELS,
  STARTER_TEMPLATES,
  URGENCY_LABELS,
} from '../utils/data';

export const CreatePlanPage: React.FC = () => {
  const { language: defaultLang, addPlan, setPage, showToast } = useApp();

  const [form, setForm] = useState({
    title: '',
    problem: '',
    audience: 'caregiver' as Audience,
    category: 'family_coordination' as Category,
    urgency: 'soon' as Urgency,
    language: defaultLang,
    responseStyle: 'checklist' as ResponseStyle,
    resources: '',
    goal: '',
    deadline: '',
    followUpDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    summary: string;
    tasks: PlanTask[];
    draftMessage: string;
    assumptions: string[];
    obstacles: string[];
    followUpTasks: string[];
  } | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const applyTemplate = (templateId: string) => {
    const tmpl = STARTER_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    setForm({
      ...form,
      title: tmpl.request.title,
      problem: tmpl.request.problem,
      goal: tmpl.request.goal,
      audience: tmpl.request.audience,
      category: tmpl.request.category,
      urgency: tmpl.request.urgency,
      resources: tmpl.request.resources,
      responseStyle: tmpl.request.responseStyle,
      language: tmpl.request.language,
    });
    setErrors({});
    showToast(`Template applied: “${tmpl.label}”`, 'info');
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = 'Please provide a descriptive title';
    if (!form.problem.trim()) nextErrors.problem = 'Please share the situation or issue';
    if (!form.goal.trim()) nextErrors.goal = 'Please define what success looks like';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    setGeneratedResult(null);
    setSavedSuccess(false);

    try {
      // First try real Gemini tool generation
      const prompt = `Title: ${form.title}\nSituation: ${form.problem}\nGoal: ${form.goal}\nAudience: ${form.audience}\nUrgency: ${form.urgency}\nOutput Language: ${form.language}`;
      const res = await fetch('/api/gemini/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'carecircle_ai',
          input: prompt,
        }),
      });

      const data = await res.json();
      const outputText = data.result || '';

      const localResult = generateLifeBridgePlan({
        title: form.title,
        problem: form.problem,
        goal: form.goal,
        audience: form.audience,
        category: form.category,
        urgency: form.urgency,
        language: form.language,
        resources: form.resources,
      });

      if (outputText && outputText.length > 50) {
        localResult.summary = outputText.slice(0, 300);
      }

      setGeneratedResult(localResult);
      showToast('Action plan created successfully!');
    } catch {
      const fallback = generateLifeBridgePlan({
        title: form.title,
        problem: form.problem,
        goal: form.goal,
        audience: form.audience,
        category: form.category,
        urgency: form.urgency,
        language: form.language,
        resources: form.resources,
      });
      setGeneratedResult(fallback);
      showToast('Action plan created with care defaults');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToCollection = () => {
    if (!generatedResult) return;

    const newPlan: Plan = {
      id: `plan-${Date.now()}`,
      title: form.title,
      summary: generatedResult.summary,
      problem: form.problem,
      goal: form.goal,
      audience: form.audience,
      category: form.category,
      urgency: form.urgency,
      language: form.language,
      response_style: form.responseStyle,
      resources: form.resources,
      deadline: form.deadline || null,
      follow_up_date: form.followUpDate || null,
      draft_message: generatedResult.draftMessage,
      assumptions: generatedResult.assumptions,
      obstacles: generatedResult.obstacles,
      follow_up_tasks: generatedResult.followUpTasks,
      status: 'active',
      created_at: new Date().toISOString(),
      tasks: generatedResult.tasks.map((t, idx) => ({
        ...t,
        id: `task-${Date.now()}-${idx}`,
      })),
    };

    addPlan(newPlan);
    setSavedSuccess(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
      showToast('Draft message copied to clipboard');
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-[#FAF9F6] text-slate-800">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
          AI Action Planner
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Create Action Plan</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Transform any stressful situation into a prioritized checklist, drafted communication, and contingency actions.
        </p>
      </div>

      {/* Starter Templates */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Quick Start from Real Scenarios:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STARTER_TEMPLATES.map((tmpl) => {
            const Icon =
              tmpl.id === 'student'
                ? GraduationCap
                : tmpl.id === 'caregiver'
                ? HeartHandshake
                : tmpl.id === 'understand'
                ? HelpCircle
                : tmpl.id === 'missed'
                ? PhoneCall
                : Users;

            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => applyTemplate(tmpl.id)}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#FAF9F6] p-3.5 text-left hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group shadow-xs"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    {tmpl.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {tmpl.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleGenerate} className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Plan Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Daily Check-Ins for Grandmother Living Alone"
              className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Problem */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Describe What Happened or What Needs Organizing <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              placeholder="Provide background context, what is causing confusion or worry, and any relevant details..."
              className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
            />
            {errors.problem && <p className="text-[11px] text-rose-500 mt-1">{errors.problem}</p>}
          </div>

          {/* Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Desired Outcome / Goal <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              placeholder="e.g., Establish a reliable daily rotation so grandma is never isolated"
              className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.goal && <p className="text-[11px] text-rose-500 mt-1">{errors.goal}</p>}
          </div>

          {/* Dropdown Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Audience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Audience / Persona
              </label>
              <select
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value as Audience })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 font-semibold focus:border-indigo-500 focus:outline-none"
              >
                {Object.entries(AUDIENCE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 font-semibold focus:border-indigo-500 focus:outline-none"
              >
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Urgency
              </label>
              <select
                value={form.urgency}
                onChange={(e) => setForm({ ...form, urgency: e.target.value as Urgency })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 font-semibold focus:border-indigo-500 focus:outline-none"
              >
                {Object.entries(URGENCY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Output Language
              </label>
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value as Language })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 font-semibold focus:border-indigo-500 focus:outline-none"
              >
                {Object.entries(LANGUAGE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Resources and Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Available Resources / Helpers
              </label>
              <input
                type="text"
                value={form.resources}
                onChange={(e) => setForm({ ...form, resources: e.target.value })}
                placeholder="e.g., 3 family members, smartphones"
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Target Deadline (Optional)
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Follow-Up Review Date (Optional)
              </label>
              <input
                type="date"
                value={form.followUpDate}
                onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Structuring Plan with Gemini...' : 'Generate Action Plan'}</span>
          </button>
        </div>
      </form>

      {/* Generated Plan Output */}
      {generatedResult && (
        <div className="rounded-3xl border border-teal-200/80 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                Generated Plan
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{form.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToCollection}
                disabled={savedSuccess}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs ${
                  savedSuccess
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                <span>{savedSuccess ? 'Saved to Collection' : 'Save Plan'}</span>
              </button>

              <button
                onClick={() => setPage('carecircle')}
                className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors shadow-xs"
              >
                <Users className="h-3.5 w-3.5 text-amber-600" />
                <span>Coordinate in CareCircle</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl bg-[#FAF9F6] p-5 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Overview & Approach
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{generatedResult.summary}</p>
          </div>

          {/* Prioritized Tasks Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Prioritized Action Steps
            </h4>
            <div className="space-y-2.5">
              {generatedResult.tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      {task.text}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" /> {task.timeframe}
                      </span>
                      <span
                        className={`font-bold uppercase tracking-wider ${
                          task.priority === 'high'
                            ? 'text-rose-600'
                            : task.priority === 'medium'
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draft Message */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Prepared Message Draft
              </h4>
              <button
                onClick={() => copyToClipboard(generatedResult.draftMessage)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#FAF9F6] px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                {copiedDraft ? <Check className="h-3 w-3 text-teal-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedDraft ? 'Copied' : 'Copy Draft'}</span>
              </button>
            </div>
            <pre className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap font-sans-clean leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-slate-100">
              {generatedResult.draftMessage}
            </pre>
          </div>

          {/* Assumptions & Obstacles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-indigo-100 bg-[#FAF9F6] p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Identified Assumptions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {generatedResult.assumptions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-[#FAF9F6] p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Potential Obstacles
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {generatedResult.obstacles.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
