import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI
    // The error parameter is intentionally unused (prefixed with _)
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the app
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render the app:', error);
    
    // Show error message in the UI if rendering fails
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h1>Failed to load the application</h1>
        <p>${error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        <p>Please refresh the page or contact support if the issue persists.</p>
      </div>
    `;
  }
}
