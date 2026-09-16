import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Download, PlayCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { shareContent } from '../utils/share';
import { forceDownload } from '../utils/download';

export default function BookDetail() {
  const { slug } = useParams();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books/${slug}`);
        setBook(res.data);
      } catch (error) {
        console.error('Failed to fetch book', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [slug]);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} - TCC`;
    } else {
      document.title = 'Book Detail - TCC';
    }
  }, [book]);

  const handleShare = () => {
    shareContent({
      title: book.title,
      text: book.description,
      url: window.location.href
    });
  };

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>;
  if (!book) return <div className="min-h-screen bg-surface flex items-center justify-center">Book not found</div>;

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 text-brand-brown-sec">
          <Link to="/books" className="hover:text-brand-brown">Library</Link> &gt; 
          <span className="text-brand-brown font-medium ml-2">{book.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Cover Side */}
          <div className="md:w-1/3 flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg border border-brand-brown/10 bg-white aspect-[2/3]">
              <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
            </div>
            
            {/* Cover image is all that remains here */}
          </div>

          {/* Info Side */}
          <div className="md:w-2/3">
            <div className="text-sm font-semibold text-brand-olive uppercase tracking-wider mb-2">
              {book.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-brown mb-2 leading-tight">
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 className="text-xl sm:text-2xl font-serif text-brand-brown-sec mb-4">
                {book.subtitle}
              </h2>
            )}
            <p className="text-brand-brown-sec mb-6 text-sm">By {book.author}</p>
            
            <div className="prose prose-stone mb-10 max-w-none text-brand-brown leading-relaxed">
              <p>{book.description}</p>
            </div>

            {/* Unified Actions Block */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mb-10">
              <Link to={`/books/${book.slug}/read`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-brand-brown text-surface px-4 py-3 sm:px-6 rounded-md font-semibold hover:bg-brand-brown/90 transition-colors w-full sm:w-auto">
                <BookOpen size={18} /> <span className="text-sm sm:text-base">Read</span>
              </Link>
              <button onClick={() => forceDownload(book.pdfUrl, `${book.title}.pdf`)} className="flex items-center justify-center gap-2 border-2 border-brand-brown text-brand-brown px-4 py-3 sm:px-6 rounded-md font-semibold hover:bg-brand-brown/5 transition-colors cursor-pointer w-full sm:w-auto">
                <Download size={18} /> <span className="text-sm sm:text-base">Download</span>
              </button>
              <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border-2 border-red-700/20 text-red-700 bg-red-50 px-4 py-3 sm:px-6 rounded-md font-semibold hover:bg-red-100 transition-colors w-full sm:w-auto">
                <PlayCircle size={18} /> <span className="text-sm sm:text-base">Watch</span>
              </a>
              <button onClick={handleShare} className="flex items-center justify-center gap-2 border-2 border-brand-brown/20 text-brand-brown-sec px-4 py-3 sm:px-6 rounded-md font-semibold hover:bg-brand-brown/5 transition-colors w-full sm:w-auto">
                <Share2 size={18} /> <span className="text-sm sm:text-base">Share</span>
              </button>
            </div>

            {/* Table of Contents */}
            {book.tableOfContents && book.tableOfContents.length > 0 && (
              <div className="bg-white/40 rounded-lg p-6 border border-brand-brown/10 mb-12">
                <h3 className="font-serif text-2xl text-brand-brown mb-4">Table of Contents</h3>
                <ul className="space-y-3">
                  {book.tableOfContents.map((chapter, idx) => (
                    <li key={idx} className="flex justify-between items-end border-b border-brand-brown/10 pb-2 border-dashed">
                      <span className="font-medium text-brand-brown">{chapter.title}</span>
                      <span className="text-brand-brown-sec text-sm bg-surface px-1">{chapter.pageNumber}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
