import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sun, Bed, ArrowRight, Compass, MapPin, Coffee, TreePine } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
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

export function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans" ref={containerRef}>
      <SEO 
        title="Little Affair Sariska | Eco-Friendly Boutique Resort in Rajasthan"
        description="Escape to Little Affair Sariska, an eco-friendly luxury resort in Rajasthan's Aravalli hills near Sariska Tiger Reserve. Experience stone villas, wildlife safaris, and bush dining."
        path="/"
        keywords="Little Affair Sariska, Resort in Sariska, Sariska National Park resort, Eco resort Rajasthan, Sariska Tiger Reserve stay, Luxury villas Sariska"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Resort",
          "name": "Little Affair Sariska",
          "url": "https://www.littleaffairsariska.com/",
          "description": "Eco-friendly luxury resort in Sariska, Rajasthan with stone villas, wildlife safaris, and fine dining.",
          "telephone": "+91-9910011234",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tehla",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-[#f3eddf] p-2 md:p-4">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0 m-2 md:m-4 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://i.postimg.cc/y829HSW-Z/Whats-App-Image-2024-02-26-at-10-25-54-243793df.jpg")' }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        
        <div className="relative z-20 text-center text-white px-4 flex flex-col items-center max-w-5xl mx-auto pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 tracking-tight leading-tight drop-shadow-xl"
          >
            Welcome to<br/>Little Affair Sariska
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-light mb-12 drop-shadow-md text-white/90"
          >
            A Unit of Gaura Hospitality
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link to="/book" className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold shadow-xl flex items-center justify-center gap-2 group text-sm md:text-base">
              Book Your Stay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+917877083719" className="bg-black/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full hover:bg-black/40 transition-all font-medium text-sm md:text-base text-center">
              Call Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Material You Card */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3eddf] rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f3eddf] rounded-full filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
              
              <img 
                src="https://i.postimg.cc/Dw83L9Cz/final-1-150x150.png" 
                alt="Logo" 
                className="h-24 md:h-32 w-auto object-contain mb-12 relative z-10"
              />
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-10 leading-tight max-w-4xl relative z-10">
                Delve Into the <span className="text-accent italic">Bewildering</span> and the Tranquillity of Sariska
              </h2>
              
              <div className="space-y-6 text-gray-600 font-light text-lg md:text-xl leading-relaxed max-w-3xl relative z-10">
                <p>
                  Little Affair is the Jungle Lodge in Sariska near Alwar, Rajasthan, providing a unique stay amidst natural surroundings in the lap of nature. The eco-friendly accommodations offer the chance to live close to wildlife, creating lasting memories.
                </p>
                <p>
                  Our property fosters a deep connection with nature, offering numerous adventurous and recreational activities to enhance your stay. From luxury stone villas to delicious food, our jungle resort ensures a perfect blend of comfort, fun, and adventure.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bento Grid: Symphony of Wildlife */}
      <section className="py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-12 md:mb-20 px-4">
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              A symphony of <br />
              <span className="italic font-light text-accent">wildlife & luxury</span>
            </h2>
            <Link to="/about" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors group">
              <span className="border-b-2 border-accent/30 group-hover:border-accent">Discover Our Story</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>

          {/* Modern Bento Box Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
            {/* Main Feature - Spans 2 rows on Desktop */}
            <FadeIn delay={0.1} className="md:col-span-1 md:row-span-2 h-[350px] md:h-full">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer">
                <img 
                  src="/safari.jpg" 
                  alt="Experience" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl w-fit mb-4">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">Wilderness</h3>
                  <p className="font-light text-white/80">Immersive nature trails</p>
                </div>
              </div>
            </FadeIn>

            {/* Top Middle */}
            <FadeIn delay={0.2} direction="left" className="md:col-span-1 md:row-span-1 h-[250px] md:h-full">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer">
                <img 
                  src="/stone-villas.jpg" 
                  alt="Villa" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                  <h3 className="text-xl font-serif font-medium">Stone Villas</h3>
                </div>
              </div>
            </FadeIn>

            {/* Top Right - Info Card */}
            <FadeIn delay={0.3} direction="left" className="md:col-span-1 md:row-span-1 h-auto md:h-full min-h-[250px]">
               <div className="bg-accent rounded-[2rem] w-full h-full p-8 text-white flex flex-col justify-between shadow-lg">
                 <div>
                   <TreePine className="w-10 h-10 mb-4 opacity-80" />
                   <h3 className="text-2xl font-serif mb-3">Eco-Friendly</h3>
                   <p className="font-light opacity-90 leading-relaxed text-sm md:text-base">
                     Locally sourced materials and sustainable practices, blending perfectly with the Sariska landscape.
                   </p>
                 </div>
                 <Link to="/stay" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent hover:scale-110 transition-transform mt-6">
                   <ArrowRight className="w-5 h-5 -rotate-45" />
                 </Link>
               </div>
            </FadeIn>

            {/* Bottom Middle/Right - Spans 2 columns */}
            <FadeIn delay={0.4} direction="up" className="md:col-span-2 md:row-span-1 h-[250px] md:h-full">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer">
                <img 
                  src="/culinary.jpg" 
                  alt="Dining" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 text-white z-10 flex items-end justify-between w-full">
                  <div>
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl w-fit mb-4">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium mb-2">Culinary Delights</h3>
                    <p className="font-light text-white/80">Farm to table dining experience</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services/Offerings - Modern Split Layout */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          
          {/* Stay */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <FadeIn direction="right" className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/homepage/stay.jpg" alt="Stay" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </FadeIn>
            <div className="flex-1 max-w-xl">
              <FadeIn delay={0.2} direction="left">
                <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6 inline-block">Accommodations</div>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Stay</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  Little affair is a family run boutique Jungle Lodge with 6 luxury stone villas, inspired by its natural surroundings and is an eco-friendly marvel of note.
                </p>
                <Link to="/stay" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-accent transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
                  Explore Villas <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Recreation */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center">
            <FadeIn direction="left" className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/recreation/am1-2302-hdr.jpg" alt="Recreation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </FadeIn>
            <div className="flex-1 max-w-xl md:text-right flex flex-col md:items-end">
              <FadeIn delay={0.2} direction="right">
                <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6 inline-block">Leisure</div>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Recreation</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  Splash your weariness after a day of exploration with our pool bar and lose yourself in the harmony of nature for a while!
                </p>
                <Link to="/recreation" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-accent transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
                  <ArrowRight className="w-4 h-4 rotate-180 md:hidden" /> Dive In <ArrowRight className="w-4 h-4 hidden md:block" />
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Dining */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <FadeIn direction="right" className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/homepage/dinning.jpg" alt="Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </FadeIn>
            <div className="flex-1 max-w-xl">
              <FadeIn delay={0.2} direction="left">
                <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6 inline-block">Culinary</div>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Dining</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  Amidst the plethora of experiences to indulge in, Little Affair offers you a specially curated menu, catering to your taste buds with flavors from a variety of delicacies.
                </p>
                <Link to="/dining" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-accent transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
                  Taste the wild <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Experiences & Adventure */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center">
            <FadeIn direction="left" className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/homepage/experience.jpg" alt="Experiences & Adventure" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </FadeIn>
            <div className="flex-1 max-w-xl md:text-right flex flex-col md:items-end">
              <FadeIn delay={0.2} direction="right">
                <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6 inline-block">Activities</div>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Experiences & Adventure</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  Focussing on relaxing and slowing down, there are various activities awaiting you. With the best symphony of wildlife, water bodies and stunning landscapes, Little Affair is all about cherishing the moments that life has to offer.
                </p>
                <Link to="/experiences" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-accent transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
                  <ArrowRight className="w-4 h-4 rotate-180 md:hidden" /> Discover More <ArrowRight className="w-4 h-4 hidden md:block" />
                </Link>
              </FadeIn>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-24 overflow-hidden relative">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Gallery</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </FadeIn>
        
        <div className="relative max-w-[100vw] overflow-x-hidden">
          <div className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
            {[
              "/home-carousel/img-7754.jpg",
              "/home-carousel/img-7756.jpg",
              "/home-carousel/img-7759.jpg",
              "/home-carousel/img-7760.jpg",
              "/home-carousel/img-7761.jpg",
              "/home-carousel/img-7766.jpg",
              "/home-carousel/img-7774.jpg",
              "/home-carousel/img-7776.jpg",
              "/home-carousel/img-7791.jpg",
              "/home-carousel/img-7798.jpg",
              "/home-carousel/img-7800.jpg",
              "/home-carousel/img-7801.jpg",
              "/home-carousel/img-7804.jpg",
              "/home-carousel/img-7805.jpg",
              "/home-carousel/img-7807.jpg",
              "/home-carousel/img-7809.jpg",
              "/home-carousel/img-7813.jpg",
              "/home-carousel/img-7823.jpg"
            ].map((src, i) => (
              <div key={i} className="w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl snap-center shrink-0">
                <img src={src} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-accent hover:text-accent-dark transition-colors">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Info Cards (Material style) */}
      <section className="py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1} direction="up" className="h-full">
              <Link to="/gallery" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-[#f3eddf] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-accent stroke-1" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">What to Pack</h3>
                <p className="text-gray-500 font-light text-sm md:text-base">Ensure you have all the essentials for your jungle adventure.</p>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="up" className="h-full">
              <Link to="/gallery" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-[#f3eddf] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Sun className="w-8 h-8 text-accent stroke-1" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">Weather Guide</h3>
                <p className="text-gray-500 font-light text-sm md:text-base">Check the seasonal climate to plan the perfect time for your visit.</p>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up" className="h-full">
              <Link to="/gallery" className="block h-full bg-white rounded-[2rem] p-10 hover:shadow-xl transition-shadow duration-300 group">
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

      {/* Conservation & CTA */}
      <section className="py-12 md:py-24 px-4 md:px-8 mb-4">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-accent text-white shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('/stone-villas.jpg')] bg-cover bg-center mix-blend-overlay" />
          
          <div className="relative z-10 px-8 py-16 md:py-24 md:px-24 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
            <div className="flex-1">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold mb-8">
                  <MapPin className="w-4 h-4" /> Sariska, Rajasthan
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">A step towards conservation!</h2>
                <p className="text-lg font-light leading-relaxed mb-8 text-white/90">
                  We also completely promote the idea of moving forward ecologically and preserving the environment. All the construction being done at the Little Affair property is eco-friendly with locally sourced stones and materials.
                </p>
              </FadeIn>
            </div>
            
            <div className="flex-1 md:border-l border-white/20 md:pl-12 flex flex-col justify-center items-center md:items-start w-full">
              <FadeIn delay={0.2} direction="left">
                <p className="text-3xl md:text-4xl font-serif mb-4">
                  Welcome to Little Affair.
                </p>
                <p className="italic font-light opacity-90 mb-10 text-lg">
                  Experience the Grand Adventures of life!
                </p>
                
                <Link to="/book" className="inline-flex items-center justify-center gap-2 bg-white text-accent px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl w-full md:w-auto">
                  Reserve Your Stay
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

