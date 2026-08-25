import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Briefcase, Sun, Bed } from 'lucide-react';
import { SEO } from '../components/SEO';

function FadeIn({ children, delay = 0, className, direction = "up", onClick }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right"; key?: any; onClick?: () => void }) {
  const yOffset = direction === "up" ? 40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

const driveGalleryImages = [
  '/gallery/IMG_7751.jpg',
  '/gallery/IMG_7752.jpg',
  '/gallery/IMG_7753.jpg',
  '/gallery/IMG_7754.jpg',
  '/gallery/IMG_7755.jpg',
  '/gallery/IMG_7756.jpg',
  '/gallery/IMG_7757.jpg',
  '/gallery/IMG_7758.jpg',
  '/gallery/IMG_7759.jpg',
  '/gallery/IMG_7760.jpg',
  '/gallery/IMG_7761.jpg',
  '/gallery/IMG_7762.jpg',
  '/gallery/IMG_7763.jpg',
  '/gallery/IMG_7764.jpg',
  '/gallery/IMG_7765.jpg',
  '/gallery/IMG_7766.jpg',
  '/gallery/IMG_7767.jpg',
  '/gallery/IMG_7768.jpg',
  '/gallery/IMG_7769.jpg',
  '/gallery/IMG_7771.jpg',
  '/gallery/IMG_7772.jpg',
  '/gallery/IMG_7773.jpg',
  '/gallery/IMG_7774.jpg',
  '/gallery/IMG_7775.jpg',
  '/gallery/IMG_7776.jpg',
  '/gallery/IMG_7777.jpg',
  '/gallery/IMG_7779.jpg',
  '/gallery/IMG_7780.jpg',
  '/gallery/IMG_7781.jpg',
  '/gallery/IMG_7782.jpg',
  '/gallery/IMG_7785.jpg',
  '/gallery/IMG_7786.jpg',
  '/gallery/IMG_7787.jpg',
  '/gallery/IMG_7788.jpg',
  '/gallery/IMG_7789.jpg',
  '/gallery/IMG_7790.jpg',
  '/gallery/IMG_7791.jpg',
  '/gallery/IMG_7792.jpg',
  '/gallery/IMG_7793.jpg',
  '/gallery/IMG_7794.jpg',
  '/gallery/IMG_7796.jpg',
  '/gallery/IMG_7797.jpg',
  '/gallery/IMG_7798.jpg',
  '/gallery/IMG_7799.jpg',
  '/gallery/IMG_7800.jpg',
  '/gallery/IMG_7801.jpg',
  '/gallery/IMG_7804.jpg',
  '/gallery/IMG_7805.jpg',
  '/gallery/IMG_7806.jpg',
  '/gallery/IMG_7807.jpg'
];

const allImages = [
  ...driveGalleryImages,
  '/experiences/bush-farm-dinner-1.jpg',
  '/experiences/high-tea-by-the-boulders-1.jpg',
  '/experiences/high-tea-by-the-lake-1.jpg',
  '/experiences/nature-village-walk-1.jpg',
  '/experiences/sariska-jungle-safari-1.jpg',
  '/experiences/special-setup-1.jpg',
  '/stay/indoor/AM1_2243-HDR.jpg',
  '/stay/indoor/AM1_2258-HDR.jpg',
  '/stay/indoor/AM1_2288-HDR.jpg',
  '/stay/indoor/IMG_7773.jpg',
  '/stay/indoor/IMG_7774.jpg',
  '/stay/indoor/IMG_7775.jpg',
  '/stay/indoor/IMG_7776.jpg',
  '/stay/indoor/IMG_7779.jpg',
  '/stay/outdoor/IMG_7786.jpg',
  '/stay/outdoor/IMG_7787.jpg',
  '/dinning/indoor-dining.jpg',
  '/dinning/courtyard-dining.jpg',
  '/dinning/rooftop-lounge.jpg',
  '/recreation/AM1_2302-HDR.jpg',
  '/recreation/AM1_2062-HDR.jpg',
  '/recreation/AM1_2229.jpg'
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
            <FadeIn key={index} delay={index * 0.05} className="relative group aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100" onClick={() => openLightbox(index)}>
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
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
