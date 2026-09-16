import React from 'react';

export default function Disclaimer() {
  return (
    <div className="bg-surface min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white/60 p-8 md:p-12 rounded-lg border border-brand-brown/10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-brown mb-8 text-center">Disclaimer</h1>
        <div className="prose prose-stone text-brand-brown-sec">
          <p className="text-lg font-medium p-6 bg-parchment/30 border-l-4 border-brand-olive rounded-r-md">
            "The content on this website is provided for educational and informational purposes only. It is not intended to replace professional psychological, medical, or mental health advice."
          </p>
          <p className="mt-8">
            If you or someone you know is struggling with mental health issues, please seek assistance from a licensed healthcare provider or mental health professional.
          </p>
        </div>
      </div>
    </div>
  );
}
