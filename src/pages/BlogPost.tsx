import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Globe, Send, Link as LinkIcon, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { db } from '../lib/firebase';
import { BlogPost as IBlogPost } from '../types/blog';
import { SEO } from '../components/SEO';
import { CommentSection } from '../components/CommentSection';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

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

    return () => unsubscribe();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3eddf] pt-32 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl h-96 bg-white animate-pulse rounded-3xl mb-12" />
        <div className="w-full max-w-2xl h-8 bg-white animate-pulse rounded-lg mb-6" />
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
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden font-sans">
      <SEO 
        title={post.title}
        description={post.excerpt || post.content.substring(0, 160)}
        path={`/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
      />
      
      {/* Article Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src={post.coverImage || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs font-semibold">
                <ArrowLeft className="w-4 h-4" /> Back to Chronicles
              </Link>
              <h1 className="text-4xl md:text-7xl font-serif text-white mb-8 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-serif text-white">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-semibold">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-4 mb-16">
            <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-accent transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-blue-600 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-sky-400 transition-colors">
              <Send className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-accent transition-colors">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="prose prose-lg md:prose-xl prose-accent max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-4 md:px-8 py-20 border-t border-gray-100 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Start your own story</h2>
            <p className="text-gray-500 font-light">Experience the wilderness of Sariska first-hand.</p>
          </div>
          <Link 
            to="/book"
            className="inline-flex items-center gap-3 bg-accent text-white px-12 py-5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-accent-dark transition-all shadow-xl"
          >
            Book Your Escape <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Comments Section */}
      <CommentSection blogId={post.id || ''} />
      
      <div className="h-24" />
    </div>
  );
}
