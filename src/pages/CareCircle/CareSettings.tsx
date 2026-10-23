import React, { useState } from 'react';
import { HeartHandshake, Phone, Plus, ShieldCheck, UserCheck, Users, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FamilyMember } from '../../types';

export const CareSettings: React.FC = () => {
  const { familyMembers, addFamilyMember, setPage, showToast } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [initials, setInitials] = useState('');
  const [color, setColor] = useState('#f7b29a');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const palette = ['#f7b29a', '#a5c4e0', '#c8b4df', '#f2d37c', '#9bc28d', '#e5a388'];

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter a name', 'error');
      return;
    }

    const newMember: FamilyMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Caregiver',
      initials: (initials.trim() || name.trim().slice(0, 1)).toUpperCase(),
      color,
      phone: phone.trim() || '+1 (555) 000-0000',
      notes: notes.trim() || 'Family care circle member.',
    };

    addFamilyMember(newMember);
    setModalOpen(false);
    setName('');
    setRole('');
    setInitials('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow text-[#7d8f82]">YOUR CIRCLE · MEMBERS & ROLES</span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
            Your family space
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            Manage the caregivers, loved ones, and helpers in your circle. Add new members and configure emergency roles.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="soft-button cursor-pointer flex items-center gap-2 rounded-xl bg-[#263d35] text-[#fffdf7] px-4 py-2.5 text-xs font-semibold hover:bg-[#324f44] transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Circle Member</span>
        </button>
      </div>

      {/* Circle Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="panel p-5 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm flex items-start gap-4"
          >
            <span
              className="avatar text-sm font-bold shadow-sm ring-2 ring-white"
              style={{ backgroundColor: member.color, width: 44, height: 44 }}
            >
              {member.initials}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="serif text-base font-bold text-[#263d35]">{member.name}</h3>
                <span className="rounded-full bg-[#f0ede4] px-2 py-0.5 text-[10px] font-semibold text-[#5a6b61]">
                  {member.role}
                </span>
              </div>

              {member.phone && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[#738379]">
                  <Phone className="h-3 w-3 text-[#527763]" /> {member.phone}
                </p>
              )}

              {member.notes && (
                <p className="mt-2 text-xs text-[#52645a] leading-relaxed bg-[#faf8f1] p-2.5 rounded-xl border border-[#ece6d9]">
                  {member.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency & Physician Info Card */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#263d35] font-bold text-base">
          <ShieldCheck className="h-5 w-5 text-[#3b6350]" />
          <span>Care Protocol & Primary Medical Contacts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-[#faf8f1] border border-[#ede7d8]">
            <span className="text-[10px] font-semibold text-[#86958c] uppercase tracking-wider block">
              Primary Physician
            </span>
            <strong className="text-xs text-[#263d35] mt-1 block">Dr. Sarah Henderson, MD</strong>
            <p className="text-[11px] text-[#63756b] mt-0.5">Westside Medical Clinic · (555) 789-0123</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#faf8f1] border border-[#ede7d8]">
            <span className="text-[10px] font-semibold text-[#86958c] uppercase tracking-wider block">
              Preferred Hospital
            </span>
            <strong className="text-xs text-[#263d35] mt-1 block">City Memorial Health Center</strong>
            <p className="text-[11px] text-[#63756b] mt-0.5">Emergency Dept · (555) 911-0000</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#faf8f1] border border-[#ede7d8]">
            <span className="text-[10px] font-semibold text-[#86958c] uppercase tracking-wider block">
              Secondary Emergency Backup
            </span>
            <strong className="text-xs text-[#263d35] mt-1 block">Mrs. Rao (Trusted Neighbor)</strong>
            <p className="text-[11px] text-[#63756b] mt-0.5">Apt 4B · (555) 432-1098</p>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#ded8c9] bg-[#fffdf7] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ede7d8] pb-3 mb-4">
              <h3 className="serif text-lg font-bold text-[#263d35]">Add Circle Member</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#88968d] hover:text-[#263d35]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Full Name or Nickname
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!initials && e.target.value) {
                      setInitials(e.target.value.slice(0, 1).toUpperCase());
                    }
                  }}
                  placeholder="e.g. Uncle Robert, Nurse Elena"
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none focus:border-[#527763]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Role in Circle
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Weekend care, Transport"
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Avatar Initials
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    placeholder="e.g. R"
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Color Tag
                </label>
                <div className="flex items-center gap-2">
                  {palette.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`h-7 w-7 rounded-full transition-transform ${
                        color === c ? 'scale-110 ring-2 ring-[#263d35]' : 'opacity-80'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 234-5678"
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Caregiving Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Available after 3 PM on weekdays"
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
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
