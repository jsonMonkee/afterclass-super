'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  Calendar, 
  Users, 
  HelpCircle, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "Auditions kab aur kahan hain?",
  "Best coding club kaunsa hai?",
  "AmiFIESTA passes kaise milenge?",
  "Major Arterial Rd campus canteen menu"
];

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hey! Main Choto Bantu hoon — tumhara Amity campus AI companion 🍌 Ask me anything about fests, clubs, canteen food, ya exams!",
    time: "Just now"
  }
];

export default function DiaChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener('open-dia-chatbot', handleTrigger);
    return () => window.removeEventListener('open-dia-chatbot', handleTrigger);
  }, []);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Contextual intelligent responses with Hinglish vibe
    setTimeout(() => {
      let botReply = "";
      const lower = query.toLowerCase();

      if (lower.includes('fest') || lower.includes('amifiesta')) {
        botReply = "AmiFIESTA 2026 is pinned for 28 March at the Central Lawn! Passes are free for registered students. RSVP tab me jaakar slot book kar lo!";
      } else if (lower.includes('audition') || lower.includes('cadence')) {
        botReply = "Cadence Dance Club auditions Friday 4:30 PM Auditorium 2 me hain! Western aur Bollywood semi-classical routines allowed hain.";
      } else if (lower.includes('club') || lower.includes('coding') || lower.includes('turing')) {
        botReply = "Amity Turing & Open Source Collective top active tech club hai! Weekly hack nights aur DevRel workshops hote hain.";
      } else if (lower.includes('canteen') || lower.includes('food') || lower.includes('cafeteria')) {
        botReply = "Cafeteria steps pe roll corner aur CCD outlet open hai till 7:30 PM. Pav bhaji & cold coffee are student favorites!";
      } else if (lower.includes('exam') || lower.includes('notice') || lower.includes('attendance')) {
        botReply = "75% attendance criteria strict hai boss! Controller of Examination ne mid-term notices pin kiye hain Official Gazette section me.";
      } else {
        botReply = `Got it! "${query}" ke related campus notices aur club leads check kar liye. Aur kuch verify karna hai regarding Amity Kolkata?`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 select-none">
      
      {/* 1. CHAT WINDOW POPUP (Outward-Facing Scalloped Outer Edge with Thin Inner Red Border & Curved Corners) */}
      {isOpen && (
        <div 
          className="mb-4 w-[calc(100vw-2rem)] sm:w-[410px] h-[550px] max-h-[82vh] bg-[#FFFDF5] rounded-[32px] flex flex-col overflow-visible animate-nav-pop backdrop-blur-2xl right-0 relative"
          style={{
            boxShadow: '0 30px 70px -10px rgba(0, 0, 0, 0.4), 0 15px 35px -5px rgba(225, 29, 72, 0.35)'
          }}
        >
          {/* Outward-facing Scallop Perimeter Edge (Joined seamlessly with corner caps) */}
          <div className="scallop-chat-top" />
          <div className="scallop-chat-bottom" />
          <div className="scallop-chat-left" />
          <div className="scallop-chat-right" />

          {/* Seamless Curved Corner Scallop Caps */}
          <div className="scallop-corner-tl" />
          <div className="scallop-corner-tr" />
          <div className="scallop-corner-bl" />
          <div className="scallop-corner-br" />

          {/* Inner content wrapper with Curved Rounded Corners and Thin Red Border */}
          <div className="w-full h-full rounded-[32px] border-[1.5px] border-[#E11D48] overflow-hidden flex flex-col relative z-20 bg-[#FFFDF5]">

            {/* Top Bar with Scallop & Red Gradient */}
          <div className="bg-gradient-to-r from-[#E11D48] via-[#881337] to-[#E11D48] text-white p-4.5 relative shrink-0">
            <div className="flex items-center justify-between">
              
              {/* Bot Identity */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 relative shrink-0">
                  <Image 
                    src="/dia-banana.png" 
                    alt="Choto Bantu AI" 
                    width={36} 
                    height={36}
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-arc-display font-extrabold text-base tracking-tight text-white">
                      Choto Bantu
                    </span>
                    <span className="bg-[#FEF08A] text-[#881337] text-[9.5px] font-arc-mono font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      AI 2.0
                    </span>
                  </div>
                  <p className="text-[11px] font-arc-mono text-white/80">
                    Amity Kolkata Companion
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages(INITIAL_MESSAGES)}
                  title="Reset conversation"
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

            </div>

            {/* Scallop transition inside header */}
            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-repeat-x bg-[length:24px_8px] bg-[radial-gradient(circle_at_bottom,transparent_4px,#E11D48_4px)]"></div>
          </div>

          {/* Quick Notice Pill Banner in Chatbot (Yellow/Red) */}
          <div className="bg-[#FEF08A] px-4 py-2 flex items-center justify-between text-[#881337] text-[11px] font-arc-mono font-bold">
            <span className="flex items-center gap-1.5 truncate">
              <Zap size={12} className="text-[#E11D48] shrink-0" />
              <span>Campus live: 3 fests & auditions active</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#881337]/80 shrink-0">
              Today
            </span>
          </div>

          {/* Messages Feed with Banana + "What's up?" Watermark Pattern */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 chat-pattern-bananas relative">
            {messages.map((msg, index) => {
              const isBot = msg.sender === 'bot';
              return (
                <div 
                  key={index}
                  className={`flex items-end gap-2 relative z-10 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 shrink-0 relative mb-1">
                      <Image 
                        src="/dia-banana.png" 
                        alt="Dia" 
                        width={24} 
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div 
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs font-sans leading-relaxed shadow-sm ${
                      isBot 
                        ? 'bg-white/95 text-[#140508] border border-black/10 rounded-bl-xs backdrop-blur-xs' 
                        : 'bg-[#E11D48] text-white font-medium rounded-br-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span 
                      className={`block text-[9px] font-arc-mono mt-1 ${
                        isBot ? 'text-black/40' : 'text-white/70'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-6 h-6 shrink-0 relative">
                  <Image 
                    src="/dia-banana.png" 
                    alt="Dia" 
                    width={24} 
                    height={24}
                    className="w-full h-full object-contain animate-bounce"
                  />
                </div>
                <div className="bg-white/95 px-3.5 py-2 rounded-2xl rounded-bl-xs border border-black/10 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FEF08A] animate-pulse delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="px-3 py-2 bg-[#FFFDF5]/90 border-t border-black/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="shrink-0 bg-[#FFFDF5] hover:bg-[#FEF08A]/60 text-[#881337] border border-[#E11D48]/25 hover:border-[#E11D48] px-2.5 py-1 rounded-full text-[10.5px] font-arc-mono transition-colors cursor-pointer shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box (Red / Yellow accent) */}
          <div className="p-3 bg-white border-t border-black/10 flex items-center gap-2 relative z-10">
            <input 
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Poocho Choto Bantu se kuch bhi... (e.g. fests, clubs)"
              className="flex-1 bg-[#FFFDF5] border border-black/15 focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/15 rounded-full px-4 py-2 text-xs text-[#000000] placeholder:text-black/40 outline-none transition-all shadow-inner"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim()}
              className="bg-[#E11D48] hover:bg-[#881337] disabled:opacity-40 text-white p-2.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <Send size={15} />
            </button>
          </div>

        </div>

      </div>
    )}

      {/* 2. FLOATING TRIGGER BUTTON (Bare pixel banana icon - desktop / hidden on mobile if navbar action is present, or positioned above bottom bar) */}
      <div className="hidden sm:flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Choto Bantu AI Chatbot"
          className="relative group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        >
          {/* Bare Banana Icon - No circle container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_15px_25px_rgba(225,29,72,0.45)] transition-all">
            <Image 
              src="/dia-banana.png" 
              alt="Choto Bantu Banana" 
              width={80} 
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {/* Tiny Yellow notification indicator dot */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEF08A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FACC15] border border-[#881337]"></span>
          </span>
        </button>

      </div>

    </div>
  );
}

