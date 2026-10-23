import {
  Audience,
  Category,
  Language,
  Plan,
  PlanTask,
  StarterTemplate,
  Urgency,
  FamilyMember,
  ScheduleEvent,
  CareTask,
  CareReminder,
  CheckIn,
  ShoppingItem,
  DailyPlanStep,
  CareActivity,
  CareRecipient,
  MedicationItem,
  AppointmentItem,
  CareJournalEntry,
  AIToolConfig,
  UserSession,
} from '../types';

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'student',
    label: 'Student Support',
    description: 'Two assignments due tomorrow — need a structured study plan',
    icon: 'GraduationCap',
    request: {
      title: 'Two assignments due tomorrow',
      problem:
        'I have two assignments due tomorrow and I do not know where to start. One is a 1500-word essay for History and the other is a programming project for Computer Science.',
      audience: 'student',
      category: 'education',
      urgency: 'urgent',
      language: 'english',
      responseStyle: 'checklist',
      resources: 'Laptop, course notes, library access, 6 hours available tonight',
      goal: 'Finish both assignments before the deadline without burning out or panicking',
      deadline: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      followUpDate: '',
    },
  },
  {
    id: 'caregiver',
    label: 'Family Caregiving',
    description: 'Organize daily check-ins for grandmother living alone',
    icon: 'HeartHandshake',
    request: {
      title: 'Daily check-ins for my grandmother',
      problem:
        'My grandmother lives alone in another city. Our family wants to organize reliable daily check-ins so someone talks to her every morning and evening, ensuring medication is taken and she feels loved.',
      audience: 'caregiver',
      category: 'family_coordination',
      urgency: 'soon',
      language: 'english',
      responseStyle: 'detailed_steps',
      resources: 'Three family members (me, my brother, my aunt), smartphones, shared group chat',
      goal: 'Set up a reliable daily check-in rotation so grandmother is never left alone for a full day',
      deadline: '',
      followUpDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    },
  },
  {
    id: 'understand',
    label: 'Understanding a Message',
    description: 'Confusing school or clinic announcement in need of simple explanation',
    icon: 'HelpCircle',
    request: {
      title: 'Confusing school message about exam rescheduling and lab journals',
      problem:
        'I received this message: "Dear Parent, the Half-Yearly examinations scheduled from 15-10-2025 are hereby postponed to 22-10-2025. The revised timetable will be shared by the class teacher by 18-10-2025. Please ensure your child submits the project journal by 20-10-2025." I do not understand what I need to do first.',
      audience: 'other',
      category: 'understanding_message',
      urgency: 'soon',
      language: 'english',
      responseStyle: 'simple_explanation',
      resources: 'School parent portal, email address of class teacher',
      goal: 'Understand what this message means and what concrete actions to take',
      deadline: '2025-10-20',
      followUpDate: '2025-10-18',
    },
  },
  {
    id: 'volunteer',
    label: 'Volunteer Coordination',
    description: 'Organize a weekend community health & food distribution',
    icon: 'HeartHandshake',
    request: {
      title: 'Weekend food and wellness distribution for community group',
      problem:
        'Our community group needs to organize a weekend food & wellness kit distribution. We have about 10 volunteers and expect to serve 50 families. We need a clear plan for roles, timing, and supplies.',
      audience: 'volunteer',
      category: 'general_support',
      urgency: 'soon',
      language: 'english',
      responseStyle: 'checklist',
      resources: '10 volunteers, community center hall, 2 delivery vans, boxed food items',
      goal: 'Serve all 50 families smoothly with clear volunteer assignments and zero waste',
      deadline: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
      followUpDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    },
  },
  {
    id: 'missed',
    label: 'Missed Check-In',
    description: 'A planned daily check-in with a family member did not happen',
    icon: 'PhoneCall',
    request: {
      title: 'Planned check-in with my father did not happen this morning',
      problem:
        'The planned daily check-in with my father did not happen today. I called him twice in the morning and he did not answer. He usually takes his blood pressure medicine at 9 AM.',
      audience: 'caregiver',
      category: 'family_coordination',
      urgency: 'urgent',
      language: 'english',
      responseStyle: 'checklist',
      resources: 'Phone, his trusted neighbor Mrs. Rao, building front-desk security number',
      goal: 'Verify that my father is safe calmly and re-establish our connection without causing panic',
      deadline: '',
      followUpDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    },
  },
];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  student: 'Student',
  older_adult: 'Older Adult',
  caregiver: 'Caregiver',
  living_alone: 'Living Alone',
  volunteer: 'Volunteer',
  other: 'Other',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  daily_planning: 'Daily Planning',
  family_coordination: 'Family Coordination',
  education: 'Education',
  understanding_message: 'Understanding a Message',
  appointment_prep: 'Appointment Preparation',
  accessibility: 'Accessibility',
  general_support: 'General Support',
};

export const URGENCY_LABELS: Record<Urgency, string> = {
  routine: 'Routine',
  soon: 'Soon',
  urgent: 'Urgent',
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  english: 'English',
  telugu: 'Telugu (తెలుగు)',
  hindi: 'Hindi (हिन्दी)',
  spanish: 'Spanish (Español)',
  french: 'French (Français)',
};

