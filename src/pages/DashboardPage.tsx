import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileText,
  HeartHandshake,
  KeyRound,
  Layers,
  MessageSquare,
  PhoneCall,
  Pill,
  Plus,
  Server,
  ShieldAlert,
  Sparkles,
  User,
  Users,
  Video,
  Wifi,
  Wrench,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    plans,
    setPage,
    togglePlanTask,
    familyMembers,
    checkIns,
    careTasks,
    toggleCareTask,
    careReminders,
    toggleCareReminder,
    setCareSubPage,
    showToast,
  } = useApp();

  const activePlans = plans.filter((p) => p.status === 'active');
  const allOpenTasks: { planId: string; taskId: string; text: string; priority: string; timeframe: string }[] = [];

  activePlans.forEach((plan) => {
    plan.tasks?.forEach((task) => {
      if (!task.completed) {
        allOpenTasks.push({
          planId: plan.id,
          taskId: task.id || task.text,
          text: task.text,
          priority: task.priority,
          timeframe: task.timeframe,
        });
      }
    });
  });

  const pendingCheckinsCount = checkIns.filter((c) => c.status === 'pending').length;
  const pendingCareTasksCount = careTasks.filter((t) => !t.completed).length;

  // Realistic sample medication schedule for today
  const [medications, setMedications] = useState([
    { id: 'm1', name: 'Lisinopril', dose: '20 mg', time: '8:00 AM', withFood: 'With water & breakfast', taken: true },
    { id: 'm2', name: 'Metformin', dose: '500 mg', time: '1:00 PM', withFood: 'With lunch', taken: true },
    { id: 'm3', name: 'Atorvastatin', dose: '20 mg', time: '8:00 PM', withFood: 'At bedtime', taken: false },
  ]);

  const toggleMed = (id: string) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.taken;
          showToast(next ? `Marked ${m.name} as taken!` : `Reopened ${m.name}`);
          return { ...m, taken: next };
        }
        return m;
      })
    );
  };

  // Quick journal entry
  const [journalInput, setJournalInput] = useState('');
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 'j1',
      author: 'Primary Caregiver (Dad)',
      time: 'Today, 9:15 AM',
      text: 'Grandma slept well for 7.5 hours. Morning BP: 124/82. Enjoyed oatmeal with blueberries.',
    },
  ]);

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;
    const newEntry = {
      id: `j-${Date.now()}`,
      author: 'Caregiver',
      time: 'Just now',
      text: journalInput.trim(),
    };
    setJournalEntries([newEntry, ...journalEntries]);
    setJournalInput('');
    showToast('Saved note to care journal!');
  };

  const [telehealthConnected, setTelehealthConnected] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-[#FAF9F6] text-slate-800">
      {/* Visual Family Healthcare Hub Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-indigo-100 bg-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200/80 px-3 py-1 text-xs font-semibold text-teal-800 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
                <span>
                  {currentUser ? `Signed in: ${currentUser.name} (${currentUser.badge})` : 'Coordinated Family Care · Live Sync'}
                </span>
              </div>
              <button
                onClick={() => setPage('login')}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <KeyRound className="h-3 w-3" />
                <span>Switch Role</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Family Healthcare Dashboard
            </h1>

            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Monitoring and coordinating daily living routines for <strong>Grandma Rose (78)</strong> with 4 family circle members and clinical care partners.
            </p>

            {/* Quick Vitals Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 flex items-center gap-2 text-xs">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-500">BP:</span>
                <strong className="text-slate-800">122/78 mmHg</strong>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 flex items-center gap-2 text-xs">
                <HeartHandshake className="h-4 w-4 text-rose-500" />
                <span className="text-slate-500">Pulse:</span>
                <strong className="text-slate-800">72 BPM</strong>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 flex items-center gap-2 text-xs">
                <Pill className="h-4 w-4 text-teal-600" />
                <span className="text-slate-500">Med Adherence:</span>
                <strong className="text-teal-700">67% (2/3 taken)</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setPage('login')}
                className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              >
                <KeyRound className="h-4 w-4 text-amber-400" />
                <span>Entry Portal & Checks</span>
              </button>

              <button
                onClick={() => setPage('chat')}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Ask AI Care Assistant</span>
              </button>

              <button
                onClick={() => {
                  setCareSubPage('overview');
                  setPage('carecircle');
                }}
                className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Users className="h-4 w-4 text-amber-600" />
                <span>CareCircle Hub ({familyMembers.length})</span>
              </button>

              <button
                onClick={() => setPage('tools')}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Wrench className="h-4 w-4 text-slate-600" />
                <span>12 Clinical Tools</span>
              </button>
            </div>
          </div>

          {/* Right Photo Column */}
          <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full min-h-[260px]">
            <img
              src={APP_IMAGES.familyCarecircleJoy}
              alt="Family healthcare coordination in living room"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 rounded-xl bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Family Circle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Demo Guidance Banner */}
      <div className="flex items-center gap-3 rounded-2xl bg-sky-50/70 border border-sky-200/80 px-4 py-3 text-xs text-sky-900">
        <ShieldAlert className="h-4 w-4 text-sky-600 shrink-0" />
        <span>
          <strong>Healthcare Disclaimer:</strong> LifeBridge AI assists with family care scheduling and health organization. AI output is not a medical diagnosis. In clinical emergencies, dial 911 or contact your physician.
        </span>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Care Plans</span>
            <FileText className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{activePlans.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Structured checklists & routines</p>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Open Care Tasks</span>
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{pendingCareTasksCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Assigned across family</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Today's Reminders</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{careReminders.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Hydration, walk, and sleep checks</p>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Circle Members</span>
            <Users className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{familyMembers.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">{pendingCheckinsCount} check-in pending</p>
        </div>
      </div>

      {/* Main Grid: Care Recipient & Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Recipient Profile + Medications + Telehealth */}
        <div className="lg:col-span-2 space-y-6">
          {/* Care Recipient Profile Card */}
          <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={APP_IMAGES.grandmaPortrait}
                    alt="Grandma Rose portrait"
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white" title="Care Status: Stable">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">Grandma Rose</h2>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                      Care Recipient
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Age: 78 · Blood Type: O+ · Primary Care: Dr. Sarah Jenkins</p>
                  <p className="text-[11px] text-teal-700 font-semibold mt-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Last check-in: 9:15 AM by Dad (Rajesh) — “Resting comfortably”
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs">
                  Status: Stable & Resting
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500 block">Primary Conditions</span>
                <span className="font-bold text-slate-800 mt-0.5 block">Hypertension, Mild Osteoarthritis</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500 block">Known Allergies</span>
                <span className="font-bold text-slate-800 mt-0.5 block">Penicillin, Shellfish</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500 block">Preferred Language</span>
                <span className="font-bold text-slate-800 mt-0.5 block">English / Telugu</span>
              </div>
            </div>
          </div>

          {/* Telehealth & Doctor Care Team Showcase */}
          <div className="rounded-3xl border border-teal-200/80 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative shrink-0 w-full sm:w-44 h-36 rounded-2xl overflow-hidden border border-teal-100 shadow-sm">
                <img
                  src={APP_IMAGES.carecircleTelehealth}
                  alt="Dr. Sarah Jenkins Telehealth Physician"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-teal-900/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-teal-100">
                  Primary Physician
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Dr. Sarah Jenkins, MD</h3>
                    <p className="text-xs text-slate-500">Internal Medicine & Senior Geriatrics · Market Health Clinic</p>
                  </div>
                  <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[11px] font-bold text-teal-800">
                    Next: Thu 2:00 PM
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Scheduled 20-min quarterly hypertension review and blood panel discussion. Caregivers can invite family members directly into the secure video call.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      setTelehealthConnected(!telehealthConnected);
                      showToast(telehealthConnected ? 'Disconnected telehealth room' : 'Connected to Telehealth Room Preview!');
                    }}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      telehealthConnected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>{telehealthConnected ? 'Telehealth Room Live · Active' : 'Join Telehealth Room'}</span>
                  </button>

                  <button
                    onClick={() => setPage('tools')}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Prep Questions with AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Medication Schedule */}
          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
            {/* Visual Photo Banner */}
            <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-4 border border-teal-100 shadow-xs">
              <img
                src={APP_IMAGES.careNutritionMeds}
                alt="Daily organized medications and fresh water"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-teal-950/40 to-transparent flex items-center px-5">
                <div className="text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200 bg-teal-800/80 px-2.5 py-0.5 rounded-full border border-teal-600/50">
                    Daily Adherence
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">Medication & Hydration Schedule</h3>
                  <p className="text-[11px] text-teal-100">Lisinopril & Metformin verified for today</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <Pill className="h-5 w-5 text-teal-600" />
                <span>Prescription Timetable</span>
              </div>
              <button
                onClick={() => setPage('tools')}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
              >
                Open Medication Planner →
              </button>
            </div>

            <div className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.id}
                  onClick={() => toggleMed(med.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    med.taken
                      ? 'bg-teal-50/50 border-teal-200 text-teal-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
                        med.taken
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {med.taken && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{med.name}</span>
                        <span className="text-xs opacity-75 font-medium">({med.dose})</span>
                      </div>
                      <span className="text-xs text-slate-500 block">{med.withFood}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-slate-700 block">{med.time}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                        med.taken ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {med.taken ? 'Taken' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Appointments + Emergency Contacts + Quick Journal */}
        <div className="space-y-6">
          {/* Upcoming Clinical Appointments */}
          <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span>Upcoming Appointments</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
                  <span>Cardiology Follow-up</span>
                  <span className="text-indigo-600">Thu, Oct 22 · 2:00 PM</span>
                </div>
                <p className="text-xs text-slate-600">Dr. Sarah Jenkins · Market Health Clinic</p>
                <div className="mt-3 pt-2 border-t border-indigo-100/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Transportation: Dad driving</span>
                  <button
                    onClick={() => setPage('tools')}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Prep with AI →
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>Fasting Blood Lab Panel</span>
                  <span className="text-slate-500">Mon, Nov 2 · 8:30 AM</span>
                </div>
                <p className="text-xs text-slate-600">LabCorp Central Diagnostics</p>
                <p className="text-[11px] text-slate-400 mt-1">Requires 12-hr water-only fast prior to draw.</p>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Card */}
          <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50/50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-3">
              <PhoneCall className="h-4 w-4 text-rose-600" />
              <span>Emergency & Care Team Contacts</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="rounded-xl bg-white border border-rose-100 p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Primary Care: Dr. Jenkins</span>
                  <span className="text-slate-500">Clinic Direct Line</span>
                </div>
                <span className="font-mono text-rose-700 font-semibold">(555) 234-5678</span>
              </div>

              <div className="rounded-xl bg-white border border-rose-100 p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Primary Pharmacy</span>
                  <span className="text-slate-500">Market Street Rx (24h)</span>
                </div>
                <span className="font-mono text-slate-700 font-semibold">(555) 876-5432</span>
              </div>

              <div className="rounded-xl bg-white border border-rose-100 p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Immediate Emergency</span>
                  <span className="text-slate-500">Emergency Services</span>
                </div>
                <span className="font-mono text-rose-600 font-bold text-sm">911</span>
              </div>
            </div>
          </div>

          {/* Caregiver Quick Notes & Journal */}
          <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-sm">
            {/* Visual Photo Banner */}
            <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-4 border border-amber-100 shadow-xs">
              <img
                src={APP_IMAGES.wellnessRespite}
                alt="Caregiver morning tea, journal and fresh flowers"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-3.5">
                <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Caregiver Respite & Reflection Space
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <FileText className="h-4 w-4 text-amber-600" />
                <span>Daily Log & Observations</span>
              </div>
            </div>

            <form onSubmit={handleAddJournal} className="space-y-2 mb-4">
              <input
                type="text"
                value={journalInput}
                onChange={(e) => setJournalInput(e.target.value)}
                placeholder="Log today's vitals, mood, or doctor notes..."
                className="w-full rounded-xl border border-slate-200 bg-[#FAF9F6] px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!journalInput.trim()}
                className="w-full rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Save Note
              </button>
            </form>

            <div className="space-y-2 max-h-[160px] overflow-y-auto">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="rounded-xl bg-amber-50/40 border border-amber-100/60 p-2.5 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="font-semibold text-amber-900">{entry.author}</span>
                    <span>{entry.time}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Infrastructure & Real-Time Sync Status (Front-end & Back-end Telemetry) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-700">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Full-Stack System Health & Synchronization</h3>
              <p className="text-xs text-slate-500">Live operational status across Client Front-End and Express/AI Back-End</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational (99.98% Uptime)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Front-End Node */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 flex gap-4 items-center">
            <div className="relative shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-indigo-200 shadow-xs">
              <img
                src={APP_IMAGES.frontendUiDash}
                alt="Front-end UI Dashboard node"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[9px] font-bold text-white">
                Client SPA
              </span>
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-indigo-950 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-indigo-600" /> Front-End Client
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  60 FPS React 19
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Vite HMR client with Tailwind CSS glassmorphic panels, local encryption, and instant language switching.
              </p>
            </div>
          </div>

          {/* Back-End Node */}
          <div className="rounded-2xl border border-teal-100 bg-teal-50/20 p-4 flex gap-4 items-center">
            <div className="relative shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-teal-200 shadow-xs">
              <img
                src={APP_IMAGES.backendCloudInfra}
                alt="Back-end cloud engine node"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[9px] font-bold text-white">
                Express + AI
              </span>
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-teal-950 flex items-center gap-1">
                  <Server className="h-3.5 w-3.5 text-teal-600" /> Back-End Cloud AI Engine
                </span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                  Gemini Multi-Model Active
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Express REST API with 503 high-demand resilience (<code className="font-mono text-[10px]">gemini-3.8-flash</code> &rarr; <code className="font-mono text-[10px]">gemini-3-flash-preview</code>).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
