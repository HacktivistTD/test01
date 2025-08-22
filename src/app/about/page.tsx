'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X, Star, Award, Users, Shield, Globe, MessageCircle } from 'lucide-react';

// Custom hook for scroll animation
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

// Driver Info Popup Component
const DriverInfoPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
        className=" rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full  hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className=" p-8 rounded-t-3xl text-center">
          <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Our Professional Drivers</h2>
          <p className="text-yellow-100">Excellence in Every Journey</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Proficiency */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">English Speaking</h3>
                <p className="text-gray-600 text-sm">All our drivers are fluent in English, ensuring clear communication throughout your journey.</p>
              </div>
            </div>

            {/* Discipline */}
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Disciplined & Professional</h3>
                <p className="text-gray-600 text-sm">Punctual, courteous, and committed to providing exceptional service at all times.</p>
              </div>
            </div>

            {/* Tourist License */}
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl md:col-span-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Government Certified Tourist Drivers</h3>
                <p className="text-gray-600 text-sm">Each driver holds a special <strong>Tourist Driving License</strong> issued by the Sri Lankan government, ensuring they meet the highest standards for tourist transportation and possess extensive knowledge of local attractions, history, and culture.</p>
              </div>
            </div>

            {/* Communication Skills */}
            <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl md:col-span-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MessageCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Local Guides & Storytellers</h3>
                <p className="text-gray-600 text-sm">Beyond driving, our team serves as knowledgeable local guides who can share fascinating stories about Sri Lankan culture, recommend authentic dining spots, and help you discover hidden gems off the beaten path.</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border border-yellow-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              Why Choose Our Drivers?
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Rigorous background checks and safety training</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Regular vehicle maintenance and safety inspections</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>24/7 customer support and emergency assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Continuous professional development and training</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AboutPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const fadeInUp = useScrollAnimation();
  const slideInLeft = useScrollAnimation();
  const slideInRight = useScrollAnimation();

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-black rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-yellow-400/30">
              ✨ Since 2015
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl text-black font-bold  bg-clip-text  mb-8 leading-tight">
            About <span className="">Aruba Cab</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-green-500 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Your trusted partner for exploring the beauty and culture of Sri Lanka — one smooth ride at a time.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section
        ref={fadeInUp.ref}
        className="py-20 px-6"
      >
        <motion.div
          variants={variants}
          initial="hidden"
          animate={fadeInUp.controls}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 p-12 rounded-3xl shadow-2xl border border-yellow-200/50 backdrop-blur-sm">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Founded in <strong className="text-yellow-600">2015</strong>, <strong className="text-blue-600">Aruba Cab Services</strong> began with a simple vision: to provide reliable, comfortable, and personalized cab services for tourists exploring the enchanting island of Sri Lanka.
              </p>
              <p className="text-lg">
                What started as a small family-run operation has grown into one of the most trusted names in Sri Lankan tourism. Today, we proudly serve thousands of travelers every year with our fleet of modern, well-maintained vehicles and a passionate team of professional drivers who are more than just chauffeurs — they &apos;re your local guides and cultural ambassadors.
              </p>
              <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mission */}
          <motion.div
            ref={slideInLeft.ref}
            variants={variants}
            initial="hidden"
            animate={slideInLeft.controls}
            className="group"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-2xl shadow-xl h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-blue-400/30">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                To deliver seamless, safe, and memorable travel experiences by combining comfort, professionalism, and local expertise — ensuring every journey feels like home.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            ref={slideInRight.ref}
            variants={variants}
            initial="hidden"
            animate={slideInRight.controls}
            className="group"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-8 rounded-2xl shadow-xl h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-teal-400/30">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
              <p className="text-teal-100 leading-relaxed text-lg">
                To be the most trusted and preferred cab service across Sri Lanka, recognized for excellence in customer service, sustainability, and cultural connection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-16"
        >
          Our Core Values
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Trust', 
              desc: 'We build lasting relationships through honesty, transparency, and unwavering reliability in every interaction.',
              icon: '🔐',
              color: 'from-purple-400 to-purple-600'
            },
            { 
              title: 'Comfort', 
              desc: 'Modern, pristine, and air-conditioned vehicles equipped with all amenities for the most relaxing ride.',
              icon: '🚗',
              color: 'from-blue-400 to-blue-600'
            },
            { 
              title: 'Service', 
              desc: '24/7 dedicated support with drivers trained in hospitality excellence and advanced safety protocols.',
              icon: '🤝',
              color: 'from-green-400 to-green-600'
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className=" p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-yellow-300/50">
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Teaser */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Our Professional Team</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our drivers aren&apos;t just professionals — they&apos;re storytellers, cultural guides, and ambassadors of Sri Lankan hospitality.
              </p>
              <motion.button
                onClick={() => setIsPopupOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg border-2 border-white/20 backdrop-blur-sm"
              >
                Learn More About Our Drivers
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-shadow-green-500">
            Ready to Explore with Us?
          </h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Whether it&apos;s a city tour, cultural expedition, or a cross-country adventure, we&apos;re here to make your Sri Lankan journey absolutely unforgettable.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-12 py-5 rounded-full shadow-2xl transition-all duration-300 text-lg border-2 border-yellow-300/30"
          >
            🚖 Book Your Adventure Today
          </motion.button>
        </motion.div>
      </section>

      {/* Driver Info Popup */}
      <DriverInfoPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </main>
  );
}