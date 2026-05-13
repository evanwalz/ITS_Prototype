export type QuestionType = 'multiple-choice' | 'code-completion' | 'debug';
export type ConceptKey = 'basics' | 'implementation' | 'debugging';

export interface Question {
  id: string;
  type: QuestionType;
  concept: ConceptKey;
  difficulty: 1 | 2 | 3;
  question: string;
  codeSnippet?: string;       // code shown to the student
  options: string[];
  correct: string;
  hints: string[];             // shown one at a time on wrong attempts
  explanation: string;         // shown after correct answer
}

export interface MasteryState {
  basics: number;
  implementation: number;
  debugging: number;
}

export type AppScreen = 'intro' | 'quiz' | 'complete';
