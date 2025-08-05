import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UsageGuidelines: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Usage Guidelines</h1>
          <p className="text-white/70 text-sm font-light">Best practices for using this site</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Content Usage</h2>
            <p className="mb-4">
              All content in this site is sourced from Pexels and is free to use under the Pexels License. This means you can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use photos and videos for free</li>
              <li>Use them for commercial and non-commercial purposes</li>
              <li>Modify, edit, and adapt the content</li>
              <li>Use them without asking for permission or providing credit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">What You Cannot Do</h2>
            <p className="mb-4">
              While the content is free to use, there are some restrictions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Don't sell unaltered copies of a photo or video</li>
              <li>Don't imply endorsement of your product by people or brands in the content</li>
              <li>Don't redistribute or sell the content on other stock photo platforms</li>
              <li>Don't use identifiable people in content for commercial purposes without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Attribution</h2>
            <p className="mb-4">
              While not required, giving credit to photographers and Pexels is appreciated:
            </p>
            <div className="bg-white/10 p-4 rounded font-mono text-sm">
              Photo by [Photographer Name] from Pexels
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Quality Standards</h2>
            <p className="mb-4">
              All content in our gallery meets high quality standards:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>High resolution and professional quality</li>
              <li>Curated for visual appeal and relevance</li>
              <li>Regularly updated with fresh content</li>
              <li>Diverse range of subjects and styles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Search Tips</h2>
            <p className="mb-4">
              Get the best results from this site:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use specific keywords for better results</li>
              <li>Try different search terms if you don't find what you need</li>
              <li>Browse both photos and videos for comprehensive content</li>
              <li>Use the "More" button to discover additional content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Support</h2>
            <p>
              For questions about content usage or our platform, please visit our support page
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <button 
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white text-sm font-light tracking-wide uppercase transition-colors duration-300"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};