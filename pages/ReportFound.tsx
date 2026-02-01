import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader2, CheckCircle2, MapPin, Tag, FileText, X, Phone, Mail } from 'lucide-react';
import { analyzeImage, fileToGenerativePart } from '../services/geminiService';
import { useItems } from '../context/ItemContext';
import { Item } from '../types';

const ReportFound: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 16));
  
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setIsAnalyzing(true);
      try {
        const base64Data = await fileToGenerativePart(file);
        const result = await analyzeImage(base64Data);
        
        setCategory(result.category);
        setDescription(result.description);
        if (result.detectedText) setOcrText(result.detectedText);
        setAnalysisDone(true);
      } catch (error) {
        console.error("Analysis failed", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) return;

    const newItem: Item = {
      id: Date.now().toString(),
      imageUrl: imagePreview,
      category,
      description,
      location,
      date,
      detectedText: ocrText,
      status: 'found',
      colors: [],
      reporterPhone,
      reporterEmail
    };

    addItem(newItem);
    navigate('/'); 
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Help a Classmate</h1>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Found something? Snap a photo. We'll handle the rest.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            1/2
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300">
        <div className="relative group">
            {!imagePreview ? (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-80 bg-slate-50 dark:bg-slate-950/50 border-b border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all group-hover:border-brand-300 dark:group-hover:border-brand-700"
            >
                <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Camera size={40} />
                </div>
                <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg">Tap to take photo</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">or upload from gallery</p>
            </div>
            ) : (
            <div className="relative h-80 bg-black">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain opacity-90" />
                <button 
                type="button"
                onClick={() => {
                    setImagePreview(null);
                    setAnalysisDone(false);
                    setCategory('');
                    setDescription('');
                }}
                className="absolute top-4 right-4 bg-black/40 text-white p-2.5 rounded-full hover:bg-red-500 backdrop-blur-md transition-colors"
                >
                <X size={20} />
                </button>
                
                <div className="absolute bottom-4 left-4 right-4">
                    {isAnalyzing && (
                        <div className="bg-black/70 backdrop-blur-md text-white p-3 rounded-xl flex items-center space-x-3 border border-white/10 animate-slide-up">
                            <Loader2 size={20} className="animate-spin text-brand-400" />
                            <div>
                                <p className="text-sm font-semibold">AI is analyzing...</p>
                                <p className="text-xs text-white/60">Identifying object...</p>
                            </div>
                        </div>
                    )}
                    {analysisDone && (
                         <div className="bg-green-500/90 backdrop-blur-md text-white p-3 rounded-xl flex items-center space-x-3 shadow-lg shadow-green-500/20 animate-scale-in">
                            <CheckCircle2 size={20} />
                            <div>
                                <p className="text-sm font-semibold">Matched!</p>
                                <p className="text-xs text-white/80">Details auto-filled below</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
            <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileSelect}
            />
        </div>

        <form onSubmit={handleSubmit} className={`p-6 md:p-8 space-y-6 transition-opacity duration-500 ${!imagePreview ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">What is it?</label>
                <div className="relative group">
                    <Tag className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Blue Backpack, Casio Calculator"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium ${isAnalyzing ? 'animate-pulse' : 'border-slate-200 dark:border-slate-800'}`}
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Any distinguishable marks? Scratches? Stickers?"
                    className={`w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm leading-relaxed ${isAnalyzing ? 'animate-pulse' : 'border-slate-200 dark:border-slate-800'}`}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Found Location</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                        <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Library 2nd Floor, Café"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Time Found</label>
                    <input 
                        type="datetime-local" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="md:col-span-2">
                     <p className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">Your Details (Private)</p>
                     <p className="text-xs text-slate-400 mb-2">We only share this with Admin for verification.</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Number</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                        <input 
                            type="tel" 
                            value={reporterPhone}
                            onChange={(e) => setReporterPhone(e.target.value)}
                            placeholder="e.g. 9876543210"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium"
                            required
                        />
                    </div>
                </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Student/Staff Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                        <input 
                            type="email" 
                            value={reporterEmail}
                            onChange={(e) => setReporterEmail(e.target.value)}
                            placeholder="e.g. student@college.edu"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium"
                        />
                    </div>
                </div>
            </div>

            <button 
                type="submit"
                disabled={!imagePreview || isAnalyzing}
                className="w-full bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-500/30 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 mt-4 text-lg"
            >
                {isAnalyzing ? (
                    <>
                        <Loader2 className="animate-spin" size={24} />
                        <span>Processing...</span>
                    </>
                ) : (
                    <span>Submit & Help Out</span>
                )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default ReportFound;