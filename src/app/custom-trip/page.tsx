'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { UserAuth } from '@/context/AuthContext'; // CORRECTED IMPORT
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { FaGoogle, FaUser, FaUsers } from 'react-icons/fa';

// Enhanced AI-like destination data with more details
const suggestionsData: Record<string, Array<{name: string, type: string, description: string}>> = {
  beach: [
    { name: 'Unawatuna Beach', type: 'Beach', description: 'Golden sandy beach perfect for swimming' },
    { name: 'Mirissa Beach', type: 'Beach', description: 'Whale watching and stunning sunsets' },
    { name: 'Arugam Bay', type: 'Beach', description: 'World-class surfing destination' },
    { name: 'Bentota Beach', type: 'Beach', description: 'Water sports and luxury resorts' },
    { name: 'Hikkaduwa Beach', type: 'Beach', description: 'Coral reefs and vibrant nightlife' },
  ],
  wildlife: [
    { name: 'Yala National Park', type: 'Wildlife', description: 'Famous for leopard sightings' },
    { name: 'Wilpattu National Park', type: 'Wildlife', description: 'Largest national park with diverse wildlife' },
    { name: 'Udawalawe National Park', type: 'Wildlife', description: 'Best place to see wild elephants' },
    { name: 'Sinharaja Forest Reserve', type: 'Wildlife', description: 'UNESCO World Heritage rainforest' },
  ],
  mountain: [
    { name: 'Ella Rock', type: 'Mountain', description: 'Spectacular hiking with panoramic views' },
    { name: 'Nuwara Eliya', type: 'Mountain', description: 'Cool climate and tea plantations' },
    { name: 'Haputale', type: 'Mountain', description: 'Breathtaking mountain vistas' },
    { name: 'Adams Peak', type: 'Mountain', description: 'Sacred pilgrimage site with sunrise views' },
  ],
  tea: [
    { name: 'Nuwara Eliya Tea Estates', type: 'Tea', description: 'Historic tea plantations and factories' },
    { name: 'Pedro Tea Estate', type: 'Tea', description: 'High-altitude premium tea experience' },
    { name: 'Dambatenne Tea Factory', type: 'Tea', description: 'Founded by Sir Thomas Lipton' },
  ],
  cultural: [
    { name: 'Sigiriya Rock Fortress', type: 'Cultural', description: 'Ancient rock fortress and frescoes' },
    { name: 'Temple of the Tooth', type: 'Cultural', description: 'Sacred Buddhist temple in Kandy' },
    { name: 'Dambulla Cave Temple', type: 'Cultural', description: 'Ancient cave paintings and statues' },
    { name: 'Galle Dutch Fort', type: 'Cultural', description: 'Colonial architecture by the sea' },
  ],
  adventure: [
    { name: 'Kitulgala White Water Rafting', type: 'Adventure', description: 'Thrilling river rafting experience' },
    { name: 'Zip-lining in Ella', type: 'Adventure', description: 'Soar through tea plantations' },
    { name: 'Hot Air Ballooning', type: 'Adventure', description: 'Aerial views of Sri Lankan landscape' },
  ]
};

const vehicleOptions = [
  { value: 'car', label: 'Car (1-4 passengers)', icon: '🚗', price: 'From $50/day' },
  { value: 'van', label: 'Van (5-8 passengers)', icon: '🚐', price: 'From $80/day' },
  { value: 'bus', label: 'Bus (9+ passengers)', icon: '🚌', price: 'From $120/day' },
  { value: 'luxury', label: 'Luxury Car', icon: '🏎️', price: 'From $150/day' },
];

