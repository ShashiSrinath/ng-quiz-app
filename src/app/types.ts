export type Question = {
  type: 'text'
  question: string;
  correctAnswer: string;
  answered: boolean;
} | {
  type: 'mcq'
  question: string;
  choices: string[]
  correctAnswer: string;
  answered: boolean;
}
