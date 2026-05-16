
import React, { useEffect } from 'react';
import Logo from '../components/Logo';

const COURSES = [
  {
    id: 'c1',
    title: 'AI Engineering & LLM Ops',
    instructor: 'Alex Rivero',
    duration: '12 Semanas',
    level: 'Avanzado',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    tags: ['PyTorch', 'FastAPI', 'RAG']
  },
  {
    id: 'c2',
    title: 'SEO Técnico Radical',
    instructor: 'Oscar Growth',
    duration: '8 Semanas',
    level: 'Intermedio',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: ['Core Vitals', 'JS Rendering', 'Indexing']
  },
  {
    id: 'c3',
    title: 'Growth Hacking Programático',
    instructor: 'Elena Dev',
    duration: '10 Semanas',
    level: 'Experto',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800&auto=format&fit=crop',
    tags: ['Automation', 'Scraping', 'Data Analysis']
  }
];

const ROADMAPS = [
  { title: 'Frontend Growth Engineer', icon: '🎨', steps: ['React 19', 'Next.js SEO', 'Web Performance', 'AI Components'] },
  { title: 'AI Solutions Architect', icon: '🧠', steps: ['Python Master', 'LLM Architectures', 'Vector DBs', 'Ops & Deployment'] }
];

const Academy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    (window as any).createRipple?.(e);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <section className="text-center mb-24 relative">
        <div className="absolute inset-0 hero-glow -z-10 opacity-40 blur-3xl"></div>
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] uppercase italic">
          Domina la <br />
          <span className="text-blue-600">Frontera Técnica</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium">
          Enseñamos lo que las agencias ocultan. Bootcamps intensivos de alto rendimiento para desarrolladores que quieren hackear el crecimiento digital.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button onClick={handleRipple} className="ripple-container bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-12 rounded-sm shadow-2xl transition-all uppercase tracking-widest">
            Ver Programas Abiertos
          </button>
          <button onClick={handleRipple} className="ripple-container bg-[#1a1a1a] border border-blue-600/30 text-white font-black py-4 px-12 rounded-sm transition-all uppercase tracking-widest hover:bg-[#252525]">
            Plan de Membresía
          </button>
        </div>
      </section>

      <section className="mb-32">
        <div className="flex items-center space-x-3 mb-12">
           <div className="w-2 h-8 bg-blue-600 rounded-sm"></div>
           <h2 className="text-3xl font-black text-white tracking-tight uppercase">Cursos Destacados</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.map((course, idx) => (
            <div key={course.id} className="group bg-[#121212] border border-[#222] hover:border-blue-600 transition-all duration-500">
              <div className="h-48 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4">
                  <span className="bg-blue-600 text-white text-lg font-black px-4 py-1 rounded-sm shadow-lg">
                    {course.price}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2">{course.duration} • Por {course.instructor}</p>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-600 transition-colors leading-tight italic">{course.title}</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black text-slate-500 bg-black px-2 py-1 uppercase border border-[#222]">#{tag}</span>
                  ))}
                </div>
                <button onClick={handleRipple} className="ripple-container w-full bg-white text-black font-black py-3 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  Reservar Plaza
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-32">
        <div className="bg-[#121212] border-2 border-dashed border-[#222] p-12 relative rounded-sm">
          <div className="absolute -top-4 left-12 px-8 py-1 bg-black border-x-2 border-blue-600">
             <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em]">Blueprints & Roadmaps</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {ROADMAPS.map((road, i) => (
              <div key={i} className="space-y-8">
                <h3 className="text-2xl font-black text-white italic underline decoration-blue-600 decoration-4 underline-offset-8">{road.title}</h3>
                <div className="space-y-4">
                  {road.steps.map((step, si) => (
                    <div key={si} className="flex items-center space-x-6 group">
                      <div className="w-10 h-10 bg-black border border-blue-600 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {si + 1}
                      </div>
                      <p className="text-lg text-slate-400 group-hover:text-white transition-colors font-medium tracking-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;
