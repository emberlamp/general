import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AttributionInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#3f3f3f] text-white font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide mb-4">Attribution Information</h1>
          <p className="text-white/70 text-sm font-light">How to properly credit content from this site</p>
        </div>

        <div className="space-y-8 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Attribution Guidelines</h2>
            <p className="mb-4">
              While Pexels content doesn't require attribution, giving credit is a great way to support photographers and the creative community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Recommended Attribution Format</h2>
            <p className="mb-4">For photos:</p>
            <div className="bg-white/10 p-4 rounded font-mono text-sm mb-4">
              Photo by [Photographer Name] from Pexels
            </div>
            <p className="mb-4">For videos:</p>
            <div className="bg-white/10 p-4 rounded font-mono text-sm mb-4">
              Video by [Creator Name] from Pexels
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">HTML Attribution</h2>
            <p className="mb-4">For web use, you can use this HTML format:</p>
            <div className="bg-white/10 p-4 rounded font-mono text-sm">
              {`<a href="https://www.pexels.com">Photo by [Name] from Pexels</a>`}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Social Media Attribution</h2>
            <p className="mb-4">
              When sharing on social media platforms:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Include photographer's name in your caption</li>
              <li>Tag @pexels when possible</li>
              <li>Use hashtags like #pexels #photography</li>
              <li>Link back to the original content when platform allows</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Print Attribution</h2>
            <p className="mb-4">
              For printed materials, include attribution in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Image captions</li>
              <li>Credits section</li>
              <li>Footer or acknowledgments</li>
              <li>Copyright page</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Platform Credits</h2>
            <p className="mb-4">
              This site is built using:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pexels API for high-quality content</li>
              <li>React and TypeScript for the interface</li>
              <li>Tailwind CSS for styling</li>
              <li>Vite for development and building</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Supporting Creators</h2>
            <p className="mb-4">
              Beyond attribution, you can support the creative community by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Following photographers on Pexels</li>
              <li>Sharing their work on social media</li>
              <li>Leaving positive feedback</li>
              <li>Considering donations to creators when possible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-wide mb-4 text-white">Questions</h2>
            <p>
              For questions, please reach out through available channels.
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