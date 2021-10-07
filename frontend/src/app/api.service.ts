import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AnswerSheet, Quiz, Result } from './types';
import { environment } from '../environments/environment';
const live_server = environment.API_SERVER;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private appService: AppService) {
    this.checkAuth().subscribe((data) => {
      appService.user = data.id;
    });
  }

  // login user
  public login(email: string, password: string) {
    let url = live_server + 'auth/login';
    return this.http.post<{ id: string }>(
      url,
      { email: email, password: password },
      { withCredentials: true }
    );
  }

  // logout user
  public logout() {
    const url = live_server + 'auth/logout';
    return this.http.post(url, { withCredentials: true });
  }

  // register user
  public register(email: string, password: string) {
    let url = live_server + 'auth/register';
    return this.http.post<{ id: string }>(
      url,
      { email: email, password: password },
      { withCredentials: true }
    );
  }

  // create quiz
  public createQuiz(file: FormData) {
    let url = live_server + 'quiz/create-from-xlsx';
    return this.http.post(url, file, { withCredentials: true });
  }

  public checkAuth() {
    let url = live_server + 'auth/check';
    return this.http.get<{ id: string; email: string }>(url, {
      withCredentials: true,
    });
  }

  public attendQuiz(data: {
    quizId: string;
    passcode: string;
    userCode: string;
  }) {
    let url = live_server + 'answer-sheet/create-answer-sheet';
    return this.http.post<AnswerSheet>(url, data, { withCredentials: true });
  }

  public fetchQuizAsStudent(quizId: string) {
    let url = live_server + 'quiz/as-student/' + quizId;
    return this.http.get<Quiz>(url, { withCredentials: true });
  }

  public updateSingleAnswer(
    questionId: string,
    questionNumber: number,
    answer: string
  ) {
    let url = live_server + 'answer-sheet/submit-single-answer';
    return this.http.post(
      url,
      { questionId, questionNumber, answer },
      { withCredentials: true }
    );
  }
  public submitAnswerSheet() {
    let url = live_server + 'answer-sheet/finish-answer-sheet';
    return this.http.post<Result>(url, {}, { withCredentials: true });
  }

  public getMyQuizes() {
    const url = live_server + 'quiz/get-my-quizes';
    return this.http.get(url, { withCredentials: true });
  }
}
