import React from 'react';
import { Code, Megaphone, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import WhatsAppButton from '../components/WhatsAppButton';

const services = [
  {
    icon: Code,
    title: 'Desarrollo Web',
    description: 'Construimos ecosistemas digitales de alto rendimiento. Interfaces inmersivas y arquitecturas robustas diseñadas para escalar y maximizar la conversión.',
    features: ['Landing Page', 'Sitio Web Corporativo', 'Tiendas Online', 'Portafolio'],
    bgColor: 'bg-blue-900/20',
    textColor: 'text-blue-500',
    dotColor: 'bg-blue-500',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    link: '/desarrollo-web'
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description: 'Estrategias omnicanal basadas en datos empíricos para amplificar tu alcance, dominar tu nicho y multiplicar tu retorno de inversión.',
    features: ['SEO', 'SEM (Ads)', 'Redes Sociales', 'Email Marketing'],
    bgColor: 'bg-purple-900/20',
    textColor: 'text-purple-500',
    dotColor: 'bg-purple-500',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/marketing-digital'
  },
  {
    icon: Bot,
    title: 'Automatización',
    description: 'Optimizamos tus operaciones delegando tareas repetitivas a sistemas inteligentes. Escala tu negocio sin incrementar proporcionalmente tus costos.',
    features: ['Marketing y Ventas', 'RPA (Bots)', 'Integraciones No-Code', 'IA Agéntica'],
    bgColor: 'bg-emerald-900/20',
    textColor: 'text-emerald-500',
    dotColor: 'bg-emerald-500',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/automatizacion'
  }
];

const ServicesView: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <WhatsAppButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="heading-editorial text-white text-5xl md:text-7xl mb-24 text-center tracking-tighter"
        >
          Nuestros Servicios
        </motion.h1>
        
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}
            >
              <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className={`p-4 ${service.bgColor} rounded-xl inline-block`}>
                  <service.icon className={`w-12 h-12 ${service.textColor}`} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{service.title}</h2>
                <p className="text-slate-400 text-lg leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center space-x-2 text-white/70">
                      <div className={`w-1.5 h-1.5 ${service.dotColor} rounded-full`} />
                      <span className="text-sm font-bold uppercase tracking-wider">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to={service.link} className="inline-flex items-center bg-white text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded-sm mt-8 hover:bg-slate-200 transition-colors">
                  Explorar {service.title} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="aspect-video bg-[#0a0a0a] rounded-2xl border border-[#222] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-50" />
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                <span className="text-white/20 font-black uppercase tracking-widest relative z-20 text-9xl group-hover:scale-110 group-hover:text-white/30 transition-all duration-500">
                    <service.icon size={128} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
