import React from 'react';
import { BackButton } from '../components/BackButton';

export const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Support</h1>
          <p className="text-white/70 text-sm font-light">Get help with this site</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light text-white mb-2">How do I download images or videos?</h3>
                <p>Click on any image or video to open it in full view, then use the download button in the modal.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-2">Are all images and videos free to use?</h3>
                <p>Yes, all content is sourced from Pexels and is free to use under the Pexels License for both personal and commercial purposes.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-2">Do I need to provide attribution?</h3>
                <p>Attribution is not required but is appreciated. See our Attribution Info page for guidelines.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-2">How often is new content added?</h3>
                <p>Our gallery is continuously updated with fresh content from Pexels' extensive library.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-2">Can I request specific types of content?</h3>
                <p>While we don't take specific requests, you can use our search function to find content that matches your needs.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Technical Support</h2>
            <p className="mb-4">
              If you're experiencing technical issues:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Try refreshing your browser</li>
              <li>Clear your browser cache and cookies</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Try using a different browser</li>
              <li>Disable browser extensions that might interfere</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Browser Compatibility</h2>
            <p className="mb-4">
              This site works best with modern browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Chrome 90+</li>
              <li>Firefox 88+</li>
              <li>Safari 14+</li>
              <li>Edge 90+</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-light text-white mb-2">Contact Us</h3>
                <p>
                  For inquiries, please reach out through available channels.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Response Times</h2>
            <p className="mb-4">
              We aim to respond to all inquiries within:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Technical issues: 24 hours</li>
              <li>General questions: 48 hours</li>
              <li>Legal matters: 72 hours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Feedback</h2>
            <p className="mb-4">
              We welcome your feedback and suggestions to help improve this site.
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