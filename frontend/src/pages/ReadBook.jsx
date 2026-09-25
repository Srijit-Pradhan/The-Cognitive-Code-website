import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { forceDownload } from '../utils/download';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the PDF.js worker (Required for react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function ReadBook() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // PDF state
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);
  const containerRef = useRef(null);

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
      document.title = `Reading: ${book.title} - TCC`;
    } else {
      document.title = 'Reading - TCC';
    }
  }, [book]);

  // Handle resizing so the PDF is responsive
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Limit max width to 800px on large screens, or take full container width with some padding on mobile
        setPageWidth(Math.min(width - 32, 800));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [book]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (loading) {
    return <div className="h-screen w-screen bg-surface flex items-center justify-center text-brand-brown">Loading book...</div>;
  }

  if (!book) {
    return <div className="h-screen w-screen bg-surface flex items-center justify-center text-brand-brown">Book not found.</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-surface">
      {/* Minimalistic Reading Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-parchment border-b border-brand-brown/10 shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link to={`/books/${book.slug}`} className="text-brand-brown hover:text-brand-olive transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <div>
            <h1 className="font-serif text-brand-brown font-bold text-lg md:text-xl tracking-tight line-clamp-1 leading-tight">{book.title}</h1>
            <p className="text-[10px] text-brand-brown-sec uppercase font-semibold tracking-wider leading-tight">{book.author || 'TCC'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => forceDownload(book.pdfUrl, `${book.title}.pdf`)}
            className="flex items-center gap-1.5 text-brand-brown hover:text-brand-olive transition-colors text-xs font-semibold px-3 py-1.5 rounded bg-brand-brown/5 border border-brand-brown/10 cursor-pointer"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download</span>
          </button>
        </div>
      </header>
      
      {/* Immersive Viewer using react-pdf */}
      <div 
        ref={containerRef}
        className="flex-grow w-full bg-[#f4f1ea] overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="w-full flex flex-col items-center py-8">
          <Document
            file={book.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-brand-brown p-8 animate-pulse">Loading book pages...</div>}
            error={<div className="text-red-600 p-8">Failed to load PDF. Please try downloading it directly.</div>}
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div key={`page_${index + 1}`} className="mb-6 shadow-xl bg-white border border-brand-brown/5">
                <Page 
                  pageNumber={index + 1} 
                  width={pageWidth} 
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={<div className="bg-white/50 w-full h-[800px] animate-pulse"></div>}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
