import React from 'react';
import { ServicePageTemplate } from '../components/ServicePageTemplate';
import { Globe2, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const AviationParts: React.FC = () => {
  return (
    <ServicePageTemplate
      title="Aviation Parts"
      subtitle="Aerospace-grade component sourcing with complete traceability and FAA/EASA compliance documentation."
      heroImage="https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=2000"
      stats={[
        { value: 2, suffix: "M+", label: "Certified Parts" },
        { value: 150, suffix: "+", label: "MRO Partners" },
        { value: 100, suffix: "%", label: "Traceability" },
        { value: 24, suffix: "/7", label: "AOG Support" }
      ]}
      description="We deliver critical aerospace solutions where precision is non-negotiable. Our platform ensures every bolt, sensor, and turbine blade meets the highest airworthiness standards."
      features={[
        { title: "Global MRO Network", desc: "Access certified maintenance hubs", icon: Globe2 },
        { title: "FAA/EASA Compliant", desc: "Full regulatory documentation", icon: ShieldCheck },
        { title: "AOG Logistics", desc: "Priority shipping for grounded aircraft", icon: Truck },
        { title: "Technical Desk", desc: "Aerospace engineering support", icon: Headphones }
      ]}
      categories={[
        { name: "Avionics & Instruments", count: "15,000+", image: "https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?q=80&w=800" },
        { name: "Landing Gear", count: "4,500+", image: "https://images.unsplash.com/photo-1524592714635-d77511072bbd?q=80&w=800" },
        { name: "Turbine Components", count: "8,200+", image: "https://images.unsplash.com/photo-1584844043086-507b09094013?q=80&w=800" },
        { name: "Rotables", count: "12,000+", image: "https://images.unsplash.com/photo-1620903139850-b64756242c50?q=80&w=800" },
        { name: "Hydraulic Systems", count: "3,800+", image: "https://images.unsplash.com/photo-1535620650048-31b19910e785?q=80&w=800" },
        { name: "Airframe Structural", count: "25,000+", image: "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?q=80&w=800" }
      ]}
    />
  );
};