import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Code2, 
  LayoutTemplate, 
  Server, 
  Database, 
  Zap, 
  Cloud, 
  CheckCircle2, 
  MapPin, 
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';

const techStack = [
  { name: 'React', icon: Code2 },
  { name: 'Tailwind CSS', icon: LayoutTemplate },
  { name: 'Node.js', icon: Server },
  { name: 'Supabase', icon: Database },
  { name: 'Vite', icon: Zap },
  { name: 'Vercel', icon: Cloud }
];

const successStories = [
  {
    id: 'aluvalle',
    title: 'Aluvalle Carpintería',
    description: 'Sistema de catálogo y sitio corporativo para carpintería de aluminio de alta gama con enfoque en arquitectura y diseño moderno.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    metrics: '+200% Leads B2B',
    link: '/casos-de-exito/aluvalle'
  },
  {
    id: 'edvremolques',
    title: 'EDV Remolques',
    description: 'Sitio web de servicios de grúa y remolque enfocado en conversión rápida mediante llamadas (Click-to-Call) y SEO Local.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=1200',
    metrics: 'Rank #1 Local',
    link: '/casos-de-exito/edvremolques'
  }
];

const templates = [
  {
    name: 'Consultoría Pro',
    price: '350',
    description: 'Ideal para coachs, consultores y servicios profesionales.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    features: ['Diseño premium', 'Agenda integrada', 'Formulario avanzado']
  },
  {
    name: 'Menú Digital',
    price: '250',
    description: 'Perfecto para restaurantes, bares y cafeterías.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    features: ['Catálogo visual', 'Pedidos a WhatsApp', 'QR incluido']
  },
  {
    name: 'Portfolio Creativo',
    price: '300',
    description: 'Para diseñadores, fotógrafos y agencias.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800',
    features: ['Galería interactiva', 'Diseño minimalista', 'Optimizado para imágenes']
  }
];

const pricingPlans = [
  {
    name: 'Landing Page',
    price: '800',
    description: 'Perfecta para campañas, lanzamientos y captura de leads.',
    features: [
      'Diseño responsive mobile-first',
      'Formulario de contacto',
      'SEO on-page básico',
      'Velocidad optimizada (WebP)',
      '1 revisión de diseño',
      'Hosting 3 meses incluido'
    ],
    icon: LayoutTemplate,
    link: '/desarrollo-web/landing-page'
  },
  {
    name: 'Sitio Corporativo',
    price: '1,500',
    description: 'Presencia digital profesional para empresas en crecimiento.',
    features: [
      'Hasta 8 secciones/páginas',
      'Blog integrado con CMS',
      'SEO técnico completo',
      'Schema markup estructurado',
      'Google Analytics configurado',
      'Panel de administración',
      '3 revisiones de diseño',
      'Soporte 30 días'
    ],
    icon: Server,
    popular: true,
    link: '/desarrollo-web/sitio-corporativo'
  },
  {
    name: 'Tienda Online',
    price: '2,500',
    description: 'E-commerce completo optimizado para vender desde el día 1.',
    features: [
      'Catálogo ilimitado',
      'Pasarela de pagos (MP, Stripe)',
      'Carrito y checkout optimizado',
      'Panel de gestión de pedidos',
      'SEO para productos',
      'Email de confirmación',
      'Integración con envíos',
      'Soporte 60 días'
    ],
    icon: Database,
    link: '/desarrollo-web/tienda-online'
  }
];

const faqs = [
  {
    q: '¿Cuánto cuesta un sitio web profesional en Argentina?',
    a: 'El costo varía según la complejidad y los requerimientos del proyecto. Una Landing Page básica arranca en USD $800, mientras que plataformas corporativas o ecommerce rondan entre USD $1,500 y $2,500. Ofrecemos precios transparentes e invertimos tiempo en entender tu necesidad para armar un presupuesto exacto.'
  },
  {
    q: '¿Cuánto tiempo tarda el desarrollo de un sitio web?',
    a: 'Una Landing Page puede estar lista en 2 a 3 semanas. Sitios corporativos suelen tomar de 4 a 6 semanas, y una Tienda Online completa puede requerir de 6 a 8 semanas, dependiendo del catálogo y las funcionalidades específicas.'
  },
  {
    q: '¿Mi sitio web va a estar optimizado para celulares?',
    a: 'Absolutamente. Todos nuestros desarrollos aplican la metodología "mobile-first", asegurando que el sitio se vea y funcione de manera impecable en smartphones y tablets, además de computadoras de escritorio. Esto también beneficia el SEO, ya que Google prioriza sitios móviles.'
  }
];

