import React from 'react';

export default function TermsOfService() {
  return (
    <div className="bg-surface min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white/50 p-8 md:p-12 rounded-lg border border-brand-brown/10 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-stone max-w-none text-brand-brown leading-relaxed">
          <p className="font-semibold mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By viewing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (e-books, PDFs, or software) on 
            The Cognitive Code's website for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on The Cognitive Code's website are provided on an 'as is' basis. The Cognitive Code makes no warranties, 
            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of 
            intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall The Cognitive Code or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
            the materials on The Cognitive Code's website.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Revisions</h2>
          <p>
            The Cognitive Code may revise these terms of service for its website at any time without notice. By using this website 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
