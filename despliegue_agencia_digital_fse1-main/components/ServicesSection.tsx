
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-[#222] relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="w-2 h-2 bg-[#2563eb] rounded-full animate-pulse"></span>
              <span className="text-[#2563eb] text-[10px] font-black uppercase tracking-widest">
                Ecosistema de Soluciones
              </span>
            </div>
            
            <h2 className="heading-editorial text-white text-4xl md:text-6xl mb-6">
              Nuestros Servicios
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
              Arquitectura digital de alto impacto. Desde el <strong>desarrollo de plataformas web inmersivas</strong> hasta la ejecución de <strong>campañas de marketing de performance</strong> y la <strong>automatización de procesos con IA</strong>. Transformamos complejidad técnica en crecimiento exponencial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/services" 
                className="btn-editorial inline-flex items-center justify-center text-sm px-8 py-4 bg-[#2563eb] hover:bg-white hover:text-[#2563eb] transition-all"
              >
                Explorar Soluciones <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                to="/contacto" 
                className="btn-editorial inline-flex items-center justify-center text-sm px-8 py-4 bg-transparent border border-[#333] text-white hover:border-white transition-all"
              >
                Contactar a un experto
              </Link>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative group perspective-1000">
            <div className="relative rounded-sm overflow-hidden border border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-gpu transition-all duration-700 group-hover:rotate-y-2 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" 
                alt="Servicios Digitales" 
                className="w-full h-full object-cover aspect-[4/3] md:aspect-square lg:aspect-[4/5] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              {/* Overlay Accents */}
              <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur border border-[#333] p-4 flex items-center space-x-4">
                 <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] border-2 border-black"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-black"></div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-black"></div>
                 </div>
                 <div className="text-white text-[10px] font-black uppercase tracking-widest leading-none">
                   Web • Mkt • IA
                 </div>
              </div>
            </div>
            {/* Ambient shadow */}
            <div className="absolute -inset-4 bg-[#2563eb]/20 blur-3xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