export const DEFAULT_CARE_RECIPIENTS: CareRecipient[] = [
  {
    id: 'recip-1',
    name: 'Grandma Rose',
    age: 82,
    relationship: 'Mother / Grandmother',
    allergies: ['Penicillin', 'Sulfa drugs'],
    bloodType: 'O+',
    primaryCondition: 'Mild Hypertension & Joint Mobility',
    emergencyContact: {
      name: 'Sarah Jenkins (Daughter)',
      phone: '+1 (555) 234-5678',
      relation: 'Primary Caregiver',
    },
    avatarColor: '#FDE047',
    initials: 'GR',
    notes: 'Prefers morning calls before 9:30 AM. Enjoys gardening audiobooks and herbal tea.',
  },
  {
    id: 'recip-2',
    name: 'Leo Jenkins',
    age: 16,
    relationship: 'Son / Student',
    allergies: ['Tree nuts'],
    bloodType: 'A+',
    primaryCondition: 'Seasonal Asthma',
    emergencyContact: {
      name: 'David Jenkins (Father)',
      phone: '+1 (555) 345-6789',
      relation: 'Father',
    },
    avatarColor: '#93C5FD',
    initials: 'LJ',
    notes: 'Carries inhaler in school bag. Piano lessons every Thursday at 5:30 PM.',
  },
];

export const DEFAULT_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med-1',
    recipientId: 'recip-1',
    recipientName: 'Grandma Rose',
    name: 'Amlodipine Besylate',
    dosage: '5 mg',
    frequency: 'Once daily',
    timeOfDay: 'Morning with Breakfast (8:30 AM)',
    instructions: 'Take with full glass of water. Track blood pressure in the evening.',
    active: true,
    takenToday: true,
    refillNeeded: false,
  },
  {
    id: 'med-2',
    recipientId: 'recip-1',
    recipientName: 'Grandma Rose',
    name: 'Calcium Citrate + Vitamin D3',
    dosage: '600 mg / 400 IU',
    frequency: 'Twice daily',
    timeOfDay: 'Lunch & Dinner (1:00 PM & 7:00 PM)',
    instructions: 'Take with food to maximize absorption.',
    active: true,
    takenToday: false,
    refillNeeded: true,
  },
  {
    id: 'med-3',
    recipientId: 'recip-2',
    recipientName: 'Leo Jenkins',
    name: 'Albuterol Inhaler (HFA)',
    dosage: '90 mcg / actuation',
    frequency: 'As needed',
    timeOfDay: 'Before exercise or during wheezing',
    instructions: 'Rinse mouth with water after use.',
    active: true,
    takenToday: false,
    refillNeeded: false,
  },
];

export const DEFAULT_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'apt-1',
    recipientName: 'Grandma Rose',
    doctorName: 'Dr. Sarah Henderson, MD',
    specialty: 'Cardiology & Internal Medicine',
    clinicLocation: 'Westside Health Pavilion · Suite 304',
    date: 'Tomorrow, 10:30 AM',
    time: '10:30 AM',
    notes: 'Routine 6-month checkup. Review morning blood pressure logs and medication refills.',
    prepQuestions: [
      'Are current blood pressure readings (averaging 124/82) within target range?',
      'Can we renew the 90-day Amlodipine prescription directly with Market Street Pharmacy?',
      'Any recommended gentle stretching exercises for morning knee stiffness?',
    ],
    reminderSet: true,
  },
  {
    id: 'apt-2',
    recipientName: 'Leo Jenkins',
    doctorName: 'Dr. Marcus Vance, MD',
    specialty: 'Pediatric Pulmonology',
    clinicLocation: 'Children’s Wellness Center · Room 12',
    date: 'Next Tuesday, 3:15 PM',
    time: '3:15 PM',
    notes: 'Annual asthma management plan review and sports clearance sign-off.',
    prepQuestions: [
      'Is current rescue inhaler usage (approx twice a month) within normal limits?',
      'Confirm updated school asthma action form for physical education.',
    ],
    reminderSet: true,
  },
];

export const DEFAULT_CARE_JOURNAL: CareJournalEntry[] = [
  {
    id: 'jrn-1',
    date: 'Today',
    time: '8:45 AM',
    recipientName: 'Grandma Rose',
    category: 'Vitals',
    title: 'Morning Blood Pressure & Heart Rate',
    notes: 'Grandma woke up feeling rested. Morning BP was 122/80 mmHg with a steady resting heart rate of 72 bpm. Breakfast was steel-cut oatmeal with sliced bananas and warm cinnamon tea.',
    author: 'Sarah (Caregiver)',
    vitalStats: {
      bloodPressure: '122/80 mmHg',
      pulse: 72,
      glucose: '98 mg/dL',
      temperature: '98.4 °F',
    },
  },
  {
    id: 'jrn-2',
    date: 'Yesterday',
    time: '4:30 PM',
    recipientName: 'Grandma Rose',
    category: 'Mood',
    title: 'Afternoon Sunroom Gardening Walk',
    notes: 'Spent 30 minutes in the sunroom watering geraniums and listening to classical radio. Cheerful demeanor and energetic conversation with granddaughter Maya on speakerphone.',
    author: 'David (Family)',
  },
  {
    id: 'jrn-3',
    date: 'Oct 12',
    time: '6:15 PM',
    recipientName: 'Leo Jenkins',
    category: 'Observation',
    title: 'Science Project Completion & Rest',
    notes: 'Completed his physics tri-fold board with calm focus. Zero respiratory symptoms following evening bike ride.',
    author: 'Sarah (Caregiver)',
  },
];

