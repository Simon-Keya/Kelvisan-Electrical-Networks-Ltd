'use client';

import { About } from '@/components/About';
import { AnimatedSection } from '@/components/AnimatedSection';
import Contact from '@/components/Contact';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Service';
import { Testimonials } from '@/components/Testimonial'; // Make sure this is the updated Testimonials file

export default function HomePage() {
  return (
    <main className="w-screen min-h-screen bg-blue-200 overflow-x-hidden">


      {/* Hero Section */}
      <AnimatedSection>
        <Hero />
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection>
         <About />
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <Services />
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>

      {/* Contact CTA Section */}
      <AnimatedSection>
          <Contact />
      </AnimatedSection>
      
    </main>
  );
}
