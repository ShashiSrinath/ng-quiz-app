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
        correctAnswer: '10',
        question: '50 % 20 = ?',
      },
      {
        type: 'text',
        correctAnswer:'9',
        question: '6 / 2 x (1 + 2) = ?',
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

  // public gotoNextPage = () => {
  //   if (this.currentPageIndex + 1 < this.questions.length) {
  //     this.currentPageIndex++;
  //   }
  // };

  public gotoNextPage = () => {
    this.currentPageIndex++;
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
