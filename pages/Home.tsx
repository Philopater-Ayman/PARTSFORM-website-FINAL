import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  Activity, 
  Shield, 
  Zap, 
  Layers, 
  CheckCircle2,
  Box,
  ChevronRight,
  Loader2
} from 'lucide-react';

import image1 from '@/src/assets/images/1.png';
import backgroundPattern from '@/src/assets/images/backgroun-pattern.jpg';

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const heroImages = [
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2500&auto=format&fit=crop", // Auto
  "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=2500&auto=format&fit=crop", // Aviation
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2500&auto=format&fit=crop"  // Heavy
];

export const Home: React.FC = () => {
  const targetRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll from other pages
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Small delay to ensure layout is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Handle button click with loading
  const handleButtonClick = (link: string, buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      navigate(link);
    }, 800); // Small delay to show loading
  };

  // Hero Slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" ref={targetRef} className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden bg-navy-900">
        {/* Animated Background Slideshow */}
        <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full z-0"
            >
              <img 
                src={heroImages[currentImageIndex]} 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
        </AnimatePresence>
        
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-0 mix-blend-normal"></div>
        <div className="absolute inset-0 bg-white/5 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-8 max-w-full"
            >
              <div className="relative leading-[1.1] md:leading-[0.9] tracking-tight">
                <motion.h1 variants={fadeInLeft} className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-display font-bold text-navy-900 block lg:whitespace-nowrap mb-1">
                  FORMING SUCCESS,
                </motion.h1>
                <motion.h1 variants={fadeInLeft} className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-navy-900 block">
                  PART BY PART.
                </motion.h1>
              </div>

              <motion.p variants={fadeInLeft} className="text-base sm:text-xl text-navy-800 font-medium my-6 md:my-10 max-w-lg leading-relaxed">
                Global trading redefined with clarity, speed & trusted reach across automotive, aviation and industrial ecosystems.
              </motion.p>
            </motion.div>

            {/* Right Content - Service Buttons */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-4 flex flex-col items-end justify-center gap-3 md:gap-5 mt-4 lg:mt-0"
            >
               {[
                 { name: "Auto Parts", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400", link: "/services/auto-parts", desc: "OEM & Aftermarket", id: "auto-parts-hero" },
                 { name: "Aviation Parts", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=400", link: "/services/aviation-parts", desc: "Certified Components", id: "aviation-parts-hero" },
                 { name: "Heavy Machinery", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400", link: "/services/heavy-machinery", desc: "Industrial Equipment", id: "heavy-machinery-hero" }
               ].map((service, idx) => (
                 <motion.div key={idx} variants={fadeInRight} whileHover={{ x: -10, scale: 1.02 }} className="w-full">
                    <button 
                      onClick={() => handleButtonClick(service.link, service.id)}
                      disabled={loadingStates[service.id]}
                      className="relative flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-2xl hover:bg-white/70 transition-all group w-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3 md:gap-5 relative z-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-sm border border-white/50 shrink-0">
                           <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-display font-bold text-navy-900 text-lg md:text-xl leading-tight mb-0.5">{service.name}</h3>
                          <p className="text-[10px] md:text-xs text-navy-800 font-semibold uppercase tracking-wider opacity-70">{service.desc}</p>
                        </div>
                      </div>
                      <div className="ml-auto w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/50 group-hover:bg-navy-900 flex items-center justify-center transition-colors relative z-10">
                         {loadingStates[service.id] ? (
                           <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-navy-900 animate-spin" />
                         ) : (
                           <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-navy-900 group-hover:text-white transition-colors" />
                         )}
                      </div>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </button>
                 </motion.div>
               ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Precision Banner - Scrolling Stats */}
      <div className="hidden md:block bg-slate-50 border-y border-slate-200 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
            {[
              { icon: Globe, title: "Global Access", sub: "50+ Countries Served" },
              { icon: Zap, title: "Speed", sub: "24-48h Dispatch" },
              { icon: Shield, title: "Trusted", sub: "Certified Suppliers" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="flex items-center gap-6 group cursor-pointer w-full md:w-auto"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center shadow-md text-[#133D65] group-hover:bg-[#133D65] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-navy-900 font-bold text-lg md:text-xl group-hover:text-[#133D65] transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.sub}</p>
                </div>
                {idx !== 2 && <div className="hidden md:block w-px h-16 bg-slate-200 ml-12"></div>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 md:py-32 bg-white overflow-hidden relative">
        <div className="absolute top-20 -right-20 text-[100px] md:text-[200px] font-display font-bold text-slate-50 opacity-50 select-none pointer-events-none hidden md:block">
          SOURCING
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                   <img 
                     src={image1} 
                     alt="Warehouse" 
                     className="w-full h-[300px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-navy-900/20"></div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 w-3/4 glass-card p-6 md:p-8 rounded-3xl border-l-4 border-primary-600 shadow-2xl"
              >
                   <div className="flex items-baseline gap-2">
                     <span className="text-3xl md:text-5xl font-display font-bold text-navy-900">50M+</span>
                   </div>
                   <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">Parts indexed and ready for immediate global dispatch.</p>
              </motion.div>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <motion.h2 variants={fadeInRight} className="text-3xl md:text-6xl font-display font-bold text-navy-900 mb-6 md:mb-8 leading-tight">
                Transparent <br />
                <span className="text-[#133D65]">Sourcing Intelligence.</span>
              </motion.h2>
              
              <motion.p variants={fadeInRight} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                PARTSFORM unifies fragmented automotive, aviation and industrial parts ecosystems into a transparent trading fabric. Real-time clarity, trusted data signals and logistics continuity empower teams to connect, compare and move with confident speed.
              </motion.p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <motion.div variants={fadeInUp} className="group">
                  <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#133D65] transition-colors">
                     <Layers className="text-[#133D65] w-6 h-6 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-navy-900 text-lg mb-2">Smart Sourcing</h4>
                  <p className="text-slate-500 text-sm">Alternates prediction engine powered by advanced algorithms.</p>
                </motion.div>
                 <motion.div variants={fadeInUp} className="group">
                   <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#133D65] transition-colors">
                     <Shield className="text-[#133D65] w-6 h-6 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-navy-900 text-lg mb-2">Compliance</h4>
                  <p className="text-slate-500 text-sm">Automated ISO/FAA compliance checks on every transaction.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-32 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16"
          >
              <motion.div variants={fadeInLeft} className="max-w-2xl">
              <span className="text-[#133D65] font-bold tracking-wider text-sm uppercase mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-6xl font-display font-bold text-navy-900">Multi-Sector Catalog</h2>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: "Auto Parts", 
                desc: "Premium automotive components, OEM & aftermarket.", 
                img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800",
                link: "/services/auto-parts",
                count: "12k+ Parts",
                id: "auto-parts-services"
              },
              { 
                title: "Aviation Parts", 
                desc: "Aerospace-grade certified components.", 
                img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=800",
                link: "/services/aviation-parts",
                count: "8k+ Parts",
                id: "aviation-parts-services"
              },
              { 
                title: "Heavy Parts", 
                desc: "Industrial equipment & construction machinery parts.", 
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800",
                link: "/services/heavy-machinery",
                count: "15k+ Parts",
                id: "heavy-machinery-services"
              }
            ].map((service, idx) => (
              <button 
                key={idx}
                onClick={() => handleButtonClick(service.link, service.id)}
                disabled={loadingStates[service.id]}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-[300px] md:h-[400px] border border-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
              >
                <div className="absolute inset-0 h-full w-full">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#133D65]/90"></div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold rounded-full text-white">{service.count}</span>
                  </div>
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <p className="text-slate-200 mb-6 leading-relaxed text-sm md:text-base">
                        {service.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-white text-navy-900 px-6 py-3 rounded-full font-bold group-hover:bg-[#133D65] group-hover:text-white transition-colors text-sm md:text-base disabled:opacity-50">
                        {loadingStates[service.id] ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Explore <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages - Updated Section */}
      <section 
        id="advantages" 
        className="py-16 md:py-24 bg-[#133D65] relative overflow-hidden"
        style={{
            backgroundImage: `url(${backgroundPattern}), linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: 'auto, 40px 40px',
            backgroundPosition: 'center center'
        }}
      >
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-12 md:mb-16 text-center"
          >
             <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Why PARTSFORM</motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Global Access", 
                desc: "Partsform connects you to verified distributors, dealers, and partners across key global markets — securely and instantly.", 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800" 
              },
              { 
                title: "Real-Time Clarity", 
                desc: "Access real-time pricing, lead times, and availability so you can make decisions faster — with full transparency.", 
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" 
              },
              { 
                title: "Trusted Network", 
                desc: "Every transaction is backed by trust, compliance, and accountability. Work only with verified, professional partners.", 
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" 
              },
              { 
                title: "Smart Sourcing", 
                desc: "Leverage Partsform’s global reach and intelligent system to secure competitive offers — all from one streamlined platform.", 
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" 
              },
              { 
                title: "Seamless Logistics", 
                desc: "From inquiry to delivery, we coordinate every stage with precision — ensuring efficiency and reliability across borders.", 
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800" 
              },
              { 
                title: "Faster. Smarter. Connected.", 
                desc: "Partsform transforms global spare parts trading into a seamless experience — built for professionals who value time and trust.", 
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 1.0 }}
                whileHover={{ y: -5 }}
                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-navy-900"
              >
                {/* Image Background - Visible */}
                <div className="absolute inset-0 z-0">
                   <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                   />
                </div>

                {/* Smooth Shadow for readability (Bottom Half) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/90 z-10"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 md:mb-3 leading-tight">{item.title}</h3>
                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Contact - Premium UI */}
      <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] bg-navy-100/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Combined Header & CTA */}
          <div className="text-center mb-12 md:mb-20">
             <motion.span 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-primary-600 font-bold tracking-wider text-sm uppercase mb-4 block"
             >
               Get Started
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-display font-bold text-navy-900 mb-6"
             >
               Ready to Transform<br/>Your Supply Chain?
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto"
             >
               Join the global network of automotive, aviation, and industrial leaders operating with speed and precision.
             </motion.p>
          </div>

          <div id="contact" className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* Left Side - Contact Info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              className="lg:col-span-5 pt-8"
            >
               <motion.h3 variants={fadeInLeft} className="text-2xl md:text-3xl font-display font-bold text-navy-900 mb-8">
                 Contact Information
               </motion.h3>
               
               <div className="space-y-8 md:space-y-10">
                 {[
                   { title: "Global Headquarters", content: "Dubai Silicon Oasis, DDP, Building A2, Dubai, United Arab Emirates", delay: 0 },
                   { title: "Email Enquiries", content: "info@partsform.com", isLink: true, delay: 0.1 },
                   { title: "Support Hours", content: "Mon - Fri: 09:00 - 18:00 (GST)", delay: 0.2 }
                 ].map((item, idx) => (
                    <motion.div key={idx} variants={fadeInUp} className="group">
                      <h4 className="text-navy-900 font-bold text-lg mb-2 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        {item.title}
                      </h4>
                      {item.isLink ? (
                        <a href={`mailto:${item.content}`} className="text-slate-500 font-medium text-base md:text-lg hover:text-primary-600 transition-colors pl-5 block break-all">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-slate-500 font-medium text-base md:text-lg pl-5 leading-relaxed max-w-xs">
                          {item.content}
                        </p>
                      )}
                    </motion.div>
                 ))}
               </div>

               <motion.div variants={fadeInUp} className="mt-12 pl-5">
                 <button className="flex items-center gap-3 text-navy-900 font-bold group hover:opacity-70 transition-opacity">
                   <span>View Locations Map</span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
               </motion.div>
            </motion.div>

            {/* Right Side - Premium Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7"
            >
              <form 
                className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden" 
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Decorative gradient inside form */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-[100px] -z-0 opacity-50"></div>

                <h3 className="text-2xl font-display font-bold text-navy-900 mb-8 md:mb-10 relative z-10">Send us a message</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 relative z-10">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-primary-600 transition-colors">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-t-lg px-4 py-3 text-navy-900 focus:bg-white focus:border-primary-600 outline-none transition-all font-medium" placeholder="John" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-primary-600 transition-colors">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-t-lg px-4 py-3 text-navy-900 focus:bg-white focus:border-primary-600 outline-none transition-all font-medium" placeholder="Doe" />
                  </div>
                </div>

                <div className="mb-6 md:mb-8 relative z-10 group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-primary-600 transition-colors">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-t-lg px-4 py-3 text-navy-900 focus:bg-white focus:border-primary-600 outline-none transition-all font-medium" placeholder="john@company.com" />
                </div>

                <div className="mb-8 md:mb-10 relative z-10 group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-primary-600 transition-colors">Message</label>
                  <textarea rows={4} className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-t-lg px-4 py-3 text-navy-900 focus:bg-white focus:border-primary-600 outline-none transition-all font-medium" placeholder="How can we help you?"></textarea>
                </div>

                <button className="w-full py-4 md:py-5 bg-navy-900 hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group relative z-10">
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};