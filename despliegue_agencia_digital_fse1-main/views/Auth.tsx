
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Redirigir si ya está logueado
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const passwordRequirements = useMemo(() => {
    return [
      { label: '8+ caracteres', met: password.length >= 8 },
      { label: 'Mayúscula', met: /[A-Z]/.test(password) },
      { label: 'Minúscula', met: /[a-z]/.test(password) },
      { label: 'Número', met: /[0-9]/.test(password) },
      { label: 'Símbolo', met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return passwordRequirements.every(req => req.met);
  }, [passwordRequirements]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    (window as any).createRipple?.(e);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!isLogin && !isPasswordValid) {
      setError("La contraseña no cumple con los requisitos mínimos de seguridad.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#0d1117]">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Accede a tu cuenta de SEOGrowthers' : 'Únete a la élite del SEO técnico y desarrollo'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}
          {!isLogin && (
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Nombre de usuario</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="p. ej. dev_master"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm font-sans"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Email corporativo</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@empresa.com"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm font-sans"
            />
          </div>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest">Contraseña</label>
              {isLogin && <a href="#" className="text-[10px] text-blue-500 hover:underline">¿Olvidaste tu clave?</a>}
            </div>
            <input 
              type="password" 
              required
              value={password}
              onFocus={() => !isLogin && setShowPasswordRequirements(true)}
              onBlur={() => !isLogin && password === '' && setShowPasswordRequirements(false)}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-[#0d1117] border rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:ring-1 transition-all text-sm font-sans ${
                !isLogin && password.length > 0 
                  ? (isPasswordValid ? 'border-emerald-500/50 focus:ring-emerald-500' : 'border-amber-500/50 focus:ring-amber-500') 
                  : 'border-[#30363d] focus:ring-blue-500'
              }`}
            />
            
            {/* Password Validation UI */}
            {!isLogin && showPasswordRequirements && (
              <div className="mt-3 p-3 bg-[#0d1117] border border-[#30363d] rounded-lg animate-fade-in-up">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Requisitos de seguridad:</p>
                <div className="flex flex-wrap gap-2">
                  {passwordRequirements.map((req, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center space-x-1.5 px-2 py-1 rounded border transition-colors ${
                        req.met 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                          : 'bg-slate-800/50 border-slate-700 text-slate-500'
                      }`}
                    >
                      <svg className={`w-3 h-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] font-medium">{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit"
            onClick={handleRipple}
            disabled={!isLogin && !isPasswordValid}
            className={`ripple-container w-full font-bold py-3 rounded-lg mt-6 transition-all shadow-lg ${
              isLogin 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10' 
                : (isPasswordValid 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10' 
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed')
            }`}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrar Cuenta'}
          </button>
        </form>

        {/* Social Login Section - REDESIGNED */}
        <div className="mt-8 relative z-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#30363d]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#161b22] px-3 text-slate-500 font-mono tracking-widest">O continuar con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleRipple}
              className="ripple-container flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#0d1117] border border-[#30363d] rounded-xl hover:border-slate-500 hover:bg-[#1f242c] transition-all group"
            >
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">GitHub</span>
            </button>
            <button 
              type="button"
              onClick={(e) => {
                handleRipple(e);
                handleGoogleSignIn();
              }}
              className="ripple-container flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#0d1117] border border-[#30363d] rounded-xl hover:border-slate-500 hover:bg-[#1f242c] transition-all group"
            >
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.91s3.95-8.91 8.79-8.91c2.75 0 4.59 1.16 5.64 2.16l2.58-2.48c-1.66-1.55-3.82-2.49-8.22-2.49-6.62 0-12 5.38-12 12s5.38 12 12 12c6.91 0 11.5-4.86 11.5-11.7 0-.79-.08-1.39-.18-1.98z"/>
              </svg>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Google</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#30363d] text-center relative z-10">
          <p className="text-sm text-slate-400">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya eres miembro?'} {' '}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword('');
                setShowPasswordRequirements(false);
              }}
              className="text-blue-500 hover:underline font-semibold"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
