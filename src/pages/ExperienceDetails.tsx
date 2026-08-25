import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Users, Clock, Coffee, Utensils, Info } from 'lucide-react';
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

const experienceData: Record<string, any> = {
  "leopard-trail": {
    title: "Leopard Trail",
    location: "Sariska, Alwar",
    shortDesc: "Our Leopard Trail takes you into the nearby buffer forests of Sariska Tiger Reserve, where the wilderness meets the rustic charm of rural Sariska.",
    stats: [
      { label: "2-6 Guests Max", icon: Users },
      { label: "Duration: 90-100 Minutes", icon: Clock },
      { label: "Leisurely High Tea", icon: Coffee },
      { label: "Local Safari Expert Guide", icon: Info }
    ],
    desc1: "At Little Affair, we take you beyond the usual safari experience. Our Leopard Trail takes you into the nearby buffer forests of Sariska Tiger Reserve, where the wilderness meets the rustic charm of rural Sariska.",
    desc2: "The trail lasts around 90–100 minutes, accompanied by our local safari expert who helps you discover the forest, its stories, and its inhabitants. Along the way, you may encounter a majestic nilgai, a wild boar, peacocks and other wildlife—and, if luck is on your side, the elusive leopard of Sariska.",
    desc3: "The experience is made even more special with a leisurely high tea, allowing you to pause, soak in the surroundings and enjoy the simple beauty of the forest and countryside.",
    desc4: "A little adventure, a little wilderness, and a lovely little affair with Sariska.",
    images: [
      "/leopard trail.jpg",
      "/leopard trail1.jpg",
      "/leopard trail2.jpg",
      "/leopard trail3.jpg"
    ]
  },
  "high-tea-by-the-boulders": {
    title: "High Tea by the Boulders",
    location: "Sariska, Alwar",
    shortDesc: "Soak in the breathtaking views on the boulders accompanied by delicious food and a leisurely setting just for you.",
    stats: [
      { label: "2-10 People", icon: Users },
      { label: "Duration - 90 Minutes", icon: Clock },
      { label: "Tea / Coffee / Beverage", icon: Coffee },
      { label: "Cookies / Sandwich / Pakora", icon: Utensils }
    ],
    desc1: "Welcome to Little Affair Sariska, where adventure meets tranquility! Picture yourself amidst the rugged boulders, sipping on your favorite tea, coffee, or beverage, as you unwind and rejuvenate your senses. Let the calming sounds of nature serenade you as you bond with your companions over steaming cups and delightful conversation.",
    desc2: "As you soak in the picturesque surroundings, tantalize your taste buds with a delectable spread of high tea delights. From cookies to savory sandwiches and crispy pakoras, our high tea menu is designed to satisfy every craving and fuel your adventurous spirit.",
    desc3: "Whether you’re seeking a romantic escape, a family outing, or a memorable time with friends, our “High Tea by the Boulders” package promises an unforgettable experience that blends adventure, relaxation, and high tea delights.",
    images: [
      "/high tea by boulders.jpg",
      "/high tea by boulders2.jpg",
      "/high tea by boulders3.jpg",
      "/high tea by boulders4.jpg"
    ]
  },
  "high-tea-by-the-lake": {
    title: "High Tea by the Lake",
    location: "Sariska, Alwar",
    shortDesc: "Savor breathtaking lakeside view amidst a leisurely setting, creating an unforgettable blend of nature, delicious food, and tranquility.",
    stats: [
      { label: "2-8 People", icon: Users },
      { label: "Duration: 60-90 Minutes", icon: Clock },
      { label: "Tea / Coffee / Beverage", icon: Coffee },
      { label: "Cookies / Sandwich / Pakora", icon: Utensils }
    ],
    desc1: "Welcome to Little Affair Sariska, where adventure and tranquility converge to create unforgettable moments amidst the breathtaking beauty of Sariska! As you arrive at our secluded spot, you’ll be greeted by the soothing sounds of nature and the gentle breeze whispering through the trees.",
    desc2: "Take a seat at our beautifully set-up lakeside area and prepare to be pampered with a delightful high tea experience. Sip on your choice of tea, coffee, or beverages, served fresh and piping hot, as you unwind and soak in the tranquil atmosphere.",
    desc3: "Whether you’re celebrating a special occasion or simply craving a moment of peace and relaxation amidst nature, our “High Tea by the Lake” package promises an experience that will leave you with cherished memories to last a lifetime.",
    images: [
      "/high tea by the lake.jpg",
      "/high tea by the lake2.jpg",
      "/high tea by the lake3.jpg",
      "/high tea by the lake4.jpg"
    ]
  },
  "bush-farm-dinner": {
    title: "Bush/Farm Dinner",
    location: "Sariska, Alwar",
    shortDesc: "The perfect way to end your day with a rustic touch to it is a hearty and memorable dining experience in the jungle/Farm, surrounded by the beauty and wilderness of Tehla.",
    stats: [
      { label: "2-6 People", icon: Users },
      { label: "Duration - 2 Hrs", icon: Clock },
      { label: "Food Menu - As Per Requirement", icon: Utensils }
    ],
    desc1: "Welcome to Little Affair Sariska, where adventure meets gourmet dining under the stars! As the sun sets and the stars begin to twinkle overhead, we’ll whisk you away to a secluded spot in the wilderness, where the magic of the bush awaits. With the tranquil sounds of nature as your soundtrack, we’ll tantalize your taste buds with a custom-designed menu crafted to perfection.",
    desc2: "As you dine under the open sky, surrounded by the rugged beauty of Sariska, you’ll create memories to last a lifetime. Whether you’re celebrating a special occasion or simply savoring the joy of being alive, our Bush/farm Dinner package promises an experience that will leave you breathless and craving more.",
    desc3: "",
    images: [
      "/bushfarm dinner.jpg",
      "/bushfarm dinner2.jpg",
      "/bushfarm dinner3.jpg",
      "/bushfarm dinner4.jpg"
    ]
  },
  "special-setup": {
    title: "Special Setup",
    location: "Sariska, Alwar",
    shortDesc: "At our wilderness lodge, we take immense pleasure in crafting tailor-made and unforgettable experiences for our guests to celebrate their special occasion.",
    stats: [
      { label: "2-8 People", icon: Users },
      { label: "Duration - Custom", icon: Clock },
      { label: "Menu - As Per Request", icon: Utensils }
    ],
    desc1: "At our wilderness lodge, we take immense pleasure in crafting tailor-made and unforgettable experiences for our guests to celebrate their special occasion. Whether you’re commemorating a birthday, anniversary, date night, hens party, bachelor’s party, or any other milestone, our dedicated team is committed to creating an ambiance that resonates with the beauty of the natural surroundings. Our special setups are designed to elevate your celebration, turning it into a magical and unique setup.",
    desc2: "Imagine a secluded clearing transformed with the warm glow of fairy lights and lanterns, providing the perfect backdrop for a romantic dinner under the starlit sky. For birthdays, we go the extra mile with the custom jungle setup with tea lights and selected menu, ensuring that your day is celebrated in style amidst the lush greenery.",
    desc3: "",
    images: [
      "/Special Setup.jpg",
      "/Special Setup1.jpg",
      "/Special Setup2.jpg",
      "/Special Setup3.jpg"
    ]
  },
  "nature-village-walk": {
    title: "Nature/Village Walk",
    location: "Sariska, Alwar",
    shortDesc: "Explore the wilderness with our team and peek into the unseen wildlife and adventures of the forest. Mingle with the locals, get to know in-depth about the local flora and fauna!",
    stats: [
      { label: "2-10 People", icon: Users },
      { label: "Duration - 60-90 Minutes", icon: Clock }
    ],
    desc1: "Join us as we venture deep into the untouched beauty of the Village, offering you a unique opportunity to witness the wonders of different culture and uncover hidden adventures that await.",
    desc2: "Immerse yourself in the local culture by mingling with the friendly residents who call the forest home. Gain insights into their traditional practices, stories, and a deep understanding of the delicate balance between humans and nature. During your jungle walk get a chance to explore the local flora and fona and you might be lucky to spot some buffalows, nilgai, rabbits and much more. This unique opportunity allows you to form connections that go beyond the surface, fostering a sense of appreciation for the environment and its inhabitants.",
    desc3: "",
    images: [
      "/Nature Village Walk.jpg",
      "/Nature Village Walk1.jpg",
      "/Nature Village Walk2.jpg",
      "/Nature Village Walk3.jpg"
    ]
  },
  "sariska-jungle-safari": {
    title: "Sariska Jungle Safari",
    location: "Sariska, Alwar",
    shortDesc: "Travel in the back of a covered, open-air safari truck/ jeep, with an expert guide and Venture into the expanse of Sariska to get an up-close view of a variety of birds, mammals and of course the majestic Tiger!",
    stats: [
      { label: "Upto 6 People per Jeep", icon: Users },
      { label: "Duration - 3.5 Hrs", icon: Clock },
      { label: "Subject to Availability", icon: Info }
    ],
    desc1: "Prepare for a thrilling 3.5-hour expedition deep into the heart of Sariska’s untamed wilderness. With experienced forest guides leading the way, you’ll venture off the beaten path and into the realm of majestic tigers, elusive leopards, and a myriad of other fascinating wildlife species.",
    desc2: "As you navigate through the rugged terrain of Sariska National Park, keep your eyes peeled for sightings of the park’s resident inhabitants. From graceful deer grazing in the meadows to exotic bird species flitting through the treetops, every moment promises a new and exciting encounter with nature.",
    desc3: "",
    images: [
      "/sariska jungle safari.jpg",
      "/sariska jungle safari1.jpg",
      "/sariska jungle safari2.jpg",
      "/sariska jungle safari3.jpeg"
    ]
  }
};

