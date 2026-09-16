import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const YoutubeIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'E-books', path: '/books' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-parchment/95 backdrop-blur-md border-b border-brand-brown/10 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo with no added effects/borders as requested */}
              <img src="/logo.jpg" alt="Logo" className="h-11 w-11 object-contain" />
              <span className="font-serif font-bold text-2xl tracking-tight text-brand-brown group-hover:text-brand-olive transition-colors">
                TCC
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-brand-brown-sec hover:text-brand-brown font-medium tracking-wide transition-colors ${isActive ? 'text-brand-brown font-bold' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://www.youtube.com/@TheCognitiveCodeHQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-brown text-surface px-6 py-2.5 rounded-full font-semibold hover:bg-brand-brown/90 hover:shadow-md hover:-translate-y-0.5 transition-all text-sm"
            >
              <YoutubeIcon size={18} />
              <span>YouTube</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-brand-brown hover:text-brand-olive transition-colors focus:outline-none p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-parchment/95 backdrop-blur-xl border-b border-brand-brown/10 shadow-lg absolute w-full">
          <div className="px-6 pt-4 pb-8 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `block px-4 py-3.5 text-base rounded-md transition-colors ${isActive ? 'text-brand-brown font-bold bg-brand-brown/5' : 'text-brand-brown-sec hover:text-brand-brown font-medium hover:bg-brand-brown/5'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://www.youtube.com/@TheCognitiveCodeHQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-4 text-base font-semibold text-surface bg-brand-brown rounded-full mt-6 shadow-sm hover:bg-brand-brown/90 transition-colors"
            >
              <YoutubeIcon size={20} />
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
