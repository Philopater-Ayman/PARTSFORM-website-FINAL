import React from 'react';
import { ServicePageTemplate } from '../components/ServicePageTemplate';
import { Globe2, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const HeavyMachinery: React.FC = () => {
  return (
    <ServicePageTemplate
      title="Heavy Machinery"
      subtitle="Industrial strength sourcing for construction, mining, and agricultural equipment. Minimize downtime, maximize output."
      heroImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000"
      stats={[
        { value: 10, suffix: "M+", label: "Industrial Parts" },
        { value: 300, suffix: "+", label: "OEM Manufacturers" },
        { value: 50, suffix: "+", label: "Heavy Sectors" },
        { value: 98, suffix: "%", label: "Fulfillment Rate" }
      ]}
      description="Keep your operations moving with robust supply chains for heavy equipment. We specialize in hard-to-find components for legacy and modern industrial fleets."
      features={[
        { title: "OEM & Aftermarket", desc: "Flexible sourcing options", icon: Globe2 },
        { title: "Heavy Duty Certified", desc: "Components built for extreme loads", icon: ShieldCheck },
        { title: "Site Delivery", desc: "Direct-to-site logistics capability", icon: Truck },
        { title: "Fleet Support", desc: "Maintenance planning assistance", icon: Headphones }
      ]}
      categories={[
        { name: "Hydraulic Cylinders", count: "5,000+", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" },
        { name: "Undercarriage", count: "3,500+", image: "https://images.unsplash.com/photo-1580901368919-7738ef30fca0?q=80&w=800" },
        { name: "Power Train", count: "4,200+", image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800" },
        { name: "Ground Engaging", count: "7,000+", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" },
        { name: "Cooling Systems", count: "2,800+", image: "https://images.unsplash.com/photo-1574689049597-7e6c033fe545?q=80&w=800" },
        { name: "Filters & Fluids", count: "15,000+", image: "https://images.unsplash.com/photo-1626729797525-38eb52f52516?q=80&w=800" }
      ]}
    />
  );
};