export function ExperienceDetails() {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !experienceData[id]) {
    return <Navigate to="/experiences" />;
  }

  const data = experienceData[id];

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfa] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title={`${data.title} | Experiences at Little Affair Sariska`}
        description={data.shortDesc || `${data.title} at Little Affair Sariska in Rajasthan.`}
        path={`/experiences/${id}`}
        keywords={`${data.title}, Little Affair Sariska experiences, Sariska activities, Sariska resort`}
        ogImage={data.images && data.images[0] ? `https://www.littleaffairsariska.com${data.images[0]}` : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          "name": data.title,
          "description": data.shortDesc,
          "location": {
            "@type": "Place",
            "name": "Little Affair Sariska",
            "address": "Tehla, Sariska, Alwar, Rajasthan"
          }
        }}
      />
      <section className="px-4 md:px-8 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 mb-6 capitalize leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-600 font-light text-lg md:text-2xl leading-relaxed">
              {data.shortDesc}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                <div className="flex items-center gap-4 text-accent mb-8 pb-8 border-b border-gray-100">
                   <MapPin className="w-6 h-6" />
                   <div>
                     <p className="text-sm uppercase tracking-widest font-semibold text-gray-400">Package Location</p>
                     <p className="text-xl font-serif text-gray-900">{data.location}</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="bg-[#f3eddf] p-3 rounded-xl mt-1">
                        <stat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 mt-8 border-t border-gray-100">
                  <Link to="/book" className="inline-flex items-center justify-center w-full gap-2 bg-accent text-white px-8 py-4 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-lg">
                    Book Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                 {data.images.slice(0, 4).map((src: string, idx: number) => (
                    <div key={idx} className={`rounded-[2rem] overflow-hidden shadow-lg ${idx === 0 || idx === 3 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                      <img src={src} alt={`${data.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                 ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="up" className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-stone mx-auto text-gray-600 font-light text-justify">
              <p className="mb-6 leading-loose">{data.desc1}</p>
              <p className="mb-6 leading-loose">{data.desc2}</p>
              {data.desc3 && <p className="mb-6 leading-loose">{data.desc3}</p>}
              {data.desc4 && <p className="mb-6 leading-loose">{data.desc4}</p>}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 text-center bg-[#f3eddf] relative">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6">
            Together We Can Make Awesome Memories
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
            Are You Ready To Join Us On Your Next Trip?
          </p>
          <Link to="/experiences" className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gray-50 transition-colors shadow-xl">
            Discover Destination <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
