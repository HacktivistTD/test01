"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/sri-lanka--ella-rock.jpg",
    title: "Explore Sri Lanka",
    subtitle: "with Aruba Cab Services",
    description:
      "Discover the pearl of the Indian Ocean with reliable, comfortable, and personalized cab services. From ancient temples to pristine beaches, we'll take you there in style and comfort.",
  },
  {
    image: "/surfing-in-arugambay.jpg",
    title: "Your Journey, Our Priority",
    subtitle: "Travel in Comfort",
    description:
      "Our professional drivers ensure safe, smooth, and relaxing rides while showing you Sri Lanka's hidden gems and must-see destinations.",
  },
  {
    image: "/sri-lanka-leopard-asian.jpg",
    title: "Unforgettable Experiences",
    subtitle: "Tailored Just for You",
    description:
      "Choose from customized travel plans that let you experience Sri Lanka's culture, history, and nature exactly the way you want.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />
          {/* Black overlay to improve text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          key={slides[current].title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg"
        >
          {slides[current].title}
        </motion.h1>

        <motion.h2
          key={slides[current].subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-2xl md:text-4xl font-semibold mb-4 text-white drop-shadow-lg"
        >
          {slides[current].subtitle}
        </motion.h2>

        <motion.p
          key={slides[current].description}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mb-6 text-lg md:text-xl text-white drop-shadow-lg"
        >
          {slides[current].description}
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105">
            Book Your Adventure
          </button>
          <button className="bg-transparent border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            Get Free Quote
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-yellow-400">1000+</h3>
            <p className="text-sm">Happy Customers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-yellow-400">24/7</h3>
            <p className="text-sm">Service Available</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-yellow-400">50+</h3>
            <p className="text-sm">Destinations Covered</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-yellow-400">5★</h3>
            <p className="text-sm">Average Rating</p>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-yellow-500" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
