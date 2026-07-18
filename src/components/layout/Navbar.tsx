import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'ABOUT US', path: '/about' },
  { name: 'STAY', path: '/stay' },
  { name: 'EXPERIENCES & ADVENTURE', path: '/experiences' },
  { name: 'PLACES TO VISIT', path: '/places' },
];

const subMenuLinks = [
  { name: 'WEATHER', path: '/weather' },
  { name: 'DINING', path: '/dining' },
  { name: 'GALLERY', path: '/gallery' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [location.pathname]);

  const navClass = cn(
    'fixed w-full z-50 transition-all duration-300',
    isScrolled || !isHome || mobileMenuOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  );

  const textClass = cn(
    'text-sm font-semibold tracking-wide transition-colors',
    isScrolled || !isHome || mobileMenuOpen ? 'text-gray-800 hover:text-accent' : 'text-white hover:text-accent'
  );

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              className="h-20 w-auto object-contain"
              src="https://i.postimg.cc/Dw83L9Cz/final-1-150x150.png"
              alt="Little Affair Sariska"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={textClass}>
                {link.name}
              </Link>
            ))}
            
            {/* Dropdown for More */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button className={cn(textClass, 'flex items-center gap-1 uppercase')}>
                More <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-100"
                  >
                    {subMenuLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/book"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("p-2 rounded-md", isScrolled || !isHome || mobileMenuOpen ? "text-gray-800" : "text-white")}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 text-base font-medium text-gray-800 border-b border-gray-100"
                >
                  {link.name}
                </Link>
              ))}
              {subMenuLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 text-base font-medium text-gray-800 border-b border-gray-100"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/book"
                  className="block w-full text-center bg-accent text-white px-4 py-3 rounded-full text-base font-medium"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
