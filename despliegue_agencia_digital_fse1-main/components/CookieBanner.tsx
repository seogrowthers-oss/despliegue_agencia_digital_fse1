
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-md bg-opacity-95">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.533 1.533 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Configuración de Cookies
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y personalizar el contenido técnico. Al hacer clic en "Aceptar", consientes su uso. Puedes leer más en nuestra <Link to="/cookies" className="text-blue-400 hover:underline">Política de Cookies</Link>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={handleDecline}
              className="px-5 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Solo esenciales
            </button>
            <button 
              onClick={handleAccept}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md border border-blue-500/50 transition-all shadow-lg shadow-blue-500/10"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
