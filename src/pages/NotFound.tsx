import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] items-center justify-center text-center px-4 pt-32 pb-24">
      <SEO 
        title="404 - Page Not Found | Little Affair Sariska"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h1 className="text-8xl md:text-9xl font-serif text-accent mb-8">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Lost in the Wilderness?</h2>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          The trail you're looking for seems to have vanished into the Aravalli hills. 
          Let's get you back to the comfort of our resort.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-colors shadow-xl"
        >
          <Home className="w-5 h-5" /> Back to Home <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {[
          { title: 'Stone Villas', path: '/stay' },
          { title: 'Experiences', path: '/experiences' },
          { title: 'Dining', path: '/dining' }
        ].map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
          >
            <Link 
              to={item.path}
              className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-serif text-xl text-gray-900">{item.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
