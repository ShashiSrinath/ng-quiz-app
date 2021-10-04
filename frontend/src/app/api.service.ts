import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

const live_server = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private appService: AppService) { 

    this.checkAuth().subscribe(
      data => {
        appService.user = data.id;
      }
    );
  }

  // login user
  public login(email: string, password: string) {
    let url = live_server + "auth/login";
    return this.http.post<{id: string}>(url, {email:email, password: password}, {withCredentials: true});
  }

  // register user
  public register(email: string, password: string) {
    let url = live_server + "auth/register";
    return this.http.post<{id: string}>(url, {email: email, password: password}, {withCredentials: true});
  }

  // create quiz
  public createQuiz(file: FormData) {
    let url = live_server + "quiz/create-from-xlsx";
    return this.http.post(url, {file: file, title: file}, {withCredentials: true});
  }

  public checkAuth() {
    let url = live_server + "auth/check";
    return this.http.get<{id: string}>(url, {withCredentials: true});
  }
}
