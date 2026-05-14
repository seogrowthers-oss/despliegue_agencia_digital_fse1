
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const ecosystemLinks = [
    { name: 'Noticias Tech', path: '/news' },
    { name: 'Estrategias SEO', path: '/recursos' },
    { name: 'Academia', path: '/academia' },
    { name: 'Growth Assistant', path: '/ask-ai' },
    { name: 'Misión Tech', path: '/about' },
  ];

  const companyLinks = [
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Privacidad', path: '/privacy' },
    { name: 'Cookies', path: '/cookies' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#' },
    { name: 'Twitter/X', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Discord', href: '#' },
  ];

  return (
    <footer className="bg-[#0d1117] border-t border-[#30363d] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="sm" />
              <span className="text-lg font-bold text-white tracking-tight">SEOGrowthers</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              Escalando la visibilidad digital a través del código y la inteligencia artificial. Noticias, estrategias SEO y recursos técnicos para la nueva era de la web.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Ecosistema</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {ecosystemLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-blue-400 transition-colors inline-block hover-vibrate">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Compañía</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-blue-400 transition-colors inline-block hover-vibrate">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#30363d] flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} SEOGrowthers Media Group. Built for the modern web.</p>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="hover:text-white transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
