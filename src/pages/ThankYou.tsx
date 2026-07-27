import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Home, Calendar, Camera } from 'lucide-react';
import { SEO } from '../components/SEO';

export function ThankYou() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] items-center justify-center text-center px-4 pt-32 pb-24">
      <SEO 
        title="Thank You | Reservation Request Received"
        description="Thank you for choosing Little Affair Sariska. We have received your reservation request and will get back to you shortly."
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Reservation Received!</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Thank you for choosing Little Affair Sariska. Your inquiry has been successfully sent. 
          Our team will review the details and get back to you within 24 hours to confirm your stay.
        </p>

        <div className="space-y-4 mb-10">
          <p className="text-sm text-gray-500 italic">
            A copy of your request details has been sent to our reservations desk.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-accent-dark transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <a 
            href="https://www.instagram.com/littleaffairsariska/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Camera className="w-4 h-4" /> Follow Our Journey
          </a>
        </div>
      </motion.div>
      
      <div className="mt-16 text-gray-500 flex flex-col items-center gap-4">
        <p className="text-sm">While you wait, explore more about your upcoming stay:</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/experiences" className="hover:text-accent transition-colors">Wildlife Safaris</Link>
          <Link to="/dining" className="hover:text-accent transition-colors">Bush Dining</Link>
          <Link to="/gallery" className="hover:text-accent transition-colors">Photo Gallery</Link>
        </div>
      </div>
    </div>
  );
}
