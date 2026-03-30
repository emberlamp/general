import React, { useState, useEffect } from 'react';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { TermsOfService } from '../pages/TermsOfService';
import { CookiePolicy } from '../pages/CookiePolicy';
import { UsageGuidelines } from '../pages/UsageGuidelines';
import { AttributionInfo } from '../pages/AttributionInfo';
import { Support } from '../pages/Support';

interface RouterProps {
  children: React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Make navigate function available globally
  (window as unknown as { navigate?: typeof navigate }).navigate = navigate;

  const renderPage = () => {
    switch (currentPath) {
      case '/privacy':
        return <PrivacyPolicy />;
      case '/terms':
        return <TermsOfService />;
      case '/cookies':
        return <CookiePolicy />;
      case '/usage':
        return <UsageGuidelines />;
      case '/attribution':
        return <AttributionInfo />;
      case '/support':
        return <Support />;
      default:
        return children;
    }
  };

  return <>{renderPage()}</>;
};