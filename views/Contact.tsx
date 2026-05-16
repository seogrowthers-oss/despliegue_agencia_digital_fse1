import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, Phone, Mail, Box, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'Desarrollo Web',
    purpose: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Nueva consulta: ${formData.sector} - ${formData.purpose}`);
    const body = encodeURIComponent(`
Nombre/Empresa: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Sector de interés: ${formData.sector}
Propósito: ${formData.purpose}

Mensaje:
${formData.message}
    `);

    // Abre el cliente de correo por defecto
    window.location.href = `mailto:seogrowthers@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #2563eb 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Contacto Directo</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">Empecemos a trabajar</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Completa el siguiente formulario para que entendamos mejor tu necesidad. Nos contactaremos a la brevedad.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0e1a]/80 backdrop-blur-xl border border-[#1a2235] rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Información Personal */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex flex-col justify-center items-center text-sm mr-3">1</span>
                  Tus Datos
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nombre o Empresa</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Tu nombre completo..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email (Requerido)</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Teléfono (Requerido)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+54 9 299..."
                    />
                  </div>
                </div>
              </div>

              {/* Proyecto */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex flex-col justify-center items-center text-sm mr-3">2</span>
                  Tu Proyecto
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sector / Interés</label>
                    <select 
                      name="sector"
                      required
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option value="Desarrollo Web">Desarrollo Web (General)</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Sitio Corporativo">Sitio Corporativo</option>
                      <option value="Tienda Online">E-commerce / Tienda Online</option>
                      <option value="SEO">Posicionamiento SEO</option>
                      <option value="Automatización AI">Automatización con AI</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Propósito Principal</label>
                    <input 
                      type="text" 
                      name="purpose"
                      required
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ej: Conseguir más clientes, vender productos..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Detalles Adicionales</label>
                    <textarea 
                      name="message"
                      rows={3}
                      onChange={handleChange}
                      className="w-full bg-[#111726] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Cuéntanos un poco más sobre tu necesidad..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#1a2235] text-center">
              <button 
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center bg-blue-600 text-white font-bold uppercase tracking-widest px-12 py-4 rounded-xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(37,99,235,0.3)]"
              >
                <span>Enviar Consulta a seogrowthers@gmail.com</span>
                <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
