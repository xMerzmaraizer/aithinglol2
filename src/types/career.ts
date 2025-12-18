export interface UserInput {
  interests: string[];
  skills: string[];
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchReason: string;
  growthPotential: string;
  requiredSkills: string[];
}

export interface AnalysisResult {
  recommendations: CareerRecommendation[];
  summary: string;
}