export const AI_TOOLS_LIST: AIToolConfig[] = [
  {
    id: 'chat',
    title: 'AI Chat Assistant',
    description: 'Real-time conversational healthcare and family companion with streaming responses and care templates.',
    category: 'clinical',
    iconName: 'MessageSquare',
    badge: 'Live Gemini 3.8',
    gradient: 'from-purple-100 to-indigo-100 text-purple-900 border-purple-200',
    accentColor: '#8B5CF6',
    placeholderText: 'Ask any question about family caregiving, stress management, symptom timelines, or routine coordination...',
    promptSuggestions: [
      'How can we coordinate daily check-ins for an elderly parent living alone?',
      'Give me a soothing bedtime routine for an overwhelmed teenager',
      'What questions should I ask the doctor at a cardiology follow-up?',
    ],
  },
  {
    id: 'writing',
    title: 'Writing Assistant',
    description: 'Transform rough notes into empathetic, professional letters for clinics, teachers, or insurance portals.',
    category: 'communication',
    iconName: 'PenTool',
    badge: 'Text Polisher',
    gradient: 'from-sky-100 to-blue-100 text-sky-900 border-sky-200',
    accentColor: '#0EA5E9',
    placeholderText: 'Paste rough notes, email drafts, or requests to rewrite in a warm, clear, professional tone...',
    promptSuggestions: [
      'Draft a polite message to the doctor requesting a 90-day medication refill',
      'Write an explanation to my child’s school teacher about an upcoming therapy appointment',
      'Draft an update to family members about Grandma’s recovery progress',
    ],
  },
  {
    id: 'summarizer',
    title: 'Text Summarizer',
    description: 'Condense dense clinic discharge summaries, school bulletins, or insurance paperwork into 3 clear bullets.',
    category: 'communication',
    iconName: 'FileText',
    badge: 'Clarity Engine',
    gradient: 'from-emerald-100 to-teal-100 text-emerald-900 border-emerald-200',
    accentColor: '#10B981',
    placeholderText: 'Paste lengthy medical reports, discharge notes, school emails, or hospital documentation...',
    promptSuggestions: [
      'Summarize this multi-page hospital discharge instruction sheet',
      'Extract all dates and required actions from this parent handbook update',
      'Highlight medications and warning signs from this clinical consultation summary',
    ],
  },
  {
    id: 'translate',
    title: 'Medical Translation Tool',
    description: 'Translate instructions and symptoms accurately into Telugu, Hindi, Spanish, or French with clinical care.',
    category: 'communication',
    iconName: 'Languages',
    badge: 'Multilingual',
    gradient: 'from-teal-100 to-cyan-100 text-teal-900 border-teal-200',
    accentColor: '#14B8A6',
    placeholderText: 'Enter text or instructions to translate into your family’s native language...',
    promptSuggestions: [
      'Translate: "Take 1 pill after dinner and do not consume dairy within 2 hours" into Telugu',
      'Translate: "Please schedule a follow-up blood test in 3 weeks" into Hindi',
      'Translate doctor visit notes into Spanish for extended family',
    ],
  },
  {
    id: 'study',
    title: 'Concept & Medical Explainer',
    description: 'Understand complex medical terminology (Hypertension, Sepsis, Arthritis) with simple analogies.',
    category: 'clinical',
    iconName: 'BookOpen',
    badge: 'Education',
    gradient: 'from-amber-100 to-orange-100 text-amber-900 border-amber-200',
    accentColor: '#F59E0B',
    placeholderText: 'Type a confusing diagnosis, medication mechanism, or biology concept...',
    promptSuggestions: [
      'Explain hypertension and systolic vs diastolic pressure using an everyday water pipe analogy',
      'What is an ACE inhibitor and how does it gently lower blood pressure?',
      'Explain the difference between osteoarthritis and rheumatoid arthritis in simple terms',
    ],
  },
  {
    id: 'coding',
    title: 'Coding & Automation Assistant',
    description: 'Generate iCalendar (.ics) appointment files, JSON care schedules, and automation scripts.',
    category: 'multimodal',
    iconName: 'Code',
    badge: 'Developer & Ops',
    gradient: 'from-slate-100 to-zinc-200 text-slate-800 border-slate-300',
    accentColor: '#475569',
    placeholderText: 'Describe an appointment or care schedule to export as .ics iCalendar format or structured JSON...',
    promptSuggestions: [
      'Generate an .ics iCalendar event for Cardiology visit on Oct 24 at 10:30 AM with a 1-day alert',
      'Create a JSON schema for a 4-person family medication schedule',
      'Generate a Python script to send a daily SMS check-in reminder',
    ],
  },
  {
    id: 'care_assistant',
    title: 'CareCircle AI Assistant',
    description: 'Trauma-informed advice for foster parents, kinship caregivers, and adult children caring for parents.',
    category: 'family',
    iconName: 'HeartHandshake',
    badge: 'Trauma-Informed',
    gradient: 'from-rose-100 to-pink-100 text-rose-900 border-rose-200',
    accentColor: '#F43F5E',
    placeholderText: 'Describe a challenging caregiving moment, emotional overwhelm, or routine barrier...',
    promptSuggestions: [
      'How to gently soothe an anxious child refusing to sleep without raising my voice',
      'Ways to encourage an elderly parent to use their walking cane without hurting their dignity',
      'Techniques for caregivers to avoid compassion fatigue and burnout',
    ],
  },
  {
    id: 'health_info',
    title: 'Health Information Assistant',
    description: 'Evidence-based health education and symptom guidance with explicit safety disclaimers.',
    category: 'clinical',
    iconName: 'ShieldPlus',
    badge: 'Safety First',
    gradient: 'from-blue-100 to-sky-100 text-blue-900 border-blue-200',
    accentColor: '#2563EB',
    placeholderText: 'Ask about nutrition, preventive health, exercise guidelines, or common symptom patterns...',
    promptSuggestions: [
      'What are evidence-backed ways to maintain bone density for women over 70?',
      'Normal resting heart rate ranges and when to seek urgent clinical attention',
      'Dietary tips for managing early-stage type 2 diabetes with balanced meals',
    ],
  },
  {
    id: 'medication_planner',
    title: 'Medication Planner',
    description: 'Interactive tracker for daily prescriptions, dosages, meal timings, and pharmacy refills.',
    category: 'clinical',
    iconName: 'Pill',
    badge: 'Interactive Tracker',
    gradient: 'from-violet-100 to-purple-100 text-purple-900 border-purple-200',
    accentColor: '#7C3AED',
    placeholderText: 'Manage active medications, set reminder times, and mark daily doses as taken...',
    promptSuggestions: [
      'Add a new prescription with daily reminder times',
      'Check which medications have been taken today',
      'Export medication list for doctor visit',
    ],
  },
  {
    id: 'appointment_planner',
    title: 'Appointment Planner',
    description: 'Schedule doctor consultations, prepare clinical questions, and arrange caregiver transit.',
    category: 'family',
    iconName: 'CalendarCheck',
    badge: 'Schedule & Prep',
    gradient: 'from-emerald-100 to-green-100 text-emerald-900 border-emerald-200',
    accentColor: '#059669',
    placeholderText: 'Schedule upcoming clinic appointments and compile prep questions for the physician...',
    promptSuggestions: [
      'Create appointment for Cardiology follow-up with Dr. Henderson',
      'Generate a list of 5 high-yield questions for an upcoming specialist visit',
      'Set transit and reminder checkpoints 24 hours in advance',
    ],
  },
  {
    id: 'care_journal',
    title: 'Notes & Care Journal',
    description: 'Log daily caregiver reflections, blood pressure readings, glucose trends, and behavioral notes.',
    category: 'family',
    iconName: 'BookMarked',
    badge: 'Clinical Log',
    gradient: 'from-amber-100 to-yellow-100 text-amber-900 border-amber-200',
    accentColor: '#D97706',
    placeholderText: 'Write a daily journal entry, log vitals (BP, pulse, sleep), or note doctor feedback...',
    promptSuggestions: [
      'Log morning blood pressure (122/80) and mood observation',
      'Record physical therapy milestones and walking distance',
      'Search care journal entries from the past week',
    ],
  },
  {
    id: 'vision',
    title: 'Image & Document Understanding',
    description: 'Upload photos of prescription bottles, discharge summaries, or handwritten notes for instant AI extraction.',
    category: 'multimodal',
    iconName: 'Camera',
    badge: 'Gemini Vision',
    gradient: 'from-fuchsia-100 to-pink-100 text-fuchsia-900 border-fuchsia-200',
    accentColor: '#D946EF',
    placeholderText: 'Upload or capture an image of a medical label, notice, or test report to extract details...',
    promptSuggestions: [
      'Analyze this prescription bottle label to extract dosage and refill date',
      'Extract key instructions and appointments from this printed doctor visit note',
      'Transcribe handwritten caregiver notes into structured digital text',
    ],
  },
];

