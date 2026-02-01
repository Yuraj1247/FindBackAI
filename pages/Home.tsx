import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, ArrowRight, MapPin, Box, Smartphone, CreditCard, Key, Glasses, Watch, Briefcase, Bell, CheckCircle2, Filter, Calendar, SlidersHorizontal, X } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { formatDateTime } from '../utils/dateUtils';

const Home: React.FC = () => {
  const { items } = useItems();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items
      .filter(i => i.status !== 'received')
      .filter(item => {
        const matchesSearch = 
           !searchQuery || 
           item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        
        const matchesDate = !dateFilter || item.date.startsWith(dateFilter);

        return matchesSearch && matchesCategory && matchesDate;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items, searchQuery, selectedCategory, dateFilter]);

  const displayItems = filteredItems.slice(0, 8);

  const categoriesList = useMemo(() => Array.from(new Set(items.map(i => i.category))).sort(), [items]);

  const categories = [
    { name: 'Electronics', icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { name: 'IDs & Cards', icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { name: 'Keys', icon: Key, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    { name: 'Accessories', icon: Glasses, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
    { name: 'Watches', icon: Watch, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
    { name: 'Bags', icon: Briefcase, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  ];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setDateFilter('');
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-900/20 border border-brand-900/50 text-brand-400 text-xs font-bold uppercase tracking-widest animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              Live Dashboard
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight animate-slide-up">
              Welcome Back, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-white">Campus Finder.</span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-lg animate-slide-up-delay">
              Real-time feed of lost and found items. Report what you find, search for what you lost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in delay-100 pt-2">
                <Link 
                  to="/report" 
                  className="flex items-center justify-center space-x-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] hover:scale-[1.02] transition-all active:scale-95"
                >
                  <PlusCircle size={20} />
                  <span>Report Found</span>
                </Link>
                <Link 
                  to="/search" 
                  className="flex items-center justify-center space-x-3 bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95"
                >
                  <Search size={20} />
                  <span>Search Lost</span>
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div className="bg-neutral-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between h-40 group hover:border-brand-500/30 transition-colors">
                <div className="w-10 h-10 bg-brand-900/20 text-brand-500 rounded-xl flex items-center justify-center">
                   <Box size={20} />
                </div>
                <div>
                   <h3 className="text-3xl font-bold text-white">{filteredItems.length}</h3>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Items</p>
                </div>
             </div>
             <div className="bg-neutral-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between h-40 group hover:border-green-500/30 transition-colors">
                <div className="w-10 h-10 bg-green-900/20 text-green-500 rounded-xl flex items-center justify-center">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <h3 className="text-3xl font-bold text-white">94%</h3>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Recovery Rate</p>
                </div>
             </div>
             
        </div>
      </div>

      <section>
         <h2 className="text-lg font-bold text-white mb-4">Quick Categories</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
                <div 
                    key={i} 
                    onClick={() => navigate('/search')}
                    className={`p-4 rounded-2xl bg-neutral-900/50 border border-slate-800 hover:border-slate-600 cursor-pointer transition-all group hover:-translate-y-1 flex flex-col items-center justify-center text-center`}
                >
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.color} ${cat.border} border flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <cat.icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{cat.name}</span>
                </div>
            ))}
         </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <p className="text-sm text-slate-400 mt-1">Latest items reported by the community</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-slate-800">
                <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                   <input 
                      type="text" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search feed..." 
                      className="bg-transparent text-sm text-white placeholder-slate-600 pl-8 pr-3 py-2 outline-none w-32 md:w-48 focus:w-56 transition-all"
                   />
                </div>
                <div className="h-6 w-px bg-slate-800 mx-1"></div>
                <select 
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="bg-transparent text-xs font-bold text-slate-400 focus:text-white uppercase tracking-wide outline-none py-2 px-2 cursor-pointer hover:bg-white/5 rounded-lg"
                >
                   <option value="" className="bg-neutral-900 text-slate-400">All Types</option>
                   {categoriesList.map(c => <option key={c} value={c} className="bg-neutral-900">{c}</option>)}
                </select>
                <div className="relative">
                   <Calendar size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                   <input 
                      type="date" 
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-400 focus:text-white uppercase tracking-wide outline-none py-2 pl-7 pr-2 cursor-pointer hover:bg-white/5 rounded-lg w-28"
                   />
                </div>
                {(searchQuery || selectedCategory || dateFilter) && (
                   <button onClick={clearFilters} className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                      <X size={14} />
                   </button>
                )}
            </div>
        </div>
        
        {displayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-neutral-900 rounded-[2rem] border border-dashed border-slate-800 animate-fade-in text-center px-4">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
              <Filter size={40} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No items match filters</h3>
            <button 
              onClick={clearFilters}
              className="text-brand-500 font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayItems.map((item, index) => (
              <Link 
                to={`/item/${item.id}`} 
                key={item.id} 
                className="group bg-neutral-900 rounded-3xl p-3 border border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-700 transition-all duration-300 flex flex-col animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square w-full bg-slate-800 rounded-2xl overflow-hidden relative mb-4">
                  <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">View Details</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide text-brand-300 shadow-sm border border-white/10">
                    {item.status.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="px-1 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white text-lg truncate group-hover:text-brand-400 transition-colors flex-1">{item.category}</h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                  
                  <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center truncate max-w-[70%]">
                         <MapPin size={14} className="mr-1.5 text-brand-500 shrink-0" />
                         <span className="truncate">{item.location}</span>
                      </div>
                      <span className="font-mono text-[10px]">{formatDateTime(item.date).split(' ')[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;