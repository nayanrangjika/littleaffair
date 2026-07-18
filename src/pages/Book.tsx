import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, CheckCircle2 } from 'lucide-react';

function FadeIn({ children, delay = 0, className, direction = "up" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right"; key?: any }) {
  const yOffset = direction === "up" ? 40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f3eddf] items-center justify-center font-sans pt-24 px-4">
        <FadeIn className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl text-center max-w-2xl w-full">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Enquiry Submitted</h2>
          <p className="text-gray-600 font-light text-xl mb-12">
            Thank you for your interest in Little Affair. Our team will get back to you shortly to confirm your reservation.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            Make another enquiry
          </button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32 pb-24">
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Calendar className="w-4 h-4" /> Reservations
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Book</span> Your Stay
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3eddf] rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10 space-y-12">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name *</label>
                      <input required type="text" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name *</label>
                      <input required type="text" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <input required type="email" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone *</label>
                      <input required type="tel" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Stay Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Check-in Date *</label>
                      <input required type="date" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Check-out Date *</label>
                      <input required type="date" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Guests *</label>
                      <input required type="number" min="1" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="2" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Rooms *</label>
                      <input required type="number" min="1" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 group-hover:border-accent transition-colors">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="hidden peer-checked:block w-3 h-3 bg-accent rounded-sm"></div>
                      </div>
                      <span className="text-gray-700 select-none">I'm traveling with children</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 group-hover:border-accent transition-colors">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="hidden peer-checked:block w-3 h-3 bg-accent rounded-sm"></div>
                      </div>
                      <span className="text-gray-700 select-none">I'm traveling with pet</span>
                    </label>
                  </div>
                </div>

                {/* Experiences */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Select Your Adventures</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "High tea by the Boulders",
                      "High tea by the Lake",
                      "Bush/Farm Dinner",
                      "Special Setup",
                      "Nature/Village Walk",
                      "Sariska Jungle Safari"
                    ].map((adv, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer group bg-[#f8f5f0] p-4 rounded-xl hover:bg-accent/5 transition-colors">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded border-2 border-gray-300 group-hover:border-accent transition-colors shrink-0">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="hidden peer-checked:block w-2.5 h-2.5 bg-accent rounded-sm"></div>
                        </div>
                        <span className="text-sm text-gray-700 select-none">{adv}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-8 text-center md:text-left border-t">
                  <button type="submit" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl w-full md:w-auto justify-center">
                    Reserve Your Stay <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
