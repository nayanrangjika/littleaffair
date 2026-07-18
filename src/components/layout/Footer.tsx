import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { WeatherWidget } from '../WeatherWidget';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-accent/5 rounded-full filter blur-[100px] translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_30%] gap-12 lg:gap-16 mb-16">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src="https://i.postimg.cc/Dw83L9Cz/final-1-150x150.png"
                alt="Little Affair"
                className="h-24 w-24 object-contain opacity-90"
              />
            </Link>
            <p className="text-gray-400 font-light text-sm leading-relaxed text-center md:text-left mb-6">
              An eco-friendly marvel of note, offering a perfect blend of rustic wilderness and casual luxury in the heart of Sariska.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/Little-Affair-Sariska-104683978747800" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/littleaffairsariska/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Important Links */}
          <div className="lg:ml-auto">
            <h4 className="text-xs font-semibold tracking-[0.2em] mb-8 text-white uppercase font-serif border-b border-white/10 pb-4 inline-block">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'STAY', 'EXPERIENCES & ADVENTURE', 'PLACES TO VISIT', 'RECREATION', 'DINING', 'GALLERY'].map((item, i) => {
                 let path = '/' + item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                 if (item === 'About Us') path = '/about';
                 return (
                  <li key={i}>
                    <Link 
                      to={path} 
                      className="text-sm font-light text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-4 h-[1px] bg-accent/0 group-hover:bg-accent transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                 );
              })}
            </ul>
          </div>

          {/* Distances */}
          <div>
             <h4 className="text-xs font-semibold tracking-[0.2em] mb-8 text-white uppercase font-serif border-b border-white/10 pb-4 inline-block">Location</h4>
             <p className="text-gray-400 font-light text-sm mb-6">
               Conveniently accessible from major cities, nestled in the Aravalli hills.
             </p>
             <ul className="space-y-3">
              {[
                { city: 'Delhi', dist: '185km' },
                { city: 'Agra', dist: '160km' },
                { city: 'Jaipur', dist: '120km' }
              ].map((loc, i) => (
                <li key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-light">{loc.city}</span>
                  <span className="text-accent font-medium">{loc.dist}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Weather */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] mb-8 text-white uppercase font-serif border-b border-white/10 pb-4 inline-block">Connect</h4>
            <div className="space-y-4 mb-10">
              <a href="tel:+917877083719" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                   <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Call Us</div>
                   <div className="text-sm text-gray-300 group-hover:text-white transition-colors">+91 78770 83719</div>
                </div>
              </a>
              <a href="mailto:info@littleaffairsariska.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                   <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Email Us</div>
                   <div className="text-sm text-gray-300 group-hover:text-white transition-colors">info@littleaffairsariska.com</div>
                </div>
              </a>
            </div>
            
            {/* Weather Widget */}
            <WeatherWidget skin="dark" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 mt-16">
          <p className="text-xs text-gray-500 font-light mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Little Affair Sariska. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500 font-light">
             <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
