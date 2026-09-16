import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, PlayCircle, Share2 } from 'lucide-react';
import { shareContent } from '../utils/share';
import { forceDownload } from '../utils/download';

export default function BookCard({ book }) {
  const handleShare = (e) => {
    e.preventDefault();
    shareContent({
      title: book.title,
      text: book.description,
      url: `${window.location.origin}/books/${book.slug}`
    });
  };

  // The 4 primary actions
  const Actions = () => (
    <>
      <Link 
        to={`/books/${book.slug}/read`} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-brand-brown md:bg-parchment text-surface md:text-brand-brown py-2.5 px-3 rounded text-sm font-semibold hover:bg-brand-brown/90 md:hover:bg-white transition-colors shadow-sm"
      >
        <BookOpen size={16} /> <span>Read</span>
      </Link>
      <button 
        onClick={() => forceDownload(book.pdfUrl, `${book.title}.pdf`)}
        className="flex items-center justify-center gap-2 border border-brand-brown md:border-2 md:border-parchment text-brand-brown md:text-parchment py-2.5 px-3 rounded text-sm font-semibold hover:bg-brand-brown/5 md:hover:bg-parchment/10 transition-colors cursor-pointer w-full"
      >
        <Download size={16} /> <span>Download</span>
      </button>
      <a 
        href={book.youtubeUrl || 'https://www.youtube.com/@TheCognitiveCodeHQ'} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-red-700/20 md:border-2 md:border-parchment text-red-700 md:text-parchment bg-red-50 md:bg-transparent py-2.5 px-3 rounded text-sm font-semibold hover:bg-red-100 md:hover:bg-parchment/10 transition-colors"
      >
        <PlayCircle size={16} /> <span>Watch</span>
      </a>
      <button 
        onClick={handleShare}
        className="flex items-center justify-center gap-2 border border-brand-brown/20 md:border-none md:border-parchment/50 text-brand-brown-sec md:text-parchment/80 py-2.5 px-3 rounded text-sm font-semibold hover:bg-brand-brown/5 md:hover:text-parchment transition-colors md:mt-2"
      >
        <Share2 size={16} /> <span>Share</span>
      </button>
    </>
  );

  return (
    <div className="bg-white/50 border border-brand-brown/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
      
      {/* Cover Image Area */}
      <div className="relative aspect-[2/3] overflow-hidden bg-brand-brown/5">
        <Link to={`/books/${book.slug}`} className="block w-full h-full">
          <img 
            src={book.coverImageUrl} 
            alt={book.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Desktop Hover Overlay (Transparent Background) */}
        <div className="hidden md:flex absolute inset-0 bg-brand-brown/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-center px-8 gap-3 z-10 pointer-events-none group-hover:pointer-events-auto backdrop-blur-sm">
          <Actions />
        </div>
      </div>
      
      {/* Text Content Area */}
      <div className="p-5 flex flex-col flex-grow bg-surface/30">
        <div className="text-xs font-semibold text-brand-olive uppercase tracking-wider mb-2">
          {book.category}
        </div>
        <Link to={`/books/${book.slug}`}>
          <h3 className="text-lg md:text-xl font-serif font-bold text-brand-brown mb-2 line-clamp-2 hover:text-brand-olive transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-brand-brown-sec text-sm line-clamp-2 md:line-clamp-3 mb-6 flex-grow">
          {book.description}
        </p>
        
        {/* Mobile Actions Grid (Hidden on Desktop because it uses the hover overlay) */}
        <div className="grid grid-cols-2 gap-2 mt-auto md:hidden">
          <Actions />
        </div>
      </div>

    </div>
  );
}
