/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Settings {
  showScrollToTop: boolean;
  showFloatingSearch: boolean;
  showVoiceSearch: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  showScrollToTop: false,
  showFloatingSearch: false,
  showVoiceSearch: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = safeLocalStorage.getItem('appSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Remove old showBattery setting if it exists
        const { showBattery, ...rest } = parsedSettings;
        setSettings({
          showScrollToTop: rest.showScrollToTop ?? defaultSettings.showScrollToTop,
          showFloatingSearch: rest.showFloatingSearch ?? defaultSettings.showFloatingSearch,
          showVoiceSearch: rest.showVoiceSearch ?? defaultSettings.showVoiceSearch,
        });
        // Save cleaned settings back to localStorage
        if (showBattery !== undefined) {
          safeLocalStorage.setItem('appSettings', JSON.stringify(rest));
        }
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
      // Reset to default settings if there's an error
      setSettings(defaultSettings);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      // Save to localStorage
      safeLocalStorage.setItem('appSettings', JSON.stringify(updated));
      return updated;
    });
  };

  // Don't render children until settings are loaded to prevent flash of default values
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
