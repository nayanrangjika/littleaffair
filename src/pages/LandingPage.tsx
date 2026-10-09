import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Star,
  Phone,
  PawPrint,
  CheckCircle2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Compass,
  Coffee,
  Palmtree,
  Loader2
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { formatBookingSubject } from '../lib/utils';

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
    image: '/stay/outdoor/IMG_7786.jpg',
    fallbackImage: '/stay/private-villas.jpg'
  },
  {
    title: 'Stone Villa',
    subtitle: 'with Private Sitout, Plunge Pool and Terrace',
    image: '/gallery/IMG_7788.jpg',
    fallbackImage: '/stay/open-shower.jpg'
  },
  {
    title: 'Stone Villa',
    subtitle: 'with Balcony',
    image: '/stay/indoor/AM1_2243-HDR.jpg',
    fallbackImage: '/stay/indoor/AM1_2288-HDR.jpg'
  }
];

const recreationItems = [
  {
    title: 'Swimming Pool',
    image: '/recreation/AM1_2229.jpg'
  },
  {
    title: 'Lounge',
    image: '/recreation/AM1_2062-HDR.jpg'
  },
  {
    title: 'Library',
    image: '/recreation/AM1_2332-HDR.jpg'
  },
  {
    title: 'Kids Play Area',
    image: '/recreation/AM1_2302-HDR.jpg'
  },
  {
    title: 'TV and Pool Area',
    image: '/recreation/AM1_2312-HDR.jpg'
  }
];

const diningItems = [
  {
    title: 'Dining',
    image: '/gallery/IMG_7767.jpg'
  },
  {
    title: 'Courtyard Dining',
    image: '/gallery/IMG_7782.jpg'
  },
  {
    title: 'Rooftop Dining',
    image: '/gallery/IMG_7766.jpg'
  },
  {
    title: 'Lounge Dining',
    image: '/gallery/IMG_7768.jpg'
  },
  {
    title: 'PoolSide Dining',
    image: '/dinning/poolside-dining.jpg'
  }
];

const culinaryDelights = [
  {
    src: '/gallery/IMG_7755.jpg',
    title: 'Traditional Indian & Rajasthani Thali',
    caption: 'Authentic regional delicacies prepared fresh in our resort kitchen'
  },
  {
    src: '/gallery/IMG_7754.jpg',
    title: 'Gourmet Multi-Cuisine Delicacies',
    caption: 'Handcrafted pasta and global favorites served amidst warm ambiance'
  },
  {
    src: '/gallery/IMG_7760.jpg',
    title: 'Artisanal High Tea & Pastries',
    caption: 'Tiered high tea savories and desserts served in the wilderness'
  },
  {
    src: '/gallery/IMG_7758.jpg',
    title: 'Farm-to-Table Organic Produce',
    caption: 'Freshly harvested vegetables from our farm to your plate'
  }
];

const experiencesList = [
  {
    title: 'Jungle Safari',
    slug: 'sariska-jungle-safari',
    image: '/experiences/sariska-jungle-safari-1.jpg',
    icon: Compass,
    description:
      'Travel in the back of a covered, open-air safari truck/jeep, with an expert guide and venture into the expanse of Sariska to get an up-close view of a variety of birds, mammals and of course the majestic Tiger!'
  },
  {
    title: 'Leopard Trail',
    slug: 'leopard-trail',
    image: '/experiences/leopard_trail/IMG_7804.jpg',
    icon: Compass,
    description:
      'Take a journey into the nearby buffer forests of Sariska Tiger Reserve where wilderness meets rustic charm, complete with a local safari expert and a leisurely high tea.'
  },
  {
    title: 'High Tea by the Boulders',
    slug: 'high-tea-by-the-boulders',
    image: '/gallery/IMG_7765.jpg',
    icon: Coffee,
    description:
      'Soak in the breathtaking views on the boulders accompanied by delicious food and a leisurely setting just for you.'
  },
  {
    title: 'Bush/Farm Dinner',
    slug: 'bush-farm-dinner',
    image: '/gallery/IMG_7767.jpg',
    icon: Palmtree,
    description:
      'The perfect way to end your day with a rustic touch to it is a hearty and memorable dining experience in the Jungle/Farm, surrounded by the beauty and wilderness of Tehla.'
  },
  {
    title: 'Special Setup',
    slug: 'special-setup',
    image: '/gallery/IMG_7771.jpg',
    icon: Compass,
    description:
      'At our wilderness lodge, we take immense pleasure in crafting tailor-made and unforgettable experiences for our guests to celebrate their special occasion.'
  }
];

