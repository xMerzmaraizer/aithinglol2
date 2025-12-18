import { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  onSubmit: (apiKey: string) => void;
  isOpen: boolean;
}

export function ApiKeyModal({ onSubmit, isOpen }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
      setApiKey('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-panel w-full max-w-md p-8 space-y-6 card-appear">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="text-2xl font-bold text-gradient">Gemini API Key Required</h3>
          </div>
          <p className="text-sm text-slate-300">
            To get detailed career recommendations and AI-powered answers, please provide your Gemini API key.
          </p>
        </div>

        <div className="space-y-3 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-200 space-y-2">
              <p className="font-semibold">How to get your API key:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Google AI Studio</a></li>
                <li>Click "Create API Key"</li>
                <li>Copy and paste it here</li>
              </ol>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="cyber-input pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="cyber-button-primary w-full">
            Save API Key
          </button>

          <p className="text-xs text-slate-400 text-center">
            Your API key is stored locally and never sent to our servers.
          </p>
        </form>
      </div>
    </div>
  );
}
