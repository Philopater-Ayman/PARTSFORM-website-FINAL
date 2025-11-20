import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../src/assets/PARTSFORM-LOGO.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <img src={logo} alt="PARTSFORM" className="h-8 md:h-10 object-contain" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Global parts trading redefined with clarity, speed & trusted reach across automotive, aviation and industrial ecosystems.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-display font-bold text-lg mb-6 text-white">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link to="/services/auto-parts" className="hover:text-white hover:translate-x-1 transition-all inline-block">Auto Parts</Link></li>
              <li><Link to="/services/aviation-parts" className="hover:text-white hover:translate-x-1 transition-all inline-block">Aviation Parts</Link></li>
              <li><Link to="/services/heavy-machinery" className="hover:text-white hover:translate-x-1 transition-all inline-block">Heavy Machinery</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-display font-bold text-lg mb-6 text-white">Global Operations</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 group-hover:text-white transition-colors" />
                <span>Dubai, UAE<br />Global Headquarters</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary-500 shrink-0 group-hover:text-white transition-colors" />
                <a href="mailto:info@partsform.com" className="hover:text-white transition-colors">info@partsform.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} PARTSFORM. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};