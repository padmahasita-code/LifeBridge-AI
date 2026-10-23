import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  suggestedAction?: {
    type: 'reminder' | 'task' | 'shopping';
    title: string;
    person: string;
  };
}

export const CareAssistant: React.FC = () => {
  const { addCareTask, addCareReminder, addShoppingItem, showToast } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "Hello! I am your CareCircle companion. Whether you need a gentle routine for bedtime, want to draft a polite message to a doctor, or need help dividing family chores without tension, I am here to help.",
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const samplePrompts = [
    'Suggest a gentle bedtime routine for an overwhelmed child',
    "Draft a note to Grandma Rose's doctor about a prescription refill",
    'How can we coordinate family tasks without sounding naggy?',
    'Plan a simple, low-effort dinner for 4 with pantry items',
  ];

  const handleSend = async (text?: string) => {
    const query = (text || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          mode: 'caregiver',
          history: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'Guidance received.';

      const lower = query.toLowerCase();
      let suggestedAction: Message['suggestedAction'] = undefined;

      if (lower.includes('refill') || lower.includes('medication') || lower.includes('doctor')) {
        suggestedAction = {
          type: 'task',
          title: 'Confirm pharmacy received doctor prescription refill',
          person: 'Dad',
        };
      } else if (lower.includes('bedtime') || lower.includes('routine') || lower.includes('sleep')) {
        suggestedAction = {
          type: 'reminder',
          title: 'Start gentle evening dim-down routine',
          person: 'Mom',
        };
      } else if (lower.includes('dinner') || lower.includes('grocery') || lower.includes('food')) {
        suggestedAction = {
          type: 'shopping',
          title: 'Comforting soup & fresh ingredients for dinner',
          person: 'Everyone',
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          suggestedAction,
        },
      ]);
    } catch {
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `I hear you. For "${query}", the best step is to break it down into one small task that someone in your CareCircle can support with today.`,
          suggestedAction: {
            type: 'task',
            title: `Follow up on ${query.slice(0, 25)}...`,
            person: 'Everyone',
          },
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleApplyAction = (action: NonNullable<Message['suggestedAction']>) => {
    if (action.type === 'reminder') {
      addCareReminder({
        id: `rem-${Date.now()}`,
        title: action.title,
        person: action.person,
        time: '8:00 PM',
        completed: false,
      });
      showToast(`Added reminder: “${action.title}”`);
    } else if (action.type === 'task') {
      addCareTask({
        id: `task-${Date.now()}`,
        title: action.title,
        person: action.person,
        due: 'Today',
        priority: 'medium',
        completed: false,
      });
      showToast(`Added task to ${action.person}`);
    } else if (action.type === 'shopping') {
      addShoppingItem({
        id: `shop-${Date.now()}`,
        name: action.title,
        quantity: '1',
        category: 'Groceries',
        purchased: false,
        addedBy: 'Care Assistant',
      });
      showToast(`Added to shared shopping list!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-[#e7e1d5] pb-6">
        <span className="eyebrow text-[#7d8f82]">CARE ASSISTANT · GENTLE HAND</span>
        <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
          Ask for a hand
        </h1>
        <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
          Guidance on meal prep, calming bedtime routines, drafting notes for pediatricians and eldercare doctors, and sharing responsibilities with ease.
        </p>
      </div>

      {/* Chat shell */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-4">
        {/* Messages */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ${
                    isUser
                      ? 'bg-[#334e43] text-white'
                      : 'bg-[#e9bd79] text-[#243b33]'
                  }`}
                >
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed max-w-xl ${
                    isUser
                      ? 'bg-[#334e43] text-white'
                      : 'bg-[#faf8f1] border border-[#ede8db] text-[#2b4036]'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-sans-clean">{m.text}</p>

                  {/* Optional 1-click action recommendation */}
                  {m.suggestedAction && (
                    <div className="mt-3 pt-3 border-t border-[#e2dccf] flex items-center justify-between gap-3">
                      <div className="text-[11px] text-[#55695f] font-medium">
                        Suggested Action: <strong className="text-[#263d35]">{m.suggestedAction.title}</strong>
                      </div>
                      <button
                        onClick={() => handleApplyAction(m.suggestedAction!)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#e9bd79] px-2.5 py-1 text-[11px] font-bold text-[#243b33] hover:bg-[#dfb16b] transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add to {m.suggestedAction.type}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9bd79] text-[#243b33]">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-[#faf8f1] border border-[#ede8db] p-3 text-xs text-[#7d8f82] animate-pulse">
                Thinking with gentle care...
              </div>
            </div>
          )}
        </div>

        {/* Prompt chips */}
        <div className="pt-2 flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="rounded-lg border border-[#ded8c9] bg-[#faf8f1] px-3 py-1.5 text-[11px] text-[#4d6357] hover:bg-[#f1ebe0] transition-colors"
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
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about family care, routines, medications, or schedules..."
            className="flex-1 rounded-xl border border-[#ded8c9] bg-[#fffdf8] px-4 py-3 text-xs text-[#263d35] placeholder-[#909c93] focus:border-[#688b76] focus:outline-none focus:ring-1 focus:ring-[#688b76]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#263d35] text-[#fffdf7] hover:bg-[#334e43] disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
