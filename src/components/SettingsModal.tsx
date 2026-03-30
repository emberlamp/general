import { useEffect, useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    showScrollToTop: boolean;
    showFloatingSearch: boolean;
    showVoiceSearch: boolean;
  };
  onSettingsChange: (settings: { 
    showScrollToTop: boolean;
    showFloatingSearch: boolean;
    showVoiceSearch: boolean;
  }) => void;
}

const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#3f3f3f] rounded-xl shadow-2xl overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-normal tracking-tight text-white">Preferences</h2>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors p-1 -mr-1"
              aria-label="Close settings"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <h3 className="text-sm font-normal text-white">Scroll to top</h3>
                <p className="text-xs text-white/50 mt-0.5">Show return to top button</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.showScrollToTop}
                  onChange={(e) => handleChange('showScrollToTop', e.target.checked)}
                />
                <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </div>

            <div className="h-px bg-white/10"></div>

            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <h3 className="text-sm font-normal text-white">Floating search</h3>
                <p className="text-xs text-white/50 mt-0.5">Show search bar when scrolling</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.showFloatingSearch}
                  onChange={(e) => handleChange('showFloatingSearch', e.target.checked)}
                />
                <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </div>

            <div className="h-px bg-white/10"></div>

            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <h3 className="text-sm font-normal text-white">Voice search</h3>
                <p className="text-xs text-white/50 mt-0.5">Enable microphone for search</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.showVoiceSearch}
                  onChange={(e) => handleChange('showVoiceSearch', e.target.checked)}
                />
                <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
