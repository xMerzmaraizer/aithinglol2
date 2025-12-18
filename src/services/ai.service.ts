import { UserInput, AnalysisResult, CareerRecommendation } from '../types/career';

export class AIService {
  private defaultApiKey: string;
  private apiEndpoint: string;

  constructor(apiKey?: string) {
    this.defaultApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';
    this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async analyzeCareerPath(input: UserInput, apiKey?: string): Promise<AnalysisResult> {
    const key = apiKey || this.defaultApiKey;

    if (!key) {
      return this.getMockResponse(input);
    }

    try {
      const prompt = this.constructPrompt(input);

      const response = await fetch(`${this.apiEndpoint}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error('AI analysis failed');
      }

      const data = await response.json();
      const text = data.candidates[0]?.content?.parts[0]?.text || '';

      return this.parseAIResponse(text);
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockResponse(input);
    }
  }

  async askCareerQuestion(question: string, careerContext: string, apiKey?: string): Promise<string> {
    const key = apiKey || this.defaultApiKey;

    if (!key) {
      return this.getMockAnswerResponse(question);
    }

    try {
      const prompt = `You are an expert career counselor. Answer this question about the career: ${careerContext}

Question: ${question}

Provide a clear, detailed answer covering relevant information like:
- Required tests/examinations
- Educational qualifications needed
- Key subjects to focus on
- Skills development path
- Industry insights
- Salary expectations
- Career progression

Be specific and actionable in your response.`;

      const response = await fetch(`${this.apiEndpoint}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error('AI question failed');
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'I apologize, but I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockAnswerResponse(question);
    }
  }

  private getMockAnswerResponse(question: string): string {
    return `Based on your question about "${question}", I recommend researching specific educational requirements, certification exams, and skill development paths for this career. Industry associations and professional organizations typically provide detailed guidance on entry requirements and career progression.`;
  }

  private constructPrompt(input: UserInput): string {
    const careerDatabase = `
# COMPREHENSIVE HIDDEN CAREER DATABASE

### 1. ADRENALINE & PRECISION GROUP
- Cardiothoracic Surgeon (heart/lung surgery, high stakes, interests: engines/plumbing)
- Neurosurgeon (brain surgery, precision, interests: electricity/delicate puzzles)
- Orthopedic Trauma Surgeon (bone reconstruction, interests: carpentry/power tools)
- Saturation Diver (deep-sea oil rig repair, interests: deep water/solitude, danger pay)
- Air Traffic Controller (directing planes, interests: 3D puzzles/video games, stress pay)
- Merchant Navy Officer (commanding ships, interests: sea/isolation, tax-free income)

### 2. DEEP DIVE ANALYSTS
- Radiologist (X-ray/MRI diagnosis, interests: patterns/visual puzzles)
- Pathologist (tissue analysis, interests: microscopes/detective work)
- Forensic Accountant (uncovering financial crimes, interests: puzzles/justice)
- Actuary (risk calculation, interests: statistics/probability, exam premiums)
- Quantitative Analyst (algorithmic trading, interests: coding/math, performance bonuses)

### 3. MACRO STRATEGY & INFLUENCE
- Economic Consultant (antitrust litigation, interests: debate/data science)
- Macro Strategist (predicting market crashes, interests: history/politics)
- Industrial-Organizational Psychologist (workforce optimization, interests: psychology/data)
- Corporate Diplomat (business-government liaison, interests: politics/negotiation)

### 4. EXTREME ENGINEERS
- Petroleum/Reservoir Engineer (oil extraction, interests: geology/physics)
- Nuclear Engineer (reactor design, interests: physics/safety, security clearance)
- Mining & Geotechnical Engineer (preventing collapses, interests: rocks/machinery)
- Aerodynamicist (vehicle aerodynamics, interests: wind/speed/F1 racing)

### 5. HIDDEN TECH ARCHITECTS
- VLSI Engineer (chip design, interests: nanometers/logic gates)
- Embedded Systems Engineer (hardware coding, interests: IoT/tinkering)
- Site Reliability Engineer (system uptime, interests: automation/crisis management)
- Ethical Hacker (penetration testing, interests: breaking rules/puzzles)

### 6. DIGITAL WORLDS, GAMING & VFX
- Physics Programmer (game engine physics, interests: calculus/linear algebra)
- FX Technical Director (movie effects, interests: fluid dynamics/destruction)
- Technical Artist (art+code bridge, interests: Python/art, unicorn role)
- Game Economy Designer (in-game economics, interests: macroeconomics/psychology)

### 7. SENSORY & BIOLOGICAL SCIENTISTS
- Bioprocess Engineer (lab-grown meat/vaccines, interests: biology/sustainability)
- Zymologist/Brewmaster (fermentation engineering, interests: microbiology/recipes)
- Flavorist/Perfumer (taste/smell creation, interests: chemistry/sensory, extremely rare)
- Industrial Designer (product shape/feel, interests: art/ergonomics)

### 8. NICHE MEDIA, LANGUAGE & ARTS
- Localization Specialist (cultural translation, interests: languages/culture)
- Colorist (film color grading, interests: photography/color theory)
- Foley Artist (sound effects creation, interests: sound/creativity)

### 9. FIXERS & NEGOTIATORS
- Insolvency Professional (bankruptcy management, interests: law/finance/conflict)
- Ship Broker (cargo-ship matching, interests: geography/trading)
- Patent Attorney (invention protection, interests: tech/precise writing)
- Chief of Staff (CEO right hand, interests: generalist/diplomacy)

### 10. LUXURY & SPECIALIZED SERVICES
- Private Estate Manager (ultra-wealthy services, interests: hospitality/logistics)
- Gemologist (precious stone certification, interests: geology/optics)
- Embalmer/Funeral Director (body preservation, interests: anatomy/chemistry)
- Horologist (luxury watch repair, interests: tiny mechanics/patience)

### 11. FINANCIAL COMMAND & CONTROL
- International Tax Specialist (cross-border tax, interests: law/finance/loopholes)
- M&A Analyst (company valuation, interests: high stakes/rapid math)
- Chief Compliance Officer (corporate compliance, interests: rules/details)
- Cost Controller (profit optimization, interests: efficiency/manufacturing)
`;

    return `You are an expert career counselor with deep knowledge of hidden, high-paying careers. Analyze the following user profile and match them to careers from the comprehensive database below.

User Interests: ${input.interests.join(', ')}
User Skills: ${input.skills.join(', ')}

${careerDatabase}

MATCHING CRITERIA:
1. Match user interests and skills to careers that align with their temperament
2. Consider both direct matches and transferable skills
3. If no perfect match exists, recommend high-paying careers that utilize their core strengths
4. Prioritize careers with hidden pay factors (danger pay, stress pay, scarcity premiums, etc.)

Provide exactly 5 career recommendations in JSON format:
{
  "summary": "A 2-3 sentence analysis explaining the career direction based on their profile",
  "recommendations": [
    {
      "title": "Exact Career Title from Database",
      "description": "What the job involves (from the database)",
      "matchReason": "Specific explanation of why their interests/skills align",
      "growthPotential": "Include the hidden pay factor if mentioned in database",
      "requiredSkills": ["3-5 specific skills needed"]
    }
  ]
}

Return ONLY valid JSON, no additional text.`;
  }

  private parseAIResponse(text: string): AnalysisResult {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
    } catch (error) {
      console.error('Parse error:', error);
    }

    return this.getDefaultResponse();
  }

  private getMockResponse(input: UserInput): AnalysisResult {
    const recommendations: CareerRecommendation[] = [
      {
        title: 'UX/UI Designer',
        description: 'Create intuitive and engaging user experiences for digital products.',
        matchReason: 'Your creative interests align perfectly with design thinking and user-centered approaches.',
        growthPotential: 'High demand with 15% projected growth. Remote opportunities abundant.',
        requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
      },
      {
        title: 'Product Manager',
        description: 'Lead product strategy and coordinate cross-functional teams to deliver impactful solutions.',
        matchReason: 'Your analytical and communication skills are essential for product leadership.',
        growthPotential: 'Excellent growth trajectory with median salaries exceeding $120k.',
        requiredSkills: ['Product Strategy', 'Stakeholder Management', 'Data Analysis', 'Agile']
      },
      {
        title: 'Data Analyst',
        description: 'Transform raw data into actionable insights that drive business decisions.',
        matchReason: 'Strong analytical capabilities make you well-suited for data-driven roles.',
        growthPotential: 'Rapidly growing field with 25% projected growth over the next decade.',
        requiredSkills: ['SQL', 'Python', 'Tableau', 'Statistical Analysis']
      },
      {
        title: 'Content Strategist',
        description: 'Develop and execute content strategies that engage audiences and achieve business goals.',
        matchReason: 'Your communication skills and creative thinking are perfect for strategic content roles.',
        growthPotential: 'Growing demand in digital marketing with diverse industry opportunities.',
        requiredSkills: ['SEO', 'Content Planning', 'Analytics', 'Copywriting']
      },
      {
        title: 'Software Engineer',
        description: 'Build scalable applications and solve complex technical challenges.',
        matchReason: 'Your problem-solving abilities and technical aptitude suit engineering roles.',
        growthPotential: 'Exceptional demand with competitive salaries and continuous learning opportunities.',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design']
      }
    ];

    return {
      summary: `Based on your unique combination of interests (${input.interests.join(', ')}) and skills (${input.skills.join(', ')}), we've identified career paths that leverage your strengths while offering strong growth potential and market demand.`,
      recommendations
    };
  }

  private getDefaultResponse(): AnalysisResult {
    return {
      summary: 'We\'ve analyzed your profile and identified several promising career paths.',
      recommendations: []
    };
  }
}

export const aiService = new AIService();
