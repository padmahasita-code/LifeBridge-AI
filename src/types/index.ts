export type PageType =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'tools'
  | 'chat'
  | 'assistant'
  | 'carecircle'
  | 'create'
  | 'explain'
  | 'saved'
  | 'settings';

export type Language = 'english' | 'telugu' | 'hindi' | 'spanish' | 'french';

export type Audience =
  | 'student'
  | 'older_adult'
  | 'caregiver'
  | 'living_alone'
  | 'volunteer'
  | 'other';

export type Category =
  | 'daily_planning'
  | 'family_coordination'
  | 'education'
  | 'understanding_message'
  | 'appointment_prep'
  | 'accessibility'
  | 'general_support';

export type Urgency = 'routine' | 'soon' | 'urgent';

export type ResponseStyle =
  | 'checklist'
  | 'detailed_steps'
  | 'simple_explanation'
  | 'message_draft';

export interface PlanTask {
  id?: string;
  plan_id?: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  completed: boolean;
  completed_at?: string | null;
}

export interface Plan {
  id: string;
  title: string;
  summary: string;
  problem: string;
  goal: string;
  audience: Audience;
  category: Category;
  urgency: Urgency;
  language: Language;
  response_style: ResponseStyle;
  resources: string;
  deadline?: string | null;
  follow_up_date?: string | null;
  draft_message: string;
  assumptions: string[];
  obstacles: string[];
  follow_up_tasks: string[];
  status: 'active' | 'archived';
  created_at: string;
  tasks?: PlanTask[];
}

export interface Explanation {
  id: string;
  original_message: string;
  explanation: string;
  dates_found: string[];
  recommended_actions: string[];
  cautionary_notes: string[];
  language: Language;
  created_at: string;
}

export interface StarterTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  request: {
    title: string;
    problem: string;
    audience: Audience;
    category: Category;
    urgency: Urgency;
    language: Language;
    responseStyle: ResponseStyle;
    resources: string;
    goal: string;
    deadline: string;
    followUpDate: string;
  };
}

/* CareCircle Integrated Types */
export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  avatarBg?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  person: string;
  time: string;
  category: 'Family' | 'Work' | 'Home' | 'Activity' | 'Health' | 'Medication';
  location: string;
  date?: string;
}

export interface CareTask {
  id: string;
  title: string;
  person: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  completedAt?: string | null;
}

export interface CareReminder {
  id: string;
  title: string;
  person: string;
  time: string;
  completed?: boolean;
}

export interface CheckIn {
  id: string;
  person: string;
  status: 'pending' | 'checked-in' | 'needs-attention';
  time: string | null;
  mood?: 'great' | 'good' | 'okay' | 'need-help';
  note?: string;
  energyLevel?: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category?: 'Groceries' | 'Pharmacy' | 'Household' | 'Care Supplies';
  purchased: boolean;
  addedBy?: string;
}

export interface DailyPlanStep {
  time: string;
  title: string;
  person: string;
  note: string;
}

export interface CareActivity {
  id: string;
  time: string;
  label: string;
  detail: string;
  toolName: string;
  success: boolean;
}

export type CareCircleSubPage =
  | 'overview'
  | 'assistant'
  | 'schedule'
  | 'tasks'
  | 'checkins'
  | 'shopping'
  | 'settings';

export interface AIChatMessage {
  id: string;
  sender?: 'user' | 'assistant';
  role?: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
  provider?: string;
  modelUsed?: string;
  actionShortcut?: 'create' | 'carecircle' | 'explain' | 'tools';
}

export interface CareRecipient {
  id: string;
  name: string;
  age: number;
  relationship?: string;
  allergies?: string[];
  bloodType?: string;
  primaryCondition?: string;
  primaryConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  avatarColor?: string;
  initials?: string;
  notes?: string;
  avatar?: string;
  status?: string;
  primaryDoctor?: string;
  preferredLanguage?: string;
  lastCheckIn?: string;
}

export interface MedicationItem {
  id: string;
  recipientId?: string;
  recipientName?: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string | string[];
  instructions?: string;
  withFood?: boolean;
  active?: boolean;
  takenToday?: boolean;
  refillNeeded?: boolean;
  notes?: string;
}

export interface AppointmentItem {
  id: string;
  recipientName?: string;
  doctorName: string;
  specialty: string;
  clinic?: string;
  clinicLocation?: string;
  date?: string;
  dateTime?: string;
  time?: string;
  reason?: string;
  notes?: string;
  prepQuestions?: string[];
  reminderSet?: boolean;
  transportationPlan?: string;
  questions?: string[];
}

export interface CareJournalEntry {
  id: string;
  date?: string;
  time?: string;
  recipientName?: string;
  category?: string;
  title?: string;
  notes?: string;
  note?: string;
  author: string;
  timestamp?: string;
  mood?: string;
  vitalStats?: {
    bloodPressure?: string;
    pulse?: number;
    glucose?: string;
    temperature?: string;
  };
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    bloodSugar?: number;
    weightLbs?: number;
  };
}

export interface AIToolConfig {
  id: string;
  name?: string;
  title?: string;
  category: string;
  description: string;
  iconName: string;
  gradient: string;
  badge: string;
  accentColor?: string;
  placeholder?: string;
  placeholderText?: string;
  sampleInputs?: string[];
  promptSuggestions?: string[];
  disclaimer?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'caregiver' | 'senior' | 'family' | 'doctor' | 'guest';
  roleTitle: string;
  avatarUrl?: string;
  relation: string;
  badge: string;
  familyCircleCode: string;
  lastLogin?: string;
}

