import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  FileText,
  HeartHandshake,
  Languages,
  MessageSquare,
  PenTool,
  Pill,
  Sparkles,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

interface AIToolDef {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  bgPastel: string;
  borderTint: string;
  defaultPrompt: string;
  placeholder: string;
  category: 'clinical' | 'communication' | 'coordination' | 'assistive';
  disclaimer?: string;
  sampleInputs: string[];
}

export const AIToolsCenterPage: React.FC = () => {
  const { setPage, setCareSubPage, showToast, addPlan, addExplanation } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<AIToolDef | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [toolOutput, setToolOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState('Spanish');

  const tools: AIToolDef[] = [
    {
      id: 'chat_assistant',
      name: 'AI Chat Assistant',
      badge: 'Interactive Conversational',
      description: 'Full-featured conversational assistant for health questions, care routines, and compassionate emotional guidance.',
      icon: MessageSquare,
      gradient: 'from-indigo-500 to-sky-400',
      bgPastel: 'bg-indigo-50/50',
      borderTint: 'border-indigo-100',
      defaultPrompt: '',
      placeholder: 'Ask any question regarding care, coping strategies, or family routines...',
      category: 'assistive',
      sampleInputs: [
        'How do I set up a low-stress evening routine for an elder with dementia?',
        'What should I say to a doctor if I feel rushed during an appointment?',
      ],
    },
    {
      id: 'writing_assistant',
      name: 'Writing Assistant',
      badge: 'Care Communication',
      description: 'Draft or improve communication with doctors, schools, insurers, or care team members with empathy and precision.',
      icon: PenTool,
      gradient: 'from-teal-500 to-emerald-400',
      bgPastel: 'bg-teal-50/50',
      borderTint: 'border-teal-100',
      defaultPrompt: 'Draft a polite note to Dr. Henderson requesting a 90-day prescription renewal for Grandma Rose’s blood pressure medication.',
      placeholder: 'Describe the message or paste a draft you want to improve...',
      category: 'communication',
      sampleInputs: [
        'Draft a polite note to Dr. Henderson requesting a 90-day prescription renewal.',
        'Write an update for my siblings detailing Grandma’s vitals and upcoming visits.',
        'Write a disability accommodation letter for my university professor.',
      ],
    },
    {
      id: 'summarizer',
      name: 'Text Summarizer',
      badge: 'Document Intelligence',
      description: 'Summarize complex medical discharge paperwork, clinical records, or dense healthcare pamphlets into clear bullet points.',
      icon: FileText,
      gradient: 'from-sky-500 to-cyan-400',
      bgPastel: 'bg-sky-50/50',
      borderTint: 'border-sky-100',
      defaultPrompt: 'Patient demonstrates mild cardiomegaly on chest radiograph. Continue Lisinopril 20mg PO daily with serum electrolyte panel in 4 weeks. Instruct patient on low sodium diet (<2g/day) and daily weights; call clinic if dyspnea or 3lb weight gain in 48 hours.',
      placeholder: 'Paste clinical notes, discharge summaries, or lengthy healthcare letters...',
      category: 'clinical',
      sampleInputs: [
        'Patient discharged following mild dehydration. Continue oral rehydration solution. Follow up with PCP in 5 days.',
        'Blood test results: Hemoglobin A1C 7.2%, Fasting Glucose 142 mg/dL. Metformin 500mg BID with meals initiated.',
      ],
    },
    {
      id: 'translation',
      name: 'Translation Tool',
      badge: 'Multilingual Care',
      description: 'Translate clinical notes, prescriptions, and family instructions into Telugu, Hindi, Spanish, French, or plain English.',
      icon: Languages,
      gradient: 'from-amber-500 to-orange-400',
      bgPastel: 'bg-amber-50/50',
      borderTint: 'border-amber-100',
      defaultPrompt: 'Take one blue capsule every morning after breakfast with plenty of water. Do not lie down for 30 minutes after taking.',
      placeholder: 'Enter text to translate into patient-friendly terms...',
      category: 'communication',
      sampleInputs: [
        'Take one tablet daily at bedtime. Avoid driving or alcohol.',
        'Schedule a fasting blood glucose check early morning before breakfast.',
      ],
    },
    {
      id: 'study_assistant',
      name: 'Study Assistant',
      badge: 'Patient Education',
      description: 'Explain complex diagnoses, medical lab results, anatomy concepts, or treatments in simple, accessible language.',
      icon: BookOpen,
      gradient: 'from-violet-500 to-purple-400',
      bgPastel: 'bg-violet-50/50',
      borderTint: 'border-violet-100',
      defaultPrompt: 'What does systolic vs diastolic blood pressure mean, and what is considered an ideal range for an 75-year-old?',
      placeholder: 'What health concept or medical term would you like explained simply?',
      category: 'assistive',
      sampleInputs: [
        'What does systolic vs diastolic blood pressure mean?',
        'Explain what congestive heart failure means in simple terms.',
        'Why do doctors order an echocardiogram versus an EKG?',
      ],
    },
    {
      id: 'coding_assistant',
      name: 'Coding Assistant',
      badge: 'HealthTech Engineering',
      description: 'Technical guidance, FHIR/HL7 schemas, health API integration, and clinical data formatting for health tech builders.',
      icon: Code2,
      gradient: 'from-emerald-500 to-teal-400',
      bgPastel: 'bg-emerald-50/50',
      borderTint: 'border-emerald-100',
      defaultPrompt: 'Create a JSON schema for a MedicationSchedule complying with FHIR MedicationStatement resource standards.',
      placeholder: 'Describe your healthcare technical, API, or data modeling question...',
      category: 'coordination',
      sampleInputs: [
        'Write a TypeScript function to parse blood pressure readings "120/80" into systolic and diastolic integers.',
        'Generate a JSON schema for an eldercare daily check-in event.',
      ],
    },
    {
      id: 'carecircle_ai',
      name: 'CareCircle AI Assistant',
      badge: 'Family Coordination',
      description: 'Coordinate family schedules, allocate daily chores, plan respite breaks, and eliminate caregiver tension.',
      icon: HeartHandshake,
      gradient: 'from-rose-500 to-pink-400',
      bgPastel: 'bg-rose-50/50',
      borderTint: 'border-rose-100',
      defaultPrompt: 'We need to divide care for Grandma Rose this weekend: 1) Pharmacy pickup, 2) Sunday lunch preparation, 3) Blood sugar logging. We have Mom, Dad, and Priya available.',
      placeholder: 'Describe your family care duties or conflicts you want to coordinate...',
      category: 'coordination',
      sampleInputs: [
        'Plan a weekend chore breakdown between Mom, Dad, and teenager for Grandma’s care.',
        'How can family members track daily medications without repeating doses?',
      ],
    },
    {
      id: 'health_info',
      name: 'Health Information Assistant',
      badge: 'Evidence-Based Education',
      description: 'Reliable educational information on symptoms, recovery nutrition, and healthy habits with medical safety guidelines.',
      icon: Activity,
      gradient: 'from-blue-600 to-cyan-500',
      bgPastel: 'bg-blue-50/50',
      borderTint: 'border-blue-100',
      defaultPrompt: 'What are low-sodium, heart-healthy meal ideas for an older adult who dislikes bland food?',
      placeholder: 'Ask an educational question about lifestyle, nutrition, or symptom awareness...',
      category: 'clinical',
      disclaimer: 'Educational purposes only. Not clinical advice. For acute emergencies, call 911 immediately.',
      sampleInputs: [
        'What are low-sodium, heart-healthy meal ideas for an elder who dislikes bland food?',
        'What are early signs of dehydration in older adults?',
        'How does chronic lack of sleep impact blood pressure?',
      ],
    },
    {
      id: 'medication_planner',
      name: 'Medication Planner',
      badge: 'Adherence & Safety',
      description: 'Convert prescriptions and medication lists into an organized daily schedule with food timings and cautions.',
      icon: Pill,
      gradient: 'from-teal-600 to-sky-500',
      bgPastel: 'bg-teal-50/50',
      borderTint: 'border-teal-100',
      defaultPrompt: 'Grandma takes: Lisinopril 20mg once daily in morning, Metformin 500mg twice daily with meals, Atorvastatin 20mg at bedtime, and Vitamin D3 1000IU daily.',
      placeholder: 'Enter medications, dosages, and doctor notes to build a clean schedule...',
      category: 'clinical',
      sampleInputs: [
        'Lisinopril 20mg morning, Metformin 500mg BID with food, Atorvastatin 20mg bedtime.',
        'Baby liquid amoxicillin 250mg/5mL 1 teaspoon every 8 hours for 10 days.',
      ],
    },
    {
      id: 'appointment_planner',
      name: 'Appointment Planner',
      badge: 'Visit Preparation',
      description: 'Prepare thoroughly for doctor visits: generate targeted questions, necessary paperwork, and symptom logs.',
      icon: Calendar,
      gradient: 'from-indigo-600 to-violet-500',
      bgPastel: 'bg-indigo-50/50',
      borderTint: 'border-indigo-100',
      defaultPrompt: 'Cardiology follow-up appointment after starting a new blood pressure medicine 3 weeks ago. Patient felt dizzy twice when standing.',
      placeholder: 'What appointment are you preparing for? Share any concerns or questions...',
      category: 'coordination',
      sampleInputs: [
        'Cardiology follow-up after starting new blood pressure medicine; felt dizzy twice when standing.',
        'Pediatrician 6-month wellness checkup for baby.',
        'First visit with an orthopedic specialist for chronic knee pain.',
      ],
    },
    {
      id: 'care_journal',
      name: 'Notes & Care Journal',
      badge: 'Caregiver Reflection',
      description: 'Summarize caregiver notes, detect stress or burnout trends, and create clinical progress logs for follow-ups.',
      icon: FileText,
      gradient: 'from-amber-500 to-yellow-400',
      bgPastel: 'bg-amber-50/50',
      borderTint: 'border-amber-100',
      defaultPrompt: 'Today was tough. Grandma refused to take her lunch pills, claiming they made her nauseous yesterday. She napped for 3 hours afterwards. Blood pressure was 134/86 at 4 PM.',
      placeholder: 'Record today’s caregiving observations, feelings, or patient vitals...',
      category: 'assistive',
      sampleInputs: [
        'Grandma refused lunch pills, claiming nausea. Napped for 3 hours. BP 134/86 at 4 PM.',
        'Post-surgery day 3: Patient walked 200 feet, pain rated 4/10 with Tylenol, appetite improving.',
      ],
    },
    {
      id: 'image_understanding',
      name: 'Image Understanding',
      badge: 'Assistive Vision',
      description: 'Explain prescription label photos, medical receipts, test results, or pill bottles in plain, readable text.',
      icon: Camera,
      gradient: 'from-rose-500 to-orange-400',
      bgPastel: 'bg-rose-50/50',
      borderTint: 'border-rose-100',
      defaultPrompt: 'Rx #9283741: AMOXICILLIN 500MG CAP. Take 1 capsule by mouth every 8 hours for 10 days until all taken. Refills: 0. Discard after 10/2026. Warning: May cause drowsiness.',
      placeholder: 'Paste transcribed label text, OCR output, or describe the medical image...',
      category: 'clinical',
      sampleInputs: [
        'Rx #9283741: AMOXICILLIN 500MG CAP. Take 1 capsule by mouth every 8 hours for 10 days.',
        'Lab Slip: Lipid Panel: Total 210, Triglycerides 160, HDL 42, LDL 136. Fasting 12 hours.',
      ],
    },
  ];

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  const openToolModal = (tool: AIToolDef) => {
    if (tool.id === 'chat_assistant') {
      setPage('chat');
      return;
    }
    setSelectedTool(tool);
    setToolInput(tool.defaultPrompt);
    setToolOutput('');
    setCopied(false);
  };

  const handleRunTool = async () => {
    if (!selectedTool || !toolInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setToolOutput('');
    setCopied(false);

    try {
      const res = await fetch('/api/gemini/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: selectedTool.id,
          input: toolInput,
          options: {
            targetLanguage: selectedLang,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok && !data.result) {
        throw new Error(data.error || 'Execution failed');
      }

      setToolOutput(data.result || 'No output generated.');
      showToast(`${selectedTool.name} completed successfully!`);
    } catch (err: any) {
      console.error('Tool run error:', err);
      setToolOutput(`Error: ${err.message || 'Unable to connect to AI tool service'}`);
      showToast('Tool encountered an error', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyResult = () => {
    if (!toolOutput) return;
    navigator.clipboard.writeText(toolOutput);
    setCopied(true);
    showToast('Result copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToPlan = () => {
    if (!toolOutput || !selectedTool) return;
    addPlan({
      id: `tool-plan-${Date.now()}`,
      title: `${selectedTool.name} — Generated Plan`,
      summary: toolOutput.slice(0, 160) + '...',
      problem: toolInput.slice(0, 200),
      goal: 'Execute structured care & health steps from AI tool',
      audience: 'caregiver',
      category: 'daily_planning',
      urgency: 'soon',
      language: 'english',
      response_style: 'checklist',
      resources: 'LifeBridge AI Engine',
      draft_message: toolOutput.slice(0, 300),
      assumptions: ['Care team members are notified', 'Supplies are available'],
      obstacles: ['Schedule changes', 'Follow-up delays'],
      follow_up_tasks: ['Review progress in 48 hours'],
      status: 'active',
      created_at: new Date().toISOString(),
      tasks: [
        { id: 't1', text: 'Review AI-generated schedule with care team', priority: 'high', timeframe: 'Today', completed: false },
        { id: 't2', text: 'Log updates in CareCircle Hub', priority: 'medium', timeframe: 'Tomorrow', completed: false },
      ],
    });
    setSelectedTool(null);
    setPage('saved');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-16">
      {/* Hero Header with High-Fidelity Photo */}
      <div className="border-b border-indigo-100/80 bg-white/80 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 mb-3 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
                <span>12 Real AI-Powered Healthcare & Caregiving Tools</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                AI Tools Center
              </h1>
              <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
                Dedicated assistive tools built with Google Gemini to summarize medical notes, schedule medications, coordinate family caregiving, and communicate calmly with clinicians.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => setPage('chat')}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Open Full Chat Assistant</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-md bg-white">
                <img
                  src={APP_IMAGES.digitalHealthCare}
                  alt="Clinician and caregiver reviewing digital care plan together"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <span className="font-bold text-teal-300 block">Digital Care Collaboration</span>
                    <span className="text-[11px] text-slate-200">Clinical precision meets compassionate family care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All 12 Tools' },
              { id: 'clinical', label: 'Clinical & Medication' },
              { id: 'communication', label: 'Communication & Translation' },
              { id: 'coordination', label: 'CareCircle Coordination' },
              { id: 'assistive', label: 'Education & Assistive' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-2xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => openToolModal(tool)}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${tool.gradient} text-white shadow-sm`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Open Tool</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tool Modal Runner */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6">
          <div className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${selectedTool.gradient} text-white`}>
                  {React.createElement(selectedTool.icon, { className: 'h-5 w-5' })}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedTool.name}</h2>
                  <p className="text-xs text-slate-500">{selectedTool.badge}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTool(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Target Language selector for Translation */}
              {selectedTool.id === 'translation' && (
                <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-200 rounded-2xl p-3">
                  <Languages className="h-4 w-4 text-amber-700" />
                  <span className="text-xs font-bold text-amber-900">Select Target Language:</span>
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="rounded-xl border border-amber-300 bg-white px-3 py-1 text-xs text-amber-900 font-semibold focus:outline-none"
                  >
                    <option value="Telugu">తెలుగు (Telugu)</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                    <option value="Spanish">Español (Spanish)</option>
                    <option value="French">Français (French)</option>
                    <option value="English">English (Simplified)</option>
                  </select>
                </div>
              )}

              {/* Sample Chips */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
                  Quick Starter Examples:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.sampleInputs.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setToolInput(sample)}
                      className="rounded-xl border border-slate-200 bg-[#FAF9F6] px-3 py-1.5 text-xs text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors text-left"
                    >
                      {sample.length > 55 ? sample.slice(0, 55) + '...' : sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
                  Input Details:
                </label>
                <textarea
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  placeholder={selectedTool.placeholder}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-[#FAF9F6] p-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                />
              </div>

              {/* Safety Disclaimer */}
              {selectedTool.disclaimer && (
                <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-800">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>{selectedTool.disclaimer}</span>
                </div>
              )}

              {/* Output Result */}
              {toolOutput && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Result & Recommendations
                    </span>
                    <button
                      onClick={copyResult}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 bg-[#FAF9F6] p-4 rounded-xl border border-slate-100">
                    {toolOutput}
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      onClick={saveToPlan}
                      className="flex items-center gap-1.5 rounded-xl bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                      <span>Save as Action Plan</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-400">
                Powered by Google Gemini 3.8 Flash Engine
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedTool(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleRunTool}
                  disabled={!toolInput.trim() || isProcessing}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-3.5 w-3.5 animate-spin" />
                      <span>Generating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Run Tool</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