export function generateLifeBridgePlan(req: {
  title: string;
  problem: string;
  audience: Audience;
  category: Category;
  urgency: Urgency;
  language: Language;
  goal: string;
  resources: string;
}): {
  summary: string;
  tasks: PlanTask[];
  draftMessage: string;
  assumptions: string[];
  obstacles: string[];
  followUpTasks: string[];
} {
  const isTelugu = req.language === 'telugu';
  const isHindi = req.language === 'hindi';

  let summary = '';
  if (isTelugu) {
    summary = `మీరు అందించిన సమాచారం ప్రకారం "${req.title}" కొరకు ఆచరణాత్మక కార్యాచరణ ప్రణాళిక సిద్ధం చేయబడింది. ప్రాధాన్యత: ${URGENCY_LABELS[req.urgency]}. లక్ష్యం: ${req.goal}.`;
  } else if (isHindi) {
    summary = `आपकी दी गई जानकारी के आधार पर "${req.title}" के लिए एक स्पष्ट और व्यवस्थित कार्य योजना तैयार की गई है। प्राथमिकता: ${URGENCY_LABELS[req.urgency]}। लक्ष्य: ${req.goal}।`;
  } else {
    summary = `Here is a structured, human-centered action plan for "${req.title}". Priority: ${URGENCY_LABELS[req.urgency]}. Goal: ${req.goal}.`;
  }

  const tasks: PlanTask[] = [];

  if (req.category === 'education' || req.audience === 'student') {
    tasks.push(
      {
        text: isTelugu
          ? 'రెండు అసైన్‌మెంట్ల అవసరాలు, గడువులను రాసుకోండి'
          : isHindi
          ? 'दोनों असाइनमेंट की आवश्यकताओं और समय-सीमा को नोट करें'
          : 'Break down both assignments and note exact requirements and word limits',
        priority: 'high',
        timeframe: '15 mins',
        completed: false,
      },
      {
        text: isTelugu
          ? 'తొలుత చిన్న అంశాన్ని పూర్తి చేసి విశ్వాసం పొందండి'
          : isHindi
          ? 'पहले छोटे कार्य को पूरा करके आत्मविश्वास हासिल करें'
          : 'Complete the higher urgency task first in focused 25-minute Pomodoro blocks',
        priority: 'high',
        timeframe: '2 hours',
        completed: false,
      },
      {
        text: isTelugu
          ? 'డ్రాఫ్ట్‌ను సమీక్షించి సకాలంలో సమర్పించండి'
          : isHindi
          ? 'प्रारूप की समीक्षा करें और समय पर सबमिट करें'
          : 'Run a quick spell-check, verify formatting, and submit both items to the portal',
        priority: 'medium',
        timeframe: '45 mins',
        completed: false,
      }
    );
  } else if (req.category === 'family_coordination' || req.audience === 'caregiver') {
    tasks.push(
      {
        text: isTelugu
          ? 'కుటుంబ సభ్యులతో రోజువారీ చెక్-ఇన్ సమయాలను ఖరారు చేయండి'
          : isHindi
          ? 'परिवार के सदस्यों के साथ दैनिक चेक-इन का समय निर्धारित करें'
          : `Establish a consistent daily check-in rotation with contact times (Morning: 9 AM, Evening: 7 PM)`,
        priority: 'high',
        timeframe: 'Today',
        completed: false,
      },
      {
        text: isTelugu
          ? 'ఎమర్జెన్సీ బ్యాకప్ కాంటాక్ట్ వివరాలను భద్రపరచండి'
          : isHindi
          ? 'आपातकालीन बैकअप संपर्क विवरण सहेजें'
          : 'Save local neighbor or building manager contact as emergency secondary fallback',
        priority: 'high',
        timeframe: 'Today',
        completed: false,
      },
      {
        text: isTelugu
          ? 'కేర్‌సర్కిల్ (CareCircle) లో మందుల సమయ పట్టికను నమోదు చేయండి'
          : isHindi
          ? 'केयरसर्कल (CareCircle) में दवा और स्वास्थ्य शेड्यूल दर्ज करें'
          : 'Log medication schedules and routine notes in CareCircle shared family hub',
        priority: 'medium',
        timeframe: 'This week',
        completed: false,
      }
    );
  } else {
    tasks.push(
      {
        text: isTelugu
          ? 'సమస్య యొక్క ప్రధాన అంశాన్ని మరియు అవసరమైన వనరులను గుర్తించండి'
          : isHindi
          ? 'मुख्य समस्या और आवश्यक संसाधनों की पहचान करें'
          : 'Identify the exact first step and gather available resources',
        priority: 'high',
        timeframe: '30 mins',
        completed: false,
      },
      {
        text: isTelugu
          ? 'సంబంధిత వ్యక్తులకు సమాచారం లేదా డ్రాఫ్ట్ మెసేజ్ పంపండి'
          : isHindi
          ? 'संबंधित व्यक्ति को स्पष्ट संदेश भेजें'
          : 'Reach out to the primary contact with our prepared message draft',
        priority: 'medium',
        timeframe: '1 hour',
        completed: false,
      },
      {
        text: isTelugu
          ? 'ప్రగతిని సమీక్షించి తదుపరి దశలను పూర్తి చేయండి'
          : isHindi
          ? 'प्रगति की समीक्षा करें और आगे के कदम उठाएं'
          : 'Follow up and review outcome to ensure complete peace of mind',
        priority: 'low',
        timeframe: '1-2 days',
        completed: false,
      }
    );
  }

  const draftMessage = isTelugu
    ? `నమస్కారం,\n\nనేను "${req.title}" గురించి మీకు తెలియజేస్తున్నాను.\nలక్ష్యం: ${req.goal}\nమా ప్రస్తుత పురోగతి మరియు సహాయం కొరకు దయచేసి సంప్రదించండి.\nధన్యవాదాలు.`
    : isHindi
    ? `नमस्ते,\n\nमैं "${req.title}" के संबंध में आपसे संपर्क कर रहा हूँ।\nहमारा उद्देश्य: ${req.goal}।\nकृपया विवरण देखें और मार्गदर्शन प्रदान करें।\nधन्यवाद।`
    : `Hello,\n\nI am reaching out regarding "${req.title}".\nOur current goal is: ${req.goal}.\nWe have organized our next steps and would appreciate your confirmation on the timeline.\n\nThank you for your support.`;

  const assumptions = [
    'Available communication channels (phone, messaging) are functional.',
    'Family members or contributors can allocate 15-30 minutes of time.',
    'Deadlines are verified against primary announcements or calendars.',
  ];

  const obstacles = [
    'Potential delays in receiving callbacks or email confirmations.',
    'Unexpected scheduling conflicts during evening check-in hours.',
  ];

  const followUpTasks = [
    'Review plan effectiveness after 48 hours.',
    'Record updates and status directly in your Saved Plans or CareCircle Hub.',
  ];

  return {
    summary,
    tasks,
    draftMessage,
    assumptions,
    obstacles,
    followUpTasks,
  };
}

