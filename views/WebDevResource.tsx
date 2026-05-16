import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Server, Smartphone, MonitorPlay, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';

const devResources = [
  { icon: Code, title: 'Plantillas React & Vite', text: 'Starkers y plantillas optimizadas para iniciar proyectos web rápidamente con las mejores prácticas.' },
  { icon: Server, title: 'Snippets Backend', text: 'Configuraciones de Node.js, Express y bases de datos para escalar tus aplicaciones seguras.' },
  { icon: Smartphone, title: 'Guías de UI/UX', text: 'Principios de diseño, componentes Tailwind y sistemas de diseño para interfaces modernas.' },
  { icon: MonitorPlay, title: 'Optimización Web', text: 'Herramientas y check-lists para lograr 100/100 en Lighthouse y mejorar los Core Web Vitals.' }
];

const WebDevResource: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30">
      <WhatsAppButton />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <header className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Código y Arquitectura</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                Recursos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Desarrollo Web</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Accede a nuestro repositorio de recursos técnicos para construir productos digitales más rápidos y escalables.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Categories */}
        <section className="py-20 bg-[#0a0e1a]/80 border-y border-[#1a2235]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-4">¿Qué encontrarás aquí?</h2>
              <p className="text-slate-400">Material diseñado por developers para developers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {devResources.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-[#111726] border border-[#222] p-8 rounded-2xl hover:border-blue-500/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

        {/* Free Downloads preview */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">Guías y Checklists Gratuitas</h2>
                <p className="text-slate-400 text-lg mb-8">
                  Ponte al día con las últimas prácticas en frontend y backend. Hemos documentado los procesos que usamos internamente para crear nuestras plataformas.
                </p>
                <div className="space-y-4">
                  {[
                    'The Ultimate React Performance Guide',
                    'Tailwind Component Library (Figma & Code)',
                    'Guía de Seguridad en Node.js',
                    'Vite Configuration Boilerplate'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#111726] border border-[#222] rounded-xl hover:border-blue-500/30 transition-colors">
                      <div className="flex items-center text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                      <button className="text-blue-500 hover:text-blue-400 p-2"><Download className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#222] shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Code preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 mb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-blue-900/40 to-[#0a0e1a] border border-blue-500/30 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">¿Necesitas ayuda con tu proyecto técnico?</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Nuestro equipo de desarrollo puede ayudarte a escalar la arquitectura de tu aplicación u optimizar el rendimiento.
              </p>
              <Link to="/contacto" className="inline-flex items-center bg-blue-600 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Consulta con un Experto <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebDevResource;
