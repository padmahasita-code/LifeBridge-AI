import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  HeartHandshake,
  MessageSquare,
  Plus,
  RefreshCw,
  RotateCcw,
  Send,
  Sparkles,
  Trash2,
  User,
  Users,
  Wrench,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  modelUsed?: string;
  actionShortcut?: 'create' | 'carecircle' | 'explain' | 'tools';
}

interface SavedConversation {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export const AIChatPage: React.FC = () => {
  const { language, setPage, setCareSubPage, showToast } = useApp();

  const getInitialGreeting = (lang: string) => {
    if (lang === 'telugu') {
      return 'నమస్కారం! నేను మీ LifeBridge & CareCircle AI సహాయకుడిని. కుటుంబ సంరక్షణ, మందుల వేళలు, వైద్య సూచనలు లేదా రోజువారీ పనులపై నాతో మాట్లాడండి.';
    }
    if (lang === 'hindi') {
      return 'नमस्ते! मैं आपका LifeBridge और CareCircle AI सहायक हूँ। परिवार की देखभाल, दवाइयों के समय, डॉक्टरों के परामर्श या किसी भी दिनचर्या में सहायता के लिए मैं तैयार हूँ।';
    }
    return "Hello! I am your LifeBridge & CareCircle AI Companion. I am here to help you navigate family caregiving, organize daily routines, clarify confusing medical notes, draft doctor messages, and find calm in stressful moments.";
  };

