
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Shield, LogOut, CheckCircle2, ChevronRight, X, Briefcase, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db, handleFirestoreError, OperationType } from '../services/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    bio: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || user?.displayName || '',
        phone: userData.phone || '',
        company: userData.company || '',
        bio: userData.bio || ''
      });
    }
  }, [userData, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setSuccessMsg('');

    try {
      if (formData.name !== user.displayName) {
        await updateProfile(user, { displayName: formData.name });
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        bio: formData.bio,
        updatedAt: new Date().toISOString()
      });

      setSuccessMsg('Perfil actualizado correctamente.');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#2563eb] font-mono animate-pulse uppercase tracking-[0.2em] font-black">Validando acceso...</div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const displayName = userData?.name || user.displayName || 'Usuario';
  const displayEmail = userData?.email || user.email || '';
  const displayRole = userData?.role || 'Miembro';

  return (
    <div className="min-h-screen pt-32 pb-12 bg-black relative">
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Left Column */}
          <div className="w-full md:w-1/3 space-y-6">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-gradient-to-tr from-[#2563eb] to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-black overflow-hidden mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{displayName[0]}</span>
                  )}
                </div>
                <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{displayName}</h1>
                <p className="text-slate-400 text-sm mb-4">{displayEmail}</p>
                <div className="inline-block bg-[#111] border border-[#333] text-blue-400 text-[10px] font-black uppercase px-3 py-1.5 tracking-widest rounded-full">
                  {displayRole}
                </div>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-[#222]">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Menú de Navegación</h3>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className={`flex items-center justify-between p-4 transition-all border-l-4 ${!isEditing ? 'bg-[#111] border-[#2563eb] text-white' : 'border-transparent text-slate-400 hover:bg-[#111] hover:text-white'}`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span className="font-bold text-sm">Vista General</span>
                  </div>
                  {!isEditing && <ChevronRight className="w-4 h-4 text-[#2563eb]" />}
                </button>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className={`flex items-center justify-between p-4 transition-all border-l-4 ${isEditing ? 'bg-[#111] border-blue-500 text-white' : 'border-transparent text-slate-400 hover:bg-[#111] hover:text-white'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span className="font-bold text-sm">Configurar Perfil</span>
                  </div>
                  {isEditing && <ChevronRight className="w-4 h-4 text-blue-500" />}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-between p-4 transition-all border-l-4 border-transparent text-red-500/80 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold text-sm">Cerrar Sesión</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content Column */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key={isEditing ? 'editing' : 'viewing'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0a] border border-[#222] p-8 md:p-12 rounded-2xl h-full"
            >
              {!isEditing ? (
                <div>
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#222]">
                    <h2 className="text-2xl font-black text-white">Información Personal</h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-[#2563eb] hover:text-white font-bold"
                    >
                      Editar Detalles
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                        <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-2">
                           <User className="w-3 h-3 mr-2" /> Nombre Completo
                        </div>
                        <div className="text-white font-medium">{displayName}</div>
                      </div>
                      <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                        <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-2">
                           <Mail className="w-3 h-3 mr-2" /> Correo Electrónico
                        </div>
                        <div className="text-white font-medium">{displayEmail}</div>
                      </div>
                      <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                        <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-2">
                           <Phone className="w-3 h-3 mr-2" /> Teléfono
                        </div>
                        <div className="text-white font-medium">{userData?.phone || <span className="text-slate-600 italic">No especificado</span>}</div>
                      </div>
                      <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                        <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-2">
                           <Briefcase className="w-3 h-3 mr-2" /> Empresa / Proyecto
                        </div>
                        <div className="text-white font-medium">{userData?.company || <span className="text-slate-600 italic">No especificado</span>}</div>
                      </div>
                    </div>
                    
                    <div className="bg-[#111] p-5 rounded-xl border border-[#222]">
                       <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-3">
                         Acerca de Mí
                       </div>
                       <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                         {userData?.bio || <span className="text-slate-600 italic">Aquí puedes agregar una breve descripción sobre ti, tus intereses o tu experiencia.</span>}
                       </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave}>
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#222]">
                    <h2 className="text-2xl font-black text-white">Configurar Perfil</h2>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="p-2 hover:bg-[#222] rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563eb] transition-colors"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correo Electrónico</label>
                        <input 
                          type="email" 
                          value={user.email || ''}
                          disabled
                          className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teléfono</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563eb] transition-colors"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresa / Proyecto</label>
                        <input 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563eb] transition-colors"
                          placeholder="Nombre de tu negocio"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acerca de Mí (Bio)</label>
                       <textarea 
                         value={formData.bio}
                         onChange={(e) => setFormData({...formData, bio: e.target.value})}
                         rows={4}
                         className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563eb] transition-colors resize-none"
                         placeholder="Háblanos un poco sobre ti..."
                       ></textarea>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isSaving}
                        className="btn-editorial bg-[#2563eb] font-bold text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#2563eb] transition-colors disabled:opacity-50 flex items-center space-x-2"
                      >
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

