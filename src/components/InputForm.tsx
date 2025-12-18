import { useState } from 'react';
import { Plus, X, ArrowRight } from 'lucide-react';
import { UserInput } from '../types/career';

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
  onBack: () => void;
}

export function InputForm({ onSubmit, onBack }: InputFormProps) {
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');

  const addInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length > 0 && skills.length > 0) {
      onSubmit({ interests, skills });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'interest' | 'skill') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'interest') {
        addInterest();
      } else {
        addSkill();
      }
    }
  };

  const canSubmit = interests.length > 0 && skills.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full slide-up">
        <button
          onClick={onBack}
          className="glass-panel px-4 py-2 text-sm text-slate-300 hover:text-cyan-300 mb-8 transition-colors"
        >
          ← Back
        </button>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Tell Us About Yourself
            </h2>
            <p className="text-slate-400">
              Share your interests and skills to get personalized career recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-cyan-300 font-semibold mb-2 block">
                  Your Interests
                  <span className="text-slate-500 text-sm ml-2">(Add at least one)</span>
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'interest')}
                    placeholder="e.g., Technology, Design, Writing..."
                    className="cyber-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    disabled={!currentInterest.trim()}
                    className="cyber-button p-3"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </label>

              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <div key={interest} className="cyber-tag flex items-center gap-2 group">
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-cyan-300 font-semibold mb-2 block">
                  Your Skills
                  <span className="text-slate-500 text-sm ml-2">(Add at least one)</span>
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'skill')}
                    placeholder="e.g., Problem Solving, Communication..."
                    className="cyber-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    disabled={!currentSkill.trim()}
                    className="cyber-button p-3"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </label>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="cyber-tag flex items-center gap-2 group">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="cyber-button-primary w-full flex items-center justify-center gap-2"
            >
              <span>Analyze My Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
