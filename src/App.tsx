/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hotel, 
  Utensils, 
  Users, 
  Baby, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  X, 
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Calculator,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { RESORTS, Resort, RoomOption } from './data';

interface FamilyConfig {
  id: string;
  name: string;
  adults: number;
  children: number;
  selectedRoomId: string | null;
}

export default function App() {
  const [selectedResortId, setSelectedResortId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'compare' | 'simulator' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulator State
  const [families, setFamilies] = useState<FamilyConfig[]>([
    { id: '1', name: 'Family 1', adults: 2, children: 2, selectedRoomId: null }
  ]);
  const [simulatorResortId, setSimulatorResortId] = useState<string>(RESORTS[0].id);
  const [dailyFoodBudget, setDailyFoodBudget] = useState<number>(100); // Per person per day
  const [activityBudget, setActivityBudget] = useState<number>(0); // Per person per trip

  const selectedResort = useMemo(() => 
    RESORTS.find(r => r.id === selectedResortId), 
    [selectedResortId]
  );

  const filteredResorts = useMemo(() => 
    RESORTS.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const simulatorResort = useMemo(() => 
    RESORTS.find(r => r.id === simulatorResortId)!, 
    [simulatorResortId]
  );

  const addFamily = () => {
    setFamilies([...families, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: `Family ${families.length + 1}`, 
      adults: 2, 
      children: 0, 
      selectedRoomId: null 
    }]);
  };

  const removeFamily = (id: string) => {
    if (families.length > 1) {
      setFamilies(families.filter(f => f.id !== id));
    }
  };

  const updateFamily = (id: string, updates: Partial<FamilyConfig>) => {
    setFamilies(families.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const totalTripCost = useMemo(() => {
    const baseCost = families.reduce((total, f) => {
      const room = simulatorResort.roomOptions.find(r => r.type === f.selectedRoomId);
      if (room) {
        let nightRate = room.pricePerNight;
        
        const extraAdults = Math.max(0, f.adults - 2);
        const kidsFee = (simulatorResort.id === 'moon-palace-the-grand' || simulatorResort.id === 'villa-del-palmar') ? 0 : f.children * 75;
        
        nightRate += (extraAdults * 150) + kidsFee;
        
        return total + (nightRate * 4); // 4 nights
      }
      return total;
    }, 0);

    // Add food costs if not all-inclusive
    const totalPeople = families.reduce((sum, f) => sum + f.adults + f.children, 0);
    
    let finalCost = baseCost;

    if (!simulatorResort.isAllInclusive) {
      const foodCost = totalPeople * dailyFoodBudget * 4;
      finalCost += foodCost;
    }

    // Add activity budget
    finalCost += (totalPeople * activityBudget);

    return finalCost;
  }, [families, simulatorResort, dailyFoodBudget, activityBudget]);

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">Cancun Family Trip 2026</h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-black/60">
              <span className="flex items-center gap-1"><Calendar size={14} /> June 17th - 21st, 2026</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> Cancun, Mexico</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={16} />
              <input 
                type="text" 
                placeholder="Search resorts..."
                className="pl-10 pr-4 py-2 bg-black/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-black/5 p-1 rounded-full">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-black/40'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('compare')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'compare' ? 'bg-white shadow-sm text-emerald-600' : 'text-black/40'}`}
              >
                Compare
              </button>
              <button 
                onClick={() => setViewMode('simulator')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'simulator' ? 'bg-white shadow-sm text-emerald-600' : 'text-black/40'}`}
              >
                Simulator
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-emerald-600' : 'text-black/40'}`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort, idx) => (
              <ResortCard 
                key={resort.id} 
                resort={resort} 
                index={idx}
                onClick={() => setSelectedResortId(resort.id)}
              />
            ))}
          </div>
        )}

        {viewMode === 'compare' && <ComparisonView resorts={RESORTS} />}

        {viewMode === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Simulator Controls */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold">Trip Simulator</h2>
                  <button 
                    onClick={addFamily}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                  >
                    <Plus size={14} /> Add Family
                  </button>
                </div>

                <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-3">Select Resort to Simulate</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {RESORTS.map(r => (
                      <button 
                        key={r.id}
                        onClick={() => setSimulatorResortId(r.id)}
                        className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                          simulatorResortId === r.id 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                          : 'bg-white text-black/60 border-black/5 hover:border-emerald-200'
                        }`}
                      >
                        {r.name.split(' ')[0]}...
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {families.map((family, idx) => (
                    <motion.div 
                      layout
                      key={family.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-[#FDFDFB] border border-black/5 rounded-2xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <input 
                          type="text" 
                          value={family.name}
                          onChange={(e) => updateFamily(family.id, { name: e.target.value })}
                          className="bg-transparent font-serif font-bold text-lg focus:outline-none border-b border-transparent focus:border-emerald-500"
                        />
                        <button 
                          onClick={() => removeFamily(family.id)}
                          className="text-black/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Adults</label>
                            <div className="flex items-center gap-3">
                              <button onClick={() => updateFamily(family.id, { adults: Math.max(1, family.adults - 1) })} className="p-1 bg-black/5 rounded-lg">-</button>
                              <span className="font-bold">{family.adults}</span>
                              <button onClick={() => updateFamily(family.id, { adults: family.adults + 1 })} className="p-1 bg-black/5 rounded-lg">+</button>
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Kids</label>
                            <div className="flex items-center gap-3">
                              <button onClick={() => updateFamily(family.id, { children: Math.max(0, family.children - 1) })} className="p-1 bg-black/5 rounded-lg">-</button>
                              <span className="font-bold">{family.children}</span>
                              <button onClick={() => updateFamily(family.id, { children: family.children + 1 })} className="p-1 bg-black/5 rounded-lg">+</button>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Select Room Type</label>
                          <select 
                            value={family.selectedRoomId || ''}
                            onChange={(e) => updateFamily(family.id, { selectedRoomId: e.target.value })}
                            className="w-full bg-white border border-black/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            <option value="">Choose a room...</option>
                            {simulatorResort.roomOptions.map(opt => (
                              <option key={opt.type} value={opt.type}>
                                {opt.type} - ${opt.pricePerNight}/night (Cap: {opt.capacity})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulator Results */}
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-3xl p-8 sticky top-24 shadow-xl shadow-emerald-900/20">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <Calculator size={20} /> Trip Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-emerald-100/60">
                    <span>Resort</span>
                    <span className="font-bold text-white">{simulatorResort.name.split(' ')[0]}...</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-100/60">
                    <span>Duration</span>
                    <span className="font-bold text-white">4 Nights</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-100/60">
                    <span>Total Families</span>
                    <span className="font-bold text-white">{families.length}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="space-y-2">
                    {families.map(f => {
                      const room = simulatorResort.roomOptions.find(r => r.type === f.selectedRoomId);
                      return (
                        <div key={f.id} className="flex justify-between text-xs">
                          <span className="opacity-60">{f.name}</span>
                          <span>{room ? `$${(room.pricePerNight * 4).toLocaleString()}` : '$0'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 mb-8">
                  <div className="flex justify-between items-end mb-1">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-300">Estimated Total</span>
                    {!simulatorResort.isAllInclusive && (
                      <span className="text-[10px] text-emerald-100/60 italic">Includes Food Est.</span>
                    )}
                  </div>
                  <div className="text-4xl font-serif font-bold">${totalTripCost.toLocaleString()}</div>
                  <p className="text-[10px] opacity-40 mt-2 italic">*Estimates based on current research. Taxes/fees not included.</p>
                </div>

                {!simulatorResort.isAllInclusive && (
                  <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Daily Food Budget</label>
                      <span className="text-xs font-bold">${dailyFoodBudget}/person</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="10"
                      value={dailyFoodBudget}
                      onChange={(e) => setDailyFoodBudget(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-[9px] opacity-50 mt-2 leading-tight">
                      Adjust based on expected restaurant spending (Garza/Villa are not AI by default in this simulation).
                    </p>
                  </div>
                )}

                <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Activity Budget</label>
                    <span className="text-xs font-bold">${activityBudget}/person</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    step="25"
                    value={activityBudget}
                    onChange={(e) => setActivityBudget(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-[9px] opacity-50 mt-2 leading-tight">
                    Budget for extra activities like bowling, spa, or tours (AVA's premium activities are ~$45/pp).
                  </p>
                </div>

                <a 
                  href={simulatorResort.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-emerald-900 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all"
                >
                  Book This Config <ExternalLink size={16} />
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-black/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Resort Highlights</h4>
                <ul className="space-y-3">
                  {simulatorResort.highlights.map((h, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'map' && <MapView resorts={RESORTS} onSelectResort={setSelectedResortId} />}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedResort && (
          <ResortDetail 
            resort={selectedResort} 
            onClose={() => setSelectedResortId(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-black/5 mt-12 text-center text-sm text-black/40">
        <p>© 2026 Family Trip Planner • Research based on group chat suggestions</p>
        <p className="mt-2 italic">Prices and availability are subject to change. Please verify via direct booking links.</p>
      </footer>
    </div>
  );
}

const ResortCard: React.FC<{ resort: Resort, index: number, onClick: () => void }> = ({ resort, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={resort.image} 
          alt={resort.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
          {resort.priceRange}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-emerald-700 transition-colors">{resort.name}</h3>
        <p className="text-sm text-black/60 line-clamp-2 mb-4 flex-grow">{resort.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-black/70">
            <Utensils size={14} className="text-emerald-600" />
            <span>{resort.dining.restaurants.length} Restaurants</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-black/70">
            <Baby size={14} className="text-emerald-600" />
            <span>{resort.kidsClub.split(':')[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/5">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
            View Details <ChevronRight size={14} />
          </span>
          <div className="flex gap-1">
            {Array.from({ length: resort.priceRange === 'Luxury' ? 3 : resort.priceRange === 'Mid-Range' ? 2 : 1 }).map((_, i) => (
              <DollarSign key={i} size={12} className="text-emerald-600" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function ComparisonView({ resorts }: { resorts: Resort[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5">
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-black/40 border-b border-black/5 w-48">Feature</th>
              {resorts.map(r => (
                <th key={r.id} className="p-6 text-sm font-serif font-bold border-b border-black/5 min-w-[200px]">
                  {r.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Price Range</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-block w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      r.priceRange === 'Luxury' ? 'bg-purple-100 text-purple-700' : 
                      r.priceRange === 'Mid-Range' ? 'bg-blue-100 text-blue-700' : 
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {r.priceRange}
                    </span>
                    <span className="text-xs font-bold text-black/40">{r.priceRangeValue}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">All-Inclusive</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  {r.isAllInclusive ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Yes</span>
                  ) : (
                    <span className="text-black/40 italic">Optional / No</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Travel Time (Airport)</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 font-bold">
                  {r.travelTimeMinutes} mins
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Walkability</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    r.walkability === 'High' ? 'bg-emerald-100 text-emerald-700' :
                    r.walkability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {r.walkability}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Resort Size</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  {r.resortSize}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Kids Club Cost</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  {r.kidsClubCost}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Kids Club Hours</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 text-xs">
                  {r.kidsClubHours}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Kids Club Ages</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 text-xs">
                  {r.kidsClubAges}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Special Offers</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 text-xs font-bold text-emerald-700">
                  {r.specialOffers || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Vegetarian Food</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 text-xs leading-relaxed">
                  {r.dining.vegetarianFriendly}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Kids Club</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5 text-xs leading-relaxed">
                  {r.kidsClub}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 border-b border-black/5 bg-black/[0.02]">Family Rooms</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6 border-b border-black/5">
                  <ul className="space-y-1">
                    {r.roomOptions.filter(opt => opt.capacity.includes('6') || opt.capacity.includes('8')).map((opt, i) => (
                      <li key={i} className="text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-emerald-500" /> {opt.type}
                      </li>
                    ))}
                    {r.roomOptions.filter(opt => opt.capacity.includes('6') || opt.capacity.includes('8')).length === 0 && (
                      <li className="text-[11px] text-black/40 italic text-center">Contact for group rooms</li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-black/60 bg-black/[0.02]">Action</td>
              {resorts.map(r => (
                <td key={r.id} className="p-6">
                  <a 
                    href={r.bookingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:underline"
                  >
                    Direct Booking <ExternalLink size={12} />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function MapView({ resorts, onSelectResort }: { resorts: Resort[], onSelectResort: (id: string) => void }) {
  const [hoveredItem, setHoveredItem] = useState<any>(null);

  // Bounds for Cancun area
  const minLat = 21.0;
  const maxLat = 21.25;
  const minLng = -86.9;
  const maxLng = -86.7;

  const project = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[700px]">
      <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-black/5 shadow-inner overflow-hidden relative p-8">
        {/* Stylized Coastline SVG Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M 20 100 Q 30 80 40 70 T 60 50 T 80 40 T 90 10" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="20" 
            className="text-emerald-200"
          />
        </svg>

        <div className="relative w-full h-full">
          {/* Grid lines for scale */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black/[0.02]" />
            ))}
          </div>

          {/* Landmarks */}
          {import('./data').then(m => m.LANDMARKS).then(landmarks => landmarks.map(l => {
            const pos = project(l.lat, l.lng);
            return (
              <motion.div
                key={l.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: pos.x, top: pos.y }}
                onMouseEnter={() => setHoveredItem(l)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`p-2 rounded-full shadow-sm border border-white ${
                  l.type === 'Airport' ? 'bg-blue-500' : 
                  l.type === 'City' ? 'bg-orange-500' : 
                  'bg-slate-400'
                } text-white`}>
                  {l.type === 'Airport' ? <ArrowRight size={12} className="-rotate-45" /> : <MapPin size={12} />}
                </div>
              </motion.div>
            );
          })) && null /* This is a hack because I can't await in component body easily without more state */}
          
          {/* Manual Landmarks since I can't await easily here */}
          {[
            { name: 'Airport (CUN)', lat: 21.0402, lng: -86.8732, type: 'Airport' },
            { name: 'Downtown', lat: 21.1619, lng: -86.8515, type: 'City' },
            { name: 'Isla Mujeres Ferry', lat: 21.1822, lng: -86.8041, type: 'Transport' }
          ].map(l => {
            const pos = project(l.lat, l.lng);
            return (
              <div 
                key={l.name} 
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-help"
                style={{ left: pos.x, top: pos.y }}
              >
                <div className="p-2 rounded-full bg-slate-200 text-slate-600 border border-white shadow-sm group-hover:bg-slate-300 transition-colors">
                  <MapPin size={12} />
                </div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {l.name}
                </div>
              </div>
            );
          })}

          {/* Resorts */}
          {resorts.map(r => {
            const pos = project(r.lat, r.lng);
            return (
              <motion.div
                key={r.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2, zIndex: 20 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: pos.x, top: pos.y }}
                onClick={() => onSelectResort(r.id)}
              >
                <div className="relative group cursor-pointer">
                  <div className="p-3 rounded-full bg-emerald-600 text-white shadow-lg border-2 border-white group-hover:bg-emerald-700 transition-colors">
                    <Hotel size={16} />
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl shadow-xl border border-black/5 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 pointer-events-none whitespace-nowrap">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{r.priceRange}</div>
                    <div className="text-xs font-bold">{r.name}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/5 text-[10px] space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-black/40 mb-1">Geography Legend</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-600" /> Resorts</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400" /> Landmarks</div>
          <div className="mt-4 pt-4 border-t border-black/5 italic opacity-60">
            North: Playa Mujeres (Secluded)<br/>
            East: Hotel Zone (Active)<br/>
            South: Riviera Maya (Resort Hub)
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="space-y-6 overflow-y-auto pr-2">
        <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">Location Context</h3>
          <div className="space-y-6">
            {resorts.map(r => (
              <div key={r.id} className="group cursor-pointer" onClick={() => onSelectResort(r.id)}>
                <h4 className="text-xs font-bold group-hover:text-emerald-600 transition-colors">{r.name}</h4>
                <p className="text-[11px] text-black/50 mt-1 leading-relaxed">{r.locationNote}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4">Accessibility Tip</h3>
          <p className="text-xs leading-relaxed opacity-80">
            Cancun is highly accessible via private transfers. Most resorts are within 20-40 minutes of the airport. 
            <br/><br/>
            <strong>Playa Mujeres</strong> (Garza Blanca/Villa del Palmar) is north of the city, offering more privacy but requiring a longer drive to the main Hotel Zone.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResortDetail({ resort, onClose }: { resort: Resort, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left: Image & Highlights */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          <img 
            src={resort.image} 
            alt={resort.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">{resort.name}</h2>
            <div className="flex flex-wrap gap-2">
              {resort.highlights.map((h, i) => (
                <span key={i} className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto bg-[#FDFDFB]">
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-2">Overview</h3>
            <p className="text-black/70 leading-relaxed">{resort.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center gap-2">
                  <Utensils size={14} /> Dining & Veg Options
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${resort.isAllInclusive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {resort.isAllInclusive ? 'All-Inclusive' : 'European Plan / AI Optional'}
                  </span>
                </div>
                <p className="text-sm text-black/80 mb-3">{resort.dining.vegetarianFriendly}</p>
                <div className="flex flex-wrap gap-2">
                  {resort.dining.restaurants.slice(0, 4).map((r, i) => (
                    <span key={i} className="text-[11px] bg-black/5 px-2 py-1 rounded border border-black/5">{r}</span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/5 rounded-2xl">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1">Travel Time</div>
                  <div className="text-sm font-bold">{resort.travelTimeMinutes} mins</div>
                </div>
                <div className="p-3 bg-black/5 rounded-2xl">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1">Walkability</div>
                  <div className="text-sm font-bold">{resort.walkability}</div>
                </div>
                <div className="p-3 bg-black/5 rounded-2xl">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1">Resort Size</div>
                  <div className="text-sm font-bold">{resort.resortSize}</div>
                </div>
                <div className="p-3 bg-black/5 rounded-2xl">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1">Kids Club</div>
                  <div className="text-sm font-bold">{resort.kidsClubCost}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center gap-2">
                <Baby size={14} /> Kids & Activities
              </h3>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Ages:</span>
                  <span className="text-xs font-bold">{resort.kidsClubAges}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Hours:</span>
                  <span className="text-xs font-bold">{resort.kidsClubHours}</span>
                </div>
              </div>
              <p className="text-sm text-black/80 mb-3">{resort.kidsClub}</p>
              <div className="flex flex-wrap gap-2">
                {resort.activities.slice(0, 4).map((a, i) => (
                  <span key={i} className="text-[11px] bg-black/5 px-2 py-1 rounded border border-black/5">{a}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center gap-2">
              <Hotel size={14} /> Room Options for Families
            </h3>
            {resort.specialOffers && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span className="text-sm font-bold text-emerald-800">{resort.specialOffers}</span>
              </div>
            )}
            <div className="space-y-3">
              {resort.roomOptions.map((opt, i) => (
                <div key={i} className="p-4 bg-white border border-black/5 rounded-2xl flex justify-between items-center group hover:border-emerald-500/30 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm">{opt.type}</h4>
                    <p className="text-[11px] text-black/50">{opt.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                      {opt.capacity}
                    </span>
                    <div className="text-xs font-bold mt-1">${opt.pricePerNight}/nt</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href={resort.bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm text-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2"
            >
              Book Direct Now <ExternalLink size={16} />
            </a>
            <button 
              onClick={onClose}
              className="flex-1 bg-black/5 text-black/60 py-4 rounded-2xl font-bold text-sm text-center hover:bg-black/10 transition-all"
            >
              Back to List
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

