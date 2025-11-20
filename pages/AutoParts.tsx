import React from 'react';
import { ServicePageTemplate } from '../components/ServicePageTemplate';
import { Globe2, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const AutoParts: React.FC = () => {
  return (
    <ServicePageTemplate
      title="Auto Parts"
      subtitle="Connect with global suppliers and find the perfect parts for any vehicle. From OEM to aftermarket, we bridge the gap."
      heroImage="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000"
      loginLink="https://abcp82044.noda.pro/"
      signupLink="https://abcp82044.noda.pro/reg"
      catalogLink="https://abcp82044.noda.pro/auto2dV2"
      cardLink="https://abcp82044.noda.pro/carbase"
      stats={[
        { value: 50, suffix: "M+", label: "Parts Available" },
        { value: 500, suffix: "+", label: "Verified Suppliers" },
        { value: 80, suffix: "+", label: "Countries Served" },
        { value: 99, suffix: "%", label: "Uptime Guarantee" }
      ]}
      description="Our automotive ecosystem provides comprehensive solutions tailored for precision, reliability and performance. We unify the fragmented market into a single, powerful sourcing engine."
      features={[
        { title: "Global Network", desc: "Access 500+ suppliers instantly", icon: Globe2 },
        { title: "Quality Assured", desc: "ISO-certified with traceability", icon: ShieldCheck },
        { title: "Fast Delivery", desc: "Express service in 24–48 hours", icon: Truck },
        { title: "Expert Support", desc: "24/7 automotive specialists", icon: Headphones }
      ]}
      categories={[
        { name: "Engine Components", count: "10,000+", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800" },
        { name: "Transmission Parts", count: "8,500+", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800" },
        { name: "Brake Systems", count: "6,200+", image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800" },
        { name: "Electrical Parts", count: "12,000+", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800" },
        { name: "Suspension", count: "5,800+", image: "https://images.unsplash.com/photo-1552160753-f13a506d35c9?q=80&w=800" },
        { name: "Body Parts", count: "15,000+", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800" }
      ]}
    />
  );
};