'use client';

import { useState, useRef } from 'react';
import { motion, useAnimate, useInView } from 'framer-motion';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const infoRef = useRef(null);
  const isInView = useInView(infoRef, { once: true, margin: '-100px' });
  const [scope, animate] = useAnimate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          contactNumber,
          country,
          message,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setName('');
        setEmail('');
        setContactNumber('');
        setCountry('');
        setMessage('');
      } else {
        alert('Failed to send message: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }

    const target = scope.current;
    if (target) {
      animate(target, { y: -10, opacity: 1 }, { duration: 0.4 });
      animate(target, { y: 0, opacity: 1 }, { duration: 0.3 });
    }

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen py-12 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you! Send us a message and we&apos;ll respond shortly.
          </p>
        </motion.div>

        {/* Layout with Map + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63327.88706648401!2d79.82836282887502!3d6.921922147037905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596c3b1e4f3d%3A0x6f8ffb0aefd4dc1d!2sColombo!5e0!3m2!1sen!2slk!4v1698238386651!5m2!1sen!2slk"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Contact Form */}
          <div ref={formRef}>
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl shadow-xl border border-gray-100 bg-white"
              >
                {/* Full Name */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="0761656983"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                {/* Country */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Sri Lanka"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-black mb-2">Your Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your trip or inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  📨 Send Message
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                ref={scope}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-green-700 mb-3">Message Sent!</h2>
                <p className="text-green-600 leading-relaxed">
                  Thank you, <span className="font-semibold">{name}</span>! We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
