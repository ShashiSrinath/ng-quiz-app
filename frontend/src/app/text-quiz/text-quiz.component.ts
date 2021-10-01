import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../types';

@Component({
  selector: 'app-text-quiz',
  templateUrl: './text-quiz.component.html',
  styleUrls: ['./text-quiz.component.css']
})
export class TextQuizComponent implements OnInit {

  @Input() question?: Question;
  answer: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange = (_e: any) => {
    if (this.question) {
      this.question.answer = this.answer;
    }
  }

}
