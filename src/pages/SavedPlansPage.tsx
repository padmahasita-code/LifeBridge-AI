import React, { useState } from 'react';
import {
  Archive,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, URGENCY_LABELS } from '../utils/data';

export const SavedPlansPage: React.FC = () => {
  const {
    plans,
    togglePlanTask,
    archivePlan,
    deletePlan,
    setPage,
    setCareSubPage,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPlans = plans.filter((p) => p.status === activeTab);

  const handleCopyDraft = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast('Draft message copied');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('Copy failed', 'error');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 bg-[#FAF9F6] text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Action Archive
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Saved Plans</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Track progress on your action plans, check off tasks, and archive completed tracks.
          </p>
        </div>

        <button
          onClick={() => setPage('create')}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'active'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Active Plans ({plans.filter((p) => p.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'archived'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Archived ({plans.filter((p) => p.status === 'archived').length})
        </button>
      </div>

      {/* Plans List */}
      {filteredPlans.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-sm">
          <p className="text-sm font-bold text-slate-700">
            {activeTab === 'active' ? 'No active plans found' : 'No archived plans yet'}
          </p>
          <p className="text-xs mt-1 text-slate-500">
            Create an action plan to break down life challenges into actionable steps.
          </p>
          {activeTab === 'active' && (
            <button
              onClick={() => setPage('create')}
              className="mt-4 inline-flex items-center gap-1.5 rounded-2xl bg-teal-500 px-5 py-2 text-xs font-bold text-white hover:bg-teal-600 shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create Plan</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPlans.map((plan) => {
            const completedCount = plan.tasks?.filter((t) => t.completed).length || 0;
            const totalCount = plan.tasks?.length || 0;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div
                key={plan.id}
                className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-7 space-y-5 shadow-sm"
              >
                {/* Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                        {CATEGORY_LABELS[plan.category]}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          plan.urgency === 'urgent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : plan.urgency === 'soon'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {URGENCY_LABELS[plan.urgency]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{plan.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{plan.summary}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {plan.status === 'active' ? (
                      <button
                        onClick={() => archivePlan(plan.id)}
                        className="flex items-center gap-1 rounded-xl border border-slate-200 bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 shadow-xs"
                        title="Archive Plan"
                      >
                        <Archive className="h-3.5 w-3.5" />
                        <span>Archive</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 shadow-xs"
                        title="Delete Permanently"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                    <span>Task Checklist Progress</span>
                    <span className="font-bold text-slate-900">
                      {completedCount} of {totalCount} completed ({progress}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Task items */}
                {plan.tasks && plan.tasks.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {plan.tasks.map((task, idx) => (
                      <div
                        key={task.id || idx}
                        onClick={() => togglePlanTask(plan.id, task.id || '')}
                        className={`flex items-start gap-3 rounded-2xl border p-3.5 text-xs transition-all cursor-pointer ${
                          task.completed
                            ? 'border-slate-200 bg-slate-50 text-slate-400 line-through'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 shadow-xs'
                        }`}
                      >
                        <button
                          type="button"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors mt-0.5 ${
                            task.completed
                              ? 'border-teal-500 bg-teal-500 text-white'
                              : 'border-slate-300 bg-white hover:border-slate-400'
                          }`}
                        >
                          {task.completed && <Check className="h-3.5 w-3.5" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold leading-relaxed">{task.text}</p>
                          <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {task.timeframe}
                            </span>
                            <span className="uppercase font-bold tracking-wider">{task.priority} Priority</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom link to CareCircle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Need family help? Assign these tasks to CareCircle members.
                  </span>
                  <button
                    onClick={() => {
                      setCareSubPage('tasks');
                      setPage('carecircle');
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950"
                  >
                    <Users className="h-3.5 w-3.5 text-amber-600" />
                    <span>Open in CareCircle</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
