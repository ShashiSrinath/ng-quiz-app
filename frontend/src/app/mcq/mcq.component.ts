import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../types';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

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
