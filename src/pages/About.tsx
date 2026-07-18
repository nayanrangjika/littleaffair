import { motion } from 'motion/react';
import { Leaf, MapPin, Compass } from 'lucide-react';

function FadeIn({ children, delay = 0, className, direction = "up" }: { children: React.ReactNode; delay?: number; className?: string, direction?: "up" | "left" | "right" }) {
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

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Leaf className="w-4 h-4" /> Our Story
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              About <span className="italic text-accent">Little Affair</span>
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
                    Welcome to Little Affair, a charming family-run lodge nestled in the heart of Sariska, where the rustic charm of nature meets the elegance of stone villas.
                  </p>
                  <p>
                    Our property is a serene escape from the hustle and bustle, offering an intimate and peaceful retreat for those seeking a tranquil getaway.
                  </p>
                  <p>
                    Little Affair boasts six exquisitely crafted stone villas, each designed with a perfect blend of modern comfort and traditional aesthetics. The architecture reflects the rich cultural heritage of the region, creating a warm and inviting atmosphere for our guests.
                  </p>
                  <p>
                    Surrounded by the lush greenery of Sariska, our lodge provides a rejuvenating experience for nature enthusiasts. Wake up to the symphony of birdsong and enjoy your morning coffee on the private patio of your villa, taking in breathtaking views of the natural beauty that surrounds Little Affair.
                  </p>
                </div>
                
                <div className="relative">
                  <img 
                    src="/stay/private villas.jpg" 
                    alt="Lodge Villa" 
                    className="w-full h-auto rounded-[2rem] shadow-xl object-cover aspect-[4/5]"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-accent text-white p-8 rounded-[2rem] shadow-xl max-w-[250px] hidden md:block">
                    <MapPin className="w-8 h-8 mb-4" />
                    <p className="font-serif text-xl">Nestled in the heart of Sariska</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Modern Horizontal Scrolling/Masonry Gallery */}
      <section className="py-24 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f3eddf] px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6">
                Glimpses of Serenity
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900">Our Property</h2>
            </div>
            <p className="text-gray-500 font-light max-w-md text-lg">
              Explore the intricate details and breathtaking landscapes that make our lodge a unique destination.
            </p>
          </FadeIn>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { src: "/stay/o.jpg", aspect: "aspect-[4/3]" },
              { src: "/stay/i.jpg", aspect: "aspect-[3/4]" },
              { src: "/stay/o3.jpg", aspect: "aspect-square" },
              { src: "/dinning/indoor dinning.png", aspect: "aspect-[4/5]" },
              { src: "/dinning/courtyard dinning.png", aspect: "aspect-[16/9]" },
              { src: "/experiences/sariska jungle safari.jpg", aspect: "aspect-square" },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1} className="break-inside-avoid">
                <div className={`overflow-hidden rounded-[2rem] group relative shadow-md w-full ${item.aspect}`}>
                  <img 
                    src={item.src} 
                    alt={`Gallery Image ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sariska Section - Feature Cards */}
      <section className="py-24 md:py-32 bg-[#f3eddf] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-10 leading-tight">
              Why Sariska Should be <br/><span className="italic text-accent">Your Next Destination?</span>
            </h2>
            <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px]">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQqmxegusJ2EzJjh5crdV9E58QWGuE7_8frbcYl2xvJnSOrH2_3KI5t4k&s=10" alt="Tiger in Sariska" className="w-full h-full object-cover" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1} direction="up" className="h-full">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl h-full hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-serif text-gray-900 mb-6">Nature's Splendor</h3>
                <p className="text-gray-600 font-light text-lg leading-relaxed">
                  Nestled amidst the Aravalli Range, Sariska exudes a captivating beauty that seamlessly blends nature’s splendor with historical allure. Lush greenery embraces the landscape, adorned by the vibrant hues of diverse flora.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="up" className="h-full">
              <div className="bg-accent p-10 rounded-[2.5rem] shadow-xl h-full text-white hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-serif mb-6">Wildlife Sanctuary</h3>
                <p className="text-white/90 font-light text-lg leading-relaxed">
                  The Sariska National Park adds to the allure with its majestic inhabitants, including the elusive Bengal tiger. The landscape unfolds like a painter’s canvas, featuring ancient temples echoing tales of bygone eras.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up" className="h-full">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl h-full hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-serif text-gray-900 mb-6">Harmonious Embrace</h3>
                <p className="text-gray-600 font-light text-lg leading-relaxed">
                  The rhythmic melodies of indigenous birds and the whispering winds paint a symphony. Every sunset in Sariska paints the sky in a palette of warm hues, making it a haven for those seeking the sublime.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}

