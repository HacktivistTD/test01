// src/app/faq/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Phone, MessageCircle, Clock, MapPin, Users, Car, Shield, Star } from 'lucide-react';

// FAQ Data with categories
const faqCategories = {
  booking: {
    title: 'Booking & Reservations',
    icon: Phone,
    color: 'from-blue-500 to-blue-600',
    faqs: [
      {
        question: 'How can I book a cab with Aruba Cab Services?',
        answer: 'You can book our services through multiple channels: call us at +94 77 765 6999, WhatsApp us, use our online booking form, or contact us through social media. We provide 24/7 booking support for your convenience.'
      },
      {
        question: 'How far in advance should I book my tour?',
        answer: 'We recommend booking at least 24-48 hours in advance, especially during peak tourist seasons (December-April). However, we also accept last-minute bookings based on availability. For custom tours and multi-day packages, advance booking of 3-7 days is preferred.'
      },
      {
        question: 'Can I modify or cancel my booking?',
        answer: 'Yes, you can modify or cancel your booking. For modifications, please contact us at least 4 hours before your scheduled pickup. Cancellations made 24 hours in advance receive a full refund. Cancellations within 24 hours may incur charges depending on the circumstances.'
      },
      {
        question: 'Do you require advance payment?',
        answer: 'For day trips and airport transfers, payment can be made upon completion of service. For multi-day tours and custom packages, we may require a 30% advance payment to confirm the booking, with the balance payable upon completion.'
      }
    ]
  },
  services: {
    title: 'Services & Vehicles',
    icon: Car,
    color: 'from-green-500 to-green-600',
    faqs: [
      {
        question: 'What types of vehicles do you offer?',
        answer: 'We maintain a diverse fleet including economy cars (Toyota Axio, Nissan Sunny), SUVs (Toyota KDH, Nissan X-Trail), luxury vehicles (Toyota Camry, BMW), and vans for groups (Toyota Hiace, Mitsubishi Rosa). All vehicles are well-maintained, air-conditioned, and regularly serviced.'
      },
      {
        question: 'Are your drivers licensed and experienced?',
        answer: 'Absolutely! All our drivers hold valid government-issued Tourist Driving Licenses - a special certification for tourist transportation in Sri Lanka. They are fluent in English, professionally trained, and have extensive knowledge of local attractions, routes, and culture.'
      },
      {
        question: 'Do you provide airport pickup and drop-off services?',
        answer: 'Yes, we specialize in airport transfers to/from Bandaranaike International Airport (CMB). We offer meet-and-greet services at the arrivals hall, flight tracking for delays, and 24/7 availability. Our drivers will be waiting with a name board for easy identification.'
      },
      {
        question: 'Can you arrange custom tour itineraries?',
        answer: 'Definitely! We excel in creating personalized tour experiences. Share your interests, preferred destinations, budget, and duration, and we\'ll design a custom itinerary. Whether it\'s cultural sites, wildlife safaris, beach relaxation, or adventure activities, we tailor everything to your preferences.'
      }
    ]
  },
  pricing: {
    title: 'Pricing & Payments',
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
    faqs: [
      {
        question: 'How do you calculate your pricing?',
        answer: 'Our pricing is based on distance, duration, vehicle type, and service level. We offer transparent, competitive rates with no hidden charges. Prices include driver allowances, fuel, and tolls. For multi-day tours, accommodation and meals for the driver are included in the package.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash (LKR or USD), bank transfers, and digital payments. For international visitors, USD payments are welcome. We can also arrange payment through popular digital wallets and provide official receipts for all transactions.'
      },
      {
        question: 'Are there any additional charges I should know about?',
        answer: 'Our quoted prices are comprehensive and include most expenses. Additional charges may apply for: waiting time beyond agreed limits, route changes, late-night services (11 PM - 6 AM), and entrance fees to attractions (which are typically paid directly by guests).'
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes, we provide attractive discounts for groups of 6+ people, corporate bookings, and extended multi-day tours. We also have special rates for repeat customers and referrals. Contact us for customized group pricing based on your specific requirements.'
      }
    ]
  },
  safety: {
    title: 'Safety & Insurance',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    faqs: [
      {
        question: 'Are your vehicles insured?',
        answer: 'Yes, all our vehicles carry comprehensive insurance coverage including passenger liability insurance. We also maintain roadside assistance and emergency support services. Your safety and security are our top priorities throughout your journey.'
      },
      {
        question: 'What safety measures do you follow?',
        answer: 'We implement strict safety protocols: regular vehicle maintenance and safety inspections, GPS tracking in all vehicles, emergency contact procedures, first aid trained drivers, and 24/7 support hotline. We also follow all COVID-19 safety guidelines when required.'
      },
      {
        question: 'What happens in case of vehicle breakdown?',
        answer: 'In the unlikely event of a breakdown, we have emergency protocols in place. Our drivers carry emergency contact numbers, and we maintain a network of backup vehicles and partner services. A replacement vehicle will be arranged immediately to minimize any inconvenience.'
      }
    ]
  },
  general: {
    title: 'General Information',
    icon: Users,
    color: 'from-teal-500 to-cyan-500',
    faqs: [
      {
        question: 'What areas do you cover in Sri Lanka?',
        answer: 'We provide services across the entire island of Sri Lanka. Popular destinations include Colombo, Kandy, Galle, Sigiriya, Anuradhapura, Nuwara Eliya, Ella, Yala National Park, Udawalawe, Arugam Bay, and many more. Our drivers are familiar with both popular tourist spots and hidden gems.'
      },
      {
        question: 'Do you provide English-speaking drivers?',
        answer: 'Yes, all our drivers are fluent in English and can communicate effectively with international visitors. Many also speak basic German, French, or other languages. They\'re not just drivers but also serve as local guides, sharing knowledge about Sri Lankan culture, history, and attractions.'
      },
      {
        question: 'Can you help with hotel bookings and activity arrangements?',
        answer: 'While our primary service is transportation, we\'re happy to assist with recommendations and connections for hotel bookings, restaurant reservations, activity bookings, and local experiences. Our local expertise helps you make the most of your Sri Lankan adventure.'
      },
      {
        question: 'What makes Aruba Cab Services different from others?',
        answer: 'Our unique advantages include: government-certified tourist drivers, 9+ years of experience since 2015, personalized service approach, transparent pricing, 24/7 support, well-maintained vehicle fleet, local cultural expertise, and a proven track record of satisfied international and local customers.'
      }
    ]
  }
};

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Filter FAQs based on search term
  const filteredCategories = Object.entries(faqCategories).map(([key, category]) => ({
    key,
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleItem = (categoryKey: string, faqIndex: number) => {
    const itemKey = `${categoryKey}-${faqIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey);
    } else {
      newOpenItems.add(itemKey);
    }
    setOpenItems(newOpenItems);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.values(faqCategories).flatMap(category => 
      category.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-700 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              ❓ Need Help?
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Find quick answers to common questions about our Sri Lanka cab services, tour packages, booking process, and more.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </motion.div>
          </motion.div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white text-center mb-16"
          >
            <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-blue-100 mb-6">Our friendly team is here to help you 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+94777656999"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Phone size={20} />
                Call Now: +94 77 765 6999
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/94777656999"
                className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <category.icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="text-white/80">{category.faqs.length} questions</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="p-6 space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const itemKey = `${category.key}-${faqIndex}`;
                    const isOpen = openItems.has(itemKey);

                    return (
                      <motion.div
                        key={faqIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: faqIndex * 0.05 }}
                        className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <button
                          onClick={() => toggleItem(category.key, faqIndex)}
                          className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-300 flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown size={20} className="text-gray-500" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && searchTerm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center shadow-xl"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No results found</h3>
              <p className="text-gray-600 mb-8">
                We couldn&apos;t find any FAQs matching &quot;{searchTerm}&quot;. Try different keywords or contact us directly.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-12 text-center text-gray-800"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Sri Lankan Adventure?</h2>
            <p className="text-lg mb-8 opacity-90">
              Book our reliable cab and tour services for an unforgettable experience in beautiful Sri Lanka.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.95 }}
                href="/packages"
                className="bg-gray-800 text-white font-bold px-8 py-4 rounded-2xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Car size={20} />
                View Tour Packages
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="bg-white text-gray-800 font-bold px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-200"
              >
                <MessageCircle size={20} />
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default FAQPage;