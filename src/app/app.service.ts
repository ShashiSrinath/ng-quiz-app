import { Injectable } from '@angular/core';
import {Question} from "./types";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  questions: Question[];
  currentPageIndex: number;

  constructor() {
    //todo: initialize questions array
  }


  public gotoNextPage = () => {
    if(this.currentPageIndex+1 < this.questions.length) {
      this.currentPageIndex++;
    }
  }

  public gotoPreviousPage = () => {
    if(this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }
}
