
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ALL_NEWS } from '../constants/newsData';
import { NewsItem } from '../types';
import { marked } from 'marked';
import NewsCard from '../components/NewsCard';
import OptimizedImage from '../components/OptimizedImage';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { doc, onSnapshot, collection, query, where, limit } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

const NewsDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 w-32 bg-[#161b22] rounded mb-8" />
    <div className="flex space-x-2 mb-4">
      <div className="h-5 w-16 bg-[#161b22] rounded" />
      <div className="h-5 w-24 bg-[#161b22] rounded" />
    </div>
    <div className="h-12 w-full bg-[#161b22] rounded mb-6" />
    <div className="h-12 w-3/4 bg-[#161b22] rounded mb-8" />
    
    <div className="flex justify-between items-center pb-8 border-b border-slate-800 mb-8">
      <div className="flex space-x-3 items-center">
        <div className="w-10 h-10 rounded-full bg-[#161b22]" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-[#161b22] rounded" />
          <div className="h-3 w-32 bg-[#161b22] rounded" />
        </div>
      </div>
      <div className="h-10 w-28 bg-[#161b22] rounded-lg" />
    </div>

    <div className="h-96 w-full bg-[#161b22] rounded-2xl mb-12" />
    
    <div className="space-y-4">
      <div className="h-4 w-full bg-[#161b22] rounded" />
      <div className="h-4 w-full bg-[#161b22] rounded" />
      <div className="h-4 w-5/6 bg-[#161b22] rounded" />
      <div className="h-4 w-full bg-[#161b22] rounded" />
    </div>
  </div>
);

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useAuth();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);
  
  const [comments, setComments] = useState<Comment[]>([
    { id: 'c1', user: 'TechEnthusiast', text: 'Excelente análisis. Esto cambia por completo las reglas del juego. **NVIDIA** está en otro nivel.', date: 'Hace 2 horas' },
    { id: 'c2', user: 'DevMaster', text: 'Me preocupa la eficiencia térmica de estos nuevos chips, pero el rendimiento es innegable. Aquí hay un fragmento de lo que espero:\n\n`performance_gain = (new_core_count * clock_speed) / current_arch` \n\n¿Qué opinan?', date: 'Hace 5 horas' }
  ]);
  const [newComment, setNewComment] = useState('');

  const updateMetaTags = (item: NewsItem) => {
    const currentUrl = window.location.href;
    document.title = `${item.title} | SEOGrowthers`;

    const setMeta = (attr: string, value: string, content: string, property: boolean = false) => {
      let element = document.querySelector(`meta[${property ? 'property' : 'name'}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(property ? 'property' : 'name', value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', item.excerpt);
    const keywords = [item.category, 'Tecnología', 'Inteligencia Artificial', 'Programación', 'SEO Técnico', item.author, 'Growth Hacking'].join(', ');
    setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', item.title, true);
    setMeta('property', 'og:description', item.excerpt, true);
    setMeta('property', 'og:image', item.imageUrl, true);
    setMeta('property', 'og:url', currentUrl, true);
    setMeta('property', 'og:type', 'article', true);
    setMeta('name', 'twitter:card', 'summary_large_image');
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    
    // Check static news first (instant)
    const staticNewsFound = ALL_NEWS.find(n => n.id === id);
    if (staticNewsFound) {
      setNews(staticNewsFound);
      updateMetaTags(staticNewsFound);
      setIsLoading(false);
    }

    // Try finding in Firestore
    const newsDocRef = doc(db, 'news', id);
    const unsubscribe = onSnapshot(newsDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const found = { id: docSnap.id, ...docSnap.data() } as NewsItem;
        setNews(found);
        updateMetaTags(found);
        setIsLoading(false);
      } else if (!staticNewsFound) {
        setIsLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `news/${id}`);
      if (!staticNewsFound) setIsLoading(false);
    });

    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      document.title = 'SEOGrowthers | Tech, AI & Growth';
    };
  }, [id]);

  const relatedNews = useMemo(() => {
    if (!news) return [];
    return ALL_NEWS
      .filter(n => n.category === news.category && n.id !== news.id)
      .slice(0, 4);
  }, [news]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (!news) return;
    const shareData = { title: news.title, text: news.excerpt, url: window.location.href };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try { await navigator.share(shareData); } catch (err) { if (err instanceof Error && err.name !== 'AbortError') copyToClipboard(); }
    } else { copyToClipboard(); }
  };

  const openSocialShare = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    if (!news) return;
    const url = window.location.href;
    const title = news.title;
    let shareUrl = '';
    switch (platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=seogrowthers`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
      case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`; break;
    }
    window.open(shareUrl, 'share', `width=600,height=450,left=${(window.innerWidth / 2) - 300},top=${(window.innerHeight / 2) - 225}`);
  };

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleReadingMode = () => setIsReadingMode(!isReadingMode);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    setComments([{ id: Date.now().toString(), user: userData?.name || user.displayName || 'Usuario', text: newComment, date: 'Justo ahora' }, ...comments]);
    setNewComment('');
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><NewsDetailSkeleton /></div>;
  }

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Noticia no encontrada</h2>
        <Link to="/news" className="text-blue-400 hover:underline">Volver al archivo</Link>
      </div>
    );
  }

  // Reading Mode Layout
  if (isReadingMode) {
    return (
      <div className="fixed inset-0 z-[100] bg-[var(--bg-main)] overflow-y-auto animate-fade-in">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <button 
            onClick={toggleReadingMode}
            className="fixed top-8 right-8 p-3 rounded-full bg-[#161b22] border border-[#30363d] text-slate-400 hover:text-white transition-all shadow-xl z-10"
            title="Cerrar Modo Lectura"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <header className="mb-12">
             <div className="flex items-center space-x-2 mb-6">
                <span className="px-2 py-0.5 text-[10px] font-bold border rounded bg-blue-600/10 text-blue-400 border-blue-500/30 uppercase tracking-widest">{news.category}</span>
                <span className="text-slate-500 text-xs">{news.date} • {news.author}</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
               {news.title}
             </h1>
          </header>

          <article className="prose prose-lg prose-invert max-w-none">
            <div className="mb-10 rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl">
              <OptimizedImage src={news.imageUrl} alt={news.title} containerClassName="w-full h-full" className="w-full h-auto" />
            </div>
            <p className="text-2xl text-white/90 leading-relaxed font-semibold italic border-l-4 border-blue-600 pl-8 mb-12">
              {news.excerpt}
            </p>
            <div className="text-slate-200 text-xl leading-relaxed space-y-10">
              {news.content?.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>
          
          <div className="mt-20 pt-10 border-t border-[#30363d] text-center">
            <button 
              onClick={toggleReadingMode}
              className="text-blue-500 font-bold hover:underline"
            >
              Cerrar Modo Lectura y volver a la navegación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <Link to="/news" className="inline-flex items-center text-sm text-slate-400 hover:text-blue-400 mb-8 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a noticias
      </Link>

      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 text-[10px] font-bold border rounded uppercase tracking-wider ${
            news.category === 'Shock' 
              ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' 
              : 'bg-blue-600/20 text-blue-400 border-blue-500/30'
          }`}>
            {news.category === 'Shock' ? 'SHOCK DIGITAL' : news.category}
          </span>
          <span className="text-slate-500 text-xs">•</span>
          <span className="text-slate-500 text-xs">{news.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          {news.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-8 border-b border-[#30363d]">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold shadow-sm ${
              news.category === 'Shock' 
                ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' 
                : 'bg-blue-600/20 border-blue-500/30 text-blue-400'
            }`}>
              {news.author.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold text-slate-200">{news.author}</p>
                <button 
                  onClick={handleFollow}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-all font-bold uppercase tracking-widest ${
                    isFollowing 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'border-slate-700 text-slate-500 hover:text-blue-400 hover:border-blue-500/50'
                  }`}
                >
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Editor en SEOGrowthers</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleReadingMode}
              title="Modo Lectura"
              className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs font-bold hidden sm:inline">Modo Lectura</span>
            </button>

            <div className="flex items-center space-x-2 border-l border-[#30363d] pl-3 ml-1">
              <button onClick={() => openSocialShare('twitter')} className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-400 hover:text-white transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
              <button onClick={() => openSocialShare('linkedin')} className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-400 hover:text-[#0077b5] transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></button>
            </div>

            <div className="flex items-center space-x-3">
              {showCopied && <span className="text-[10px] font-mono text-green-400 animate-pulse">Copiado</span>}
              <button onClick={handleShare} className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-300 text-xs font-bold hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span className="hidden sm:inline">Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-12 rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl relative min-h-[300px] bg-[#161b22]">
        <OptimizedImage src={news.imageUrl} alt={news.title} containerClassName="w-full h-full" className="w-full h-auto object-cover max-h-[500px]" />
      </div>

      <article className="prose prose-invert max-w-none mb-16 px-0 md:px-2">
        <div className="relative mb-12 group">
          <div className="absolute -inset-y-4 -inset-x-6 bg-blue-500/5 rounded-2xl -z-10 transition-colors group-hover:bg-blue-500/[0.08]" />
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-semibold italic border-l-4 border-blue-600 pl-8 py-2">
            {news.excerpt}
          </p>
        </div>
        <div className="text-slate-300 text-lg md:text-xl leading-[1.75] space-y-8 font-normal tracking-normal text-pretty">
          {news.content?.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="transition-colors hover:text-white duration-300">{paragraph}</p>
          ))}
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className="py-16 border-t border-[#30363d]">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Relacionadas</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedNews.map((item, idx) => (
              <div key={item.id} className="animate-fade-in-up transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${idx * 150}ms` }}><NewsCard news={item} /></div>
            ))}
          </div>
        </section>
      )}

      <section className="pt-12 border-t border-[#30363d]">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Comentarios <span className="ml-2 px-2 py-0.5 bg-[#161b22] border border-[#30363d] rounded-full text-sm text-blue-400 font-mono">{comments.length}</span>
        </h3>

        {user ? (
          <form onSubmit={handleAddComment} className="mb-12 animate-fade-in group">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={`Como ${userData?.name || user.displayName || 'Usuario'}, ¿qué opinas?`} className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all mb-4 h-32 text-sm" />
            <button type="submit" disabled={!newComment.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 px-8 rounded-xl transition-all text-sm">Publicar</button>
          </form>
        ) : (
          <div className="mb-12 p-10 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-dashed border-[#30363d] rounded-2xl text-center">
            <h4 className="text-white text-lg font-bold mb-2">Únete a la discusión técnica</h4>
            <Link to="/login" state={{ from: location }} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all mt-4">Iniciar sesión</Link>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment, idx) => (
            <div key={comment.id} className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex-shrink-0"><div className="w-12 h-12 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center text-sm font-bold text-blue-400">{comment.user.charAt(0)}</div></div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1.5"><span className="text-sm font-bold text-slate-200">{comment.user}</span><span className="text-[10px] text-slate-500 font-mono uppercase">{comment.date}</span></div>
                <div className="comment-content prose prose-sm prose-invert max-w-none text-slate-300 bg-[#161b22]/50 border border-[#30363d] rounded-2xl p-5" dangerouslySetInnerHTML={{ __html: marked.parse(comment.text) }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handleScrollToTop} className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] text-slate-400 hover:text-blue-400 transition-all duration-300 shadow-2xl ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>
    </div>
  );
};

export default NewsDetail;
