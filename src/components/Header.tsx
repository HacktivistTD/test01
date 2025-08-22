'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

export default function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  // Google Sign-In using redirect
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  // Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Tour Packages', href: '/packages', description: 'Explore our Sri Lanka tour packages' },
    { name: 'AI Planner', href: '/custom-trip', description: 'Plan your trip with AI' },
    { name: 'About Us', href: '/about', description: 'Learn about Aruba Cab Services' },
    { name: 'Contact', href: '/contact', description: 'Contact Aruba Cab Services' }
  ];
  
  const contactInfo = {
    phone: '+94 77 765 6999',
    location: 'Morawaka, Sri Lanka',
    hours: '24/7 Service'
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 to-green-400 text-gray-900 py-2 px-4 text-sm hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center space-x-2 hover:underline font-medium">
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span className="font-medium">{contactInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span className="font-medium">{contactInfo.hours}</span>
            </div>
          </div>
          <div className="text-sm font-semibold">
            🚗 Sri Lanka&apos;s Premier Cab & Tour Service Since 2015
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Aruba Cab Services - Home">
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-xl shadow-lg">
              <span className="text-gray-900 font-black text-xl">🚗</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-foreground font-extrabold text-2xl tracking-tight group-hover:text-green-500 transition-colors">Aruba Cabs</span>
              <span className="text-foreground/70 text-xs font-medium hidden sm:block">Sri Lanka Tours & Transport</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-4 text-foreground font-medium" role="menubar">
              {navigationItems.map((item) => (
                <motion.li key={item.name} whileHover={{ y: -2 }} role="none">
                  <Link href={item.href} className="hover:text-green-500 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-foreground/5" title={item.description} role="menuitem">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {user ? (
              <div className="flex items-center gap-4">
                <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border-2 border-green-400" />
                <motion.button onClick={handleSignOut} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <LogOut size={16} />
                </motion.button>
              </div>
            ) : (
              <motion.button onClick={handleGoogleSignIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-full flex items-center gap-2">
                <LogIn size={16} />
                Login
              </motion.button>
            )}

            <motion.button onClick={toggleTheme} whileTap={{ scale: 0.95 }} className="bg-foreground/10 text-foreground p-3 rounded-xl">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-foreground/10 text-foreground p-3 rounded-xl"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={24} /></motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={24} /></motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-4 right-4 bg-background shadow-2xl rounded-2xl overflow-hidden z-50 md:hidden border border-foreground/10"
            >
              <nav className="p-4" role="navigation" aria-label="Mobile navigation">
                <ul role="menu" className="space-y-2">
                  {navigationItems.map((item) => (
                    <motion.li key={item.name} role="none">
                      <Link href={item.href} className="block px-4 py-3 text-foreground font-semibold text-lg hover:bg-foreground/5 rounded-xl" onClick={() => setMenuOpen(false)} role="menuitem">
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="border-t border-foreground/10 mt-4 pt-4">
                  {user ? (
                      <div className="flex items-center justify-between px-4">
                          <div className="flex items-center gap-3">
                              <img src={user.photoURL || ''} alt="user" className="w-10 h-10 rounded-full" />
                              <span className="font-semibold text-foreground">{user.displayName}</span>
                          </div>
                          <Button onClick={() => { handleSignOut(); setMenuOpen(false); }} variant="destructive">Logout</Button>
                      </div>
                  ) : (
                      <Button onClick={() => { handleGoogleSignIn(); setMenuOpen(false); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login with Google</Button>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
