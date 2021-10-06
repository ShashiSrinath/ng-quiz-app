export type Question = {
  _id: string;
  type: 'text' | 'mcq';
  questionNumber: number;
  question: string;
  multipleChoices?: string[];
  answer?: string;
};

export type Result = {
  totalQuestions: string;
  totalAnswered: string;
  totalCorrectAnswers: string;
  percentage: string;
};

export type Quiz = {
  _id: string;
  title: string;
  questions: Map<string, Question>;
};

export type AnswerSheet = {
  _id: string;
  quizId: string;
  status: string;
  userCode: string;
  answers?: Map<String, { question: Question; answer: string }>;
};
