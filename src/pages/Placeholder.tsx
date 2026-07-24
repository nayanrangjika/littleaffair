import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <SEO 
        title={`${title} | Little Affair Sariska`}
        description={`Information about ${title} at Little Affair Sariska in Rajasthan.`}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-serif text-accent mb-4">{title}</h1>
        <p className="text-gray-500 mb-8">This page is under construction.</p>
        <Link to="/" className="text-accent underline hover:text-accent-dark">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
