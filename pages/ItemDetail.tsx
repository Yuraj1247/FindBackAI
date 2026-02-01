import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, FileText, Share2, ShieldCheck, Tag, AlertCircle, CheckCircle2, Clock, Check } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { ItemStatus } from '../types';
import ClaimModal from '../components/ClaimModal';
import { formatDateTime } from '../utils/dateUtils';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const { getItem } = useItems();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  
  const item = getItem(id || '');

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Item not found</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">This item may have been removed or claimed.</p>
        <Link to="/" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors">Back to Home</Link>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `LFIS: ${item.category} Found`,
      text: `Check out this ${item.category} found at ${item.location}.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const StatusBadge = ({ status }: { status: ItemStatus }) => {
    switch (status) {
      case 'found':
        return (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Found
          </span>
        );
      case 'claim_requested':
        return (
          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-800 flex items-center gap-2">
            <Clock size={12} />
            Claim Pending
          </span>
        );
      case 'verified':
        return (
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800 flex items-center gap-2">
            <CheckCircle2 size={12} />
            Verified Owner
          </span>
        );
      case 'received':
        return (
           <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <CheckCircle2 size={12} />
            Resolved
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 md:pb-10">
      <Link to="/search" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors font-medium px-4 md:px-0 mt-4 md:mt-0">
        <ArrowLeft size={20} className="mr-2" /> Back to Search
      </Link>

      <div className="bg-white dark:bg-slate-900 md:rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border-y md:border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-slate-100 dark:bg-slate-950 relative min-h-[40vh] lg:min-h-[600px] group">
          <img src={item.imageUrl} alt={item.category} className="absolute inset-0 w-full h-full object-contain bg-black/5 dark:bg-black/40 backdrop-blur-xl" />
          <img src={item.imageUrl} alt={item.category} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 lg:hidden"></div>
        </div>

        <div className="lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col relative">
          <div className="flex items-center justify-between mb-6">
            <StatusBadge status={item.status} />
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">ID: {item.id.slice(-6)}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">{item.category}</h1>
          
          <div className="space-y-8 flex-1">
            <div className="prose prose-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{item.description}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 space-y-5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start text-slate-700 dark:text-slate-300">
                    <MapPin className="text-brand-500 mr-4 mt-0.5" size={22} />
                    <div>
                        <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">Found Location</span>
                        <span className="font-semibold text-lg">{item.location}</span>
                    </div>
                </div>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-start text-slate-700 dark:text-slate-300">
                    <Calendar className="text-brand-500 mr-4 mt-0.5" size={22} />
                    <div>
                        <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">Date & Time</span>
                        <span className="font-semibold text-lg">{formatDateTime(item.date)}</span>
                    </div>
                </div>
                 {item.detectedText && (
                    <>
                    <div className="w-full h-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex items-start text-slate-700 dark:text-slate-300">
                        <FileText className="text-brand-500 mr-4 mt-0.5" size={22} />
                        <div>
                            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">Detected Text (OCR)</span>
                            <span className="font-mono text-base bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">{item.detectedText}</span>
                        </div>
                    </div>
                    </>
                )}
            </div>

            {item.status === 'claim_requested' && (
               <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
                  <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-800 dark:text-amber-300">Claim Under Review</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      A claim request has been submitted. The authority is verifying ownership proofs. You will be contacted at the provided number.
                    </p>
                  </div>
               </div>
            )}

            {item.status === 'verified' && (
               <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex gap-3">
                  <CheckCircle2 className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Claim Verified!</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Ownership verified. Please visit the admin desk at <strong>Main Block, Office 101</strong> to collect your item. Bring your ID.
                    </p>
                  </div>
               </div>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {item.status === 'found' ? (
                <button 
                  onClick={() => setIsClaimModalOpen(true)}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center justify-center text-lg"
                >
                    <ShieldCheck size={24} className="mr-3" />
                    Claim This Item
                </button>
            ) : (
                <button 
                  disabled
                  className="w-full bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold py-4 rounded-2xl cursor-not-allowed flex items-center justify-center text-lg"
                >
                    <ShieldCheck size={24} className="mr-3" />
                    {item.status === 'received' ? 'Item Returned to Owner' : 'Claim Processing'}
                </button>
            )}
            
             <button 
                onClick={handleShare}
                className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center"
             >
                {shareFeedback ? (
                    <>
                        <Check size={20} className="mr-3 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Link Copied!</span>
                    </>
                ) : (
                    <>
                        <Share2 size={20} className="mr-3" />
                        Share this item
                    </>
                )}
            </button>
          </div>
        </div>
      </div>

      <ClaimModal 
        item={item} 
        isOpen={isClaimModalOpen} 
        onClose={() => setIsClaimModalOpen(false)} 
      />
    </div>
  );
};

export default ItemDetail;