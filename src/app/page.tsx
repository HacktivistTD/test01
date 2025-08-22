'use client';

import { motion, easeInOut } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpecialPackages from '@/components/SpecialPackages';
import PopularDestinations from '@/components/popular-destinations';
import ActivitiesPage from '@/components/Activities';
import WhyVisitSrilanka from '@/components/WhyVisitSrilanka';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';


export default function HomePage() {
 

 

  
 
   

 

  return (
    <div className="min-h-screen  ">

    <Hero />
    <ActivitiesPage />
    <WhyVisitSrilanka />
   

          {/* Special Packages Component */}
      <SpecialPackages />
        <WhyChooseUs />
      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 "
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What Our{' '}
              <span className="bg-green-400 bg-clip-text text-transparent">
                Travelers Say
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-green-600">
              Real experiences from our valued customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Sarah Johnson',
                country: 'United Kingdom',
                text: 'Aruba Cab made our Sri Lanka trip absolutely seamless. Our driver was punctual, incredibly kind, and knew all the best hidden spots. The vehicle was spotless and comfortable for our family of four.',
                rating: 5,
                avatar: '👩🏼‍💼'
              },
              {
                name: 'Raj Mehta',
                country: 'India',
                text: 'Luxurious ride quality, transparent pricing, and exceptional 24/7 customer support. The custom tour they arranged exceeded our expectations. Highly recommend for family tours!',
                rating: 5,
                avatar: '👨🏽‍💼'
              },
              {
                name: 'Emma Rodriguez',
                country: 'Spain',
                text: 'Professional service from start to finish. The driver was not just a chauffeur but a knowledgeable guide who enriched our Sri Lankan adventure with local stories and recommendations.',
                rating: 5,
                avatar: '👩🏻‍🦱'
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-green-400 text-lg">⭐</span>
                  ))}
                </div>

                <p className="italic text-foreground mb-6 text-sm sm:text-base leading-relaxed group-hover:text-foreground transition-colors">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-foreground text-base sm:text-lg group-hover:text-green-400 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {testimonial.country}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 "
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8"
          >
            <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              Ready to Explore
            </span>
            <br />
            <span className="text-foreground">Sri Lanka?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-xl text-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Book your premium cab experience today and let us handle the journey — so you can focus on creating unforgettable memories in paradise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.a
              href="/packages"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0px 20px 50px rgba(251, 191, 36, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
            >
              📞 Book Online Now
            </motion.a>

            <motion.a
              href="tel:+94777656999"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block bg-transparent border-2 border-green-400/50 backdrop-blur-sm text-foreground font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-green-400/10 hover:border-green-400 transition-all duration-300"
            >
              📱 Call Directly
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">📧</span>
              <span className="text-sm sm:text-base">arubacabs@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">📱</span>
              <span className="text-sm sm:text-base">+94 77 7656 999</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">⏰</span>
              <span className="text-sm sm:text-base">Available 24/7</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

  
    </div>
  );
}