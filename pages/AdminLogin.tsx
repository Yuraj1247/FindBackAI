import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid credentials. Please check your email and password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30 mb-4">
             <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Admin Portal</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Secure access for College Authorities</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 overflow-hidden relative">
            
            <div className="absolute top-0 right-0 left-0 bg-brand-50 dark:bg-brand-900/20 px-4 py-2 text-xs text-center text-brand-800 dark:text-brand-200 font-mono border-b border-brand-100 dark:border-brand-900/30">
              Demo Access: <b>admin@gmail.com</b> / <b>123</b>
            </div>

            <div className="p-8 pt-12">
              <form onSubmit={handleLogin} className="space-y-5 animate-slide-up">
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@college.edu"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium transition-all"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Password</label>
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium transition-all tracking-widest"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20 animate-shake">
                    <AlertCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading || !email || !password}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center justify-center mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <ArrowRight size={18} className="ml-2" /></>}
                </button>
              </form>
            </div>
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
                Authorized Personnel Only. System activity is monitored.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;