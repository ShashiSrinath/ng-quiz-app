import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../types';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css'],
})
export class McqComponent implements OnInit {
  @Input() question?: Question;
  @Output() onAnswerSelected = new EventEmitter<string>();

  answer: string = '';

  constructor() {}

  ngOnInit(): void {}

  onChange = (_e: any) => {
    if (this.question) {
      this.onAnswerSelected.emit(this.question.answer);
    }
  };

  getValueFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
