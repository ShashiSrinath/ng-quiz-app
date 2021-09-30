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
        correctAnswer: 'correct',
        question: 'type the word correct',
      },
      {
        type: 'mcq',
        correctAnswer: '2',
        choices: ['1', '2', '3', '4'],
        question: 'select 2',
      },
    ];
    this.currentPageIndex = 1;
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
    this.currentPageIndex = questionNumber - 1;
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
