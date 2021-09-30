export type Question = {
  type: 'text'
  question: string;
  correctAnswer: string;
  answered: boolean;
  answer: string;
} | {
  type: 'mcq'
  question: string;
  choices: string[]
  correctAnswer: string;
  answered: boolean;
  answer: string;
}
