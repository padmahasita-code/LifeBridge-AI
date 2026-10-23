import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AIChatMessage,
  AppointmentItem,
  CareActivity,
  CareCircleSubPage,
  CareJournalEntry,
  CareRecipient,
  CareReminder,
  CareTask,
  CheckIn,
  DailyPlanStep,
  Explanation,
  FamilyMember,
  Language,
  MedicationItem,
  PageType,
  Plan,
  ScheduleEvent,
  ShoppingItem,
  UserSession,
} from '../types';
import {
  DEFAULT_APPOINTMENTS,
  DEFAULT_CARE_JOURNAL,
  DEFAULT_CARE_RECIPIENTS,
  DEFAULT_MEDICATIONS,
  INITIAL_CARECIRCLE_ACTIVITIES,
  INITIAL_CARECIRCLE_CHECKINS,
  INITIAL_CARECIRCLE_FAMILY,
  INITIAL_CARECIRCLE_PLAN,
  INITIAL_CARECIRCLE_REMINDERS,
  INITIAL_CARECIRCLE_SCHEDULE,
  INITIAL_CARECIRCLE_SHOPPING,
  INITIAL_CARECIRCLE_TASKS,
  INITIAL_PLANS,
  PRESET_USERS,
} from '../utils/data';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  page: PageType;
  setPage: (page: PageType) => void;
  selectedToolId: string;
  setSelectedToolId: (toolId: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  largeText: boolean;
  setLargeText: (val: boolean) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  demoMode: boolean;

  // User Authentication & Session
  currentUser: UserSession | null;
  setCurrentUser: (user: UserSession | null) => void;
  loginWithRole: (roleId: string) => void;
  loginWithCredentials: (email: string, password?: string, name?: string, role?: UserSession['role']) => boolean;
  logout: () => void;

  // LifeBridge Plans & Tasks
  plans: Plan[];
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  togglePlanTask: (planId: string, taskId: string) => void;
  archivePlan: (id: string) => void;
  deletePlan: (id: string) => void;

  // Explanations
  explanations: Explanation[];
  addExplanation: (exp: Explanation) => void;

  // Clinical & Care Dashboard Records
  careRecipients: CareRecipient[];
  activeRecipientId: string;
  setActiveRecipientId: (id: string) => void;
  addCareRecipient: (recip: CareRecipient) => void;

  medications: MedicationItem[];
  toggleMedicationTaken: (id: string) => void;
  addMedication: (med: MedicationItem) => void;

  appointments: AppointmentItem[];
  addAppointment: (apt: AppointmentItem) => void;

  careJournal: CareJournalEntry[];
  addJournalEntry: (entry: CareJournalEntry) => void;

  // CareCircle Integrated Hub State
  careSubPage: CareCircleSubPage;
  setCareSubPage: (sub: CareCircleSubPage) => void;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: FamilyMember) => void;
  scheduleEvents: ScheduleEvent[];
  addScheduleEvent: (event: ScheduleEvent) => void;
  careTasks: CareTask[];
  toggleCareTask: (id: string) => void;
  addCareTask: (task: CareTask) => void;
  careReminders: CareReminder[];
  addCareReminder: (reminder: CareReminder) => void;
  toggleCareReminder: (id: string) => void;
  checkIns: CheckIn[];
  submitCheckIn: (person: string, mood?: 'great' | 'good' | 'okay' | 'need-help', note?: string, energyLevel?: number) => void;
  shoppingList: ShoppingItem[];
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (item: ShoppingItem) => void;
  removeShoppingItem: (id: string) => void;
  dailyPlan: DailyPlanStep[];
  generateCareCirclePlan: () => void;
  careActivities: CareActivity[];
  logCareActivity: (label: string, detail: string, toolName: string) => void;

  // Real Gemini AI Chat Assistant
  chatMessages: AIChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  startNewChat: () => void;
  isChatLoading: boolean;
  chatError: string | null;

  // Real Gemini AI Tool Execution
  executeAITool: (
    toolId: string,
    input: string,
    options?: any,
    image?: { data: string; mimeType: string }
  ) => Promise<{ result: string; model: string; provider: string; notice?: string }>;

  // System Toasts & Reset
  toasts: ToastState[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<PageType>('dashboard');
  const [selectedToolId, setSelectedToolId] = useState<string>('chat');
  const [careSubPage, setCareSubPage] = useState<CareCircleSubPage>('overview');

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lifebridge-language');
    return saved === 'telugu' || saved === 'hindi' || saved === 'spanish' || saved === 'french'
      ? (saved as Language)
      : 'english';
  });

  const [largeText, setLargeTextState] = useState<boolean>(() => {
    return localStorage.getItem('lifebridge-large-text') === 'true';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('lifebridge-high-contrast') === 'true';
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lifebridge-language', lang);
    showToast(`Language set to ${lang.toUpperCase()}`, 'info');
  };

  const setLargeText = (val: boolean) => {
    setLargeTextState(val);
    localStorage.setItem('lifebridge-large-text', String(val));
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    localStorage.setItem('lifebridge-high-contrast', String(val));
  };

  // User Authentication & Session
  const [currentUser, setCurrentUserState] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('lifebridge-current-user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return PRESET_USERS[0];
  });

  const setCurrentUser = (user: UserSession | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('lifebridge-current-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lifebridge-current-user');
    }
  };

  const loginWithRole = (roleId: string) => {
    const found = PRESET_USERS.find((u) => u.id === roleId || u.role === roleId) || PRESET_USERS[0];
    const updated: UserSession = { ...found, lastLogin: 'Just now' };
    setCurrentUser(updated);
    showToast(`Welcome, ${updated.name}! Role: ${updated.roleTitle}`, 'success');
    if (updated.role === 'senior') {
      setPage('carecircle');
      setCareSubPage('overview');
    } else {
      setPage('dashboard');
    }
  };

  const loginWithCredentials = (
    email: string,
    _password?: string,
    name?: string,
    role?: UserSession['role']
  ): boolean => {
    const matched = PRESET_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const assignedRole = role || matched?.role || 'caregiver';
    const roleTitles: Record<UserSession['role'], { title: string; relation: string; badge: string }> = {
      doctor: { title: 'Attending Physician & Clinician Partner', relation: 'Physician Specialist', badge: 'Verified MD' },
      caregiver: { title: 'Family Caregiver', relation: 'Family Member', badge: 'Caregiver' },
      senior: { title: 'Primary Care Recipient', relation: 'Elder', badge: 'VIP Senior' },
      family: { title: 'Family Circle Contributor', relation: 'Relative', badge: 'Family Care' },
      guest: { title: 'Community Care Volunteer', relation: 'Volunteer', badge: 'Guest' },
    };
    const roleMeta = roleTitles[assignedRole] || roleTitles.caregiver;

    const user: UserSession = matched
      ? { ...matched, role: assignedRole, roleTitle: roleMeta.title, badge: roleMeta.badge, lastLogin: 'Just now' }
      : {
          id: `user-${Date.now()}`,
          name: name?.trim() || email.split('@')[0],
          email: email.trim(),
          role: assignedRole,
          roleTitle: roleMeta.title,
          relation: roleMeta.relation,
          badge: roleMeta.badge,
          familyCircleCode: 'CIRCLE-FAMILY-2026',
          lastLogin: 'Just now',
        };
    setCurrentUser(user);
    showToast(`Signed in as ${user.name}! (${user.roleTitle})`, 'success');
    setPage('dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of LifeBridge CareCircle.', 'info');
    setPage('login');
  };

  // Clinical & Care Recipients
  const [careRecipients, setCareRecipients] = useState<CareRecipient[]>(() => {
    const saved = localStorage.getItem('lifebridge_recipients');
    return saved ? JSON.parse(saved) : DEFAULT_CARE_RECIPIENTS;
  });
  const [activeRecipientId, setActiveRecipientId] = useState<string>(
    careRecipients[0]?.id || 'recip-1'
  );

  const [medications, setMedications] = useState<MedicationItem[]>(() => {
    const saved = localStorage.getItem('lifebridge_medications');
    return saved ? JSON.parse(saved) : DEFAULT_MEDICATIONS;
  });

  const [appointments, setAppointments] = useState<AppointmentItem[]>(() => {
    const saved = localStorage.getItem('lifebridge_appointments');
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  });

  const [careJournal, setCareJournal] = useState<CareJournalEntry[]>(() => {
    const saved = localStorage.getItem('lifebridge_journal');
    return saved ? JSON.parse(saved) : DEFAULT_CARE_JOURNAL;
  });

  useEffect(() => {
    localStorage.setItem('lifebridge_recipients', JSON.stringify(careRecipients));
  }, [careRecipients]);
  useEffect(() => {
    localStorage.setItem('lifebridge_medications', JSON.stringify(medications));
  }, [medications]);
  useEffect(() => {
    localStorage.setItem('lifebridge_appointments', JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem('lifebridge_journal', JSON.stringify(careJournal));
  }, [careJournal]);

  const addCareRecipient = (recip: CareRecipient) => {
    setCareRecipients((prev) => [...prev, recip]);
    showToast(`Added ${recip.name} to care profiles!`);
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.takenToday;
          showToast(next ? `Dose of ${m.name} recorded as taken!` : `Marked ${m.name} as pending`);
          return { ...m, takenToday: next };
        }
        return m;
      })
    );
  };

  const addMedication = (med: MedicationItem) => {
    setMedications((prev) => [med, ...prev]);
    showToast(`Added prescription: ${med.name}`);
  };

  const addAppointment = (apt: AppointmentItem) => {
    setAppointments((prev) => [apt, ...prev]);
    showToast(`Scheduled visit with ${apt.doctorName}`);
  };

  const addJournalEntry = (entry: CareJournalEntry) => {
    setCareJournal((prev) => [entry, ...prev]);
    showToast('New observation saved to care journal!');
  };

  // Plans
  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem('lifebridge_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  useEffect(() => {
    localStorage.setItem('lifebridge_plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (plan: Plan) => {
    setPlans((prev) => [plan, ...prev]);
    showToast('Action plan created and saved!');
  };

  const updatePlan = (id: string, updates: Partial<Plan>) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const togglePlanTask = (planId: string, taskId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id !== planId || !p.tasks) return p;
        return {
          ...p,
          tasks: p.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  completed: !t.completed,
                  completed_at: !t.completed ? new Date().toISOString() : null,
                }
              : t
          ),
        };
      })
    );
  };

  const archivePlan = (id: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'archived' } : p))
    );
    showToast('Plan moved to archives', 'info');
  };

  const deletePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    showToast('Plan removed from records', 'info');
  };

  // Explanations
  const [explanations, setExplanations] = useState<Explanation[]>(() => {
    const saved = localStorage.getItem('lifebridge_explanations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lifebridge_explanations', JSON.stringify(explanations));
  }, [explanations]);

  const addExplanation = (exp: Explanation) => {
    setExplanations((prev) => [exp, ...prev]);
    showToast('Explanation saved to your notebook!');
  };

  // CareCircle Hub State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('carecircle_family');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_FAMILY;
  });

  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem('carecircle_schedule');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_SCHEDULE;
  });

  const [careTasks, setCareTasks] = useState<CareTask[]>(() => {
    const saved = localStorage.getItem('carecircle_tasks');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_TASKS;
  });

  const [careReminders, setCareReminders] = useState<CareReminder[]>(() => {
    const saved = localStorage.getItem('carecircle_reminders');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_REMINDERS;
  });

  const [checkIns, setCheckIns] = useState<CheckIn[]>(() => {
    const saved = localStorage.getItem('carecircle_checkins');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_CHECKINS;
  });

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('carecircle_shopping');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_SHOPPING;
  });

  const [dailyPlan, setDailyPlan] = useState<DailyPlanStep[]>(() => {
    const saved = localStorage.getItem('carecircle_daily_plan');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_PLAN;
  });

  const [careActivities, setCareActivities] = useState<CareActivity[]>(() => {
    const saved = localStorage.getItem('carecircle_activities');
    return saved ? JSON.parse(saved) : INITIAL_CARECIRCLE_ACTIVITIES;
  });

  useEffect(() => {
    localStorage.setItem('carecircle_family', JSON.stringify(familyMembers));
  }, [familyMembers]);
  useEffect(() => {
    localStorage.setItem('carecircle_schedule', JSON.stringify(scheduleEvents));
  }, [scheduleEvents]);
  useEffect(() => {
    localStorage.setItem('carecircle_tasks', JSON.stringify(careTasks));
  }, [careTasks]);
  useEffect(() => {
    localStorage.setItem('carecircle_reminders', JSON.stringify(careReminders));
  }, [careReminders]);
  useEffect(() => {
    localStorage.setItem('carecircle_checkins', JSON.stringify(checkIns));
  }, [checkIns]);
  useEffect(() => {
    localStorage.setItem('carecircle_shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);
  useEffect(() => {
    localStorage.setItem('carecircle_daily_plan', JSON.stringify(dailyPlan));
  }, [dailyPlan]);
  useEffect(() => {
    localStorage.setItem('carecircle_activities', JSON.stringify(careActivities));
  }, [careActivities]);

  const logCareActivity = (label: string, detail: string, toolName: string) => {
    const act: CareActivity = {
      id: `act-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      label,
      detail,
      toolName,
      success: true,
    };
    setCareActivities((prev) => [act, ...prev.slice(0, 19)]);
  };

  const addFamilyMember = (member: FamilyMember) => {
    setFamilyMembers((prev) => [...prev, member]);
    setCheckIns((prev) => [
      ...prev,
      {
        id: `checkin-${member.id}`,
        person: member.name,
        status: 'pending',
        time: null,
      },
    ]);
    logCareActivity('Circle updated', `Welcomed ${member.name} (${member.role}).`, 'add_member');
    showToast(`${member.name} added to your CareCircle!`);
  };

  const addScheduleEvent = (event: ScheduleEvent) => {
    setScheduleEvents((prev) => [...prev, event]);
    logCareActivity('Schedule added', `Added “${event.title}” for ${event.person}.`, 'add_event');
    showToast(`Event “${event.title}” added to calendar.`);
  };

  const toggleCareTask = (id: string) => {
    setCareTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          logCareActivity('Task updated', `${nextState ? 'Completed' : 'Reopened'} “${t.title}”.`, 'complete_task');
          showToast(nextState ? `“${t.title}” completed!` : `“${t.title}” reopened.`);
          return {
            ...t,
            completed: nextState,
            completedAt: nextState ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const addCareTask = (task: CareTask) => {
    setCareTasks((prev) => [task, ...prev]);
    logCareActivity('Task created', `Assigned “${task.title}” to ${task.person}.`, 'create_task');
    showToast(`Task assigned to ${task.person}`);
  };

  const addCareReminder = (reminder: CareReminder) => {
    setCareReminders((prev) => [reminder, ...prev]);
    logCareActivity('Reminder set', `Reminder for ${reminder.person}: “${reminder.title}”.`, 'create_reminder');
    showToast(`Reminder created for ${reminder.person}`);
  };

  const toggleCareReminder = (id: string) => {
    setCareReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const submitCheckIn = (
    person: string,
    mood: 'great' | 'good' | 'okay' | 'need-help' = 'good',
    note: string = 'Checked in safely.',
    energyLevel: number = 85
  ) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckIns((prev) =>
      prev.map((c) =>
        c.person === person
          ? {
              ...c,
              status: mood === 'need-help' ? 'needs-attention' : 'checked-in',
              time: timeStr,
              mood,
              note,
              energyLevel,
            }
          : c
      )
    );
    logCareActivity('Check-in recorded', `${person} checked in: “${note}”.`, 'family_check_in');
    showToast(`Check-in recorded for ${person}!`);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.purchased;
          return { ...item, purchased: next };
        }
        return item;
      })
    );
  };

  const addShoppingItem = (item: ShoppingItem) => {
    setShoppingList((prev) => [item, ...prev]);
    logCareActivity('Shopping list', `Added ${item.quantity} ${item.name}.`, 'add_shopping_item');
    showToast(`Added ${item.name} to shopping list`);
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from shopping list', 'info');
  };

  const generateCareCirclePlan = () => {
    const openTasks = careTasks.filter((t) => !t.completed);
    const newPlan: DailyPlanStep[] = [];

    scheduleEvents.forEach((evt) => {
      newPlan.push({
        time: evt.time,
        title: evt.title,
        person: evt.person,
        note: `${evt.category} · At ${evt.location}`,
      });
    });

    openTasks.forEach((task, idx) => {
      const times = ['9:00 AM', '11:30 AM', '2:00 PM', '4:15 PM'];
      newPlan.push({
        time: times[idx % times.length],
        title: task.title,
        person: task.person,
        note: `${task.priority.toUpperCase()} priority · due ${task.due}.`,
      });
    });

    newPlan.sort((a, b) => a.time.localeCompare(b.time));
    setDailyPlan(newPlan);
    logCareActivity('Daily plan generated', `Built a ${newPlan.length}-step plan from open tasks.`, 'generate_daily_plan');
    showToast('A fresh gentle family flow is ready!');
  };

  // Real Gemini Chat Assistant State
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>(() => {
    const saved = localStorage.getItem('lifebridge_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        text: "Hello, I am LifeBridge AI, powered by Google Gemini 3.8. I am here to help you coordinate family care, navigate confusing medical or school notices, plan daily routines, and break down life's challenges into calm, achievable steps. How can I support you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-3.8-flash',
        provider: 'Google Gemini',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('lifebridge_chat_history', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const startNewChat = () => {
    const fresh: AIChatMessage[] = [
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: "Started a fresh conversation. What is on your mind? Feel free to ask about caregiving, medications, school deadlines, or practical action steps.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-3.8-flash',
        provider: 'Google Gemini',
      },
    ];
    setChatMessages(fresh);
    setChatError(null);
    showToast('Started new conversation', 'info');
  };

  const sendChatMessage = async (userInput: string) => {
    if (!userInput.trim() || isChatLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: AIChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: userInput.trim(),
      timestamp: timeStr,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      const assistantMessage: AIChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'Received empty response from assistant.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemini-3.8-flash',
        provider: data.provider || 'Google Gemini',
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setChatError(err.message || 'Failed to reach AI service');
      showToast('Could not complete request: ' + (err.message || 'Network error'), 'error');
    } finally {
      setIsChatLoading(false);
    }
  };

  // Real Gemini Tool Execution Function
  const executeAITool = async (
    toolId: string,
    input: string,
    options: any = {},
    image?: { data: string; mimeType: string }
  ) => {
    const res = await fetch('/api/gemini/tool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toolId,
        input,
        options,
        image,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'AI Tool execution failed');
    }

    return {
      result: data.result || '',
      model: data.model || 'gemini-3.8-flash',
      provider: data.provider || 'Google Gemini',
      notice: data.notice,
    };
  };

  const resetAllData = () => {
    localStorage.removeItem('lifebridge_plans');
    localStorage.removeItem('lifebridge_explanations');
    localStorage.removeItem('lifebridge_recipients');
    localStorage.removeItem('lifebridge_medications');
    localStorage.removeItem('lifebridge_appointments');
    localStorage.removeItem('lifebridge_journal');
    localStorage.removeItem('lifebridge_chat_history');
    localStorage.removeItem('carecircle_family');
    localStorage.removeItem('carecircle_schedule');
    localStorage.removeItem('carecircle_tasks');
    localStorage.removeItem('carecircle_reminders');
    localStorage.removeItem('carecircle_checkins');
    localStorage.removeItem('carecircle_shopping');
    localStorage.removeItem('carecircle_daily_plan');
    localStorage.removeItem('carecircle_activities');

    setPlans(INITIAL_PLANS);
    setExplanations([]);
    setCareRecipients(DEFAULT_CARE_RECIPIENTS);
    setActiveRecipientId('recip-1');
    setMedications(DEFAULT_MEDICATIONS);
    setAppointments(DEFAULT_APPOINTMENTS);
    setCareJournal(DEFAULT_CARE_JOURNAL);
    setFamilyMembers(INITIAL_CARECIRCLE_FAMILY);
    setScheduleEvents(INITIAL_CARECIRCLE_SCHEDULE);
    setCareTasks(INITIAL_CARECIRCLE_TASKS);
    setCareReminders(INITIAL_CARECIRCLE_REMINDERS);
    setCheckIns(INITIAL_CARECIRCLE_CHECKINS);
    setShoppingList(INITIAL_CARECIRCLE_SHOPPING);
    setDailyPlan(INITIAL_CARECIRCLE_PLAN);
    setCareActivities(INITIAL_CARECIRCLE_ACTIVITIES);

    startNewChat();
    showToast('Reset data back to factory defaults', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        selectedToolId,
        setSelectedToolId,
        language,
        setLanguage,
        largeText,
        setLargeText,
        highContrast,
        setHighContrast,
        demoMode: true,

        plans,
        addPlan,
        updatePlan,
        togglePlanTask,
        archivePlan,
        deletePlan,

        explanations,
        addExplanation,

        careRecipients,
        activeRecipientId,
        setActiveRecipientId,
        addCareRecipient,

        medications,
        toggleMedicationTaken,
        addMedication,

        appointments,
        addAppointment,

        careJournal,
        addJournalEntry,

        careSubPage,
        setCareSubPage,
        familyMembers,
        addFamilyMember,
        scheduleEvents,
        addScheduleEvent,
        careTasks,
        toggleCareTask,
        addCareTask,
        careReminders,
        addCareReminder,
        toggleCareReminder,
        checkIns,
        submitCheckIn,
        shoppingList,
        toggleShoppingItem,
        addShoppingItem,
        removeShoppingItem,
        dailyPlan,
        generateCareCirclePlan,
        careActivities,
        logCareActivity,

        chatMessages,
        sendChatMessage,
        startNewChat,
        isChatLoading,
        chatError,

        executeAITool,

        // User Authentication & Session
        currentUser,
        setCurrentUser,
        loginWithRole,
        loginWithCredentials,
        logout,

        toasts,
        showToast,
        dismissToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
