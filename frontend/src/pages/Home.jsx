import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookCard from '../components/BookCard';

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
        // Display the most recently published 3 books
        setFeaturedBooks(res.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured books', error);
      }
    };
    fetchFeatured();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-12 lg:px-24 bg-parchment/30">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-brown leading-tight mb-6">
              Understand the Psychology Behind Human Behavior
            </h1>
            <p className="text-lg sm:text-xl text-brand-brown-sec mb-8 max-w-2xl mx-auto lg:mx-0">
              Explore psychology through videos and e-books about intelligence, addiction, habits, motivation, human behavior, and the mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/books" 
                className="bg-brand-brown text-surface px-8 py-4 rounded-md font-semibold hover:bg-brand-brown/90 transition-colors w-full sm:w-auto"
              >
                Explore E-books
              </Link>
              <a 
                href="https://www.youtube.com/@TheCognitiveCodeHQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-brand-brown text-brand-brown px-8 py-4 rounded-md font-semibold hover:bg-brand-brown/10 transition-colors w-full sm:w-auto"
              >
                Visit YouTube
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-md lg:max-w-full relative flex justify-center items-center">
             <img 
               src="/hero-animation.gif" 
               alt="Hero Animation" 
               className="w-full max-w-[400px] h-auto object-contain mix-blend-multiply [clip-path:inset(3px)]"
             />
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12 text-brand-brown">Featured E-books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map(book => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
