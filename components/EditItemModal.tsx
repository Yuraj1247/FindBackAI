import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, MapPin, Tag, FileText, Calendar } from 'lucide-react';
import { Item } from '../types';
import { useItems } from '../context/ItemContext';

interface EditItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, isOpen, onClose }) => {
  const { updateItemDetails } = useItems();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    date: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        category: item.category,
        description: item.description,
        location: item.location,
        date: item.date.substring(0, 16)
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    updateItemDetails(item.id, {
      category: formData.category,
      description: formData.description,
      location: formData.location,
      date: formData.date 
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        
        <div className="bg-brand-50 dark:bg-slate-800/50 p-6 flex justify-between items-start border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              Edit Item Details
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Updating ID: <span className="font-mono">{item.id.slice(-6)}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Category</label>
            <div className="relative group">
                <Tag className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Description</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Location</label>
             <div className="relative group">
                <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Date & Time</label>
             <div className="relative group">
                <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                    type="datetime-local" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
             <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
             >
               Cancel
             </button>
             <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center justify-center"
             >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={20} />}
                Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;