import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-surface py-8 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="font-serif font-bold text-2xl tracking-tight text-parchment block mb-4">
            TCC
          </Link>
          <p className="text-surface/70 text-sm">
            Explore psychology through focused, accessible books and videos.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-4 text-parchment">Explore</h4>
          <ul className="space-y-2 text-sm text-surface/80">
            <li><Link to="/books" className="hover:text-parchment transition-colors">E-books</Link></li>
            <li><a href="https://www.youtube.com/@TheCognitiveCodeHQ" target="_blank" rel="noopener noreferrer" className="hover:text-parchment transition-colors">YouTube</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4 text-parchment">About</h4>
          <ul className="space-y-2 text-sm text-surface/80">
            <li><Link to="/about" className="hover:text-parchment transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-parchment transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4 text-parchment">Legal</h4>
          <ul className="space-y-2 text-sm text-surface/80">
            <li><Link to="/disclaimer" className="hover:text-parchment transition-colors">Disclaimer</Link></li>
            <li><Link to="/privacy" className="hover:text-parchment transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-parchment transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-surface/10 text-center text-sm text-surface/50">
        <p>&copy; {currentYear} TCC. All rights reserved.</p>
      </div>
    </footer>
  );
}
