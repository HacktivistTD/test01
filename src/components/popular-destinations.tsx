'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '@/data/destinations';

const badgeColors: Record<string, string> = {
  Historic: 'bg-yellow-400 text-black',
  Adventure: 'bg-green-400 text-black',
  Cultural: 'bg-pink-400 text-black',
  Wildlife: 'bg-red-400 text-black',
  Nature: 'bg-blue-400 text-black',
  Beach: 'bg-orange-400 text-black',
};

export default function PopularDestinations() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-black">Popular Destinations</h2>
          <p className="mt-4 text-lg text-green-400">
            Explore the most loved spots in Sri Lanka for your next adventure.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.article 
              key={dest.name}
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={dest.img}
                  alt={`View of ${dest.name}: ${dest.description}`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`${badgeColors[dest.badge]} absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {dest.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{dest.name}</h3>
                <p className="text-gray-600 mt-2">{dest.description}</p>
                
                <ul className="mt-4 space-y-2">
                  {dest.highlights.map((item) => (
                    <li key={item} className="flex items-center text-gray-700 text-sm">
                      <span className="mr-2">✔</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center text-gray-500 text-sm">
                  <span className="mr-4">🕒 {dest.duration}</span>
                  <span>📍 {dest.distance}</span>
                </div>

                <Link href={dest.link} className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  Plan Your Visit →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
