import { Injectable } from '@angular/core';
import { Question, Result } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  questions: Question[];
  currentPageIndex: number;

  constructor() {
    this.questions = [
      {
        type: 'text',
        correctAnswer: 'Intel 4004',
        question: 'What is the Name of the First Microprocessor?',
      },
      {
        type: 'text',
        correctAnswer:
          'Java is called platform independent because of its byte codes which can run on any system irrespective of its underlying operating system.',
        question: 'Why Java is platform independent?',
      },
      {
        type: 'mcq',
        correctAnswer: 'Charles Babbage',
        choices: [
          'Herman Hollerith',
          'Charles Babbage',
          'Ada Byron',
          'Blaise Pascal',
        ],
        question: '--------- is the father of computer.',
      },
      {
        type: 'mcq',
        correctAnswer: 'JAVA',
        choices: ['English', 'JAVA', 'HTML', 'Tamil'],
        question: 'What is Computer programming language?',
      },
    ];
    this.currentPageIndex = 0;
  }

  public gotoNextPage = () => {
    if (this.currentPageIndex + 1 < this.questions.length) {
      this.currentPageIndex++;
    }
  };

  public gotoPreviousPage = () => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  };

  public gotoPage = (questionNumber: number) => {
    this.currentPageIndex = questionNumber;
  };

  public getResults = (): Result => {
    let correctAnswers = 0;
    this.questions.forEach((r) => {
      if (r.answer === r.correctAnswer) {
        correctAnswers++;
      }
    });
    const percentage = `${(
      (correctAnswers / this.questions.length) *
      100
    ).toFixed(2)} %`;
    return {
      totalQuestions: this.questions.length,
      correctAnswers,
      percentage,
    };
  };
}
