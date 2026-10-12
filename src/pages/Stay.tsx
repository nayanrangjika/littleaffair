import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BedDouble,
  Home,
  Bath,
  Trees,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  CheckCircle2,
  Sparkles,
  Coffee
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

function FadeIn({
  children,
  delay = 0,
  className,
  direction = 'up'
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  key?: any;
}) {
  const yOffset = direction === 'up' ? 40 : 0;
  const xOffset = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface RoomCategoryData {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  images: string[];
  comfortAndEssentials: string[];
  viewsAndAmbience: string[];
  bathroomAndPersonalCare: string[];
  inRoomConvenience: string[];
  other: string[];
}

export const ROOM_CATEGORIES: RoomCategoryData[] = [
  {
    slug: 'stone-villa-with-private-sit-out',
    title: 'Stone Villa With Private Sit Out',
    subtitle: 'Along with Open Shower and Private Terrace with Day-Bed',
    coverImage: '/landing/stay/stone-villa-private-sitout/1.jpg',
    images: [
      '/landing/stay/stone-villa-private-sitout/1.jpg',
      '/landing/stay/stone-villa-private-sitout/2.jpg',
      '/landing/stay/stone-villa-private-sitout/3.jpg',
      '/landing/stay/stone-villa-private-sitout/4.jpg',
      '/landing/stay/stone-villa-private-sitout/5.jpg',
      '/landing/stay/stone-villa-private-sitout/6.jpg',
      '/landing/stay/stone-villa-private-sitout/7.jpg'
    ],
    comfortAndEssentials: [
      'Comfortable king-size bed',
      'Private Sit Out',
      'Premium linen and pillows',
      'Air conditioning / heating',
      'Wardrobe or luggage storage',
      'Seating area',
      'Daily housekeeping'
    ],
    viewsAndAmbience: [
      'Mountain views',
      'Private terrace',
      'Natural surroundings and peaceful ambience',
      'Outdoor seating',
      'Scenic sunrise or sunset views'
    ],
    bathroomAndPersonalCare: [
      'Attached private bathroom',
      'Hot and cold running water',
      'Fresh towels and toiletries',
      'Shower and bathroom essentials',
      'Hair dryer'
    ],
    inRoomConvenience: [
      'Complimentary drinking water',
      'Tea and coffee facilities',
      'Wi-Fi connectivity',
      'Charging points near the bed',
      'Mini-fridge',
      'Room service'
    ],
    other: [
      'Pet-Friendly Stay',
      'Unique Open-Air Terrace Bed',
      'Dining Experience',
      'Swimming Pool',
      'Lounge and Library',
      'Kids Play area and Gym',
      'Snooker Lounge',
      'Experiences and Adventure'
    ]
  },
  {
    slug: 'stone-villa-with-plunge-pool',
    title: 'Stone Villa With Plunge Pool',
    subtitle: 'Along with Private Sit Out and Private Terrace',
    coverImage: '/landing/stay/stone-villa-plunge-pool/3.jpg',
    images: [
      '/landing/stay/stone-villa-plunge-pool/3.jpg',
      '/landing/stay/stone-villa-plunge-pool/1.jpg',
      '/landing/stay/stone-villa-plunge-pool/2.jpg',
      '/landing/stay/stone-villa-plunge-pool/4.jpg',
      '/landing/stay/stone-villa-plunge-pool/5.jpg'
    ],
    comfortAndEssentials: [
      'Comfortable king-size bed',
      'Plunge Pool',
      'Premium linen and pillows',
      'Air conditioning / heating',
      'Wardrobe or luggage storage',
      'Seating area',
      'Daily housekeeping'
    ],
    viewsAndAmbience: [
      'Mountain views',
      'Private terrace',
      'Natural surroundings and peaceful ambience',
      'Outdoor seating',
      'Scenic sunrise or sunset views'
    ],
    bathroomAndPersonalCare: [
      'Attached private bathroom',
      'Hot and cold running water',
      'Fresh towels and toiletries',
      'Shower and bathroom essentials',
      'Hair dryer'
    ],
    inRoomConvenience: [
      'Complimentary drinking water',
      'Tea and coffee facilities',
      'Wi-Fi connectivity',
      'Charging points near the bed',
      'Mini-fridge',
      'Room service'
    ],
    other: [
      'Pet-Friendly Stay',
      'Unique Open-Air Terrace Bed',
      'Dining Experience',
      'Swimming Pool',
      'Lounge and Library',
      'Kids Play area and Gym',
      'Snooker Lounge',
      'Experiences and Adventure'
    ]
  },
  {
    slug: 'stone-cottage-with-plunge-pool',
    title: 'Stone Cottage With Plunge Pool',
    subtitle: 'Along with Sit Out',
    coverImage: '/landing/stay/stone-cottage-plunge-pool/4.jpg',
    images: [
      '/landing/stay/stone-cottage-plunge-pool/4.jpg',
      '/landing/stay/stone-cottage-plunge-pool/1.jpg',
      '/landing/stay/stone-cottage-plunge-pool/2.jpg',
      '/landing/stay/stone-cottage-plunge-pool/3.jpg',
      '/landing/stay/stone-cottage-plunge-pool/5.jpg',
      '/landing/stay/stone-cottage-plunge-pool/6.jpg'
    ],
    comfortAndEssentials: [
      'Comfortable king-size bed',
      'Plunge Pool',
      'Premium linen and pillows',
      'Air conditioning / heating',
      'Wardrobe or luggage storage',
      'Seating area',
      'Daily housekeeping'
    ],
    viewsAndAmbience: [
      'Mountain views',
      'Natural surroundings and peaceful ambience',
      'Outdoor seating',
      'Scenic sunrise or sunset views'
    ],
    bathroomAndPersonalCare: [
      'Attached private bathroom',
      'Hot and cold running water',
      'Fresh towels and toiletries',
      'Shower and bathroom essentials',
      'Hair dryer'
    ],
    inRoomConvenience: [
      'Complimentary drinking water',
      'Tea and coffee facilities',
      'Wi-Fi connectivity',
      'Charging points near the bed',
      'Mini-fridge',
      'Room service'
    ],
    other: [
      'Pet-Friendly Stay',
      'Unique Open-Air Terrace Bed',
      'Dining Experience',
      'Swimming Pool',
      'Lounge and Library',
      'Kids Play area and Gym',
      'Snooker Lounge',
      'Experiences and Adventure'
    ]
  },
  {
    slug: 'stone-cottage',
    title: 'Stone Cottage',
    subtitle: 'Along with Private Balcony',
    coverImage: '/landing/stay/stone-cottage/6.jpg',
    images: [
      '/landing/stay/stone-cottage/6.jpg',
      '/landing/stay/stone-cottage/1.jpg',
      '/landing/stay/stone-cottage/2.jpg',
      '/landing/stay/stone-cottage/3.jpg',
      '/landing/stay/stone-cottage/4.jpg',
      '/landing/stay/stone-cottage/5.jpg'
    ],
    comfortAndEssentials: [
      'Comfortable king-size bed',
      'Private Balcony',
      'Premium linen and pillows',
      'Air conditioning / heating',
      'Wardrobe or luggage storage',
      'Seating area',
      'Daily housekeeping'
    ],
    viewsAndAmbience: [
      'Mountain views',
      'Natural surroundings and peaceful ambience',
      'Outdoor seating',
      'Scenic sunrise or sunset views'
    ],
    bathroomAndPersonalCare: [
      'Attached private bathroom',
      'Hot and cold running water',
      'Fresh towels and toiletries',
      'Shower and bathroom essentials',
      'Hair dryer'
    ],
    inRoomConvenience: [
      'Complimentary drinking water',
      'Tea and coffee facilities',
      'Wi-Fi connectivity',
      'Charging points near the bed',
      'Mini-fridge',
      'Room service'
    ],
    other: [
      'Pet-Friendly Stay',
      'Unique Open-Air Terrace Bed',
      'Dining Experience',
      'Swimming Pool',
      'Lounge and Library',
      'Kids Play area and Gym',
      'Snooker Lounge',
      'Experiences and Adventure'
    ]
  }
];

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
  { src: '/stay/outdoor/IMG_7787.jpg', category: 'outdoor' }
];

