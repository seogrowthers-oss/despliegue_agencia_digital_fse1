
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import News from './views/News';
import NewsDetail from './views/NewsDetail';
import Resources from './views/Resources';
import WebDevResource from './views/WebDevResource';
import AIResource from './views/AIResource';
import SEOResource from './views/SEOResource';
import AIChat from './views/AIChat';
import CookiePolicy from './views/CookiePolicy';
import About from './views/About';
import PrivacyPolicy from './views/PrivacyPolicy';
import Auth from './views/Auth';
import Services from './views/Services';
import DesarrolloWeb from './views/DesarrolloWeb';
import Showcase from './views/Showcase';
import Profile from './views/Profile';
import Academy from './views/Academy';
import CaseStudyDetail from './views/CaseStudyDetail';
import LandingPage from './views/LandingPage';
import CorporateSite from './views/CorporateSite';
import TiendaOnline from './views/TiendaOnline';
import Contact from './views/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col relative text-white bg-[#050914]">
            {/* Global Background Image */}
            <div className="fixed inset-0 z-[0] pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-[0.35] mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/60 via-[#050914]/85 to-[#050914]" />
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/category/:categorySlug" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/recursos" element={<Resources />} />
                <Route path="/recursos/desarrollo-web" element={<WebDevResource />} />
                <Route path="/recursos/inteligencia-artificial" element={<AIResource />} />
                <Route path="/recursos/seo" element={<SEOResource />} />
                <Route path="/academia" element={<Academy />} />
                <Route path="/ask-ai" element={<AIChat />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/services" element={<Services />} />
                <Route path="/desarrollo-web" element={<DesarrolloWeb />} />
                <Route path="/desarrollo-web/landing-page" element={<LandingPage />} />
                <Route path="/desarrollo-web/sitio-corporativo" element={<CorporateSite />} />
                <Route path="/desarrollo-web/tienda-online" element={<TiendaOnline />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/casos-de-exito/:id" element={<CaseStudyDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/showcase" element={<Showcase />} />
              </Routes>
              </main>
              <CookieBanner />
              <Footer />
            </div>
          </div>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
