import React from 'react';
import { motion } from 'motion/react';
import { Compass, Coffee, Map, Palmtree, ArrowRight } from 'lucide-react';
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

const experiences = [
  {
    title: "Leopard Trail",
    description: "Take a journey into the nearby buffer forests of Sariska Tiger Reserve where wilderness meets rustic charm, complete with a local safari expert and a leisurely high tea.",
    icon: Compass,
    image: "/experiences/leopard-trail.jpg"
  },
  {
    title: "High Tea by the Boulders",
    description: "Soak in the breathtaking views on the boulders accompanied by delicious food and a leisurely setting just for you.",
    icon: Coffee,
    image: "/experiences/high-tea-by-the-boulders.jpg"
  },
  {
    title: "High Tea by the Lake",
    description: "Savor breathtaking lakeside view amidst a leisurely setting, creating an unforgettable blend of nature, delicious food, and tranquility.",
    icon: Coffee,
    image: "/experiences/high-tea-by-the-lake.jpg"
  },
  {
    title: "Bush/Farm Dinner",
    description: "The perfect way to end your day with a rustic touch to it is a hearty and memorable dining experience in the Jungle/Farm, surrounded by the beauty and wilderness of Tehla.",
    icon: Palmtree,
    image: "/experiences/bush-farm-dinner.jpg"
  },
  {
    title: "Special Setup",
    description: "At our wilderness lodge, we take immense pleasure in crafting tailor-made and unforgettable experiences for our guests to celebrate their special occasion.",
    icon: Compass,
    image: "/experiences/special-setup.jpg"
  },
  {
    title: "Nature/Village Walk",
    description: "Explore the wilderness with our team and peek into the unseen wildlife and adventures of the forest. Mingle with the locals, get to know in-depth about the local flora and fauna!",
    icon: Map,
    image: "/experiences/nature-village-walk.jpg"
  },
  {
    title: "Sariska Jungle Safari",
    description: "Travel in the back of a covered, open-air safari truck/ jeep, with an expert guide and Venture into the expanse of Sariska to get an up-close view of a variety of birds, mammals and of course the majestic Tiger!",
    icon: Compass,
    image: "/experiences/sariska-jungle-safari.jpg"
  }
];

export function Experiences() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title="Curated Experiences & Wildlife Safaris | Little Affair Sariska"
        description="Discover unforgettable adventures at Little Affair Sariska: Sariska Jungle Safari, Bush Farm Dinners, High Tea by the Boulders, High Tea by the Lake, and Nature Village Walks."
        path="/experiences"
        keywords="Sariska Jungle Safari, High Tea by the Boulders, Bush Farm Dinner Sariska, Sariska activities, Wildlife safari Rajasthan, Nature walk Sariska"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Experiences at Little Affair Sariska",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Sariska Jungle Safari" },
            { "@type": "ListItem", "position": 2, "name": "Bush Farm Dinner" },
            { "@type": "ListItem", "position": 3, "name": "High Tea by the Boulders" },
            { "@type": "ListItem", "position": 4, "name": "High Tea by the Lake" },
            { "@type": "ListItem", "position": 5, "name": "Nature & Village Walk" }
          ]
        }}
      />
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Compass className="w-4 h-4" /> Discover
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Experiences</span> & Adventure
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn delay={0.2} direction="up">
            <p className="text-gray-600 font-light text-xl md:text-2xl leading-relaxed mb-6">
              Focusing on relaxing and slowing down, there are various activities awaiting you. With the best symphony of wildlife, water bodies and stunning landscapes, Little Affair is all about cherishing the moments that life has to offer.
            </p>
            <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed">
              There are plenty of on-property amenities to keep you entertained, plus natural settings that ensure great views. To enhance the experience, Little Affair has various outdoor activities for you to indulge in!
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid Experiences */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const slug = exp.title.toLowerCase().replace(/ \/ /g, '-').replace(/\//g, '-').replace(/ /g, '-');
            return (
              <FadeIn key={index} delay={index * 0.1} className="h-full">
                <Link to={`/experiences/${slug}`} className="block h-full">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl h-full flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                    <div className="h-64 overflow-hidden relative">
                      <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white uppercase tracking-widest text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">View Details <ArrowRight className="w-4 h-4" /></span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                         <exp.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-serif text-gray-900 mb-4">{exp.title}</h3>
                      <p className="text-gray-600 font-light text-base leading-relaxed flex-grow mb-6">
                        {exp.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-semibold uppercase tracking-widest gap-2 group-hover:text-accent-dark transition-colors mt-auto">
                        Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center bg-white rounded-t-[4rem] shadow-2xl relative z-10">
        <FadeIn>
          <p className="text-2xl md:text-3xl font-serif text-gray-900 mb-10 max-w-4xl mx-auto leading-relaxed">
            From sunrise to sunset, the views never fail to amaze you. Bringing you the most exquisite experience from the little affairs of life with a taste of adventure.
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl">
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
