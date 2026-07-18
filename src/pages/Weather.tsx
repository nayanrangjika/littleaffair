import { motion } from 'motion/react';
import { Sun, CloudRain, Snowflake, Cloud, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WeatherWidget } from '../components/WeatherWidget';

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

export function Weather() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Cloud className="w-4 h-4" /> Seasons
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Weather</span> Check
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Intro Text & Widget */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn delay={0.2} direction="up">
            <p className="text-gray-600 font-light text-xl md:text-2xl leading-relaxed mb-6">
              With so many views to take in and so much to do, it's always a good time to visit Little Affair.
            </p>
            <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed mb-6">
              Untouched by the routine city life, Tehla is surrounded by hills, wilderness and water bodies, making every season different from another.
            </p>
            <p className="text-gray-600 font-light text-lg leading-relaxed bg-white/50 p-6 rounded-3xl inline-block shadow-sm">
              Hence, we have accumulated a few tips, a packing list and things to expect during your visit according to the ongoing season.
            </p>
          </FadeIn>
        </div>

        {/* Weather Widget */}
        <div className="max-w-4xl mx-auto flex justify-center">
          <FadeIn delay={0.3}>
            <WeatherWidget skin="light" />
          </FadeIn>
        </div>
      </section>

      {/* Seasons Grid */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          
          {/* Summer */}
          <FadeIn direction="up">
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full filter blur-[80px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="flex-1 relative z-10 w-full text-center md:text-left">
                <Sun className="w-16 h-16 text-orange-500 mb-6 mx-auto md:mx-0" />
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Summers</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  Summer typically lasts from April to June approaching 45+ degrees Celsius, making it an ideal time for Jungle Safari's and to hit the pool!
                </p>
              </div>

              <div className="flex-1 w-full flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="flex-1 bg-[#f3eddf] p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-gray-300 pb-2">What to pack</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Switch to lose-Cotton clothing instead of dark and tight garments.</li>
                    <li>SPF Creams, pair of sunglasses and a hat are always good to keep you away from the Tan.</li>
                    <li>Comfortable Footwear</li>
                    <li>That summer playlist you have been waiting to play since 2020!</li>
                  </ul>
                </div>
                <div className="flex-1 bg-accent/10 p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-accent/20 pb-2">What to expect</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Animal Sightings</li>
                    <li>Pleasing Sundowners with drinks at the Rooftop lounge</li>
                    <li>Stargazing at beautiful clear skies</li>
                    <li>Beautiful evenings by the lake</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Monsoon */}
          <FadeIn direction="up">
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-[80px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="flex-1 relative z-10 w-full text-center md:text-left">
                <CloudRain className="w-16 h-16 text-blue-500 mb-6 mx-auto md:mx-0" />
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Monsoon</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-6">
                  The Monsoon Season is around from July till September, turning the dry lands into beautiful green landscapes. While this season is pleasant and cozy at most times, it also gets a little humid and attracts bugs.
                </p>
                <div className="bg-blue-50 p-4 rounded-2xl inline-block text-sm font-light text-gray-700">
                  <strong>Tip:</strong> Try keeping your doors and windows closed to avoid bugs. Avoid bright clothes and heavy scents!
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="flex-1 bg-[#f3eddf] p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-gray-300 pb-2">What to pack</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Rain Jackets</li>
                    <li>Bug Spray</li>
                    <li>Waterproof footwear</li>
                  </ul>
                </div>
                <div className="flex-1 bg-accent/10 p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-accent/20 pb-2">What to expect</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Cozy evenings with delicious snacks</li>
                    <li>Mesmerising Sights</li>
                    <li>Artificial and temporary lakes filled up due to rains</li>
                    <li>View of Washed-up green mountains in the middle of the Desert</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Winter */}
          <FadeIn direction="up">
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full filter blur-[80px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="flex-1 relative z-10 w-full text-center md:text-left">
                <Snowflake className="w-16 h-16 text-gray-400 mb-6 mx-auto md:mx-0" />
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Winters</h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed mb-8">
                  The months of October and November are mostly pleasant, but it can get quite chilly in months like December and January, leading to months after that getting pleasant again.
                </p>
              </div>

              <div className="flex-1 w-full flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="flex-1 bg-[#f3eddf] p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-gray-300 pb-2">What to pack</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Warm Clothes (Jacket, Sweaters, Scarves, Socks, caps etc)</li>
                    <li>Greasy Moisturiser and Lip Balms</li>
                    <li>Boots</li>
                  </ul>
                </div>
                <div className="flex-1 bg-accent/10 p-8 rounded-[2rem]">
                  <h3 className="text-xl font-serif text-gray-900 mb-4 border-b border-accent/20 pb-2">What to expect</h3>
                  <ul className="space-y-3 text-gray-600 font-light text-sm md:text-base list-disc list-outside ml-4">
                    <li>Bonfires and Barbeques</li>
                    <li>Sun Bathing in the Cozy Sunsets and Sunrise</li>
                    <li>Enhanced Hi tea experiences</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Outro & CTA */}
      <section className="py-24 px-4 md:px-8 text-center bg-white rounded-t-[4rem] shadow-2xl relative z-10">
        <FadeIn>
          <MapPin className="w-12 h-12 text-accent mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-serif text-gray-900 mb-10 max-w-4xl mx-auto leading-relaxed">
            These are a few suggestions we advise you to take note of making your trip more adventurous, memorable and worthwhile!
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>

    </div>
  );
}
