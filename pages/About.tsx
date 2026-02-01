import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Brain, Target, Globe, Award, Sparkles, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      
      {/* Hero / Mission */}
      <div className="relative py-20 px-4 mb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={12} className="mr-2 text-brand-500" />
            Our Purpose
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Bringing Lost Things <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200">
              Back to the Right People.
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            FindBack AI is built for college campuses to make the lost and found process simple, reliable, and stress-free for everyone.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Items Recovered", value: "1,200+", icon: Target },
            { label: "Campus Users", value: "5,000+", icon: Users },
            { label: "Successful Returns", value: "94%", icon: Award },
            { label: "Active Zones", value: "12", icon: Globe },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-neutral-900/50 border border-slate-800 p-8 rounded-3xl text-center group hover:border-brand-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-900/20 group-hover:text-brand-500 transition-colors">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase font-semibold tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why We Built This */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-purple-600 rounded-[2.5rem] rotate-3 opacity-20 blur-lg"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
            alt="Students on campus" 
            className="relative rounded-[2.5rem] border border-slate-800 shadow-2xl"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why FindBack AI Exists
          </h2>
          <div className="space-y-4 text-lg text-slate-400 leading-relaxed">
            <p>
              On a busy college campus, small but important items like ID cards, chargers, notebooks, and wallets are lost almost every day. Most of the time, people don’t even know where to look.
            </p>
            <p>
              Traditional methods like notice boards or group messages are unorganized and easy to miss. Even when an item is found, it rarely reaches the right person.
            </p>
            <p>
              FindBack AI was created to fix this gap. By using image understanding and smart matching, the platform connects lost items with their owners quickly and in a structured way.
            </p>
          </div>
          <div className="pt-4">
            <Link
              to="/report"
              className="text-brand-500 font-bold flex items-center hover:text-brand-400 transition-colors"
            >
              See how it works <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-neutral-900 border-y border-slate-800 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What We Stand For</h2>
            <p className="text-slate-400">
              The values that guide how FindBack AI is built and used.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Privacy & Trust",
                desc: "Personal details are handled carefully and only accessed by authorized campus admins during verification."
              },
              {
                title: "Community Responsibility",
                desc: "The system works best when students and staff help each other by reporting found items honestly."
              },
              {
                title: "Practical AI",
                desc: "AI is used to understand context and details, making matches more accurate than simple keyword searches."
              }
            ].map((val, i) => (
              <div
                key={i}
                className="bg-black p-8 rounded-3xl border border-slate-800 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {val.title}
                </h3>
                <p className="text-slate-400 leading-relaxed relative z-10">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-b from-brand-900/20 to-black border border-brand-900/30 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-600/10 blur-[100px] pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Be Part of a Smarter Campus
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto relative z-10">
            If you find something on campus, report it. A small action can save someone a lot of stress.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
            <Link
              to="/report"
              className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-brand-600/20"
            >
              Report Found Item
            </Link>
            <Link
              to="/search"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl font-bold transition-all hover:scale-105 backdrop-blur-md"
            >
              Browse Lost Items
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
