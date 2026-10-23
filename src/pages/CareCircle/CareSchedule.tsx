import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScheduleEvent } from '../../types';

export const CareSchedule: React.FC = () => {
  const { scheduleEvents, addScheduleEvent, familyMembers, showToast } = useApp();

  const [selectedPerson, setSelectedPerson] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    person: familyMembers[0]?.name || 'Everyone',
    time: '10:00 AM',
    category: 'Family' as ScheduleEvent['category'],
    location: 'Home',
  });

  const categories = ['All', 'Family', 'Health', 'Home', 'Activity', 'Work'];

  const filteredEvents = scheduleEvents.filter((evt) => {
    const personMatch = selectedPerson === 'All' || evt.person === selectedPerson || evt.person === 'Everyone';
    const catMatch = selectedCategory === 'All' || evt.category === selectedCategory;
    return personMatch && catMatch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Please enter an event title', 'error');
      return;
    }

    const newEvent: ScheduleEvent = {
      id: `evt-${Date.now()}`,
      title: form.title,
      person: form.person,
      time: form.time,
      category: form.category,
      location: form.location,
    };

    addScheduleEvent(newEvent);
    setModalOpen(false);
    setForm({
      title: '',
      person: familyMembers[0]?.name || 'Everyone',
      time: '10:00 AM',
      category: 'Family',
      location: 'Home',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow text-[#7d8f82]">FAMILY TIMELINE · EVENTS & REMINDERS</span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
            The family calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            All appointments, medicine times, school drop-offs, and visiting hours in one unified view.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="soft-button cursor-pointer flex items-center gap-2 rounded-xl bg-[#263d35] text-[#fffdf7] px-4 py-2.5 text-xs font-semibold hover:bg-[#324f44] transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event / Reminder</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf8f1] p-3 rounded-xl border border-[#ede7d8]">
        {/* Person filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-[#66776c] mr-1">Person:</span>
          <button
            onClick={() => setSelectedPerson('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedPerson === 'All'
                ? 'bg-[#263d35] text-white'
                : 'text-[#4e6457] hover:bg-[#eae3d2]'
            }`}
          >
            All
          </button>
          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedPerson(m.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPerson === m.name
                  ? 'bg-[#263d35] text-white'
                  : 'text-[#4e6457] hover:bg-[#eae3d2]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[11px] font-semibold text-[#66776c] mr-1">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-[#d8d5c7] bg-[#fffdf8] px-2.5 py-1 text-xs text-[#263d35] focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Timeline Cards */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-[#8b978f]">
            <Calendar className="h-8 w-8 mx-auto text-[#b2beb6] mb-2" />
            <p className="text-sm font-semibold text-[#486355]">No events match this filter</p>
            <p className="text-xs text-[#808f84] mt-0.5">Try clearing filters or adding an event.</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#ece6d8] bg-[#faf8f1] hover:border-[#ccd7ce] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#263d35] text-[#fffdf7]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d0e0d5]">
                    TIME
                  </span>
                  <span className="text-xs font-bold font-mono">{evt.time}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#263d35]">{evt.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#6e7d73]">
                    <span className="flex items-center gap-1 font-medium text-[#3b5547]">
                      <User className="h-3 w-3" /> {evt.person}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#6e7d73]">
                      <MapPin className="h-3 w-3" /> {evt.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    evt.category === 'Health'
                      ? 'bg-[#faeed6] text-[#8e6524]'
                      : evt.category === 'Family'
                      ? 'bg-[#e5f0e4] text-[#3d6543]'
                      : 'bg-[#e7ebee] text-[#425969]'
                  }`}
                >
                  {evt.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#ded8c9] bg-[#fffdf7] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ede7d8] pb-3 mb-4">
              <h3 className="serif text-lg font-bold text-[#263d35]">Add to Family Calendar</h3>
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
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Blood pressure check, Dentist appointment"
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none focus:border-[#527763]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Family Member
                  </label>
                  <select
                    value={form.person}
                    onChange={(e) => setForm({ ...form, person: e.target.value })}
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  >
                    <option value="Everyone">Everyone</option>
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 10:30 AM"
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as ScheduleEvent['category'] })
                    }
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  >
                    <option value="Family">Family</option>
                    <option value="Health">Health</option>
                    <option value="Home">Home</option>
                    <option value="Activity">Activity</option>
                    <option value="Work">Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Home, Telehealth, School"
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  />
                </div>
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
                  Save to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
