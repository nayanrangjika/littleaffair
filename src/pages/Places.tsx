import { motion } from 'motion/react';
import { MapPin, ArrowRight, Clock, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const places = [
  {
    title: "Neelkanth Mahadev",
    description: "Neelkanth Mahadev Temple in Sariska, Rajasthan, honors Lord Shiva’s divine presence. Surrounded by the majestic Aravalli Range, it offers a tranquil retreat for worship and meditation. With its ancient charm and serene ambiance, the temple beckons devotees and travelers seeking spiritual solace amidst Rajasthan’s breathtaking landscapes.",
    distance: "16kms",
    time: "30mins",
    image: "https://www.trawell.in/admin/images/upload/673296199Neelkanth-Mahadev-Temple.jpg"
  },
  {
    title: "Bhangarh",
    description: "Bhangarh, an abandoned town in Rajasthan, India, is famed for its haunting tales and eerie atmosphere. Legend has it that a curse befell the town, leading to its abandonment. Today, it’s a popular destination for thrill-seekers and ghost hunters, drawn to its mysterious ruins and spooky reputation.",
    distance: "25kms",
    time: "40mins",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Bhangarh_Fort_-_Royal_Palace_Bhangarh_%28July_2022%29_-_img_16.jpg"
  },
  {
    title: "Chand Baori Step Well (Abhaneri)",
    description: "Chand Baori Step Well, located in Abhaneri, Rajasthan, is a mesmerizing architectural marvel. With 3,500 steps descending 13 stories, it’s one of the deepest and largest step wells in India. Built in the 9th century, its symmetrical design and intricate carvings captivate visitors, reflecting ancient engineering brilliance.",
    distance: "50kms",
    time: "1.2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Chand_Baori_perspective_panorama_%28July_2022%29.jpg"
  },
  {
    title: "Pandupol Hanuman mandir",
    description: "Pandupol Hanuman Mandir, situated in Rajasthan, is a revered temple dedicated to Lord Hanuman. Located near Sariska National Park, it attracts devotees seeking blessings and spiritual solace. Legends say that this temple marks the spot where Lord Hanuman rested during his journey to rescue Mata Sita in the Ramayana epic.",
    distance: "22kms",
    time: "1.2 hours",
    image: "https://staticimg.amarujala.com/assets/images/2025/04/12/rajasathana_407ff638ac2368c4b2dc19212f69c750.jpeg?w=414&dpr=3.0&q=80"
  },
  {
    title: "Gola ka bas",
    description: "Gola Ka Bas, a quaint village in Rajasthan, famous for marble statues, exudes rural charm and cultural richness. Nestled amidst scenic landscapes, it offers a glimpse into traditional Rajasthani life. Visitors can explore its vibrant markets, adorned with colorful handicrafts, and savor locally grown fresh vegetables or local sweets, immersing themselves in the village’s timeless allure.",
    distance: "25kms",
    time: "30mins",
    image: "https://live.staticflickr.com/4130/4843224636_ac3c07e355_c.jpg"
  }
];

export function Places() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <MapPin className="w-4 h-4" /> Explore
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Places</span> to Visit
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
          {places.map((place, index) => {
             const isEven = index % 2 === 0;
             return (
              <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                <FadeIn direction={isEven ? "right" : "left"} className="flex-1 w-full">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl relative h-[400px] md:h-[500px] group">
                     <img 
                       src={place.image} 
                       alt={place.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </FadeIn>

                <FadeIn direction={isEven ? "left" : "right"} className="flex-1 w-full text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">{place.title}</h2>
                  <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed mb-8">
                    {place.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-8 justify-center md:justify-start">
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
                      <Navigation className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Distance</div>
                        <div className="font-medium text-gray-900">{place.distance}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Est. Time</div>
                        <div className="font-medium text-gray-900">{place.time}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
             )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center bg-white rounded-t-[4rem] shadow-2xl relative z-10">
        <FadeIn>
          <p className="text-2xl md:text-3xl font-serif text-gray-900 mb-10 max-w-4xl mx-auto leading-relaxed">
            Discover the rich history and breathtaking landscapes surrounding Little Affair.
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
            Plan Your Stay <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
