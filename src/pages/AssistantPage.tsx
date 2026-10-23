import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, Send, Sparkles, User, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  actionShortcut?: 'create' | 'carecircle' | 'explain';
}

export const AssistantPage: React.FC = () => {
  const { language, setPage, setCareSubPage } = useApp();

  const getWelcomeText = (lang: string) => {
    if (lang === 'telugu') {
      return 'హలో! నేను మీ LifeBridge AI సహాయకుడిని. మీ సమస్యను, అర్థం కాని సందేశాన్ని లేదా నిర్వహించాల్సిన పనిని చెప్పండి. నేను మీ కోసం ఒక స్పష్టమైన ప్రణాళికను రూపొందిస్తాను.';
    }
    if (lang === 'hindi') {
      return 'नमस्ते! मैं आपका LifeBridge AI सहायक हूँ। अपनी समस्या, समझ में न आने वाला संदेश या कोई काम बताइए। मैं आपके लिए एक स्पष्ट योजना बनाऊंगा।';
    }
    return "Hi! I'm your LifeBridge AI assistant. Tell me what's on your mind — a problem, a confusing message, or family care routines you need help organizing — and I'll create a clear plan for you.";
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getWelcomeText(language),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const promptSuggestions = [
    'How do I set up a daily check-in routine for my grandma?',
    'I have two assignments due tomorrow and need a plan',
    'Can you help me explain a confusing school notice?',
    'What should I do if a planned family check-in was missed?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';
      let action: 'create' | 'carecircle' | 'explain' | undefined;

      if (lower.includes('grandma') || lower.includes('check-in') || lower.includes('elder') || lower.includes('family')) {
        reply =
          language === 'telugu'
            ? 'మీరు మీ అమ్మమ్మ/బామ్మ గారి కోసం CareCircle లో రోజువారీ చెక్-ఇన్ సమయాలను సులభంగా ఏర్పాటు చేయవచ్చు. ఉదయం 9:00 గంటలకు మరియు సాయంత్రం 7:00 గంటలకు కాల్ చేయడం మంచిది. మీరు నేరుగా కేర్‌సర్కిల్ (CareCircle) హబ్‌లో సభ్యులను జోడించవచ్చు.'
            : language === 'hindi'
            ? 'आप अपनी दादीजी के लिए CareCircle में दैनिक चेक-इन रूटीन बहुत आसानी से सेट कर सकते हैं। सुबह 9 बजे और शाम 7 बजे कॉल करने की सिफारिश की जाती है। आप CareCircle हब में सीधे शेड्यूल बना सकते हैं।'
            : 'Setting up a daily check-in routine brings tremendous peace of mind. I recommend setting two calm anchor points: a morning call (around 9 AM) to check breakfast and medications, and an evening check-in (around 7 PM). You can coordinate this directly across family members in our CareCircle Hub.';
        action = 'carecircle';
      } else if (lower.includes('assignment') || lower.includes('study') || lower.includes('exam') || lower.includes('homework')) {
        reply =
          'When facing multiple tight deadlines, the key is structured pacing: Break each assignment into 25-minute Pomodoro sprints. Tackle the highest urgency task first to gain confidence, and draft an outline before writing.';
        action = 'create';
      } else if (lower.includes('notice') || lower.includes('explain') || lower.includes('letter') || lower.includes('confusing')) {
        reply =
          'I would be happy to analyze that notice for you! Simply paste the text into our "Explain This Message" tool, and I will extract the crucial dates, translate any bureaucratic jargon, and give you a checklist.';
        action = 'explain';
      } else {
        reply =
          `I understand. Facing "${query}" can feel overwhelming when keeping it all in your head. LifeBridge AI can break this down into prioritized steps and communication drafts right away.`;
        action = 'create';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          actionShortcut: action,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Care & Action Assistant</h1>
            <p className="text-xs text-slate-400">Gentle, trauma-informed guidance for everyday life</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 rounded-full">
            Multilingual Support
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isUser
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-lg shadow-sm ${
                  isUser
                    ? 'bg-teal-500 text-slate-950 font-medium'
                    : 'border border-slate-800 bg-slate-900/90 text-slate-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {m.actionShortcut && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2">
                    {m.actionShortcut === 'carecircle' && (
                      <button
                        onClick={() => {
                          setCareSubPage('overview');
                          setPage('carecircle');
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>Open CareCircle Family Hub</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    {m.actionShortcut === 'create' && (
                      <button
                        onClick={() => setPage('create')}
                        className="flex items-center gap-1.5 rounded-lg border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 hover:bg-teal-500/20"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Create Full Action Plan</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    {m.actionShortcut === 'explain' && (
                      <button
                        onClick={() => setPage('explain')}
                        className="flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                      >
                        <span>Paste into Explain Tool</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs text-slate-400">
              <span className="animate-pulse">Thinking through gentle guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt chips */}
      <div className="pt-3 pb-2 flex flex-wrap gap-2">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question, share what is causing stress, or request a plan..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-40 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