export function explainConfusingMessage(
  text: string,
  lang: Language
): {
  explanation: string;
  dates_found: string[];
  recommended_actions: string[];
  cautionary_notes: string[];
} {
  const dateRegex =
    /(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}(st|nd|rd|th)?,? \d{4}?)/gi;
  const dates_found: string[] = [];
  let match;
  while ((match = dateRegex.exec(text)) !== null) {
    if (!dates_found.includes(match[0])) {
      dates_found.push(match[0]);
    }
  }

  const lower = text.toLowerCase();
  const recommended_actions: string[] = [];
  const cautionary_notes: string[] = [];

  if (lower.includes('postpone') || lower.includes('reschedule') || lower.includes('defer')) {
    recommended_actions.push('Mark the newly announced dates on your calendar immediately.');
    recommended_actions.push('Inform family members or caregivers about the revised schedule.');
  }
  if (lower.includes('submit') || lower.includes('due') || lower.includes('deadline')) {
    recommended_actions.push('Note the submission deadline and prepare documents 2 days in advance.');
  }
  if (lower.includes('fee') || lower.includes('payment') || lower.includes('amount') || lower.includes('$') || lower.includes('₹')) {
    recommended_actions.push('Check the exact payment method and retain the confirmation receipt.');
  }
  if (lower.includes('medicine') || lower.includes('prescription') || lower.includes('doctor') || lower.includes('clinic')) {
    recommended_actions.push('Verify dosage instructions and store medications in a cool, safe place.');
    cautionary_notes.push('Never alter prescription dosages without consulting your physician.');
  }

  if (recommended_actions.length === 0) {
    recommended_actions.push('Read the key dates noted above and confirm with the sender if any question remains.');
    recommended_actions.push('Keep a printed or saved copy of this notice for your records.');
  }

  if (lower.includes('if') || lower.includes('subject to') || lower.includes('conditional')) {
    cautionary_notes.push('This notice mentions conditions or prerequisites — verify eligibility beforehand.');
  } else {
    cautionary_notes.push('If any portion seems ambiguous, contact the coordinator or office directly.');
  }

  let explanation = '';
  if (lang === 'telugu') {
    explanation = `ఈ సందేశం ముఖ్యమైన మార్పులు లేదా సూచనలను వివరిస్తుంది. ఇందులో పేర్కొన్న ప్రధాన గడువులు మరియు మీరు చేయవలసిన పనులను క్రింది చెక్‌లిస్ట్‌లో సులభంగా క్రమబద్ధీకరించాము.`;
  } else if (lang === 'hindi') {
    explanation = `यह संदेश महत्वपूर्ण तारीखों और निर्देशों की जानकारी देता है। इसमें उल्लिखित मुख्य समय-सीमाओं और आपको क्या करना चाहिए, इसे नीचे स्पष्ट चरणों में समझाया गया है।`;
  } else {
    explanation = `This message provides official updates, dates, or procedural guidelines. We have extracted the crucial timelines, translated the requirement into everyday language, and outlined your immediate next steps below.`;
  }

  return {
    explanation,
    dates_found,
    recommended_actions,
    cautionary_notes,
  };
}

