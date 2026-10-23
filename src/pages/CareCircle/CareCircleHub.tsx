import React from 'react';
import {
  Calendar,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareCircleSubPage } from '../../types';
import { CareOverview } from './CareOverview';
import { CareAssistant } from './CareAssistant';
import { CareSchedule } from './CareSchedule';
import { CareTasks } from './CareTasks';
import { CareCheckIns } from './CareCheckIns';
import { CareShopping } from './CareShopping';
import { CareSettings } from './CareSettings';

export const CareCircleHub: React.FC = () => {
  const {
    careSubPage,
    setCareSubPage,
    setPage,
    familyMembers,
    careTasks,
    checkIns,
  } = useApp();

  const subNavItems: {
    id: CareCircleSubPage;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
  }[] = [
    { id: 'overview', label: 'Overview', icon: HeartHandshake },
    { id: 'assistant', label: 'Care assistant', icon: MessageSquare },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    {
      id: 'tasks',
      label: 'Family tasks',
      icon: CheckCircle2,
      badge: careTasks.filter((t) => !t.completed).length,
    },
    {
      id: 'checkins',
      label: 'Check-ins',
      icon: Users,
      badge: checkIns.filter((c) => c.status === 'pending').length > 0 ? 'Pending' : undefined,
    },
    { id: 'shopping', label: 'Shopping list', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#253a33]">
      {/* Top Banner connecting LifeBridge AI and CareCircle */}
      <div className="border-b border-[#e5dfd2] bg-[#eae5d8] px-4 py-2 text-xs text-[#526659]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => setPage('dashboard')}
            className="flex items-center gap-1.5 font-semibold text-[#30483d] hover:text-[#182922] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to LifeBridge Dashboard</span>
          </button>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#657a6d]">
            <span>LifeBridge AI Ecosystem</span>
            <span>·</span>
            <span className="font-bold text-[#273e35]">CareCircle Integrated</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* CareCircle Sub-Bar Header */}
        <div className="rounded-2xl border border-[#ded7c8] bg-[#fffdf8] p-4 sm:p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e9bd79] text-[#263e36] shadow-sm">
              <Users className="h-6 w-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="serif text-xl sm:text-2xl font-bold tracking-tight text-[#263d35]">
                  CareCircle AI
                </h2>
                <span className="rounded-full bg-[#e8eee5] px-2.5 py-0.5 text-[10px] font-bold text-[#456b4d]">
                  Active Circle
                </span>
              </div>
              <p className="text-xs text-[#728377] mt-0.5">
                Family care, together · {familyMembers.length} family members connected
              </p>
            </div>
          </div>

          {/* Sub Navigation pills */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = careSubPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCareSubPage(item.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#263d35] text-[#fffdf7] shadow-sm'
                      : 'text-[#4e6457] hover:bg-[#eae4d5] hover:text-[#263d35]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#e9bd79]' : 'text-[#6e8275]'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#e9bd79] text-[#263d35]'
                          : 'bg-[#e1dbce] text-[#4e6457]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic View rendering based on careSubPage */}
        <div className="pb-16">
          {careSubPage === 'overview' && <CareOverview />}
          {careSubPage === 'assistant' && <CareAssistant />}
          {careSubPage === 'schedule' && <CareSchedule />}
          {careSubPage === 'tasks' && <CareTasks />}
          {careSubPage === 'checkins' && <CareCheckIns />}
          {careSubPage === 'shopping' && <CareShopping />}
          {careSubPage === 'settings' && <CareSettings />}
        </div>
      </div>
    </div>
  );
};
