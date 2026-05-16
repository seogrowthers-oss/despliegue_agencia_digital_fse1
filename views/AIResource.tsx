import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Cpu, Network, Zap, CheckCircle2, ChevronRight, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';

const aiResources = [
  { icon: Bot, title: 'Prompt Engineering', text: 'Librerías de prompts avanzados para optimizar flujos de atención al cliente y creación de contenido.' },
  { icon: Cpu, title: 'Integración LLM', text: 'Tutoriales sobre cómo conectar OpenAI, Anthropic o Gemini en aplicaciones web y bases de datos.' },
  { icon: Network, title: 'Automatización', text: 'Scripts y flujos en Make/Zapier para conectar herramientas de marketing con flujos de IA.' },
  { icon: Zap, title: 'Casos de Uso AI', text: 'Documentación sobre agentes autónomos, análisis predictivo y clasificación de datos empresariales.' }
];

const AIResource: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-purple-500/30">
      <WhatsAppButton />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #9333ea 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <header className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center bg-purple-600/10 border border-purple-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Automatiza tu Negocio</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                Inteligencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Artificial</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Descubre cómo las últimas herramientas de IA pueden potenciar tu producto, reducir costos operativos y escalar tus flujos de trabajo.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Categories */}
        <section className="py-20 bg-[#0a0e1a]/80 border-y border-[#1a2235]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Soluciones e Insights</h2>
              <p className="text-slate-400">Implementa la IA de manera práctica y segura</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiResources.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-[#111726] border border-[#222] p-8 rounded-2xl hover:border-purple-500/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-purple-600/20 text-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Guides */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#222] shadow-[0_0_50px_rgba(147,51,234,0.2)]">
                  <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" alt="AI representation" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">El Futuro es Ahora</h2>
                <p className="text-slate-400 text-lg mb-8">
                  La barrera de entrada para implementar herramientas de aprendizaje automático y LLMs nunca ha sido tan baja. Accede a nuestra biblioteca para empezar.
                </p>
                <div className="space-y-4">
                  {[
                    'Estrategias de RAG para Bases de Datos',
                    'Prompt Library para Marketing y Ventas',
                    'Cómo construir Chatbots que sí convierten',
                    'Análisis de Sentimiento de Clientes'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-slate-300">
                      <TerminalSquare className="w-5 h-5 text-purple-500 mr-3 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 inline-block">
                   <button className="text-sm uppercase tracking-widest font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                     Ver todos los artículos <ChevronRight className="w-4 h-4 ml-1" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 mb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-purple-900/40 to-[#0a0e1a] border border-purple-500/30 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">¿Quieres automatizar los procesos de tu empresa?</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Diseñamos e implementamos arquitecturas basadas en Inteligencia Artificial adaptadas a tu modelo de negocio digital.
              </p>
              <Link to="/contacto" className="inline-flex items-center bg-purple-600 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                Empezar Proyecto AI <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIResource;
