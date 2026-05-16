import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Server, Globe2, Briefcase, CheckCircle2, ShieldCheck, PenTool, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';

const CorporateSite: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30">
      <WhatsAppButton />
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-24 space-y-32">
        
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
            <Link to="/desarrollo-web" className="hover:text-white transition-colors">Desarrollo Web</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-500">Sitio Corporativo</span>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Presencia Institucional</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
            Sitio Corporativo
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12">
            La oficina digital de tu empresa. Transmití solidez, autoridad y confianza con una plataforma web completa, diseñada para destacar frente a tu competencia y generar credibilidad a largo plazo.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#precios" className="bg-white text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded hover:bg-slate-200 transition-colors">
              Ver Precios
            </a>
          </div>
        </section>

        {/* Benefits & "Why" */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Autoridad en tu sector</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Tener solo redes sociales ya no es suficiente. Un sitio web corporativo te permite ser el dueño de tu audiencia y de tu imagen. Nos enfocamos en estructurar la información (Servicios, Nosotros, Casos de éxito) de manera clara y profesional para posicionarte como líder.
            </p>
            <ul className="space-y-4">
              {[
                'Imagen profesional y corporativa 24/7',
                'Estructura Multipage con Blog y Novedades',
                'SEO Técnico optimizado para Google',
                'Integración de panel administrable (CMS)'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] md:aspect-square bg-[#0a0e1a] border border-[#1a2235] rounded-3xl overflow-hidden p-8 flex flex-col items-center justify-center relative group">
               <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors" />
               <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" alt="Corporate Website" className="w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </section>

        {/* What's included / Tech */}
        <section className="bg-[#0a0e1a] border border-[#1a2235] rounded-3xl p-8 md:p-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Lo que incluye el servicio</h2>
            <p className="text-slate-400 text-lg">Mucho más que una simple presentación visual.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-[#111726] p-4 rounded-xl inline-block mb-2">
                <Globe2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Multipage & Estructura</h3>
              <p className="text-slate-400 text-sm">Creación de múltiples páginas (Home, Nosotros, Servicios, Contacto, Blog) con navegación intuitiva y migas de pan.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#111726] p-4 rounded-xl inline-block mb-2">
                <LayoutDashboard className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Panel Administrable CMS</h3>
              <p className="text-slate-400 text-sm">Desarrollo con headless CMS o plataformas sólidas que te permiten autogestionar noticias, equipo o portfolio.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#111726] p-4 rounded-xl inline-block mb-2">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Seguridad & Rendimiento</h3>
              <p className="text-slate-400 text-sm">Certificado SSL, protección contra ataques, copias de seguridad automáticas y servidor optimizado para alto tráfico.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="precios">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Estructura de Precios</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Desde soluciones corporativas estandarizadas hasta desarrollos institucionales a medida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Economico */}
            <div className="bg-[#0b0f1a] border border-[#1a2235] p-8 rounded-2xl flex flex-col">
              <h3 className="text-2xl font-black text-white mb-2">Corporate Base</h3>
              <p className="text-slate-400 text-sm mb-6">El punto de partida ideal para Pymes y Estudios.</p>
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-500 mr-1">Desde</span>
                <span className="text-4xl font-black text-white">USD $600</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Hasta 5 secciones/páginas</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Diseño Base Personalizado</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Formulario de contacto y mapas</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> SEO On-Page básico</li>
              </ul>
              <Link to="/contacto" className="w-full py-3 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors text-center inline-block">
                Consultar
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-[#0d1222] border border-blue-500/30 p-8 rounded-2xl flex flex-col relative shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Corporate Elite</h3>
              <p className="text-slate-400 text-sm mb-6">Una plataforma institucional completa y escalable.</p>
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-500 mr-1">Hasta</span>
                <span className="text-4xl font-black text-white">USD $1,500</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Diseño a medida sin límite de secciones</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Panel CMS (Blog / Novedades autogestionable)</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Schema Markup y SEO Técnico robusto</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Idiomas múltiples (opcional)</li>
                <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> Configuración de Google Analytics 4 avanzado</li>
              </ul>
              <Link to="/contacto" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors text-center inline-block">
                Solicitar Custom
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery/Examples */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Ejemplos Visuales</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#222]">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Ejemplo Corporativo 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#222]">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" alt="Ejemplo Corporativo 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default CorporateSite;