const googleReviews = [
  {
    name: 'Swati Chabba',
    date: 'a month ago on Google',
    score: '5/5',
    avatar: 'SC',
    avatarBg: 'bg-emerald-700 text-white',
    text: 'Our stay at Little Affair, Sariska was such a beautiful experience—peaceful, refreshing, and wonderfully close to nature. Tucked away in the hills and surrounded by lush greenery, this hidden gem feels like a world away from the usual hustle and bustle. The stone villas blend beautifully with the natural surroundings, while the ambience is warm, serene, and incredibly inviting. Every corner has its own charm, making it the perfect place to slow down, breathe, and reconnect with nature. And the experience is made even better with delicious food, beautiful surroundings, and thoughtful hospitality.',
    tripType: 'Holiday · Nature Escape',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Luxury · Great view · Quiet'
  },
  {
    name: 'Manavjeet Singh',
    date: '2 months ago on Google',
    score: '5/5',
    avatar: 'M',
    avatarBg: 'bg-slate-600 text-white',
    text: 'We had the best weekend stay at this property! The best part - it’s close to Delhi and Jaipur, so super easy to reach. The location, hospitality, and overall vibe made it the perfect getaway. Everything was clean, peaceful, and the staff was super welcoming. If you’re looking for the best place for a fun weekend getaway in Rajasthan, this is it. Highly recommend!',
    tripType: 'Family',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Luxury · Great view · Quiet · Child-friendly · Great value'
  },
  {
    name: 'Navneet Kaushal',
    date: '6 months ago on Google',
    score: '5/5',
    avatar: 'NK',
    avatarBg: 'bg-amber-800 text-white',
    text: 'Awesome experience overall. The entire staff was courteous, attentive, and quick to respond throughout our stay, which really made a difference. A special thanks to Devendra for going out of his way to accommodate our last minute requests so seamlessly. His effort added a very personal touch to the experience.',
    tripType: 'Holiday · Family',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Luxury · Great view · Quiet'
  },
  {
    name: 'Diya Marwah',
    date: '7 months ago on Google',
    score: '5/5',
    avatar: 'D',
    avatarBg: 'bg-purple-700 text-white',
    text: 'Had a great stay at Little Affairs Resort, Sariska with my family. We were a group of 17 people and the overall experience was wonderful. The rooms and the entire environment of the resort were very nice and well maintained. The staff was super friendly and always ready to help. Everything was clean and well managed, and we didn’t face any issues during our stay. We also celebrated Holi there and the arrangements were excellent. 100% recommended for a relaxing family trip!',
    tripType: 'Holiday · Family',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Great view · Quiet · Child-friendly · Great value'
  },
  {
    name: 'Virien',
    date: '10 months ago on Google',
    score: '5/5',
    avatar: 'V',
    avatarBg: 'bg-teal-700 text-white',
    text: 'Our stay at Little Affair was small but one of the memorable trips for us. It was the first time we took a chance on taking our senior dog on his first journey. We were sceptic but the place and the people here were amazing. The rooms are nice and airy and well thought out and the staff is so helpful and polite. Already planning our next visit.',
    tripType: 'Holiday · Couple',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Luxury · Great view · Romantic · Quiet'
  },
  {
    name: 'abhishek mittal',
    date: '2 months ago on Google',
    score: '5/5',
    avatar: 'a',
    avatarBg: 'bg-fuchsia-800 text-white',
    text: 'Nice boutique property with only 6 cottages — very peaceful and relaxing for a weekend getaway with parents. We were the only guests as it was off-season. Big, clean rooms, good food and very friendly staff. Overall a pleasant stay!',
    tripType: 'Holiday · Family',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 4.0',
    highlights: 'Quiet'
  },
  {
    name: 'Karn Pratap Khuteta',
    date: '2 months ago on Google',
    score: '5/5',
    avatar: 'KP',
    avatarBg: 'bg-stone-700 text-white',
    text: 'Located in Sariska, very very close to delhi and jaipur it’s really one of the best stays that we have been to India. The pool was fabulous. Cleanliness was top notch. Special mention about the owner, Mr. Nimit whose hospitality and warmth made our stay memorable.',
    tripType: 'Holiday · Friends',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Luxury · Pool · Hospitality'
  },
  {
    name: '136jackieh',
    date: '8 months ago on Tripadvisor',
    score: '5/5',
    avatar: 'J',
    avatarBg: 'bg-green-700 text-white',
    text: 'I very much enjoyed my stay, we found Little Affair 10minutes down a well posted track. There was a warm welcome and very attentive staff. The manager arranged everything very well. It is a tranquil hidden spot. I stayed for two nights and would have been happy to rest for longer.',
    tripType: 'Holiday · Tranquil Escape',
    ratings: 'Rooms 5.0 · Service 5.0 · Location 5.0',
    highlights: 'Tranquil · Attentive Staff'
  }
];

