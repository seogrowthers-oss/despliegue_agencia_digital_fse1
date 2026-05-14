
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/news?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Noticias', path: '/news' },
    { name: 'Servicios', path: '/services' },
    { name: 'Recursos', path: '/recursos' },
    { name: 'Academia', path: '/academia' },
    { name: 'Perfil', path: '/profile' },
    { name: 'Análisis', path: '/news/category/tech' },
  ];

  const techIcons = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Cloud', icon: '☁️' },
    { name: 'IA', icon: '🤖' },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Bar: 3DJuegos Style */}
      <div className="bg-black border-b border-[#222] h-14 md:h-20 px-4 md:px-8 flex items-center justify-between">
        {/* Left: Sections Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex md:hidden items-center space-x-2 bg-[#1a1a1a] hover:bg-[#252525] px-4 py-2 rounded-sm transition-colors"
        >
          <div className="space-y-1">
            <span className="block w-4 h-0.5 bg-blue-600"></span>
            <span className="block w-4 h-0.5 bg-blue-600"></span>
            <span className="block w-4 h-0.5 bg-blue-600"></span>
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Secciones</span>
        </button>

        {/* Center: Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group transform transition-transform hover:scale-105">
          <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center transform rotate-3">
             <span className="text-white font-black text-xl italic">S</span>
          </div>
          <span className="text-xl md:text-3xl font-black text-white italic tracking-tighter">SEO<span className="text-blue-600">GROWTHERS</span></span>
        </Link>

        {/* Right: Search & Login */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center space-x-2 bg-[#1a1a1a] hover:bg-[#252525] px-4 py-2 rounded-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline text-xs font-black uppercase tracking-widest text-white">Buscar</span>
          </button>

          {user && userData?.role === 'Admin' && (
            <Link to="/admin/articulos" className="hidden md:flex items-center space-x-2 bg-[#1a1a1a] hover:bg-blue-600/20 px-4 py-2 rounded-sm transition-colors border border-blue-600/30 hover:border-blue-600">
              <Settings size={16} className="text-blue-600" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Admin</span>
            </Link>
          )}

          {user ? (
            <Link to="/profile" className="flex items-center space-x-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{userData?.name || user.displayName || 'Usuario'}</p>
                <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{userData?.role || 'Miembro'}</p>
              </div>
              <div className="w-10 h-10 rounded-sm border border-blue-600/50 overflow-hidden transform hover:scale-110 transition-transform bg-[#1a1a1a] flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-black text-xs uppercase">{(userData?.name || user.displayName || 'U')[0]}</span>
                )}
              </div>
            </Link>
          ) : (
            <Link to="/login" className="hidden lg:flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-widest hover:text-blue-600 transition-colors">
              <span>Entra o Regístrate</span>
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-blue-600/30">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <nav className="bg-[#0a0a0a] border-b border-[#222] overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10 md:h-12">
          <div className="flex space-x-6 md:space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors py-2 border-b-2 border-transparent
                  ${isActive ? 'text-blue-600 border-blue-600' : 'text-slate-400 hover:text-white'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6 border-l border-[#222] pl-6 h-full">
            {techIcons.map((t) => (
              <button key={t.name} className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors">
                <span className="text-sm">{t.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl p-8 border-b border-blue-600 animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex items-center space-x-4">
            <input 
              autoFocus
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="¿Qué quieres aprender hoy?" 
              className="flex-grow bg-[#1a1a1a] border-none text-white text-xl p-4 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white font-black px-10 py-4 uppercase tracking-widest hover:bg-blue-700 transition-colors">Confirmar</button>
          </form>
        </div>
      )}

      {/* Mobile Drawer (Simplified) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0d1117]/95 backdrop-blur-md z-[60] flex flex-col p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <Logo size="lg" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            {[...navLinks, { name: 'Growth IA', path: '/ask-ai' }].map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black text-white uppercase italic hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
