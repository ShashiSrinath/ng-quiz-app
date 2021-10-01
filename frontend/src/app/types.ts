export type Question = {
  type: 'text' | 'mcq'
  question: string;
  choices?: string[];
  correctAnswer: string;
  answered?: boolean;
  answer?: string
}

export type Result = {
  totalQuestions: number;
  correctAnswers: number;
  percentage: string;
}
