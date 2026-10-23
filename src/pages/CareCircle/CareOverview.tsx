import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageSquare,
  Plus,
  RefreshCw,
  Sparkles,
  Users,
  ShoppingBag,
  Video,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { APP_IMAGES } from '../../assets/images';

export const CareOverview: React.FC = () => {
  const {
    familyMembers,
    dailyPlan,
    careTasks,
    toggleCareTask,
    careReminders,
    checkIns,
    generateCareCirclePlan,
    setCareSubPage,
    showToast,
  } = useApp();

  const [isPlanning, setIsPlanning] = useState(false);

  const handleMakePlan = () => {
    setIsPlanning(true);
    setTimeout(() => {
      generateCareCirclePlan();
      setIsPlanning(false);
    }, 600);
  };

  const openTasks = careTasks.filter((t) => !t.completed);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow tracking-widest text-[#7d8f82]">
            TODAY · A FRESH START
          </span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] mt-1.5 font-bold">
            Your family, in rhythm
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            A clear view of what’s happening, who’s carrying it, and what might make today easier.
          </p>
        </div>

        {/* Member Avatars Stack with Photo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            <img
              src={APP_IMAGES.grandmaPortrait}
              alt="Grandma Rose"
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-full object-cover border-2 border-[#fffdf7] shadow-sm z-10"
              title="Grandma Rose · Care Recipient"
            />
            {familyMembers.map((m) => (
              <span
                key={m.id}
                title={`${m.name} · ${m.role}`}
                className="avatar border-2 border-[#fffdf7] text-slate-900 font-bold shadow-sm"
                style={{ backgroundColor: m.color }}
              >
                {m.initials}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-[#5c7365]">
            Grandma + {familyMembers.length} caregivers
          </span>
        </div>
      </div>

      {/* Visual Care Spotlight Hero: Multigenerational Joy & Telehealth Connection */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Family Living Room Card */}
        <div className="md:col-span-7 relative rounded-3xl overflow-hidden border border-[#ded7c8] bg-[#fffdf8] shadow-sm group">
          <img
            src={APP_IMAGES.familyCarecircleJoy}
            alt="Multigenerational family gathering with nurse"
            referrerPolicy="no-referrer"
            className="w-full h-56 sm:h-64 object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b25]/85 via-[#1b2b25]/30 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#e9bd79] bg-[#263e36]/80 px-2.5 py-0.5 rounded-full inline-block w-fit mb-1 border border-[#e9bd79]/40">
              CareCircle Live Hub
            </span>
            <h3 className="serif text-lg sm:text-xl font-bold">
              Shared Caregiving, Zero Loneliness
            </h3>
            <p className="text-xs text-[#e0e8e3] mt-1 max-w-lg leading-relaxed">
              Grandma Rose surrounded by children, grandchildren, and visiting clinical support in a unified care network.
            </p>
          </div>
        </div>

        {/* Doctor Telehealth Link Card */}
        <div className="md:col-span-5 rounded-3xl border border-[#ded7c8] bg-[#fffdf8] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-[#d8d9ca] shadow-2xs">
              <img
                src={APP_IMAGES.carecircleTelehealth}
                alt="Dr. Sarah Jenkins Telehealth"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1 rounded bg-[#263e36]/90 px-1 text-[8px] font-bold text-[#e9bd79]">
                MD
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#5c7365]">
                Clinical Liaison
              </span>
              <h4 className="serif text-sm font-bold text-[#263d35]">Dr. Sarah Jenkins</h4>
              <p className="text-[11px] text-[#718277]">Market Health Senior Care</p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-[#426b48]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#426b48] animate-pulse" />
                <span>Next consult: Thu 2 PM</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ede8db] space-y-2">
            <button
              onClick={() => setCareSubPage('assistant')}
              className="w-full flex items-center justify-between rounded-xl bg-[#263d35] px-3.5 py-2 text-xs font-bold text-[#fffdf7] hover:bg-[#1a2c26] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#e9bd79]" />
                <span>Draft Consult Questions</span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#e9bd79]" />
            </button>

            <button
              onClick={() => showToast('Telehealth room link copied to family circle chat!')}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[#d8d9ca] bg-[#fffdf8] px-3.5 py-1.5 text-xs font-semibold text-[#334a40] hover:bg-[#f1eadb] transition-colors cursor-pointer"
            >
              <Video className="h-3.5 w-3.5 text-[#5c7365]" />
              <span>Copy Video Room Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Today's Flow vs Quick Family Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (7 cols): Today's Flow Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <section className="panel p-6 sm:p-7 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#ede8db]">
              <div>
                <span className="eyebrow text-[#7d8f82]">THE DAY, AT A GLANCE</span>
                <h2 className="serif text-xl sm:text-2xl text-[#263d35] font-bold mt-1">
                  Today’s flow
                </h2>
              </div>

              <button
                onClick={handleMakePlan}
                disabled={isPlanning}
                className="soft-button cursor-pointer flex items-center gap-2 rounded-xl border border-[#d8d9ca] bg-[#fffdf7] px-3.5 py-2 text-xs font-semibold text-[#334a40] shadow-sm hover:bg-[#f1eadb] transition-all disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#d9a84e]" />
                <span>{isPlanning ? 'Putting it together...' : 'Make a gentle plan'}</span>
              </button>
            </div>

            {/* Daily plan flow rows */}
            <div className="mt-6 space-y-1">
              {dailyPlan.map((step, idx) => (
                <div key={idx} className="flex gap-4 py-3 group">
                  <span className="mono w-16 pt-1 text-[11px] font-semibold text-[#879188] tabular-nums shrink-0">
                    {step.time}
                  </span>

                  <div className="relative mt-1 flex w-3 justify-center">
                    <span className="z-10 h-3 w-3 rounded-full border-2 border-[#7d9b7d] bg-[#fffdf7] group-hover:bg-[#7d9b7d] transition-colors" />
                    {idx < dailyPlan.length - 1 && (
                      <span className="absolute top-3 h-full w-px bg-[#dce2d5]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pl-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-xs sm:text-sm font-bold text-[#263d35]">
                        {step.title}
                      </strong>
                      <span className="rounded-full bg-[#f0eee5] px-2.5 py-0.5 text-[10px] font-medium text-[#5a6a5f]">
                        {step.person}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#78887e] leading-relaxed">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Col (5 cols): Tasks & Check-In Snapshot */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Check-In Card */}
          <div className="panel p-5 sm:p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="eyebrow text-[#7d8f82]">WELLBEING STATUS</span>
                <h3 className="serif text-lg text-[#263d35] font-bold mt-0.5">
                  Today’s Check-Ins
                </h3>
              </div>
              <button
                onClick={() => setCareSubPage('checkins')}
                className="text-xs font-semibold text-[#5a7b68] hover:underline cursor-pointer"
              >
                Log Check-In →
              </button>
            </div>

            <div className="space-y-2.5">
              {checkIns.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf8f1] border border-[#ede7d8]"
                >
                  <div className="flex items-center gap-2.5">
                    {item.person.toLowerCase().includes('grandma') ? (
                      <img
                        src={APP_IMAGES.grandmaPortrait}
                        alt={item.person}
                        referrerPolicy="no-referrer"
                        className="h-7 w-7 rounded-full object-cover border border-amber-300 shadow-2xs"
                      />
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9d9c3] text-xs font-bold text-[#74593d]">
                        {item.person.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#2b4239]">{item.person}</h4>
                      <p className="text-[10px] text-[#86948b]">
                        {item.status === 'checked-in'
                          ? `Checked in at ${item.time}`
                          : 'Awaiting scheduled check-in'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      item.status === 'checked-in'
                        ? 'bg-[#e5f0e4] text-[#426b48]'
                        : 'bg-[#faeed6] text-[#916a28]'
                    }`}
                  >
                    {item.status === 'checked-in' ? 'Checked in' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Family Tasks */}
          <div className="panel p-5 sm:p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="eyebrow text-[#7d8f82]">SHARED TASKS</span>
                <h3 className="serif text-lg text-[#263d35] font-bold mt-0.5">
                  Things to do today ({openTasks.length})
                </h3>
              </div>
              <button
                onClick={() => setCareSubPage('tasks')}
                className="text-xs font-semibold text-[#5a7b68] hover:underline cursor-pointer"
              >
                View all →
              </button>
            </div>

            <div className="space-y-2">
              {careTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleCareTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    task.completed
                      ? 'border-[#ede7d8] bg-[#faf8f1] text-[#939e96] line-through'
                      : 'border-[#e4ded0] bg-[#fffdf8] text-[#2b4239] hover:border-[#688b76]'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      task.completed
                        ? 'border-[#628b6d] bg-[#628b6d] text-white'
                        : 'border-[#c8c5b6]'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-relaxed">{task.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-[#86948b] no-underline">
                      <span className="font-medium text-[#465d51]">{task.person}</span>
                      <span>·</span>
                      <span>Due {task.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCareSubPage('assistant')}
              className="panel p-4 bg-[#fffdf7] border border-[#e7e1d5] rounded-xl text-left hover:bg-[#faf7ee] transition-colors cursor-pointer"
            >
              <MessageSquare className="h-5 w-5 text-[#3e5f52] mb-2" />
              <h4 className="text-xs font-bold text-[#263d35]">Care Assistant</h4>
              <p className="text-[10px] text-[#7d8f82] mt-0.5">Gentle guidance & drafts</p>
            </button>

            <button
              onClick={() => setCareSubPage('shopping')}
              className="panel p-4 bg-[#fffdf7] border border-[#e7e1d5] rounded-xl text-left hover:bg-[#faf7ee] transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5 text-[#ba8e47] mb-2" />
              <h4 className="text-xs font-bold text-[#263d35]">Shared Shopping</h4>
              <p className="text-[10px] text-[#7d8f82] mt-0.5">Groceries & pharmacy</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
