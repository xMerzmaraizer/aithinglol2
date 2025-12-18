import { Brain, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { icon: Brain, text: 'Analyzing your profile...' },
  { icon: Target, text: 'Identifying career matches...' },
  { icon: TrendingUp, text: 'Evaluating growth potential...' },
  { icon: Sparkles, text: 'Generating recommendations...' },
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full fade-in">
        <div className="glass-panel p-12 text-center space-y-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Icon
                    key={index}
                    className={`w-12 h-12 text-cyan-400 absolute transition-all duration-500 ${
                      currentStep === index
                        ? 'opacity-100 scale-100 pulse-glow'
                        : 'opacity-0 scale-50'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gradient">AI Analysis in Progress</h3>
            <p className="text-lg text-cyan-300 min-h-[28px] transition-all duration-300">
              {steps[currentStep].text}
            </p>
            <p className="text-sm text-slate-400">
              This usually takes a few seconds...
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-cyan-400 w-8'
                    : 'bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
