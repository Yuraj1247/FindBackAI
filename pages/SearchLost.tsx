import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Sparkles, Loader2, Filter, X, SlidersHorizontal, Palette, ChevronDown, Ghost, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { searchItems } from '../services/geminiService';
import { SearchResult, Item, ItemStatus } from '../types';
import { formatDateTime } from '../utils/dateUtils';

const SearchLost: React.FC = () => {
  const { items } = useItems();
  
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [isAiMode, setIsAiMode] = useState(false);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState<SearchResult[] | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'found' | 'claim_requested'>('found');
  const [timePreset, setTimePreset] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const activeItems = useMemo(() => items.filter(i => i.status !== 'received'), [items]);

  const categories = useMemo(() => Array.from(new Set(activeItems.map(i => i.category))).sort(), [activeItems]);
  const colors = useMemo(() => {
    const s = new Set<string>();
    activeItems.forEach(item => item.colors?.forEach(c => s.add(c)));
    return Array.from(s).sort();
  }, [activeItems]);
  const locations = useMemo(() => Array.from(new Set(activeItems.map(i => i.location))).sort(), [activeItems]);

  const filteredItems = useMemo(() => {
    return activeItems.filter(item => {
      const searchText = query.toLowerCase();
      const matchesText = 
        !searchText ||
        item.category.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText) ||
        (item.detectedText && item.detectedText.toLowerCase().includes(searchText));

      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesColor = !selectedColor || (item.colors && item.colors.includes(selectedColor));
      const matchesLocation = !selectedLocation || item.location === selectedLocation;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

      let matchesDate = true;
      const itemDate = new Date(item.date);
      const now = new Date();
      
      if (timePreset === 'today') {
         matchesDate = itemDate.toDateString() === now.toDateString();
      } else if (timePreset === 'week') {
         const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
         matchesDate = itemDate >= lastWeek;
      } else if (timePreset === 'month') {
         const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
         matchesDate = itemDate >= lastMonth;
      }

      if (dateRange.start) {
          matchesDate = matchesDate && itemDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
          const endDate = new Date(dateRange.end);
          endDate.setHours(23, 59, 59, 999);
          matchesDate = matchesDate && itemDate <= endDate;
      }

      return matchesText && matchesCategory && matchesColor && matchesLocation && matchesStatus && matchesDate;
    });
  }, [activeItems, query, selectedCategory, selectedColor, selectedLocation, selectedStatus, timePreset, dateRange]);

  const handleAiSearch = async () => {
    if (!query.trim()) return;
    setIsAiMode(true);
    setIsAiSearching(true);
    setAiResults(null);
    setShowFilters(false); 

    const matches = await searchItems(query, activeItems);
    
    const fullResults: SearchResult[] = matches.map(match => {
      const originalItem = activeItems.find(i => i.id === match.id);
      if (!originalItem) return null;
      return {
        ...originalItem,
        confidence: match.confidence,
        reason: match.reason
      };
    }).filter((i): i is SearchResult => i !== null);

    setAiResults(fullResults);
    setIsAiSearching(false);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedLocation('');
    setSelectedStatus('all');
    setTimePreset('all');
    setDateRange({ start: '', end: '' });
    setIsAiMode(false);
    setAiResults(null);
  };

  const displayItems = isAiMode ? (aiResults || []) : filteredItems;

  return (
    <div className="animate-fade-in pb-20">
      
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 sticky top-4 z-30 mb-8">
        
        <div className="flex flex-col gap-4">
           <div className="flex gap-3">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                      setQuery(e.target.value);
                      if(isAiMode) setIsAiMode(false); 
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAiSearch(); }}
                  placeholder="Describe it (e.g., 'Red Nike bag in gym')"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium transition-all"
                />
             </div>
             
             <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-4 rounded-2xl font-bold border flex items-center transition-all ${showFilters ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                   <SlidersHorizontal size={20} />
            </button>
            <button 
                  onClick={handleAiSearch}
                  disabled={isAiSearching || !query}
                  className="px-6 py-4 rounded-2xl font-bold bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white shadow-lg shadow-brand-500/20 active:scale-95 transition-all flex items-center whitespace-nowrap"
                >
                   {isAiSearching ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={20} className="mr-2 hidden md:block" /> AI Find</>}
            </button>
           </div>

           {showFilters && (
             <div className="pt-6 border-t border-slate-100 dark:border-slate-800 animate-slide-up grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category</label>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</label>
                    <select 
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                    >
                        <option value="">All Locations</option>
                        {locations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Time Found</label>
                    <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                        {['all', 'today', 'week', 'month'].map((t) => (
                             <button
                                key={t}
                                onClick={() => setTimePreset(t as any)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${timePreset === t ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-300'}`}
                             >
                                {t}
                             </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Color</label>
                    <div className="flex gap-2">
                        <select 
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                        >
                            <option value="">All Colors</option>
                            {colors.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button 
                             onClick={clearFilters}
                             className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-sm transition-colors"
                             title="Clear Filters"
                        >
                             <X size={18} />
                        </button>
                    </div>
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            {isAiMode ? <><Sparkles size={20} className="text-brand-500 mr-2" /> AI Matches</> : 'Gallery Results'}
         </h2>
         <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
             {displayItems.length} Found
         </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
         {isAiSearching && (
             <div className="col-span-full py-20 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-full shadow-xl shadow-brand-500/10 mb-6 border border-slate-100 dark:border-slate-800">
                    <Sparkles className="text-brand-500 animate-pulse-slow" size={40} />
                </div>
                <p className="text-lg font-bold text-white">Gemini is thinking...</p>
                <p className="text-sm text-slate-400 mt-1">Analyzing shapes, text, and semantics.</p>
             </div>
         )}

         {!isAiSearching && displayItems.length === 0 && (
             <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-700 animate-scale-in">
                 <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                     <Ghost size={32} />
                 </div>
                 <p className="text-lg font-bold text-white">No matching items</p>
                 <button onClick={clearFilters} className="text-brand-500 font-bold text-sm mt-2 hover:underline">Reset Filters</button>
             </div>
         )}

         {!isAiSearching && displayItems.map((item, index) => (
             <Link 
                to={`/item/${item.id}`} 
                key={item.id} 
                className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/20 animate-slide-up flex flex-col"
                style={{ animationDelay: `${index * 50}ms` }}
             >
                 <div className="h-60 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                     <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     
                     <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                         {isAiMode && (item as SearchResult).confidence && (
                            <div className="bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
                                <div className={`w-1.5 h-1.5 rounded-full ${(item as SearchResult).confidence > 80 ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`}></div>
                                <span className="text-[10px] font-bold text-white">{(item as SearchResult).confidence}% Match</span>
                            </div>
                         )}
                         <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-sm border ${item.status === 'found' ? 'bg-green-500/90 text-white border-green-400' : 'bg-amber-500/90 text-white border-amber-400'}`}>
                             {item.status.replace('_', ' ')}
                         </div>
                     </div>
                 </div>

                 <div className="p-5 flex flex-col flex-1">
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors truncate">{item.category}</h3>
                     
                     {isAiMode && (item as SearchResult).reason ? (
                         <div className="mb-4 bg-brand-900/20 border border-brand-900/30 p-2.5 rounded-xl">
                            <p className="text-xs text-brand-300 italic">"{(item as SearchResult).reason}"</p>
                         </div>
                     ) : (
                         <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{item.description}</p>
                     )}

                     <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-auto">
                         <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                             <MapPin size={14} className="mr-2 text-brand-500" />
                             <span className="truncate font-medium">{item.location}</span>
                         </div>
                         <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                             <Clock size={14} className="mr-2 text-brand-500" />
                             <span className="font-medium">{formatDateTime(item.date)}</span>
                         </div>
                     </div>
                 </div>
             </Link>
         ))}

      </div>
    </div>
  );
};

export default SearchLost;