import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AutoParts } from './pages/AutoParts';
import { AviationParts } from './pages/AviationParts';
import { HeavyMachinery } from './pages/HeavyMachinery';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-navy-900 font-sans overflow-x-hidden selection:bg-navy-900 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/auto-parts" element={<AutoParts />} />
            <Route path="/services/aviation-parts" element={<AviationParts />} />
            <Route path="/services/heavy-machinery" element={<HeavyMachinery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;