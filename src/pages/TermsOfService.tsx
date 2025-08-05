import React from 'react';
import { BackButton } from '../components/BackButton';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Terms of Service</h1>
          <p className="text-white/70 text-sm font-light">Last updated: March 2026</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Acceptance of Terms</h2>
            <p>
              By accessing and using this site, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access this site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained in the service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Content Licensing</h2>
            <p className="mb-4">
              All images and videos displayed in this site are sourced from Pexels and are subject to the Pexels License. Users must comply with Pexels' terms of use when downloading or using any content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Disclaimer</h2>
            <p>
              The materials in this site are provided on an 'as is' basis. We makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Limitations</h2>
            <p>
              In no event shall We or its suppliers be liable for any damages arising out of the use or inability to use this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Contact Information</h2>
            <p>
              For any legal inquiries, please reach out through available channels.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <BackButton />
        </div>
      </div>
    </div>
  );
};