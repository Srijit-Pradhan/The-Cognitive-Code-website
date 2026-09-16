import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-surface min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white/50 p-8 md:p-12 rounded-lg border border-brand-brown/10 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none text-brand-brown leading-relaxed">
          <p className="font-semibold mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to The Cognitive Code (TCC). We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. The Data We Collect</h2>
          <p>
            We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address (when you use our contact form).</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>To respond to your inquiries via the contact form.</li>
            <li>To improve our website, products/services, marketing, customer relationships, and experiences.</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used, or accessed in an unauthorized way, altered, or disclosed.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us via our Contact page or at our official email.
          </p>
        </div>
      </div>
    </div>
  );
}
