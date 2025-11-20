import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../src/assets/PARTSFORM-LOGO.png';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy
      const sections = ['home', 'about', 'services', 'advantages', 'contact'];
      // Find the section that is currently most visible in the viewport
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section top is near the viewport top or if we are well inside it
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location.pathname === '/') {
      // We are already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    } else {
      // We are on another page, navigate to home and pass the target id
      navigate('/', { state: { scrollTo: id } });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Advantages', id: 'advantages' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm py-6' 
          : 'bg-transparent py-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('home')}
          className="group relative z-50 focus:outline-none"
        >
            <img src={logo} alt="PARTSFORM" className="h-14 object-contain" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
             const isActive = activeSection === link.id;
             return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-xl font-medium transition-all duration-300 py-2 ${
                  isActive 
                    ? 'text-navy-900 font-bold' 
                    : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-navy-900"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-navy-900 focus:outline-none relative z-50 p-2 bg-white/50 rounded-full backdrop-blur-md"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden z-40"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-3xl font-display font-bold transition-colors ${
                    activeSection === link.id ? 'text-navy-900' : 'text-slate-400'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};