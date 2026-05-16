import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_NEWS } from '../constants/newsData';
import ServicesSection from '../components/ServicesSection';

const CAROUSEL_ITEMS = [
  ...ALL_NEWS.filter(n => n.category !== 'Shock').slice(0, 1).map(n => ({
    id: n.id,
    title: n.title,
    category: 'Destacado',
    imageUrl: n.imageUrl,
    link: `/news/${n.id}`
  })),
  {
    id: 'case-ecommerce',
    title: 'Caso de Éxito: EDV Remolques - SEO & CRO',
    category: 'Casos de Éxito',
    imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop',
    link: '/casos-de-exito/edvremolques'
  },
  {
    id: 'case-aluvalle',
    title: 'Caso de Éxito: Aluvalle - Catálogo & Portal Técnico',
    category: 'Casos de Éxito',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    link: '/casos-de-exito/aluvalle'
  },
  {
    id: 'plantillas-web',
    title: 'Plantillas React & Vite Gratuitas para Developers',
    category: 'Desarrollo Web',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    link: '/recursos/desarrollo-web'
  }
];

const Home: React.FC = () => {
  const latest = useMemo(() => ALL_NEWS.filter(n => n.category !== 'Shock').slice(1, 7), []);
  const analysisItems = useMemo(() => ALL_NEWS.slice(0, 4), []);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Featured Carousel */}
      <section className="relative h-[250px] md:h-[550px] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
           <Link to={CAROUSEL_ITEMS[currentIndex].link} className="block h-full w-full">
            <img 
              src={CAROUSEL_ITEMS[currentIndex].imageUrl} 
              alt={CAROUSEL_ITEMS[currentIndex].title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 img-overlay"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
               <div className="flex items-center space-x-2 mb-2 md:mb-4">
                 <span className="bg-[#2563eb] text-white text-[8px] md:text-[10px] font-black uppercase px-2 py-0.5">{CAROUSEL_ITEMS[currentIndex].category}</span>
               </div>
               <h2 className="text-xl md:text-5xl font-black text-white leading-[1] mb-2 uppercase italic tracking-tighter">
                 {CAROUSEL_ITEMS[currentIndex].title}
               </h2>
            </div>
           </Link>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-12 flex space-x-2 z-10">
          {CAROUSEL_ITEMS.map((_, idx) => (
             <button 
               key={idx}
               onClick={() => setCurrentIndex(idx)}
               className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-white/50'}`}
             />
          ))}
        </div>
      </section>

      {/* Mobile-Friendly Trending Bar */}
      <div className="bg-[#0a0a0a] py-3 md:py-4 border-y border-[#222] mb-8 md:mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-4 md:space-x-8">
           <span className="text-[#2563eb] text-[10px] font-black uppercase flex items-center shrink-0">
             🔥 TRENDING:
           </span>
           <div className="flex space-x-6 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {['GPT-5', 'Next.js 15', 'AI SEO', 'Rust', 'Vercel'].map(tag => (
                <button key={tag} className="hover:text-white transition-colors">{tag}</button>
              ))}
           </div>
        </div>
      </div>

      <ServicesSection />

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-24">
        {/* News Column */}
        <main className="lg:col-span-8 bg-white p-4 md:p-10 rounded-sm">
           <h2 className="heading-editorial text-black text-2xl md:text-4xl mb-8 md:mb-12 border-l-4 border-[#2563eb] pl-4">Lo Último</h2>
           <div className="grid grid-cols-1 gap-8 md:gap-12">
              {latest.map(news => (
                <div key={news.id} className="flex flex-col sm:flex-row gap-4 md:gap-8 group cursor-pointer border-b border-slate-100 pb-8 md:pb-12 last:border-0">
                   <div className="sm:w-1/3 aspect-video overflow-hidden rounded-sm relative shrink-0">
                      <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                   </div>
                   <div className="sm:w-2/3">
                      <p className="text-[#2563eb] text-[10px] font-black uppercase mb-1 tracking-widest">{news.category}</p>
                      <h3 className="text-lg md:text-2xl font-black text-black leading-tight mb-2 md:mb-4 group-hover:text-[#2563eb] transition-colors uppercase italic tracking-tighter">{news.title}</h3>
                      <p className="text-slate-600 text-xs md:text-sm line-clamp-2 leading-relaxed">{news.excerpt}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <Link to="/news" className="btn-editorial w-full mt-8 md:mt-12 text-sm">
             Ver todo el archivo
           </Link>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
           <div>
              <h2 className="heading-editorial text-white text-xl md:text-2xl mb-6 flex items-center">
                <span className="w-2 h-6 bg-[#2563eb] mr-3"></span>
                Análisis
              </h2>
              <div className="space-y-4 bg-[#121212] p-4 md:p-6 border border-[#222]">
                 {analysisItems.map(item => (
                   <Link key={item.id} to={`/news/${item.id}`} className="flex gap-4 items-center group">
                      <div className="w-16 h-16 bg-[#1a1a1a] shrink-0 relative border border-[#333]">
                         <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                         <div className="absolute bottom-0 right-0 bg-[#2563eb] text-white text-[8px] font-black px-1">9.5</div>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#2563eb] transition-colors line-clamp-2 leading-tight">{item.title}</h4>
                   </Link>
                 ))}
              </div>
           </div>

           <div className="bg-[#2563eb] p-6 md:p-8 rounded-sm">
              <h3 className="text-xl md:text-2xl font-black text-white italic mb-2 uppercase tracking-tighter leading-none">Únete a la Élite</h3>
              <p className="text-white/80 text-xs mb-6 font-medium">Recibe tácticas de ingeniería SEO cada semana en tu inbox.</p>
              <form className="space-y-3">
                 <input type="email" placeholder="Email..." className="w-full bg-black/20 border border-white/20 p-3 text-white placeholder-white/50 text-sm outline-none" />
                 <button className="w-full bg-white text-[#2563eb] font-black py-3 uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">Subscribir</button>
              </form>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
