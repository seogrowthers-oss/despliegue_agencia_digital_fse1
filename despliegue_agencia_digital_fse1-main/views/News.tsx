
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { ALL_NEWS } from '../constants/newsData';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { NewsItem } from '../types';

const NEWS_PER_PAGE = 6;

// Componente reutilizable para bloques con estilo Blueprint/Dashed
const BlueprintBlock: React.FC<{ 
  title: string, 
  borderColor: string, 
  titleColor: string, 
  children: React.ReactNode,
  className?: string,
  icon?: React.ReactNode
}> = ({ title, borderColor, titleColor, children, className = "", icon }) => (
  <section className={`relative animate-fade-in mb-16 ${className}`}>
    <div className={`border-2 border-dashed ${borderColor} rounded-[2.5rem] p-8 md:p-12 pt-16 relative bg-[#161b22]/5 backdrop-blur-sm shadow-2xl`}>
      <div className={`absolute -top-4 left-10 px-6 py-1.5 bg-[#0d1117] border-x-2 ${borderColor} flex items-center space-x-3`}>
        {icon || <div className={`w-2 h-2 ${titleColor.replace('text-', 'bg-')} rounded-sm rotate-45`}></div>}
        <h2 className={`text-xs font-black ${titleColor} uppercase tracking-[0.3em]`}>{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const NewsSkeleton = () => (
  <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden h-full flex flex-col animate-pulse">
    <div className="h-52 bg-[#161b22]" />
    <div className="p-6 space-y-4 flex-grow">
      <div className="h-4 w-1/4 bg-[#161b22] rounded" />
      <div className="h-6 w-3/4 bg-[#161b22] rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#161b22] rounded" />
        <div className="h-3 w-5/6 bg-[#161b22] rounded" />
      </div>
    </div>
  </div>
);

const News: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [firestoreNews, setFirestoreNews] = useState<NewsItem[]>([]);
  const searchQuery = searchParams.get('q') || '';

  const categories = [
    { id: 'All', label: 'Todo el Archivo', slug: null, description: 'Explora nuestra colección completa de artículos sobre tecnología y crecimiento.' },
    { id: 'Shock', label: 'Shock Digital', slug: 'shock-digital', description: 'Noticias críticas y eventos disruptivos que están cambiando el paradigma digital.' },
    { id: 'AI', label: 'Inteligencia Artificial', slug: 'ai', description: 'Últimos avances en LLMs, agentes autónomos y machine learning aplicado.' },
    { id: 'Dev', label: 'Desarrollo & Código', slug: 'dev', description: 'Recursos técnicos, frameworks y mejores prácticas para ingenieros de software.' },
    { id: 'Tech', label: 'Tecnología General', slug: 'tech', description: 'Tendencias globales, gadgets y el futuro del ecosistema tech.' },
    { id: 'Hardware', label: 'Hardware & Chips', slug: 'hardware', description: 'Novedades en semiconductores, infraestructura y potencia de cómputo.' }
  ];

  const currentCategoryInfo = useMemo(() => {
    if (!categorySlug) return categories[0];
    return categories.find(c => c.slug === categorySlug) || categories[0];
  }, [categorySlug]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);

    const newsCollection = collection(db, 'news');
    let q = query(newsCollection);
    
    // Si queremos filtrar por categoría en el servidor:
    // if (currentCategoryInfo.id !== 'All') {
    //   q = query(newsCollection, where('category', '==', currentCategoryInfo.id));
    // }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setFirestoreNews(newsData);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'news');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [categorySlug]);

  // Combine firestore news with static news (avoiding duplicates by ID)
  const allNewsCombined = useMemo(() => {
    const combined = [...firestoreNews];
    const firestoreIds = new Set(firestoreNews.map(n => n.id));
    
    ALL_NEWS.forEach(staticNews => {
      if (!firestoreIds.has(staticNews.id)) {
        combined.push(staticNews);
      }
    });
    
    return combined;
  }, [firestoreNews]);

  // Filtrado principal
  const filteredNews = useMemo(() => {
    let baseNews = currentCategoryInfo.id === 'All'
      ? allNewsCombined.filter(n => n.category !== 'Shock')
      : allNewsCombined.filter(n => n.category === currentCategoryInfo.id);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      baseNews = baseNews.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.excerpt.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q)
      );
    }
    
    return baseNews;
  }, [currentCategoryInfo, searchQuery, allNewsCombined]);

  // Paginación
  const totalPages = Math.ceil(filteredNews.length / NEWS_PER_PAGE);
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * NEWS_PER_PAGE;
    return filteredNews.slice(start, start + NEWS_PER_PAGE);
  }, [filteredNews, currentPage]);

  // Noticias de Alerta (Shock Digital) que se repiten globalmente
  const globalShockAlerts = useMemo(() => {
    return allNewsCombined.filter(n => n.category === 'Shock').slice(0, 2);
  }, [allNewsCombined]);

  const handleCategoryClick = (slug: string | null) => {
    const q = searchParams.get('q');
    const searchString = q ? `?q=${q}` : '';
    if (slug) navigate(`/news/category/${slug}${searchString}`);
    else navigate(`/news${searchString}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Dinámico */}
      <header className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-1 w-10 bg-blue-600 rounded-full"></span>
              <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-[0.4em]">Sección de Noticias</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
              {searchQuery ? `Resultados: "${searchQuery}"` : currentCategoryInfo.label}
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed">
              {searchQuery 
                ? `Mostrando ${filteredNews.length} resultados encontrados en ${currentCategoryInfo.label.toLowerCase()}.`
                : currentCategoryInfo.description
              }
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-2 bg-[#161b22]/50 p-2 rounded-2xl border border-[#30363d] backdrop-blur-sm">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                  currentCategoryInfo.id === cat.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-500 hover:text-white hover:bg-[#1c2128]'
                }`}
              >
                {cat.id === 'All' ? 'Ver Todo' : cat.id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* BLOQUE GLOBAL: ALERTA SHOCK DIGITAL (Persistente) */}
      {!searchQuery && (
        <BlueprintBlock 
          title="ALERTA: SHOCK DIGITAL" 
          borderColor="border-blue-500/40" 
          titleColor="text-blue-500"
          icon={
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {globalShockAlerts.map(news => (
              <div key={news.id} className="hover:scale-[1.01] transition-transform duration-300">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </BlueprintBlock>
      )}

      {/* BLOQUE DINÁMICO: ARTÍCULOS PUBLICADOS */}
      <BlueprintBlock 
        title={searchQuery ? 'RESULTADOS DE BÚSQUEDA' : `ARCHIVO: ${currentCategoryInfo.label.toUpperCase()}`} 
        borderColor="border-slate-700/50" 
        titleColor="text-slate-400"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
          ) : (
            paginatedNews.map(news => (
              <div key={news.id} className="h-full">
                <NewsCard news={news} />
              </div>
            ))
          )}
        </div>

        {!isLoading && filteredNews.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-500 text-lg font-medium italic">
              No se encontraron artículos {searchQuery ? `que coincidan con "${searchQuery}"` : 'disponibles'} en esta categoría.
            </p>
            <button 
              onClick={() => navigate('/news')} 
              className="mt-6 text-blue-500 hover:text-blue-400 font-bold transition-colors"
            >
              Ver archivo principal
            </button>
          </div>
        )}
      </BlueprintBlock>
      
      {/* PAGINACIÓN */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col items-center justify-center space-y-6 mt-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[#161b22] border border-[#30363d] text-slate-500 hover:text-white disabled:opacity-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg'
                      : 'bg-[#0d1117] text-slate-500 border border-[#30363d] hover:border-slate-500'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[#161b22] border border-[#30363d] text-slate-500 hover:text-white disabled:opacity-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
