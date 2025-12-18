import { Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8 fade-in">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400 pulse-glow" />
          <span className="text-sm text-cyan-300 font-medium">AI-Powered Career Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Discover Your
          <span className="block text-gradient glow-text mt-2">Perfect Career Path</span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Advanced AI analyzes your unique skills and interests to reveal career opportunities
          perfectly aligned with your potential.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={onGetStarted}
            className="cyber-button-primary w-full sm:w-auto"
          >
            Start Your Journey
          </button>
          <div className="glass-panel px-6 py-3 w-full sm:w-auto">
            <p className="text-sm text-slate-400">
              <span className="text-cyan-400 font-semibold">Free</span> • No signup required
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
          {[
            {
              title: 'AI Analysis',
              description: 'Advanced algorithms process your profile in seconds',
            },
            {
              title: 'Personalized Results',
              description: 'Career recommendations tailored to your strengths',
            },
            {
              title: 'Growth Insights',
              description: 'Understand market demand and career trajectories',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-panel-hover p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
