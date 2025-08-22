'use client';

import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Star, Camera, Compass, Mountain, Waves, TreePine, Users, Calendar } from 'lucide-react';

// Scroll-triggered animation hook
const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

type Package = {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  color: string;
  delay: number;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  rating: number;
};

function PackageCard({ pkg }: { pkg: Package }) {
  const { ref, controls } = useScrollReveal();
  const [hasMounted, setHasMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      initial="hidden"
      animate={hasMounted ? controls : 'hidden'}
      transition={{ delay: pkg.delay, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -16, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group  rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 flex flex-col relative will-change-transform border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${pkg.image})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div
          className={`absolute inset-0  opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
        />
        
        {/* Floating badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: pkg.delay + 0.3, type: 'spring' }}
            className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 shadow-lg"
          >
            <Star className="w-3 h-3 text-yellow-500" />
            {pkg.rating}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: pkg.delay + 0.5, type: 'spring' }}
            className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-2 rounded-full shadow-lg"
          >
            🌟 Popular
          </motion.div>
        </div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: pkg.delay + 0.4, type: 'spring' }}
          className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full shadow-lg"
        >
          {pkg.price}
        </motion.div>

        {/* Icon overlay */}
        <div className="absolute bottom-4 left-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
            <pkg.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-300">
              {pkg.title}
            </h2>
            <p className="text-teal-600 font-semibold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {pkg.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{pkg.description}</p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-500" />
              Trip Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((highlight, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: pkg.delay + 0.6 + index * 0.1 }}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border"
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">2-8 People</span>
            </div>
          </div>

          <motion.button
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0px 12px 30px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${pkg.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg`}
          >
            <Calendar className="w-5 h-5" />
            Book This Adventure
          </motion.button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"
      />
    </motion.div>
  );
}

export default function PackagesPage() {
  const packages: Package[] = [
    {
      title: 'South Coast Adventure',
      subtitle: 'Beaches, culture & heritage',
      description:
        'Explore stunning beaches, historical sites, and vibrant culture on Sri Lanka\'s south coast. Visit Galle Fort, Mirissa, and Tangalle for an unforgettable coastal experience.',
      price: 'LKR 15,000',
      duration: '3 Days / 2 Nights',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzisCbR7f05vQygno2-D2X5pEa9mDCZHp0uRJvwSXedoHmMHA6Z_wOJNiVViaaDP56VieoZQdk8wiETepfVrhWyU1l5yyE1ApyzGuyRJD_YSChnAnzF1i5XpZb9jergqI2G-We=w675-h390-n-k-no',
      color: 'from-blue-500 to-teal-500',
      delay: 0.2,
      icon: Waves,
      highlights: ['Galle Fort', 'Whale Watching', 'Beach Relaxation', 'Local Cuisine'],
      rating: 4.8,
    },
    {
      title: 'Cultural Triangle Tour',
      subtitle: 'Ancient cities & UNESCO wonders',
      description:
        'Visit UNESCO World Heritage sites like Sigiriya, Dambulla, and Anuradhapura — where ancient history and spirituality come alive in magnificent temples and ruins.',
      price: 'LKR 20,000',
      duration: '4 Days / 3 Nights',
      image: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQD2UJTpFwFB836aF79g2ig-xZXP31cXH0rFmpzang1uLBiZw1YKzrEL7-v0eBS2fUoOWA8azIaCb_psoiQD_fDtbeWZ4ahZ3n-hcbMtQ',
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
      icon: Compass,
      highlights: ['Sigiriya Rock', 'Dambulla Caves', 'Ancient Ruins', 'Temple Tours'],
      rating: 4.9,
    },
    {
      title: 'Hill Country Escape',
      subtitle: 'Tea, mist & mountain views',
      description:
        'Journey through scenic tea plantations, cascading waterfalls, and cool mountain air in Sri Lanka\'s breathtaking hill country. Ella, Nuwara Eliya, and Bandarawela await your discovery.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/61d0a114e3cfa.jpeg',
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
      icon: Mountain,
      highlights: ['Tea Plantations', 'Nine Arch Bridge', 'Little Adam\'s Peak', 'Train Rides'],
      rating: 4.7,
    },
    {
      title: 'Wildlife Safari at Yala',
      subtitle: 'Experience the wild side of Sri Lanka',
      description:
        'Embark on an unforgettable wildlife safari at Yala National Park. Spot magnificent leopards, gentle elephants, and diverse bird species in their pristine natural habitat.',
      price: 'LKR 22,000',
      duration: '3 Days / 2 Nights',
      image: 'https://lk.lakpura.com/cdn/shop/files/LK50C01000-02-E-1280-720_89288ce2-b128-4667-a572-ba5c0c55052a.jpg?v=1705488904&width=1445',
      color: 'from-emerald-600 to-teal-700',
      delay: 0.5,
      icon: TreePine,
      highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching', 'Safari Adventures'],
      rating: 4.6,
    },
    {
      title: 'Udawalawe Elephant Safari',
      subtitle: 'Experience the gentle giants of Sri Lanka',
      description:
        'Get up close with magnificent herds of wild elephants in their natural habitat. Udawalawe offers breathtaking scenery, abundant wildlife, and unforgettable safari adventures.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://lk.lakpura.com/cdn/shop/files/74.jpg?v=1653300776&width=3840',
      color: 'from-teal-500 to-cyan-600',
      delay: 0.6,
      icon: Users,
      highlights: ['Elephant Herds', 'Safari Drives', 'Wildlife Photography', 'Nature Walks'],
      rating: 4.5,
    },
    {
      title: 'Arugam Bay Surf Escape',
      subtitle: 'Surf, sun & sand',
      description:
        'Catch the perfect wave at Arugam Bay, one of the world\'s premier surf destinations. Enjoy sun-soaked days, perfect breaks, and vibrant beachside nightlife.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://lp-cms-production.imgix.net/2019-06/f0275838e5f1a765d23f3d1835d4c541-arugam-bay-beach.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75',
      color: 'from-blue-400 to-teal-500',
      delay: 0.7,
      icon: Waves,
      highlights: ['World-class Surfing', 'Beach Vibes', 'Sunset Views', 'Local Culture'],
      rating: 4.4,
    },
  ];

  // Enhanced floating orbs animation
  const floatingVariants = {
    float: {
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <main className="min-h-screen relative ">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 4 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-0"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 6 }}
      />

      {/* Hero Section */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 bg-white backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold shadow-lg border border-blue-200/50">
              ✨ Handcrafted Experiences Since 2015
            </span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-green-600">
              Epic Sri Lankan
            </span>
            <br />
            <span className="text-gray-800">Adventures</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Choose from our carefully curated tour packages designed to showcase the very best of Sri Lanka — where ancient culture meets pristine nature, and every journey becomes a treasured memory.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.05, boxShadow: '0px 15px 35px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
            >
              <Compass className="w-5 h-5" />
              Explore Packages
            </motion.a>
            
            <motion.a
              href="/custom-trip"
              whileHover={{ scale: 1.05, boxShadow: '0px 15px 35px rgba(234, 179, 8, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
            >
              <Star className="w-5 h-5" />
              Custom Tours
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="px-6 pb-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Adventure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each package is thoughtfully designed to give you the perfect blend of adventure, culture, and relaxation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.title} pkg={pkg} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 "></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/5 rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black/100 leading-tight">
              Can&apos;t Find Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Dream Adventure?
              </span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We specialize in creating completely customizable tours tailored to your interests, budget, and schedule. Tell us your dream itinerary, and we&apos;ll make it happen!
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="/custom-trip"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0px 20px 40px rgba(255,255,255,0.2)' 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-gray-800 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg"
            >
              <Compass className="w-6 h-6" />
              Build Custom Tour
            </motion.a>
            
            <motion.a
              href= "https://wa.me/94777656999"

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600  text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg"
            >
              💬 Chat With Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}