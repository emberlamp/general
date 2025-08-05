import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Privacy Policy</h1>
          <p className="text-white/70 text-sm font-light">Last updated: March 2026</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Information We Collect</h2>
            <p className="mb-4">
              This site is designed with privacy in mind. We collect minimal information to provide you with the best possible experience:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Search queries to improve content discovery</li>
              <li>Basic usage analytics to enhance user experience</li>
              <li>Technical information necessary for app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">How We Use Your Information</h2>
            <p className="mb-4">
              Your information is used solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and improve our gallery service</li>
              <li>Personalize your content discovery experience</li>
              <li>Ensure technical functionality and security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Third-Party Services</h2>
            <p className="mb-4">
              We use Pexels API to provide high-quality images and videos. Please review Pexels' privacy policy for information about how they handle data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Contact Us</h2>
            <p>
              For privacy-related inquiries, please reach out through available channels.
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