import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Search, Compass } from 'lucide-react';
import { db } from '../lib/firebase';
import { BlogPost } from '../types/blog';
import { BlogCard } from '../components/BlogCard';
import { SEO } from '../components/SEO';

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'blogs'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f3eddf] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title="Wilderness Chronicles | Blog & Stories from Sariska"
        description="Discover stories of wildlife, sustainable luxury, and Rajasthani culture. Stay updated with the latest from Little Affair Sariska."
        path="/blog"
      />
      
      {/* Header */}
      <section className="px-4 md:px-8 mb-16 md:mb-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-accent/10 px-4 py-1.5 rounded-full text-accent mb-6"
        >
          <Compass className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Our Journal</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif text-gray-900 mb-8"
        >
          Wilderness Chronicles
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed"
        >
          A collection of stories, conservation efforts, and travel guides from the heart of the Aravalli hills.
        </motion.p>
      </section>

      {/* Search & Filters */}
      <section className="px-4 md:px-8 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search stories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white rounded-full border-none shadow-sm focus:ring-2 focus:ring-accent transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
            {['All', 'Wildlife', 'Lifestyle', 'Conservation', 'Guides'].map((cat) => (
              <button 
                key={cat}
                className={`px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all whitespace-nowrap ${cat === 'All' ? 'bg-accent text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-[500px] animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <Compass className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-gray-900 mb-4">No stories found</h3>
              <p className="text-gray-500 font-light">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
