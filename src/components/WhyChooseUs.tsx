"use client";

import { motion } from "framer-motion";
import { Clock, Car, Map, Shield, Star, DollarSign } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const features = [
  {
    title: "24/7 Availability",
    desc: "Round-the-clock service with instant booking confirmation. We're always ready to pick you up, anytime, anywhere in Sri Lanka.",
    icon: Clock,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Luxury & Comfort",
    desc: "Premium air-conditioned vehicles with professional, English-speaking drivers who know Sri Lanka like the back of their hand.",
    icon: Car,
    gradient: "from-green-500 to-teal-600",
  },
  {
    title: "Custom Tours",
    desc: "Personalized itineraries crafted for you — pristine beaches, misty mountains, rich culture, or thrilling wildlife safaris.",
    icon: Map,
    gradient: "from-yellow-500 to-red-500",
  },
  {
    title: "Safe & Reliable",
    desc: "GPS-tracked vehicles, verified drivers, and comprehensive insurance for your peace of mind throughout your journey.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Local Expertise",
    desc: "Our drivers are local experts who share hidden gems, cultural insights, and the best local experiences.",
    icon: Star,
    gradient: "from-green-500 to-yellow-500",
  },
  {
    title: "Fair Pricing",
    desc: "Transparent, competitive rates with no hidden fees. Get the best value for premium transportation services.",
    icon: DollarSign,
    gradient: "from-teal-500 to-blue-600",
  },
];

export default function WhyChooseUs() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 "
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              Aruba Cab Services?
            </span>
          </h2>
          <p className="text-lg sm:text-xl  max-w-3xl mx-auto">
            Experience the difference with our premium transportation services
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 hover:border-gray-500 transition-all duration-500"
              >
                {/* Gradient Border Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-25 rounded-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10 p-6 flex flex-col items-center text-center">
                  <div
                    className={`text-4xl sm:text-5xl mb-4 sm:mb-6 p-4 rounded-full bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4 group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
