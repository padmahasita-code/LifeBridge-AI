import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  Phone,
  Plus,
  ShieldAlert,
  Smile,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { APP_IMAGES } from '../../assets/images';
import { CheckIn } from '../../types';

export const CareCheckIns: React.FC = () => {
  const { checkIns, submitCheckIn, familyMembers, careActivities, showToast } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(familyMembers[0]?.name || 'Mom');
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'need-help'>('good');
  const [note, setNote] = useState('');
  const [energyLevel, setEnergyLevel] = useState(85);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckIn(selectedPerson, mood, note || 'Feeling well today.', energyLevel);
    setModalOpen(false);
    setNote('');
  };

  const handleSimulateEmergencyAlert = () => {
    showToast(
      'Emergency protocol initiated: Automated SMS alerts sent to all 4 circle contacts.',
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow text-[#7d8f82]">FAMILY WELLBEING & PULSE</span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
            A moment to check in
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            Simple, everyday safety and wellness check-ins for elders, kids, and caregivers. Know everyone is accounted for.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="soft-button cursor-pointer flex items-center gap-2 rounded-xl bg-[#263d35] text-[#fffdf7] px-4 py-2.5 text-xs font-semibold hover:bg-[#324f44] transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Record Daily Check-In</span>
          </button>
        </div>
      </div>

      {/* Circle Member Check-In Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {checkIns.map((item) => {
          const member = familyMembers.find((m) => m.name === item.person);
          const isPending = item.status === 'pending';
          const isNeedsAttention = item.status === 'needs-attention';

          return (
            <div
              key={item.id}
              className={`panel p-5 rounded-2xl border transition-all ${
                isNeedsAttention
                  ? 'border-rose-300 bg-rose-50/60'
                  : isPending
                  ? 'border-[#eed9b0] bg-[#fdf9f0]'
                  : 'border-[#e7e1d5] bg-[#fffdf7]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                {item.person.toLowerCase().includes('grandma') ? (
                  <img
                    src={APP_IMAGES.grandmaPortrait}
                    alt={item.person}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                  />
                ) : (
                  <span
                    className="avatar text-xs font-bold ring-2 ring-white"
                    style={{ backgroundColor: member?.color || '#e9bd79' }}
                  >
                    {member?.initials || item.person.slice(0, 1)}
                  </span>
                )}

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    isNeedsAttention
                      ? 'bg-rose-200 text-rose-800'
                      : isPending
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#e5f0e4] text-[#3d6543]'
                  }`}
                >
                  {isNeedsAttention
                    ? 'Needs a Hand'
                    : isPending
                    ? 'Pending Today'
                    : 'Checked In'}
                </span>
              </div>

              <h3 className="serif text-base font-bold text-[#263d35]">{item.person}</h3>
              <p className="text-[11px] text-[#718277]">{member?.role || 'Family Member'}</p>

              {/* Status or Note */}
              <div className="mt-4 pt-3 border-t border-[#ede7d8]">
                {item.status === 'checked-in' ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#55695f]">
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {item.time}
                      </span>
                      <span className="capitalize font-medium text-amber-700">
                        Mood: {item.mood}
                      </span>
                    </div>
                    {item.note && (
                      <p className="text-xs text-[#40564a] italic line-clamp-2">
                        “{item.note}”
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-1">
                    <p className="text-xs text-[#8f743c] flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span>Scheduled check-in pending</span>
                    </p>
                    <button
                      onClick={() => {
                        setSelectedPerson(item.person);
                        setModalOpen(true);
                      }}
                      className="mt-2 text-xs font-semibold text-[#3d5e4f] underline hover:text-[#263d35]"
                    >
                      Check in now →
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency & Backup Support Protocol Bar */}
      <div className="panel p-6 bg-gradient-to-r from-[#f7f2e6] to-[#f4eee0] border border-[#ded5c2] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#263d35] text-[#e9bd79]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#263d35]">
              CareCircle Safety & Missed-Check-in Protocol
            </h3>
            <p className="text-xs text-[#6e7d73] mt-0.5 max-w-xl leading-relaxed">
              If an elder or family member does not check in after 2 attempts, our protocol automatically alerts Mrs. Rao (neighbor) and building reception before escalating.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateEmergencyAlert}
          className="flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors shrink-0"
        >
          <Phone className="h-4 w-4" />
          <span>Test Emergency Alert</span>
        </button>
      </div>

      {/* Recent Check-In History Log */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-4">
        <h3 className="serif text-lg font-bold text-[#263d35]">Recent Circle Activity</h3>
        <div className="space-y-3">
          {careActivities.map((act) => (
            <div
              key={act.id}
              className="flex items-start justify-between text-xs py-2 border-b border-[#f0ece1] last:border-0"
            >
              <div>
                <strong className="text-[#263d35]">{act.label}:</strong>{' '}
                <span className="text-[#5f7065]">{act.detail}</span>
              </div>
              <span className="text-[11px] font-mono text-[#8d9b91] tabular-nums shrink-0 ml-2">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Check-In Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#ded8c9] bg-[#fffdf7] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ede7d8] pb-3 mb-4">
              <h3 className="serif text-lg font-bold text-[#263d35]">Record Check-In</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#88968d] hover:text-[#263d35]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Checking In For:
                </label>
                <select
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  How are they feeling right now?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'great', label: 'Great', emoji: '🌟' },
                    { id: 'good', label: 'Good', emoji: '😊' },
                    { id: 'okay', label: 'Okay', emoji: '☕' },
                    { id: 'need-help', label: 'Need Hand', emoji: '🤝' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMood(m.id as any)}
                      className={`rounded-xl border p-2 text-center text-xs transition-all ${
                        mood === m.id
                          ? 'border-[#263d35] bg-[#263d35] text-white font-bold'
                          : 'border-[#ded8c9] bg-white text-[#4d6155] hover:bg-[#faf8f1]'
                      }`}
                    >
                      <div className="text-base">{m.emoji}</div>
                      <div className="text-[10px] mt-0.5">{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Quick Note / Update
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Took morning meds, ate breakfast, rested well."
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                />
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
                  Confirm Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
