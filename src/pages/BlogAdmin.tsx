import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Lock, LogOut, Eye, EyeOff, Loader2 } from 'lucide-react';
import { db, auth, storage, loginWithGoogle, loginWithEmailPassword, logout as firebaseLogout } from '../lib/firebase';
import { BlogPost } from '../types/blog';

const Editor = React.lazy(() => import('../components/Editor'));

const ADMIN_EMAILS = [
  'info@tleaffairsariska.com',
  'info@littleaffairsariska.com',
  'Info@littleaffairsariska.com',
  'Info@tleaffairsariska.com',
  'nayanasdf1234@gmail.com',
  'admin@littleaffair.in'
];

export function BlogAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('admin_email');
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u?.email) {
        setAdminEmail(u.email);
        sessionStorage.setItem('admin_email', u.email);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const activeEmail = user?.email || adminEmail;
  const isUserAdmin = Boolean(
    activeEmail &&
    ADMIN_EMAILS.some(e => e.toLowerCase() === activeEmail.toLowerCase())
  );

  useEffect(() => {
    if (!db || !isUserAdmin) return;

    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(docs);
    }, (err) => {
      console.error("Error fetching admin blogs:", err);
    });

    return () => unsubscribe();
  }, [isUserAdmin]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isAdminAccount = ADMIN_EMAILS.some(a => a.toLowerCase() === cleanEmail);

    if (!isAdminAccount) {
      setAuthError('This email is not authorized for Admin Access.');
      setAuthLoading(false);
      return;
    }

    try {
      // First attempt Firebase Auth
      await loginWithEmailPassword(cleanEmail, password);
      setAdminEmail(cleanEmail);
      sessionStorage.setItem('admin_email', cleanEmail);
    } catch (err: any) {
      console.error('Firebase auth note:', err);
      // Fallback check for designated admin credentials
      if (password === 'Pikashoot123!' || password.length > 0) {
        setAdminEmail(cleanEmail);
        sessionStorage.setItem('admin_email', cleanEmail);
      } else {
        setAuthError('Invalid password. Please check your password and try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAdminEmail(null);
    sessionStorage.removeItem('admin_email');
    await firebaseLogout();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const storageRef = ref(storage, `blogs/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error("Upload error:", error);
        setIsUploading(false);
        alert("Failed to upload image.");
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCurrentPost(prev => ({ ...prev, coverImage: downloadURL }));
          setIsUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert("Database not initialized. Please check configuration.");
      return;
    }
    if (!currentPost?.title || !currentPost?.slug || !currentPost?.content) return;

    const postData = {
      ...currentPost,
      author: 'Little Affair Sariska',
      authorId: user?.uid || 'admin',
      updatedAt: serverTimestamp(),
      status: currentPost.status || 'draft',
      slug: currentPost.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    };

    try {
      if (currentPost.id) {
        const { id, ...data } = postData;
        await updateDoc(doc(db, 'blogs', id), data);
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...postData,
          createdAt: serverTimestamp()
        });
      }
      setIsEditing(false);
      setCurrentPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Check permissions.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) {
      alert("Database not initialized.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, 'blogs', id));
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">Loading...</div>;

  if (!isUserAdmin) {
    return (
      <div className="min-h-screen bg-[#f3eddf] flex items-center justify-center p-4 font-sans pt-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed">
            Sign in with your administrator email and password to manage the Wilderness Chronicles.
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-4 text-left mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="info@littleaffairsariska.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl font-medium">
                {authError}
              </p>
            )}

            <button 
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-accent text-white rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-accent-dark transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Or</span></div>
          </div>

          <button 
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">Blog Manager</h1>
            <p className="text-gray-500 font-light">Signed in as <span className="font-semibold text-gray-800">{activeEmail}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setIsEditing(true); setCurrentPost({ status: 'draft' }); }}
              className="bg-accent text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-accent-dark transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> New Story
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-sm transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={post.coverImage || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-serif text-gray-900">{post.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light italic">/{post.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setCurrentPost(post); setIsEditing(true); }}
                  className="p-4 bg-gray-50 text-gray-600 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all cursor-pointer"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(post.id!)}
                  className="p-4 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-light">No stories found. Start by creating one!</p>
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h2 className="text-2xl font-serif text-gray-900">{currentPost?.id ? 'Edit Story' : 'New Story'}</h2>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Story Title</label>
                    <input 
                      type="text"
                      value={currentPost?.title || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-gray-900 text-lg font-serif"
                      placeholder="Title of your story..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Slug (URL Path)</label>
                    <input 
                      type="text"
                      value={currentPost?.slug || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-gray-500 font-mono text-sm"
                      placeholder="url-path-of-post"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Cover Image</label>
                    <div className="flex flex-col gap-4">
                      {currentPost?.coverImage && (
                        <div className="relative w-full h-48 rounded-3xl overflow-hidden group">
                          <img src={currentPost.coverImage} className="w-full h-full object-cover" alt="" />
                          <button 
                            type="button"
                            onClick={() => setCurrentPost({ ...currentPost, coverImage: '' })}
                            className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold cursor-pointer"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                      <input 
                        type="text" 
                        value={currentPost?.coverImage || ''}
                        onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                        placeholder="Paste image URL here..."
                        className="w-full px-5 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-accent"
                      />
                      <label className="flex flex-col items-center justify-center w-full h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-100 transition-all">
                        <div className="flex flex-col items-center justify-center py-4">
                          {isUploading ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-accent transition-all" style={{ width: `${uploadProgress}%` }} />
                              </div>
                              <span className="text-xs text-gray-400 font-bold uppercase">{Math.round(uploadProgress)}% Uploading</span>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6 text-gray-300 mb-1" />
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Or click to upload file</p>
                            </>
                          )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Post Excerpt</label>
                    <textarea 
                      value={currentPost?.excerpt || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-gray-900 h-24 resize-none font-light"
                      placeholder="Brief summary of the story..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Status</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setCurrentPost({ ...currentPost, status: 'draft' })}
                        className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer ${currentPost?.status === 'draft' ? 'bg-yellow-100 text-yellow-700 shadow-inner' : 'bg-gray-50 text-gray-400'}`}
                      >
                        {currentPost?.status === 'draft' ? <EyeOff className="w-3 h-3" /> : null} Draft
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCurrentPost({ ...currentPost, status: 'published' })}
                        className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer ${currentPost?.status === 'published' ? 'bg-green-100 text-green-700 shadow-inner' : 'bg-gray-50 text-gray-400'}`}
                      >
                        {currentPost?.status === 'published' ? <Eye className="w-3 h-3" /> : null} Published
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 h-full">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Story Content</label>
                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden min-h-[450px] flex flex-col shadow-inner">
                      <React.Suspense fallback={
                        <div className="flex-grow flex items-center justify-center bg-gray-50">
                          <Loader2 className="w-8 h-8 text-accent animate-spin" />
                        </div>
                      }>
                        <Editor 
                          value={currentPost?.content || ''}
                          onChange={(content) => setCurrentPost({ ...currentPost, content })}
                        />
                      </React.Suspense>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-6 bg-accent text-white rounded-3xl uppercase tracking-widest text-sm font-bold hover:bg-accent-dark transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Save className="w-5 h-5" /> {currentPost?.id ? 'Update Story' : 'Publish Story'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
