import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.a
        href="https://wa.me/5492995504783"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] flex items-center justify-center transition-all group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          ¿Necesitas ayuda?
          {/* Arrow */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-[8px] border-transparent border-l-white"></div>
        </div>
      </motion.a>
    </AnimatePresence>
  );
};

export default WhatsAppButton;