const DesarrolloWeb: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30">
      <WhatsAppButton />
      {/* Dynamic Grid Background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-24 space-y-32">
        
        {/* HEADER SECTION */}
        <section className="text-center max-w-4xl mx-auto mt-12">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-white transition-colors">Servicios</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-500 flex items-center">
              Desarrollo Web <span className="w-2 h-2 rounded-full bg-blue-500 ml-2 animate-pulse" />
            </span>
          </div>

          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Desarrollo Web • Argentina</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8"
          >
            Profesional
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12"
          >
            Creamos sitios web rápidos, seguros y optimizados para Google. Desde landing pages de alta conversión hasta tiendas online completas. Tecnología moderna con SEO incluido.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contacto" className="text-blue-500 font-bold uppercase tracking-widest text-sm hover:text-blue-400 transition-colors w-full sm:w-auto px-8 py-4">
              Solicitar Presupuesto
            </Link>
            <a href="#planes" className="border border-slate-700 hover:border-slate-500 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-md transition-all w-full sm:w-auto hover:bg-slate-800/50 flex justify-center">
              Ver Planes y Precios
            </a>
          </motion.div>
        </section>

        {/* TECH STACK SECTION */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-12">Tecnología que impulsa resultados</h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
            {techStack.map((tech, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={tech.name} 
                className="bg-[#0a0e1a] border border-[#1a2235] p-6 rounded-xl flex flex-col items-center justify-center space-y-4 hover:border-slate-600 transition-colors group"
              >
                <tech.icon className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Planes de Desarrollo Web</h2>
            <p className="text-slate-400 text-lg">Precios transparentes. Sin costos ocultos. Todos incluyen SEO técnico y diseño responsive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                key={plan.name} 
                className={`bg-[#0d1222] border ${plan.popular ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-[#1a2235]'} rounded-2xl p-8 flex flex-col h-full`}
              >
                <plan.icon className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                <div className="mb-8 border-b border-[#222] pb-8">
                  <span className="text-sm font-bold text-slate-400 mr-2 uppercase">USD</span>
                  <span className="text-5xl font-black text-white tracking-tighter">${plan.price}</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.link} className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded border transition-all inline-flex justify-center items-center ${plan.popular ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-[#333] text-white hover:border-slate-500'}`}>
                  Ver Detalles
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TEMPLATES PORTFOLIO SECTION */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Plantillas Web Premium</h2>
            <p className="text-slate-400 text-lg">Soluciones llave en mano, rápidas y económicas para tu negocio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                key={template.name}
                className="bg-[#0a0e1a] border border-[#1a2235] rounded-2xl overflow-hidden group hover:border-slate-600 transition-colors flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">{template.name}</h3>
                    <div className="bg-blue-900/40 text-blue-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      USD ${template.price}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{template.description}</p>
                  <ul className="space-y-3 mb-6">
                    {template.features.map(feat => (
                      <li key={feat} className="flex items-start text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-[#111726] hover:bg-white hover:text-black transition-colors rounded text-xs font-bold uppercase tracking-widest text-[#fff]">
                    Ver Demo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SUCCESS STORIES CAROUSEL */}
        <section className="relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Casos de Éxito Reales</h2>
            <p className="text-slate-400 text-lg">Los resultados que generamos para nuestros clientes.</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-[#0d1222] border border-[#1a2235] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-transparent z-10" />
                  <img 
                    src={successStories[currentSlide].image} 
                    alt={successStories[currentSlide].title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center z-20">
                    <div className="px-8 md:px-16 w-full md:w-1/2">
                      <div className="inline-flex items-center space-x-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-md border border-blue-500/20">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Caso de Éxito</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        {successStories[currentSlide].title}
                      </h3>
                      <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
                        {successStories[currentSlide].description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="bg-[#111726]/80 backdrop-blur-md border border-[#222] px-6 py-3 rounded-xl inline-flex items-center">
                          <span className="text-2xl font-black text-white mr-3">{successStories[currentSlide].metrics}</span>
                        </div>
                        <Link to={successStories[currentSlide].link} className="inline-flex items-center text-blue-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm group">
                          Ver Caso Completo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-8 md:left-16 z-30 flex space-x-3">
                {successStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-8 bg-blue-500' : 'bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL SEO BANNER */}
        <section>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-[#222] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/50 transition-colors bg-gradient-to-r from-[#0d1222] to-transparent"
          >
            <div className="flex items-start md:items-center gap-6">
              <div className="bg-[#1a2235] p-4 rounded-full flex-shrink-0">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">Posicioná tu negocio en Neuquén</h3>
                <p className="text-slate-400">SEO local + estrategia de contenido para dominar las búsquedas en tu zona.</p>
              </div>
            </div>
            <Link to="#" className="flex items-center text-sm font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest flex-shrink-0">
              Conocer SEO Local <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">Preguntas frecuentes sobre desarrollo web</h2>
            <p className="text-slate-400">Todo lo que necesitás saber antes de arrancar tu proyecto web.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0b0f1a] border border-[#1a2235] rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-[#111726] transition-colors focus:outline-none"
                >
                  <span className="font-bold text-white pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed border-t border-[#1a2235] mx-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DesarrolloWeb;
