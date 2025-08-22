"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, MapPin, Hotel, Calendar, Users, Star, ArrowRight, ChevronLeft, ChevronRight, Clock, Mail, Phone, User, MessageSquare, Car, MapPinIcon } from 'lucide-react';
import { packages, PackageType } from '@/data/tour-locations';




export default function AdvancedSpecialPackages() {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingType, setBookingType] = useState<'book' | 'quote'>('book');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    startDate: '',
    endDate: '',
    vehicleType: 'budget-car',
    notes: '',
    questions: ''
  });
  const modalRef = useRef(null);

  // Handle image navigation
  const nextImage = () => {
    if (selectedPackage) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => 
        prev === selectedPackage.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPackage) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPackage.images.length - 1 : prev - 1
      );
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPackage(null);
      }
    };
    
    if (selectedPackage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPackage]);

  const openPackageModal = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setCurrentImageIndex(0);
    setImageLoading(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setCurrentImageIndex(0);
    setShowBookingForm(false);
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      country: '',
      startDate: '',
      endDate: '',
      vehicleType: 'budget-car',
      notes: '',
      questions: ''
    });
  };

  const handleBookingClick = (type: 'book' | 'quote') => {
    setBookingType(type);
    setShowBookingForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) return;

    const subject = `${bookingType === 'book' ? 'Package Booking' : 'Quote Request'}: ${selectedPackage.title}`;
    
    const emailBody = `
Package Details:
- Package: ${selectedPackage.title}
- Duration: ${selectedPackage.duration}
- Price: ${selectedPackage.price}
- Request Type: ${bookingType === 'book' ? 'Booking' : 'Quote Request'}

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Country: ${formData.country}

Travel Details:
- Start Date: ${formData.startDate}
- End Date: ${formData.endDate}
- Vehicle Type: ${formData.vehicleType.replace('-', ' ').toUpperCase()}

Additional Information:
- Notes: ${formData.notes || 'No additional notes'}
- Questions: ${formData.questions || 'No questions'}

Places to Visit: ${selectedPackage.places.join(', ')}
Accommodations: ${selectedPackage.nightStops.join(', ')}
    `.trim();

    const mailtoLink = `mailto:thusharadilrukshatd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close the form after sending
    setShowBookingForm(false);
    
    // Show success message (you can customize this)
    alert(`Your ${bookingType === 'book' ? 'booking request' : 'quote request'} has been prepared! Please send the email that just opened.`);
  };

  return (
    <section className="py-20 ">
   

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Special Packages
          </h2>
          <p className="text-xl text-green-800  max-w-3xl mx-auto leading-relaxed">
            Curated experiences that go beyond ordinary travel. Discover Sri Lanka&apos;s hidden gems with our exclusive, handcrafted adventures.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group cursor-pointer transform transition-all duration-700 hover:scale-105"
              onClick={() => openPackageModal(pkg)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 hover:border-gray-500 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                  <div className={`absolute inset-0  opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ {pkg.rating}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="text-white w-12 h-12" />
                    </div>
                  </div>
                </div>
                

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-400 font-medium">{pkg.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>
                  
                  {/* Package details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.places.length} Places</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Hotel className="w-4 h-4" />
                      <span>{pkg.nightStops.length} Hotels</span>
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">From {pkg.price}</span>
                      <span className="text-gray-400 text-sm block">per person</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Modal */}
      {selectedPackage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div 
            ref={modalRef}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700 animate-scaleIn"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{selectedPackage.title}</h1>
                <p className="text-gray-400">{selectedPackage.subtitle}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Main Image Section */}
                <div className="lg:col-span-2">
                  <div className="relative rounded-xl overflow-hidden mb-6 group">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                      </div>
                    )}
                    
                    <Image
                      src={selectedPackage.images[currentImageIndex]}
                      alt={`${selectedPackage.title} - Image ${currentImageIndex + 1}`}
                      width={800}
                      height={384}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={() => setImageLoading(false)}
                    />
                    
                    {/* Image navigation */}
                    {selectedPackage.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Image indicators */}
                    {selectedPackage.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedPackage.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setImageLoading(true);
                              setCurrentImageIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {selectedPackage.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedPackage.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setImageLoading(true);
                            setCurrentImageIndex(index);
                          }}
                          className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'ring-2 ring-blue-500 scale-105' 
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            width={200}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Package Info */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.duration}</div>
                        <div className="text-gray-400 text-sm">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.groupSize}</div>
                        <div className="text-gray-400 text-sm">Group Size</div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-white mb-1">From {selectedPackage.price}</div>
                      <div className="text-gray-400">per person</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{selectedPackage.rating}</span>
                        <span className="text-gray-400">/5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleBookingClick('book')}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                      >
                        Book This Package
                      </button>
                      <button 
                        onClick={() => handleBookingClick('quote')}
                        className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 py-3 rounded-lg font-semibold transition-all duration-300"
                      >
                        Request Custom Quote
                      </button>
                    </div>
                  </div>

                  {/* Places to Visit */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      Places to Visit
                    </h3>
                    <div className="space-y-2">
                      {selectedPackage.places.map((place, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accommodations */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-green-400" />
                      Accommodations
                    </h3>
                    <div className="space-y-2">
                      {selectedPackage.nightStops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Itinerary Section */}
              <div className="px-6 pb-6">
                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm mb-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-400" />
                    Day-by-Day Itinerary
                  </h3>
                  <div className="space-y-6">
                    {selectedPackage.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-purple-400 pl-6 relative">
                        <div className="absolute left-[-10px] top-2 w-4 h-4 bg-purple-400 rounded-full"></div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="bg-purple-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                              Day {day.day}
                            </span>
                            {day.title}
                          </h4>
                          <div className="space-y-2">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-start gap-3 text-gray-300">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">About This Experience</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedPackage.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking/Quote Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700 animate-scaleIn">
            {/* Form Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {bookingType === 'book' ? 'Book Package' : 'Request Quote'}
                </h2>
                <p className="text-gray-400">{selectedPackage.title}</p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    Travel Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Vehicle Type *
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="budget-car">Budget Car</option>
                      <option value="sedan-car">Sedan Car</option>
                      <option value="van">Van</option>
                      <option value="bus">Bus</option>
                    </select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Additional Information
                  </h3>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Special Notes or Requirements
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Questions or Comments
                    </label>
                    <textarea
                      name="questions"
                      value={formData.questions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Any questions about the package or additional information you'd like to share..."
                    />
                  </div>
                </div>

                {/* Package Summary */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Package Summary</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p><strong>Package:</strong> {selectedPackage.title}</p>
                    <p><strong>Duration:</strong> {selectedPackage.duration}</p>
                    <p><strong>Price:</strong> {selectedPackage.price} per person</p>
                    <p><strong>Group Size:</strong> {selectedPackage.groupSize}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:text-white hover:border-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    {bookingType === 'book' ? 'Send Booking Request' : 'Send Quote Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}