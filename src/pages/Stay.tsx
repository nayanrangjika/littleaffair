import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BedDouble, Home, Bath, Trees, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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

const galleryImages = [
  { src: '/stay/indoor/AM1_2243-HDR.jpg', category: 'indoor' },
  { src: '/stay/indoor/AM1_2258-HDR.jpg', category: 'indoor' },
  { src: '/stay/indoor/AM1_2288-HDR.jpg', category: 'indoor' },
  { src: '/stay/indoor/IMG_7773.jpg', category: 'indoor' },
  { src: '/stay/indoor/IMG_7774.jpg', category: 'indoor' },
  { src: '/stay/indoor/IMG_7775.jpg', category: 'indoor' },
  { src: '/stay/indoor/IMG_7776.jpg', category: 'indoor' },
  { src: '/stay/indoor/IMG_7779.jpg', category: 'indoor' },
  { src: '/stay/outdoor/IMG_7786.jpg', category: 'outdoor' },
  { src: '/stay/outdoor/IMG_7787.jpg', category: 'outdoor' },
];

export function Stay() {
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(img => filter === 'all' || img.category === filter);

  const openLightbox = (index: number) => setSelectedImg(index);
  const closeLightbox = () => setSelectedImg(null);
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % filteredImages.length);
    }
  };
  
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title="Luxury Stone Villas & Accommodation | Little Affair Sariska"
        description="Stay in eco-luxurious stone villas at Little Affair Sariska. Built with locally sourced stone, private verandas, open-to-sky shower enclosures, and wilderness views."
        path="/stay"
        keywords="Stone Villas Sariska, Sariska resort stay, Luxury accommodation Sariska, Sariska Tiger Reserve villas, Eco luxury rooms Rajasthan"
        ogImage="https://www.littleaffairsariska.com/stay/indoor/AM1_2243-HDR.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HotelRoom",
          "name": "Stone Villas at Little Affair Sariska",
          "description": "Luxurious stone masonry villas with private verandas and open-air bath spaces near Sariska Tiger Reserve.",
          "occupancy": {
            "@type": "QuantitativeValue",
            "maxValue": 3
          }
        }}
      />
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Home className="w-4 h-4" /> Accommodations
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Stay</span> at Little Affair
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
              
              <div className="relative z-10">
                <p className="text-2xl text-gray-900 font-medium leading-snug mb-8 text-center max-w-4xl mx-auto">
                  Little affair is a family run boutique Jungle Lodge with 6 luxury stone villas, inspired by its natural surroundings and is an eco-friendly marvel of note.
                </p>
                <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-16">
                  Explore the best of Sariska's wilderness in 900 sq ft of private villa space equipped with bedroom, living room, dresser, bathroom, open shower and outside sitting deck to help you experience the sense of freedom and stillness all at one place!
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {[
                    { icon: Bath, text: "Open shower" },
                    { icon: Home, text: "Private villas" },
                  ].map((feature, index) => (
                    <FadeIn key={index} delay={index * 0.1} className="bg-[#f3eddf] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
                      <feature.icon className="w-8 h-8 text-accent mb-4" />
                      <span className="font-serif text-lg">{feature.text}</span>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="px-4 md:px-8 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
            <FadeIn direction="right" className="flex-1">
              <img src="/stay/open-shower.jpg" alt="Open Shower" className="rounded-[3rem] shadow-2xl object-cover w-full h-[500px]" />
            </FadeIn>
            <FadeIn direction="left" className="flex-1">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Open Shower</h2>
              <p className="text-gray-600 font-light text-xl leading-relaxed">
                Drench your exhaustion in the open shower after a day of exploration or sip your morning coffee at the outside sitting deck overlooking the beauty of the rustic and have yourself a slow melodious morning; stays at Little Affair are sure to check off your bucket list experiences!
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <FadeIn direction="left" className="flex-1">
              <img src="/stay/private-villas.jpg" alt="Private Villas" className="rounded-[3rem] shadow-2xl object-cover w-full h-[500px]" />
            </FadeIn>
            <FadeIn direction="right" className="flex-1 md:text-right">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Private Villas</h2>
              <p className="text-gray-600 font-light text-xl leading-relaxed mb-6">
                True to its name, Little Affair takes care of all the details that contributes to a comfortable and memorable stay. Every private villa boasts of a spacious living area with minimalist design furniture, dresser, bathroom, open shower and outside sitting deck striking a perfect balance between casual luxury and sophisticated elegance.
              </p>
              <p className="text-gray-600 font-light text-xl leading-relaxed">
                It's the intricate details tucked with warm hospitality serving you an amalgamation of rustic wilderness and luxury that will make your stay at Little Affair memorable.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 md:px-8 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Villas Gallery</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {['all', 'indoor', 'outdoor'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-colors ${
                    filter === cat 
                      ? 'bg-accent text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-lg"
                  onClick={() => openLightbox(index)}
                >
                  <img src={img.src} alt={`Stay ${img.category}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={showPrev}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img 
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={filteredImages[selectedImg].src} 
              alt="Lightbox"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={showNext}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center bg-[#f3eddf]">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10">Ready to experience the wilderness?</h2>
          <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>

    </div>
  );
}
