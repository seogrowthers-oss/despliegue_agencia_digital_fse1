
import React from 'react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <a 
      href={resource.link} 
      className="card-editorial group flex flex-col h-full animate-fade-in relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-[#2563eb] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2 bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-black border border-[#222] px-3 py-1 text-slate-500 group-hover:text-white transition-colors">
            {resource.difficulty}
          </span>
        </div>

        <h4 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-[#2563eb] transition-colors leading-tight italic uppercase">
          {resource.title}
        </h4>
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
          {resource.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-[#222]">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
