import React, { useState, useMemo } from 'react';
import { useItems } from '../context/ItemContext';
import { useAuth } from '../context/AuthContext';
import { Item, ItemStatus } from '../types';
import { Check, X, Box, User, Phone, FileText, CheckCircle2, Clock, Archive, LogOut, Trash2, Edit2, Mail, Search, Calendar, Filter, MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react';
import EditItemModal from '../components/EditItemModal';
import { formatDateTime } from '../utils/dateUtils';

const AdminDashboard: React.FC = () => {
  const { items, updateStatus, rejectClaim, deleteItem } = useItems();
  const { logout, userEmail } = useAuth();
  
  const [activeTab, setActiveTab] = useState<ItemStatus | 'all'>('claim_requested');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const locations = useMemo(() => Array.from(new Set(items.map(i => i.location))).sort(), [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (activeTab !== 'all' && item.status !== activeTab) return false;

      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        item.category.toLowerCase().includes(q) ||
        item.id.includes(q) ||
        (item.reporterEmail && item.reporterEmail.toLowerCase().includes(q)) ||
        (item.claimRequest?.claimerName && item.claimRequest.claimerName.toLowerCase().includes(q));

      const matchesDate = !filterDate || item.date.startsWith(filterDate);

      const matchesLocation = !filterLocation || item.location === filterLocation;

      return matchesSearch && matchesDate && matchesLocation;
    });
  }, [items, activeTab, searchQuery, filterDate, filterLocation]);

  const stats = {
    pending: items.filter(i => i.status === 'claim_requested').length,
    verified: items.filter(i => i.status === 'verified').length,
    total: items.length,
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this item?")) {
        deleteItem(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Admin Control</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-2">
            Logged in as <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">{userEmail}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end mr-4">
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">System Overview</span>
                 <div className="flex gap-3 mt-1">
                     <span className="text-sm font-bold text-amber-500">{stats.pending} Pending</span>
                     <span className="text-sm font-bold text-blue-500">{stats.verified} Verified</span>
                 </div>
             </div>
             <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
             <button 
                onClick={logout}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl text-sm font-bold flex items-center hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/30"
             >
                <LogOut size={16} className="mr-2" />
                Exit Portal
             </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="flex p-1 bg-slate-200 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar w-full md:w-auto">
                {[
                    { id: 'claim_requested', label: 'Pending Claims', icon: Clock },
                    { id: 'verified', label: 'Verified', icon: CheckCircle2 },
                    { id: 'found', label: 'Unclaimed', icon: Box },
                    { id: 'received', label: 'History', icon: Archive },
                    { id: 'all', label: 'All', icon: Filter }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center whitespace-nowrap transition-all ${
                            activeTab === tab.id 
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        <tab.icon size={14} className="mr-2" />
                        {tab.label}
                    </button>
                ))}
             </div>

             <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ID, Name, Category..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2.5 rounded-xl border transition-colors ${showFilters ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800 text-brand-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}
                >
                    <SlidersHorizontal size={20} />
                </button>
             </div>
          </div>

          {showFilters && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Filter by Date</label>
                      <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                              type="date" 
                              value={filterDate}
                              onChange={(e) => setFilterDate(e.target.value)}
                              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm"
                          />
                      </div>
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Filter by Location</label>
                      <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <select 
                              value={filterLocation}
                              onChange={(e) => setFilterLocation(e.target.value)}
                              className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm appearance-none"
                          >
                              <option value="">All Locations</option>
                              {locations.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                      </div>
                  </div>
                  <div className="flex items-end">
                      <button 
                          onClick={() => { setFilterDate(''); setFilterLocation(''); setSearchQuery(''); }}
                          className="text-sm font-bold text-brand-600 hover:underline px-2 py-2"
                      >
                          Clear All Filters
                      </button>
                  </div>
              </div>
          )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredItems.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Box size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No items found</h3>
                <p className="text-slate-500 dark:text-slate-400">Adjust filters or search terms.</p>
            </div>
        ) : (
            filteredItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 group">
                    
                    <div className="relative w-full md:w-48 h-48 md:h-auto bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden shrink-0">
                         <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover" />
                         <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide backdrop-blur-md text-white ${
                             item.status === 'found' ? 'bg-green-500/80' : 
                             item.status === 'claim_requested' ? 'bg-amber-500/80' : 
                             item.status === 'verified' ? 'bg-blue-500/80' : 'bg-slate-500/80'
                         }`}>
                             {item.status.replace('_', ' ')}
                         </div>
                    </div>

                    <div className="flex-1 py-3 pr-4 pl-3 md:pl-0 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                             <div>
                                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.category}</h3>
                                 <p className="text-xs font-mono text-slate-400">ID: {item.id}</p>
                             </div>
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingItem(item)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-brand-500"><Edit2 size={16}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{item.description}</p>
                                <div className="flex items-center text-xs text-slate-400 mt-2">
                                    <MapPin size={12} className="mr-1" /> {item.location}
                                    <span className="mx-2">•</span>
                                    <Clock size={12} className="mr-1" /> {formatDateTime(item.date)}
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800 text-xs">
                                {item.claimRequest ? (
                                    <>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">Active Claim</span>
                                            <span className="text-slate-400">{formatDateTime(item.claimRequest.requestDate)}</span>
                                        </div>
                                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.claimRequest.claimerName}</div>
                                        <div className="text-slate-500">{item.claimRequest.contactNumber}</div>
                                        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 italic text-slate-600 dark:text-slate-400 line-clamp-1">
                                            "{item.claimRequest.description}"
                                        </div>
                                    </>
                                ) : (
                                    <>
                                         <span className="font-bold text-slate-400 uppercase mb-1 block">Reporter Details</span>
                                         {item.reporterEmail ? (
                                             <div className="flex items-center text-slate-600 dark:text-slate-300"><Mail size={12} className="mr-1.5" />{item.reporterEmail}</div>
                                         ) : <span className="text-slate-400 italic">No reporter email</span>}
                                         {item.reporterPhone && (
                                             <div className="flex items-center text-slate-600 dark:text-slate-300 mt-1"><Phone size={12} className="mr-1.5" />{item.reporterPhone}</div>
                                         )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                             {item.status === 'claim_requested' && (
                                <>
                                    <button 
                                        onClick={() => rejectClaim(item.id)}
                                        className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-xs flex items-center"
                                    >
                                        <X size={14} className="mr-1.5" /> Reject Claim
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(item.id, 'verified')}
                                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center shadow-lg shadow-blue-500/20"
                                    >
                                        <Check size={14} className="mr-1.5" /> Verify Owner
                                    </button>
                                </>
                             )}
                             {item.status === 'verified' && (
                                <button 
                                    onClick={() => updateStatus(item.id, 'received')}
                                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center shadow-lg shadow-green-500/20"
                                >
                                    <Archive size={14} className="mr-1.5" /> Mark Returned
                                </button>
                             )}
                             {item.status === 'found' && (
                                 <span className="text-xs font-medium text-slate-400 py-2 flex items-center">
                                     <Box size={14} className="mr-1.5" /> Waiting for claim...
                                 </span>
                             )}
                              {item.status === 'received' && (
                                 <span className="text-xs font-bold text-green-500 py-2 flex items-center">
                                     <CheckCircle2 size={14} className="mr-1.5" /> Case Closed
                                 </span>
                             )}
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {editingItem && (
        <EditItemModal 
            item={editingItem} 
            isOpen={!!editingItem} 
            onClose={() => setEditingItem(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;