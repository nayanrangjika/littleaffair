import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { BlogComment } from '../types/blog';

interface CommentSectionProps {
  blogId: string;
}

export function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState({ authorName: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db || !blogId) return;

    const q = query(
      collection(db, 'blogs', blogId, 'comments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogComment[];
      setComments(docs);
    }, (error) => {
      console.warn("Comments listener notice:", error);
    });

    return () => unsubscribe();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      setError('Service unavailable. Please try again later.');
      return;
    }
    if (!newComment.authorName.trim() || !newComment.content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'blogs', blogId, 'comments'), {
        blogId,
        authorName: newComment.authorName.trim(),
        content: newComment.content.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment({ authorName: '', content: '' });
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-24 max-w-3xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-12">
        <MessageSquare className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-serif text-gray-900">Conversations ({comments.length})</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Name</label>
            <input
              type="text"
              value={newComment.authorName}
              onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-gray-900"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Comment</label>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-gray-900 h-32 resize-none"
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-accent-dark transition-all disabled:opacity-50 shadow-lg"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'} <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-8">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 pb-8 border-b border-gray-100 last:border-0"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {(comment.createdAt as any)?.toDate?.().toLocaleDateString() || 'Just now'}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <p className="text-center text-gray-400 font-light italic">Be the first to share your thoughts.</p>
        )}
      </div>
    </div>
  );
}