export default function AIBasedTripPlanner() {
  const { user } = UserAuth(); // CORRECTED FUNCTION CALL
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{name: string, type: string, description: string}>>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Array<{name: string, type: string, description: string}>>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [vehicle, setVehicle] = useState('car');
  const [name, setName] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
    }
  }, [user]);

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const lowerCaseInput = input.toLowerCase();
      const matches = new Map<string, {name: string, type: string, description: string}>();

      Object.entries(suggestionsData).forEach(([keyword, places]) => {
        if (lowerCaseInput.includes(keyword)) {
          places.forEach(place => matches.set(place.name, place));
        }
      });

      Object.values(suggestionsData).flat().forEach(place => {
        if (place.name.toLowerCase().includes(lowerCaseInput)) {
          matches.set(place.name, place);
        }
      });

      setSuggestions(Array.from(matches.values()).slice(0, 6));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const handleAddPlace = (place: {name: string, type: string, description: string}) => {
    if (!selectedPlaces.some(p => p.name === place.name)) {
      setSelectedPlaces([...selectedPlaces, place]);
      setInput('');
      setSuggestions([]);
    }
  };

  const handleRemovePlace = (placeName: string) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p.name !== placeName));
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('idle');

    if (!user) {
        alert('Please log in to plan your trip.');
        return;
    }
    if (!selectedDate || !name || passengers < 1) {
      alert('Please fill in all required fields.');
      return;
    }
    if (selectedPlaces.length === 0) {
      alert('Please select at least one destination.');
      return;
    }

    setIsLoading(true);
    try {
        await addDoc(collection(db, 'bookings'), {
            userId: user.uid,
            name: name,
            passengers: passengers,
            userEmail: user.email,
            tripDate: selectedDate.toISOString(),
            destinations: selectedPlaces.map(p => ({ name: p.name, type: p.type })),
            vehicle: vehicle,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        setSubmissionStatus('success');
    } catch (error) {
        console.error("Error creating booking:", error);
        setSubmissionStatus('error');
    } finally {
        setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedPlaces.length === 0) {
      alert('Please select at least one destination before proceeding.');
      return;
    }
    if (currentStep === 2 && (!name || passengers < 1 || !selectedDate)) {
        alert('Please provide your name, number of passengers, and select a date.');
        return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen ">
      <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
      }} />

      <main className="relative z-10 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Perfect Trip
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 mb-4">
            ✨ AI-powered travel suggestions tailored just for you
          </p>
        </motion.div>

        {!user ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8 text-center"
            >
                <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to the Trip Planner</h2>
                <p className="text-foreground/80 mb-6">Please sign in to create and save your personalized Sri Lankan adventure.</p>
                <Button onClick={handleGoogleSignIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                    <FaGoogle />
                    Sign In with Google
                </Button>
            </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-4xl bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8 lg:p-10"
            >
                {/* Progress Steps */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-2">
                    {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                        currentStep >= step 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900' 
                            : 'bg-foreground/20 text-foreground/70'
                        }`}>
                        {step}
                        </div>
                        {step < 3 && (
                        <div className={`w-8 sm:w-16 h-1 mx-2 transition-all duration-300 ${
                            currentStep > step ? 'bg-yellow-400' : 'bg-foreground/20'
                        }`} />
                        )}
                    </div>
                    ))}
                </div>
                <div className="flex justify-around sm:justify-center sm:space-x-12 mt-2 text-xs sm:text-sm text-foreground/70 mb-8">
                    <span className={currentStep >= 1 ? 'text-yellow-500 font-semibold' : ''}>Destinations</span>
                    <span className={currentStep >= 2 ? 'text-yellow-500 font-semibold' : ''}>Details</span>
                    <span className={currentStep >= 3 ? 'text-yellow-500 font-semibold' : ''}>Confirm</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <AnimatePresence mode="wait">
                    {/* Step 1: Destinations */}
                    {currentStep === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
                            <div>
                                <label htmlFor="destinations" className="block text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
                                🎯 What interests you most?
                                </label>
                                <p className="text-foreground/70 text-sm sm:text-base mb-4">
                                Try: &quot;beach and wildlife&quot;, &quot;mountains and tea&quot;, &quot;cultural sites&quot;
                                </p>
                                
                                <div className="relative">
                                <input
                                    id="destinations"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Describe your ideal Sri Lankan adventure..."
                                    className="w-full rounded-xl border-2 border-foreground/20 bg-background/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-base sm:text-lg"
                                />
                                {isLoading && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
                                    </div>
                                )}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                {['beach paradise', 'wildlife safari', 'mountain adventure', 'cultural heritage'].map((suggestion) => (
                                    <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setInput(suggestion)}
                                    className="bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 border border-foreground/10"
                                    >
                                    {suggestion}
                                    </button>
                                ))}
                                </div>

                                <AnimatePresence>
                                {suggestions.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {suggestions.map((place, index) => (
                                        <motion.button
                                        key={place.name}
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleAddPlace(place)}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-background/50 border border-foreground/10 hover:border-yellow-400 rounded-xl p-3 sm:p-4 text-left transition-all duration-300 group"
                                        >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                            <h3 className="text-foreground font-semibold text-sm sm:text-base mb-1 group-hover:text-yellow-400 transition-colors">
                                                {place.name}
                                            </h3>
                                            <p className="text-foreground/70 text-xs sm:text-sm mb-2 leading-relaxed">
                                                {place.description}
                                            </p>
                                            <span className="inline-block bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                                                {place.type}
                                            </span>
                                            </div>
                                            <div className="ml-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold">
                                            +
                                            </div>
                                        </div>
                                        </motion.button>
                                    ))}
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {selectedPlaces.length > 0 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                                    Your Itinerary ({selectedPlaces.length})
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {selectedPlaces.map((place, index) => (
                                        <motion.div key={place.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.1 }} className="bg-foreground/5 border border-foreground/10 rounded-xl p-3 sm:p-4 flex items-center justify-between group">
                                        <div className="flex-1">
                                            <h3 className="text-foreground font-semibold text-sm sm:text-base">
                                            {place.name}
                                            </h3>
                                        </div>
                                        <button type="button" onClick={() => handleRemovePlace(place.name)} className="ml-3 text-foreground/50 hover:text-red-500 transition-colors p-1" aria-label={`Remove ${place.name}`}>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </button>
                                        </motion.div>
                                    ))}
                                    </div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Step 2: Details */}
                    {currentStep === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-lg font-bold text-foreground mb-3">
                                        <FaUser className="inline mr-2" /> Full Name
                                    </label>
                                    <input id="fullName" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border-2 border-foreground/20 bg-background/80 p-3 text-foreground focus:ring-yellow-400 focus:border-yellow-400" />
                                </div>
                                <div>
                                    <label htmlFor="passengers" className="block text-lg font-bold text-foreground mb-3">
                                       <FaUsers className="inline mr-2" /> Number of Passengers
                                    </label>
                                    <input id="passengers" type="number" min="1" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value, 10))} required className="w-full rounded-xl border-2 border-foreground/20 bg-background/80 p-3 text-foreground focus:ring-yellow-400 focus:border-yellow-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-lg font-bold text-foreground mb-4">📅 Select Your Trip Date</label>
                                    <div className="bg-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date()} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-lg font-bold text-foreground mb-4">🚗 Choose Your Vehicle</label>
                                    <div className="space-y-4">
                                        {vehicleOptions.map((option) => (
                                        <motion.label key={option.value} whileHover={{ scale: 1.02 }} className={`relative flex items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${vehicle === option.value ? 'border-yellow-400 bg-yellow-400/10' : 'border-foreground/20 bg-foreground/5 hover:border-foreground/40'}`}>
                                            <input type="radio" name="vehicle" value={option.value} checked={vehicle === option.value} onChange={(e) => setVehicle(e.target.value)} className="sr-only" />
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center"><span className="text-3xl mr-4">{option.icon}</span>
                                                    <div>
                                                        <h3 className="text-foreground font-semibold">{option.label}</h3>
                                                        <p className="text-foreground/70 text-sm">{option.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
                            <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8">
                                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">🎉 Trip Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b border-foreground/10"><span className="text-foreground/70 font-medium">👤 Name:</span><span className="text-foreground font-semibold">{name}</span></div>
                                    <div className="flex justify-between py-3 border-b border-foreground/10"><span className="text-foreground/70 font-medium">👥 Passengers:</span><span className="text-foreground font-semibold">{passengers}</span></div>
                                    <div className="flex justify-between py-3 border-b border-foreground/10"><span className="text-foreground/70 font-medium">📅 Travel Date:</span><span className="text-foreground font-semibold">{selectedDate?.toDateString()}</span></div>
                                    <div className="flex justify-between py-3 border-b border-foreground/10"><span className="text-foreground/70 font-medium">🚗 Vehicle:</span><span className="text-foreground font-semibold">{vehicleOptions.find(v => v.value === vehicle)?.label}</span></div>
                                    <div className="py-3">
                                        <span className="text-foreground/70 font-medium mb-3 block">📍 Destinations ({selectedPlaces.length}):</span>
                                        <div className="space-y-2">
                                            {selectedPlaces.map((place) => (
                                                <div key={place.name} className="bg-foreground/5 rounded-lg p-3 text-sm"><span className="font-semibold text-foreground">{place.name}</span> <span className="text-foreground/60">({place.type})</span></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                                <p className="text-yellow-600 dark:text-yellow-300 font-medium mb-2">📞 Next Steps</p>
                                <p className="text-foreground/80 text-sm leading-relaxed">After confirming, our travel experts will contact you within 24 hours with a detailed itinerary and exact pricing.</p>
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Navigation and Submission Feedback */}
                    <div className="pt-8 border-t border-foreground/10">
                        {submissionStatus === 'success' ? (
                            <div className="text-center p-4 bg-green-500/20 border border-green-500 rounded-lg">
                                <h3 className="font-bold text-green-600 dark:text-green-300">🎉 Trip Planned Successfully!</h3>
                                <p className="text-foreground/80">Our team will be in touch shortly with your full itinerary.</p>
                            </div>
                        ) : submissionStatus === 'error' ? (
                            <div className="text-center p-4 bg-red-500/20 border border-red-500 rounded-lg">
                                <h3 className="font-bold text-red-600 dark:text-red-300">😢 Something Went Wrong</h3>
                                <p className="text-foreground/80">We couldn't save your trip. Please try again or contact support.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    {currentStep > 1 && (
                                        <Button type="button" onClick={prevStep} variant="outline" className="w-full sm:w-auto">← Previous</Button>
                                    )}
                                </div>
                                <div className="flex-1 flex justify-end">
                                {currentStep < 3 ? (
                                    <Button type="button" onClick={nextStep} className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold">Continue →</Button>
                                ) : (
                                    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold">
                                    {isLoading ? 'Planning...' : '🎯 Confirm Trip Plan'}
                                    </Button>
                                )}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </motion.div>
        )}

        {/* Trust Indicators */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl">
            {[
                { icon: '🛡️', title: 'Secure Booking', desc: 'SSL encrypted' },
                { icon: '⭐', title: '500+ Reviews', desc: '4.9/5 rating' },
                { icon: '🎯', title: 'Custom Tours', desc: 'Tailored for you' },
                { icon: '💬', title: '24/7 Support', desc: 'Always available' },
            ].map((item) => (
                <motion.div key={item.title} whileHover={{ scale: 1.05, y: -5 }} className="bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 text-center group">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="text-foreground font-semibold mb-1 group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">{item.desc}</p>
                </motion.div>
            ))}
        </motion.div>
      </main>
    </div>
  );
}