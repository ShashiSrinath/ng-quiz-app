import { Injectable } from '@angular/core';
import { Question, Result } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  user?: {id: string, email: string};

  constructor() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  setUser(data: {id: string, email: string}) {
    localStorage.setItem("user", JSON.stringify(data));
    this.user = data;
  }
}
