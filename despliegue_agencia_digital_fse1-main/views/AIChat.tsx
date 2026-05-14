
import React, { useState, useRef, useEffect } from 'react';
import { askDevAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Hola! Soy el **Growth Engine** de SEOGrowthers. Pregúntame sobre SEO técnico, IA o arquitectura.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const response = await askDevAssistant(input, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Error en transmisión.' }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-12 md:pt-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
        <header className="mb-6 text-center md:text-left">
           <h1 className="heading-editorial text-white text-2xl md:text-4xl italic uppercase">Growth <span className="text-[#2563eb]">Engine IA</span></h1>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Status: Online & Ready</p>
        </header>

        <div ref={scrollRef} className="flex-grow overflow-y-auto bg-[#0a0a0a] border border-[#222] p-4 md:p-8 space-y-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[90%] p-4 md:p-6 ${msg.role === 'user' ? 'bg-[#2563eb] text-white' : 'bg-[#121212] border border-[#222] text-slate-300'}`}>
                <p className="text-sm md:text-base leading-relaxed font-medium">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && <div className="text-[#2563eb] text-xs font-black animate-pulse uppercase tracking-widest">Calculando...</div>}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input 
            type="text" value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta algo..." 
            className="flex-grow bg-[#121212] border border-[#222] text-white p-4 text-sm outline-none focus:border-[#2563eb] transition-colors" 
          />
          <button onClick={handleSend} className="btn-editorial text-sm">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
