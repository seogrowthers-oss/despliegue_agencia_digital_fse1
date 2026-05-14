
import React, { useEffect } from 'react';

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Política de Cookies</h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Última actualización: 24 de Mayo, 2024</p>
      </header>

      <article className="prose prose-invert max-w-none prose-blue">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">1. ¿Qué son las cookies?</h2>
          <p className="text-slate-300 leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador o dispositivo para recordar información sobre tu visita. En <strong>SEOGrowthers</strong>, las utilizamos para que la plataforma funcione correctamente y para entender cómo interactúas con nuestro contenido técnico y herramientas de IA.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de cookies que utilizamos</h2>
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="text-blue-400 font-bold mb-2">Necesarias</h3>
              <p className="text-sm text-slate-400">Esenciales para el funcionamiento básico del sitio, como la navegación y el acceso a áreas seguras. No pueden desactivarse.</p>
            </div>
            <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="text-purple-400 font-bold mb-2">Análisis</h3>
              <p className="text-sm text-slate-400">Nos ayudan a entender cómo los desarrolladores usan el sitio, qué artículos son más leídos y dónde podemos mejorar la interfaz.</p>
            </div>
            <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="text-emerald-400 font-bold mb-2">Personalización</h3>
              <p className="text-sm text-slate-400">Recuerdan tus preferencias, como el idioma o el tema visual, para ofrecerte una experiencia más fluida.</p>
            </div>
            <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="text-amber-400 font-bold mb-2">Marketing IA</h3>
              <p className="text-sm text-slate-400">Utilizadas para mostrar anuncios relevantes basados en tus intereses en programación y SEO técnico.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">3. Control de cookies</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Puedes gestionar o desactivar las cookies en cualquier momento a través de la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad de algunas herramientas de nuestra plataforma, como el Asistente de IA.
          </p>
          <ul className="list-disc pl-6 text-slate-400 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" className="text-blue-400">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" className="text-blue-400">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" className="text-blue-400">Safari</a></li>
          </ul>
        </section>

        <section className="mb-10 p-6 bg-blue-900/10 border border-blue-500/20 rounded-2xl">
          <h2 className="text-xl font-bold text-blue-400 mb-2">Contacto Legal</h2>
          <p className="text-sm text-slate-300">
            Si tienes dudas técnicas sobre nuestra implementación de cookies o privacidad de datos, escríbenos a: <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">privacy@seogrowthers.com</code>
          </p>
        </section>
      </article>
    </div>
  );
};

export default CookiePolicy;