/* Default Initial Seed Data */
export const INITIAL_PLANS: Plan[] = [
  {
    id: 'plan-1',
    title: 'Grandmother Health & Daily Check-In Rotation',
    summary:
      'Organized a 3-way daily family check-in rotation for Grandma Rose with medication reminders and emergency backup contacts.',
    problem:
      'Grandmother lives independently. We need to ensure she takes her morning medication and has cheerful company every day.',
    goal: 'Keep Grandma connected, safe, and happy with shared family responsibilities.',
    audience: 'caregiver',
    category: 'family_coordination',
    urgency: 'soon',
    language: 'english',
    response_style: 'checklist',
    resources: 'CareCircle family hub, shared phone directory, neighboring support',
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    follow_up_date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    draft_message:
      'Hi Family, Grandma’s CareCircle rotation is live! Mom is on morning check-ins, Dad on afternoon errands, and Maya on evening chat.',
    assumptions: ['Grandma has her cordless phone on the bedside table.'],
    obstacles: ['Phone might be on silent during afternoon naps.'],
    follow_up_tasks: ['Review rotation feedback next Sunday.'],
    status: 'active',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    tasks: [
      {
        id: 'task-101',
        text: 'Morning call at 9:00 AM to verify breakfast and blood pressure pill',
        priority: 'high',
        timeframe: '9:00 AM',
        completed: true,
        completed_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'task-102',
        text: 'Pick up prescription refill from Market Street Pharmacy',
        priority: 'medium',
        timeframe: '4:00 PM',
        completed: false,
      },
      {
        id: 'task-103',
        text: 'Evening video call with Maya to share stories and check mood',
        priority: 'low',
        timeframe: '7:30 PM',
        completed: false,
      },
    ],
  },
  {
    id: 'plan-2',
    title: 'Midterm Exam Preparation & Project Journal',
    summary:
      'Structured 4-day sprint to finish the Computer Science project journal and review History chapters.',
    problem:
      'School rescheduled exams to next week, creating an overlap with final project submission deadlines.',
    goal: 'Complete all assignments with clarity and high quality without last-minute stress.',
    audience: 'student',
    category: 'education',
    urgency: 'urgent',
    language: 'english',
    response_style: 'detailed_steps',
    resources: 'Course portal, textbook, study group chat',
    deadline: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    follow_up_date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    draft_message:
      'Dear Teacher, I have completed Part 1 of the Project Journal and will submit the final file before Friday 5 PM.',
    assumptions: ['Portal remains open for early submissions.'],
    obstacles: ['Need 2 uninterrupted hours for code testing.'],
    follow_up_tasks: ['Submit journal draft to teacher for quick review.'],
    status: 'active',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    tasks: [
      {
        id: 'task-201',
        text: 'Outline Chapter 4 and 5 key terms for History',
        priority: 'high',
        timeframe: '2 hours',
        completed: true,
      },
      {
        id: 'task-202',
        text: 'Write 400-word introduction and methodology section for project journal',
        priority: 'high',
        timeframe: 'Today',
        completed: false,
      },
    ],
  },
];

