import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { collection, query, where, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Globe, Send, Link as LinkIcon, ChevronRight, Bookmark, ArrowUpRight } from 'lucide-react';
import DOMPurify from 'dompurify';
import { db } from '../lib/firebase';
import { BlogPost as IBlogPost } from '../types/blog';
import { SEO } from '../components/SEO';
import { CommentSection } from '../components/CommentSection';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !slug) return;

    const q = query(
      collection(db, 'blogs'),
      where('slug', '==', slug),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPost({ id: doc.id, ...doc.data() } as IBlogPost);
      } else {
        setPost(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching post:", error);
      setLoading(false);
    });

    // Fetch recent posts for sidebar
    const recentQ = query(
      collection(db, 'blogs'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const unsubscribeRecent = onSnapshot(recentQ, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IBlogPost[];
      setRecentPosts(docs.filter(p => p.slug !== slug).slice(0, 2));
    });

    return () => {
      unsubscribe();
      unsubscribeRecent();
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl h-[50vh] bg-white animate-pulse rounded-3xl mb-12" />
        <div className="w-full max-w-2xl h-12 bg-white animate-pulse rounded-lg mb-6" />
        <div className="w-full max-w-2xl h-64 bg-white animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/404" />;
  }

  const date = post.createdAt instanceof Date 
    ? post.createdAt 
    : (post.createdAt as any).toDate ? (post.createdAt as any).toDate() : new Date();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] overflow-x-hidden font-sans">
      <SEO 
        title={post.title}
        description={post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        path={`/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
      />
      
      {/* Article Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent mb-8 transition-colors uppercase tracking-widest text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-5 z-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest">
                  Featured
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-widest font-semibold">
                  <Calendar className="w-4 h-4" />
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-8 leading-[1.1]">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 border-l-2 border-accent pl-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-serif text-white text-xl shadow-lg">
                  L
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Written By</p>
                  <p className="font-serif text-lg text-gray-900">Little Affair Sariska</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <img 
                src={post.coverImage || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar */}
      <section className="px-4 md:px-8 py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Article Content */}
          <div className="lg:col-span-8 min-w-0 w-full overflow-hidden">
            <div 
              className="prose prose-lg md:prose-xl prose-accent max-w-none w-full break-words
                         prose-headings:font-serif prose-headings:font-normal prose-headings:text-gray-900
                         prose-p:font-light prose-p:text-gray-600 prose-p:leading-[1.8] 
                         prose-img:rounded-3xl prose-img:shadow-xl prose-img:w-full prose-img:max-w-full prose-img:h-auto
                         prose-video:w-full prose-video:max-w-full prose-iframe:w-full prose-iframe:max-w-full
                         prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-[#FDFBF7] prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-gray-700
                         prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:break-all"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'), { ADD_ATTR: ['class', 'style', 'target'], ADD_TAGS: ['iframe'] }) }}
            />
            
            {/* Share Footer */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Share this story</span>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:text-sky-400 hover:bg-sky-50 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:text-accent hover:bg-accent/10 transition-colors" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-bold uppercase tracking-widest">
                <Bookmark className="w-4 h-4" /> Save Story
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Author Bio Card Removed */}

            {/* Read Next Section */}
            {recentPosts.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-accent" />
                  Read Next
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((rPost) => (
                    <Link to={`/blog/${rPost.slug}`} key={rPost.id} className="group block">
                      <div className="h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img 
                          src={rPost.coverImage || 'https://images.unsplash.com/photo-1504280741564-f21aeac89326?auto=format&fit=crop&q=80'} 
                          alt={rPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <h4 className="font-serif text-lg text-gray-900 group-hover:text-accent transition-colors leading-snug mb-2">{rPost.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                        <span>{((rPost.createdAt as any)?.toDate ? (rPost.createdAt as any).toDate() : new Date(rPost.createdAt as any)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Mini */}
            <div className="bg-accent text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-serif mb-3">Wilderness Updates</h3>
              <p className="text-accent-foreground/80 font-light mb-6 text-sm">
                Get notified about new stories and exclusive retreats.
              </p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
                />
                <button className="w-full px-5 py-3 bg-white text-accent rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
            
          </aside>
        </div>
      </section>

      {/* Navigation Banner */}
      <section className="px-4 md:px-8 py-20 border-t border-[#ede7d8] bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Start your own story</h2>
            <p className="text-gray-500 font-light">Experience the wilderness of Sariska first-hand.</p>
          </div>
          <Link 
            to="/book"
            className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-accent-dark transition-all shadow-xl hover:shadow-accent/30"
          >
            Book Your Escape <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Comments Section */}
      <div className="bg-white pb-24">
        <CommentSection blogId={post.id || ''} />
      </div>
      
    </div>
  );
}
