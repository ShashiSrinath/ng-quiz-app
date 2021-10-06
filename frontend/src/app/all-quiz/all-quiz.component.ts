import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Question, Quiz, Result } from '../types';

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css'],
})
export class AllQuizComponent implements OnInit {
  quiz?: Quiz;
  public questions: Question[] = [];
  public currentQuizIndex = 0;
  result?: Result;

  constructor(
    public appService: AppService,
    public apiService: ApiService,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.paramMap.subscribe((map) => {
      const quizId = map.get('id');
      if (quizId) {
        apiService.fetchQuizAsStudent(quizId).subscribe(
          (data) => {
            this.quiz = data;
            this.setQuestionsFromMap(data.questions);
          },
          (err) => {
            console.log(err.error);
          }
        );
      }
      console.log(quizId);
    });
  }

  ngOnInit(): void {}

  public setQuestionsFromMap(questionsMap: object) {
    this.questions = Object.entries(questionsMap).map(
      (q) => q[1]
    ) as unknown as Question[];
  }

  public gotoNextPage = (): void => {
    this.currentQuizIndex++;
  };

  public gotoPreviousPage = (): void => {
    if (this.currentQuizIndex > 0) {
      this.currentQuizIndex--;
    }
  };

  public gotoPage = (questionNumber: number) => {
    this.currentQuizIndex = questionNumber;
  };

  public submitAnswers = () => {
    this.apiService.submitAnswerSheet().subscribe(
      (data) => {
        console.log(data);
        this.result = data;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  public onAnswerSelected = (answer: string) => {
    this.questions[this.currentQuizIndex].answer = answer;
    // update server answer-sheet
    const currentQuestion = this.questions[this.currentQuizIndex];
    this.apiService
      .updateSingleAnswer(
        currentQuestion._id,
        currentQuestion.questionNumber,
        answer
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  };
}
