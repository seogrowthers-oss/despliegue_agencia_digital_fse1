
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Bot, Search, Newspaper, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const resourcesStructure = [
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web',
    description: 'Plantillas, snippets y guías para crear aplicaciones web escalables de alto rendimiento.',
    icon: Code,
    path: '/recursos/desarrollo-web',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    color: 'from-blue-600/20 to-blue-900/20',
    borderColor: 'group-hover:border-blue-500'
  },
  {
    id: 'aplicaciones-ia',
    title: 'Aplicaciones e IA',
    description: 'Aprende a integrar modelos de inteligencia artificial y automatizar procesos con IA.',
    icon: Bot,
    path: '/recursos/inteligencia-artificial',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    color: 'from-purple-600/20 to-purple-900/20',
    borderColor: 'group-hover:border-purple-500'
  },
  {
    id: 'seo-growth',
    title: 'SEO & Posicionamiento',
    description: 'Checklists de SEO técnico, marketing digital y analítica avanzada para negocios.',
    icon: Search,
    path: '/recursos/seo',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    color: 'from-emerald-600/20 to-emerald-900/20',
    borderColor: 'group-hover:border-emerald-500'
  }
];

const Resources: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Aprende y Crece</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 italic uppercase">Arsenal de Recursos</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Accede a nuestra biblioteca de herramientas, plantillas y guías paso a paso para escalar tu presencia digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesStructure.map((res, index) => {
            const Icon = res.icon;
            return (
              <Link to={res.path} key={res.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group bg-[#111726]/80 backdrop-blur-md border border-[#222] rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${res.borderColor} cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.15)] flex flex-col h-full`}
                >
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <img src={res.imageUrl} alt={res.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`flex-1 p-8 bg-gradient-to-b ${res.color} border-t border-[#222]`}>
                    <h2 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{res.title}</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                      {res.description}
                    </p>
                    <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
                      <span className="bg-white/5 py-2 px-4 rounded-full border border-white/10 flex items-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                        Explorar <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 md:p-12 border border-[#222] bg-[#0a0f1a] rounded-3xl text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <Newspaper className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4">¿Buscas artículos y tutoriales?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            En nuestra sección de noticias publicamos regularmente trucos, análisis de SEO y novedades sobre desarrollo y marketing digital.
          </p>
          <Link to="/news" className="inline-flex bg-blue-600 font-bold uppercase tracking-widest py-4 px-10 rounded-xl text-white hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Ir a Noticias
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
