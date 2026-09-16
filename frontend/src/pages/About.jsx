import React from 'react';

export default function About() {
  return (
    <div className="bg-surface min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-8 text-center">About The Cognitive Code</h1>
        
        <div className="bg-white/50 p-8 md:p-12 rounded-lg border border-brand-brown/10 shadow-sm prose prose-stone lg:prose-lg text-brand-brown max-w-none">
          <p>
            Welcome to the digital home of <strong>TCC</strong>. Our mission is to make the complex world of human psychology accessible and understandable.
          </p>
          
          <h2 className="font-serif text-brand-brown mt-8">Our Educational Purpose</h2>
          <p>
            We believe that understanding the mind shouldn't be hidden behind paywalls or complex academic jargon. Our platform is dedicated to exploring the mechanics of intelligence, the psychology of addiction, the nuances of human behavior, and the power of habits and motivation.
          </p>

          <h2 className="font-serif text-brand-brown mt-8">YouTube</h2>
          <p>
            Our YouTube presence serves as the primary visual exploration of these topics. We create deep-dive video essays and educational content that break down cognitive psychology into engaging, visually rich lessons. 
          </p>
          <p>
            <a href="https://www.youtube.com/@TheCognitiveCodeHQ" target="_blank" rel="noopener noreferrer" className="text-brand-olive hover:underline font-medium">
              Visit TCC on YouTube
            </a>
          </p>

          <h2 className="font-serif text-brand-brown mt-8">The E-Book Library</h2>
          <p>
            This website acts as the official companion library. Here, you can find detailed e-books that expand on our video topics. Every book on this site is available to read and download. Whether you're exploring the roots of a habit or understanding interpersonal relationships, we've organized our content to help you learn efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
