import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, PlusCircle, ShieldCheck, User, LogOut, Github, Twitter, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, label }: { to: string, label: string }) => (
    <Link 
        to={to} 
        className={`text-sm font-medium transition-colors hover:text-red-400 ${isActive(to) ? 'text-white' : 'text-slate-400'}`}
    >
        {label}
    </Link>
  );

  const MobileNavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link to={to} className="flex flex-col items-center justify-center w-full h-full space-y-1">
      <div className={`p-1.5 rounded-xl transition-all ${isActive(to) ? 'bg-red-500/10 text-red-500' : 'text-slate-500'}`}>
        <Icon size={24} strokeWidth={isActive(to) ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-medium ${isActive(to) ? 'text-white' : 'text-slate-500'}`}>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white flex flex-col">
      
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all">
                    <Search className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-white text-xl tracking-tighter font-display">FindBack AI</span>
            </Link>

            <div className="flex items-center space-x-8">
                <NavLink to="/dashboard" label="Home" />
                <NavLink to="/search" label="Lost Gallery" />
                <NavLink to="/report" label="Report Found" />
                <NavLink to="/about" label="About Us" />
            </div>

            <div className="flex items-center space-x-4">
                 <Link to="/profile" className={`flex items-center text-sm font-bold transition-colors ${isActive('/profile') ? 'text-red-500' : 'text-slate-400 hover:text-white'}`}>
                    <ShieldCheck size={18} className="mr-2" /> Admin
                 </Link>
                 <div className="w-px h-6 bg-slate-800 mx-2"></div>
                 <Link 
                    to="/"
                    className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-800"
                 >
                    <LogOut size={14} className="mr-2" />
                    Exit App
                 </Link>
            </div>
        </div>
      </nav>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-center">
         <span className="font-bold text-white text-lg font-display tracking-tight flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            FindBack AI
         </span>
      </div>

      <main className="flex-1 pt-20 md:pt-28 px-4 md:px-6 w-full max-w-7xl mx-auto pb-24 md:pb-8">
        {children}
      </main>

      <footer className="hidden md:block bg-neutral-950 border-t border-red-900/20 pt-16 pb-8 mt-24">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                     <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-red-600 p-1.5 rounded shadow-lg shadow-red-600/20">
                            <Search className="text-white w-4 h-4" />
                        </div>
                        <span className="font-bold text-white text-lg font-display">FindBack AI</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        The official campus lost and found intelligence system. 
                        Powered by Gemini 3.0 Vision.
                    </p>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-4 font-display">Navigation</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link to="/dashboard" className="hover:text-red-400">Home</Link></li>
                        <li><Link to="/search" className="hover:text-red-400">Lost Item Gallery</Link></li>
                        <li><Link to="/report" className="hover:text-red-400">Report Found Item</Link></li>
                        <li><Link to="/about" className="hover:text-red-400">About Us</Link></li>
                        <li><Link to="/profile" className="hover:text-red-400">Admin Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 font-display">Contact</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                         <li className="flex items-center"><Mail size={16} className="mr-2" /> help@findback.ai</li>
                         <li className="flex items-center"><ShieldCheck size={16} className="mr-2" /> Admin Block, Room 101</li>
                    </ul>
                    <div className="flex space-x-4 mt-6">
                        <Github size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
                        <Twitter size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="text-xs text-slate-500">
                    © 2024 FindBack AI. Built for the Community.
                </div>
                
            </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-900/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <div className="flex items-center justify-around h-16">
           <MobileNavItem to="/dashboard" icon={Home} label="Home" />
           <MobileNavItem to="/search" icon={Search} label="Search" />
           <div className="relative -top-5">
              <Link to="/report" className="flex items-center justify-center w-14 h-14 bg-red-600 rounded-full shadow-lg shadow-red-600/40 text-white">
                  <PlusCircle size={28} />
              </Link>
           </div>
           <MobileNavItem to="/profile" icon={User} label="Admin" />
           <MobileNavItem to="/about" icon={ShieldCheck} label="About" />
        </div>
      </div>
    </div>
  );
};

export default Layout;