  const [conversations, setConversations] = useState<SavedConversation[]>(() => {
    try {
      const saved = localStorage.getItem('lifebridge_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentChatId, setCurrentChatId] = useState<string>(() => `chat-${Date.now()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getInitialGreeting(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelBadge, setModelBadge] = useState<string>('Google Gemini (Live)');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Sync to history
  useEffect(() => {
    if (messages.length <= 1) return;
    const title = messages.find((m) => m.sender === 'user')?.text.slice(0, 30) || 'Care Conversation';
    setConversations((prev) => {
      const existingIdx = prev.findIndex((c) => c.id === currentChatId);
      const updatedItem: SavedConversation = {
        id: currentChatId,
        title,
        date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
        messages,
      };
      const next = existingIdx >= 0
        ? prev.map((c, idx) => (idx === existingIdx ? updatedItem : c))
        : [updatedItem, ...prev];
      localStorage.setItem('lifebridge_chat_history', JSON.stringify(next.slice(0, 15)));
      return next;
    });
  }, [messages, currentChatId]);

  const starterPrompts = [
    {
      title: 'Daily Care Routine',
      prompt: 'Help me plan a compassionate morning and evening routine for Grandma with reminder times.',
    },
    {
      title: 'Doctor Message Draft',
      prompt: 'Draft a polite note to Dr. Martinez requesting a 90-day refill for blood pressure medication.',
    },
    {
      title: 'Caregiver Respite',
      prompt: 'I am feeling overwhelmed caring for an elderly parent and two children. How do I divide tasks calmly?',
    },
    {
      title: 'Medical Notice Clarifier',
      prompt: 'Can you explain the difference between generic Lisinopril and brand name medications in plain language?',
    },
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt ?? input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      if (!res.ok && !data.reply) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      const lower = textToSend.toLowerCase();
      let shortcut: ChatMessage['actionShortcut'] = undefined;
      if (lower.includes('grandma') || lower.includes('check-in') || lower.includes('family') || lower.includes('elder')) {
        shortcut = 'carecircle';
      } else if (lower.includes('plan') || lower.includes('routine') || lower.includes('step')) {
        shortcut = 'create';
      } else if (lower.includes('explain') || lower.includes('notice') || lower.includes('bill')) {
        shortcut = 'explain';
      }

      const modelUsed = data.modelUsed || 'gemini-3.8-flash';
      setModelBadge(`Gemini (${modelUsed.replace('models/', '').replace('-preview', '')})`);

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'Guidance received successfully.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed,
          actionShortcut: shortcut,
        },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          sender: 'assistant',
          text: `I apologize, but I encountered a connection issue: ${err.message || 'Service momentarily unavailable'}. Please try again or explore our CareCircle Hub for coordinated family tasks.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionShortcut: 'carecircle',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setCurrentChatId(`chat-${Date.now()}`);
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: getInitialGreeting(language),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.8-flash',
      },
    ]);
    showToast('Started a fresh conversation', 'info');
  };

  const loadConversation = (convo: SavedConversation) => {
    setCurrentChatId(convo.id);
    setMessages(convo.messages);
    showToast(`Loaded "${convo.title}"`, 'info');
  };

  const clearHistory = () => {
    localStorage.removeItem('lifebridge_chat_history');
    setConversations([]);
    showToast('Cleared conversation history', 'info');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const retryLastMessage = () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUser) {
      handleSend(lastUser.text);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] text-slate-800">
      {/* Top Banner with colorful light palette */}
      <div className="border-b border-indigo-100/80 bg-white/80 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-teal-300 text-white shadow-sm shadow-indigo-200">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900">LifeBridge AI Assistant</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                  {modelBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500">Trauma-informed, compassionate guidance & family caregiving support</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={startNewChat}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
            <button
              onClick={() => setPage('tools')}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-105 transition-all shadow-xs"
            >
              <Wrench className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All AI Tools</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Conversation History & Shortcuts */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="rounded-3xl border border-indigo-100/80 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Chat History</span>
              {conversations.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                  title="Clear history"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="mt-3 space-y-1.5 max-h-[300px] overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">No past chats yet. Start asking questions!</p>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversation(c)}
                    className={`w-full text-left rounded-xl px-2.5 py-2 text-xs transition-colors flex items-center justify-between ${
                      c.id === currentChatId
                        ? 'bg-indigo-50/80 text-indigo-900 font-semibold border border-indigo-200/60'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{c.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{c.date}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* CareCircle Quick Access Card with Photo */}
          <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="relative shrink-0">
                <img
                  src={APP_IMAGES.grandmaPortrait}
                  alt="Grandma Rose"
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-xl object-cover border border-amber-300 shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block truncate">Grandma Rose (78)</span>
                <span className="text-[10px] text-teal-700 font-semibold block">Care status: Stable</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              Daily check-ins, medication refills, and appointments coordinated with 4 family members.
            </p>
            <button
              onClick={() => {
                setCareSubPage('overview');
                setPage('carecircle');
              }}
              className="w-full rounded-xl bg-amber-500/20 border border-amber-300 text-amber-950 text-xs font-bold py-2 hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Users className="h-3.5 w-3.5 text-amber-700" />
              <span>Open CareCircle Hub</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Safety note card */}
          <div className="rounded-3xl border border-sky-100 bg-sky-50/40 p-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-1.5 text-sky-800 font-semibold mb-1">
              <ShieldAlert className="h-4 w-4 text-sky-600" />
              <span>Medical Safety Notice</span>
            </div>
            LifeBridge AI provides supportive health organization and educational resources. For severe symptoms or medical emergencies, please dial 911 or visit the nearest ER.
          </div>
        </div>

        {/* Main Chat Center */}
        <div className="lg:col-span-3 flex flex-col h-[calc(100vh-12rem)] rounded-3xl border border-indigo-100/80 bg-white shadow-sm overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF9F6]/50">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-xs font-bold shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white'
                        : 'bg-gradient-to-tr from-indigo-600 to-sky-500 text-white'
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className={`group relative max-w-2xl ${isUser ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block rounded-3xl px-5 py-3.5 text-sm leading-relaxed text-left shadow-xs ${
                        isUser
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium'
                          : 'bg-white border border-slate-200/80 text-slate-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>

                      {/* Assistant Action Shortcut button */}
                      {m.actionShortcut && !isUser && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                          {m.actionShortcut === 'carecircle' && (
                            <button
                              onClick={() => {
                                setCareSubPage('overview');
                                setPage('carecircle');
                              }}
                              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                            >
                              <Users className="h-3.5 w-3.5 text-amber-600" />
                              <span>Open CareCircle Family Hub</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                          {m.actionShortcut === 'create' && (
                            <button
                              onClick={() => setPage('create')}
                              className="flex items-center gap-1.5 rounded-xl border border-teal-300 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                              <span>Create Action Plan</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                          {m.actionShortcut === 'explain' && (
                            <button
                              onClick={() => setPage('explain')}
                              className="flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-800 hover:bg-indigo-100 transition-colors"
                            >
                              <span>Explain Message Tool</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Metadata & Actions row */}
                    <div className={`mt-1 flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() => copyToClipboard(m.text, m.id)}
                            className="hover:text-slate-700 flex items-center gap-1 transition-colors"
                            title="Copy response"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="h-3 w-3 text-teal-600" />
                                <span className="text-teal-600 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-500 shadow-xs flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-indigo-500" />
                  <span>Consulting caregiving knowledge base with Google Gemini...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar (only show if few messages) */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try asking:</span>
              {starterPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  className="shrink-0 rounded-xl border border-indigo-100 bg-indigo-50/40 px-3 py-1 text-xs text-indigo-900 font-medium hover:bg-indigo-100 transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}

          {/* Bottom Message Composer */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative rounded-2xl border border-slate-200 bg-[#FAF9F6] p-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about care routines, medications, appointments, or emotional support... (Enter to send, Shift+Enter for new line)"
                rows={2}
                className="w-full resize-none bg-transparent px-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Shift + Enter for new line</span>
                  {messages.length > 2 && (
                    <button
                      onClick={retryLastMessage}
                      className="hover:text-indigo-600 flex items-center gap-1 transition-colors"
                      title="Retry last prompt"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Retry</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 text-xs font-bold text-white shadow-xs hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