/* Default Initial CareCircle Data */
export const INITIAL_CARECIRCLE_FAMILY: FamilyMember[] = [
  {
    id: 'mom',
    name: 'Mom',
    role: 'The organizer',
    initials: 'M',
    color: '#FBCFE8',
    phone: '+1 (555) 234-5678',
    notes: 'Handles doctor appointments, grocery list, and morning check-ins.',
  },
  {
    id: 'dad',
    name: 'Dad',
    role: 'On the move',
    initials: 'D',
    color: '#BAE6FD',
    phone: '+1 (555) 345-6789',
    notes: 'Manages school drop-offs, prescription pickups, and home maintenance.',
  },
  {
    id: 'student',
    name: 'Student',
    role: 'Keeping curious',
    initials: 'S',
    color: '#E9D5FF',
    phone: '+1 (555) 456-7890',
    notes: 'High school sophomore, piano lessons, science club.',
  },
  {
    id: 'grandma',
    name: 'Grandma Rose',
    role: 'Family favorite',
    initials: 'G',
    color: '#FEF08A',
    phone: '+1 (555) 567-8901',
    notes: 'Lives in suburban apartment, loves afternoon tea and gardening stories.',
  },
];

export const INITIAL_CARECIRCLE_SCHEDULE: ScheduleEvent[] = [
  {
    id: 'event-1',
    title: 'School drop-off',
    person: 'Student',
    time: '8:15 AM',
    category: 'Family',
    location: 'Westside School',
  },
  {
    id: 'event-2',
    title: 'Dr. Henderson Telehealth Check',
    person: 'Grandma Rose',
    time: '10:30 AM',
    category: 'Health',
    location: 'Video call',
  },
  {
    id: 'event-3',
    title: 'Grocery & Organic Market pickup',
    person: 'Mom',
    time: '4:45 PM',
    category: 'Home',
    location: 'Market Street Market',
  },
  {
    id: 'event-4',
    title: 'Piano & Music practice',
    person: 'Student',
    time: '5:30 PM',
    category: 'Activity',
    location: 'Downtown Music Studio',
  },
  {
    id: 'event-5',
    title: 'Family dinner together',
    person: 'Everyone',
    time: '7:00 PM',
    category: 'Family',
    location: 'Home Dining Room',
  },
];

export const INITIAL_CARECIRCLE_TASKS: CareTask[] = [
  {
    id: 'task-1',
    title: 'Pack science project display board',
    person: 'Student',
    due: 'Today',
    priority: 'high',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Pick up prescription refill from pharmacy',
    person: 'Dad',
    due: 'Today',
    priority: 'medium',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Water balcony herbs & indoor plants',
    person: 'Mom',
    due: 'Today',
    priority: 'low',
    completed: true,
  },
  {
    id: 'task-4',
    title: 'Evening check-in call with Grandma Rose',
    person: 'Mom',
    due: 'Tonight',
    priority: 'medium',
    completed: true,
  },
];

export const INITIAL_CARECIRCLE_REMINDERS: CareReminder[] = [
  {
    id: 'reminder-1',
    title: 'Follow up on Grandma Rose’s afternoon tea & rest',
    person: 'Mom',
    time: 'Today',
    completed: false,
  },
  {
    id: 'reminder-2',
    title: 'Return reserved library books on the way back',
    person: 'Student',
    time: '4:00 PM',
    completed: false,
  },
  {
    id: 'reminder-3',
    title: 'Refill the kitchen water filter pitcher',
    person: 'Everyone',
    time: 'Tonight',
    completed: false,
  },
];

export const INITIAL_CARECIRCLE_CHECKINS: CheckIn[] = [
  {
    id: 'checkin-mom',
    person: 'Mom',
    status: 'checked-in',
    time: '9:31 AM',
    mood: 'good',
    note: 'Felt calm this morning. Morning chores and meal prep all organized.',
    energyLevel: 85,
  },
  {
    id: 'checkin-dad',
    person: 'Dad',
    status: 'checked-in',
    time: '8:45 AM',
    mood: 'great',
    note: 'Dropped off student smoothly. Heading to morning errands.',
    energyLevel: 90,
  },
  {
    id: 'checkin-student',
    person: 'Student',
    status: 'checked-in',
    time: '8:10 AM',
    mood: 'good',
    note: 'Project display board ready. Feeling prepared for class.',
    energyLevel: 80,
  },
  {
    id: 'checkin-grandma',
    person: 'Grandma Rose',
    status: 'pending',
    time: null,
    mood: 'okay',
    note: 'Scheduled check-in at 2:00 PM after afternoon rest.',
    energyLevel: 75,
  },
];

