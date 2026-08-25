import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Search, Compass, Mail, ChevronRight, BookOpen, Leaf, Camera } from 'lucide-react';
import { db } from '../lib/firebase';
import { BlogPost } from '../types/blog';
import { BlogCard } from '../components/BlogCard';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

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
      setRecentPosts(docs.slice(0, 5));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Wildlife', 'Lifestyle', 'Conservation', 'Guides'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
    // Since we don't have categories in schema yet, we just mock filter for demo
    const matchesCategory = activeCategory === 'All' || true; 
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] overflow-x-hidden font-sans pt-24 md:pt-32">
      <SEO 
        title="Wilderness Chronicles | Blog & Stories from Sariska"
        description="Discover stories of wildlife, sustainable luxury, and Rajasthani culture. Stay updated with the latest from Little Affair Sariska."
        path="/blog"
      />
      
      {/* Featured Header */}
      <section className="relative px-4 md:px-8 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative min-h-[60vh] flex items-center justify-center bg-gray-900 shadow-2xl">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKhrJyodaaiFQY-bMkMlSG78LrtsIrrCcYRnfMb8xEw&s=10" 
            alt="Sariska Wilderness" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent mix-blend-multiply" />
          
          <div className="relative z-10 text-center max-w-4xl px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white mb-6 border border-white/20"
            >
              <Compass className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Journal</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-sm"
            >
              Wilderness Chronicles
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
            >
              Immerse yourself in tales of the Aravallis, wildlife encounters, and the art of sustainable living.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Filters & Search Mobile-friendly header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search stories..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white rounded-full border border-gray-100 shadow-sm focus:ring-2 focus:ring-accent transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-accent text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-gray-100 shadow-sm" />
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                <Compass className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-serif text-gray-900 mb-3">No stories found</h3>
                <p className="text-gray-500 font-light max-w-md mx-auto">We couldn't find any articles matching your search criteria. Try a different term or browse our categories.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* About Widget */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-6 overflow-hidden p-2 border-2 border-accent/20">
                <img src="https://i.postimg.cc/Dw83L9Cz/final-1-150x150.jpg" alt="Little Affair" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">About The Journal</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Stories from the edge of the wilderness. We share insights on wildlife conservation, sustainable hospitality, and the hidden gems of Sariska.
              </p>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase hover:text-accent/80 transition-colors">
                Discover More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Popular Topics */}
            <div className="bg-[#f8f5ed] p-8 rounded-3xl border border-[#ede7d8]">
              <h3 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent" />
                Popular Topics
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Wildlife Safaris', icon: Camera },
                  { name: 'Sustainable Living', icon: Leaf },
                  { name: 'Local Culture', icon: Compass },
                ].map((topic) => (
                  <button key={topic.name} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-shadow group border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-700 group-hover:text-accent transition-colors">
                      <topic.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{topic.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-serif text-gray-900 mb-6">Recent Dispatches</h3>
              <div className="space-y-6">
                {recentPosts.length > 0 ? recentPosts.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={post.coverImage || 'https://images.unsplash.com/photo-1504280741564-f21aeac89326?auto=format&fit=crop&q=80'} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-serif text-gray-900 group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-2">{post.title}</h4>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {((post.createdAt as any)?.toDate ? (post.createdAt as any).toDate() : new Date(post.createdAt as any)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                )) : (
                  <p className="text-gray-500 font-light text-sm">No recent posts available.</p>
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-accent text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Mail className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-3">Stay in the Wild</h3>
                <p className="text-accent-foreground/80 font-light mb-6 text-sm leading-relaxed">
                  Join our newsletter for exclusive stories, seasonal offers, and wildlife updates from Sariska.
                </p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
                  />
                  <button className="w-full px-5 py-3.5 bg-white text-accent rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors shadow-lg">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

