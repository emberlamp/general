import React from 'react';
import { BackButton } from '../components/BackButton';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Cookie Policy</h1>
          <p className="text-white/70 text-sm font-light">Last updated: March 2026</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">How We Use Cookies</h2>
            <p className="mb-4">
              This site uses cookies to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our service</li>
              <li>Improve your user experience</li>
              <li>Ensure the security and proper functioning of our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-light text-white mb-2">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function and cannot be switched off in our systems.</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-white mb-2">Analytics Cookies</h3>
                <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-white mb-2">Functional Cookies</h3>
                <p>These cookies enable the website to provide enhanced functionality and personalization.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Managing Cookies</h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            <p>
              However, if you do this, you may have to manually adjust some preferences every time you visit our site and some services and functionalities may not work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Third-Party Cookies</h2>
            <p>
              Some cookies on our site are set by third-party services, including Pexels API. These services may use cookies to provide their functionality and improve their services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Contact Us</h2>
            <p>
              For inquiries, please reach out through available channels.
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