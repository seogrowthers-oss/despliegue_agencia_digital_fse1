import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, DesktopIcon, MobileIcon, Rocket, Activity, BarChart, CheckCircle2, Terminal, TrendingUp, Users } from 'lucide-react';

const caseData: Record<string, any> = {
  'aluvalle': {
    title: 'Aluvalle Carpintería de Aluminio',
    client: 'Aluvalle',
    industry: 'Arquitectura & Construcción',
    url: 'https://www.aluvalle.store/',
    description: 'El proyecto web de Aluvalle no es solo una vitrina digital, sino una herramienta estratégica que combina catálogo interactivo, recursos técnicos y comunicación directa para fortalecer la relación con arquitectos, ingenieros y clientes finales.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    summary: 'El proyecto web de Aluvalle no es solo una vitrina digital, sino una herramienta estratégica que combina catálogo interactivo, recursos técnicos y comunicación directa para fortalecer la relación con arquitectos, ingenieros y clientes finales.',
    metrics: [
       { label: 'E-commerce', value: 'Integrado' },
       { label: 'Recursos', value: 'Objetos BIM' },
       { label: 'Plataforma', value: 'Custom UX' }
    ],
    characteristics: [
      { title: 'Plataforma integral', description: 'Presenta productos, proyectos arquitectónicos y soluciones en aluminio de alta gama.' },
      { title: 'Catálogo interactivo', description: 'Acceso a herramientas destacadas y enlaces directos a MercadoLibre para compra de equipamiento.' },
      { title: 'Portal técnico', description: 'Recursos como objetos BIM y especificaciones para arquitectos e ingenieros.' },
      { title: 'Secciones claras', description: 'Sostenibilidad, oficina técnica, red de carpinterías y contacto directo por WhatsApp.' }
    ],
    tools: ['MercadoLibre Link', 'React', 'TailwindCSS', 'BIM Assets', 'Vite'],
    benefits: [
      { title: 'Acceso rápido y confiable', description: 'A productos y soluciones arquitectónicas premium.' },
      { title: 'Transparencia y confianza', description: 'Socio estratégico oficial de Alcemar S.A., lo que refuerza la credibilidad de la marca.' },
      { title: 'Optimización del tiempo', description: 'Catálogo digital y recursos técnicos disponibles en línea, sin necesidad de desplazamientos.' },
      { title: 'Soporte directo', description: 'Asesoramiento personalizado y contacto inmediato por correo o WhatsApp.' }
    ],
    howWeWork: [
       { title: 'Colaboración estratégica', description: 'Se define junto al cliente la identidad digital y los objetivos del sitio.' },
       { title: 'Iteración constante', description: 'Se muestran avances y se ajusta el diseño según feedback del cliente.' },
       { title: 'Personalización', description: 'Cada sección se adapta a la propuesta de valor de la empresa.' },
       { title: 'Acompañamiento continuo', description: 'Además del desarrollo, se asesora en sostenibilidad, marketing digital y posicionamiento SEO.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800'
    ]
  },
  'edvremolques': {
    title: 'EDV Remolques y Grúas',
    client: 'EDV Remolques',
    industry: 'Servicios Automotrices',
    url: 'https://edvremolques.online/',
    description: 'El proyecto no es solo una web, es una herramienta estratégica de marketing digital que combina desarrollo técnico, optimización SEO y enfoque comercial para que el cliente pueda monetizar desde el primer día.',
    coverImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1600',
    summary: 'El proyecto no es solo una web, es una herramienta estratégica de marketing digital que combina desarrollo técnico, optimización SEO y enfoque comercial para que el cliente pueda monetizar desde el primer día.',
    metrics: [
      { label: 'Tecnología', value: 'React' },
      { label: 'Conversión', value: 'UX/UI CRO' },
      { label: 'Rendimiento', value: 'Ultra Rápido' }
    ],
    characteristics: [
      { title: 'Desarrollo desde cero', description: 'Sin depender de CMS como WordPress, construido con React + Vite + TailwindCSS para máxima personalización y rendimiento.' },
      { title: 'Arquitectura modular', description: 'Landing page con CTAs claros, blog dinámico para contenido SEO y sección de recursos con enlaces a herramientas afiliadas.' },
      { title: 'Integraciones útiles', description: 'Formularios con EmailJS para captación de leads y automatización de respuestas.' },
      { title: 'SEO optimizado', description: 'Estructura pensada para posicionar artículos evergreen, comparativas y reseñas.' }
    ],
    tools: ['React', 'TailwindCSS', 'Vite', 'Vercel / Netlify', 'EmailJS'],
    benefits: [
      { title: 'Velocidad y rendimiento', description: 'Páginas ligeras y optimizadas para SEO y experiencia de usuario.' },
      { title: 'Escalabilidad', description: 'Fácil de ampliar con nuevas secciones, integraciones o funcionalidades.' },
      { title: 'Conversión', description: 'Diseño centrado en CTAs y captación de leads, aumentando las oportunidades de venta.' },
      { title: 'Confianza digital', description: 'Un sitio moderno transmite profesionalismo y credibilidad.' }
    ],
    howWeWork: [
      { title: 'Co-creación', description: 'Definimos juntos el nicho y los objetivos del sitio.' },
      { title: 'Transparencia', description: 'Mostramos avances iterativos para que el cliente valide cada etapa.' },
      { title: 'Personalización', description: 'Adaptamos diseño y contenido a la identidad de la marca.' },
      { title: 'Acompañamiento', description: 'No solo entregamos la web, también asesoramos en SEO, contenido y monetización.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510443425028-5696144e59f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=800'
    ]
  }
};

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = id ? caseData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl text-white font-black mb-4">Caso no encontrado</h1>
          <Link to="/desarrollo-web" className="text-blue-500 hover:text-blue-400 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Desarrollo Web
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-200">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 0%, #2563eb 0%, transparent 60%)'
           }}
      />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden z-10 border-b border-[#1a2235]">
        <div className="max-w-7xl mx-auto px-4 relative">
          <Link to="/desarrollo-web" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver a Casos de Éxito
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 items-end">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-md border border-blue-500/20"
              >
                <span>{study.industry}</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-tight"
              >
                {study.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 max-w-2xl"
              >
                {study.description}
              </motion.p>
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="w-full md:w-auto"
            >
              <a href={study.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <span>Visitar Sitio Web</span>
                <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-12 relative z-20">
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.7 }}
           className="aspect-video md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <img src={study.coverImage} alt={study.title} className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {study.metrics.map((metric: any, i: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={metric.label}
                className="bg-[#0a0e1a]/80 backdrop-blur-md border border-[#1a2235] p-8 rounded-2xl text-center flex flex-col justify-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{metric.value}</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-24">
            
            {/* Conditional The Challenge & The Solution (Legacy structure) */}
            {study.challenges && (
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                    <Activity className="w-8 h-8 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white">El Desafío</h2>
                </div>
                <ul className="space-y-6">
                  {study.challenges.map((challenge: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-400 mr-4 font-black mt-1">0{i+1}.</span>
                      <p className="text-slate-300 leading-relaxed text-lg">{challenge}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {study.solutions && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <Rocket className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white">La Solución</h2>
                </div>
                <ul className="space-y-6">
                  {study.solutions.map((solution: string, i: number) => (
                    <li key={i} className="flex items-start bg-[#111726]/50 border border-[#1a2235] p-6 rounded-2xl hover:bg-[#111726] transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-green-400 mr-4 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-300 leading-relaxed">{solution}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* New Brochure Structure */}
            {study.characteristics && (
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Terminal className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Características del Proyecto</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {study.characteristics.map((char: any, i: number) => (
                    <div key={i} className="bg-[#111726]/50 border border-[#1a2235] p-6 rounded-2xl hover:bg-[#111726] transition-colors">
                      <h3 className="text-white font-bold text-lg mb-2">{char.title}</h3>
                      <p className="text-slate-400">{char.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {study.benefits && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2 mt-12"
              >
                <div className="flex items-center space-x-4 mb-8">
                   <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                     <TrendingUp className="w-8 h-8 text-emerald-400" />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight">Beneficios para el Cliente</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {study.benefits.map((benefit: any, i: number) => (
                     <div key={i} className="flex items-start">
                       <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0 mt-0.5" />
                       <div>
                         <h3 className="text-white font-bold mb-1">{benefit.title}</h3>
                         <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                       </div>
                     </div>
                  ))}
                </div>
              </motion.div>
            )}

            {study.tools && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2 mt-12 mb-12"
              >
                <div className="flex flex-col md:flex-row md:items-center bg-[#0a0e1a]/80 backdrop-blur-md border border-[#1a2235] p-8 rounded-2xl gap-8">
                  <div className="flex-shrink-0">
                    <h3 className="text-2xl font-black text-white mb-2">Herramientas</h3>
                    <p className="text-slate-400 text-sm">Stack tecnológico empleado</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {study.tools.map((tool: string, i: number) => (
                      <span key={i} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-mono text-sm border border-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {study.howWeWork && (
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="col-span-1 md:col-span-2"
              >
                <div className="flex items-center space-x-4 mb-8">
                   <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                     <Users className="w-8 h-8 text-purple-400" />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight">Cómo trabajamos con el cliente</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                   {study.howWeWork.map((step: any, i: number) => (
                     <div key={i} className="p-6 relative">
                        <div className="text-5xl font-black text-slate-800 mb-4 absolute -top-4 -left-2 z-0 opacity-50">0{i+1}</div>
                        <div className="relative z-10">
                          <h3 className="text-white font-bold mb-2">{step.title}</h3>
                          <p className="text-slate-400 text-sm">{step.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* Screenshot Gallery */}
          <div className="mt-32">
            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 tracking-tighter">Detalles del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {study.gallery.map((img: string, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className="aspect-video relative rounded-2xl overflow-hidden border border-[#222] group"
                >
                  <div className="absolute inset-0 bg-blue-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
               <h3 className="text-2xl text-white font-bold mb-8">¿Listo para transformar tu negocio?</h3>
               <Link to="/contact" className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white hover:bg-blue-500 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                 <span>Inicia tu proyecto hoy</span>
                 <ExternalLink className="w-5 h-5" />
               </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default CaseStudyDetail;
