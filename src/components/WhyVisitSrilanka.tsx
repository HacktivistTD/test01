"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe2, Mountain, Languages, HeartHandshake } from "lucide-react";

export default function WhyVisitSrilanka() {
  const reasons = [
    {
      title: "A Land of Endless Climates",
      description:
        "Sri Lanka is one of the few places on Earth where you can experience tropical beaches, misty mountains, dry plains, and lush rainforests all within a single day’s journey. From the golden shores of Mirissa to the cool hills of Nuwara Eliya, every corner feels like a new world.",
      icon: <Mountain className="w-10 h-10 text-green-500" />,
    },
    {
      title: "A Tapestry of Cultures",
      description:
        "With influences from ancient kingdoms, colonial heritage, and vibrant local traditions, Sri Lanka is a living museum of diverse cultures. Each region celebrates unique art, music, food, and festivals — offering visitors an unforgettable cultural immersion.",
      icon: <Globe2 className="w-10 h-10 text-amber-500" />,
    },
    {
      title: "Many Languages, Many Faiths",
      description:
        "Home to Sinhalese, Tamil, Moor, Burgher, and many other communities, Sri Lanka embraces a rich mix of languages and religions. Buddhism, Hinduism, Christianity, and Islam coexist harmoniously, creating a beautiful mosaic of unity in diversity.",
      icon: <Languages className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Peaceful & Welcoming",
      description:
        "Known as the 'Pearl of the Indian Ocean,' Sri Lanka is not just beautiful but also safe and peaceful. Its warm-hearted people, genuine smiles, and hospitality make every traveler feel at home.",
      icon: <HeartHandshake className="w-10 h-10 text-pink-500" />,
    },
  ];

  return (
    <section className="relative py-20 ">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 " />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-green-500"
        >
          Why Visit Sri Lanka?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-700 mb-14 max-w-3xl mx-auto"
        >
          More than just a destination, Sri Lanka is an experience of{" "}
          <span className="font-semibold ">nature</span>,{" "}
          <span className="font-semibold ">culture</span>, and{" "}
          <span className="font-semibold ">timeless beauty</span>.  
          Here&apos;s why it deserves a spot on your travel list.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
            >
              <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition border border-green-100 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-4">{reason.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-green-600">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
