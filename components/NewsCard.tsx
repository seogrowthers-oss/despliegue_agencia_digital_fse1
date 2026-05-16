
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`} className="card-editorial group block h-full flex flex-col animate-fade-in">
      <div className="relative aspect-video overflow-hidden bg-black">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute top-0 right-0 p-2">
           <span className="bg-[#2563eb] text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-tighter">Nota</span>
        </div>
        <div className="absolute bottom-0 left-0 p-2 bg-black/90 text-[8px] font-black text-white uppercase tracking-tighter">
          {news.category}
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-black text-white leading-tight mb-2 group-hover:text-[#2563eb] transition-colors italic uppercase">
          {news.title}
        </h3>
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4 font-medium">
          {news.excerpt}
        </p>
        <div className="mt-auto pt-3 border-t border-[#222] flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <span className="truncate max-w-[120px]">{news.author}</span>
           <span>{news.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
