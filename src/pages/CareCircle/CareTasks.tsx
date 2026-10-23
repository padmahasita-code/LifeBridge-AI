import React, { useState } from 'react';
import { CheckCircle2, Clock, Plus, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareTask } from '../../types';

export const CareTasks: React.FC = () => {
  const { careTasks, toggleCareTask, addCareTask, familyMembers, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'completed'>('all');
  const [personFilter, setPersonFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    person: familyMembers[0]?.name || 'Mom',
    due: 'Today',
    priority: 'medium' as CareTask['priority'],
  });

  const filteredTasks = careTasks.filter((task) => {
    const statusMatch =
      statusFilter === 'all'
        ? true
        : statusFilter === 'open'
        ? !task.completed
        : task.completed;

    const personMatch =
      personFilter === 'all' ? true : task.person === personFilter;

    return statusMatch && personMatch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    const newTask: CareTask = {
      id: `task-${Date.now()}`,
      title: form.title,
      person: form.person,
      due: form.due,
      priority: form.priority,
      completed: false,
    };

    addCareTask(newTask);
    setModalOpen(false);
    setForm({
      title: '',
      person: familyMembers[0]?.name || 'Mom',
      due: 'Today',
      priority: 'medium',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow text-[#7d8f82]">SHARED RESPONSIBILITIES</span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
            Things we’ll do together
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            Collaborate without nagging. Assign tasks, track progress, and celebrate shared efforts.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="soft-button cursor-pointer flex items-center gap-2 rounded-xl bg-[#263d35] text-[#fffdf7] px-4 py-2.5 text-xs font-semibold hover:bg-[#324f44] transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Family Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf8f1] p-3 rounded-xl border border-[#ede7d8]">
        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-[#66776c] mr-1">Status:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#263d35] text-white'
                : 'text-[#4e6457] hover:bg-[#eae3d2]'
            }`}
          >
            All ({careTasks.length})
          </button>
          <button
            onClick={() => setStatusFilter('open')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === 'open'
                ? 'bg-[#263d35] text-white'
                : 'text-[#4e6457] hover:bg-[#eae3d2]'
            }`}
          >
            Open ({careTasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === 'completed'
                ? 'bg-[#263d35] text-white'
                : 'text-[#4e6457] hover:bg-[#eae3d2]'
            }`}
          >
            Done ({careTasks.filter((t) => t.completed).length})
          </button>
        </div>

        {/* Person filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[11px] font-semibold text-[#66776c] mr-1">Assignee:</span>
          <select
            value={personFilter}
            onChange={(e) => setPersonFilter(e.target.value)}
            className="rounded-lg border border-[#d8d5c7] bg-[#fffdf8] px-2.5 py-1 text-xs text-[#263d35] focus:outline-none"
          >
            <option value="all">Everyone</option>
            {familyMembers.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Cards list */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-[#8b978f]">
            <CheckCircle2 className="h-8 w-8 mx-auto text-[#b2beb6] mb-2" />
            <p className="text-sm font-semibold text-[#486355]">No tasks found</p>
            <p className="text-xs text-[#808f84] mt-0.5">Everything is caught up or filtered out.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleCareTask(task.id)}
              className={`flex items-start sm:items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                task.completed
                  ? 'border-[#ede7d8] bg-[#faf8f1] text-[#939e96]'
                  : 'border-[#e4ded0] bg-[#fffdf8] text-[#263d35] hover:border-[#688b76]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    task.completed
                      ? 'border-[#5e876a] bg-[#5e876a] text-white'
                      : 'border-[#c8c5b6]'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold ${
                      task.completed ? 'line-through text-[#909c93]' : 'text-[#263d35]'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#738379]">
                    <span className="flex items-center gap-1 font-medium text-[#465d51]">
                      <User className="h-3 w-3" /> {task.person}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Due {task.due}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    task.priority === 'high'
                      ? 'bg-[#fbe8e6] text-[#b33e38]'
                      : task.priority === 'medium'
                      ? 'bg-[#faeed6] text-[#8e6524]'
                      : 'bg-[#edf0ec] text-[#55695d]'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#ded8c9] bg-[#fffdf7] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ede7d8] pb-3 mb-4">
              <h3 className="serif text-lg font-bold text-[#263d35]">Create Family Task</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#88968d] hover:text-[#263d35]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Task Description
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Pick up Grandma's blood pressure prescription"
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none focus:border-[#527763]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Assign To
                  </label>
                  <select
                    value={form.person}
                    onChange={(e) => setForm({ ...form, person: e.target.value })}
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Due By
                  </label>
                  <select
                    value={form.due}
                    onChange={(e) => setForm({ ...form, due: e.target.value })}
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tonight">Tonight</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This weekend">This weekend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value as CareTask['priority'] })
                  }
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                >
                  <option value="low">Gentle / Low</option>
                  <option value="medium">Medium / Needed soon</option>
                  <option value="high">Urgent / Time-sensitive</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#ded8c9] px-4 py-2 text-xs font-medium text-[#5c6e64] hover:bg-[#faf8f1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#263d35] px-4 py-2 text-xs font-semibold text-white hover:bg-[#345145]"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