const clientTestimonialReels = [
  {
    id: 1,
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Testimonial #1'
  },
  {
    id: 2,
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Testimonial #2'
  },
  {
    id: 3,
    url: 'https://www.instagram.com/reel/DXRbWOGgXXz/',
    embedUrl: 'https://www.instagram.com/reel/DXRbWOGgXXz/embed',
    label: 'Guest Testimonial #3'
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
            src="https://i.postimg.cc/y829HSW-Z/Whats-App-Image-2024-02-26-at-10-25-54-243793df.jpg"
            onError={(e) => {
              e.currentTarget.src = '/recreation/AM1_2229.jpg';
            }}
            alt="A symphony of wildlife and luxury at Little Affair Sariska"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />

          <div className="relative z-20 text-center text-white px-4 sm:px-8 py-12 flex flex-col items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-widest uppercase font-medium text-white/90 mb-6"
            >
              <span>Sariska, Rajasthan</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#f3eddf]">
                <PawPrint className="w-4 h-4" /> Pet Friendly Property
              </span>
              <span aria-hidden="true">·</span>
              <span>6 Luxury Stone Villas</span>
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
              A Unit of Gaura Hospitality
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto justify-center"
            >
              <Link
                to="/book"
                className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base whitespace-nowrap"
              >
                Book Your Stay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                Accommodations
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
            <div className="w-16 h-1 bg-accent mx-auto" />
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
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              Leisure & Amenities
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
                    Book Your Stay <ArrowRight className="w-4 h-4" />
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
              Culinary Spaces
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

      {/* 6. OUR CULINARY DELIGHTS - Gallery view using real uploaded food images from the website */}
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
              Glimpses of our curated farm-to-table dishes, traditional Rajasthani platters, and outdoor high tea delicacies.
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
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                  <img
                    src={food.src}
                    alt={food.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between text-center">
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

      {/* 7. EXPERIENCE AND ADVENTURE - Matching website's Experiences.tsx card design & uploaded images */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Discover
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
              Experience and Adventure
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiencesList.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1} className="h-full">
                <Link to={`/experiences/${exp.slug}`} className="block h-full">
                  <div className="bg-[#f3eddf]/45 rounded-[2.5rem] overflow-hidden shadow-xl h-full flex flex-col group hover:-translate-y-2 transition-transform duration-300 border border-black/5">
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white uppercase tracking-widest text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                          Know More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <exp.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="p-8 bg-white flex flex-col flex-grow">
                      <h3 className="text-2xl font-serif text-gray-900 mb-4">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600 font-light text-base leading-relaxed flex-grow mb-6">
                        {exp.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-semibold uppercase tracking-widest gap-2 group-hover:text-accent-dark transition-colors mt-auto">
                        Know More{' '}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHAT OUR GUESTS SAY ABOUT US - Real Google Reviews from attached screenshots + 3 Client Video Testimonials */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Google Reviews</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-amber-500 font-semibold tabular-nums">
                5.0 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-600">Little Affair Sariska</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4" style={{ textWrap: 'balance' }}>
              What our Guests say about us
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </FadeIn>

          {/* Real Google Reviews Grid from Attached Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
            {googleReviews.map((review, idx) => (
              <FadeIn key={idx} delay={idx * 0.08} className="h-full">
                <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-lg h-full flex flex-col justify-between border border-black/5">
                  <div>
                    {/* Header matching Google review screenshot */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full font-sans font-semibold flex items-center justify-center text-base shrink-0 ${review.avatarBg}`}
                        >
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base leading-snug">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900 tabular-nums shrink-0">
                        {review.score}
                      </span>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Review Body */}
                    <p className="text-gray-700 font-normal text-sm sm:text-[15px] leading-relaxed mb-5">
                      {review.text}
                    </p>
                  </div>

                  {/* Trip metadata from Google screenshot */}
                  <div className="pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-600">
                    {review.tripType && (
                      <p>
                        <span className="font-semibold text-gray-800">Trip type:</span>{' '}
                        {review.tripType}
                      </p>
                    )}
                    <p className="tabular-nums">
                      <span className="font-semibold text-gray-800">{review.ratings}</span>
                    </p>
                    {review.highlights && (
                      <p>
                        <span className="font-semibold text-gray-800">Hotel highlights:</span>{' '}
                        {review.highlights}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 3 Video Testimonials of Clients (https://www.instagram.com/reel/DXRbWOGgXXz/ in all 3 boxes) */}
          <FadeIn className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
              Watch Real Guest Stories
            </p>
            <h3 className="text-3xl sm:text-4xl font-serif text-gray-900">
              Client Video Testimonials
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

      {/* 9. DIRECT RESERVATION / INQUIRY FORM */}
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
                        Reserve Your Stay <ArrowRight className="w-5 h-5" />
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
