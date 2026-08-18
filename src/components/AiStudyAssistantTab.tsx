import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, CheckCircle, HelpCircle, FileText, Loader2 } from 'lucide-react';
import { AiChatMessage } from '../types';

interface AiStudyAssistantTabProps {
  initialPrompt?: { title: string; text: string } | null;
  onClearInitialPrompt?: () => void;
}

export const AiStudyAssistantTab: React.FC<AiStudyAssistantTabProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your AI Study Assistant powered by Gemini. I can help you summarize study notes, explain difficult concepts in simple terms, or generate practice quiz questions. How can I help you study today?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'explain' | 'summarize' | 'quiz'>('explain');

  useEffect(() => {
    if (initialPrompt) {
      const promptText = `Please summarize these study notes titled "${initialPrompt.title}":\n\n${initialPrompt.text}`;
      handleQuickPrompt(promptText, 'summarize');
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleQuickPrompt = async (customPrompt?: string, actionType: 'explain' | 'summarize' | 'quiz' = selectedAction) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/study-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          prompt: textToSend,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get AI response');

      const aiMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.result,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `Sorry, I encountered an error: ${err.message || 'Please check your API key or connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Powered by Gemini 3.7 Flash
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            AI Study Assistant & Quiz Master
          </h1>
          <p className="text-amber-100 text-sm sm:text-base">
            Ask complex study questions, summarize dense lecture notes, or generate custom multiple-choice practice quizzes instantly.
          </p>
        </div>
      </div>

      {/* Quick Action Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedAction('explain')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            selectedAction === 'explain'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> Explain Concept
        </button>

        <button
          onClick={() => setSelectedAction('summarize')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            selectedAction === 'summarize'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Summarize Notes
        </button>

        <button
          onClick={() => setSelectedAction('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            selectedAction === 'quiz'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Generate Quiz
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[550px]">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <div className="text-[10px] font-semibold opacity-70 mb-1">
                  {msg.sender === 'user' ? 'You' : 'Gemini Study Assistant'} • {msg.timestamp}
                </div>
                <div className="markdown-body">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 text-stone-500 text-sm shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span>Generating AI response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuickPrompt();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                selectedAction === 'summarize'
                  ? 'Paste study notes or topic to summarize...'
                  : selectedAction === 'quiz'
                  ? 'Enter topic for quiz questions (e.g., Quantum Physics)...'
                  : 'Ask any study question or concept to explain...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
