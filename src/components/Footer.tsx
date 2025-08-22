// src/components/Footer.tsx
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube, FaPinterest, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/profile.php?id=61578136073686', 
      icon: FaFacebookF, 
      color: 'hover:text-blue-500',
      ariaLabel: 'Follow Aruba Cab Services on Facebook for updates and travel tips'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/arubacabs', 
      icon: FaInstagram, 
      color: 'hover:text-pink-500',
      ariaLabel: 'Follow us on Instagram for stunning Sri Lanka travel photos and stories'
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/94777656999', 
      icon: FaWhatsapp, 
      color: 'hover:text-green-500',
      ariaLabel: 'Contact Aruba Cab Services via WhatsApp for instant booking and support'
    },
    { 
      name: 'TikTok', 
      href: 'https://www.tiktok.com/@aruba_cabs', 
      icon: FaTiktok, 
      color: 'hover:text-white',
      ariaLabel: 'Watch our Sri Lanka travel videos and cab service content on TikTok'
    },
    { 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@aruba_cabs', 
      icon: FaYoutube, 
      color: 'hover:text-red-600',
      ariaLabel: 'Subscribe to our YouTube channel for Sri Lanka travel guides and testimonials'
    },
    { 
      name: 'Pinterest', 
      href: 'https://www.pinterest.com/aruba_cabs/', 
      icon: FaPinterest, 
      color: 'hover:text-red-700',
      ariaLabel: 'Find Sri Lanka travel inspiration and itinerary ideas on our Pinterest'
    },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about', description: 'Learn about our story and services' },
    { name: 'Tour Packages', href: '/packages', description: 'Explore our Sri Lanka tour packages' },
    { name: 'Book Now', href: '/book', description: 'Book your Sri Lanka cab service' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with our team' },
    { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
    { name: 'Terms & Conditions', href: '/terms', description: 'Our terms and conditions' },
    { name: 'Privacy Policy', href: '/privacy', description: 'Our privacy policy' },
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      text: '+94 77 765 6999',
      href: 'tel:+94777656999',
      label: 'Call us for immediate booking and support'
    },
    {
      icon: FaEnvelope,
      text: 'arubacabs@gmail.com',
      href: 'mailto:thusharadilrukshatd@gmail.com',
      label: 'Email us for inquiries and bookings'
    },
    {
      icon: FaMapMarkerAlt,
      text: 'Colombo, Sri Lanka',
      href: 'https://maps.google.com/?q=Colombo,Sri+Lanka',
      label: 'Our service area in Colombo, Sri Lanka'
    }
  ];

  const services = [
    'Airport Transfers Sri Lanka',
    'Colombo City Tours',
    'Cultural Triangle Tours',
    'Hill Country Excursions',
    'Wildlife Safari Tours',
    'Beach Holiday Transfers',
    'Wedding Transportation',
    'Corporate Travel Services'
  ];

  return (
    <footer className=" text-black pt-16 pb-8 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Aruba Cab Services
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Premium cab and tour services in Sri Lanka since 2015. Your trusted partner for exploring the pearl of the Indian Ocean with comfort, safety, and local expertise.
              </p>
              <p className="text-green-300 font-medium text-sm">
                &quot;Your Journey, Our Priority&quot;
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4 border-b border-green-400 pb-2 inline-block">
              Quick Links
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                      title={link.description}
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4 border-b border-green-400 pb-2 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-700 text-sm hover:text-green-400 transition-colors duration-300 cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4 border-b border-green-400 pb-2 inline-block">
              Contact Us
            </h4>
            <div className="space-y-4 mb-6">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center text-gray-700 hover:text-green-400 transition-colors duration-300 group"
                  aria-label={contact.label}
                  {...(contact.href.startsWith('http') && { 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  })}
                >
                  <contact.icon className="mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300" size={16} />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
              <h5 className="text-sm font-semibold text-green-400 mb-2">Business Hours</h5>
              <p className="text-gray-300 text-xs leading-relaxed">
                24/7 Service Available<br />
                Emergency Support: Always<br />
                Office Hours: 8:00 AM - 10:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Follow Us for Travel Updates & Tips
            </h4>
            <div className="flex justify-center space-x-6 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={`bg-green-400 p-3 rounded-full text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Stay connected for exclusive deals, travel tips, and stunning Sri Lanka content!
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
            
            {/* Copyright with Schema Markup */}
            <div itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Aruba Cab Services" />
              <meta itemProp="url" content="https://arubacabs.lk" />
              <meta itemProp="foundingDate" content="2015" />
              <meta itemProp="areaServed" content="Sri Lanka" />
              <meta itemProp="serviceType" content="Taxi and Tour Services" />
              
              <p>
                &copy; {currentYear} <span itemProp="name">Aruba Cab Services</span>. All rights reserved. 
                <span className="text-green-400 ml-2">Est. 2015</span>
              </p>
            </div>

            {/* Certifications/Trust Signals */}
            <div className="flex items-center space-x-4 text-xs">
              <span className="bg-green-600 px-2 py-1 rounded text-white font-medium">
                Licensed Operator
              </span>
              <span className="bg-blue-600 px-2 py-1 rounded text-white font-medium">
                24/7 Support
              </span>
            </div>

            {/* Designer Credit */}
            <p className="flex items-center gap-1 text-xs">
              Designed & Developed by 
              <span className="text-green-300 font-semibold hover:text-green-400 transition-colors">
                Nova Lab.
              </span>
            </p>
          </div>

          {/* Additional SEO Content */}
          <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
            <p>
              Professional taxi and cab services in Sri Lanka | Airport transfers Colombo | 
              Sri Lanka tour packages | Licensed drivers | 24/7 customer support | 
              Reliable transportation across Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}