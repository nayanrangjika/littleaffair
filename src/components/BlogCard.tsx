import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const date = post.createdAt instanceof Date 
    ? post.createdAt 
    : (post.createdAt as any).toDate ? (post.createdAt as any).toDate() : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
    >
      <Link to={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
        <img 
          src={post.coverImage || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-accent">
            Adventure
          </span>
        </div>
      </Link>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
        </div>
        
        <h3 className="text-2xl font-serif text-gray-900 mb-4 group-hover:text-accent transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="text-gray-600 font-light mb-6 line-clamp-3 flex-grow">
          {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-widest hover:gap-4 transition-all"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
