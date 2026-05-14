
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Política de Privacidad</h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Última revisión: 24 de Mayo, 2024</p>
      </header>

      <article className="prose prose-invert max-w-none prose-blue">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">01.</span> Introducción
          </h2>
          <p className="text-slate-300 leading-relaxed">
            En <strong>SEOGrowthers</strong>, la privacidad de nuestra comunidad de desarrolladores y estrategas es una prioridad absoluta. Esta política detalla cómo procesamos la información en nuestro ecosistema técnico, desde la navegación en el blog hasta las interacciones con nuestro asistente de IA.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">02.</span> Datos que Recopilamos
          </h2>
          <p className="text-slate-300 mb-6">
            Nuestros sistemas están diseñados para minimizar la recolección de datos personales, enfocándonos en logs técnicos y telemetría de rendimiento:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 font-mono">_telemetry_data</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Información del navegador, resolución de pantalla, dirección IP (anonimizada) y tiempo de carga de recursos.</p>
            </div>
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 font-mono">_interaction_logs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Consultas realizadas al Growth Assistant e interacciones con las guías técnicas para mejorar la relevancia del contenido.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">03.</span> Procesamiento por IA
          </h2>
          <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Nuestro asistente <strong>Growth IA</strong> utiliza la API de Google Gemini para procesar tus consultas. Es importante destacar:
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
              <li>No compartimos tu identidad personal con los modelos de lenguaje.</li>
              <li>Las conversaciones se utilizan únicamente para mantener el contexto de la sesión actual.</li>
              <li>Recomendamos no introducir credenciales, API keys o secretos de producción en el chat.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">04.</span> Seguridad del Stack
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Implementamos cifrado <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">TLS 1.3</code> en todas las transmisiones de datos. Nuestras bases de datos están protegidas por capas de autenticación robustas y acceso basado en roles (RBAC).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-blue-500 mr-2">05.</span> Tus Derechos (GDPR/LOPD)
          </h2>
          <p className="text-slate-300 mb-6">
            Como usuario, tienes control total sobre tus datos. Puedes ejercer tus derechos de:
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Acceso', 'Rectificación', 'Supresión', 'Portabilidad', 'Oposición'].map(right => (
              <span key={right} className="px-3 py-1 bg-[#0d1117] border border-[#30363d] text-slate-400 text-xs font-medium rounded-full">
                {right}
              </span>
            ))}
          </div>
        </section>

        <footer className="pt-12 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm mb-6">¿Tienes dudas sobre cómo gestionamos tu privacidad?</p>
          <a 
            href="mailto:privacy@seogrowthers.com" 
            className="inline-flex items-center space-x-2 bg-[#161b22] border border-[#30363d] hover:border-blue-500/50 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>privacy@seogrowthers.com</span>
          </a>
          <div className="mt-8">
            <Link to="/cookies" className="text-blue-400 text-xs hover:underline">Ver Política de Cookies</Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