export const INITIAL_CARECIRCLE_SHOPPING: ShoppingItem[] = [
  {
    id: 'shopping-1',
    name: 'Organic Oat Milk',
    quantity: '2 cartons',
    category: 'Groceries',
    purchased: false,
    addedBy: 'Mom',
  },
  {
    id: 'shopping-2',
    name: 'Hass Avocados',
    quantity: '4 ripe',
    category: 'Groceries',
    purchased: false,
    addedBy: 'Dad',
  },
  {
    id: 'shopping-3',
    name: 'Elderberry Immune Drops & Vitamin C',
    quantity: '1 bottle',
    category: 'Pharmacy',
    purchased: false,
    addedBy: 'Mom',
  },
  {
    id: 'shopping-4',
    name: 'Gentle Lavender Hand Soap',
    quantity: '2 refills',
    category: 'Household',
    purchased: true,
    addedBy: 'Student',
  },
];

export const INITIAL_CARECIRCLE_PLAN: DailyPlanStep[] = [
  {
    time: '8:15 AM',
    title: 'School drop-off',
    person: 'Student',
    note: 'Family · At Westside School',
  },
  {
    time: '9:00 AM',
    title: 'Pack science project display board',
    person: 'Student',
    note: 'High priority · due today.',
  },
  {
    time: '10:30 AM',
    title: 'Dr. Henderson Telehealth Check',
    person: 'Grandma Rose',
    note: 'Health · At Video call',
  },
  {
    time: '11:30 AM',
    title: 'Pick up prescription refill',
    person: 'Dad',
    note: 'Pharmacy pickup · due today.',
  },
  {
    time: '4:45 PM',
    title: 'Grocery & Market pickup',
    person: 'Mom',
    note: 'Home · At Market Street Market',
  },
  {
    time: '5:30 PM',
    title: 'Piano & Music practice',
    person: 'Student',
    note: 'Activity · At Downtown Music Studio',
  },
  {
    time: '7:00 PM',
    title: 'Family dinner together',
    person: 'Everyone',
    note: 'Family · At Home · Make a moment to check in with Grandma Rose.',
  },
];

export const INITIAL_CARECIRCLE_ACTIVITIES: CareActivity[] = [
  {
    id: 'act-1',
    time: '9:49 AM',
    label: 'Task update',
    detail: 'Completed “Water balcony herbs & indoor plants”.',
    toolName: 'complete_task',
    success: true,
  },
  {
    id: 'act-2',
    time: '9:33 AM',
    label: 'Rhythm created',
    detail: 'Built a 7-step plan from 2 open tasks and today’s schedule.',
    toolName: 'generate_daily_plan',
    success: true,
  },
  {
    id: 'act-3',
    time: '9:31 AM',
    label: 'Check-in logged',
    detail: 'Mom checked in: “Felt calm this morning”.',
    toolName: 'family_check_in',
    success: true,
  },
  {
    id: 'act-4',
    time: '9:23 AM',
    label: 'Reminder scheduled',
    detail: 'Created “Follow up on Grandma Rose’s afternoon tea & rest”.',
    toolName: 'create_reminder',
    success: true,
  },
];

export const PRESET_USERS: UserSession[] = [
  {
    id: 'user-padma',
    name: 'Padma Reddy',
    email: 'padma.reddy@carecircle.org',
    role: 'caregiver',
    roleTitle: 'Primary Family Caregiver & Admin',
    relation: 'Daughter & Daily Care Lead',
    badge: 'Care Lead',
    familyCircleCode: 'CIRCLE-REDDY-2026',
    lastLogin: 'Just now',
  },
  {
    id: 'user-margaret',
    name: 'Margaret Reddy',
    email: 'margaret.reddy@carecircle.org',
    role: 'senior',
    roleTitle: 'Senior Care Recipient',
    relation: 'Mother / Grandmother (Age 78)',
    badge: 'Senior VIP',
    familyCircleCode: 'CIRCLE-REDDY-2026',
    lastLogin: 'Today, 8:30 AM',
  },
  {
    id: 'user-david',
    name: 'David Reddy',
    email: 'david.reddy@familycare.org',
    role: 'family',
    roleTitle: 'Family Co-Caregiver',
    relation: 'Son / Sibling (Errands & Groceries)',
    badge: 'Active Contributor',
    familyCircleCode: 'CIRCLE-REDDY-2026',
    lastLogin: 'Yesterday, 6:15 PM',
  },
  {
    id: 'user-dr-sarah',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'dr.jenkins@stmaryshealth.org',
    role: 'doctor',
    roleTitle: 'Attending Geriatric Physician',
    relation: 'Geriatric Telehealth Provider',
    badge: 'MD Verified',
    familyCircleCode: 'CIRCLE-REDDY-2026',
    lastLogin: 'Today, 10:00 AM',
  },
  {
    id: 'user-guest',
    name: 'Guest Explorer',
    email: 'guest@lifebridge.ai',
    role: 'guest',
    roleTitle: 'Guest Access & System Demo',
    relation: 'Prospective Care Circle Member',
    badge: 'Demo Mode',
    familyCircleCode: 'CIRCLE-DEMO-2026',
    lastLogin: 'Just now',
  },
];

