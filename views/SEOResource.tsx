import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, LayoutDashboard, Target, BarChart2, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';

const seoResources = [
  { icon: Search, title: 'Auditorías Técnicas', text: 'Cheklists de rendimiento, indexabilidad, estructura de URLs y optimización On-Page básica.' },
  { icon: PenTool, title: 'Estrategia de Contenido', text: 'Plantillas de investigación de palabras clave, briefs para redactores y calendarios editoriales.' },
  { icon: Target, title: 'SEO Local & GMB', text: 'Guías para dominar los resultados locales de Google y optimizar perfiles empresariales.' },
  { icon: BarChart2, title: 'Analítica', text: 'Configuraciones de Google Tag Manager, GA4, y Looker Studio para tomar decisiones basadas en datos.' }
];

const SEOResource: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30">
      <WhatsAppButton />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #10b981 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <header className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Domina los Resultados</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                SEO & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Growth</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Accede a nuestras metodologías comprobadas para captar tráfico orgánico de calidad, mejorar conversiones y escalar métricas clave.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Categories */}
        <section className="py-20 bg-[#0a0e1a]/80 border-y border-[#1a2235]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Herramientas de Crecimiento</h2>
              <p className="text-slate-400">Documentos y tutoriales para mejorar tu posicionamiento</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {seoResources.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-[#111726] border border-[#222] p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-emerald-600/20 text-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

        {/* SEO Info */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">Convierte clics en ventas</h2>
                <p className="text-slate-400 text-lg mb-8">
                  El SEO no trata solo de atraer usuarios, sino de convertirlos. Nuestra biblioteca refleja cómo integramos UI/UX con palabras clave transaccionales.
                </p>
                <div className="space-y-4">
                  {[
                    'Estrategia de Link Building para 2026',
                    'Cómo indexar contenido generado por IA correctamente',
                    'A/B Testing en e-commerce y servicios',
                    'Dashboards de reporte automatizado'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-slate-300 bg-[#111726] border border-[#222] rounded-xl p-4">
                      <TrendingUp className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#222] shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="Analítica" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 mb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-emerald-900/40 to-[#0a0e1a] border border-emerald-500/30 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">¿Quieres escalar tu tráfico web orgánico?</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Implementamos campañas SEO y Growth a medida para asegurar que tus clientes te encuentren en el momento adecuado.
              </p>
              <Link to="/contacto" className="inline-flex items-center bg-emerald-600 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                Consulta Comercial <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SEOResource;
