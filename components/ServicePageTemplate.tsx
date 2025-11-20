import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundPattern from '../src/assets/images/backgroun-pattern.jpg';
import comprehensiveImage from '../src/assets/images/4.png';

interface Category {
  name: string;
  count: string;
  image: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  stats: Stat[];
  description: string;
  features: { title: string; desc: string; icon: React.ElementType }[];
  categories: Category[];
  heroImage: string;
  loginLink?: string;
  signupLink?: string;
  catalogLink?: string;
  cardLink?: string;
}

// Simple Animated Counter Hook
const useCounter = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * ease));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const AnimatedNumber: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const count = useCounter(value);
  return <span>{count}{suffix}</span>;
};

const customEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: customEase } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.3 } }
};

export const ServicePageTemplate: React.FC<ServicePageProps> = ({
  title,
  subtitle,
  stats,
  description,
  features,
  categories,
  heroImage,
  loginLink = "#",
  signupLink = "#",
  catalogLink,
  cardLink
}) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});

  // Handle button click with loading
  const handleButtonClick = (link: string, buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      window.location.href = link;
    }, 800); // Small delay to show loading
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[95vh] flex items-center overflow-hidden pt-36 md:pt-20">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
            <div className="absolute inset-0 bg-navy-900/20 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/50 to-transparent z-10" />
            <img src={heroImage} alt={title} className="w-full h-full object-cover scale-110" />
        </motion.div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: customEase }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tight drop-shadow-lg">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 mb-8 md:mb-12 max-w-2xl leading-relaxed font-light">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  onClick={() => handleButtonClick(loginLink, 'login')}
                  disabled={loadingStates['login']}
                  className="px-8 py-3 md:px-10 md:py-4 bg-white text-navy-900 hover:bg-slate-100 text-base md:text-lg rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates['login'] ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  onClick={() => handleButtonClick(signupLink, 'signup')}
                  disabled={loadingStates['signup']}
                  className="px-8 py-3 md:px-10 md:py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 text-base md:text-lg rounded-full font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-sm text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates['signup'] ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Sign Up <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Overlay */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-white/20 pt-8 md:pt-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <div className="text-3xl md:text-5xl font-bold mb-2 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-slate-300 uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 -z-0 hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: customEase }}
            >
               <span className="text-primary-600 font-bold tracking-wider text-sm uppercase mb-4 block">Why Choose Us</span>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-900 mb-6 md:mb-8 leading-tight">Comprehensive <br/>Solutions</h2>
               <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-12 leading-relaxed">
                 {description}
               </p>
               <div className="grid grid-cols-1 gap-4 md:gap-6">
                 {features.map((feature, idx) => (
                   <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.3, duration: 1.2, ease: customEase }}
                    className="flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
                   >
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-navy-900">
                        <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                     </div>
                     <div>
                       <h4 className="text-navy-900 font-bold text-lg md:text-xl mb-2">{feature.title}</h4>
                       <p className="text-slate-500 leading-relaxed text-sm md:text-base">{feature.desc}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: customEase }}
              className="relative h-[400px] md:h-[700px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white"
            >
               <img src={comprehensiveImage} alt="Engineering" className="w-full h-full object-cover" />
               
               <div className="absolute bottom-5 left-5 right-5 md:bottom-10 md:left-10 md:right-10 p-6 md:p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="bg-green-100 p-2 rounded-full text-green-600">
                     <Check className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div className="text-navy-900 font-bold text-lg md:text-xl">Certified Quality</div>
                 </div>
                 <p className="text-slate-600 text-sm md:text-base">Every part undergoes rigorous multi-point inspection protocols before listing.</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-900">Product Categories</h2>
              <p className="text-slate-500 mt-4 text-base md:text-lg">Browse our extensive inventory by system.</p>
            </div>
            <button 
              onClick={() => handleButtonClick(catalogLink || loginLink, 'catalog')}
              disabled={loadingStates['catalog']}
              className="flex items-center gap-2 text-white bg-navy-900 px-6 py-3 rounded-full font-bold hover:bg-primary-600 transition-all hover:-translate-y-1 shadow-lg w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingStates['catalog'] ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  View Full Catalog <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              cardLink ? (
                <button 
                  key={idx} 
                  onClick={() => handleButtonClick(cardLink, `category-${idx}`)}
                  disabled={loadingStates[`category-${idx}`]}
                  className="block w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.3, duration: 1.2, ease: customEase }}
                    whileHover={{ y: -15 }}
                    className="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                      <div className="flex justify-between items-end">
                        <div>
                           <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">{cat.name}</h3>
                           <span className="text-xs md:text-sm text-slate-200 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">{cat.count} Parts</span>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-navy-900 shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                          {loadingStates[`category-${idx}`] ? (
                            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                          ) : (
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </button>
              ) : (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3, duration: 1.2, ease: customEase }}
                  whileHover={{ y: -15 }}
                  className="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-90"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <div className="flex justify-between items-end">
                      <div>
                         <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">{cat.name}</h3>
                         <span className="text-xs md:text-sm text-slate-200 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">{cat.count} Parts</span>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-navy-900 shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Process Banner */}
      <section 
        className="py-16 md:py-24 bg-[#133D65] text-white relative overflow-hidden"
        style={{
            backgroundImage: `url(${backgroundPattern}), linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: 'auto, 40px 40px',
            backgroundPosition: 'center center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl md:text-4xl font-display font-bold mb-12 md:mb-16"
           >
             Seamless Procurement Process
           </motion.h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
             {[
               { step: "01", title: "Search Parts", desc: "Global inventory access" },
               { step: "02", title: "Compare Options", desc: "Price & lead-time analysis" },
               { step: "03", title: "Place Order", desc: "Secure transaction flow" },
               { step: "04", title: "Fast Delivery", desc: "Tracked global logistics" }
             ].map((item, idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.4, duration: 1.2, ease: customEase }}
                 className="relative p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
               >
                 <div className="text-5xl md:text-6xl font-display font-bold text-white/5 mb-4 absolute top-2 right-4">{item.step}</div>
                 <div className="relative z-10 text-left">
                   <div className="w-10 h-1 bg-primary-500 mb-4 md:mb-6 rounded-full"></div>
                   <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                   <p className="text-slate-400 text-sm">{item.desc}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};