import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Briefcase, Sun, Bed } from 'lucide-react';
import { SEO } from '../components/SEO';

function FadeIn({ children, delay = 0, className, direction = "up", onClick }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right"; key?: any; onClick?: () => void }) {
  const yOffset = direction === "up" ? 20 : 0;
  const xOffset = direction === "left" ? 20 : direction === "right" ? -20 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

const allImages = [
  "/gallery/img-7751.jpg",
  "/gallery/img-7752.jpg",
  "/gallery/img-7753.jpg",
  "/gallery/img-7754.jpg",
  "/gallery/img-7755.jpg",
  "/gallery/img-7756.jpg",
  "/gallery/img-7757.jpg",
  "/gallery/img-7758.jpg",
  "/gallery/img-7759.jpg",
  "/gallery/img-7760.jpg",
  "/gallery/img-7761.jpg",
  "/gallery/img-7762.jpg",
  "/gallery/img-7763.jpg",
  "/gallery/img-7764.jpg",
  "/gallery/img-7765.jpg",
  "/gallery/img-7766.jpg",
  "/gallery/img-7767.jpg",
  "/gallery/img-7768.jpg",
  "/gallery/img-7769.jpg",
  "/gallery/img-7771.jpg",
  "/gallery/img-7772.jpg",
  "/gallery/img-7773.jpg",
  "/gallery/img-7774.jpg",
  "/gallery/img-7775.jpg",
  "/gallery/img-7776.jpg",
  "/gallery/img-7777.jpg",
  "/gallery/img-7779.jpg",
  "/gallery/img-7780.jpg",
  "/gallery/img-7781.jpg",
  "/gallery/img-7782.jpg",
  "/gallery/img-7785.jpg",
  "/gallery/img-7786.jpg",
  "/gallery/img-7787.jpg",
  "/gallery/img-7788.jpg",
  "/gallery/img-7789.jpg",
  "/gallery/img-7790.jpg",
  "/gallery/img-7791.jpg",
  "/gallery/img-7792.jpg",
  "/gallery/img-7793.jpg",
  "/gallery/img-7794.jpg",
  "/gallery/img-7796.jpg",
  "/gallery/img-7797.jpg",
  "/gallery/img-7798.jpg",
  "/gallery/img-7799.jpg",
  "/gallery/img-7800.jpg",
  "/gallery/img-7801.jpg",
  "/gallery/img-7804.jpg",
  "/gallery/img-7805.jpg",
  "/gallery/img-7806.jpg",
  "/gallery/img-7807.jpg"
];

export function Gallery() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImg(index);
  const closeLightbox = () => setSelectedImg(null);
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % allImages.length);
    }
  };
  
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <SEO 
        title="Photo Gallery | Little Affair Sariska Resort Images"
        description="Browse photo gallery of Little Affair Sariska: stone villas, serene swimming pool, jungle safari, gourmet dining, and natural landscapes of Rajasthan."
        path="/gallery"
        keywords="Little Affair Sariska photos, Sariska resort gallery, Sariska tiger reserve images, Stone villas Sariska pictures"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Little Affair Sariska Photo Gallery",
          "description": "High-resolution photos of stone villas, dining setups, and safari experiences in Sariska."
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 pt-12">
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">Gallery</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-lg">
            A glimpse into the stunning wilderness, elegant stays, and unforgettable moments at Little Affair.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.map((src, index) => (
            <FadeIn key={index} delay={(index % 4) * 0.05} className="relative group aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100" onClick={() => openLightbox(index)}>
              <img 
                src={src} 
                alt={`Little Affair Gallery ${index + 1}`} 
                loading={index < 8 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <ZoomIn className="text-white w-8 h-8" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Info Cards (Material style) */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">What to Expect</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1} direction="up" className="h-full">
              <Link to="/weather" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-[#f3eddf] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-accent stroke-1" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">What to Pack</h3>
                <p className="text-gray-500 font-light text-sm md:text-base">Ensure you have all the essentials for your jungle adventure.</p>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="up" className="h-full">
              <Link to="/weather" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-[#f3eddf] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Sun className="w-8 h-8 text-accent stroke-1" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">Weather Guide</h3>
                <p className="text-gray-500 font-light text-sm md:text-base">Check the seasonal climate to plan the perfect time for your visit.</p>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up" className="h-full">
              <Link to="/weather" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-[#f3eddf] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Bed className="w-8 h-8 text-accent stroke-1" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">What to Expect</h3>
                <p className="text-gray-500 font-light text-sm md:text-base">Familiarize yourself with the authentic Jungle Lodge experience.</p>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

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
              src={allImages[selectedImg]} 
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
    </div>
  );
}
