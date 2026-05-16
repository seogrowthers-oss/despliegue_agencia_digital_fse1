
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (window as any).createRipple?.(e);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section style README */}
      <header className="mb-16 border-b border-slate-800 pb-12">
        <div className="flex items-center space-x-4 mb-6">
          <Logo size="lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">SEOGrowthers</h1>
            <p className="text-blue-400 font-mono text-sm">v2.4.0-stable | Open Knowledge Hub</p>
          </div>
        </div>
        <p className="text-2xl text-slate-300 leading-relaxed max-w-3xl">
          Estamos construyendo el puente entre la ingeniería de software y la visibilidad digital masiva.
        </p>
      </header>

      {/* Grid de Misión y Visión */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="md:col-span-2 p-8 bg-[#161b22] border border-[#30363d] rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">#</span> Nuestra Misión
          </h2>
          <p className="text-slate-400 leading-relaxed">
            En un mundo saturado de contenido sintético, SEOGrowthers nace para dotar a desarrolladores y estrategas de las herramientas técnicas necesarias para destacar. No solo hablamos de SEO; hablamos de <span className="text-slate-200 font-semibold">Arquitectura de Visibilidad</span>, <span className="text-slate-200 font-semibold">IA Aplicada</span> y <span className="text-slate-200 font-semibold">Performance Web</span>.
          </p>
        </div>
        <div className="p-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-indigo-500 mr-2">#</span> El Enfoque
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Creemos que el mejor SEO se escribe con código. Optimizamos para humanos, pero estructuramos para algoritmos.
          </p>
        </div>
      </section>

      {/* Core Values / Tech Stack */}
      <section className="mb-20">
        <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-10 text-center font-bold">Nuestro Stack de Conocimiento</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'IA Generativa', desc: 'LLMs & Prompt Engineering', icon: '🤖' },
            { name: 'SEO Técnico', desc: 'Core Web Vitals & Indexing', icon: '🚀' },
            { name: 'Data Science', desc: 'Análisis de tendencias', icon: '📊' },
            { name: 'Full-Stack Dev', desc: 'Next.js, Go, Rust', icon: '💻' }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-[#0d1117] border border-[#30363d] rounded-xl hover:border-blue-500/50 transition-colors group">
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / Community */}
      <section className="mb-20 py-12 border-y border-slate-800">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-6">Impulsado por la comunidad</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              SEOGrowthers no es solo un equipo editorial; es un ecosistema. Colaboramos con ingenieros de datos, especialistas en machine learning y growth hackers de todo el mundo para traer insights que no encontrarás en ningún otro blog de marketing.
            </p>
            <div className="flex space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(n => (
                  <img key={n} src={`https://i.pravatar.cc/150?u=${n}`} className="w-8 h-8 rounded-full border-2 border-[#0d1117]" alt="Contributor" />
                ))}
              </div>
              <span className="text-sm text-slate-500 flex items-center">+1,200 colaboradores activos</span>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-4">
             <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d] text-center">
                <div className="text-2xl font-bold text-blue-400">500k+</div>
                <div className="text-[10px] text-slate-500 uppercase">Lectores mensuales</div>
             </div>
             <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d] text-center">
                <div className="text-2xl font-bold text-emerald-400">85%</div>
                <div className="text-[10px] text-slate-500 uppercase">Perfiles técnicos</div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center bg-blue-600 rounded-3xl p-12 shadow-2xl shadow-blue-500/10">
        <h2 className="text-3xl font-bold text-white mb-4">¿Listo para escalar tu proyecto?</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">Únete a nuestra newsletter técnica o chatea con nuestro asistente de crecimiento ahora mismo.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/ask-ai" 
            onClick={handleRipple}
            className="ripple-container bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Hablar con la IA
          </Link>
          <button 
            className="bg-blue-700 text-white font-bold py-3 px-8 rounded-full border border-blue-400/30 hover:bg-blue-800 transition-colors"
          >
            Suscribirse
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
