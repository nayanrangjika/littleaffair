import React from 'react';
import { motion } from 'motion/react';
import { Waves, BookOpen, Tv, Bike, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

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

const offerings = [
  { icon: Waves, title: "Swimming Pool", desc: "Dive into relaxation at our refreshing pool." },
  { icon: BookOpen, title: "Library", desc: "Immerse yourself in a world of knowledge in our well-stocked library." },
  { icon: Tv, title: "TV Area & Pool", desc: "Unwind in our TV area, or engage in friendly competition with a game of pool." },
  { icon: Bike, title: "Bicycles", desc: "Explore the scenic surroundings on our bicycles." }
];

export function Recreation() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title="Recreation & Resort Amenities | Little Affair Sariska"
        description="Relax and rejuvenate with premium amenities at Little Affair Sariska including a swimming pool, cozy library, TV lounge & pool table, and complimentary bicycles."
        path="/recreation"
        keywords="Little Affair Sariska pool, Sariska resort amenities, Swimming pool Sariska resort, Recreation Sariska, Bicycles resort Sariska"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "Recreation at Little Affair Sariska",
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Swimming Pool" },
            { "@type": "LocationFeatureSpecification", "name": "Library" },
            { "@type": "LocationFeatureSpecification", "name": "Bicycles" },
            { "@type": "LocationFeatureSpecification", "name": "TV & Pool Lounge" }
          ]
        }}
      />
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Waves className="w-4 h-4" /> Leisure
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Recreation</span> at Little Affair
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content - Material Card Layout */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2} direction="up">
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#f3eddf] rounded-full filter blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-8 text-gray-600 font-light text-lg md:text-xl leading-relaxed">
                  <p className="text-2xl text-gray-900 font-medium leading-snug">
                    At our lodge, we are delighted to provide a diverse range of recreational activities to ensure a well-rounded and enjoyable stay.
                  </p>
                  <p>
                    Dive into relaxation at our refreshing swimming pool, immerse yourself in a world of knowledge in our well-stocked library, or engage in friendly competition with a game of pool. Experience the scenic charm of rooftop dining, unwind in our TV area, and explore the surroundings on our bicycles.
                  </p>
                  <p>
                    With a plethora of amenities such as these and much more, we strive to cater to a variety of interests, making your stay not only comfortable but also filled with entertaining moments and leisurely pursuits.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {offerings.map((item, index) => (
                    <div key={index} className="bg-[#f3eddf] p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-accent mb-4" />
                      <h3 className="font-serif text-xl mb-2 text-gray-900">{item.title}</h3>
                      <p className="font-light text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Image Gallery Highlight */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Recreation Gallery</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto">
              Glance through the vibrant experiences, pool lounging, and serene corners at Little Affair.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/recreation/AM1_2062-HDR.jpg',
              '/recreation/AM1_2229.jpg',
              '/recreation/AM1_2302-HDR.jpg',
              '/recreation/AM1_2312-HDR.jpg',
              '/recreation/AM1_2326-HDR.jpg',
              '/recreation/AM1_2332-HDR.jpg'
            ].map((src, index) => (
              <FadeIn key={index} delay={index * 0.1} className="relative group aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 shadow-lg">
                <img 
                  src={src} 
                  alt={`Recreation ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center bg-white rounded-t-[4rem] shadow-2xl relative z-10">
        <FadeIn>
          <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
