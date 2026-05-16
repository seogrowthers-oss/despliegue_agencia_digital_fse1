
import React, { useEffect } from 'react';

const Showcase: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16 md:mb-24 text-center">
           <h1 className="heading-editorial text-white text-3xl md:text-7xl mb-6 italic uppercase leading-none">Nuestros <br/><span className="text-[#2563eb]">Desarrollos</span></h1>
           <div className="w-20 h-1 bg-[#2563eb] mx-auto mb-8"></div>
           <p className="text-slate-500 text-sm md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
             No vendemos código, vendemos <span className="text-white font-bold">ventaja competitiva</span>. Mira cómo transformamos bytes en resultados medibles.
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="card-editorial group relative overflow-hidden">
               <div className="aspect-video bg-[#1a1a1a] overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
               </div>
               <div className="p-6 md:p-8">
                  <p className="text-[#2563eb] text-[10px] font-black uppercase mb-2 tracking-[0.2em]">SaaS / AUTOMATION</p>
                  <h3 className="text-xl md:text-3xl font-black text-white italic uppercase mb-4">ContentAI Engine v2</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">Pipeline de generación masiva optimizado para buscadores de próxima generación.</p>
                  <button className="btn-editorial text-[10px] w-full md:w-auto">Ver Case Study</button>
               </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Showcase;
