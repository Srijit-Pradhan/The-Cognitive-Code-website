import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import BookCard from '../components/BookCard';

const CATEGORIES = [
  'All',
  'Intelligence',
  'Addiction',
  'Human Behavior',
  'Habits',
  'Motivation',
  'Personality',
  'Cognitive Psychology',
  'Relationships',
  'Self-Improvement'
];

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // For development, if API fails, use dummy data
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
        setBooks(res.data);
      } catch (error) {
        console.error('Failed to fetch books', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchTerm]);

  return (
    <div className="bg-surface min-h-screen py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-4">Psychology E-books</h1>
          <p className="text-lg text-brand-brown-sec max-w-2xl">
            Explore psychology through focused, accessible books inspired by TCC.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Sidebar / Filters */}
          <div className="md:w-1/4 flex flex-col gap-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search books..." 
                className="w-full bg-white/50 border border-brand-brown/20 rounded-md py-2 pl-10 pr-4 text-brand-brown focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-brand-brown-sec" size={18} />
            </div>
            
            <div>
              <h3 className="font-serif text-lg text-brand-brown mb-3">Categories</h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left px-3 py-1.5 rounded text-sm transition-colors ${
                      selectedCategory === category 
                        ? 'bg-brand-brown text-surface font-medium' 
                        : 'text-brand-brown-sec hover:bg-brand-brown/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-brand-olive rounded-full"></div>
                  <div className="w-3 h-3 bg-brand-olive rounded-full animation-delay-200"></div>
                  <div className="w-3 h-3 bg-brand-olive rounded-full animation-delay-400"></div>
                </div>
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/30 rounded-lg border border-brand-brown/10">
                <h3 className="text-xl font-serif text-brand-brown mb-2">No books found.</h3>
                <p className="text-brand-brown-sec">Try another psychology topic or clear your search.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-brand-olive/20 text-brand-olive hover:bg-brand-olive/30 rounded font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
