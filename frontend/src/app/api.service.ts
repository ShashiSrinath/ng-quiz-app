import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const live_server = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // login user
  public login(email: string, password: string) {
    let url = live_server + "auth/login";
    return this.http.post(url, {email:email, password: password});
  }

  // register user
  public register(email: string, password: string) {
    let url = live_server + "auth/register";
    return this.http.post(url, {email: email, password: password});
  }

  // create quiz
  public createQuiz(file: FormData) {
    let url = live_server + "quiz/create-from-xlsx";
    return this.http.post(url, {file: file, title: file});
  }
}
