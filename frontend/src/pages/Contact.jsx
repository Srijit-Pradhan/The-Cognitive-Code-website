import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-4 text-center">Get in Touch</h1>
        
        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg text-center mb-12 shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-2">Message Sent!</h2>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button onClick={() => setSuccess(false)} className="mt-6 text-brand-brown hover:underline font-medium">Send another message</button>
          </div>
        ) : (
          <>
            <p className="text-brand-brown-sec text-center mb-12">
              Have a question or suggestion for a new topic? Send me a message.
            </p>
            
            <form 
              onSubmit={handleSubmit}
              className="bg-white/50 p-8 rounded-lg border border-brand-brown/10 shadow-sm flex flex-col gap-6"
            >
              {error && <div className="text-red-600 bg-red-50 p-3 rounded border border-red-200 text-sm">{error}</div>}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-brown mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-brand-brown/20 rounded-md py-3 px-4 text-brand-brown focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-brown mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-brand-brown/20 rounded-md py-3 px-4 text-brand-brown focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-brown mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-brand-brown/20 rounded-md py-3 px-4 text-brand-brown focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-colors"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-brand-brown text-surface font-semibold py-4 rounded-md hover:bg-brand-brown/90 transition-colors mt-4 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
