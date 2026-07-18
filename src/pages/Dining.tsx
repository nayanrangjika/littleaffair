import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export function Dining() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Utensils className="w-4 h-4" /> Culinary
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Dining</span> at Little Affair
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content - Material Card Layout */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2} direction="up">
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-[#f3eddf] rounded-full filter blur-[100px] opacity-40 -translate-y-1/2 -translate-x-1/3"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="relative">
                  <img 
                    src="/dinning/indoor dinning.png" 
                    alt="Dining Setup" 
                    className="w-full h-auto rounded-[2rem] shadow-xl object-cover aspect-square md:aspect-[4/5]"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-accent text-white p-8 rounded-[2rem] shadow-xl max-w-[250px] hidden md:block">
                     <Coffee className="w-8 h-8 mb-4" />
                     <p className="font-serif text-xl">Farm to Table Experience</p>
                  </div>
                </div>

                <div className="space-y-8 text-gray-600 font-light text-lg md:text-xl leading-relaxed">
                  <p className="text-2xl text-gray-900 font-medium leading-snug">
                    Indulge in a delightful culinary experience at our lodge, where dining is an artful blend of flavors and ambiance.
                  </p>
                  <p>
                    Our multi-cuisine restaurant caters to diverse palates, offering a delectable array of dishes to satisfy every taste. Whether you crave traditional delights or international flavors, our expert chefs curate a menu that promises a gastronomic journey.
                  </p>
                  <p>
                    For a unique dining experience, head to our rooftop lounge where you can savor your meal amidst panoramic views. With a commitment to providing a diverse and memorable dining experience, we aim to delight your taste buds with a fusion of flavors in a warm and inviting setting.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white px-4 md:px-8 rounded-t-[4rem] shadow-2xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Culinary Gallery</h2>
            <p className="text-gray-500 font-light text-xl">Glimpses of our curated dishes and setups</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: '/dinning/breakfast setup.jpg', title: 'Breakfast Setup' },
              { src: '/dinning/courtyard dinning.png', title: 'Courtyard Dinning' },
              { src: '/dinning/dahi paratha.jpg', title: 'Dahi Paratha' },
              { src: '/dinning/indoor dinning.png', title: 'Indoor Dinning' },
              { src: '/dinning/omelette.jpg', title: 'Omelette' },
              { src: '/dinning/pool side dinning.png', title: 'Pool Side Dinning' },
              { src: '/dinning/rooftop lounge.jpg', title: 'Rooftop Lounge' },
              { src: '/dinning/utpam with sambhar.jpg', title: 'Utpam With Sambhar' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group rounded-[2rem] overflow-hidden shadow-lg bg-gray-100 flex flex-col h-full">
                  <div className="h-[300px] overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white flex-grow flex items-center justify-center text-center">
                    <h3 className="text-xl font-serif text-gray-900">{item.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <FadeIn>
            <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
              Book Now <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
