import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { generateUniqueSubject } from '../lib/utils';

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

export function Book() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
    // Consolidate multiple values (like checkboxes) into single strings
    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!dataObj[key]) {
        dataObj[key] = value.toString();
      } else {
        dataObj[key] = `${dataObj[key]}, ${value.toString()}`;
      }
    });

    const guestFullName = `${dataObj['First_Name'] || ''} ${dataObj['Last_Name'] || ''}`.trim() || 'Guest';
    const stayDates =
      dataObj['Check-in_Date'] && dataObj['Check-out_Date']
        ? `${dataObj['Check-in_Date']} to ${dataObj['Check-out_Date']}`
        : dataObj['Check-in_Date'] || '';
    const { subject: uniqueSubject, referenceId } = generateUniqueSubject(
      'New Booking Inquiry',
      guestFullName,
      stayDates
    );
    
    try {
      const promises = [];
      
      // 1. Submit to Web3Forms (Email)
      if (accessKey) {
        const web3FormData = new FormData();
        web3FormData.append("access_key", accessKey);
        web3FormData.append("subject", uniqueSubject);
        web3FormData.append("from_name", `${guestFullName} - Little Affair Sariska`);
        web3FormData.append("Booking_Reference", referenceId);
        Object.entries(dataObj).forEach(([key, val]) => {
          if (key !== "subject" && key !== "access_key" && key !== "from_name") {
            web3FormData.append(key, val);
          }
        });
        
        promises.push(
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: web3FormData
          }).then(res => res.json())
        );
      } else {
        console.warn("No VITE_WEB3FORMS_ACCESS_KEY provided for email");
      }
      
      // 2. Submit to Google Sheets (via Apps Script Webhook)
      if (sheetWebhook) {
        // Using FormData perfectly simulates a standard HTML form submission
        const sheetFormData = new FormData();
        sheetFormData.append("Subject", uniqueSubject);
        sheetFormData.append("subject", uniqueSubject);
        sheetFormData.append("Booking_Reference", referenceId);
        Object.entries(dataObj).forEach(([key, val]) => sheetFormData.append(key, val));
        
        promises.push(
          fetch(sheetWebhook, {
            method: "POST",
            mode: "no-cors",
            body: sheetFormData
          })
        );
      } else {
        console.warn("No VITE_GOOGLE_SHEETS_WEBHOOK_URL provided for sheets");
      }
      
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      
      navigate('/thank-you');
    } catch (error) {
       console.error("Submission error:", error);
       setErrorMessage("Network error. Please try again or reach out to us directly.");
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32 pb-24">
      <SEO 
        title="Book Your Stay & Reservations | Little Affair Sariska"
        description="Reserve your luxurious stone villa at Little Affair Sariska. Direct booking inquiry for eco-resort stays, jungle safaris, and romantic wilderness escapes in Rajasthan."
        path="/book"
        keywords="Book Sariska resort, Little Affair Sariska reservation, Sariska room booking, Luxury resort booking Sariska"
      />
      
      {/* Hero Header */}
      <section className="px-4 md:px-8 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-accent mb-8 shadow-sm">
              <Calendar className="w-4 h-4" /> Reservations
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="italic text-accent">Book</span> Your Stay
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3eddf] rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10 space-y-12">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name *</label>
                      <input required type="text" name="First_Name" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name *</label>
                      <input required type="text" name="Last_Name" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <input required type="email" name="Email" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone *</label>
                      <input required type="tel" name="Phone" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Stay Details</h3>
                  {dateError && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                      {dateError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Check-in Date *</label>
                      <input 
                        required 
                        type="date" 
                        name="Check-in_Date" 
                        min={todayStr}
                        value={checkInDate}
                        onChange={handleCheckInChange}
                        className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" 
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
                        className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Guests *</label>
                      <input required type="number" min="1" name="Number_of_Guests" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="2" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Rooms *</label>
                      <input required type="number" min="1" name="Number_of_Rooms" className="w-full bg-[#f8f5f0] border-transparent rounded-xl px-4 py-3 focus:border-accent focus:ring-accent transition-colors" placeholder="1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 group-hover:border-accent transition-colors">
                        <input type="checkbox" name="Traveling_with_children" value="Yes" className="peer sr-only" />
                        <div className="hidden peer-checked:block w-3 h-3 bg-accent rounded-sm"></div>
                      </div>
                      <span className="text-gray-700 select-none">I'm traveling with children</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 group-hover:border-accent transition-colors">
                        <input type="checkbox" name="Traveling_with_pet" value="Yes" className="peer sr-only" />
                        <div className="hidden peer-checked:block w-3 h-3 bg-accent rounded-sm"></div>
                      </div>
                      <span className="text-gray-700 select-none">I'm traveling with pet</span>
                    </label>
                  </div>
                </div>

                {/* Experiences */}
                <div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 border-b pb-4">Select Your Adventures</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "High tea by the Boulders",
                      "High tea by the Lake",
                      "Bush/Farm Dinner",
                      "Special Setup",
                      "Nature/Village Walk",
                      "Sariska Jungle Safari"
                    ].map((adv, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer group bg-[#f8f5f0] p-4 rounded-xl hover:bg-accent/5 transition-colors">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded border-2 border-gray-300 group-hover:border-accent transition-colors shrink-0">
                          <input type="checkbox" name="Adventures" value={adv} className="peer sr-only" />
                          <div className="hidden peer-checked:block w-2.5 h-2.5 bg-accent rounded-sm"></div>
                        </div>
                        <span className="text-sm text-gray-700 select-none">{adv}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-8 text-center md:text-left border-t">
                  {errorMessage && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl w-full md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        Reserve Your Stay <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
