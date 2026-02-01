import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Camera, Brain, Zap, Mail, ArrowRight, Github, Twitter, Linkedin, Users, School, BookOpen, Star, Code2, Cpu, Database, Cloud } from 'lucide-react';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const LandingNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all">
             <Search className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-white text-xl tracking-tighter">FindBack AI</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link to="/report" className="hover:text-red-400 transition-colors">Report Found Item</Link>
          <Link to="/search" className="hover:text-red-400 transition-colors">Lost Item Gallery</Link>
          <button onClick={() => scrollToSection('about')} className="hover:text-red-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-red-400 transition-colors">Contact</button>
        </div>

        <div className="flex items-center space-x-4">
             <Link 
              to="/profile" 
              className="hidden md:block text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Admin Login
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-all hover:scale-105 active:scale-95"
            >
              Enter Campus App
            </Link>
        </div>
      </div>
    </nav>
  );
};

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-red-900/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-1.5 rounded shadow-lg shadow-red-600/20">
                 <Search className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg">FindBack AI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting our campus community. We help students and faculty recover lost belongings using advanced visual AI. No more lost causes.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/report" className="hover:text-red-400 transition-colors">Report Found Item</Link></li>
              <li><Link to="/search" className="hover:text-red-400 transition-colors">Lost Item Gallery</Link></li>
              <li><Link to="/profile" className="hover:text-red-400 transition-colors">Admin Portal</Link></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-red-400 transition-colors">About Project</button></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4">Connect</h4>
             <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-red-400 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-red-400 transition-colors"><Github size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-red-400 transition-colors"><Linkedin size={20} /></a>
             </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs text-slate-500">
          © 2024 FindBack AI. Built for the Campus Community.
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen font-sans text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <LandingNavbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>
            Campus Intelligence System
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight animate-slide-up">
            Lost on Campus? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">We've Got Your Back.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up-delay">
             Don't panic about that lost ID card or notebook. <strong>FindBack AI</strong> connects students and faculty to recover lost items instantly. One community, zero lost causes.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-scale-in w-full md:w-auto">
             <Link 
              to="/report" 
              className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center group w-full md:w-auto"
            >
              <Camera className="mr-2" size={20} /> I Found Something
            </Link>
            <Link 
              to="/search" 
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center group w-full md:w-auto"
            >
               <Search className="mr-2" size={20} /> I Lost Something
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">Why FindBack AI?</h2>
               <p className="text-slate-400">Revolutionizing how campuses handle lost property.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black p-8 rounded-3xl border border-white/10 hover:border-red-500/50 transition-colors">
                    <div className="w-14 h-14 bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                        <Brain size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">AI Powered Search</h3>
                    <p className="text-slate-400 leading-relaxed">
                        We use Gemini 3.0 Vision to understand images. Search "Blue Nike Bag" and we'll find it, even if the description says "Sport sack".
                    </p>
                </div>
                <div className="bg-black p-8 rounded-3xl border border-white/10 hover:border-red-500/50 transition-colors">
                    <div className="w-14 h-14 bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Real-Time Updates</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Items appear on the dashboard the second they are reported. Our live feed ensures you see new finds immediately.
                    </p>
                </div>
                 <div className="bg-black p-8 rounded-3xl border border-white/10 hover:border-red-500/50 transition-colors">
                    <div className="w-14 h-14 bg-green-900/20 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                        <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Secure Verification</h3>
                    <p className="text-slate-400 leading-relaxed">
                        No false claims. We require detailed proof of ownership and Admin verification before any item handover.
                    </p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">Powered By Next-Gen Tech</h3>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                      <Code2 size={40} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                      <span className="text-xs font-bold font-mono">React 19</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                      <Cpu size={40} className="text-slate-300 group-hover:text-purple-400 transition-colors" />
                      <span className="text-xs font-bold font-mono">Gemini 3.0</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                      <Cloud size={40} className="text-slate-300 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-xs font-bold font-mono">Tailwind</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                      <Database size={40} className="text-slate-300 group-hover:text-green-400 transition-colors" />
                      <span className="text-xs font-bold font-mono">Local-First</span>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-24 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Community Impact</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                        <div className="flex gap-1 text-yellow-500 mb-4">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="text-lg text-slate-300 italic mb-6">"I misplaced my laptop charger near the classroom and didn’t even remember where I last kept it. Someone had already reported it on FindBack AI, and I got it back the same day after verification."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold">AG</div>
                            <div>
                                <h4 className="font-bold text-white">Aman Gupta</h4>
                                <p className="text-xs text-slate-500">Computer Engineering</p>
                            </div>
                        </div>
                   </div>

                    <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                        <div className="flex gap-1 text-yellow-500 mb-4">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="text-lg text-slate-300 italic mb-6">“I lost my ID card and wallet during lectures and was worried about reissuing them. I found my item listed on FindBack AI, and the admin handled the verification properly before returning it.”</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">NP</div>
                            <div>
                                <h4 className="font-bold text-white">Neha Patel</h4>
                                <p className="text-xs text-slate-500">Cyber Security Department</p>
                            </div>
                        </div>
                   </div>
               </div>
          </div>
      </section>

      <section id="contact" className="py-24 bg-black border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <div className="bg-neutral-900/50 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                     <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                     <p className="text-slate-400 mb-8">Found a bug or have a suggestion for the college board? Let us know.</p>
                     
                     <div className="space-y-4">
                        <div className="flex items-center text-slate-300">
                           <Mail className="text-red-500 mr-3" size={20} />
                           support@findback.ai
                        </div>
                         <div className="flex items-center text-slate-300">
                           <ShieldCheck className="text-red-500 mr-3" size={20} />
                           Admin Portal Access (Faculty Only)
                        </div>
                     </div>
                  </div>

                  <form className="space-y-4">
                     <div>
                        <input type="text" placeholder="Name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                     </div>
                     <div>
                        <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                     </div>
                     <div>
                        <textarea rows={3} placeholder="Message" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"></textarea>
                     </div>
                     <button className="w-full bg-white text-black hover:bg-slate-200 font-bold py-3 rounded-xl transition-colors">
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;