export function Stay() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  // Match category slug if user arrived from "Explore Villa" on a specific room category
  const activeCategory = ROOM_CATEGORIES.find(
    (cat) =>
      cat.slug === categorySlug ||
      (categorySlug === 'stone-cottage-with-plunger-pool' &&
        cat.slug === 'stone-cottage-with-plunge-pool')
  );

  const lightboxList = activeCategory
    ? activeCategory.images
    : galleryImages
        .filter((img) => filter === 'all' || img.category === filter)
        .map((img) => img.src);

  const openLightbox = (index: number) => setSelectedImg(index);
  const closeLightbox = () => setSelectedImg(null);

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % lightboxList.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + lightboxList.length) % lightboxList.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO
        title={
          activeCategory
            ? `${activeCategory.title} | Stay at Little Affair Sariska`
            : 'Luxury Stone Villas & Accommodation | Little Affair Sariska'
        }
        description={
          activeCategory
            ? `${activeCategory.title} - ${activeCategory.subtitle} at Little Affair Sariska.`
            : 'Stay in eco-luxurious stone villas and cottages at Little Affair Sariska. Built with locally sourced stone, private verandas, plunge pools, and wilderness views.'
        }
        path={activeCategory ? `/stay/${activeCategory.slug}` : '/stay'}
        keywords="Stone Villas Sariska, Sariska resort stay, Luxury accommodation Sariska, Sariska Tiger Reserve villas, Eco luxury rooms Rajasthan"
        ogImage="https://www.littleaffairsariska.com/stay/indoor/AM1_2243-HDR.jpg"
      />

      {/* Category Switcher Pills so user can easily view any of the 4 categories */}
      <section className="px-4 md:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <Link
              to="/stay"
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                !activeCategory
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              All Accommodations
            </Link>
            {ROOM_CATEGORIES.map((cat) => {
              const isSelected = activeCategory?.slug === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  to={`/stay/${cat.slug}`}
                  onClick={() => setSelectedImg(null)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {activeCategory ? (
        /* DEDICATED ROOM CATEGORY VIEW (Opened when clicking Explore Villa on any category) */
        <>
          {/* Hero Header for Specific Category */}
          <section className="px-4 md:px-8 mb-12 md:mb-16">
            <div className="max-w-6xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-6 shadow-sm">
                  <Home className="w-4 h-4" /> Room Category
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4 leading-tight tracking-tight">
                  {activeCategory.title}
                </h1>
                <p className="text-lg sm:text-2xl text-accent font-serif italic mb-8">
                  {activeCategory.subtitle}
                </p>
                <p className="text-gray-700 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  Explore the best of Sariska&apos;s wilderness in luxurious and spacious private villa space equipped with bedroom, living room, dresser, bathroom, open shower and outside sitting deck to help you experience the sense of freedom and stillness all at one place!
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Category Photo Gallery Grid */}
          <section className="px-4 md:px-8 mb-16 md:mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategory.images.map((imgSrc, index) => (
                  <FadeIn key={imgSrc} delay={index * 0.06}>
                    <div
                      onClick={() => openLightbox(index)}
                      className="relative group aspect-[4/3] cursor-pointer overflow-hidden rounded-[2rem] bg-white shadow-lg"
                    >
                      <img
                        src={imgSrc}
                        alt={`${activeCategory.title} view ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white w-10 h-10" />
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Category Amenities & Features from Word Document */}
          <section className="px-4 md:px-8 py-16 md:py-24 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl mb-16">
            <div className="max-w-7xl mx-auto">
              <FadeIn className="text-center mb-12 md:mb-16">
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
                  Room Specifications & Inclusions
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-4">
                  What&apos;s Inside Your {activeCategory.title}
                </h2>
                <div className="w-16 h-1 bg-accent mx-auto" />
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 1. Comfort & Essentials */}
                <FadeIn delay={0.05} className="bg-[#f3eddf]/50 rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                      <BedDouble className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900">Comfort &amp; Essentials</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {activeCategory.comfortAndEssentials.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 font-light text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>

                {/* 2. Views & Ambience */}
                <FadeIn delay={0.1} className="bg-[#f3eddf]/50 rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                      <Trees className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900">Views &amp; Ambience</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {activeCategory.viewsAndAmbience.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 font-light text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>

                {/* 3. Bathroom & Personal Care */}
                <FadeIn delay={0.15} className="bg-[#f3eddf]/50 rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                      <Bath className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900">Bathroom &amp; Personal Care</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {activeCategory.bathroomAndPersonalCare.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 font-light text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>

                {/* 4. In-Room Convenience */}
                <FadeIn delay={0.2} className="bg-[#f3eddf]/50 rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900">In-Room Convenience</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {activeCategory.inRoomConvenience.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 font-light text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>

              {/* 5. Other Resort Experiences & Access */}
              <FadeIn delay={0.25} className="bg-[#f3eddf]/75 rounded-[2rem] p-8 sm:p-10 border border-black/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900">Other</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeCategory.other.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm text-gray-800 font-medium text-sm sm:text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      ) : (
        /* OVERVIEW / ALL STAY CATEGORIES VIEW */
        <>
          {/* Hero Header */}
          <section className="px-4 md:px-8 mb-12 md:mb-20">
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
          <section className="px-4 md:px-8 mb-20">
            <div className="max-w-6xl mx-auto">
              <FadeIn delay={0.2} direction="up">
                <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#f3eddf] rounded-full filter blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>

                  <div className="relative z-10">
                    <p className="text-2xl text-gray-900 font-medium leading-snug mb-8 text-center max-w-4xl mx-auto">
                      Little affair is a family run boutique Jungle Lodge with 6 luxury stone villas, inspired by its natural surroundings and is an eco-friendly marvel of note.
                    </p>
                    <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-16">
                      Explore the best of Sariska&apos;s wilderness in luxurious and spacious private villa space equipped with bedroom, living room, dresser, bathroom, open shower and outside sitting deck to help you experience the sense of freedom and stillness all at one place!
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {[
                        { icon: Bath, text: 'Open shower' },
                        { icon: Home, text: 'Private villas' }
                      ].map((feature, index) => (
                        <FadeIn
                          key={index}
                          delay={index * 0.1}
                          className="bg-[#f3eddf] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
                        >
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

          {/* 4 Room Categories Grid */}
          <section className="px-4 md:px-8 mb-24">
            <div className="max-w-7xl mx-auto">
              <FadeIn className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
                  Room Categories
                </h2>
                <div className="w-16 h-1 bg-accent mx-auto" />
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ROOM_CATEGORIES.map((cat, idx) => (
                  <FadeIn key={cat.slug} delay={idx * 0.1} className="h-full">
                    <Link
                      to={`/stay/${cat.slug}`}
                      className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                        <img
                          src={cat.coverImage}
                          alt={`${cat.title} - ${cat.subtitle}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-accent w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:bg-accent group-hover:text-white transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2 group-hover:text-accent transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-gray-600 font-light text-base sm:text-lg">
                            {cat.subtitle}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-accent">
                          <span>Explore Villa</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section className="px-4 md:px-8 py-24 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
                <FadeIn direction="right" className="flex-1">
                  <img
                    src="/stay/open-shower.jpg"
                    alt="Open Shower"
                    className="rounded-[3rem] shadow-2xl object-cover w-full h-[500px]"
                  />
                </FadeIn>
                <FadeIn direction="left" className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                    Open Shower
                  </h2>
                  <p className="text-gray-600 font-light text-xl leading-relaxed">
                    Drench your exhaustion in the open shower after a day of exploration or sip your morning coffee at the outside sitting deck overlooking the beauty of the rustic and have yourself a slow melodious morning; stays at Little Affair are sure to check off your bucket list experiences!
                  </p>
                </FadeIn>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                <FadeIn direction="left" className="flex-1">
                  <img
                    src="/stay/private-villas.jpg"
                    alt="Private Villas"
                    className="rounded-[3rem] shadow-2xl object-cover w-full h-[500px]"
                  />
                </FadeIn>
                <FadeIn direction="right" className="flex-1 md:text-right">
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                    Private Villas
                  </h2>
                  <p className="text-gray-600 font-light text-xl leading-relaxed mb-6">
                    True to its name, Little Affair takes care of all the details that contributes to a comfortable and memorable stay. Every private villa boasts of a spacious living area with minimalist design furniture, dresser, bathroom, open shower and outside sitting deck striking a perfect balance between casual luxury and sophisticated elegance.
                  </p>
                  <p className="text-gray-600 font-light text-xl leading-relaxed">
                    It&apos;s the intricate details tucked with warm hospitality serving you an amalgamation of rustic wilderness and luxury that will make your stay at Little Affair memorable.
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-24 px-4 md:px-8 bg-[#fbfbfa]">
            <div className="max-w-7xl mx-auto">
              <FadeIn className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                  Villas Gallery
                </h2>
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
                  {lightboxList.map((src, index) => (
                    <motion.div
                      key={src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative group aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-lg"
                      onClick={() => openLightbox(index)}
                    >
                      <img src={src} alt="Stay" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white w-10 h-10" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </>
      )}

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
              src={lightboxList[selectedImg]}
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
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10">
            Ready to experience the wilderness?
          </h2>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl"
          >
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
