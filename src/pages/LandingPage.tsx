import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Star,
  Phone,
  PawPrint,
  CheckCircle2,
  MapPin,
  Sparkles,
  Play,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Calendar,
  Loader2
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { formatBookingSubject } from '../lib/utils';

import culinaryFeastImg from '../assets/images/culinary_rajasthani_feast_1791498923027.jpg';
import culinaryFarmImg from '../assets/images/culinary_farm_to_table_1791498937923.jpg';
import culinaryHighTeaImg from '../assets/images/culinary_high_tea_platter_1791498949303.jpg';
import culinaryDessertImg from '../assets/images/culinary_gourmet_dessert_1791498961567.jpg';

function FadeIn({
  children,
  delay = 0,
  className,
  direction = 'up',
  onClick
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  key?: any;
  onClick?: () => void;
}) {
  const yOffset = direction === 'up' ? 32 : 0;
  const xOffset = direction === 'left' ? 32 : direction === 'right' ? -32 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

const stayOptions = [
  {
    title: 'Stone Villa',
    subtitle: 'with private sitout and terrace',
    image: '/stay/indoor/AM1_2243-HDR.jpg',
    fallbackImage: '/stay/private-villas.jpg'
  },
  {
    title: 'Stone Villa',
    subtitle: 'with Private Sitout, Plunge Pool and Terrace',
    image: '/stay/outdoor/IMG_7786.jpg',
    fallbackImage: '/stay/open-shower.jpg'
  },
  {
    title: 'Stone Villa',
    subtitle: 'with Balcony',
    image: '/stay/indoor/AM1_2288-HDR.jpg',
    fallbackImage: '/stay/indoor/AM1_2258-HDR.jpg'
  }
];

const recreationItems = [
  {
    title: 'Swimming Pool',
    image: '/recreation/AM1_2302-HDR.jpg'
  },
  {
    title: 'Lounge',
    image: '/recreation/AM1_2062-HDR.jpg'
  },
  {
    title: 'Library',
    image: '/recreation/AM1_2312-HDR.jpg'
  },
  {
    title: 'Kids Play Area',
    image: '/recreation/AM1_2326-HDR.jpg'
  },
  {
    title: 'TV and Pool Area',
    image: '/recreation/AM1_2229.jpg'
  }
];

const diningItems = [
  {
    title: 'Dining',
    image: '/dinning/indoor-dining.jpg'
  },
  {
    title: 'Courtyard Dining',
    image: '/dinning/courtyard-dining.jpg'
  },
  {
    title: 'Rooftop Dining',
    image: '/dinning/rooftop-lounge.jpg'
  },
  {
    title: 'Lounge Dining',
    image: '/dinning/breakfast-setup.jpg'
  },
  {
    title: 'PoolSide Dining',
    image: '/dinning/poolside-dining.jpg'
  }
];

const culinaryDelights = [
  {
    src: culinaryFeastImg,
    title: 'Royal Rajasthani Thali & Laal Maas',
    caption: 'Slow-cooked regional delicacies crafted with hand-ground spices'
  },
  {
    src: culinaryFarmImg,
    title: 'Farm-to-Table Harvest & Wood-Fired Flatbreads',
    caption: 'Fresh organic produce picked daily from local farms in Tehla'
  },
  {
    src: culinaryHighTeaImg,
    title: 'Sunset High Tea Platter',
    caption: 'Earthen kulhad masala chai, warm savories, and artisanal bakes'
  },
  {
    src: culinaryDessertImg,
    title: 'Artisanal Saffron Ghewar & Rose Rabri',
    caption: 'Signature handcrafted heritage desserts under the starlit sky'
  }
];

const experiencesList = [
  {
    title: 'Jungle Safari',
    image: '/experiences/sariska-jungle-safari-1.jpg',
    link: '/experiences/sariska-jungle-safari',
    desc: 'Venture deep into Sariska Tiger Reserve in an open-air gypsy with expert naturalists.'
  },
  {
    title: 'Leopard Trail',
    image: '/experiences/leopard_trail/IMG_7804.jpg',
    link: '/experiences/leopard-trail',
    desc: 'Explore the buffer forests of Sariska where rustic wilderness meets scenic high tea.'
  },
  {
    title: 'High Tea by the Boulders',
    image: '/experiences/high-tea-by-the-boulders-1.jpg',
    link: '/experiences/high-tea-by-the-boulders',
    desc: 'Soak in panoramic Aravalli boulder views over steaming masala chai and gourmet snacks.'
  },
  {
    title: 'Bush/Farm Dinner',
    image: '/experiences/bush-farm-dinner-1.jpg',
    link: '/experiences/bush-farm-dinner',
    desc: 'An intimate lantern-lit dinner amidst the tranquil wilderness and farms of Tehla.'
  },
  {
    title: 'Special Setup',
    image: '/experiences/special-setup-1.jpg',
    link: '/experiences/special-setup',
    desc: 'Bespoke fairy-lit setups curated for anniversaries, birthdays, and romantic evenings.'
  }
];

const googleReviews = [
  {
    name: 'Aarav Malhotra',
    date: '2 weeks ago',
    rating: 5,
    avatar: 'AM',
    text: 'An unforgettable stay near Sariska! The 900 sq ft Stone Villa with the open-to-sky shower and private sitout felt so peaceful and luxurious. The staff arranged our morning Jungle Safari and a magical Bush Dinner under the stars.'
  },
  {
    name: 'Priya & Vikram Singhania',
    date: '1 month ago',
    rating: 5,
    avatar: 'PV',
    text: 'We brought our golden retriever along and could not have asked for a warmer pet-friendly resort. The plunge pool villa, freshly prepared farm-to-table Rajasthani food, and High Tea by the Boulders were 10/10!'
  },
  {
    name: 'Neha Kapoor',
    date: '3 weeks ago',
    rating: 5,
    avatar: 'NK',
    text: 'True symphony of wildlife and luxury! Every corner is thoughtfully designed with local stone. The kids loved the pool and play area while we relaxed in the library and rooftop dining lounge. Highly recommended!'
  },
  {
    name: 'Rohan Khanna',
    date: '2 months ago',
    rating: 5,
    avatar: 'RK',
    text: 'Just a short drive from Delhi NCR and Jaipur, yet it feels like a secluded paradise. Spotted a leopard on the trail and came back to warm hospitality and mouthwatering culinary delights.'
  }
];

const clientTestimonialReels = [
  {
    id: 1,
    reelId: 'DXRbWOGgXXz',
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Story #1'
  },
  {
    id: 2,
    reelId: 'DXRbWOGgXXz',
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Story #2'
  },
  {
    id: 3,
    reelId: 'DXRbWOGgXXz',
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Story #3'
  }
];

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getNextDayString = (dateStr: string) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function LandingPage() {
  const navigate = useNavigate();
  const [selectedFoodImg, setSelectedFoodImg] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const todayStr = getTodayString();

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckInDate(val);
    setDateError('');

    if (val && val < todayStr) {
      setDateError('Check-in date cannot be in the past.');
      return;
    }

    if (val) {
      const minCheckOut = getNextDayString(val);
      if (checkOutDate && checkOutDate <= val) {
        setCheckOutDate(minCheckOut);
      }
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckOutDate(val);
    setDateError('');

    if (val && val < todayStr) {
      setDateError('Check-out date cannot be in the past.');
      return;
    }

    if (checkInDate && val <= checkInDate) {
      setDateError('Check-out date must be after the check-in date.');
      return;
    }
  };

  const handleQuickBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (checkInDate && checkInDate < todayStr) {
      setDateError('Check-in date cannot be in the past.');
      return;
    }

    if (checkOutDate && checkOutDate < todayStr) {
      setDateError('Check-out date cannot be in the past.');
      return;
    }

    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      setDateError('Check-out date must be after the check-in date.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setDateError('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;
    const sheetWebhook = (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!dataObj[key]) {
        dataObj[key] = value.toString();
      } else {
        dataObj[key] = `${dataObj[key]}, ${value.toString()}`;
      }
    });

    const guestFullName = `${dataObj['First_Name'] || ''}`.trim() || 'Guest';
    const { subject: uniqueSubject, referenceId } = formatBookingSubject(
      guestFullName,
      dataObj['Check-in_Date'] || checkInDate,
      dataObj['Check-out_Date'] || checkOutDate
    );

    try {
      const promises = [];

      if (accessKey) {
        const web3FormData = new FormData();
        web3FormData.append('access_key', accessKey);
        web3FormData.append('subject', uniqueSubject);
        web3FormData.append('from_name', `${guestFullName} - Little Affair Sariska (Ads LP)`);
        web3FormData.append('Booking_Reference', referenceId);
        web3FormData.append('Source', 'Google Ads Landing Page (/landingpage)');
        Object.entries(dataObj).forEach(([key, val]) => {
          if (key !== 'subject' && key !== 'access_key' && key !== 'from_name') {
            web3FormData.append(key, val);
          }
        });

        promises.push(
          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: web3FormData
          }).then((res) => res.json())
        );
      }

      if (sheetWebhook) {
        const sheetFormData = new FormData();
        sheetFormData.append('Subject', uniqueSubject);
        sheetFormData.append('subject', uniqueSubject);
        sheetFormData.append('Booking_Reference', referenceId);
        sheetFormData.append('Source', 'Google Ads Landing Page (/landingpage)');
        Object.entries(dataObj).forEach(([key, val]) => sheetFormData.append(key, val));

        promises.push(
          fetch(sheetWebhook, {
            method: 'POST',
            mode: 'no-cors',
            body: sheetFormData
          })
        );
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      navigate('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans">
      <SEO
        title="A Symphony of Wildlife & Luxury | Little Affair Sariska"
        description="Explore the best of Sariska's wilderness in 900 sq ft private luxury stone villas with plunge pools, open showers, jungle safaris, and farm-to-table dining."
        path="/landingpage"
        keywords="Little Affair Sariska, Luxury Resort in Sariska, Stone Villa Sariska, Pet Friendly Resort Sariska, Sariska Jungle Safari Stay"
      />

      {/* 1. HERO SECTION - "A symphony of wildlife and luxury" written on an image */}
      <section className="relative min-h-[92dvh] md:min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#f3eddf] p-2 sm:p-4 pt-20 sm:pt-24">
        <div className="relative w-full min-h-[85dvh] md:min-h-[92dvh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center">
          <img
            src="/stay/private-villas.jpg"
            alt="A symphony of wildlife and luxury at Little Affair Sariska"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

          <div className="relative z-20 text-center text-white px-4 sm:px-8 py-12 flex flex-col items-center max-w-5xl mx-auto">
            {/* Pet-Friendly & Location Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-widest uppercase font-medium text-white/90 mb-6"
            >
              <span>Sariska, Rajasthan</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#f3eddf]">
                <PawPrint className="w-4 h-4" /> Pet Friendly Resort
              </span>
              <span aria-hidden="true">·</span>
              <span>900 Sq. Ft. Private Villas</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 tracking-tight leading-[1.08] drop-shadow-xl"
              style={{ textWrap: 'balance' }}
            >
              A symphony of <span className="italic font-light text-[#f3eddf]">wildlife and luxury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-xl md:text-2xl font-light mb-8 sm:mb-10 max-w-2xl text-white/90 leading-relaxed"
            >
              Private luxury stone villas, open-to-sky showers, and curated wilderness adventures at the edge of Sariska Tiger Reserve.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto justify-center"
            >
              <a
                href="#quick-book"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full transition-all font-semibold shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base whitespace-nowrap"
              >
                Check Availability
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/book"
                className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                Book Your Stay
              </Link>
              <a
                href="tel:+917877083719"
                className="bg-black/35 backdrop-blur-md border border-white/35 text-white px-8 py-4 rounded-full hover:bg-black/55 transition-all font-medium text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STAY SECTION & 3 STAY OPTIONS */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Stay Intro Card */}
          <FadeIn>
            <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-16 shadow-xl text-center max-w-5xl mx-auto mb-16 md:mb-20 relative overflow-hidden">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
                Private Luxury Sanctuary
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-6">
                Stay
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-8" />
              <p className="text-gray-700 font-light text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                Explore the best of Sariska's wilderness in 900 sq ft of private villa space equipped with bedroom, living room, dresser, bathroom, open shower and outside sitting deck to help you experience the sense of freedom and stillness all at one place!
              </p>
            </div>
          </FadeIn>

          {/* Followed by heading - Stay Options */}
          <FadeIn className="text-center mb-10 md:mb-14">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-3">
              Stay Options
            </h3>
            <p className="text-gray-600 font-light text-sm sm:text-base">
              Tap any villa option below to explore full details and gallery
            </p>
          </FadeIn>

          {/* 3 Stay Options - All boxes clickable and lead to /stay */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stayOptions.map((option, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                <Link
                  to="/stay"
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <img
                      src={option.image}
                      alt={`${option.title} - ${option.subtitle}`}
                      onError={(e) => {
                        e.currentTarget.src = option.fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-accent w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:bg-accent group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between text-center sm:text-left">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2 group-hover:text-accent transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-gray-600 font-light text-base sm:text-lg">
                        {option.subtitle}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center sm:justify-between text-xs uppercase tracking-widest font-semibold text-accent">
                      <span>Explore Villa</span>
                      <span className="hidden sm:inline">900 Sq. Ft.</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RECREATION SECTION - 5 images (3 next to each other) with heading below each + "and so much more - click here" */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Resort Amenities & Leisure
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
              Recreation
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {recreationItems.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <Link
                  to="/recreation"
                  className="group block rounded-[2rem] overflow-hidden bg-[#f3eddf]/60 hover:bg-[#f3eddf] shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-serif text-gray-900 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <Link
              to="/recreation"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all group"
            >
              <span>and so much more - click here</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 4. FEATURED PROPERTY VIDEO IN BETWEEN SECTIONS - https://www.instagram.com/reel/DYMDW8RB_iv/ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-14 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <FadeIn direction="right" className="lg:col-span-6 text-center lg:text-left space-y-6">
                <p className="text-xs uppercase tracking-widest text-accent font-semibold">
                  Experience Little Affair in Motion
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 leading-tight" style={{ textWrap: 'balance' }}>
                  Step Inside Our <span className="italic text-accent">Wilderness Haven</span>
                </h2>
                <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed">
                  Watch how rustic Aravalli stonework, lush lawns, private plunge pools, and golden-hour tranquility come together at Little Affair Sariska.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-accent-dark transition-colors shadow-md whitespace-nowrap"
                  >
                    Plan Your Escape <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://www.instagram.com/reel/DYMDW8RB_iv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#f3eddf] text-gray-900 px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#e7dec8] transition-colors whitespace-nowrap"
                  >
                    Watch on Instagram <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </FadeIn>

              <FadeIn direction="left" className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[360px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#f3eddf] bg-black">
                  <iframe
                    src="https://www.instagram.com/reel/DYMDW8RB_iv/embed"
                    title="Little Affair Sariska Featured Video"
                    className="w-full h-[540px] sm:h-[580px] border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DINING SECTION - Same 5 images box with heading */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Ambience & Settings
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
              Dining
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {diningItems.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <Link
                  to="/dining"
                  className="group block rounded-[2rem] overflow-hidden bg-[#f3eddf]/60 hover:bg-[#f3eddf] shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-serif text-gray-900 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR CULINARY DELIGHTS - Good looking gallery view of 4 food images */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Farm-to-Table Gastronomy
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
              Our Culinary Delights
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <p className="text-gray-600 font-light text-base sm:text-lg max-w-2xl mx-auto">
              From royal Rajasthani recipes cooked with farm-fresh ingredients to artisanal bush dinners and sunset high tea platters.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {culinaryDelights.map((food, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.1}
                onClick={() => setSelectedFoodImg(idx)}
                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={food.src}
                    alt={food.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-2">
                      {food.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {food.caption}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXPERIENCE AND ADVENTURE - Boxes with heading, images, and "Know More" leading to respective page */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Curated Wilderness Moments
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
              Experience and Adventure
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {experiencesList.map((exp, idx) => (
              <FadeIn key={idx} delay={idx * 0.08} className="h-full">
                <div className="bg-[#f3eddf]/50 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  <Link to={exp.link} className="block aspect-[4/3] overflow-hidden bg-gray-200 relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-serif text-gray-900 mb-3">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed mb-6">
                        {exp.desc}
                      </p>
                    </div>
                    <Link
                      to={exp.link}
                      className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-accent hover:text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm w-full sm:w-fit"
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHAT OUR GUESTS SAY ABOUT US - Google Reviews + 3 Client Video Testimonials */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Google Reviews</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-amber-500 font-semibold tabular-nums">
                4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-600">Verified Guest Stays</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4" style={{ textWrap: 'balance' }}>
              What our Guests say about us
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          {/* Google Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
            {googleReviews.map((review, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-lg h-full flex flex-col justify-between border border-black/5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-accent/15 text-accent font-serif font-semibold flex items-center justify-center text-sm">
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {review.name}
                          </h4>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      {/* Google 'G' mark */}
                      <div className="w-7 h-7 rounded-full bg-[#f8f5f0] flex items-center justify-center text-xs font-bold text-accent">
                        G
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Verified Google Review</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 3 Video Testimonials of Clients (https://www.instagram.com/reel/DXRbWOGgXXz/ in all 3 boxes) */}
          <FadeIn className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
              Watch Real Guest Experiences
            </p>
            <h3 className="text-3xl sm:text-4xl font-serif text-gray-900">
              Video Testimonials
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {clientTestimonialReels.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.1}>
                <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-xl flex flex-col items-center">
                  <div className="w-full rounded-[1.5rem] overflow-hidden bg-black">
                    <iframe
                      src={item.embedUrl}
                      title={item.label}
                      className="w-full h-[520px] sm:h-[560px] border-0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full pt-4 px-2 flex items-center justify-between">
                    <span className="font-serif text-lg text-gray-900">
                      {item.label}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-accent hover:text-accent-dark"
                    >
                      <span>View Reel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERTING QUICK RESERVATION FORM SECTION FOR GOOGLE ADS */}
      <section id="quick-book" className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                  Direct Resort Inquiry
                </p>
                <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 mb-3">
                  Plan Your <span className="italic text-accent">Sariska Getaway</span>
                </h2>
                <p className="text-gray-600 font-light text-sm sm:text-base max-w-xl mx-auto">
                  Share your preferred dates below for our best direct tariff and personalized itinerary.
                </p>
              </div>

              <form onSubmit={handleQuickBookingSubmit} className="space-y-6">
                {dateError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    {dateError}
                  </div>
                )}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="First_Name"
                      placeholder="Your Name"
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      name="Phone"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="Email"
                      placeholder="you@example.com"
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Number of Guests *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      name="Number_of_Guests"
                      placeholder="2"
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Check-in Date *</label>
                    <input
                      required
                      type="date"
                      name="Check-in_Date"
                      min={todayStr}
                      value={checkInDate}
                      onChange={handleCheckInChange}
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Check-out Date *</label>
                    <input
                      required
                      type="date"
                      name="Check-out_Date"
                      min={checkInDate ? getNextDayString(checkInDate) : todayStr}
                      value={checkOutDate}
                      onChange={handleCheckOutChange}
                      className="w-full bg-[#f8f5f0] border border-transparent rounded-xl px-4 py-3.5 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="Traveling_with_pet"
                      value="Yes"
                      className="w-5 h-5 accent-accent rounded"
                    />
                    <span className="text-sm text-gray-700 inline-flex items-center gap-1.5">
                      <PawPrint className="w-4 h-4 text-accent" /> Traveling with a Pet
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="Traveling_with_children"
                      value="Yes"
                      className="w-5 h-5 accent-accent rounded"
                    />
                    <span className="text-sm text-gray-700">Traveling with Children</span>
                  </label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-all shadow-xl disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Get Best Quote <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <a
                    href="tel:+917877083719"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent" /> Or call directly: +91 78770 83719
                  </a>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox for Culinary Delights */}
      <AnimatePresence>
        {selectedFoodImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedFoodImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={() => setSelectedFoodImg(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFoodImg(
                  (selectedFoodImg - 1 + culinaryDelights.length) % culinaryDelights.length
                );
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div
              className="max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedFoodImg}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={culinaryDelights[selectedFoodImg].src}
                alt={culinaryDelights[selectedFoodImg].title}
                className="max-h-[78vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h4 className="font-serif text-xl sm:text-2xl">
                  {culinaryDelights[selectedFoodImg].title}
                </h4>
                <p className="text-sm text-white/75 font-light mt-1">
                  {culinaryDelights[selectedFoodImg].caption}
                </p>
              </div>
            </div>

            <button
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFoodImg((selectedFoodImg + 1) % culinaryDelights.length);
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
